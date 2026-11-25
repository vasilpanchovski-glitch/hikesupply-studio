import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
src,out=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB').resize((1500,2000)); W,H=im.size
g=Image.new('L',(1,H))
for y in range(H):
    a=0
    if y>H-520: a=int(215*((y-(H-520))/520)**1.1)
    g.putpixel((0,y),a)
im=Image.composite(Image.new('RGB',(W,H),(14,18,14)),im,g.resize((W,H)))
d=ImageDraw.Draw(im)
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'
fk=ImageFont.truetype(SB,46); fl=ImageFont.truetype(B,96); fs=ImageFont.truetype(SB,50)
def block(x,align,kicker,title,sub):
    for t,f,dy,col in ((kicker,fk,0,(215,215,208)),(title,fl,60,'white'),(sub,fs,170,(230,230,225))):
        w=d.textlength(t,font=f); xx=x if align=='l' else x-w
        d.text((xx,H-430+dy),t,font=f,fill=col)
block(100,'l','BEFORE','THIN COTTON','cold floor, flat, holds sweat')
block(W-100,'r','AFTER','OUR MERINO','warm, cushioned, stays dry')
d.line([(W/2,H-440),(W/2,H-160)],fill=(255,255,255),width=2)
im.save(out,quality=92)
