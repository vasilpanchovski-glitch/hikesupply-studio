"""Promo variant with all text in the left column (logo, headline, deal, address), for photos whose subject sits low and right. Vasil 2026-11-20 socks ad. python3 socks/render_promo_leftcol.py <img id> <out.jpg>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
R = "/home/claude/hikesupply-studio/socks"
FONT = os.path.join(R, "..", "pins", "BarlowCondensed-ExtraBold.ttf")
FONT_B = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
W, H, M = 1080, 1350, 60
img, out = sys.argv[1], sys.argv[2]
src = Image.open(os.path.join(R, "materials", "img", img + ".jpg")).convert("RGB")
r = max(W / src.width, H / src.height)
src = src.resize((round(src.width * r), round(src.height * r)), Image.LANCZOS)
x = (src.width - W) // 2; y = (src.height - H) // 2
im = src.crop((x, y, x + W, y + H)).convert("RGBA")
sh = Image.new("L", (W, H), 0)
ImageDraw.Draw(sh).rectangle((0, 0, 560, 860), fill=150)
sh = sh.filter(ImageFilter.GaussianBlur(80))
shade = Image.new("RGBA", (W, H), (10, 14, 12, 255)); shade.putalpha(sh)
im = Image.alpha_composite(im, shade); d = ImageDraw.Draw(im)
lg = Image.open(os.path.join(R, "brand", "logo_color.png")).convert("RGBA")
lw = 230; lg = lg.resize((lw, int(lg.height * lw / lg.width)), Image.LANCZOS)
yy = 50; im.alpha_composite(lg, (M, yy)); yy += lg.height + 36
fh = ImageFont.truetype(FONT, 128)
for ln in ["MERINO", "WOOL", "SOCKS"]:
    d.text((M - 4, yy), ln, font=fh, fill="white"); yy += int(128 * 0.88)
yy += 24
fb = ImageFont.truetype(FONT, 150); fn = ImageFont.truetype(FONT, 38)
d.text((M - 6, yy), "-15%", font=fb, fill="#d9e2c8")
bx = M + d.textlength("-15%", font=fb) + 18
d.text((bx, yy + 40), "WHEN YOU BUY\n3+ PAIRS", font=fn, fill="white", spacing=4)
yy += fb.getbbox("-15%")[3] + 20
d.text((M, yy), "$19.99 a pair  ·  2 pairs save 10%", font=ImageFont.truetype(FONT_B, 31), fill="white")
yy += 50
fu = ImageFont.truetype(FONT_B, 31); fub = ImageFont.truetype(FONT, 37)
d.text((M, yy), "WWW.", font=fu, fill="white"); xx = M + d.textlength("WWW.", font=fu)
d.text((xx, yy - 5), "HIKESUPPLYCO", font=fub, fill="white"); xx += d.textlength("HIKESUPPLYCO", font=fub)
d.text((xx, yy), ".COM", font=fu, fill="white")
im.convert("RGB").save(out, quality=92); print(out, "text ends", yy + 40)
