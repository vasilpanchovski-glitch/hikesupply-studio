"""Render quiet quote posts on real landscape photos.
python3 moods/render_mood.py moods/batches/<batch>.json
Batch: {"posts": [{"id", "photo": "moods/photos/pexels-<id>.jpg", "quote": "line\\nline\\n...", "author": "" (only for public-domain quotes), "place": "auto"|"top"|"middle"|"bottom"}]}
Writes for each post: media/moods/<id>-4x5.jpg (1080x1350, Instagram/Facebook), <id>-2x3.jpg (1000x1500, Pinterest), <id>-9x16.jpg (1080x1920, TikTok/Stories).
Picks the calmest band of the photo for the text (sky, mist, snow) unless place is given."""
import sys, os, json, html
from PIL import Image, ImageFilter, ImageStat
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SIZES = {"4x5": (1080, 1350), "2x3": (1000, 1500), "9x16": (1080, 1920)}

def calm_band(path, w, h):
    im = Image.open(path).convert("L")
    sw, sh = im.size; s = max(w / sw, h / sh)
    im = im.resize((int(sw * s), int(sh * s))); l = (im.width - w) // 2; t = (im.height - h) // 2
    im = im.crop((l, t, l + w, t + h)).filter(ImageFilter.FIND_EDGES)
    best, pos = None, 0.4
    for p in [0.16, 0.26, 0.36, 0.46, 0.56]:
        y0 = int(h * p); band = im.crop((int(w * .1), y0, int(w * .9), y0 + int(h * .2)))
        v = ImageStat.Stat(band).mean[0] + abs(p - 0.4) * 6  # prefer upper-middle like the reference
        if best is None or v < best: best, pos = v, p
    return pos

def band_light(path, w, h, top):
    im = Image.open(path).convert("L"); sw, sh = im.size; s = max(w / sw, h / sh)
    im = im.resize((int(sw * s), int(sh * s))); l = (im.width - w) // 2; t = (im.height - h) // 2
    im = im.crop((l, t, l + w, t + h)); y0 = int(h * top)
    return ImageStat.Stat(im.crop((int(w * .15), y0, int(w * .85), y0 + int(h * .2)))).mean[0]

def page(p, w, h, top, light=100):
    q = "<br>".join(html.escape(x) for x in p["quote"].split("\n"))
    a = f'<div class="by">{html.escape(p["author"])}</div>' if p.get("author") else ""
    fs = round(w * 0.05)
    return f"""<html><head><meta charset=utf-8><style>
@font-face {{ font-family: C; src: url(file://{ROOT}/moods/Cormorant-500.woff2); font-weight: 500; }}
@font-face {{ font-family: I; src: url(file://{ROOT}/pins/Inter.ttf); font-weight: 100 900; }}
* {{ margin: 0; box-sizing: border-box; }}
body {{ width: {w}px; height: {h}px; overflow: hidden; background: #111 url(file://{os.path.join(ROOT, p['photo'])}) center/cover no-repeat; position: relative; }}
.veil {{ position: absolute; left: 0; right: 0; top: {top*100 - 8}%; height: 36%; background: radial-gradient(ellipse at 50% 50%, rgba(0,0,0,{0.22 + max(0, (light - 110) / 145) * 0.38:.2f}), rgba(0,0,0,0) 72%); }}
.q {{ position: absolute; left: 0; right: 0; top: {top*100}%; display: flex; justify-content: center; }}
.q div {{ font: 500 {fs}px/1.12 C, serif; color: #fff; letter-spacing: .2px; text-shadow: 0 1px 14px rgba(0,0,0,{0.35 + max(0, (light - 110) / 145) * 0.3:.2f}); max-width: {int(w*.78)}px; }}
.by {{ font: 500 {round(fs*.42)}px/1 I, sans-serif; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,.85); margin-top: {round(fs*.5)}px; text-shadow: 0 1px 8px rgba(0,0,0,.4); }}
.h {{ position: absolute; left: 0; right: 0; bottom: {round(h*.035)}px; text-align: center; font: 500 {round(w*.019)}px/1 I, sans-serif; letter-spacing: 4px; color: rgba(255,255,255,.78); text-shadow: 0 1px 8px rgba(0,0,0,.5); }}
</style></head><body><div class="veil"></div><div class="q"><div>{q}{a}</div></div><div class="h">@HIKESUPPLYCO</div></body></html>"""

batch = json.load(open(sys.argv[1]))
os.makedirs(os.path.join(ROOT, "media", "moods"), exist_ok=True)
out = []
with sync_playwright() as pw:
    exe = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
    b = pw.chromium.launch(executable_path=exe) if os.path.exists(exe) else pw.chromium.launch()
    for p in batch["posts"]:
        for key, (w, h) in SIZES.items():
            place = p.get("place", "auto")
            top = {"top": 0.16, "middle": 0.4, "bottom": 0.6}.get(place) or calm_band(os.path.join(ROOT, p["photo"]), w, h)
            pg = b.new_page(viewport={"width": w, "height": h})
            tmp = os.path.join(ROOT, "moods", "_tmp.html"); open(tmp, "w").write(page(p, w, h, top, band_light(os.path.join(ROOT, p["photo"]), w, h, top)))
            pg.goto("file://" + tmp); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(300)
            if pg.evaluate("document.querySelector('.q div').getBoundingClientRect().bottom") > h * 0.9:
                print("TOO LONG", p["id"], key); pg.close(); continue
            f = os.path.join(ROOT, "media", "moods", f"{p['id']}-{key}.jpg")
            pg.screenshot(path=f, type="jpeg", quality=90); out.append(f); pg.close()
    b.close()
    t = os.path.join(ROOT, "moods", "_tmp.html"); os.path.exists(t) and os.remove(t)
print("\n".join(out))
