#!/bin/bash
# One-time setup on a fresh cloud machine. Safe to run again.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
pip install --break-system-packages -q kokoro-onnx soundfile scipy numpy pillow opencv-python-headless >/dev/null 2>&1 || pip install --break-system-packages kokoro-onnx soundfile scipy numpy pillow opencv-python-headless
mkdir -p "$ROOT/voice/models"
cd "$ROOT/voice/models"
[ -s kokoro-v1.0.onnx ] || curl -sSL -o kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
[ -s voices-v1.0.bin ] || curl -sSL -o voices-v1.0.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
cd "$ROOT/video"
[ -d node_modules ] || npm ci --no-audit --no-fund >/dev/null 2>&1
echo "setup ok"
