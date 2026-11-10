"""Generates index.html for p25 (State Parks Passport & Visit Log). Run: python3 gen.py
Agency names and websites checked on each official site in November 2026."""
import os
T = "State Parks Passport"
CHECKED = "November 2026"
pages = []
def page(body, n, cls=""):
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if n else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')

CSS = """<style>
@media print{html,body{background:#fff}}
.lab{font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest);margin:11pt 0 3pt}
.wl{border-bottom:0.8pt solid #CFC7B6;height:24pt}
.f2{display:grid;grid-template-columns:1fr 1fr;gap:0 22pt}
.f3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0 18pt}
.fl{display:flex;align-items:flex-end;gap:6pt;height:25pt;border-bottom:0.8pt solid #CFC7B6;font:600 7.8pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--forest);padding-bottom:3pt}
.fl .u{margin-left:auto;font-weight:500;color:#8B8577;letter-spacing:.04em;text-transform:none;font-size:8.5pt}
.fl .u b{display:inline-block;width:0.45in}
.ph{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2pt solid var(--forest);padding-bottom:7pt;margin-bottom:10pt}
.ph h2{margin:0;font-size:21pt}
.ph .r{font:700 7.5pt/1.3 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--sage);text-align:right}
.pg{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr);gap:8pt 11pt;height:8.42in}
.pk{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:9pt 10pt 8pt;display:grid;grid-template-columns:1fr 0.98in;gap:0 9pt}
.pk .nm{display:flex;align-items:flex-start;gap:6pt}
.pk .nm i{flex:none;width:11pt;height:11pt;border:1.3pt solid var(--forest);border-radius:2pt;margin-top:2pt}
.pk h3{margin:0;font-size:12.6pt;line-height:1.08}
.pk .st{font:700 7pt/1 var(--sans);letter-spacing:.12em;color:var(--clay);margin:4pt 0 0 17pt}
.pk .st .nr{display:inline-block;margin-left:5pt;padding:1.5pt 4pt;border:0.8pt solid var(--clay);border-radius:3pt;letter-spacing:.06em}
.pk .tr{font-size:8.6pt;line-height:1.3;margin-top:6pt}
.pk .tr b{display:block;color:var(--forest);font-size:9pt}
.pk .tr span{display:block;color:#5F5F5A}
.pk .en{font-size:7.9pt;line-height:1.28;color:#6B6B66;margin-top:4pt}
.pk .vd{display:flex;align-items:flex-end;gap:5pt;font:700 6.8pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);margin-top:auto;padding-top:4pt}
.pk .vd s{flex:1;border-bottom:0.8pt solid #BDB5A4;height:12pt;text-decoration:none}
.pk .l{display:flex;flex-direction:column}
.stamp{border:1.1pt dashed #B9B1A0;border-radius:6pt;display:flex;align-items:flex-end;justify-content:center;padding-bottom:5pt;font:700 6.3pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:#B0A898}
.pk.blank{background:var(--soft);border-color:var(--soft);display:block}
.az{columns:3;column-gap:16pt;font-size:9.8pt;margin-top:6pt}
.az div{display:flex;align-items:center;gap:6pt;padding:5.6pt 0;border-bottom:0.6pt solid var(--line);break-inside:avoid}
.az div i{flex:none;width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff}
.az div em{font-style:normal;margin-left:auto;font:700 7pt/1 var(--sans);letter-spacing:.08em;color:var(--sage)}
.az div b{font-weight:500;font-size:7.5pt;color:var(--sage);width:13pt}
.ca{columns:3;column-gap:16pt;font-size:9.2pt}
.ca .prov{break-inside:avoid;margin-bottom:11pt}
.ca h4{font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--clay);margin:0 0 3pt;padding-top:3pt}
.ca div.r{display:flex;align-items:flex-start;gap:6pt;padding:4.6pt 0;border-bottom:0.6pt solid var(--line)}
.ca div.r i{flex:none;width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff;margin-top:1pt}
.ca div.r em{font-style:normal;font:700 6.6pt/1 var(--sans);letter-spacing:.06em;color:var(--sage);margin-left:auto;padding-top:2pt}
.t10{display:grid;grid-template-columns:1fr 1fr;gap:9pt 12pt}
.t10>div{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:9pt 12pt;display:grid;grid-template-columns:22pt 1fr;gap:0 6pt}
.t10 .n{font:600 16pt/1 var(--serif);color:var(--clay)}
.t10 h3{margin:0 0 4pt;font-size:13pt}
.t10 p{margin:0;font-size:9.2pt;line-height:1.38}
.t10 p.s{color:#6B6B66;font-size:8.8pt;margin-top:4pt}
.steps2{display:grid;grid-template-columns:1fr 1fr;gap:10pt 16pt}
.steps2>div{display:grid;grid-template-columns:28pt 1fr;gap:8pt;padding:9pt 0;border-bottom:0.6pt solid var(--line)}
.steps2 .n{font:600 20pt/1 var(--serif);color:var(--clay)}
.steps2 h3{margin:0 0 3pt;font-size:12.5pt}
.steps2 p{margin:0;font-size:9.8pt;line-height:1.42}
.pass{display:grid;grid-template-columns:1fr 1fr;gap:10pt 14pt}
.pass>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:11pt 13pt}
.pass h3{margin:0 0 4pt;font-size:13pt}
.pass p{margin:0 0 4pt;font-size:9.6pt;line-height:1.42}
.pass .pr{font:600 13.5pt/1.15 var(--serif);color:var(--clay);margin:2pt 0 5pt}
.log{border:1pt solid #CFC7B6;border-radius:9pt;background:#fff;padding:11pt 13pt;margin-bottom:12pt}
.log .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:2pt}
.log .top h3{margin:0;font-size:14pt}
.opts{display:flex;flex-wrap:wrap;gap:4pt 11pt;font-size:8.8pt;margin-top:5pt}
.opts span::before{content:"";display:inline-block;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt;margin-right:4pt;vertical-align:-1pt;background:#fff}
.lg{display:grid;grid-template-columns:1fr 1.15in;gap:0 12pt}
.lg .stamp{height:1.15in;margin-top:8pt}
.goal{display:grid;grid-template-columns:22pt 1.7fr 1fr 1fr 0.8fr;gap:0 10pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:30pt;padding-bottom:4pt;font-size:9pt}
.goal.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.5pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.goal .n{font:600 14pt/1 var(--serif);color:var(--clay)}
.seas{display:grid;grid-template-columns:1fr 1fr;gap:10pt 14pt;margin-top:8pt}
.seas>div{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:9pt 12pt;height:2.12in}
.seas h3{margin:0 0 2pt;font-size:12.5pt}
.seas p{margin:0;font-size:8.4pt;color:#6B6B66}
.seas .wl{height:21pt}
.cnt{display:grid;grid-template-columns:repeat(8,1fr);gap:5pt}
.cnt div{height:0.44in;width:0.44in;justify-self:center;border:1pt solid #CFC7B6;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font:600 8.5pt/1 var(--serif);color:#A39C8D}
.cnt div.ms{border:1.6pt solid var(--clay);color:var(--clay)}
.sts{display:grid;grid-template-columns:repeat(8,1fr);gap:5pt}
.sts div{border:1pt solid #CFC7B6;border-radius:5pt;background:#fff;text-align:center;padding:5pt 0;font:700 8.5pt/1 var(--sans);letter-spacing:.06em;color:var(--forest)}
.tot{display:grid;grid-template-columns:repeat(4,1fr);gap:10pt;margin-top:8pt}
.tot>div{background:var(--soft);border-radius:8pt;padding:10pt 12pt;height:0.85in;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.lnt{display:grid;grid-template-columns:1fr 1fr;gap:4pt 18pt}
.lnt>div{display:grid;grid-template-columns:24pt 1fr;gap:8pt;padding:11pt 0;border-bottom:0.6pt solid var(--line)}
.lnt .n{font:600 16pt/1 var(--serif);color:var(--clay)}
.lnt h3{margin:0 0 4pt;font-size:13pt}
.lnt p{margin:0;font-size:10.2pt;line-height:1.45}
.free{border:1pt solid #CFC7B6;border-radius:10pt;background:#fff;position:relative;height:8.55in}
.free span{position:absolute;left:12pt;top:10pt;font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:#A39C8D}
.back{background:var(--forest);color:var(--stone);display:flex;flex-direction:column;justify-content:space-between}
.back h2{color:var(--stone);font-size:28pt}
.back p{color:#D9DED6}
.back .brand{font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage)}
.bk{display:grid;grid-template-columns:1fr 1fr;gap:14pt}
.bk>div{border:1pt solid #5C6E5E;border-radius:10pt;padding:14pt 16pt}
.bk h3{color:var(--stone);margin:0 0 6pt;font-size:15pt}
.bk p{font-size:10pt;margin:0 0 8pt}
.bk .u{font:600 8.6pt/1.4 var(--sans);color:#E9C9B6;}
html.bw .page{background:#fff}
html.bw{--forest:#222;--clay:#444;--sage:#666;--rust:#333;--soft:#fff}
html.bw .cover,html.bw .back{background:#fff;color:#222;border:2pt solid #222}
html.bw .cover h1,html.bw .back h2,html.bw .bk h3{color:#222}
html.bw .cover .sub,html.bw .cover .meta,html.bw .cover .brand,html.bw .back p,html.bw .back .brand{color:#333 !important}
html.bw .bk .u{color:#222}
html.bw .bk>div{border-color:#999}
html.bw .cover svg *{fill:none !important;stroke:#222 !important}
html.bw .box,html.bw .tot>div,html.bw .pk.blank{background:#fff;border:0.8pt solid #999}
html.bw .warn{background:#fff}
html.bw .box.forest{color:#222}html.bw .box.forest h3{color:#222}
.cover.photo{position:relative;overflow:hidden;background:#1F3A2E}
.cover.photo .cphoto{position:absolute;inset:0;background:url(cover-photo.jpg) center top/cover no-repeat}
.cover.photo .cshade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,38,30,.55) 0%,rgba(20,38,30,0) 18%,rgba(20,38,30,0) 42%,rgba(20,38,30,.82) 70%,rgba(20,38,30,.96) 100%)}
.cover.photo .brand{color:#F5F1EA;text-shadow:0 1px 6px rgba(0,0,0,.4)}
.cover.photo .bwart{display:none}
.cover.photo .sub{color:#E4E8E1}
html.bw .cover.photo .cphoto,html.bw .cover.photo .cshade{display:none}
html.bw .cover.photo .bwart{display:flex}
html.bw .cover.photo .brand{text-shadow:none}
</style>"""
CSS += """<style>
.tm{position:relative;margin:8pt auto 0}
.tm .t{position:absolute;border:1.2pt solid var(--forest);border-radius:5pt;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.tm .t b{font:600 16pt/1 var(--serif);color:var(--forest)}
.tm .t span{font:600 4.7pt/1.15 var(--sans);letter-spacing:0;text-transform:uppercase;color:var(--sage);margin-top:4pt;padding:0 1pt}
.tm.big .t span{font-size:6.4pt;letter-spacing:.02em}
.tm.big .t b{font-size:20pt}
.ml{display:grid;grid-template-columns:14pt 22pt 1.05in 1.7in 1fr 0.8in;gap:0 7pt;align-items:center;border-bottom:0.6pt solid var(--line);padding:4.3pt 0;font-size:8.6pt;line-height:1.2}
.ml.h{border-bottom:1.5pt solid var(--forest);font:700 7pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);padding:0 0 5pt}
.ml i{width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff}
.ml .c{font:700 7.5pt/1 var(--sans);letter-spacing:.06em;color:var(--clay)}
.ml .w{font-size:7.9pt;color:#5F5F5A;word-break:break-word}
.ml .d{border-bottom:0.8pt solid #CFC7B6;height:12pt}
.ml.h .d{border:0;height:auto}
.vl{border:1pt solid #CFC7B6;border-radius:9pt;background:#fff;padding:11pt 13pt 12pt;margin-bottom:12pt}
.vl .top{display:flex;justify-content:space-between;align-items:baseline}
.vl .top h3{margin:0;font-size:14pt}
.vg{display:grid;grid-template-columns:1fr 1.55in;gap:0 14pt}
.sb{border:0.9pt solid #BDB5A4;border-radius:4pt;height:1.55in;margin-top:3pt}
.sbl{font:700 6.6pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:#A39C8D;margin-top:9pt}
.xs{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(3,1fr);gap:12pt 14pt;height:8.3in}
.xs>div{display:flex;flex-direction:column}
.xs .fl{height:20pt}
.xs .sb{flex:1;height:auto;margin-top:6pt}
.cmp{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt}
.cmp>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:11pt 12pt}
.cmp h3{margin:0 0 3pt;font-size:13pt}
.cmp .who{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay);margin-bottom:6pt}
.cmp p{font-size:9.2pt;line-height:1.4;margin:0 0 5pt}
.hf{display:grid;grid-template-columns:1fr 1fr;gap:10pt 14pt}
.hf>div{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:9pt 12pt 6pt}
.hf h3{margin:0;font-size:12pt}
.yr{display:grid;grid-template-columns:0.8in 1fr 1fr 1fr 1fr;gap:0 10pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:27pt;padding-bottom:4pt;font-size:9pt}
.yr.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.pt{display:grid;grid-template-columns:1.25in 1.9in 0.8in 0.8in 1fr;gap:0 9pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:26pt;padding-bottom:4pt;font-size:9pt}
.pt.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
html.bw .tm .t,html.bw .vl,html.bw .cmp>div,html.bw .hf>div{background:#fff}
</style>"""

def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))
def opts(*o): return '<div class="opts">' + "".join(f"<span>{x}</span>" for x in o) + "</div>"

# ---------- 1 cover
page(f'''<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="500" height="360" viewBox="0 0 500 360" fill="none" stroke="#2C3B2E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 300 L120 170 L190 240 L280 120 L400 260 L450 220 L500 280"/>
<path d="M150 360 C210 330 250 320 300 300 C330 288 350 282 380 278" stroke-dasharray="4 12"/>
<path d="M50 330 L72 280 L94 330 Z M410 332 L434 274 L458 332 Z"/>
<circle cx="250" cy="70" r="52"/><circle cx="250" cy="70" r="43" stroke-dasharray="3 6"/>
<text x="250" y="78" text-anchor="middle" font-family="Fraunces" font-weight="600" font-size="26" fill="#2C3B2E" stroke="none">50+13</text>
</svg></div>
<div style="position:relative"><h1>State Parks Passport &amp; Visit Log</h1><p class="sub" style="max-width:6.2in">All 50 US states and Canada's 13 provinces and territories, each with its official parks agency and website. Maps to color in, a master checklist, and 48 visit logs with plain stamp boxes.</p>
<div class="meta" style="margin-top:22pt"><span>40 printable pages</span><span>mi + km</span><span>Agencies checked {CHECKED}</span></div></div>''', 0, "cover photo")

# ---------- 2 how to use
page(f'''<div class="kicker">Start here</div><h2>How to use this passport</h2>
<p class="lead">State and provincial parks are the parks most of us visit most often: close to home, open year-round, and full of good trails. This passport turns every visit into a page worth keeping.</p>
<div class="steps2">
<div><div class="n">1</div><div><h3>Print what you need</h3><p>Print at Actual size on US Letter. Normal printer paper works fine. Light card stock (about 65 lb / 176 gsm) holds ink stamps and stickers better. An A4 file and a low-ink printer-friendly file are included.</p></div></div>
<div><div class="n">2</div><div><h3>Keep it light</h3><p>You do not need all 40 pages in your pack. Take only the visit logs for this trip and add them to a binder or folder at home. Reprint any page for your own use as often as you like.</p></div></div>
<div><div class="n">3</div><div><h3>Color and check off</h3><p>Color each state on the map (page 5) and each province or territory (page 6) the first time you visit one of its parks. Tick it on the master checklist (pages 7 to 9).</p></div></div>
<div><div class="n">4</div><div><h3>Log and stamp</h3><p>Fill in a visit log (pages 10 to 33) for each park day. The stamp boxes are left empty on purpose, so a park stamp, a sticker or a ticket stub fits cleanly. More blank boxes on pages 34 and 35.</p></div></div></div>
<h3>Where do park stamps come from?</h3>
<p>Many state and provincial parks keep a stamp at the park office, visitor center or nature center, and several states run their own passport programs with booklets and prizes. Nothing is guaranteed at every park, so ask at the office when you arrive. No stamp? Write the park name in the box, add a sketch, or glue in your day-use receipt.</p>
<div class="warn"><b>Checked {CHECKED}.</b> Every agency name and website in this passport was checked on the agency's own site in {CHECKED}. Fees, hours, reservations, pet rules and closures change often. Always check the park's official page before you go.</div>
<h3>What is inside</h3>
<table><tr><th>Pages</th><th>What</th><th>Pages</th><th>What</th></tr>
<tr><td>3 to 4</td><td>Who runs which park, my goals</td><td>34 to 35</td><td>Extra stamp boxes</td></tr>
<tr><td>5 to 6</td><td>USA and Canada maps to color</td><td>36</td><td>Annual pass tracker</td></tr>
<tr><td>7 to 9</td><td>Master checklist with agencies</td><td>37 to 38</td><td>Hall of fame, year totals</td></tr>
<tr><td>10 to 33</td><td>48 visit logs</td><td>39</td><td>Leave No Trace</td></tr></table>''', 2)

# ---------- 3 who runs them
page(f'''<div class="kicker">Good to know</div><h2>State, provincial and national parks: who runs what</h2>
<p class="lead">Three kinds of parks, three different owners. That is why a pass for one rarely works at the others.</p>
<div class="cmp">
<div><h3>US national parks</h3><div class="who">Run by the National Park Service (federal)</div><p>64 national parks plus hundreds of other NPS sites. One pass, the America the Beautiful pass, covers entrance fees at all of them.</p><p>It does not cover state parks.</p></div>
<div><h3>US state parks</h3><div class="who">Run by each state</div><p>Every state has its own parks agency. Some are part of a natural resources department, some share an agency with fish and wildlife, some stand alone.</p><p>Each state sets its own fees, passes and rules.</p></div>
<div><h3>Canadian provincial parks</h3><div class="who">Run by each province or territory</div><p>Each province and territory runs its own parks. Canada's national parks are run by Parks Canada, a separate federal agency.</p><p>The Parks Canada Discovery Pass does not cover provincial parks.</p></div></div>
<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">A name that confuses many visitors</h3><p style="margin:0">Québec's "parcs nationaux" (Québec national parks) are provincial parks run by Sépaq for the province of Québec. They are not part of Parks Canada, so they have their own entry fees and their own annual card.</p></div>
<h3>What usually differs from state to state</h3>
<div class="cols" style="gap:0 20pt"><ul class="check"><li>Day-use or parking fee, and whether it is per car or per person</li><li>Different prices for residents and out-of-state cars</li><li>Annual passes and passport programs</li><li>Campsite reservations and how far ahead they open</li></ul><ul class="check"><li>Pet rules: most parks want pets on a leash, and some trails and beaches allow none</li><li>Opening hours, seasonal closures and gate times</li><li>Firewood rules: buy it where you will burn it</li><li>Drones, swimming areas and hunting seasons</li></ul></div>
<p class="small" style="margin-top:8pt">Each state's and province's official parks website is on pages 7 to 9. It is the only place to trust for today's rules.</p>''', 3)

# ---------- 4 goals
gr = "".join(f'<div class="goal" style="grid-template-columns:22pt 1.8fr 1fr 1fr 0.7fr"><span class="n">{k}</span><span></span><span></span><span></span><span></span></div>' for k in range(1, 11))
page(f'''<div class="kicker">Make a plan</div><h2>My state parks goals</h2>
<p>Big or small, write it down. A park a month is a great start; every state is a lifetime project.</p>
<div class="f3" style="margin-top:6pt"><div class="fl">This year<span class="u"><b></b> parks</span></div><div class="fl">New states<span class="u"><b></b></span></div><div class="fl">Provinces<span class="u"><b></b></span></div></div>
<div class="f2" style="margin-top:4pt"><div class="fl">Home state or province</div><div class="fl">Parks within 1 hr drive<span class="u"><b></b></span></div></div>
<h3 style="margin-top:16pt">Parks on my list</h3>
<div class="goal h" style="grid-template-columns:22pt 1.8fr 1fr 1fr 0.7fr"><span>#</span><span>Park</span><span>State or province</span><span>Best season</span><span>Done</span></div>{gr}
<h3 style="margin-top:16pt">My big one</h3>
<p class="small" style="margin-top:-2pt">The park, trail or state park road trip I most want to do, and why.</p>
{lines(3)}''', 4)

# ---------- 5 USA tile map
US = {"AK":(0,0,"Alaska"),"ME":(11,0,"Maine"),"WI":(6,1,"Wisconsin"),"VT":(10,1,"Vermont"),"NH":(11,1,"New Hampshire"),
"WA":(1,2,"Washington"),"ID":(2,2,"Idaho"),"MT":(3,2,"Montana"),"ND":(4,2,"North Dakota"),"MN":(5,2,"Minnesota"),"IL":(6,2,"Illinois"),"MI":(7,2,"Michigan"),"NY":(9,2,"New York"),"MA":(10,2,"Massa-<br>chusetts"),
"OR":(1,3,"Oregon"),"NV":(2,3,"Nevada"),"WY":(3,3,"Wyoming"),"SD":(4,3,"South Dakota"),"IA":(5,3,"Iowa"),"IN":(6,3,"Indiana"),"OH":(7,3,"Ohio"),"PA":(8,3,"Pennsyl-<br>vania"),"NJ":(9,3,"New Jersey"),"CT":(10,3,"Connect-<br>icut"),"RI":(11,3,"Rhode Island"),
"CA":(1,4,"California"),"UT":(2,4,"Utah"),"CO":(3,4,"Colorado"),"NE":(4,4,"Nebraska"),"MO":(5,4,"Missouri"),"KY":(6,4,"Kentucky"),"WV":(7,4,"West Virginia"),"VA":(8,4,"Virginia"),"MD":(9,4,"Maryland"),"DE":(10,4,"Delaware"),
"AZ":(2,5,"Arizona"),"NM":(3,5,"New Mexico"),"KS":(4,5,"Kansas"),"AR":(5,5,"Arkansas"),"TN":(6,5,"Tennessee"),"NC":(7,5,"North Carolina"),"SC":(8,5,"South Carolina"),
"OK":(4,6,"Oklahoma"),"LA":(5,6,"Louisiana"),"MS":(6,6,"Missis-<br>sippi"),"AL":(7,6,"Alabama"),"GA":(8,6,"Georgia"),
"HI":(0,7,"Hawaii"),"TX":(4,7,"Texas"),"FL":(9,7,"Florida")}
assert len(US) == 50
def tiles(d, cols, rows, s, g, sh=None, cls=""):
    sh = sh or s
    w = cols * s + (cols - 1) * g; h = rows * sh + (rows - 1) * g
    t = "".join(f'<div class="t" style="left:{c*(s+g):.3f}in;top:{r*(sh+g):.3f}in;width:{s}in;height:{sh}in"><b>{k}</b><span>{n}</span></div>' for k, (c, r, n) in d.items())
    return f'<div class="tm {cls}" style="width:{w:.2f}in;height:{h:.2f}in">{t}</div>'
page(f'''<div class="kicker">Color as you go</div><h2>My USA state parks map</h2>
<p>Color a state the first time you hike in one of its state parks. Each square stands for one state, set out roughly where it sits on the map, so even Rhode Island gets room to color.</p>
{tiles(US, 12, 8, 0.54, 0.055, 0.68)}
<div class="f3" style="margin-top:16pt"><div class="fl">States colored<span class="u"><b></b> of 50</span></div><div class="fl">First state</div><div class="fl">Latest state</div></div>
<div class="f2" style="margin-top:4pt"><div class="fl">Next state to color</div><div class="fl">Farthest from home</div></div>''', 5)

# ---------- 6 Canada map
CAM = {"YT":(0,0,"Yukon"),"NT":(1,0,"Northwest Territories"),"NU":(2,0,"Nunavut"),
"BC":(0,1,"British Columbia"),"AB":(1,1,"Alberta"),"SK":(2,1,"Saskat-<br>chewan"),"MB":(3,1,"Manitoba"),"ON":(4,1,"Ontario"),"QC":(5,1,"Québec"),"NL":(6,1,"Newfound-<br>land &amp; Labrador"),
"NB":(5,2,"New Brunswick"),"PE":(6,2,"Prince Edward Island"),"NS":(7,2,"Nova Scotia")}
page(f'''<div class="kicker">Color as you go</div><h2>My Canada provincial parks map</h2>
<p>Ten provinces and three territories. Color each one the first time you visit one of its parks.</p>
{tiles(CAM, 8, 3, 0.8, 0.07, 0.95, "big")}
<div class="f3" style="margin-top:18pt"><div class="fl">Colored<span class="u"><b></b> of 13</span></div><div class="fl">First</div><div class="fl">Latest</div></div>
<h3 style="margin-top:18pt">Crossing the border for a park day?</h3>
<div class="cols" style="gap:0 20pt"><ul class="check"><li>Passport or other accepted travel document for everyone in the car</li><li>Check what food you can bring across: fresh fruit, meat and firewood are often restricted</li><li>Pets need their own papers, such as a rabies certificate</li></ul><ul class="check"><li>Distances in Canada are in km (1 mile = 1.6 km)</li><li>Check your phone plan for roaming</li><li>Check the official government border pages before you go</li></ul></div>
<div class="lab" style="margin-top:14pt">Notes</div>{lines(4)}''', 6)

# ---------- 7-9 master checklist
S = [
("AL","Alabama","Alabama State Parks","alapark.com"),
("AK","Alaska","Alaska State Parks","dnr.alaska.gov/parks"),
("AZ","Arizona","Arizona State Parks &amp; Trails","azstateparks.com"),
("AR","Arkansas","Arkansas State Parks","arkansasstateparks.com"),
("CA","California","California State Parks","parks.ca.gov"),
("CO","Colorado","Colorado Parks and Wildlife","cpw.state.co.us"),
("CT","Connecticut","Connecticut State Parks (DEEP)","portal.ct.gov/deep/state-parks"),
("DE","Delaware","Delaware State Parks","destateparks.com"),
("FL","Florida","Florida State Parks","floridastateparks.org"),
("GA","Georgia","Georgia State Parks &amp; Historic Sites","gastateparks.org"),
("HI","Hawaiʻi","Hawaiʻi Division of State Parks (DLNR)","dlnr.hawaii.gov/dsp"),
("ID","Idaho","Idaho Department of Parks and Recreation","parksandrecreation.idaho.gov"),
("IL","Illinois","Illinois Department of Natural Resources","dnr.illinois.gov/parks"),
("IN","Indiana","Indiana State Parks (DNR)","in.gov/dnr/state-parks"),
("IA","Iowa","Iowa DNR State Parks","iowadnr.gov"),
("KS","Kansas","Kansas Department of Wildlife and Parks","ksoutdoors.gov"),
("KY","Kentucky","Kentucky State Parks","parks.ky.gov"),
("LA","Louisiana","Louisiana State Parks","lastateparks.com"),
("ME","Maine","Maine Bureau of Parks and Lands","maine.gov/dacf/parks"),
("MD","Maryland","Maryland Park Service (DNR)","dnr.maryland.gov/publiclands"),
("MA","Massachusetts","Department of Conservation &amp; Recreation (DCR)","mass.gov/orgs/department-of-conservation-recreation"),
("MI","Michigan","Michigan Department of Natural Resources","michigan.gov/dnr"),
("MN","Minnesota","Minnesota DNR Parks and Trails","dnr.state.mn.us/state-parks"),
("MS","Mississippi","Mississippi Dept. of Wildlife, Fisheries, and Parks","mdwfp.com"),
("MO","Missouri","Missouri State Parks","mostateparks.com"),
("MT","Montana","Montana State Parks","fwp.mt.gov/stateparks"),
("NE","Nebraska","Nebraska Game and Parks Commission","outdoornebraska.gov"),
("NV","Nevada","Nevada State Parks","parks.nv.gov"),
("NH","New Hampshire","New Hampshire State Parks","nhstateparks.org"),
("NJ","New Jersey","NJ State Parks, Forests &amp; Historic Sites","dep.nj.gov/parksandforests"),
("NM","New Mexico","New Mexico State Parks","emnrd.nm.gov/spd"),
("NY","New York","New York State Parks","parks.ny.gov"),
("NC","North Carolina","North Carolina State Parks","ncparks.gov"),
("ND","North Dakota","North Dakota Parks and Recreation","parkrec.nd.gov"),
("OH","Ohio","Ohio State Parks (ODNR)","ohiodnr.gov"),
("OK","Oklahoma","Oklahoma State Parks","travelok.com/state_parks"),
("OR","Oregon","Oregon Parks and Recreation Department","stateparks.oregon.gov"),
("PA","Pennsylvania","Pennsylvania State Parks (DCNR)","pa.gov/agencies/dcnr/recreation/where-to-go/state-parks"),
("RI","Rhode Island","Rhode Island State Parks (DEM)","riparks.ri.gov"),
("SC","South Carolina","South Carolina State Parks","southcarolinaparks.com"),
("SD","South Dakota","South Dakota Game, Fish and Parks","gfp.sd.gov/parks"),
("TN","Tennessee","Tennessee State Parks","tnstateparks.com"),
("TX","Texas","Texas Parks and Wildlife Department","tpwd.texas.gov/state-parks"),
("UT","Utah","Utah State Parks","stateparks.utah.gov"),
("VT","Vermont","Vermont State Parks","vtstateparks.com"),
("VA","Virginia","Virginia State Parks","dcr.virginia.gov/state-parks"),
("WA","Washington","Washington State Parks","parks.wa.gov"),
("WV","West Virginia","West Virginia State Parks","wvstateparks.com"),
("WI","Wisconsin","Wisconsin State Parks (DNR)","dnr.wisconsin.gov/topic/parks"),
("WY","Wyoming","Wyoming State Parks, Historic Sites &amp; Trails","wyoparks.wyo.gov")]
assert len(S) == 50
C = [
("AB","Alberta","Alberta Parks","albertaparks.ca"),
("BC","British Columbia","BC Parks","bcparks.ca"),
("MB","Manitoba","Manitoba Parks","gov.mb.ca/sd/parks"),
("NB","New Brunswick","NB Parks","nbparks.ca"),
("NL","Newfoundland and Labrador","ParksNL","parksnl.ca"),
("NS","Nova Scotia","Nova Scotia Parks","parks.novascotia.ca"),
("ON","Ontario","Ontario Parks","ontarioparks.ca"),
("PE","Prince Edward Island","PEI Provincial Parks","tourismpei.com/provincial-park"),
("QC","Québec","Québec national parks (Sépaq)","sepaq.com"),
("SK","Saskatchewan","Saskatchewan Provincial Parks","saskparks.tourismsaskatchewan.com"),
("NT","Northwest Territories","Northwest Territories Parks","nwtparks.ca"),
("NU","Nunavut","Nunavut Parks and Special Places","nunavutparks.com"),
("YT","Yukon","Yukon Parks","yukon.ca/parks")]
assert len(C) == 13
def mrow(x): return f'<div class="ml"><i></i><span class="c">{x[0]}</span><span>{x[1]}</span><span>{x[2]}</span><span class="w">{x[3]}</span><span class="d"></span></div>'
H = '<div class="ml h"><span></span><span></span><span>State</span><span>Parks agency</span><span>Official website</span><span class="d">First visit</span></div>'
page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Master checklist · 1 of 3</div><h2>US states, Alabama to Missouri</h2></div><div class="r">Agencies checked<br>{CHECKED}</div></div>
{H}{"".join(mrow(x) for x in S[:25])}''', 7)
page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Master checklist · 2 of 3</div><h2>US states, Montana to Wyoming</h2></div><div class="r">Agencies checked<br>{CHECKED}</div></div>
{H}{"".join(mrow(x) for x in S[25:])}''', 8)
page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Master checklist · 3 of 3</div><h2>Canada's provinces and territories</h2></div><div class="r">Agencies checked<br>{CHECKED}</div></div>
{H.replace(">State<", ">Province<")}{"".join(mrow(x) for x in C)}
<div class="f3" style="margin-top:14pt"><div class="fl">US states<span class="u"><b></b> of 50</span></div><div class="fl">Canada<span class="u"><b></b> of 13</span></div><div class="fl">All 63 done on</div></div>
<div class="box" style="margin-top:14pt"><h3 style="margin-top:0">How to find a park's rules in two minutes</h3><p style="margin:0">Open the official website above and search for the park by name. On its page, look for alerts or notices first (closures, fire, flooding), then fees and hours, then pet rules and reservations. Websites move: if a link does not work, search the agency name plus "state parks" or "provincial parks" and use the result that ends in the government's own domain.</p></div>
<p class="small" style="margin-top:8pt">Some states run their parks inside a larger department (natural resources, or fish and wildlife), so the website may open on the department's home page. Look for the parks section.</p>''', 9)

# ---------- 10-33 visit logs
def vlog():
    return f'''<div class="vl"><div class="top"><h3>Park</h3><span class="small">Visit no. ______</span></div>
<div class="vg"><div>
<div class="f2"><div class="fl">State or province</div><div class="fl">Date</div>
<div class="fl">Trail hiked</div><div class="fl">Distance<span class="u"><b></b> mi / <b></b> km</span></div>
<div class="fl">Who with</div><div class="fl">Time on trail</div></div>
<div class="lab">Weather</div>{opts("Sunny", "Cloudy", "Rain", "Wind", "Snow", "Hot", "Cold")}
<div class="lab">Wildlife, plants and trail notes</div>{lines(2, 21)}
<div class="lab">Highlight</div>{lines(2, 21)}
</div><div><div class="sbl">Stamp or sticker</div><div class="sb" style="height:1.9in"></div>
<div class="sbl" style="margin-top:8pt">Would I come back?</div>{opts("Yes", "Maybe", "No")}</div></div></div>'''
for k in range(24):
    page(f'<div class="kicker">Visit log · {k + 1} of 24</div><h2 style="margin-bottom:12pt">Park visits</h2>{vlog()}{vlog()}', 10 + k)

# ---------- 34-35 extra stamps
xb = "".join('<div><div class="f2" style="gap:0 12pt"><div class="fl">Site</div><div class="fl">Date</div></div><div class="sb"></div></div>' for _ in range(6))
page(f'<div class="kicker">Extra sites</div><h2 style="margin-bottom:12pt">More stamps: trails, nature centers, historic sites</h2><div class="xs">{xb}</div>', 34)
page(f'<div class="kicker">Extra sites</div><h2 style="margin-bottom:12pt">More stamps and stickers</h2><div class="xs">{xb}</div>', 35)

# ---------- 36 passes
pt = "".join('<div class="pt"><span></span><span></span><span></span><span></span><span></span></div>' for _ in range(12))
page(f'''<div class="kicker">Save on entry</div><h2>Annual passes and passport programs</h2>
<p>Many states and provinces sell an annual pass or a vehicle permit, and some run passport programs with stamps and rewards. If you visit the same state's parks three or four times a year, a pass often pays for itself. Prices and rules change, so fill this in from the official websites on pages 7 to 9.</p>
<div class="pt h"><span>State or province</span><span>Pass or program name</span><span>Cost</span><span>Bought</span><span>Valid until</span></div>{pt}
<h3 style="margin-top:14pt">A few names to look for</h3>
<p class="small" style="margin-top:-2pt">Examples seen on the official sites in {CHECKED}. Check what each one covers, and whether it is for residents only.</p>
<table><tr><th>State or province</th><th>Pass or program</th><th>State or province</th><th>Pass or program</th></tr>
<tr><td>Washington</td><td>Discover Pass</td><td>Georgia</td><td>ParkPass</td></tr>
<tr><td>Michigan</td><td>Recreation Passport</td><td>South Carolina</td><td>ALL Park Passport</td></tr>
<tr><td>New York</td><td>Empire Pass</td><td>Connecticut</td><td>Passport to the Parks</td></tr>
<tr><td>Colorado</td><td>Keep Colorado Wild Pass</td><td>Maryland</td><td>Maryland Park Service Passport</td></tr>
<tr><td>Ontario</td><td>Seasonal and annual day-use permits</td><td>Québec</td><td>Annual card, Québec national parks</td></tr></table>''', 36)

# ---------- 37 hall of fame
HF = ["Best view", "Best waterfall or lake", "Best trail for a first-timer", "Hardest trail I finished", "Best campground or picnic spot",
      "Best park with kids or friends", "Best wildlife moment", "Best park in bad weather"]
hf = "".join(f'<div><h3>{h}</h3><div class="fl" style="height:22pt">Park</div><div class="wl" style="height:22pt"></div></div>' for h in HF)
page(f'''<div class="kicker">The winners</div><h2>My favorite parks hall of fame</h2>
<p>Hand out the awards. Change them as often as you like.</p>
<div class="hf">{hf}</div>
<h3 style="margin-top:14pt">The number one park, and why</h3>{lines(7)}''', 37)

# ---------- 38 year totals
yr = "".join('<div class="yr"><span></span><span></span><span></span><span></span><span></span></div>' for _ in range(6))
page(f'''<div class="kicker">Keep count</div><h2>Year totals</h2>
<p>Add up each year at New Year, then compare. Small numbers count too.</p>
<div class="yr h"><span>Year</span><span>Parks visited</span><span>New states / provinces</span><span>Miles</span><span>Kilometers</span></div>{yr}
<h3 style="margin-top:16pt">All-time totals</h3>
<div class="tot"><div>Parks</div><div>States</div><div>Provinces</div><div>Miles / km</div></div>
<div class="f2" style="margin-top:10pt"><div class="fl">Longest hike<span class="u"><b></b> mi / <b></b> km</span></div><div class="fl">Most parks in a year</div></div>
<p class="small" style="margin-top:8pt">Handy to know: 1 mile is about 1.6 km, and 1 km is about 0.62 miles.</p>
<div class="lab" style="margin-top:12pt">Notes</div>{lines(9)}''', 38)

# ---------- 39 LNT
LNT = [("Plan ahead and prepare", "Check the park's page for hours, fees and closures. Carry water, food, a layer, a light and a map."),
       ("Travel on durable surfaces", "Stay on the marked trail, even through mud, so it does not widen. Never cut switchbacks."),
       ("Dispose of waste properly", "Pack out everything you bring, food scraps too. Use restrooms where there are some."),
       ("Leave what you find", "Flowers, rocks, shells and old artifacts stay where they are for the next visitor."),
       ("Minimize campfire impacts", "Use existing fire rings only, follow any fire ban, and buy firewood where you burn it."),
       ("Respect wildlife", "Watch from a distance, never feed animals, and store food so animals cannot reach it."),
       ("Be considerate of others", "Yield to hikers going uphill, keep pets on a leash where required, and keep music off.")]
lnt = "".join(f'<div><div class="n">{k}</div><div><h3>{a}</h3><p>{b}</p></div></div>' for k, (a, b) in enumerate(LNT, 1))
page(f'''<div class="kicker">One page to remember</div><h2>Leave No Trace and park etiquette</h2>
<p class="lead">State parks are busy, shared places close to town. These seven habits keep them good for everyone.</p>
<div class="lnt">{lnt}</div>
<div class="box forest" style="margin-top:12pt"><h3>Each park has its own rules</h3><p style="margin:0">Pets, drones, swimming, collecting and hunting seasons all have rules that change from state to state and park to park. In fall, some parks allow hunting: check the park page and wear bright colors. When in doubt, ask at the park office.</p></div>
<h3>Pack these on every park day hike</h3>
<div class="cols" style="gap:0 20pt"><ul class="check"><li>Water, more than you think</li><li>Snacks or lunch</li><li>Rain shell and a warm layer</li><li>Map, offline or on paper</li></ul><ul class="check"><li>Headlamp or flashlight</li><li>Sun hat and sunscreen</li><li>Small first aid kit</li><li>Tell someone your plan and return time</li></ul></div>
<p class="small" style="margin-top:8pt">Based on the seven Leave No Trace principles. Learn more at lnt.org.</p>''', 39)

# ---------- 40 back
page(f'''<div class="brand">HikeSupply Co.</div>
<div><h2>Collecting national parks too?</h2><p style="font-size:12pt;max-width:5.6in;margin-top:10pt">Keep your state and national park stamps side by side.</p>
<div class="bk" style="margin-top:22pt">
<div><h3>National Parks Hiking Tracker</h3><p>All 64 US national parks plus Canada's national parks, each with one easy day hike and a stamp box.</p><div class="u">hikesupplyco.com</div></div>
<div><h3>2027 Hiking Year Planner</h3><p>Plan a whole year of hikes month by month, with goals, challenges and a gear wish list.</p><div class="u">hikesupplyco.com</div></div></div></div>
<div><p style="font-size:9pt;max-width:6.4in">Agency names and websites were checked on each agency's own website in {CHECKED}. Fees, rules and closures change. Check official park sources before every trip and hike within your experience. For personal use: print as many copies as you like for yourself and your family. Cover photo: Erhan Üstünbaş / Pexels.</p>
<p style="font-size:10pt;margin-top:10pt"><b style="color:#F5F1EA">hikesupplyco.com</b></p></div>''', 0, "back")

html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css">{CSS}</head><body>{"".join(pages)}</body></html>'
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html"), "w").write(html)
print(len(pages), "pages")
