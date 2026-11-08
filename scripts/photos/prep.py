# prep.py in out [crop=x0,y0,x1,y1] [blank=x0,y0,x1,y1 ...]  (fractions of width/height)
import sys
from PIL import Image, ImageDraw
im = Image.open(sys.argv[1]).convert("RGB")
for a in sys.argv[3:]:
    k, v = a.split("="); x0, y0, x1, y1 = map(float, v.split(","))
    W, H = im.size; b = (int(x0*W), int(y0*H), int(x1*W), int(y1*H))
    if k == "crop": im = im.crop(b)
    else: ImageDraw.Draw(im).rectangle(b, fill=(255, 255, 255))
im.save(sys.argv[2], quality=95)
