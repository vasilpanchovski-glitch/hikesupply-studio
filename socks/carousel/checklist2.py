import sys
from PIL import Image, ImageDraw, ImageFont
src,out=sys.argv[1],sys.argv[2]
W,H=1500,2000; P=1060; BG=(28,36,30)
im=Image.new('RGB',(W,H),BG)
ph=Image.open(src).convert('RGB').resize((1500,2000)).crop((0,620,1500,620+H-P))
# fade photo top into panel
m=Image.new('L',(1,ph.height))
for y in range(ph.height): m.putpixel((0,y),min(255,int(255*(y/160)**1.2)) if y<160 else 255)
im.paste(Image.composite(ph,Image.new('RGB',ph.size,BG),m.resize(ph.size)),(0,P))
d=ImageDraw.Draw(im)
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'; I='pins/Inter.ttf'
fh=ImageFont.truetype(B,170); fp=ImageFont.truetype(I,46); fs=ImageFont.truetype(B,84)
t='SOUND FAMILIAR?'; w=d.textlength(t,font=fh); d.text(((W-w)/2,110),t,font=fh,fill='white')
rows=[('Cold feet all winter','MERINO HOLDS WARMTH'),('Damp, sweaty feet in boots','WICKS MOISTURE AWAY'),('Socks that smell by evening','RESISTS ODOR')]
L,R=150,W-150; y=350; rh=215
line=(70,84,74); muted=(150,162,152)
d.line([(L,y),(R,y)],fill=line,width=2)
for p,s2 in rows:
    pb=d.textbbox((0,0),p,font=fp); pw=pb[2]-pb[0]
    py=y+34; d.text(((W-pw)/2,py),p,font=fp,fill=muted)
    my=py+(pb[1]+pb[3])/2; d.line([((W-pw)/2-6,my),((W+pw)/2+6,my)],fill=muted,width=3)
    sw=d.textlength(s2,font=fs); d.text(((W-sw)/2,py+64),s2,font=fs,fill='white')
    y+=rh; d.line([(L,y),(R,y)],fill=line,width=2)
im.save(out,quality=92)
