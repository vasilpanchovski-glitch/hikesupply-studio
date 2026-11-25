import sys
from PIL import Image, ImageDraw, ImageFont
src,out=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB').resize((1500,2000),Image.LANCZOS); W,H=im.size
g=Image.new('L',(1,H))
for y in range(H):
    g.putpixel((0,y),int(235*(1-y/1250)**0.9) if y<1250 else 0)
im=Image.composite(Image.new('RGB',(W,H),(14,18,14)),im,g.resize((W,H)))
d=ImageDraw.Draw(im)
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'; I='pins/Inter.ttf'
fh=ImageFont.truetype(B,210); fk=ImageFont.truetype(SB,60); fl=ImageFont.truetype(I,46)
def c(t,f,y,fill='white'):
    w=d.textlength(t,font=f); d.text(((W-w)/2,y),t,font=f,fill=fill)
c('TRY THEM AT HOME',fk,110,(225,225,218))
c('30-DAY',fh,170); c('RETURNS',fh,370)
y=640
for t in ['Free shipping, no minimum','Arrives in 6 to 13 business days, tracked','Damaged or wrong item? Replaced or refunded, free','Email support answered within 24 hours, Mon to Fri']:
    c(t,fl,y); y+=92
im.save(out,quality=92)
