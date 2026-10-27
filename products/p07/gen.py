"""Generates index.html for p07 (Hike Together Gift Coupons). Run: python3 gen.py
Base styles in base.css (shared look with p05). Facts: NPS Ten Essentials, America's State Parks First Day Hikes, Leave No Trace."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Hike Together Gift Coupons"
pages = []
def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls not in ("cover photo", "back") else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')

EXTRA = """
.page.cut{padding:0.48in 0.45in 0.7in}
.page.cut .folio{left:0.45in;right:0.45in;bottom:0.3in}
.ch{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:9pt}
.ch h2{font-size:17pt;margin:0}
.ch .kicker{margin-bottom:5pt}
.ch .sc{font:600 7.5pt/1.3 var(--sans);letter-spacing:.06em;color:#8B8577;text-align:right}
.cpg{display:grid;grid-template-columns:1fr 1fr}
.cp{border:1.1pt dashed #A39C8D;background:#fff;margin:-0.55pt;height:3.02in;padding:14pt 16pt 12pt;display:flex;flex-direction:column;justify-content:space-between}
.cp.s{height:2.72in;padding:12pt 15pt 10pt}
.cp .top{display:grid;grid-template-columns:0.7in 1fr;gap:12pt;align-items:start}
.cp .ic{width:0.7in;height:0.7in;border-radius:50%;background:var(--soft);display:flex;align-items:center;justify-content:center}
.cp .ic svg{width:0.46in;height:0.46in}
.cp .gf{font:700 6.8pt/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--clay);margin:3pt 0 5pt}
.cp h3{margin:0 0 6pt;font-size:19pt;line-height:1.08}
.cp p{margin:0;font-size:10.6pt;line-height:1.42;color:#55554F}
.cp .note{border-bottom:0.8pt solid #CFC7B6;height:24pt;font:700 6.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest);display:flex;align-items:flex-end;padding-bottom:4pt;margin-bottom:2pt}
.ff{display:grid;grid-template-columns:repeat(3,1fr);gap:0 10pt}
.ff div{border-bottom:0.8pt solid #CFC7B6;height:24pt;display:flex;align-items:flex-end;padding-bottom:4pt;font:700 6.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest)}
.cp .brandline{font:700 6pt/1 var(--sans);letter-spacing:.28em;text-transform:uppercase;color:var(--sage);margin-bottom:5pt}
.cp.blank{height:2.36in;padding:12pt 15pt 10pt}
.cp.blank .wl{height:21pt}
.cp.kid h3{font-size:17pt}
.cp.s h3{font-size:17pt}
.cp.s p{font-size:10pt}
.tk{display:grid;grid-template-columns:1fr 1.55in;border:1.1pt dashed #A39C8D;background:#fff;height:4.62in;margin-bottom:12pt}
.tk .main{padding:16pt 18pt 12pt;display:flex;flex-direction:column}
.tk .stub{border-left:1.6pt dotted var(--clay);background:var(--soft);padding:16pt 12pt;display:flex;flex-direction:column;justify-content:space-between;text-align:center}
.tk .stub .big1{font:600 26pt/1 var(--serif);color:var(--forest)}
.tk .stub .lb{font:700 6.8pt/1.3 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--clay)}
.tk h3{margin:0 0 2pt;font-size:21pt}
.tk .row{display:grid;grid-template-columns:1fr 1fr;gap:0 16pt}
.tk .fl{height:27pt}
.cert{border:2.5pt solid var(--forest);outline:1pt solid var(--forest);outline-offset:-8pt;height:9.3in;padding:0.55in 0.6in;text-align:center;display:flex;flex-direction:column;align-items:center;background:#fff}
.cert h1{font-size:36pt;margin:6pt 0 10pt}
.cert .lead{max-width:5in}
.cert .cl2{width:100%;text-align:left;margin-top:14pt}
.cert .fl{height:32pt}
.cert .sig{display:grid;grid-template-columns:1fr 1fr;gap:0 26pt;width:100%;margin-top:auto}
.env{display:flex;justify-content:center;margin-top:4pt}
.legend{display:flex;gap:22pt;font-size:9.5pt;margin:4pt 0 8pt;align-items:center}
.legend i{display:inline-block;width:34pt;vertical-align:middle;margin-right:6pt}
.tags{display:grid;grid-template-columns:repeat(4,1fr)}
.tg{border:1.1pt dashed #A39C8D;background:#fff;margin:-0.55pt;height:2.55in;padding:12pt 11pt 10pt;display:flex;flex-direction:column;align-items:center;text-align:center}
.tg .hole{width:13pt;height:13pt;border-radius:50%;border:1.2pt solid #A39C8D;margin-bottom:9pt}
.tg b{font:600 13pt/1.15 var(--serif);color:var(--forest);margin-bottom:auto}
.tg .ln{width:100%;border-bottom:0.8pt solid #CFC7B6;height:19pt;text-align:left;font:700 6.3pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest)}
.card2{display:grid;grid-template-columns:1fr 1fr;border:1.1pt dashed #A39C8D;background:#fff;height:3.05in}
.card2>div{padding:16pt 18pt;display:flex;flex-direction:column}
.card2>div+div{border-left:1.6pt dotted var(--clay)}
.card2 .front{background:var(--forest);color:var(--stone);justify-content:space-between}
.card2 .front h3{color:var(--stone);font-size:20pt;margin:0}
.card2 .front .brandline{font:700 7pt/1 var(--sans);letter-spacing:.28em;text-transform:uppercase;color:#CFD6CC}
.card2 .wl{height:21pt}
.gg{border:1.1pt dashed #A39C8D;background:#fff;height:4.45in;margin-bottom:12pt;display:grid;grid-template-columns:2.3in 1fr}
.gg .l{background:var(--forest);color:var(--stone);padding:18pt;display:flex;flex-direction:column;justify-content:space-between}
.gg .l h3{color:var(--stone);font-size:19pt;margin:0}
.gg .l .brandline{font:700 7pt/1 var(--sans);letter-spacing:.28em;text-transform:uppercase;color:#CFD6CC}
.gg .r{padding:16pt 18pt;display:flex;flex-direction:column}
.gg .fl{height:27pt}
.pbox{border:1pt dashed #A39C8D;border-radius:8pt;background:#fff;height:3.1in;display:flex;align-items:center;justify-content:center;font:700 7.5pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:#A39C8D}
.stars{display:flex;gap:8pt;font:600 8pt/1 var(--sans);color:var(--forest);align-items:center}
.stars i{display:inline-block;width:12pt;height:12pt;border:1.2pt solid var(--forest);border-radius:50%;background:#fff}
.safe{background:var(--soft);border-left:3pt solid var(--clay);border-radius:0 6pt 6pt 0;padding:8pt 12pt;font-size:9.6pt;line-height:1.4;margin-top:9pt}
.how{display:grid;grid-template-columns:repeat(2,1fr);gap:10pt}
.how>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:12pt 14pt}
.how .num{font:600 22pt/1 var(--serif);color:var(--clay);margin-bottom:4pt}
.how h3{margin:0 0 4pt;font-size:13pt}
.how p,.how li{font-size:10.2pt;line-height:1.45;margin:0}
.how ol{padding-left:14pt;margin:4pt 0 0}
html.bw .cp .ic,html.bw .tk .stub{background:#fff}
html.bw .card2 .front,html.bw .gg .l{background:#fff;color:#222;border-right:0.8pt solid #999}
html.bw .card2 .front h3,html.bw .gg .l h3{color:#222}
html.bw .card2 .front .brandline,html.bw .gg .l .brandline,html.bw .card2 .front p,html.bw .gg .l p{color:#444 !important}
html.bw .safe{background:#fff}
"""

# ---------- line icons (48x48) ----------
def svg(inner):
    return f'<svg viewBox="0 0 48 48" fill="none" stroke="#2C3B2E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">{inner}</svg>'
CL = 'stroke="#B85C38"'
I = {
 "sunrise": f'<path d="M6 34h36M14 34a10 10 0 0 1 20 0"/><path d="M24 12v5M12 20l3 3M36 20l-3 3M6 40h36" {CL}/>',
 "waterfall": '<path d="M8 10h12v24M20 10h20"/><path d="M24 14v20M29 14v18M34 14v22"/><path d="M8 40c6-4 10-4 16 0s10 4 16 0" stroke="#B85C38"/>',
 "snow": '<path d="M24 6v36M8.4 15l31.2 18M8.4 33l31.2-18"/><path d="M20 9l4 4 4-4M20 39l4-4 4 4" stroke="#B85C38"/>',
 "snack": '<rect x="10" y="16" width="28" height="24" rx="5"/><path d="M16 16v-4a8 8 0 0 1 16 0v4"/><path d="M18 28h12" stroke="#B85C38"/>',
 "car": '<path d="M7 30l4-10a4 4 0 0 1 4-3h18a4 4 0 0 1 4 3l4 10v7H7z"/><circle cx="15" cy="37" r="3.5" stroke="#B85C38"/><circle cx="33" cy="37" r="3.5" stroke="#B85C38"/><path d="M7 30h34"/>',
 "picnic": '<path d="M6 38l14-24 6 10 4-6 12 20z"/><path d="M14 38h20" stroke="#B85C38"/><circle cx="36" cy="10" r="3" stroke="#B85C38"/>',
 "compass": '<circle cx="24" cy="24" r="17"/><path d="M30 18l-4 8-8 4 4-8z" stroke="#B85C38"/>',
 "tree": '<path d="M24 6l10 14h-6l9 12H11l9-12h-6z"/><path d="M24 32v10" stroke="#B85C38"/>',
 "stars": '<path d="M30 8a14 14 0 1 0 10 22 12 12 0 0 1-10-22z"/><path d="M12 10v6M9 13h6M16 26v4M14 28h4" stroke="#B85C38"/>',
 "mug": '<path d="M10 18h22v14a8 8 0 0 1-8 8h-6a8 8 0 0 1-8-8z"/><path d="M32 22h3a5 5 0 0 1 0 10h-3"/><path d="M16 8c-2 3 2 4 0 7M23 8c-2 3 2 4 0 7" stroke="#B85C38"/>',
 "leaf": '<path d="M10 38C10 18 22 10 40 8c-2 18-10 30-30 30z"/><path d="M10 38l18-18" stroke="#B85C38"/>',
 "sunset": '<path d="M6 30h36M14 30a10 10 0 0 1 20 0"/><path d="M10 36h28M16 42h16" stroke="#B85C38"/>',
 "lake": '<path d="M6 30l10-14 7 9 5-6 14 11"/><path d="M6 36c5-3 9-3 14 0s9 3 14 0 6-2 8-1M10 42c4-2 8-2 12 0s8 2 12 0" stroke="#B85C38"/>',
 "coffee": '<path d="M14 14h18v22a4 4 0 0 1-4 4h-10a4 4 0 0 1-4-4z"/><path d="M14 22h18" stroke="#B85C38"/><path d="M18 14V9h10v5"/>',
 "bird": '<path d="M8 26c8 0 12-8 20-8 6 0 10 4 12 8-6 0-8 6-16 8-6 1-12-2-16-8z"/><circle cx="33" cy="22" r="1.4" fill="#2C3B2E"/><path d="M40 26l4 1" stroke="#B85C38"/>',
 "dog": '<path d="M12 22l-2-10 8 6h12l8-6-2 10v10a8 8 0 0 1-8 8h-8a8 8 0 0 1-8-8z"/><circle cx="19" cy="27" r="1.4" fill="#2C3B2E"/><circle cx="29" cy="27" r="1.4" fill="#2C3B2E"/><path d="M22 33h4" stroke="#B85C38"/>',
 "flower": '<circle cx="24" cy="10" r="5"/><circle cx="31.5" cy="16" r="5"/><circle cx="28.5" cy="24.5" r="5"/><circle cx="19.5" cy="24.5" r="5"/><circle cx="16.5" cy="16" r="5"/><circle cx="24" cy="18" r="3" stroke="#B85C38"/><path d="M24 29v13M24 37c-4 0-7-2-8-5M24 39c4 0 7-2 8-5"/>',
 "boots": '<path d="M12 8h12v18l12 6v8H12z"/><path d="M12 34h24M16 14h6M16 20h6" stroke="#B85C38"/>',
 "map": '<path d="M6 12l12-4 12 4 12-4v28l-12 4-12-4-12 4z"/><path d="M18 8v28M30 12v28"/><path d="M10 26l6-4 6 6 6-4" stroke="#B85C38"/>',
 "summit": '<path d="M4 40l14-22 6 8 6-12 14 26z"/><path d="M30 14V5l7 3-7 3" stroke="#B85C38"/>',
 "camera": '<rect x="6" y="14" width="36" height="24" rx="4"/><path d="M17 14l3-5h8l3 5"/><circle cx="24" cy="26" r="6" stroke="#B85C38"/>',
 "pack": '<rect x="12" y="12" width="24" height="30" rx="7"/><path d="M18 12V9a6 6 0 0 1 12 0v3"/><path d="M17 28h14v8H17z" stroke="#B85C38"/>',
 "rain": '<path d="M12 26a8 8 0 0 1 2-16 11 11 0 0 1 21 3 7 7 0 0 1-1 13z"/><path d="M16 32l-2 6M24 32l-2 6M32 32l-2 6" stroke="#B85C38"/>',
 "fork": '<path d="M16 6v12a4 4 0 0 0 8 0V6M20 6v36"/><path d="M32 6c-4 4-4 14 0 16v20" stroke="#B85C38"/>',
 "search": '<circle cx="20" cy="20" r="11"/><path d="M28 28l12 12" stroke="#B85C38"/>',
 "puddle": '<path d="M14 6h10v16l8 4v6H14z"/><path d="M6 40c6-3 12-3 18 0s12 3 18 0" stroke="#B85C38"/><path d="M10 34c4-2 8-2 12 0" stroke="#B85C38"/>',
 "sign": '<path d="M22 6v36M14 42h16"/><path d="M22 10h16l4 4-4 4H22zM22 22H10l-4 4 4 4h12" stroke="#B85C38"/>',
 "bug": '<ellipse cx="24" cy="28" rx="9" ry="12"/><path d="M24 16v24" /><circle cx="24" cy="12" r="4"/><path d="M15 24l-7-3M15 32l-7 3M33 24l7-3M33 32l7 3M21 9l-3-4M27 9l3-4" stroke="#B85C38"/>',
 "basket": '<path d="M6 20h36l-4 20H10z"/><path d="M14 20l6-12M34 20l-6-12"/><path d="M12 28h24" stroke="#B85C38"/>',
 "snowshoe": '<ellipse cx="24" cy="24" rx="9" ry="18"/><path d="M15 18h18M15 24h18M15 30h18" stroke="#B85C38"/>',
 "frost": '<path d="M24 6v36M6 24h36M11 11l26 26M37 11L11 37"/><circle cx="24" cy="24" r="5" stroke="#B85C38"/>',
 "icefall": '<path d="M8 8h32"/><path d="M14 8l2 14 2-14M22 8l2 22 2-22M30 8l2 16 2-16" stroke="#B85C38"/><path d="M6 40h36"/>',
 "thermos": '<rect x="16" y="12" width="16" height="30" rx="4"/><path d="M18 12V6h12v6"/><path d="M16 22h16" stroke="#B85C38"/>',
 "flag": '<path d="M12 42V6"/><path d="M12 8h22l-5 7 5 7H12" stroke="#B85C38"/>',
 "tracks": '<ellipse cx="16" cy="32" rx="4" ry="6"/><ellipse cx="30" cy="16" rx="4" ry="6"/><path d="M12 22l1 2M19 22l-1 2M26 6l1 2M33 6l-1 2" stroke="#B85C38"/>',
 "gift": '<rect x="8" y="18" width="32" height="22" rx="2"/><path d="M6 12h36v6H6zM24 12v28"/><path d="M24 12c-4-6-12-6-10 0M24 12c4-6 12-6 10 0" stroke="#B85C38"/>',
 "book": '<path d="M24 12c-6-4-12-4-18-2v28c6-2 12-2 18 2 6-4 12-4 18-2V10c-6-2-12-2-18 2z"/><path d="M24 12v28" stroke="#B85C38"/>',
}
def ic(k): return svg(I[k])

def coupon(icon, title, text, cls=""):
    return f'''<div class="cp {cls}"><div><div class="brandline">Hike together</div><div class="top"><div class="ic">{ic(icon)}</div><div><div class="gf">This coupon is good for</div><h3>{title}</h3><p>{text}</p></div></div></div>
<div><div class="note">A note from me</div><div class="ff"><div>To</div><div>From</div><div>Valid until</div></div></div></div>'''

def cpage(kicker, title, items, side, cls="", extra=""):
    cells = "".join(coupon(*it, cls=cls) for it in items)
    page(f'<div class="ch"><div><div class="kicker">{kicker}</div><h2>{title}</h2></div><div class="sc">{side}</div></div><div class="cpg">{cells}</div>{extra}', "cut")

# ---------- pages ----------
# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="460" height="330" viewBox="0 0 460 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<circle cx="360" cy="64" r="24" stroke="#F5F1EA" stroke-width="3"/>
<path d="M0 280 L120 120 L190 200 L280 70 L460 280 Z" fill="#3C5040" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M60 310 C120 300 150 270 200 262 C250 254 262 214 300 196 C330 182 350 150 380 140" stroke="#B85C38" stroke-width="3.5" stroke-dasharray="2 10"/>
<rect x="150" y="215" width="160" height="96" rx="6" fill="#F5F1EA" stroke="#F5F1EA"/>
<path d="M150 215 L230 270 L310 215" stroke="#3C5040" stroke-width="3"/>
</svg></div>
<div><h1>Hike Together Gift Coupons</h1><p class="sub">Write-in coupons for hikes you will take together, a trail pass to reveal the plan and a simple planning page, so the gift turns into a real day outside.</p>
<div class="meta" style="margin-top:22pt"><span>20 pages</span><span>44 coupons</span><span>Print at home</span><span>Letter + A4</span></div></div>""", "cover photo")

# 2 how to use
page("""<div class="kicker">Start here</div><h2>How to use this gift set</h2>
<p class="lead">The best gift for a hiker is a day outside together. This set turns that promise into something you can wrap, then helps you plan the hike.</p>
<div class="how" style="margin-top:8pt">
<div><div class="num">1</div><h3>Print</h3><p>Print the pages you want at <b>actual size (100%)</b>. Card stock (65 to 110 lb, about 175 to 300 gsm) feels like a real gift; plain paper works too. Everything reads well in black and white, and there is a low-ink version in your download.</p></div>
<div><div class="num">2</div><h3>Choose and cut</h3><p>Pick the coupons that suit them: 24 classic, 8 blank for your own ideas, 6 for kids and families and 6 for winter. Cut along the dashed lines with scissors or a paper trimmer.</p></div>
<div><div class="num">3</div><h3>Write</h3><p>Fill in To, From and a Valid until date. A date makes the gift happen. Use the blank coupons for the hike only the two of you would understand.</p></div>
<div><div class="num">4</div><h3>Wrap</h3><p>Fold the envelope on page 15, make a little booklet (page 19), add a gift tag from page 16, or tuck a Trail Pass inside a card.</p></div></div>
<h3>What is inside</h3>
<table class="ltab" style="margin-top:2pt"><tr><td>Pages 3 to 6</td><td>24 hike-together coupons, 6 per page</td></tr>
<tr><td>Page 7</td><td>8 blank write-in coupons</td></tr>
<tr><td>Page 8</td><td>6 kids and family coupons</td></tr>
<tr><td>Pages 9 and 10</td><td>Trail Pass reveal cards and a full-page gift certificate</td></tr>
<tr><td>Pages 11 to 14</td><td>Plan the hike, what to bring, beginner tips and a memory page</td></tr>
<tr><td>Pages 15 to 19</td><td>Envelope, gift tags and card, winter coupons, gift-a-guide card, assembly ideas</td></tr></table>
<div class="box forest"><h3>Giving it today?</h3><p style="margin:0">Fill in one coupon, take a photo and send it now. Hand over the printed set later. The plan is the gift.</p></div>""")

C1 = [("sunrise","Sunrise hike","We meet at the trailhead before first light. I bring the headlamps and something warm to drink."),
      ("waterfall","Waterfall hike","A trail that ends at falling water. You pick the waterfall, I plan the route and the snacks."),
      ("snow","First snow walk","The first morning with snow on the ground, we head out for an easy walk while it is fresh."),
      ("snack","I carry the snacks","Your favorite trail snacks, packed and carried by me, all day. No sharing required."),
      ("car","I drive to the trailhead","Door to trailhead and back home again. You choose the music, I handle the parking."),
      ("picnic","Picnic at the top","Lunch with a view. I pack it, carry it up, and take every scrap back down with us.")]
C2 = [("compass","A hike of your choice","Any trail you like, on a day that suits us both. Weather allowing, of course."),
      ("tree","A new park day","A day in a park, forest or nature preserve that neither of us has explored yet."),
      ("stars","Stargazing walk","A short evening walk close to the car to look up. Warm layers, headlamps and cocoa included."),
      ("mug","Hot chocolate after","After the hike, the warm drink is on me. Extra marshmallows if the trail was muddy."),
      ("leaf","Fall colors walk","A trail through changing leaves, timed for when the colors are at their best."),
      ("sunset","Sunset hike","A short trail to a viewpoint for sunset, with headlamps packed for the walk back.")]
C3 = [("lake","Lake loop","A trail to, or around, a lake. We stop at the water for as long as you like."),
      ("coffee","Trail breakfast","I pack breakfast and a thermos of coffee. We eat at the first good view."),
      ("bird","Bird walk","A slow walk with binoculars and a bird app. Let us see how many we can name."),
      ("dog","Hike with the dog","A dog-friendly trail so the whole family comes. Leash, water and bags packed."),
      ("flower","Wildflower walk","When the wildflowers are out, we go find them. Photos only, no picking."),
      ("boots","Slow hike, no rush","Your pace, as many breaks as you want, and no summit required.")]
C4 = [("map","Map and compass day","An easy trail and a paper map. We practice finding our way, together."),
      ("summit","Summit day","We pick a peak or high point that suits us both, and get ready for it together."),
      ("camera","Trail photo day","I am your trail photographer for the day. As many photos as you want, from every angle."),
      ("pack","Gear check together","Before the season, we check boots, layers and packs, and fix what needs fixing."),
      ("rain","Rainy day walk","Rain jackets on, puddles welcome. A short forest walk in a gentle rain (never in thunder)."),
      ("fork","Dinner after the hike","Dinner at your favorite place after the trail. Hungry hikers order dessert.")]
cpage("Coupons 1 to 6", "Hike-together coupons", C1, "Cut on the dashed lines<br>Write To, From and a date")
cpage("Coupons 7 to 12", "Hike-together coupons", C2, "Cut on the dashed lines<br>Write To, From and a date")
cpage("Coupons 13 to 18", "Hike-together coupons", C3, "Cut on the dashed lines<br>Write To, From and a date")
cpage("Coupons 19 to 24", "Hike-together coupons", C4, "Cut on the dashed lines<br>Write To, From and a date")

# 7 blank
blank = "".join('''<div class="cp blank"><div><div class="brandline">Hike together</div><div class="gf">This coupon is good for</div><div class="wl"></div><div class="wl"></div><div class="wl"></div></div><div class="ff"><div>To</div><div>From</div><div>Valid until</div></div></div>''' for _ in range(8))
page(f'<div class="ch"><div><div class="kicker">Your own ideas</div><h2>8 blank write-in coupons</h2></div><div class="sc">The trail you always talk about,<br>the hike you promised last summer</div></div><div class="cpg">{blank}</div>', "cut")

# 8 kids
K = [("search","Nature scavenger walk","A list of things to spot: a feather, a mushroom, a heart-shaped rock. We look, then leave them where they are."),
     ("puddle","Puddle boots day","Rain boots on after a wet night. Every puddle on the trail is allowed. Dry socks wait in the car."),
     ("sign","You pick the trail","You choose from three easy trails we find together. You are in charge of the trail map."),
     ("flag","Junior trail leader","You lead the way at the front, find the trail markers and choose where we stop for snacks."),
     ("bug","Bug and critter spotting","A slow walk with a magnifying glass. We look closely, never touch, and count what we find."),
     ("basket","Trail snack picnic","You plan the snack menu, we pack it together, and we eat it at the spot you pick.")]
cpage("For kids and families", "Little hiker coupons", K, "For kids hiking with an adult<br>Pick short, easy trails", cls="kid")

# 9 trail pass
def ticket():
    return '''<div class="tk"><div class="main"><div class="kicker" style="margin-bottom:5pt">You are invited</div><h3>Trail Pass</h3><p class="small" style="margin:0 0 4pt">Open on the day, or keep it a surprise until the trailhead.</p>
<div class="row"><div class="fl">Destination</div><div class="fl">Date</div></div>
<div class="row"><div class="fl">Meet at</div><div class="fl">Time</div></div>
<div class="row"><div class="fl">Distance <span class="u"><b></b>mi / <b></b>km</span></div><div class="fl">Back by</div></div>
<div class="fl">What to wear</div><div class="fl">What to bring</div>
<div class="lab" style="margin-top:12pt">A clue, if it is a surprise</div><div class="wl" style="height:24pt"></div><div class="wl" style="height:24pt"></div></div>
<div class="stub"><div class="lb">Hike together</div><div><div class="big1">Admit</div><div class="wl" style="height:30pt;margin:2pt 10pt 4pt"></div><div class="lb">hikers</div></div><div class="lb">Keep this stub</div></div></div>'''
page(f'<div class="ch"><div><div class="kicker">The reveal</div><h2>Trail Pass cards</h2></div><div class="sc">Cut on the dashed line,<br>fold or tear at the dotted line</div></div>{ticket()}{ticket()}', "cut")

# 10 certificate
page('''<div class="cert"><div class="brand" style="font:700 8pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage)">Hike together · Gift certificate</div>
<svg width="150" height="80" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round" style="margin-top:22pt"><path d="M10 100 L70 34 L100 68 L130 24 L190 100" stroke="#2C3B2E" stroke-width="4"/><path d="M30 104 C60 96 80 86 100 82 C122 78 128 58 146 46" stroke="#B85C38" stroke-width="3" stroke-dasharray="2 8"/><circle cx="160" cy="22" r="9" stroke="#B85C38" stroke-width="3"/></svg>
<h1>A day hike, guided by me</h1>
<p class="lead">I will pick a trail that suits us both, pack the snacks, check the weather and lead the way. All you need to do is lace up.</p>
<div class="cl2"><div class="f2"><div class="fl">For</div><div class="fl">From</div></div>
<div class="fl">Our trail (or "your choice")</div>
<div class="f2"><div class="fl">Planned date</div><div class="fl">Valid until</div></div>
<div class="fl">Included</div>
<div class="opts" style="margin-top:9pt"><span>Snacks</span><span>Ride to the trailhead</span><span>Hot drink after</span><span>Photos of you</span><span>Picnic</span><span>Dinner after</span></div>
<div class="lab" style="margin-top:16pt">A note for you</div><div class="wl" style="height:28pt"></div><div class="wl" style="height:28pt"></div><div class="wl" style="height:28pt"></div></div>
<div class="sig"><div class="fl">Signed</div><div class="fl">Date given</div></div></div>''')

# 11 plan the hike
page('''<div class="kicker">Make it happen</div><h2>Plan the hike</h2>
<p style="margin-bottom:2pt">Fill this in together a few days before. A good gift hike is one you both finish smiling.</p>
<div class="lab">The trail</div>
<div class="f2"><div class="fl">Trail name</div><div class="fl">Park or area</div></div>
<div class="f2"><div class="fl">Distance <span class="u"><b></b>mi / <b></b>km</span></div><div class="fl">Elevation gain <span class="u"><b></b>ft / <b></b>m</span></div></div>
<div class="opts"><span>Loop</span><span>Out and back</span><span>Point to point (two cars)</span><span>Restrooms at trailhead</span><span>Dogs allowed</span><span>Entry fee or permit needed</span></div>
<div class="lab" style="margin-top:12pt">Does it fit both of us?</div>
<div class="opts"><span>No longer than what the less experienced hiker has done comfortably</span><span>A climb we are both happy with</span><span>Footing we are both fine with (roots, rocks, steps)</span><span>An easy turnaround point if one of us is tired</span></div>
<div class="lab" style="margin-top:12pt">Timing</div>
<div class="f2"><div class="fl">Leave home</div><div class="fl">Start hiking</div></div>
<div class="f2"><div class="fl">Turnaround time</div><div class="fl">Sunset</div></div>
<p class="small" style="margin-top:5pt">Turnaround time: the time you turn back no matter where you are, so you finish with daylight to spare. Agree on it before you start.</p>
<div class="lab" style="margin-top:10pt">Checks</div>
<ul class="check"><li>Weather forecast checked the day before and again in the morning</li><li>Trail conditions and closures checked on the official park website or with a ranger</li><li>Parking, entry fee, timed entry or permit sorted</li><li>Someone at home knows our trail and when we will be back</li><li>Phones charged, and the map downloaded for offline use</li></ul>
<div class="f2"><div class="fl">Who knows our plan</div><div class="fl">We will message them by</div></div>
<div class="f2"><div class="fl">Backup trail if it is closed</div><div class="fl">Food stop after</div></div>''')

# 12 what to bring
ESS = [("1","Navigation","A map of the trail (paper or downloaded), and a phone or GPS. Know the route before you go."),
       ("2","Headlamp","Even on a day hike. Days are short in fall and winter, and delays happen. Spare batteries."),
       ("3","Sun protection","Sunglasses, sunscreen and a hat, in every season. Snow reflects sunlight."),
       ("4","First aid kit","Blister care, bandages and any personal medicines you need."),
       ("5","Knife or multi-tool","Plus a little repair tape for gear and straps."),
       ("6","Fire","Matches or a lighter for emergencies only. Follow local fire rules."),
       ("7","Emergency shelter","A light emergency blanket or bivy, in case you need to wait for help."),
       ("8","Extra food","More than you think you need. Easy snacks you both like."),
       ("9","Extra water","Enough for the whole hike, more on warm days, and a way to treat water."),
       ("10","Extra clothes","A warm layer and a rain or wind jacket, even if the morning is mild.")]
ess = "".join(f'<div><div class="n">{n}</div><div><h3>{h}</h3><p>{p}</p></div></div>' for n,h,p in ESS)
page(f'''<div class="kicker">Pack list</div><h2>What to bring on the gift hike</h2>
<p>The Ten Essentials, in plain words. The National Park Service recommends carrying them on every hike, even a short one.</p>
<div class="ess">{ess}</div>
<div class="cl" style="margin-top:6pt"><div><h3>Cool and cold days</h3><ul class="check"><li>Base layer that is not cotton</li><li>Fleece or light puffy jacket</li><li>Warm hat and gloves</li><li>Warm drink in an insulated bottle</li></ul></div>
<div><h3>Warm days</h3><ul class="check"><li>Breathable shirt and sun hat</li><li>Extra water and salty snacks</li><li>Insect repellent</li><li>An early start to avoid the heat</li></ul></div></div>''')

# 13 tips
page('''<div class="kicker">First hike together?</div><h2>Beginner-friendly tips</h2>
<p class="lead">The goal is a great day that makes both of you want to go again. These simple habits help.</p>
<div class="diff" style="margin-top:8pt">
<div><span class="tag">Start short</span><h3>Pick an easy first trail</h3><p>Choose a distance and climb the less experienced hiker is comfortable with. You can always pick a longer trail next time.</p></div>
<div><span class="tag">Pace</span><h3>Walk at the slower pace</h3><p>Let the slower hiker set the pace, ideally at the front. If you can chat while walking, the pace is right.</p></div>
<div><span class="tag">Daylight</span><h3>Know when it gets dark</h3><p>Check the sunset time, set a turnaround time and carry headlamps. In fall and winter, start earlier than feels necessary.</p></div>
<div><span class="tag">Conditions</span><h3>Check official sources</h3><p>Trails close for weather, fire, wildlife and repairs. Check the park website (NPS, Parks Canada or state and provincial parks) or ask a ranger.</p></div>
<div><span class="tag">Feet</span><h3>Wear shoes you know</h3><p>Use broken-in shoes and wool or synthetic socks. Stop and fix a hot spot as soon as you feel it, before it becomes a blister.</p></div>
<div><span class="tag">Breaks</span><h3>Eat and drink often</h3><p>Small snacks and sips every hour keep energy steady. Plan a fun stop: a view, a creek, a bench.</p></div></div>
<div class="em"><h3>Leave No Trace</h3><p>Stay on the trail, pack out everything you bring (food scraps too), leave rocks, flowers and pine cones where you find them, and give wildlife plenty of space.</p></div>
<div class="safe">Tell someone at home where you are going and when you will be back. Turn around if the weather changes, the trail looks unsafe or one of you is not feeling well. The trail will still be there next time.</div>''')

# 14 memory
page('''<div class="kicker">Keep it</div><h2>Our hike</h2>
<div class="f2"><div class="fl">Date</div><div class="fl">Trail</div></div>
<div class="f2"><div class="fl">Who came</div><div class="fl">Weather</div></div>
<div class="f2"><div class="fl">Distance <span class="u"><b></b>mi / <b></b>km</span></div><div class="fl">Time on the trail</div></div>
<div class="pbox" style="margin-top:12pt">Photo or sketch</div>
<div class="lab" style="margin-top:12pt">Best moment</div><div class="wl" style="height:24pt"></div><div class="wl" style="height:24pt"></div>
<div class="lab">What we saw</div><div class="wl" style="height:24pt"></div>
<div class="lab">Funniest moment</div><div class="wl" style="height:24pt"></div>
<div class="f2" style="margin-top:6pt"><div><div class="lab">How hard was it?</div><div class="stars"><span>Easy</span><i></i><i></i><i></i><i></i><i></i><span>Tough</span></div></div><div><div class="lab">How much fun?</div><div class="stars"><span>Some</span><i></i><i></i><i></i><i></i><i></i><span>Lots</span></div></div></div>
<div class="lab" style="margin-top:12pt">Next hike we want to do</div><div class="wl" style="height:24pt"></div>''')

# 15 envelope
env = '''<svg width="7.0in" height="7.5in" viewBox="0 0 690 740" fill="none" stroke-linejoin="round">
<path d="M130 180 Q150 40 345 22 Q540 40 560 180 L560 510 L540 700 Q345 735 150 700 L130 510 Z M130 190 L22 232 Q8 345 22 458 L130 500 M560 190 L668 232 Q682 345 668 458 L560 500" stroke="#2C3B2E" stroke-width="2.2"/>
<path d="M130 180 H560 M130 510 H560 M130 180 V510 M560 180 V510" stroke="#B85C38" stroke-width="2" stroke-dasharray="3 7"/>
<g font-family="Inter, sans-serif" font-size="13" font-weight="700" fill="#8A9A7E" letter-spacing="2" text-anchor="middle" stroke="none">
<text x="345" y="120">TOP FLAP · FOLD BACK LAST</text>
<text x="345" y="610">BOTTOM FLAP · FOLD BACK, GLUE</text>
<text x="76" y="350" transform="rotate(-90 76 350)">SIDE FLAP · FOLD BACK</text>
<text x="614" y="350" transform="rotate(90 614 350)">SIDE FLAP · FOLD BACK</text></g>
<g text-anchor="middle" stroke="none"><text x="345" y="330" font-family="Fraunces, serif" font-size="34" font-weight="600" fill="#2C3B2E">For a day outside</text>
<text x="345" y="372" font-family="Inter, sans-serif" font-size="14" font-weight="700" letter-spacing="3" fill="#B85C38">HIKE TOGETHER COUPONS</text>
<path d="M235 430 H455" stroke="#CFC7B6" stroke-width="1.5"/><text x="235" y="422" font-family="Inter, sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="#2C3B2E" text-anchor="start">TO</text></g>
</svg>'''
page(f'''<div class="ch"><div><div class="kicker">Wrap it</div><h2>Fold-and-glue envelope</h2></div><div class="sc">Holds the cut coupons<br>and gift tags</div></div>
<div class="legend"><span><svg width="34" height="6"><path d="M0 3H34" stroke="#2C3B2E" stroke-width="2"/></svg> Cut on the solid line</span><span><svg width="34" height="6"><path d="M0 3H34" stroke="#B85C38" stroke-width="2" stroke-dasharray="3 5"/></svg> Fold on the dotted line</span></div>
<div class="env">{env}</div>
<p class="small" style="text-align:center;margin-top:4pt">Cut out the shape. Fold every flap backward, away from the printed front. Fold the side flaps first, then fold the bottom flap and glue it onto them. Slip in the coupons, fold the top flap over and close it with a sticker or a gift tag.</p>''', "cut")

# 16 tags + card
TG = ["Let's take a hike", "See you at the trailhead", "A day outside, for you", "Happy trails", "For my favorite hiking buddy", "Lace up, it's a gift", "Trail time together", "Adventure is waiting"]
tags = "".join(f'<div class="tg"><div class="hole"></div><b>{t}</b><div class="ln">To</div><div class="ln">From</div></div>' for t in TG)
page(f'''<div class="ch"><div><div class="kicker">Finishing touches</div><h2>Gift tags and a card</h2></div><div class="sc">Punch the circle for a ribbon</div></div>
<div class="tags">{tags}</div>
<div class="lab" style="margin:14pt 0 5pt">Gift card · cut on the dashes, fold on the dotted line, message on the back</div>
<div class="card2"><div class="front"><div class="brandline">HikeSupply Co.</div><div><svg width="120" height="64" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M10 100 L70 34 L100 68 L130 24 L190 100" stroke="#F5F1EA" stroke-width="5"/><path d="M30 104 C60 96 80 86 100 82 C122 78 128 58 146 46" stroke="#B85C38" stroke-width="4" stroke-dasharray="2 9"/></svg><h3 style="margin-top:10pt">This gift is a day on the trail, together</h3></div><p style="margin:0;font-size:9pt;color:#CFD6CC">Turn over for the details</p></div>
<div><div class="lab" style="margin-top:0">Dear</div><div class="wl"></div><div class="wl"></div><div class="wl"></div><div class="wl"></div><div class="wl"></div><div class="lab">Love / from</div><div class="wl"></div></div></div>''', "cut")

# 17 winter
W = [("snowshoe","Snowshoe try-out","A first go on snowshoes on an easy, marked winter trail. Many parks and Nordic centers rent them."),
     ("frost","Frosty morning walk","A short walk on a cold, clear morning when the frost is still on the grass. Then breakfast."),
     ("icefall","Frozen waterfall view","An easy trail to a frozen waterfall. We admire it from the trail and stay off the ice."),
     ("thermos","Winter thermos picnic","Hot soup or cocoa from a thermos at a sunny spot, then a brisk walk back to warm up."),
     ("flag","First hike of the year","A walk on New Year's Day. Many state parks run free guided First Day Hikes."),
     ("tracks","Animal tracks walk","After fresh snow, we look for tracks and guess who passed by. From a distance, always.")]
cpage("Cold-season set", "Winter coupons", W, "Cut on the dashed lines<br>Write To, From and a date", cls="s",
      extra='<div class="safe">Winter safety: days are short and cold. Start early, wear layers (no cotton), carry headlamps and a warm drink, choose easy marked trails and check trail, weather and avalanche conditions on official sites before any snowy outing.</div>')

# 18 gift a guide
def gg():
    return '''<div class="gg"><div class="l"><div class="brandline">HikeSupply Co.</div><div>''' + svg(I["book"]).replace('stroke="#2C3B2E"', 'stroke="#F5F1EA"', 1).replace('<svg ', '<svg width="54" height="54" ', 1) + '''<h3 style="margin-top:10pt">A guide for our next adventure</h3></div><p style="margin:0;font-size:9pt;color:#CFD6CC">Slip this card in with a printed guide</p></div>
<div class="r"><div class="kicker" style="margin-bottom:4pt">Gift-a-guide card</div><p style="font-size:10.3pt;margin:0 0 2pt">I got you this guide, and I would love to plan a hike from it with you.</p>
<div class="fl">To</div><div class="fl">The guide</div><div class="fl">Our first plan from it</div><div class="fl">When</div><div class="fl">From</div><div class="lab" style="margin-top:12pt">A note</div><div class="wl" style="height:24pt"></div><div class="wl" style="height:24pt"></div></div></div>'''
page(f'<div class="ch"><div><div class="kicker">Giving a guide?</div><h2>Gift-a-guide cards</h2></div><div class="sc">Cut on the dashed lines</div></div>{gg()}{gg()}', "cut")

# 19 assembly
page('''<div class="kicker">Put it together</div><h2>Print-and-assemble guide</h2>
<p class="lead">Four easy ways to turn the cut coupons into a gift. All you need is what is already in the drawer.</p>
<div class="how" style="margin-top:8pt">
<div><div class="num">1</div><h3>Envelope</h3><ol><li>Print page 15 on regular paper or thin card.</li><li>Cut on the solid line and fold the flaps back on the dotted lines.</li><li>Glue the bottom flap onto the side flaps.</li><li>Add the coupons and close with a gift tag.</li></ol></div>
<div><div class="num">2</div><h3>Stapled booklet</h3><ol><li>Stack the coupons, with your favorite one on top.</li><li>Line up the left edges.</li><li>Staple twice on the left, about half an inch (1 cm) from the edge.</li></ol></div>
<div><div class="num">3</div><h3>Ring booklet</h3><ol><li>Punch a hole in the top left corner of each coupon.</li><li>Thread them on a binder ring or a small carabiner-style key ring.</li><li>Clip it to a daypack or water bottle as the gift.</li></ol></div>
<div><div class="num">4</div><h3>Ribbon booklet</h3><ol><li>Punch two holes along the left edge of each coupon.</li><li>Thread a ribbon or a spare boot lace through.</li><li>Tie a bow and add a gift tag.</li></ol></div></div>
<h3>Ideas for wrapping</h3>
<div class="cl"><ul class="check"><li>Roll the coupons inside a new pair of hiking socks</li><li>Tuck them in a mug with hot chocolate mix</li><li>Put them in the lid pocket of a daypack</li></ul>
<ul class="check"><li>Wrap a Trail Pass inside a paper trail map</li><li>Tie them to a water bottle with ribbon</li><li>Hide one coupon in each stocking or advent day</li></ul></div>
<div class="box forest"><h3>Printing tips</h3><p style="margin:0">Print at actual size (100%) and do a test page on plain paper first. US Letter and A4 versions are both in your download. For card stock, use your printer's thick paper setting and feed one sheet at a time if it jams.</p></div>''')

# 20 back
page("""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:28pt">HikeSupply Co.</div>
<svg width="200" height="120" viewBox="0 0 200 120" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M10 110 L70 40 L100 75 L130 30 L190 110" stroke="#F5F1EA" stroke-width="4"/><path d="M30 112 C60 104 80 92 100 88 C122 84 128 64 146 52" stroke="#B85C38" stroke-width="3" stroke-dasharray="2 8"/><circle cx="160" cy="25" r="10" fill="#B85C38" stroke="#B85C38"/></svg>
<h2 style="margin-top:26pt">Enjoy the trail together</h2>
<p>Thank you for choosing a HikeSupply gift. The best part of this present is not the paper, it is the day you spend outside. We hope it is the first of many.</p>
<p style="margin-top:18pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:30pt">This set gives general tips for easy day hikes. Trail, weather and safety conditions change: check official sources (NPS, Parks Canada, state and provincial parks, local rangers) before every hike and follow local rules. Kids hike with an adult. For personal use only: print as many copies as you like for your own gifts, but please do not share or resell the file. Cover photo: Kris Møklebust / Pexels.</p>""", "back")

css = open(os.path.join(HERE, "base.css")).read() + EXTRA
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
