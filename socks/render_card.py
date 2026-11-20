"""Simple carousel card for socks ads (Vasil 2026-11-20): full photo or 2x2 grid, one short white headline
at the top left plus an optional sub line, same fonts and shade as the promo posts.
python3 socks/render_card.py out.jpg "HEADLINE" "sub line" img1 [img2 img3 img4]   (img = socks/materials/img id or a file path)
"""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
R = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(R, "..", "pins", "BarlowCondensed-ExtraBold.ttf")
FONT_B = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
W, H, M = 1080, 1350, 60
out, title, sub, imgs = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4:]
def load(k):
    p = k if os.path.exists(k) else os.path.join(R, "materials", "img", k + ".jpg")
    return Image.open(p).convert("RGB")
def cover(im, w, h, fy=0.5):
    r = max(w / im.width, h / im.height); im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    x = (im.width - w) // 2; y = int((im.height - h) * fy); return im.crop((x, y, x + w, y + h))
if len(imgs) == 1:
    im = cover(load(imgs[0]), W, H)
else:
    im = Image.new("RGB", (W, H), (233, 228, 220)); top = 300; g = 12
    cw, ch = (W - 3 * g) // 2, (H - top - 3 * g) // 2
    for i, k in enumerate(imgs[:4]):
        im.paste(cover(load(k), cw, ch), (g + (i % 2) * (cw + g), top + g + (i // 2) * (ch + g)))
im = im.convert("RGBA")
sh = Image.new("L", (W, H), 0); ImageDraw.Draw(sh).rectangle((0, 0, W, 300), fill=170)
sh = sh.filter(ImageFilter.GaussianBlur(70)); shade = Image.new("RGBA", (W, H), (10, 14, 12, 255)); shade.putalpha(sh)
im = Image.alpha_composite(im, shade); d = ImageDraw.Draw(im)
fh = ImageFont.truetype(FONT, 118); d.text((M - 4, 70), title, font=fh, fill="white")
if sub: d.text((M, 70 + fh.getbbox(title)[3] + 22), sub, font=ImageFont.truetype(FONT_B, 34), fill="white")
im.convert("RGB").save(out, quality=92); print(out)
