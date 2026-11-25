import sys
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB').resize((1500,2000)); W,H=im.size
g = Image.new('L',(1,H))
for y in range(H):
    a = int(215*(1-y/1150)**1.1) if y<1150 else 0
    if y > H-560: a = max(a,int(225*((y-(H-560))/560)**1.1))
    g.putpixel((0,y),a)
im = Image.composite(Image.new('RGB',(W,H),(14,18,14)), im, g.resize((W,H)))
d = ImageDraw.Draw(im)
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'; I='pins/Inter.ttf'
f1=ImageFont.truetype(B,180); fl=ImageFont.truetype(I,62); fe=ImageFont.truetype(B,104)
t='SOUND FAMILIAR?'; w=d.textlength(t,font=f1); d.text(((W-w)/2,130),t,font=f1,fill='white')
items=['Cold feet all winter','Damp, sweaty feet in boots','Socks that smell by evening']
fl=ImageFont.truetype(I,68)
y=420
for it in items:
    w=d.textlength(it,font=fl); d.text(((W-w)/2,y),it,font=fl,fill='white'); y+=118
yy=H-330
for end in ['MERINO KEEPS FEET','WARM, DRY AND FRESH']:
    w=d.textlength(end,font=fe); d.text(((W-w)/2,yy),end,font=fe,fill='white'); yy+=112
im.save(out,quality=92)
