MY_CSS = """<style>
.meal{background:#fff;border:1pt solid #CFC7B6;border-radius:9pt;padding:9pt 12pt 8pt}
.meal .top{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1.5pt solid var(--forest);padding-bottom:5pt}
.meal .top h3{margin:0;font-size:13.5pt}
.meal .top span{font:700 7pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--sage)}
.mr{display:grid;grid-template-columns:0.72in 1fr 0.55in;gap:0 8pt;border-bottom:0.6pt solid var(--line)}
.mr .k{font:700 7.3pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);padding-top:7pt}
.mr .w{border-left:0.6pt dashed #CFC7B6;font:600 6.6pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:#A39C8D;padding:7pt 0 0 6pt}
.mr .t .wl{height:19pt;border-bottom:0.6pt solid #E4DED2}
.mr .t .wl:last-child{border-bottom:0}
.m2{display:grid;grid-template-columns:1fr 1fr;gap:12pt}
.idea{display:grid;grid-template-columns:1fr 1fr;gap:10pt 14pt}
.idea>div{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:10pt 12pt}
.idea h3{margin:0 0 3pt;font-size:12.5pt}
.idea .who{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay);margin-bottom:5pt}
.idea ul{margin:0;padding-left:13pt;font-size:9.4pt;line-height:1.42}
.idea p{margin:0;font-size:9.3pt;line-height:1.42}
.combo{display:grid;grid-template-columns:1fr 1fr;gap:9pt 14pt}
.combo>div{border-bottom:0.6pt solid var(--line);padding:6pt 0 8pt}
.combo h3{margin:0 0 3pt;font-size:12pt}
.combo p{margin:0;font-size:9.3pt;line-height:1.4}
.combo .tg{font:700 6.8pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay);margin-bottom:4pt}
.hr{display:grid;grid-template-columns:0.7in 1fr 0.9in 0.45in;gap:0 10pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:31pt;padding-bottom:4pt;font-size:9pt}
.hr.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.hr .n{font:600 12pt/1 var(--serif);color:var(--clay)}
.hr i{width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff;justify-self:center}
.fw{display:grid;grid-template-columns:2.3in 1fr 0.75in 1fr;gap:0 10pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:23.5pt;padding-bottom:4pt;font-size:9pt}
.fw.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.fw span{color:#A39C8D;font-size:8pt;text-align:right}
.shop{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt 12pt}
.shop>div{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:8pt 10pt 4pt}
.shop h3{margin:0 0 2pt;font-size:11pt}
.shop .r{display:flex;align-items:flex-end;gap:6pt;height:19pt;border-bottom:0.6pt solid #E4DED2}
.shop .r i{flex:none;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt;margin-bottom:3pt}
.shop .r:last-child{border-bottom:0}
.grp{display:grid;grid-template-columns:1.25in 1.6in 1fr;gap:0 10pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:30pt;padding-bottom:4pt;font-size:9pt}
.grp.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.at{display:grid;grid-template-columns:1.9in 0.85in 0.85in 1fr;gap:0 10pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:24pt;padding-bottom:4pt;font-size:9pt}
.at.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.rng{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt}
.rng>div{background:var(--soft);border-radius:8pt;padding:11pt 12pt}
.rng .stat{font-size:21pt}
.rng .u{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);margin:4pt 0 5pt}
.rng p{margin:0;font-size:9.1pt;line-height:1.38}
.tl{display:grid;grid-template-columns:repeat(6,1fr);gap:0;margin:8pt 0 4pt;border-top:2pt solid var(--forest)}
.tl>div{padding:7pt 6pt 0;border-left:0.6pt solid var(--line);font-size:8.6pt;line-height:1.3}
.tl>div:first-child{border-left:0}
.tl b{display:block;font:600 12pt/1 var(--serif);color:var(--clay);margin-bottom:3pt}
.md .mr{grid-template-columns:0.55in 1fr 0.36in;gap:0 5pt}
.md .mr .k{font-size:6.6pt;letter-spacing:.06em}
.md .mr .w{font-size:5.6pt;letter-spacing:.02em;padding-left:4pt}
.cmp{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt}
.cmp>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:11pt 12pt}
.cmp h3{margin:0 0 3pt;font-size:13pt}
.cmp .who{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay);margin-bottom:6pt}
.cmp p{font-size:9.2pt;line-height:1.4;margin:0 0 5pt}
.mr .t .wl{border-bottom:0.6pt solid #CFC7B6 !important}
html.bw .cmp>div,html.bw .meal,html.bw .idea>div,html.bw .shop>div{background:#fff}
html.bw .rng>div{background:#fff;border:0.8pt solid #999}
</style>"""
