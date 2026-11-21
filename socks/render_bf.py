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
if mode == "reel" and img != "s34":  # push the photo down so the socks sit below the text (mirror wood into the gap)
    shift = 150 if img == "s28" else 330; base = im.copy(); im.paste(base, (0, shift)); im.paste(base.crop((0, 0, W, shift)).transpose(Image.FLIP_TOP_BOTTOM), (0, 0))
im = im.convert("RGBA")
sh = Image.new("L", (W, H), 0)
ImageDraw.Draw(sh).rectangle((0, 0, 420, 820) if mode == "feed" else (0, 0, W, 860), fill=175)
sh = sh.filter(ImageFilter.GaussianBlur(80))
shade = Image.new("RGBA", (W, H), (10, 14, 12, 255)); shade.putalpha(sh)
im = Image.alpha_composite(im, shade); d = ImageDraw.Draw(im)
lg = Image.open(os.path.join(R, "brand", "logo_color.png")).convert("RGBA")
lw = 190 if mode == "feed" else 210
lg = lg.resize((lw, int(lg.height * lw / lg.width)), Image.LANCZOS)
yy = 50 if mode == "feed" else 200
im.alpha_composite(lg, (M, yy)); yy += lg.height + 30
if mode == "feed":
    sz = 130
    while d.textlength("FRIDAY", font=ImageFont.truetype(FONT, sz)) > 262: sz -= 2
    fbf = ImageFont.truetype(FONT, sz)
    for ln in ["BLACK", "FRIDAY"]:
        d.text((M - 5, yy), ln, font=fbf, fill="white"); yy += int(sz * 0.88)
    yy += 16
    fs2 = 66
    while d.textlength("GET 1 FREE", font=ImageFont.truetype(FONT, fs2)) > 262: fs2 -= 2
    fb = ImageFont.truetype(FONT, fs2)
    for ln in ["BUY 2", "GET 1 FREE"]:
        d.text((M - 4, yy), ln, font=fb, fill=GREEN); yy += 60
    yy += 16
    d.text((M, yy), "Merino wool socks", font=ImageFont.truetype(FONT_B, 30), fill="white"); yy += 42
    d.text((M, yy), "3 pairs for $39.98", font=ImageFont.truetype(FONT_B, 30), fill="white"); yy += 42
    d.text((M, yy), "Nov 27 - Dec 1", font=ImageFont.truetype(FONT_B, 26), fill="white")
else:
    sz = 230
    while d.textlength("BLACK FRIDAY", font=ImageFont.truetype(FONT, sz)) > W - 2 * M: sz -= 2
    fbf = ImageFont.truetype(FONT, sz)
    d.text((M - 8, yy - 10), "BLACK FRIDAY", font=fbf, fill="white"); yy += int(sz * 0.95)
    fb = ImageFont.truetype(FONT, 140)
    d.text((M - 6, yy), "BUY 2, GET 1 FREE", font=fb, fill=GREEN); yy += 150
    d.text((M, yy), "Merino wool socks  \u00b7  3 pairs for $39.98  \u00b7  Nov 27 - Dec 1", font=ImageFont.truetype(FONT_B, 34), fill="white"); yy += 50
im.convert("RGB").save(out, quality=92); print(out, "text ends", yy)
