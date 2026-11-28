"""Render a socks video post from a JSON spec.

Spec: {"id": "sv01", "music": "path or null", "voice": "optional wav from voice/vo.py (music ducked under it)", "segments": [
  {"clip": "v04", "start": 0.0, "dur": 3.0, "title": "COLD FEET\\nON EVERY WALK?", "sub": "", "pos": "bottom"}]}
clip = name in socks/materials/vid (or "image": "s28" for a still photo from materials/img). Each segment is cut, scaled to 1080x1920 with a slow push-in,
gets the same text style as the photo posts (white Barlow headline, soft gradient), clips are muted.
Every shot carries the colour HikeSupply Co. logo top left (Vasil 2026-11-20: "start adding the
hikesupplyco logo on each video"); spec "logo": "white" for the all-white one, false to leave it out.
Output: socks/posts/<id>/<id>.mp4 plus <id>.jpg cover (first segment with text).
"""
import json, os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.abspath(__file__))
FONT_H = os.path.join(ROOT, "..", "pins", "BarlowCondensed-ExtraBold.ttf")
FONT_B = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
W, H = 1080, 1920
LOGO_COLOR = os.path.join(ROOT, "brand", "logo_color.png")
LOGO_WHITE = os.path.join(ROOT, "brand", "logo_white.png")


def add_logo(im, which, lw=220, x=70, y=66):
    if which is False:
        return im
    lg = Image.open(LOGO_WHITE if which == "white" else LOGO_COLOR).convert("RGBA")
    lg = lg.resize((lw, int(lg.height * lw / lg.width)), Image.LANCZOS)
    # soft dark shadow so the white text reads on snow or bright sky
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    a = lg.split()[3].point(lambda v: int(v * 0.55))
    blk = Image.new("RGBA", lg.size, (0, 0, 0, 255)); blk.putalpha(a)
    sh.alpha_composite(blk, (x + 3, y + 4))
    sh = sh.filter(ImageFilter.GaussianBlur(7))
    im = Image.alpha_composite(im, sh)
    im.alpha_composite(lg, (x, y))
    return im


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
    im = add_logo(im, seg.get("_logo", "color"))
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
        s = dict(s, _logo=spec.get("logo", "color"))
        overlay(s, ov)
        src = os.path.join(ROOT, "..", spec.get("dir","socks"), "materials", "vid", s.get("clip", "") + ".mp4")
        p = os.path.join(tmp, f"p{i}.mp4")
        z = s.get("zoom", 0.05)
        dur = s["dur"]
        vf = (f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps=30,"
              f"scale=w='iw*(1+{z}*t/{dur})':h='ih*(1+{z}*t/{dur})':eval=frame,crop={W}:{H},setsar=1,format=yuv420p[v];"
              f"[v][1:v]overlay=0:0,format=yuv420p")
        fade = s.get("fade", 0.25)
        if fade:
            vf += f",fade=t=in:st=0:d={fade}"
        if s.get("image"):  # a still photo from materials/img as the shot (slow push-in)
            src = os.path.join(ROOT, "..", spec.get("dir","socks"), "materials", "img", s["image"] + ".jpg")
            inp = ["-loop", "1", "-framerate", "30", "-t", str(dur), "-i", src]
        else:
            inp = ["-ss", str(s.get("start", 0)), "-t", str(dur), "-i", src]
        run(["ffmpeg", "-y", *inp, "-loop", "1", "-t", str(dur), "-i", ov,
             "-filter_complex", vf, "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-r", "30", p])
        parts.append(p)
    lst = os.path.join(tmp, "l.txt")
    open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    silent = os.path.join(tmp, "silent.mp4")
    run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", silent])
    total = sum(s["dur"] for s in spec["segments"])
    final = os.path.join(out, spec["id"] + ".mp4")
    ms = float(spec.get("music_start", 0))  # skip a track intro (e.g. fire crackle before the music starts)
    if spec.get("voice") and spec.get("music"):
        # voiceover (wav from voice/vo.py) on top, music ducked under it
        mv = spec.get("music_vol", 0.22)
        run(["ffmpeg", "-y", "-i", silent, "-i", spec["music"], "-i", spec["voice"], "-filter_complex",
             f"[1:a]atrim={ms}:{ms+total},asetpts=PTS-STARTPTS,volume={mv},afade=t=in:d=0.4,afade=t=out:st={total-1.2}:d=1.2[m];"
             f"[2:a]aresample=44100,apad,atrim=0:{total}[v];"
             f"[m][v]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5[a]",
             "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", final])
    elif spec.get("music"):
        run(["ffmpeg", "-y", "-i", silent, "-i", spec["music"], "-filter_complex",
             f"[1:a]atrim={ms}:{ms+total},asetpts=PTS-STARTPTS,afade=t=in:d=0.4,afade=t=out:st={total-1.2}:d=1.2,loudnorm=I=-16:TP=-1.5[a]",
             "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", final])
    else:
        run(["ffmpeg", "-y", "-i", silent, "-c", "copy", final])
    run(["ffmpeg", "-y", "-ss", str(spec.get("cover_at", 1.0)), "-i", final, "-frames:v", "1", "-q:v", "2", os.path.join(out, spec["id"] + ".jpg")])
    return final


if __name__ == "__main__":
    print(render(json.load(open(sys.argv[1]))))
