"""Render a socks photo post (carousel or single) from a JSON spec.

Spec: {"id": "sp01", "slides": [{"img": "s02", "focus": 0.5, "title": "COLD FEET\\nON THE COMMUTE?", "sub": "Swipe for where merino helps", "pos": "bottom"}]}
img = name in socks/materials/img (s01.jpg ...). focus = vertical crop centre 0..1 (default 0.5).
pos = "bottom" or "top" for the text block. Output: socks/posts/<id>/<n>.jpg at 1080x1350 (4:5).
Design: full photo, soft dark gradient behind the text, white Barlow Condensed headline, white Inter line. One colour, no boxes or chips.
"""
import json, os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.abspath(__file__))
FONT_H = os.path.join(ROOT, "..", "pins", "BarlowCondensed-ExtraBold.ttf")
FONT_B = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
W, H = 1080, 1350


def crop(im, focus):
    r = W / H
    iw, ih = im.size
    if iw / ih > r:
        nw = int(ih * r)
        x = (iw - nw) // 2
        im = im.crop((x, 0, x + nw, ih))
    else:
        nh = int(iw / r)
        y = int((ih - nh) * focus)
        im = im.crop((0, y, iw, y + nh))
    return im.resize((W, H), Image.LANCZOS)


def gradient(pos, strength=0.62, span=0.48):
    g = Image.new("L", (1, H), 0)
    for y in range(H):
        t = (y / H) if pos == "bottom" else (1 - y / H)
        a = max(0.0, (t - (1 - span)) / span)
        g.putpixel((0, y), int(255 * strength * a ** 1.4))
    g = g.resize((W, H))
    shade = Image.new("RGBA", (W, H), (8, 12, 10, 0))
    shade.putalpha(g)
    return shade


def wrap_lines(text):
    return text.split("\n")


def render(spec):
    out = os.path.join(ROOT, "..", spec.get("dir","socks"), "posts", spec["id"])
    os.makedirs(out, exist_ok=True)
    files = []
    for n, s in enumerate(spec["slides"], 1):
        im = Image.open(os.path.join(ROOT, "..", spec.get("dir","socks"), "materials", "img", s["img"] + ".jpg")).convert("RGB")
        im = crop(im, s.get("focus", 0.5)).convert("RGBA")
        pos = s.get("pos", "bottom")
        im = Image.alpha_composite(im, gradient(pos, s.get("shade", 0.62)))
        d = ImageDraw.Draw(im)
        size = s.get("size", 118)
        fh = ImageFont.truetype(FONT_H, size)
        fb = ImageFont.truetype(FONT_B, s.get("subsize", 38))
        lines = wrap_lines(s["title"])
        lh = int(size * 0.98)
        sub = s.get("sub", "")
        sub_lines = sub.split("\n") if sub else []
        sb_h = len(sub_lines) * 50
        block = len(lines) * lh + (24 + sb_h if sub_lines else 0)
        y = (H - 110 - block) if pos == "bottom" else 110
        for ln in lines:
            d.text((72, y), ln, font=fh, fill="white")
            y += lh
        if sub_lines:
            y += 24
            for ln in sub_lines:
                d.text((74, y), ln, font=fb, fill=(255, 255, 255, 235))
                y += 50
        if s.get("dots", True) and len(spec["slides"]) > 1:
            k = len(spec["slides"])
            x0 = W // 2 - (k * 22) // 2
            for i in range(k):
                c = (255, 255, 255, 255) if i == n - 1 else (255, 255, 255, 110)
                d.ellipse((x0 + i * 22, H - 46, x0 + i * 22 + 10, H - 36), fill=c)
        p = os.path.join(out, f"{n}.jpg")
        im.convert("RGB").save(p, quality=90)
        files.append(p)
    return files


if __name__ == "__main__":
    spec = json.load(open(sys.argv[1]))
    for f in render(spec):
        print(f)
