"""Add thin white feature callouts to a sock photo.
Usage: python3 socks/session/callouts.py in.jpg out.jpg spec.json
spec: [{"pt":[x,y], "at":[x,y], "lines":["LINE 1","LINE 2"]}]  (coords in image pixels; "at" = text centre)
"""
import sys, json
from PIL import Image, ImageDraw, ImageFont, ImageFilter
src, out, spec = sys.argv[1], sys.argv[2], json.load(open(sys.argv[3]))
im = Image.open(src).convert('RGB')
W, H = im.size
s = W / 1792
font = ImageFont.truetype('pins/Inter.ttf', int(34 * s))
try: font.set_variation_by_axes([500])
except Exception: pass
lw = max(2, int(2.4 * s)); lh = int(44 * s)
shadow = Image.new('RGBA', im.size, (0, 0, 0, 0)); sd = ImageDraw.Draw(shadow)
top = Image.new('RGBA', im.size, (0, 0, 0, 0)); td = ImageDraw.Draw(top)
for c in spec:
    px, py = c['pt']; ax, ay = c['at']; lines = c['lines']
    bw = max(td.textlength(t, font=font) for t in lines); bh = lh * len(lines)
    # line ends at the edge of the text block nearest the point
    ex = ax - bw / 2 - 18 * s if px < ax - bw / 2 else (ax + bw / 2 + 18 * s if px > ax + bw / 2 else ax)
    ey = ay if ex != ax else (ay - bh / 2 - 12 * s if py < ay else ay + bh / 2 + 12 * s)
    for d, col in ((sd, (0, 0, 0, 150)), (td, (255, 255, 255, 245))):
        d.line([(px, py), (ex, ey)], fill=col, width=lw)
        r = 6 * s; d.ellipse([px - r, py - r, px + r, py + r], fill=col)
        for i, t in enumerate(lines):
            d.text((ax, ay - bh / 2 + lh * i + lh / 2), t, font=font, fill=col, anchor='mm')
shadow = shadow.filter(ImageFilter.GaussianBlur(4 * s))
im = Image.alpha_composite(Image.alpha_composite(im.convert('RGBA'), shadow), top).convert('RGB')
im.save(out, quality=92)
