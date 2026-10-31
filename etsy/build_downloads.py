# Builds etsy/downloads/<slug>/ : the files a buyer gets on Etsy (max 5 files, max 20 MB each).
import json, os, glob, subprocess, zipfile, shutil, urllib.request
os.chdir(os.path.dirname(os.path.abspath(__file__)))
P = {p["handle"]: p for p in json.load(open("shopify_products.json"))}
S = "src"
BONUS_ITEMS = [(f"{S}/free-hiking-checklist-letter.pdf", "Ultimate-Hiking-Checklist-US-Letter.pdf"), (f"{S}/free-hiking-checklist-a4.pdf", "Ultimate-Hiking-Checklist-A4.pdf"), (f"{S}/free-hiking-checklist-mobile.pdf", "Ultimate-Hiking-Checklist-Mobile.pdf")]
BONUS = None  # set after zipit is defined
NICE = {"US Letter, full color": "US-Letter", "A4, full color": "A4", "US Letter, print-friendly": "US-Letter-print-friendly", "A4, print-friendly": "A4-print-friendly"}

def fetch(url, out):
    if not os.path.exists(out):
        os.makedirs(os.path.dirname(out), exist_ok=True)
        urllib.request.urlretrieve(url, out)
    return out

def new_files(handle, stem):
    out = []
    for l in P[handle]["links"]:
        lab = l["label"].replace("colour", "color")
        f = fetch(l["url"], f"{S}/new/{handle}/{NICE[lab]}.pdf")
        out.append((f, f"{stem}-{NICE[lab]}.pdf"))
    return out

def zipit(path, items):
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        for src, name in items:
            z.write(src, name)
    return path

BONUS = (zipit(f"{S}/bonus.zip", BONUS_ITEMS), "BONUS-Ultimate-Hiking-Checklist.zip")
PRODUCTS = os.path.join("..", "products")
def mobile_new(handle, stem):
    for m in glob.glob(f"{PRODUCTS}/p*/meta.json"):
        mt = json.load(open(m)); sl = mt["slug"]
        if handle.startswith(sl) or sl in handle or mt["title"] == P[handle]["title"]:
            f = f"{os.path.dirname(m)}/out/{sl}-mobile.pdf"; assert os.path.exists(f), f
            return (f, f"{stem}-Mobile.pdf")
    raise SystemExit("no mobile for " + handle)

OLD = {"beginners-hiking-guide": ("beginners-hiking-guide", "Beginners-Hiking-Guide"),
       "ultimate-hiking-packing-checklist": ("packing-checklist", "Hiking-Packing-Checklist"),
       "hiking-trip-planner": ("trip-planner", "Hiking-Trip-Planner"),
       "hiking-safety-guide": ("hiking-safety-guide", "Hiking-Safety-Guide"),
       "solo-hiking-guide": ("solo-hiking-guide", "Solo-Hiking-Guide"),
       "hiking-emergency-checklist": ("emergency-checklist", "Hiking-Emergency-Checklist"),
       "what-to-do-if-you-get-lost": ("what-to-do-if-lost", "What-To-Do-If-You-Get-Lost")}
def old_files(handle):
    f, stem = OLD[handle]
    return [(f"{S}/{f}-letter.pdf", f"{stem}-US-Letter.pdf"), (f"{S}/{f}-a4.pdf", f"{stem}-A4.pdf"), (f"{S}/{f}-mobile.pdf", f"{stem}-Mobile.pdf")]

GUIDE = {"smokies": ("smokies-trip-guide/Great-Smoky-Mountains-Trip-Planning-Guide", "Smokies-Trip-Planning-Guide"),
         "utah": ("utah-trip-guide/Utahs-Mighty-5-Trip-Planning-Guide", "Utahs-Mighty-5-Trip-Planning-Guide")}
ROUTE = {"smokies": "smokies-route-guide/Smokies-10-Best-Day-Hikes-Route-Guide", "utah": "utah-route-guide/Utahs-Mighty-5-10-Best-Day-Hikes-Route-Guide"}
SZ = {"Letter": "US-Letter", "A4": "A4", "Mobile": "Mobile"}
def guide(k, size): g, stem = GUIDE[k]; return (f"{S}/{g}-{size}.pdf", f"{stem}-{SZ[size]}.pdf")
def route(k, size): return (f"{S}/{ROUTE[k]}-{size}.pdf", os.path.basename(ROUTE[k]) + f"-{SZ[size]}.pdf")
def extras(k, base): return (zipit(f"{S}/{k}-extras.zip", [(BADGE[k], f"{base}-trail-badges.zip")] + BONUS_ITEMS), f"{base}-badges-and-bonus-checklist.zip")
GPXZ = {"smokies": f"{S}/smokies-gpx-files.zip", "utah": f"{S}/utah-gpx-files.zip", "usa": f"{S}/gpx-files.zip"}
BADGE = {"smokies": f"{S}/smokies-trail-badges.zip", "utah": f"{S}/utah-badges.zip"}

def plan(slug, L):
    h = L["shopify"]; d = f"downloads/{slug}"
    if P[h]["links"]:
        stem = slug.replace("-", " ").title().replace(" ", "-")
        nf = {n.split(stem + "-")[1]: (f, n) for f, n in new_files(h, stem)}
        pf = zipit(f"{S}/{slug}-pf.zip", [nf["US-Letter-print-friendly.pdf"], nf["A4-print-friendly.pdf"]])
        return [nf["US-Letter.pdf"], nf["A4.pdf"], mobile_new(h, stem), (pf, f"{stem}-printer-friendly-low-ink.zip"), BONUS]
    if h in OLD:
        return old_files(h) + [BONUS]
    if h == "beginner-friendly-trails-usa-gpx-route-collection":
        r = f"{S}/Beginner-Trails-USA-Route-Guide-A4"
        return [(GPXZ["usa"], "Beginner-Trails-USA-GPX-files.zip"), (f"{r}/Beginner-Trails-USA-Route-Guide-Letter.pdf", "Beginner-Trails-USA-Route-Guide-US-Letter.pdf"),
                (f"{r}/Beginner-Trails-USA-Route-Guide-A4.pdf", "Beginner-Trails-USA-Route-Guide-A4.pdf"), (f"{r}/Beginner-Trails-USA-Route-Guide-Mobile.pdf", "Beginner-Trails-USA-Route-Guide-Mobile.pdf"), BONUS]
    for k in ("smokies", "utah"):
        if h.endswith("10-best-day-hikes-gpx") and h.startswith(k[:4]) or (k == "utah" and h == "utahs-mighty-5-10-best-day-hikes-gpx") or (k == "smokies" and h == "great-smoky-mountains-10-best-day-hikes-gpx"):
            base = GUIDE[k][1].split('-Trip')[0]
            return [(GPXZ[k], f"{base}-GPX-files.zip"), route(k, "Letter"), route(k, "A4"), route(k, "Mobile"), extras(k, base)]
        if h in ("great-smoky-mountains-trip-planning-guide", "utahs-mighty-5-trip-planning-guide") and h.startswith(k[:4]) or (k == "utah" and h == "utahs-mighty-5-trip-planning-guide") or (k == "smokies" and h == "great-smoky-mountains-trip-planning-guide"):
            return [guide(k, "Letter"), guide(k, "A4"), guide(k, "Mobile"), BONUS]
        if h in ("great-smoky-mountains-trip-pack", "utahs-mighty-5-trip-pack") and ((k == "smokies") == h.startswith("great")):
            os.makedirs(d, exist_ok=True)
            base = GUIDE[k][1].split("-Trip")[0]
            zl = zipit(f"{S}/{slug}-Letter.zip", [guide(k, "Letter"), route(k, "Letter")])
            za = zipit(f"{S}/{slug}-A4.zip", [guide(k, "A4"), route(k, "A4")])
            zm = zipit(f"{S}/{slug}-Mobile.zip", [guide(k, "Mobile"), route(k, "Mobile")])
            return [(zl, f"{base}-Trip-Pack-US-Letter.zip"), (za, f"{base}-Trip-Pack-A4.zip"), (zm, f"{base}-Trip-Pack-Mobile.zip"), (GPXZ[k], f"{base}-GPX-files.zip"), extras(k, base)]
    # bundles of other products: one ZIP per paper size
    parts = {"beginner-hiker-bundle": ["beginners-hiking-guide", "ultimate-hiking-packing-checklist", "hiking-trip-planner"],
             "stay-safe-bundle": ["hiking-safety-guide", "hiking-emergency-checklist", "what-to-do-if-you-get-lost"],
             "ultimate-hikers-toolkit": ["beginners-hiking-guide", "solo-hiking-guide", "hiking-trip-planner", "ultimate-hiking-packing-checklist", "hiking-safety-guide", "hiking-emergency-checklist", "what-to-do-if-you-get-lost"],
             "trail-memories-gift-set": ["hiking-journal-trail-log-printable", "us-national-parks-hiking-tracker-all-63-parks-canada-printable", "hiking-trip-planner"],
             "national-parks-trio-smokies-utah-yellowstone-trip-planning-guides": ["smokies", "utah", "yellowstone-grand-teton-trip-planning-guide"]}[h]
    let, a4, mob = [], [], []
    for p in parts:
        if p in OLD:
            fl = old_files(p); let.append(fl[0]); a4.append(fl[1]); mob.append(fl[2])
        elif p in GUIDE:
            let.append(guide(p, "Letter")); a4.append(guide(p, "A4")); mob.append(guide(p, "Mobile"))
        else:
            stem = {"hiking-journal-trail-log-printable": "Hiking-Journal", "us-national-parks-hiking-tracker-all-63-parks-canada-printable": "National-Parks-Tracker", "yellowstone-grand-teton-trip-planning-guide": "Yellowstone-Grand-Teton-Guide"}[p]
            nf = new_files(p, stem); let.append(nf[0]); a4.append(nf[1]); mob.append(mobile_new(p, stem))
    t = L["hero"][0].strip().replace(" ", "-").replace("'", "") + "-" + L["hero"][1].strip().replace(" ", "-")
    return [(zipit(f"{S}/{slug}-Letter.zip", let), f"{t}-US-Letter.zip"), (zipit(f"{S}/{slug}-A4.zip", a4), f"{t}-A4.zip"), (zipit(f"{S}/{slug}-Mobile.zip", mob), f"{t}-Mobile.zip"), BONUS]

for f in sorted(glob.glob("listings/*.json")):
    L = json.load(open(f)); slug = L["slug"]
    items = plan(slug, L)
    d = f"downloads/{slug}"; shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
    assert len(items) <= 5, slug
    for src, name in items:
        shutil.copy(src, f"{d}/{name}")
        mb = os.path.getsize(f"{d}/{name}") / 1e6
        assert mb <= 20, (slug, name, mb)
    print(slug, len(items), round(sum(os.path.getsize(f"{d}/{n}") for _, n in items) / 1e6, 1), "MB")
