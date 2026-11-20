#!/usr/bin/env python3
"""Pinterest product feed for hikesupplyco.com (Vasil 2026-11-19).

The Shopify Pinterest app cannot sync our catalog (Pinterest wants an ad account approved by
Aleph Bulgaria first), so we publish our own feed and Pinterest reads it as a catalog data source:
https://raw.githubusercontent.com/vasilpanchovski-glitch/hikesupply-studio/main/media/feeds/pinterest.tsv

Reads the public storefront (https://hikesupplyco.com/products.json), one row per variant.
Skips $0 products (free checklist, club editions), sold-out variants and the NZ merino tee.

python3 scripts/pinterest_feed.py            # writes media/feeds/pinterest.tsv
Then commit and push. Pinterest refetches it every day.
"""
import csv
import html
import json
import re
import sys
import urllib.request
from pathlib import Path

STORE = "https://hikesupplyco.com"
OUT = Path(__file__).resolve().parent.parent / "media" / "feeds" / "pinterest.tsv"
SKIP_TITLE = ("New Zealand Merino Wool T-Shirt",)
SKIP_TAGS = {"club-edition"}
DIGITAL_TAGS = {"digital-download", "digital", "printable"}


def fetch_all():
    items, page = [], 1
    while True:
        req = urllib.request.Request(f"{STORE}/products.json?limit=250&page={page}",
                                     headers={"User-Agent": "HikeSupply feed builder"})
        with urllib.request.urlopen(req, timeout=60) as r:
            batch = json.load(r)["products"]
        if not batch:
            return items
        items += batch
        page += 1


def plain(body, limit=4900):
    t = re.sub(r"<(br|/p|/li|/h\d)[^>]*>", "\n", body or "", flags=re.I)
    t = re.sub(r"<li[^>]*>", "- ", t, flags=re.I)
    t = re.sub(r"<[^>]+>", "", t)
    t = html.unescape(t)
    t = re.sub(r"[ \t\r\f\v]+", " ", t)
    t = re.sub(r"\n\s*\n+", "\n", t).strip()
    return t.replace("\n", " ").replace("\t", " ")[:limit]


def category(p, digital):
    title = p["title"].lower()
    tags = {t.lower() for t in p["tags"]}
    # Pinterest warns when a category has only 1-2 levels (2026-11-20), so always give 3+.
    if digital:
        return "Media > Books > Print Books"
    if tags & {"dog", "trail dogs"} or " dog " in f" {title} ":
        return "Animals & Pet Supplies > Pet Supplies > Dog Supplies"
    name = title.split(" — ")[0]  # main name only, not the feature list after the dash
    if " set" in f" {name} " or "leg gaiter" in name or "rubber tip" in name or "reflective vest" in name:
        return "Sporting Goods > Outdoor Recreation > Camping & Hiking"
    clothing = [
        ("balaclava|ski mask|ear warmer|beanie|sun hat|hat", "Apparel & Accessories > Clothing Accessories > Hats"),
        ("neck gaiter|scarf", "Apparel & Accessories > Clothing Accessories > Scarves & Shawls"),
        ("gloves?|mittens?", "Apparel & Accessories > Clothing Accessories > Gloves & Mittens"),
        ("jacket|fleece|windbreaker|softshell|parka", "Apparel & Accessories > Clothing > Outerwear > Coats & Jackets"),
        ("pants|trousers|leggings", "Apparel & Accessories > Clothing > Pants"),
        ("shorts", "Apparel & Accessories > Clothing > Shorts"),
        ("skort|skirt", "Apparel & Accessories > Clothing > Skorts"),
        ("socks?", "Apparel & Accessories > Clothing > Underwear & Socks > Socks"),
        ("base layer|thermal", "Apparel & Accessories > Clothing > Underwear & Socks > Long Johns"),
        ("shirt|tee|hoodie", "Apparel & Accessories > Clothing > Shirts & Tops"),
    ]
    for words, cat in clothing:
        if re.search(rf"\b({words})\b", name):
            return cat
    return "Sporting Goods > Outdoor Recreation > Camping & Hiking"


def main():
    products = fetch_all()
    rows = []
    for p in products:
        tags = {t.lower() for t in p["tags"]}
        if any(s in p["title"] for s in SKIP_TITLE) or tags & SKIP_TAGS:
            continue
        digital = bool(tags & DIGITAL_TAGS) or not any(v.get("requires_shipping") for v in p["variants"])
        imgs = [i["src"] for i in p["images"]]
        if not imgs:
            continue
        desc = plain(p["body_html"]) or p["title"]
        multi = len(p["variants"]) > 1
        for v in p["variants"]:
            if not v.get("available") or float(v["price"]) <= 0:
                continue
            img = (v.get("featured_image") or {}).get("src") or imgs[0]
            extra = [i for i in imgs if i != img][:10]
            name = p["title"]
            if multi and v["title"] != "Default Title":
                name = f"{p['title']} - {v['title']}"[:500]
            row = {
                "id": str(v["id"]),
                "item_group_id": str(p["id"]),
                "title": name,
                "description": desc,
                "link": f"{STORE}/products/{p['handle']}?variant={v['id']}&utm_source=pinterest&utm_medium=catalog&utm_campaign=feed",
                "image_link": img,
                "additional_image_link": ",".join(extra),
                "price": f"{float(v['price']):.2f} USD",
                "availability": "in stock",
                "condition": "new",
                "brand": "HikeSupply Co.",
                "google_product_category": category(p, digital),
                "product_type": p.get("product_type") or ("Digital download" if digital else "Hiking gear"),
            }
            if v.get("compare_at_price") and float(v["compare_at_price"]) > float(v["price"]):
                row["price"] = f"{float(v['compare_at_price']):.2f} USD"
                row["sale_price"] = f"{float(v['price']):.2f} USD"
            else:
                row["sale_price"] = ""
            rows.append(row)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    cols = ["id", "item_group_id", "title", "description", "link", "image_link", "additional_image_link",
            "price", "sale_price", "availability", "condition", "brand", "google_product_category", "product_type"]
    with open(OUT, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=cols, delimiter="\t", quoting=csv.QUOTE_NONE, escapechar="\\")
        w.writeheader()
        w.writerows(rows)
    print(f"{OUT}: {len(rows)} rows from {len(products)} products")


if __name__ == "__main__":
    sys.exit(main())
