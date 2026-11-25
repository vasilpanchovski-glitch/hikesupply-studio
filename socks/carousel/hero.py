import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB').resize((1500,2000))
W,H = im.size
# top gradient for headline legibility
g = Image.new('L',(1,H))
for y in range(H):
    a = 0
    if y < 760: a = int(200*(1-y/760)**1.3)
    if y > H-520: a = max(a,int(190*((y-(H-520))/520)**1.4))
    g.putpixel((0,y),a)
shade = Image.new('RGB',(W,H),(14,18,14))
im = Image.composite(shade, im, g.resize((W,H)))
d = ImageDraw.Draw(im)
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'; I='pins/Inter.ttf'
f1=ImageFont.truetype(B,188); f2=ImageFont.truetype(I,50); fc=ImageFont.truetype(SB,52)
y=120
for line in ['WARM, DRY FEET','ALL WINTER LONG']:
    w=d.textlength(line,font=f1); d.text(((W-w)/2,y),line,font=f1,fill='white'); y+=190
sub='Merino wool crew socks with a cushioned sole'
w=d.textlength(sub,font=f2); d.text(((W-w)/2,y+30),sub,font=f2,fill=(235,235,230))
# badges, 2x2 white chips at bottom
chips=['80% MERINO WOOL','CUSHIONED SOLE','FREE SHIPPING','30-DAY RETURNS']
cw,ch,gap=600,110,40
x0=(W-2*cw-gap)//2; yb=H-120-2*ch-gap
for i,t in enumerate(chips):
    cx=x0+(i%2)*(cw+gap); cy=yb+(i//2)*(ch+gap)
    d.rounded_rectangle([cx,cy,cx+cw,cy+ch],radius=55,fill='white')
    tw=d.textlength(t,font=fc); d.text((cx+(cw-tw)/2,cy+(ch-62)/2),t,font=fc,fill=(28,36,30))
im.save(out,quality=92)
