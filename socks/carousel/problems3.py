import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
src,out=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB').resize((1500,2000)); W,H=im.size
g=Image.new('L',(1,H))
for y in range(H):
    a=int(225*(1-y/900)**1.1) if y<900 else 0
    if y>H-330: a=max(a,int(170*((y-(H-330))/330)**1.3))
    g.putpixel((0,y),a)
im=Image.composite(Image.new('RGB',(W,H),(14,18,14)),im,g.resize((W,H)))
d=ImageDraw.Draw(im)
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'
fq=ImageFont.truetype(B,150); fa=ImageFont.truetype(SB,64)
lines=['COLD FEET?','DAMP SOCKS?','SMELLY BY NOON?']
y=120
for t in lines:
    d.text((100,y),t,font=fq,fill='white'); y+=165
ans='Merino wool fixes all three. Warm, dry, fresh.'
w=d.textlength(ans,font=fa); d.text(((W-w)/2,H-170),ans,font=fa,fill='white')
im.save(out,quality=92)
