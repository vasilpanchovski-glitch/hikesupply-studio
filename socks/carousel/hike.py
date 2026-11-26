import sys, json
from PIL import Image, ImageDraw, ImageFont, ImageFilter
src,out,spec=sys.argv[1],sys.argv[2],json.loads(sys.argv[3])
im=Image.open(src).convert('RGB').resize((1500,2000),Image.LANCZOS); W,H=im.size
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'
fh=ImageFont.truetype(B,spec.get('hsize',150)); fs=ImageFont.truetype(SB,64)
# soft shade only where the text sits
g=Image.new('L',(1,H))
for y in range(H):
    a=0
    if spec['pos']=='top' and y<800: a=int(200*(1-y/800)**1.2)
    if spec['pos']=='bottom' and y>H-760: a=int(215*((y-(H-760))/760)**1.1)
    g.putpixel((0,y),a)
im=Image.composite(Image.new('RGB',(W,H),(14,18,14)),im,g.resize((W,H)))
d=ImageDraw.Draw(im)
def sh(xy,t,f,fill='white'):
    s=Image.new('L',(W,H),0); ImageDraw.Draw(s).text(xy,t,font=f,fill=190); s=s.filter(ImageFilter.GaussianBlur(14)); im.paste((0,0,0),(0,0),s); ImageDraw.Draw(im).text(xy,t,font=f,fill=fill)
lines=spec['head']; lh=spec.get('hsize',150)+10
y0 = 110 if spec['pos']=='top' else H-150-lh*len(lines)-90
for i,t in enumerate(lines):
    w=d.textlength(t,font=fh)
    x = 100 if spec['align']=='l' else (W-w-100 if spec['align']=='r' else (W-w)/2)
    sh((x,y0+i*lh),t,fh)
sub=spec['sub']; w=d.textlength(sub,font=fs)
x = 100 if spec['align']=='l' else (W-w-100 if spec['align']=='r' else (W-w)/2)
sh((x,y0+len(lines)*lh+20),sub,fs,(235,235,230))
im.save(out,quality=92)
