"""Generates index.html for p19 (Long Trail Planner). Run: python3 gen.py"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from body import MY_CSS, T, build
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
def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))
def opts(*o): return '<div class="opts">' + "".join(f"<span>{x}</span>" for x in o) + "</div>"
build(page, lines, opts)
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css">{CSS}{MY_CSS}</head><body>{"".join(pages)}</body></html>'
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html"), "w").write(html)
print(len(pages), "pages")
