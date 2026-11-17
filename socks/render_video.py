"""Render a socks video post from a JSON spec.

Spec: {"id": "sv01", "music": "path or null", "segments": [
  {"clip": "v04", "start": 0.0, "dur": 3.0, "title": "COLD FEET\\nON EVERY WALK?", "sub": "", "pos": "bottom"}]}
clip = name in socks/materials/vid. Each segment is cut, scaled to 1080x1920 with a slow push-in,
gets the same text style as the photo posts (white Barlow headline, soft gradient), clips are muted.
Output: socks/posts/<id>/<id>.mp4 plus <id>.jpg cover (first segment with text).
"""
import json, os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.abspath(__file__))
FONT_H = os.path.join(ROOT, "..", "pins", "BarlowCondensed-ExtraBold.ttf")
FONT_B = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
W, H = 1080, 1920


def overlay(seg, path):
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pos = seg.get("pos", "bottom")
    span, strength = 0.42, seg.get("shade", 0.65)
    g = Image.new("L", (1, H))
    for y in range(H):
        t = (y / H) if pos == "bottom" else (1 - y / H)
        a = max(0.0, (t - (1 - span)) / span)
        g.putpixel((0, y), int(255 * strength * a ** 1.4))
    shade = Image.new("RGBA", (W, H), (8, 12, 10, 255))
    shade.putalpha(g.resize((W, H)))
    im = Image.alpha_composite(im, shade)
    d = ImageDraw.Draw(im)
    size = seg.get("size", 130)
    fh = ImageFont.truetype(FONT_H, size)
    fb = ImageFont.truetype(FONT_B, seg.get("subsize", 42))
    lines = seg["title"].split("\n") if seg.get("title") else []
    subs = seg["sub"].split("\n") if seg.get("sub") else []
    lh, sh = int(size * 0.98), 56
    block = len(lines) * lh + (26 + len(subs) * sh if subs else 0)
    # keep text out of the bottom 380 px (TikTok/Reels buttons and caption)
    y = (H - 400 - block) if pos == "bottom" else 230
    for ln in lines:
        d.text((76, y), ln, font=fh, fill="white")
        y += lh
    if subs:
        y += 26
        for ln in subs:
            d.text((78, y), ln, font=fb, fill="white")
            y += sh
    im.save(path)


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def render(spec):
    out = os.path.join(ROOT, "..", spec.get("dir","socks"), "posts", spec["id"])
    os.makedirs(out, exist_ok=True)
    tmp = tempfile.mkdtemp()
    parts = []
    for i, s in enumerate(spec["segments"]):
        ov = os.path.join(tmp, f"o{i}.png")
        overlay(s, ov)
        src = os.path.join(ROOT, "..", spec.get("dir","socks"), "materials", "vid", s["clip"] + ".mp4")
        p = os.path.join(tmp, f"p{i}.mp4")
        z = s.get("zoom", 0.05)
        dur = s["dur"]
        vf = (f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps=30,"
              f"scale=w='iw*(1+{z}*t/{dur})':h='ih*(1+{z}*t/{dur})':eval=frame,crop={W}:{H},setsar=1,format=yuv420p[v];"
              f"[v][1:v]overlay=0:0,format=yuv420p")
        fade = s.get("fade", 0.25)
        if fade:
            vf += f",fade=t=in:st=0:d={fade}"
        run(["ffmpeg", "-y", "-ss", str(s.get("start", 0)), "-t", str(dur), "-i", src, "-loop", "1", "-t", str(dur), "-i", ov,
             "-filter_complex", vf, "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-r", "30", p])
        parts.append(p)
    lst = os.path.join(tmp, "l.txt")
    open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    silent = os.path.join(tmp, "silent.mp4")
    run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", silent])
    total = sum(s["dur"] for s in spec["segments"])
    final = os.path.join(out, spec["id"] + ".mp4")
    if spec.get("music"):
        run(["ffmpeg", "-y", "-i", silent, "-i", spec["music"], "-filter_complex",
             f"[1:a]atrim=0:{total},afade=t=in:d=0.4,afade=t=out:st={total-1.2}:d=1.2,loudnorm=I=-16:TP=-1.5[a]",
             "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", final])
    else:
        run(["ffmpeg", "-y", "-i", silent, "-c", "copy", final])
    run(["ffmpeg", "-y", "-ss", str(spec.get("cover_at", 1.0)), "-i", final, "-frames:v", "1", "-q:v", "2", os.path.join(out, spec["id"] + ".jpg")])
    return final


if __name__ == "__main__":
    print(render(json.load(open(sys.argv[1]))))
