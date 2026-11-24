import os, sys, subprocess, tempfile
sys.path.insert(0, '/home/claude/hikesupply-studio/socks')
import render_video as rv
from PIL import Image, ImageDraw, ImageFont, ImageFilter
V = '/home/claude/hikesupply-studio/socks/session/hf2/vid/'
OUT = '/home/claude/hikesupply-studio/socks/posts/sv_bf2/'
W, H = 1080, 1920
FS = ImageFont.truetype(rv.FONT_B, 58)
segs = [
 dict(clip='t1_shift.mp4', start=0, dur=5.0, title='', rtitle='12-HOUR\nSHIFTS', pos='top', size=120, shade=0.35,
      subs=[(0,1.45,'Twelve-hour shift?'),(1.45,3.05,'Thick cushioned sole,'),(3.05,5.0,"and merino doesn't hold\nodor like cotton.")]),
 dict(clip='t2c_hike_fixed.mp4', start=0, dur=4.7, title='ALL-DAY HIKES', pos='top', size=120,
      subs=[(0,0.74,'Winter hikes?'),(0.74,3.26,'80% merino keeps\nyour feet warm,'),(3.26,4.7,'even when they get damp.')]),
 dict(clip='t3_product.mp4', start=0.6, dur=3.6, title='80% MERINO WOOL', sub='Thick terry cushion inside', pos='top', size=110, subs=[], silent=True),
 dict(clip='t4_home.mp4', start=0, dur=5.0, title='BLACK FRIDAY\nBUY 2, GET 1 FREE', sub='hikesupplyco.com', pos='top', size=110, shade=0.75,
      subs=[(0,2.5,"And at home,\nthey're just cozy."),(2.5,5.0,"Right now it's\nbuy 2, get 1 free.")]),
]
def sub_png(text, path):
    im = Image.new('RGBA', (W, H), (0,0,0,0)); d = ImageDraw.Draw(im)
    lines = text.split('\n'); lh = 72; y = 1430 - (len(lines)-1)*lh//2
    sh = Image.new('RGBA', (W, H), (0,0,0,0)); ds = ImageDraw.Draw(sh)
    for i, ln in enumerate(lines):
        w = d.textlength(ln, font=FS); x = (W-w)/2
        ds.text((x+2, y+i*lh+3), ln, font=FS, fill=(0,0,0,230))
    sh = sh.filter(ImageFilter.GaussianBlur(6)); im = Image.alpha_composite(im, sh); im = Image.alpha_composite(im, sh); d = ImageDraw.Draw(im)
    for i, ln in enumerate(lines):
        w = d.textlength(ln, font=FS); d.text(((W-w)/2, y+i*lh), ln, font=FS, fill='white')
    im.save(path)
tmp = '/tmp/claude-0/bf2tmp'; os.makedirs(tmp, exist_ok=True); parts = []
for k, s in enumerate(segs):
    ov = f'{tmp}/t{k}.png'; rv.overlay(dict(s, _logo='color'), ov)
    if s.get('rtitle'):
        im = Image.open(ov).convert('RGBA'); fh = ImageFont.truetype(rv.FONT_H, s['size'])
        sh = Image.new('RGBA', (W, H), (0,0,0,0)); ds = ImageDraw.Draw(sh); d = ImageDraw.Draw(im)
        y = 230
        for i, ln in enumerate(s['rtitle'].split('\n')):
            w = d.textlength(ln, font=fh); ds.text((W-76-w+3, y+i*int(s['size']*0.98)+4), ln, font=fh, fill=(0,0,0,200))
        sh = sh.filter(ImageFilter.GaussianBlur(8)); im = Image.alpha_composite(im, sh); d = ImageDraw.Draw(im)
        for i, ln in enumerate(s['rtitle'].split('\n')):
            w = d.textlength(ln, font=fh); d.text((W-76-w, y+i*int(s['size']*0.98)), ln, font=fh, fill='white')
        im.save(ov)
    inputs = ['-ss', str(s['start']), '-t', str(s['dur']), '-i', V+s['clip'], '-loop', '1', '-t', str(s['dur']), '-i', ov]
    fc = f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps=30,setsar=1[b];[b][1:v]overlay=0:0[v0]"
    last = 'v0'
    for j, (a, b, txt) in enumerate(s['subs']):
        p = f'{tmp}/s{k}_{j}.png'; sub_png(txt, p)
        inputs += ['-loop', '1', '-t', str(s['dur']), '-i', p]
        fc += f";[{last}][{j+2}:v]overlay=0:0:enable='between(t,{a},{b})'[v{j+1}]"; last = f'v{j+1}'
    fc += f";[{last}]format=yuv420p[vo]"
    if s.get('silent'):
        fc += f";anullsrc=r=44100:cl=stereo,atrim=0:{s['dur']}[ao]"
    else:
        fc += f";[0:a]aresample=44100,aformat=channel_layouts=stereo,apad,atrim=0:{s['dur']}[ao]"
    p = f'{tmp}/p{k}.mp4'
    subprocess.run(['ffmpeg','-y','-v','error',*inputs,'-filter_complex',fc,'-map','[vo]','-map','[ao]','-c:v','libx264','-preset','veryfast','-crf','17','-r','30','-c:a','aac','-b:a','192k',p], check=True)
    parts.append(p)
lst = f'{tmp}/l.txt'; open(lst,'w').write(''.join(f"file '{p}'\n" for p in parts))
cat = f'{tmp}/cat.mp4'
ins=[]; 
for p in parts: ins += ['-i', p]
n=len(parts); fc=''.join(f'[{i}:v][{i}:a]' for i in range(n))+f'concat=n={n}:v=1:a=1[v][a]'
subprocess.run(['ffmpeg','-y','-v','error',*ins,'-filter_complex',fc,'-map','[v]','-map','[a]','-c:v','libx264','-preset','veryfast','-crf','17','-c:a','aac','-b:a','192k',cat], check=True)
total = sum(s['dur'] for s in segs)
music = '/home/claude/hikesupply-studio/socks/music/embers.mp3'
final = OUT + 'sv_bf2.mp4'
subprocess.run(['ffmpeg','-y','-v','error','-i',cat,'-i',music,'-filter_complex',
  f"[0:a]aresample=44100,volume=1.6,alimiter=limit=0.9[v];[1:a]atrim=0:{total},volume='if(gt(t,{total-0.7})+between(t,9.75,13.25),0.24,0.10)':eval=frame,afade=t=in:d=0.5,afade=t=out:st={total-0.35}:d=0.35[m];[v][m]amix=inputs=2:duration=first:normalize=0[a]",
  '-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','192k',final], check=True)
subprocess.run(['ffmpeg','-y','-v','error','-ss','1.0','-i',final,'-frames:v','1','-q:v','2',OUT+'sv_bf2.jpg'], check=True)
print(final, total)
