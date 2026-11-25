import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
src,out=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB').resize((1500,2000)); W,H=im.size
d=ImageDraw.Draw(im)
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'
fh=ImageFont.truetype(B,150); fl=ImageFont.truetype(B,66); fs=ImageFont.truetype(SB,44)
def shadow_text(xy,t,f,fill='white'):
    sh=Image.new('L',(W,H),0); ImageDraw.Draw(sh).text(xy,t,font=f,fill=200)
    sh=sh.filter(ImageFilter.GaussianBlur(12)); im.paste((0,0,0),(0,0),sh)
    ImageDraw.Draw(im).text(xy,t,font=f,fill=fill)
shadow_text((100,110),'WHAT MAKES IT WARM',fh)
# label: (text, sub, text pos, point on the sock)
labels=[('80% MERINO KNIT','holds heat, wicks sweat',(100,560),(560,760)),
        ('SOFT TERRY INSIDE','loops trap warm air',(900,330),(1060,600)),
        ('CUSHIONED HEEL AND TOE','thicker where boots rub',(100,1620),(300,1470))]
for t,s,(tx,ty),(px,py) in labels:
    shadow_text((tx,ty),t,fl); shadow_text((tx,ty+72),s,fs,(230,230,225))
    tw=max(d.textlength(t,font=fl),d.textlength(s,font=fs))
    # start the pointer at the nearest end of the label
    sx = tx+tw+30 if px>tx+tw/2 else tx-30
    sy = ty+60
    d2=ImageDraw.Draw(im)
    d2.line([(sx,sy),(px,py)],fill='white',width=4)
    d2.ellipse([px-14,py-14,px+14,py+14],fill='white')
    d2.ellipse([px-8,py-8,px+8,py+8],fill=(30,40,60))
im.save(out,quality=92)
