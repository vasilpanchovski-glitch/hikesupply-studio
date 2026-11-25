import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
src,out=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB').resize((1500,2000)); W,H=im.size
g=Image.new('L',(1,H))
for y in range(H):
    a=int(210*(1-y/700)**1.2) if y<700 else 0
    if y>H-760: a=max(a,int(235*((y-(H-760))/760)**0.9))
    g.putpixel((0,y),a)
im=Image.composite(Image.new('RGB',(W,H),(14,18,14)),im,g.resize((W,H)))
d=ImageDraw.Draw(im)
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'; I='pins/Inter.ttf'
fh=ImageFont.truetype(B,150); fc=ImageFont.truetype(B,58); fr=ImageFont.truetype(SB,46); fv=ImageFont.truetype(I,40)
d.text((100,110),'WHY MERINO?',font=fh,fill='white')
cols=['','MERINO','SYNTHETIC','COTTON']
rows=[('Warm when damp','Yes','Some','No'),('Smell after a day','Low','High','High'),('Feel on skin','Soft','Slick','Soft'),('Dries','Fast','Fast','Slow')]
x0=100; cw=[420,300,330,300]; y=H-640; rh=120
line=(255,255,255)
# header
x=x0
for i,c in enumerate(cols):
    if c: w=d.textlength(c,font=fc); d.text((x+(cw[i]-w)/2,y),c,font=fc,fill='white')
    x+=cw[i]
y+=80; d.line([(x0,y),(x0+sum(cw),y)],fill=line,width=3)
for r in rows:
    x=x0; yy=y+30
    d.text((x,yy),r[0],font=fr,fill=(225,225,218)); x+=cw[0]
    for i,v in enumerate(r[1:]):
        w=d.textlength(v,font=fv); d.text((x+(cw[i+1]-w)/2,yy+4),v,font=fv,fill='white'); x+=cw[i+1]
    y+=rh; d.line([(x0,y),(x0+sum(cw),y)],fill=(140,150,140),width=1)
im.save(out,quality=92)
