# Etsy listing images for HikeSupply digital products.
# usage: python3 etsy/render.py etsy/listings/<slug>.json
# Writes etsy/out/<slug>/01.jpg ... (2700x2025, Etsy's recommended 4:3), forest background, one-colour headlines.
import json, sys, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 2700, 2025
ROOT = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(ROOT, "..", "video", "public")
HEAD = os.path.join(FONTS, "BarlowCondensed-ExtraBold.ttf")
SEMI = os.path.join(FONTS, "BarlowCondensed-Bold.ttf")
SANS = os.path.join(FONTS, "Inter.ttf")
FOREST, DEEP, STONE, SAGE = (44, 59, 46), (27, 38, 32), (245, 241, 234), (138, 154, 126)


def font(p, s):
    f = ImageFont.truetype(p, s)
    try:
        f.set_variation_by_axes([700])
    except Exception:
        pass
    return f


def bg():
    im = Image.new("RGB", (W, H), DEEP)
    glow = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(glow)
    d.ellipse((-400, -500, W + 400, H + 300), fill=255)
    glow = glow.filter(ImageFilter.GaussianBlur(420))
    top = Image.new("RGB", (W, H), (58, 82, 68))
    return Image.composite(top, im, glow)


def page(src, w, rot=0):
    p = Image.open(src).convert("RGB")
    h = int(w * p.height / p.width)
    p = p.resize((w, h), Image.LANCZOS)
    pad = 60
    canvas = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    sh = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).rectangle((pad + 10, pad + 24, pad + w + 10, pad + h + 24), fill=(0, 0, 0, 150))
    sh = sh.filter(ImageFilter.GaussianBlur(26))
    canvas.alpha_composite(sh)
    canvas.paste(p, (pad, pad))
    if rot:
        canvas = canvas.rotate(rot, resample=Image.BICUBIC, expand=True)
    return canvas


def text(d, xy, s, f, fill=STONE, anchor="la"):
    d.text(xy, s, font=f, fill=fill, anchor=anchor)


def wrap(d, s, f, maxw):
    words, lines, cur = s.split(), [], ""
    for w_ in words:
        t = (cur + " " + w_).strip()
        if d.textlength(t, font=f) <= maxw:
            cur = t
        else:
            lines.append(cur)
            cur = w_
    if cur:
        lines.append(cur)
    return lines


def chip(d, x, y, s, f):
    tw = d.textlength(s, font=f)
    d.rounded_rectangle((x, y, x + tw + 64, y + 96), 18, fill=STONE)
    d.text((x + 32, y + 48), s, font=f, fill=DEEP, anchor="lm")
    return x + tw + 64 + 22


def hero(L, out):
    im = bg()
    d = ImageDraw.Draw(im)
    pages = L["pages"]
    # two inside pages fanned behind the cover, cover large and slightly tilted
    b2 = page(pages[L.get("back2", 2)], 1000, -9)
    im.paste(b2, (1620, 300), b2)
    b1 = page(pages[L.get("back", 1)], 1060, -3)
    im.paste(b1, (1500, 180), b1)
    cov = page(pages[0], 1280, 4)
    im.paste(cov, (1110, 60), cov)
    text(d, (130, 140), "HIKESUPPLY CO.", font(SEMI, 56), SAGE)
    y = 270
    for line in L["hero"]:
        text(d, (130, y), line.upper(), font(HEAD, 178))
        y += 168
    y += 50
    for line in wrap(d, L["sub"], font(SANS, 60), 880):
        text(d, (130, y), line, font(SANS, 60))
        y += 84
    x, y = 130, H - 330
    for c in L["chips"][:3]:
        x = chip(d, x, y, c.upper(), font(SEMI, 52))
    text(d, (130, H - 150), "Instant download · nothing is shipped", font(SANS, 50), SAGE)
    im.save(out, quality=90)


def spread(L, out, idx, title):
    im = bg()
    d = ImageDraw.Draw(im)
    text(d, (W // 2, 140), title.upper(), font(HEAD, 140), anchor="ma")
    n = len(idx)
    pw = 790 if n == 3 else 640
    gap = 60
    total = n * pw + (n - 1) * gap
    x0 = (W - total) // 2 - 60
    for k, i in enumerate(idx):
        p = page(L["pages"][i], pw, [-3, 0, 3, 0][k % 4] if n > 1 else 0)
        im.paste(p, (x0 + k * (pw + gap), 330), p)
    im.save(out, quality=90)


def inside(L, out):
    im = bg()
    d = ImageDraw.Draw(im)
    p = page(L["pages"][L.get("feature", 2)], 1050, -3)
    im.paste(p, (1500, 150), p)
    text(d, (150, 170), "WHAT'S INSIDE", font(HEAD, 150))
    y = 400
    fb = font(SANS, 58)
    for item in L["inside"][:8]:
        d.ellipse((150, y + 22, 176, y + 48), fill=SAGE)
        lines = wrap(d, item, fb, 1180)
        for ln in lines:
            text(d, (220, y), ln, fb)
            y += 76
        y += 26
    im.save(out, quality=90)


def formats(L, out):
    im = bg()
    d = ImageDraw.Draw(im)
    text(d, (W // 2, 170), "WHAT YOU GET", font(HEAD, 150), anchor="ma")
    rows = L["formats"]
    y = 470
    for title, desc in rows:
        d.rounded_rectangle((420, y, W - 420, y + 240), 28, fill=(36, 50, 42))
        text(d, (500, y + 52), title.upper(), font(HEAD, 92))
        text(d, (500, y + 158), desc, font(SANS, 52), SAGE)
        y += 290
    text(d, (W // 2, H - 170), "Download right after checkout. Print at home or read on your phone.", font(SANS, 56), STONE, anchor="ma")
    im.save(out, quality=90)


def main(path):
    L = json.load(open(path))
    slug = L["slug"]
    od = os.path.join(ROOT, "out", slug)
    os.makedirs(od, exist_ok=True)
    hero(L, os.path.join(od, "01.jpg"))
    inside(L, os.path.join(od, "02.jpg"))
    spread(L, os.path.join(od, "03.jpg"), L["spreadA"], L.get("spreadATitle", "A look inside"))
    if L.get("spreadB"):
        spread(L, os.path.join(od, "04.jpg"), L["spreadB"], L.get("spreadBTitle", "Printable checklists"))
    formats(L, os.path.join(od, "05.jpg"))
    print("done", od)


if __name__ == "__main__":
    main(sys.argv[1])
