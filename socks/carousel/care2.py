import sys
from PIL import Image, ImageDraw, ImageFont
src,out=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB').resize((1500,2000),Image.LANCZOS); W,H=im.size
d=ImageDraw.Draw(im)
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'
fh=ImageFont.truetype(B,120); fl=ImageFont.truetype(B,60); fs=ImageFont.truetype(SB,38)
ink=(36,42,50); sub=(80,86,94)
t='EASY CARE'; w=d.textlength(t,font=fh); d.text(((W-w)/2,50),t,font=fh,fill=ink)
steps=[('INSIDE OUT','before every wash'),('WASH COOL','wool cycle or by hand'),('NO DRYER','lay flat to dry')]
colw=(W-120)/3; y=210
for i,(t,s) in enumerate(steps):
    cx=60+colw*i+colw/2
    w=d.textlength(t,font=fl); d.text((cx-w/2,y),t,font=fl,fill=ink)
    w=d.textlength(s,font=fs); d.text((cx-w/2,y+70),s,font=fs,fill=sub)
    if i: d.line([(60+colw*i,y+5),(60+colw*i,y+110)],fill=ink,width=2)
im.save(out,quality=92)
