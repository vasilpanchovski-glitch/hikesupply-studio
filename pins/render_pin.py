"""Render Pinterest pins (1000x1500 PNG) from a JSON batch file.
python3 pins/render_pin.py pins/batches/<batch>.json
Each pin: {id, layout: "photo"|"forest"|"stone"|"list", kicker, title, sub, items:[...], image: "media/v16.jpg" (optional, our own video frames only), cta, price}
Writes media/pins/<id>.png (public in the repo) and prints the paths."""
import sys, os, json, html
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
batch = json.load(open(sys.argv[1]))
os.makedirs(os.path.join(ROOT, "media", "pins"), exist_ok=True)
CSS = f"""
@font-face {{ font-family: B; src: url(file://{ROOT}/pins/BarlowCondensed-ExtraBold.ttf); font-weight: 800; }}
@font-face {{ font-family: B; src: url(file://{ROOT}/pins/BarlowCondensed-SemiBold.ttf); font-weight: 600; }}
@font-face {{ font-family: I; src: url(file://{ROOT}/pins/Inter.ttf); font-weight: 100 900; }}
* {{ box-sizing: border-box; margin: 0; }}
body {{ width: 1000px; height: 1500px; overflow: hidden; font-family: I, sans-serif; }}
.pin {{ position: relative; width: 1000px; height: 1500px; display: flex; flex-direction: column; padding: 80px 72px; }}
.forest {{ background: #2C3B2E; color: #F5F1EA; }} .stone {{ background: #F5F1EA; color: #2C3B2E; }}
.kicker {{ font: 600 34px/1 B; letter-spacing: 6px; text-transform: uppercase; opacity: .8; }}
h1 {{ font: 800 118px/0.95 B; text-transform: uppercase; margin-top: 26px; }}
.sub {{ font: 500 36px/1.35 I; margin-top: 30px; opacity: .9; max-width: 820px; }}
.img {{ margin-top: 48px; flex: 1; border-radius: 26px; background-size: cover; background-position: center; }}
.list {{ margin-top: 44px; display: grid; gap: 22px; }}
.list div {{ font: 600 40px/1.25 I; padding: 22px 28px; border-radius: 18px; background: rgba(255,255,255,.08); display: flex; gap: 22px; align-items: center; }}
.stone .list div {{ background: #E8E1D3; }}
.list b {{ font: 800 46px/1 B; color: #D97A52; min-width: 40px; }}
.foot {{ margin-top: auto; padding-top: 40px; display: flex; justify-content: space-between; align-items: center; font: 600 32px/1 B; letter-spacing: 4px; text-transform: uppercase; }}
.cta {{ background: #F5F1EA; color: #2C3B2E; padding: 22px 34px; border-radius: 16px; font: 800 38px/1 B; letter-spacing: 1px; }}
.stone .cta {{ background: #2C3B2E; color: #F5F1EA; }}
.photo {{ padding: 0; color: #fff; background-size: cover; background-position: center; }}
.photo .shade {{ position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,20,15,.82) 0%, rgba(10,20,15,.25) 45%, rgba(10,20,15,.85) 100%); }}
.photo .in {{ position: relative; height: 100%; display: flex; flex-direction: column; padding: 80px 72px; }}
"""
def esc(s): return html.escape(str(s or ""))
def page(p):
    img = p.get("image"); url = f"file://{os.path.join(ROOT, img)}" if img else ""
    items = "".join(f"<div><b>{i+1}</b>{esc(t)}</div>" for i, t in enumerate(p.get("items", [])))
    foot = f'<div class="foot"><span>hikesupplyco.com</span>{f"<span class=cta>{esc(p.get(chr(99)+chr(116)+chr(97)))}</span>" if p.get("cta") else ""}</div>'
    head = f'<div class="kicker">{esc(p.get("kicker"))}</div><h1>{esc(p.get("title"))}</h1>' + (f'<p class="sub">{esc(p.get("sub"))}</p>' if p.get("sub") else "")
    lay = p.get("layout", "forest")
    if lay == "photo":
        return f'<div class="pin photo" style="background-image:url({url})"><div class="shade"></div><div class="in">{head}{f"<div class=list>{items}</div>" if items else ""}{foot}</div></div>'
    body = f'<div class="img" style="background-image:url({url})"></div>' if url else (f'<div class="list">{items}</div>' if items else "")
    return f'<div class="pin {"stone" if lay == "stone" else "forest"}">{head}{body}{foot}</div>'
out = []
with sync_playwright() as pw:
    exe = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
    b = pw.chromium.launch(executable_path=exe) if os.path.exists(exe) else pw.chromium.launch()
    pg = b.new_page(viewport={"width": 1000, "height": 1500})
    for p in batch["pins"]:
        tmp = os.path.join(ROOT, "pins", "_tmp.html")
        open(tmp, "w").write(f"<html><head><meta charset=utf-8><style>{CSS}</style></head><body>{page(p)}</body></html>")
        pg.goto("file://" + tmp); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(400)
        over = pg.evaluate("(()=>{const h=document.querySelector('h1');return h.scrollWidth>h.clientWidth+2 || document.body.scrollHeight>1502})()")
        if over: print("OVERFLOW", p["id"], "- shorten the title or items"); continue
        f = os.path.join(ROOT, "media", "pins", p["id"] + ".png"); pg.screenshot(path=f); out.append(f)
    b.close()
    os.path.exists(os.path.join(ROOT, "pins", "_tmp.html")) and os.remove(os.path.join(ROOT, "pins", "_tmp.html"))
print("\n".join(out))
