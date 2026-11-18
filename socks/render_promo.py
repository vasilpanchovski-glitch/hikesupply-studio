"""Socks promo post in the "fashion edit" look Vasil chose (2026-11-18, Springfield reference).

Layout 1080x1350: white HikeSupply Co. logo top left, a big stacked white headline on the left,
the pair deal as one big number with a small two-line note beside it, the shop address at the bottom.
Spec: {"id": "pp01", "img": "s23", "focus": 0.5, "shiftx": 0.0,
       "title": "THE\\nWINTER\\nSOCK", "big": "-15%", "note": "WHEN YOU BUY\\n3+ PAIRS",
       "sub": "2 pairs save 10%  ·  $19.99 a pair", "deal_color": "#d9e2c8"}
Run: python3 socks/render_promo.py socks/specs/pp01.json  ->  socks/posts/<id>/1.jpg
"""
import json, os, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(ROOT, "..", "pins", "BarlowCondensed-ExtraBold.ttf")
FONT_B = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
LOGO = os.path.join(ROOT, "brand", "logo_white.png")
W, H = 1080, 1350


def white_logo():
    if os.path.exists(LOGO):
        return Image.open(LOGO)
    src = Image.open(os.path.join(ROOT, "brand", "logo_t.png")).convert("RGBA")
    src = src.crop(src.getbbox())
    a = src.split()[3]
    out = Image.new("RGBA", src.size, (255, 255, 255, 0))
    out.putalpha(a)
    out.save(LOGO)
    return out


def cover(im, focus, shiftx):
    r = W / H
    iw, ih = im.size
    if iw / ih > r:
        nw = int(ih * r)
        x = int((iw - nw) * (0.5 + shiftx))
        im = im.crop((max(0, min(iw - nw, x)), 0, max(0, min(iw - nw, x)) + nw, ih))
    else:
        nh = int(iw / r)
        y = int((ih - nh) * focus)
        im = im.crop((0, y, iw, y + nh))
    return im.resize((W, H), Image.LANCZOS)


def shade():
    # dark from the left (behind the headline) and from the bottom (behind the deal)
    g = Image.new("L", (W, H), 0)
    px = g.load()
    for y in range(H):
        for x in range(0, W, 2):
            l = max(0.0, 1 - x / (W * 0.62)) ** 1.5 * 0.55
            b = max(0.0, (y / H - 0.55) / 0.45) ** 1.6 * 0.6
            v = int(255 * min(0.75, l + b))
            px[x, y] = v
            if x + 1 < W:
                px[x + 1, y] = v
    s = Image.new("RGBA", (W, H), (10, 14, 12, 255))
    s.putalpha(g)
    return s


def render(spec):
    out = os.path.join(ROOT, "posts", spec["id"])
    os.makedirs(out, exist_ok=True)
    im = Image.open(os.path.join(ROOT, "materials", "img", spec["img"] + ".jpg")).convert("RGB")
    im = cover(im, spec.get("focus", 0.5), spec.get("shiftx", 0.0)).convert("RGBA")
    im = Image.alpha_composite(im, shade())
    d = ImageDraw.Draw(im)
    x0 = 64

    # logo, top left
    lg = white_logo().copy()
    lw = spec.get("logo_w", 220)
    lg = lg.resize((lw, int(lg.height * lw / lg.width)), Image.LANCZOS)
    im.alpha_composite(lg, (x0, 56))

    # headline
    size = spec.get("size", 190)
    f = ImageFont.truetype(FONT, size)
    y = 56 + lg.height + spec.get("gap", 40)
    for ln in spec["title"].split("\n"):
        d.text((x0 - 4, y), ln, font=f, fill="white")
        y += int(size * 0.88)

    # deal: big number + small note beside it
    big_size = spec.get("big_size", 300)
    fb = ImageFont.truetype(FONT, big_size)
    by = H - 140 - int(big_size * 0.95)
    col = spec.get("deal_color", "#d9e2c8")
    d.text((x0 - 6, by), spec["big"], font=fb, fill=col)
    bw = d.textlength(spec["big"], font=fb)
    fn = ImageFont.truetype(FONT, spec.get("note_size", 54))
    ny = by + int(big_size * 0.30)
    for ln in spec["note"].split("\n"):
        d.text((x0 + bw + 18, ny), ln, font=fn, fill="white")
        ny += 56
    if spec.get("sub"):
        fs = ImageFont.truetype(FONT_B, 34)
        d.text((x0, H - 132), spec["sub"], font=fs, fill="white")

    # shop address
    fu = ImageFont.truetype(FONT_B, 34)
    fu_b = ImageFont.truetype(FONT, 40)
    u = H - 76
    d.text((x0, u), "WWW.", font=fu, fill="white")
    x = x0 + d.textlength("WWW.", font=fu)
    d.text((x, u - 5), "HIKESUPPLYCO", font=fu_b, fill="white")
    x += d.textlength("HIKESUPPLYCO", font=fu_b)
    d.text((x, u), ".COM", font=fu, fill="white")

    p = os.path.join(out, "1.jpg")
    im.convert("RGB").save(p, quality=92)
    return p


if __name__ == "__main__":
    print(render(json.load(open(sys.argv[1]))))
