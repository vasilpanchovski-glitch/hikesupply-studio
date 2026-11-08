#!/bin/bash
# Build M01 (merino socks, Higgsfield clips + voiceover): VO, score ducked under VO, clip ambience from the render.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
python3 voice/vo.py specs/m01.vo.json build/m01_vo
cp build/m01_vo.json video/src/vo/m01.json
python3 audio/mix.py specs/m01.mix.json build/m01_mix.wav build/m01_vo.wav
cd video
npx tsc --noEmit
npx remotion render src/index.ts M01 ../build/m01_raw.mp4 --concurrency=$(nproc) --crf=18 --log=error
cd ..
ffmpeg -loglevel error -y -i build/m01_raw.mp4 -i build/m01_mix.wav -filter_complex "[0:a]volume=0.8[amb];[1:a][amb]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]" -map 0:v -map "[a]" -c:v libx264 -preset slow -b:v 5000k -maxrate 6500k -bufsize 9000k -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -movflags +faststart media/m01.mp4
ffmpeg -loglevel error -y -ss 0.9 -i media/m01.mp4 -frames:v 1 -q:v 3 media/m01.jpg
echo "done media/m01.mp4 $(du -h media/m01.mp4 | cut -f1)"
