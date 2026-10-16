#!/bin/bash
# Build one finished video: ./scripts/make_video.sh v02
# Needs specs/<id>.vo.json, specs/<id>.mix.json and video/src/videos/<ID>.tsx registered in videos/index.ts.
set -e
ID="$1"; UP=$(echo "$ID" | tr a-z A-Z)
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p video/public/vo video/src/vo media build
python3 voice/vo.py "specs/$ID.vo.json" "build/${ID}_vo"
cp "build/${ID}_vo.json" "video/src/vo/$ID.json"
python3 audio/mix.py "specs/$ID.mix.json" "build/${ID}_mix.wav" "build/${ID}_vo.wav"
cd video
CORES=$(nproc); [ "$CORES" -gt 4 ] && CORES=4
npx remotion render src/index.ts "$UP" "../build/${ID}_silent.mp4" --concurrency=$CORES --crf=18 --log=error
cd ..
ffmpeg -loglevel error -y -i "build/${ID}_silent.mp4" -i "build/${ID}_mix.wav" -map 0:v -map 1:a -c:v libx264 -preset slow -b:v 4000k -maxrate 5500k -bufsize 8000k -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -af loudnorm=I=-14:TP=-1.5:LRA=11 -movflags +faststart -shortest "media/$ID.mp4"
ffmpeg -loglevel error -y -ss 1.2 -i "media/$ID.mp4" -frames:v 1 -q:v 3 "media/$ID.jpg"
echo "done media/$ID.mp4 $(du -h media/$ID.mp4 | cut -f1)"
