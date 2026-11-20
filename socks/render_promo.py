"""Promo post in the "fashion edit" look Vasil chose (2026-11-18), used for socks and ski masks.

Layout 1080x1350: colour HikeSupply Co. logo (orange mountain, white text), a big stacked white
headline, the deal as one big number with a two-line note beside it, a sub line and the shop address.

Placement: see head_side / deal_side / keep below (Vasil 2026-11-20).
the people and products in the photo are found automatically (rembg foreground mask), plus any
extra boxes in "keep". The logo, headline and deal block are then placed where they cover the
least of them (top or bottom, left or right), shrinking the text if needed. If nothing fits
without covering the subject, the render stops with an error: pick another photo or crop.

Spec: {"id": "pp01", "img": "s23", "focus": 0.5, "shiftx": 0.0, "dir": "skimask" (optional),
       "title": "THE\\nWINTER\\nSOCK", "big": "-15%", "note": "WHEN YOU BUY\\n3+ PAIRS",
       "sub": "2 pairs save 10%  ·  $19.99 a pair", "deal_color": "#d9e2c8",
       "keep": [[x0, y0, x1, y1], ...] (optional, fractions 0-1 of the final image),
       "logo": "white" (optional, old all-white logo)}
Run: python3 socks/render_promo.py socks/specs/pp01.json  ->  <socks|dir>/posts/<id>/1.jpg
Also writes <id>/check.jpg with the protected area tinted red, to look at.
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(ROOT, "..", "pins", "BarlowCondensed-ExtraBold.ttf")
FONT_B = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
LOGO_WHITE = os.path.join(ROOT, "brand", "logo_white.png")
LOGO_COLOR = os.path.join(ROOT, "brand", "logo_color.png")
W, H = 1080, 1350
M = 60  # margin
MAX_COVER = 0.04  # share of a text block allowed over the subject


def cover(im, focus, shiftx, ph=H):
    r = W / ph
    iw, ih = im.size
    if iw / ih > r:
        nw = int(ih * r)
        x = int((iw - nw) * (0.5 + shiftx))
        x = max(0, min(iw - nw, x))
        im = im.crop((x, 0, x + nw, ih))
    else:
        nh = int(iw / r)
        y = int((ih - nh) * focus)
        im = im.crop((0, y, iw, y + nh))
    return im.resize((W, ph), Image.LANCZOS)


def subject_mask(im, keep):
    from rembg import remove, new_session
    ph = im.height
    small = im.convert("RGB").resize((540, ph // 2))
    a = np.array(remove(small, session=new_session("isnet-general-use")))[..., 3] > 60
    m = Image.fromarray((a * 255).astype(np.uint8)).resize((W, ph))
    m = m.filter(ImageFilter.MaxFilter(25))  # small safety margin around people and products
    m = np.array(m) > 127
    full = np.zeros((H, W), bool)
    full[:ph] = m
    m = full
    for x0, y0, x1, y1 in keep or []:
        m[int(y0 * H):int(y1 * H), int(x0 * W):int(x1 * W)] = True
    return m


def cov(mask, box):
    x0, y0, x1, y1 = [int(v) for v in box]
    x0, y0, x1, y1 = max(0, x0), max(0, y0), min(W, x1), min(H, y1)
    if x1 <= x0 or y1 <= y0:
        return 1.0
    return float(mask[y0:y1, x0:x1].mean())


def text_w(d, s, f):
    return max(d.textlength(ln, font=f) for ln in s.split("\n"))


BAND = 350  # solid strip at the bottom for the deal when the photo has no free space for it
BAND_COLOR = (24, 38, 29, 255)


def render(spec, band=None):
    if band is None:  # full photo is the standard (Vasil 2026-11-20: the band "takes too much from the photo")
        band = bool(spec.get("band"))
    return _render(spec, band)


class Retry(Exception):
    pass


def _render(spec, band):
    base = os.path.join(ROOT, "..", spec["dir"]) if spec.get("dir") else ROOT
    out = os.path.join(base, "posts", spec["id"])
    os.makedirs(out, exist_ok=True)
    src = Image.open(os.path.join(base, "materials", "img", spec["img"] + ".jpg")).convert("RGB")
    ph = H - BAND if band else H
    photo = cover(src, spec.get("focus", 0.5), spec.get("shiftx", 0.0), ph).convert("RGBA")
    mask = np.zeros((H, W), bool)
    for x0, y0, x1, y1 in spec.get("keep") or []:  # faces and the product, fractions of the image
        mask[int(y0 * H):int(y1 * H), int(x0 * W):int(x1 * W)] = True
    im = Image.new("RGBA", (W, H), BAND_COLOR)
    im.alpha_composite(photo, (0, 0))
    d = ImageDraw.Draw(im)

    # logo
    lg = Image.open(LOGO_WHITE if spec.get("logo") == "white" else LOGO_COLOR).convert("RGBA")
    lw = spec.get("logo_w", 230)
    lg = lg.resize((lw, int(lg.height * lw / lg.width)), Image.LANCZOS)
    logo_opts = [(M, 50), (W - M - lw, 50)]
    lx, ly = min(logo_opts, key=lambda p: cov(mask, (p[0], p[1], p[0] + lw, p[1] + lg.height)))

    # deal block: big number + note, then sub line and address under it
    fsub = ImageFont.truetype(FONT_B, 32)
    fu = ImageFont.truetype(FONT_B, 32)
    fu_b = ImageFont.truetype(FONT, 38)
    note_lines = spec["note"].split("\n")

    def deal_box(bs, x, bottom):
        fb = ImageFont.truetype(FONT, bs)
        fn = ImageFont.truetype(FONT, max(36, int(bs * 0.2)))
        bw = d.textlength(spec["big"], font=fb)
        nw = text_w(d, spec["note"], fn)
        sw = d.textlength(spec.get("sub", ""), font=fsub)
        w = max(bw + 18 + nw, sw, 420)
        h = int(bs * 0.95) + 46 + 50
        x0 = x if x == M else W - M - w
        return (x0, bottom - h, x0 + w, bottom), fb, fn, bw

    # headline block
    def head_box(size, x_left, y):
        f = ImageFont.truetype(FONT, size)
        w = text_w(d, spec["title"], f)
        h = int(size * 0.88) * len(spec["title"].split("\n"))
        x0 = M if x_left else W - M - w
        return (x0, y, x0 + w, y + h), f

    top = ly + lg.height + 30
    # Fixed layout, sides chosen per photo (Vasil 2026-11-20: full photo, original look; text never on
    # faces or the product). head_side / deal_side: "left" or "right".
    hleft = spec.get("head_side", "left") == "left"
    dright = spec.get("deal_side", "left") == "right"
    bs = spec.get("big_size", 240)
    dbox, fb, fn, bw = deal_box(bs, None if dright else M, H - 40)
    size = spec.get("size", 170)
    hbox, fh = head_box(size, hleft, top + spec.get("gap", 0))
    dcov, hcov = cov(mask, dbox), cov(mask, hbox)
    hbest = (hcov, -size, 0, hbox, fh, hleft)
    hcov, nsize, _, hbox, fh, hleft = hbest

    # soft shade only behind the text blocks
    sh = Image.new("L", (W, H), 0)
    sd = ImageDraw.Draw(sh)
    blocks = [(hbox, 120), ((lx, ly, lx + lw, ly + lg.height), 70)] + ([] if band else [(dbox, 140)])
    for b, a in blocks:
        sd.rectangle((b[0] - 70, b[1] - 50, b[2] + 70, b[3] + 50), fill=a)
    sh = sh.filter(ImageFilter.GaussianBlur(70))
    if band:  # soft fade from the photo into the band
        for i in range(120):
            ImageDraw.Draw(sh).line((0, ph - 120 + i, W, ph - 120 + i), fill=int(255 * (i / 120) ** 2))
    shade = Image.new("RGBA", (W, H), BAND_COLOR if band else (10, 14, 12, 255))
    shade.putalpha(sh)
    im = Image.alpha_composite(im, shade)
    d = ImageDraw.Draw(im)

    im.alpha_composite(lg, (lx, ly))
    y = hbox[1]
    step = int(-nsize * 0.88)
    for ln in spec["title"].split("\n"):
        x = hbox[0] if hleft else W - M - d.textlength(ln, font=fh)
        d.text((x - 4, y), ln, font=fh, fill="white")
        y += step

    x0 = dbox[0]
    col = spec.get("deal_color", "#d9e2c8")
    bsz = fb.size
    by = dbox[1]
    d.text((x0 - 6, by), spec["big"], font=fb, fill=col)
    ny = by + int(bsz * 0.30)
    for ln in note_lines:
        d.text((x0 + bw + 18, ny), ln, font=fn, fill="white")
        ny += int(fn.size * 1.05)
    sy = by + int(bsz * 0.95)
    if spec.get("sub"):
        d.text((x0, sy), spec["sub"], font=fsub, fill="white")
    u = sy + 50
    d.text((x0, u), "WWW.", font=fu, fill="white")
    x = x0 + d.textlength("WWW.", font=fu)
    d.text((x, u - 5), "HIKESUPPLYCO", font=fu_b, fill="white")
    x += d.textlength("HIKESUPPLYCO", font=fu_b)
    d.text((x, u), ".COM", font=fu, fill="white")

    p = os.path.join(out, "1.jpg")
    im.convert("RGB").save(p, quality=92)
    chk = im.convert("RGB").copy()
    red = Image.new("RGB", (W, H), (255, 0, 0))
    chk.paste(Image.blend(chk, red, 0.35), (0, 0), Image.fromarray((mask * 255).astype(np.uint8)))
    chk.resize((540, 675)).save(os.path.join(out, "check.jpg"), quality=80)
    worst = max(hcov, dcov)
    msg = f"{p}  headline covers {hcov:.0%} of its box with subject, deal {dcov:.0%}"
    if worst > 0.0:
        raise SystemExit("TEXT COVERS THE SUBJECT, pick another photo or crop: " + msg)
    return msg


if __name__ == "__main__":
    print(render(json.load(open(sys.argv[1]))))
