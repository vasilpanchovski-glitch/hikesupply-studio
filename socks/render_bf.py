"""Black Friday 'BUY 2, GET 1 FREE' versions of the socks ad (Vasil 2026-11-21, offer o47).
python3 socks/render_bf.py feed <img id> <out.jpg>     4:5 card, narrow left text column
python3 socks/render_bf.py reel <img id> <out.jpg>     9:16 end card, text in the top third (Reels safe zone)"""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
R = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(R, "..", "pins", "BarlowCondensed-ExtraBold.ttf")
FONT_B = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
GREEN = "#d9e2c8"
mode, img, out = sys.argv[1], sys.argv[2], sys.argv[3]
W, H = (1080, 1350) if mode == "feed" else (1080, 1920)
M = 60 if mode == "feed" else 64
src = Image.open(os.path.join(R, "materials", "img", img + ".jpg")).convert("RGB")
r = max(W / src.width, H / src.height)
src = src.resize((round(src.width * r), round(src.height * r)), Image.LANCZOS)
x = (src.width - W) // 2; y = (src.height - H) // 2 if mode == "feed" else (src.height - H) // 2
im = src.crop((x, y, x + W, y + H))
if mode == "reel":  # push the photo down so the socks sit below the text (mirror wood into the gap)
    shift = 150 if img == "s28" else 330; base = im.copy(); im.paste(base, (0, shift)); im.paste(base.crop((0, 0, W, shift)).transpose(Image.FLIP_TOP_BOTTOM), (0, 0))
im = im.convert("RGBA")
sh = Image.new("L", (W, H), 0)
ImageDraw.Draw(sh).rectangle((0, 0, 400, 800) if mode == "feed" else (0, 0, W, 800), fill=160)
sh = sh.filter(ImageFilter.GaussianBlur(80))
shade = Image.new("RGBA", (W, H), (10, 14, 12, 255)); shade.putalpha(sh)
im = Image.alpha_composite(im, shade); d = ImageDraw.Draw(im)
lg = Image.open(os.path.join(R, "brand", "logo_color.png")).convert("RGBA")
lw = 190 if mode == "feed" else 210
lg = lg.resize((lw, int(lg.height * lw / lg.width)), Image.LANCZOS)
yy = 50 if mode == "feed" else 200
im.alpha_composite(lg, (M, yy)); yy += lg.height + 30
fs = ImageFont.truetype(FONT, 34 if mode == "feed" else 40)
d.text((M, yy), "BLACK FRIDAY", font=fs, fill=GREEN); yy += (46 if mode == "feed" else 54)
if mode == "feed":
    fh = ImageFont.truetype(FONT, 80)
    for ln in ["MERINO", "WOOL", "SOCKS"]:
        d.text((M - 4, yy), ln, font=fh, fill="white"); yy += 71
    yy += 20
    fb = ImageFont.truetype(FONT, 64)
    for ln in ["BUY 2", "GET 1 FREE"]:
        d.text((M - 4, yy), ln, font=fb, fill=GREEN); yy += 59
    yy += 18
    d.text((M, yy), "3 pairs for $39.98", font=ImageFont.truetype(FONT_B, 31), fill="white"); yy += 46
    d.text((M, yy), "Nov 27 - Dec 1", font=ImageFont.truetype(FONT_B, 27), fill="white")
else:
    fh = ImageFont.truetype(FONT, 118)
    d.text((M - 4, yy), "MERINO WOOL SOCKS", font=fh, fill="white"); yy += 118
    fb = ImageFont.truetype(FONT, 150)
    d.text((M - 6, yy), "BUY 2, GET 1 FREE", font=fb, fill=GREEN); yy += 160
    d.text((M, yy), "3 pairs for $39.98  ·  Nov 27 - Dec 1", font=ImageFont.truetype(FONT_B, 36), fill="white"); yy += 50
im.convert("RGB").save(out, quality=92); print(out, "text ends", yy)
