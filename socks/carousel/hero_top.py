import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB').resize((1500,2000))
W,H = im.size
# top gradient for headline legibility
g = Image.new('L',(1,H))
for y in range(H):
    a = 0
    if y < 1000: a = int(215*(1-y/1000)**1.2)
    pass
    g.putpixel((0,y),a)
shade = Image.new('RGB',(W,H),(14,18,14))
im = Image.composite(shade, im, g.resize((W,H)))
d = ImageDraw.Draw(im)
B='pins/BarlowCondensed-ExtraBold.ttf'; SB='pins/BarlowCondensed-SemiBold.ttf'; I='pins/Inter.ttf'
f1=ImageFont.truetype(B,188); f2=ImageFont.truetype(SB,76); fc=ImageFont.truetype(SB,52)
y=120
for line in ['WARM, DRY FEET','ALL WINTER LONG']:
    w=d.textlength(line,font=f1); d.text(((W-w)/2,y),line,font=f1,fill='white'); y+=190
sub='Merino wool crew socks with a cushioned sole'
w=d.textlength(sub,font=f2)
sh=Image.new('L',(W,H),0); ImageDraw.Draw(sh).text(((W-w)/2,y+32),sub,font=f2,fill=230)
sh=sh.filter(ImageFilter.GaussianBlur(10)); im.paste((0,0,0),(0,0),sh); d=ImageDraw.Draw(im)
d.text(((W-w)/2,y+30),sub,font=f2,fill='white')
# facts line directly under the subline, so nothing covers the product
facts=[('80%','MERINO WOOL'),('SOFT','TERRY INSIDE'),('FREE','SHIPPING'),('30-DAY','RETURNS')]
fb=ImageFont.truetype(B,84); fs=ImageFont.truetype(SB,40)
colw=(W-160)/4; yb=y+150
for i,(a,b2) in enumerate(facts):
    cx=80+colw*i+colw/2
    wa=d.textlength(a,font=fb); d.text((cx-wa/2,yb),a,font=fb,fill='white')
    wb=d.textlength(b2,font=fs); d.text((cx-wb/2,yb+98),b2,font=fs,fill=(225,225,218))
    if i: d.line([(80+colw*i,yb+10),(80+colw*i,yb+130)],fill=(255,255,255),width=2)
im.save(out,quality=92)
