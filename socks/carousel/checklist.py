import sys
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB').resize((1500,2000)); W,H=im.size
g = Image.new('L',(1,H))
for y in range(H):
    a = int(215*(1-y/1150)**1.1) if y<1150 else 0
    if y > H-420: a = max(a,int(200*((y-(H-420))/420)**1.2))
    g.putpixel((0,y),a)
im = Image.composite(Image.new('RGB',(W,H),(14,18,14)), im, g.resize((W,H)))
d = ImageDraw.Draw(im)
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'; I='pins/Inter.ttf'
f1=ImageFont.truetype(B,180); fl=ImageFont.truetype(I,62); fe=ImageFont.truetype(SB,64)
t='SOUND FAMILIAR?'; w=d.textlength(t,font=f1); d.text(((W-w)/2,130),t,font=f1,fill='white')
items=['Cold feet all winter','Damp, sweaty feet in boots','Socks that smell by evening']
y=430; x=250
for it in items:
    # simple white check mark, no circles
    d.line([(x,y+42),(x+26,y+68),(x+74,y+12)],fill='white',width=11,joint='curve')
    d.text((x+120,y),it,font=fl,fill='white'); y+=130
end='MERINO WOOL KEEPS FEET WARM, DRY AND FRESH'
w=d.textlength(end,font=fe); d.text(((W-w)/2,H-190),end,font=fe,fill='white')
im.save(out,quality=92)
