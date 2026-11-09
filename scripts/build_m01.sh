#!/bin/bash
# Build M01 (merino socks): Higgsfield clips + Kokoro VO + ElevenLabs music (build/m01_music.mp3, ducked under the voice) + clip ambience.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
[ -f build/m01_vo.wav ] || { python3 voice/vo.py specs/m01.vo.json build/m01_vo; cp build/m01_vo.json video/src/vo/m01.json; }
cd video
npx tsc --noEmit
npx remotion render src/index.ts M01 ../build/m01_raw.mp4 --concurrency=$(nproc) --crf=18 --log=error
cd ..
ffmpeg -loglevel error -y -i build/m01_raw.mp4 -i build/m01_vo.wav -i build/m01_music.mp3 -filter_complex "\
[1:a]aresample=48000,aformat=channel_layouts=stereo,volume=1.0,asplit=2[vo][key];\
[2:a]aresample=48000,aformat=channel_layouts=stereo,volume=0.62[mus];\
[mus][key]sidechaincompress=threshold=0.04:ratio=6:attack=15:release=280:makeup=1[duck];\
[0:a]volume=0.7[amb];\
[vo][duck][amb]amix=inputs=3:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]" \
 -map 0:v -map "[a]" -c:v libx264 -preset slow -b:v 5000k -maxrate 6500k -bufsize 9000k -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -movflags +faststart media/m01.mp4
ffmpeg -loglevel error -y -ss 0.9 -i media/m01.mp4 -frames:v 1 -q:v 3 media/m01.jpg
echo "done media/m01.mp4 $(du -h media/m01.mp4 | cut -f1)"
