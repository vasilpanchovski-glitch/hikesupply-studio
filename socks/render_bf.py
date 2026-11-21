"""Black Friday 'BUY 2, GET 1 FREE' versions of the socks ad (Vasil 2026-11-21, offer o47).
python3 socks/render_bf.py feed <img id> <out.jpg>     4:5 card, narrow left text column
python3 socks/render_bf.py reel <img id> <out.jpg>     9:16 end card, text in the top third (Reels safe zone)
Add "right" as a 4th argument to put the feed text column on the right (s35: hands and socks sit left).
Reel: a 4:5 photo is fitted to the width and set at the bottom; the dark top is extended with a blurred copy."""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
R = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(R, "..", "pins", "BarlowCondensed-ExtraBold.ttf")
FONT_B = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
GREEN = "#d9e2c8"
mode, img, out = sys.argv[1], sys.argv[2], sys.argv[3]
RIGHT = len(sys.argv) > 4 and sys.argv[4] == "right"
W, H = (1080, 1350) if mode == "feed" else (1080, 1920)
M = 60 if mode == "feed" else 64
src = Image.open(os.path.join(R, "materials", "img", img + ".jpg")).convert("RGB")
FIT = mode == "reel" and src.width / src.height > 0.7
if FIT:  # keep the whole 4:5 photo, bottom-aligned; fill the top with a blurred, stretched copy of its dark top
    src = src.resize((W, round(src.height * W / src.width)), Image.LANCZOS)
    top = H - src.height
    im = src.crop((0, 0, W, 220)).resize((W, top + 220)).filter(ImageFilter.GaussianBlur(30))
    im = im.crop((0, 0, W, H)) if im.height >= H else im
    canvas = Image.new("RGB", (W, H)); canvas.paste(im, (0, 0))
    m = Image.linear_gradient("L").resize((W, 160))  # soft seam
    canvas.paste(src, (0, top)); band = src.crop((0, 0, W, 160))
    canvas.paste(im.crop((0, top, W, top + 160)), (0, top), Image.eval(m, lambda v: 255 - v))
    im = canvas
else:
    r = max(W / src.width, H / src.height)
    src = src.resize((round(src.width * r), round(src.height * r)), Image.LANCZOS)
    x = (src.width - W) // 2; y = (src.height - H) // 2
    im = src.crop((x, y, x + W, y + H))
if mode == "reel" and not FIT and img != "s34":  # push the photo down so the socks sit below the text (mirror wood into the gap)
    shift = 150 if img == "s28" else 330; base = im.copy(); im.paste(base, (0, shift)); im.paste(base.crop((0, 0, W, shift)).transpose(Image.FLIP_TOP_BOTTOM), (0, 0))
im = im.convert("RGBA")
sh = Image.new("L", (W, H), 0)
ImageDraw.Draw(sh).rectangle(((W - 420, 0, W, 820) if RIGHT else (0, 0, 420, 820)) if mode == "feed" else (0, 0, W, 860), fill=175)
sh = sh.filter(ImageFilter.GaussianBlur(80))
shade = Image.new("RGBA", (W, H), (10, 14, 12, 255)); shade.putalpha(sh)
im = Image.alpha_composite(im, shade); d = ImageDraw.Draw(im)
lg = Image.open(os.path.join(R, "brand", "logo_color.png")).convert("RGBA")
lw = 190 if mode == "feed" else 210
lg = lg.resize((lw, int(lg.height * lw / lg.width)), Image.LANCZOS)
yy = 50 if mode == "feed" else 200
X0 = W - M - 262 if RIGHT else M  # left edge of the text column
im.alpha_composite(lg, (X0 if mode == "feed" else M, yy)); yy += lg.height + 30
if mode == "feed": M = X0
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
