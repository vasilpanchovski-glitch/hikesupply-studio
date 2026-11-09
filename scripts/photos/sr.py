# AI upscale for supplier photos before studio.py (Real-ESRGAN general x4v3, onnxruntime, CPU).
# usage: python3 scripts/photos/sr.py in out [scale=2]   e.g. 1000 px source -> 2000 px
import sys, os, numpy as np, onnxruntime as ort
from PIL import Image
s = ort.InferenceSession(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'models', 'realesr-general-x4v3.onnx'), providers=['CPUExecutionProvider'])
im = Image.open(sys.argv[1]).convert('RGB'); W, H = im.size
x = (np.asarray(im).astype(np.float32) / 255).transpose(2, 0, 1)[None]
T, P = 200, 10; out = np.zeros((3, H * 4, W * 4), np.float32)
for y in range(0, H, T):
    for xx in range(0, W, T):
        y0, x0 = max(y - P, 0), max(xx - P, 0); y1, x1 = min(y + T + P, H), min(xx + T + P, W)
        o = s.run(None, {'x': np.ascontiguousarray(x[:, :, y0:y1, x0:x1])})[0][0]
        oy, ox = (y - y0) * 4, (xx - x0) * 4; h, w = min(T, H - y) * 4, min(T, W - xx) * 4
        out[:, y * 4:y * 4 + h, xx * 4:xx * 4 + w] = o[:, oy:oy + h, ox:ox + w]
r = Image.fromarray((np.clip(out, 0, 1).transpose(1, 2, 0) * 255).round().astype(np.uint8))
sc = float(sys.argv[3]) if len(sys.argv) > 3 else 2
r.resize((int(W * sc), int(H * sc)), Image.LANCZOS).save(sys.argv[2], quality=95)
