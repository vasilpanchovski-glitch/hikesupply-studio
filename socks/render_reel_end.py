"""9:16 end card for socks Reels/Stories ads, inside the Instagram safe zone
(Vasil 2026-11-20: the bottom text was hidden under the Reels caption and Shop button).
Text only in the top 1/3; nothing important below y=1420 or in the right 140 px.
python3 socks/render_reel_end.py <img id> <out.jpg>"""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
R = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(R, "..", "pins", "BarlowCondensed-ExtraBold.ttf")
FONT_B = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
W, H, M = 1080, 1920, 64
img, out = sys.argv[1], sys.argv[2]
shift = int(sys.argv[3]) if len(sys.argv) > 3 else 150
src = Image.open(os.path.join(R, "materials", "img", img + ".jpg")).convert("RGB")
r = W / src.width
src = src.resize((W, round(src.height * r)), Image.LANCZOS)
src = src.crop((0, (src.height - H) // 2, W, (src.height - H) // 2 + H))
im = Image.new("RGB", (W, H))
im.paste(src, (0, shift))
top = src.crop((0, 0, W, shift)).transpose(Image.FLIP_TOP_BOTTOM)  # mirror wood into the gap
im.paste(top, (0, 0))
im = im.convert("RGBA")
sh = Image.new("L", (W, H), 0)
ImageDraw.Draw(sh).rectangle((0, 0, W, 760), fill=150)
sh = sh.filter(ImageFilter.GaussianBlur(90))
shade = Image.new("RGBA", (W, H), (10, 14, 12, 255)); shade.putalpha(sh)
im = Image.alpha_composite(im, shade)
d = ImageDraw.Draw(im)
lg = Image.open(os.path.join(R, "brand", "logo_color.png")).convert("RGBA")
lw = 210; lg = lg.resize((lw, int(lg.height * lw / lg.width)), Image.LANCZOS)
y = 210
im.alpha_composite(lg, (M, y)); y += lg.height + 34
fh = ImageFont.truetype(FONT, 122)
d.text((M - 4, y), "MERINO WOOL SOCKS", font=fh, fill="white"); y += fh.getbbox("THE")[3] + 26
fb = ImageFont.truetype(FONT, 150); fn = ImageFont.truetype(FONT, 40)
d.text((M - 6, y), "-15%", font=fb, fill="#d9e2c8")
bx = M + d.textlength("-15%", font=fb) + 22
d.text((bx, y + 40), "WHEN YOU BUY\n3+ PAIRS", font=fn, fill="white", spacing=4)
y += fb.getbbox("-15%")[3] + 18
d.text((M, y), "$19.99 a pair  ·  2 pairs save 10%  ·  80% merino", font=ImageFont.truetype(FONT_B, 33), fill="white")
im.convert("RGB").save(out, quality=92)
print(out, "text ends at y =", y + 40)
