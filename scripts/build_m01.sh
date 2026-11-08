#!/bin/bash
# Build M01 (merino socks, Higgsfield clips): cut list from the real clip lengths, clip sound + original score, render.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
F=video/public/footage
python3 - <<'E'
import json, subprocess
d=[float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f"video/public/footage/m01_s{n}.mp4"]).decode().strip()) for n in range(1,8)]
d=[round(x-0.04,3) for x in d]
d[4]=min(d[4],2.45)  # shot 5: cut before the fake-looking splash at the end
json.dump({"d":d},open("video/src/vo/m01_cuts.json","w"))
L=sum(d)+4.2
json.dump({"dur":round(L,3),"drop":round(d[0],3),"b1":round(d[0],3),"b2":round(sum(d),3),"key":7,"bpm":96,"prog":1,"seed":701,
  "amb":[],"sfx":[[round(sum(d)+0.05,3),"whoosh"],[round(sum(d)+1.6,3),"chime"]]},open("specs/m01.mix.json","w"))
print("cuts",d,"total",round(L,2))
E
# clip sound laid end to end, same cut points as the picture
python3 - <<'E'
import json, subprocess, numpy as np, soundfile as sf
d=json.load(open("video/src/vo/m01_cuts.json"))["d"]; SR=48000
parts=[]
for n,dur in enumerate(d,1):
    subprocess.run(["ffmpeg","-loglevel","error","-y","-i",f"video/public/footage/m01_s{n}.mp4","-t",str(dur),"-ac","1","-ar",str(SR),f"build/m01_a{n}.wav"],check=True)
    a,_=sf.read(f"build/m01_a{n}.wav"); a=a[:int(dur*SR)]
    if len(a)<int(dur*SR): a=np.pad(a,(0,int(dur*SR)-len(a)))
    f=int(0.03*SR); a[:f]*=np.linspace(0,1,f); a[-f:]*=np.linspace(1,0,f)
    parts.append(a)
amb=np.concatenate(parts); amb=amb/ (np.abs(amb).max()+1e-9)*0.55
sf.write("build/m01_amb.wav",amb,SR)
E
python3 audio/mix.py specs/m01.mix.json build/m01_mix.wav build/m01_amb.wav
cd video
npx tsc --noEmit
npx remotion render src/index.ts M01 ../build/m01_silent.mp4 --concurrency=$(nproc) --crf=18 --log=error
cd ..
ffmpeg -loglevel error -y -i build/m01_silent.mp4 -i build/m01_mix.wav -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 5000k -maxrate 6500k -bufsize 9000k -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -af loudnorm=I=-14:TP=-1.5:LRA=11 -movflags +faststart -shortest media/m01.mp4
ffmpeg -loglevel error -y -ss 0.4 -i media/m01.mp4 -frames:v 1 -q:v 3 media/m01.jpg
echo "done media/m01.mp4 $(du -h media/m01.mp4 | cut -f1)"
