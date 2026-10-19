"""Generates index.html for p02 (Kids Trail Explorer Pack). Run: python3 gen.py"""
import os
T = "Kids Trail Explorer Pack"
pages = []
def page(body, n, cls=""):
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if n else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')

F = "#2C3B2E"; C = "#B85C38"; S = "#8A9A7E"; G = "#C9A04A"; B = "#6E8FA3"
# simple line icons, viewBox 0 0 48 48
I = {
 "leaf": f'<path d="M10 38 C10 18 22 8 40 8 C40 28 30 38 10 38 Z" fill="{S}"/><path d="M10 38 L33 15"/>',
 "redleaf": f'<path d="M24 42 V30 M24 30 L12 34 L14 26 L6 22 L12 18 L10 10 L18 13 L24 4 L30 13 L38 10 L36 18 L42 22 L34 26 L36 34 Z" fill="{C}"/>',
 "yellowleaf": f'<path d="M10 38 C10 18 22 8 40 8 C40 28 30 38 10 38 Z" fill="{G}"/><path d="M10 38 L33 15"/>',
 "acorn": f'<path d="M15 21 Q15 38 24 41 Q33 38 33 21 Z" fill="{G}"/><path d="M12 21 Q24 9 36 21 Z" fill="#8B6B4A"/><path d="M24 13 V8"/>',
 "pinecone": f'<ellipse cx="24" cy="27" rx="10" ry="14" fill="#A0764E"/><path d="M15 21 L33 21 M14 27 L34 27 M16 33 L32 33 M24 13 V41 M24 13 V7"/>',
 "rock": f'<path d="M7 37 L11 25 L21 16 L34 18 L41 30 L37 38 Z" fill="#C9C2B3"/><path d="M21 16 L24 27 L41 30 M24 27 L17 37"/>',
 "feather": f'<path d="M36 7 C24 11 14 23 14 37 C28 35 37 22 36 7 Z" fill="#EDE6D8"/><path d="M10 41 L33 11"/>',
 "mushroom": f'<path d="M7 25 Q24 3 41 25 Z" fill="{C}"/><path d="M19 25 L18 40 H30 L29 25"/><circle cx="18" cy="17" r="2" fill="#fff"/><circle cx="28" cy="14" r="2" fill="#fff"/>',
 "bird": f'<path d="M8 26 Q12 14 26 16 L32 10 L35 17 Q42 21 34 26 Q28 36 15 34 L5 38 Z" fill="{B}"/><circle cx="30" cy="16" r="1.4" fill="{F}" stroke="none"/><path d="M35 15 L41 14 L36 18"/>',
 "squirrel": f'<path d="M30 41 C46 36 44 10 33 9 C26 9 26 18 32 19" fill="none"/><path d="M14 41 C10 33 12 23 20 22 C28 21 32 30 30 41 Z" fill="#B07A4F"/><circle cx="16" cy="19" r="6" fill="#B07A4F"/><path d="M13 13 L14 9 L17 13"/><circle cx="14" cy="18" r="1.2" fill="{F}" stroke="none"/>',
 "flower": f'<path d="M24 26 V43 M24 36 C18 32 14 34 13 37 C18 39 22 38 24 36"/><g fill="{C}"><circle cx="24" cy="10" r="5"/><circle cx="32" cy="16" r="5"/><circle cx="29" cy="25" r="5"/><circle cx="19" cy="25" r="5"/><circle cx="16" cy="16" r="5"/></g><circle cx="24" cy="18" r="4" fill="{G}"/>',
 "butterfly": f'<path d="M24 22 C16 6 4 9 7 20 C9 26 16 26 24 24 Z M24 24 C16 26 9 32 13 38 C17 42 22 34 24 26 Z" fill="{G}"/><path d="M24 22 C32 6 44 9 41 20 C39 26 32 26 24 24 Z M24 24 C32 26 39 32 35 38 C31 42 26 34 24 26 Z" fill="{G}"/><path d="M24 16 V36 M24 16 L20 9 M24 16 L28 9"/>',
 "cloud": f'<path d="M11 35 H37 A8 8 0 0 0 35 19 A11 11 0 0 0 15 21 A7 7 0 0 0 11 35 Z" fill="#fff"/>',
 "raincloud": f'<path d="M11 28 H37 A8 8 0 0 0 35 12 A11 11 0 0 0 15 14 A7 7 0 0 0 11 28 Z" fill="#fff"/><path d="M16 33 L14 39 M24 33 L22 39 M32 33 L30 39" stroke="{B}"/>',
 "sun": f'<circle cx="24" cy="24" r="8" fill="{G}"/><path d="M24 6 V11 M24 37 V42 M6 24 H11 M37 24 H42 M11 11 L15 15 M33 33 L37 37 M37 11 L33 15 M11 37 L15 33"/>',
 "snowflake": f'<g stroke="{B}"><path d="M24 6 V42 M8 15 L40 33 M8 33 L40 15 M20 9 L24 13 L28 9 M20 39 L24 35 L28 39 M9 20 L14 18 L12 13 M39 28 L34 30 L36 35 M9 28 L14 30 L12 35 M39 20 L34 18 L36 13"/></g>',
 "paw": f'<g fill="#8B6B4A"><ellipse cx="24" cy="31" rx="9" ry="8"/><circle cx="12" cy="20" r="4"/><circle cx="19" cy="12" r="4"/><circle cx="29" cy="12" r="4"/><circle cx="36" cy="20" r="4"/></g>',
 "deer": f'<g fill="#8B6B4A"><path d="M14 8 Q8 22 16 38 Q22 36 21 22 Q20 12 14 8 Z"/><path d="M34 8 Q40 22 32 38 Q26 36 27 22 Q28 12 34 8 Z"/></g>',
 "pine": f'<path d="M24 5 L13 20 H18 L10 33 H38 L30 20 H35 Z" fill="{S}"/><path d="M24 33 V42"/>',
 "baretree": f'<path d="M24 43 V20 M24 30 L14 20 L12 12 M14 20 L8 18 M24 24 L33 14 L34 7 M33 14 L40 12 M24 20 L22 9 L18 5 M22 9 L26 4"/>',
 "tree": f'<circle cx="24" cy="18" r="13" fill="{S}"/><circle cx="15" cy="24" r="7" fill="{S}"/><circle cx="33" cy="24" r="7" fill="{S}"/><path d="M24 28 V43 M24 34 L19 29 M24 32 L29 28"/>',
 "stick": f'<path d="M7 38 L41 12 M24 25 L22 15 M31 20 L38 22"/>',
 "puddle": f'<ellipse cx="24" cy="34" rx="17" ry="6" fill="#BFD3DC"/><path d="M24 8 C19 16 18 19 18 21 A6 6 0 0 0 30 21 C30 19 29 16 24 8 Z" fill="#BFD3DC"/>',
 "berries": f'<path d="M24 6 C30 6 34 10 34 14 C29 14 25 11 24 6 Z" fill="{S}"/><path d="M24 6 L18 22 M24 6 L30 26 M24 6 L24 30"/><g fill="{C}"><circle cx="17" cy="27" r="5"/><circle cx="31" cy="30" r="5"/><circle cx="24" cy="35" r="5"/></g>',
 "bug": f'<ellipse cx="24" cy="28" rx="9" ry="12" fill="{C}"/><circle cx="24" cy="13" r="5" fill="{F}"/><path d="M24 16 V40 M15 22 L8 18 M15 28 L7 28 M15 34 L8 38 M33 22 L40 18 M33 28 L41 28 M33 34 L40 38 M22 9 L18 4 M26 9 L30 4"/>',
 "web": f'<path d="M24 4 V44 M4 24 H44 M10 10 L38 38 M38 10 L10 38" stroke-width="1.4"/><path d="M24 12 L32 16 L36 24 L32 32 L24 36 L16 32 L12 24 L16 16 Z M24 18 L28 20 L30 24 L28 28 L24 30 L20 28 L18 24 L20 20 Z" stroke-width="1.4"/>',
 "moss": f'<path d="M5 40 L9 28 L20 22 L34 24 L43 40 Z" fill="#C9C2B3"/><path d="M9 28 Q12 22 16 25 Q19 19 24 23 Q28 18 32 23 Q37 21 37 28 L34 24 L20 22 Z" fill="{S}"/>',
 "nest": f'<circle cx="18" cy="24" r="5" fill="{B}"/><circle cx="27" cy="23" r="5" fill="{B}"/><path d="M6 24 Q24 46 42 24 Z" fill="#B08A5E"/><path d="M10 30 L38 28 M14 35 L34 33"/>',
 "icicle": f'<path d="M5 9 H43"/><path d="M9 9 L12 30 L15 9 M19 9 L22 40 L25 9 M29 9 L31 26 L33 9 M36 9 L39 34 L41 9" fill="#DCE8EE" stroke="{B}"/>',
 "frog": f'<path d="M8 36 Q8 20 24 20 Q40 20 40 36 Z" fill="{S}"/><circle cx="16" cy="18" r="5" fill="{S}"/><circle cx="32" cy="18" r="5" fill="{S}"/><circle cx="16" cy="18" r="1.6" fill="{F}" stroke="none"/><circle cx="32" cy="18" r="1.6" fill="{F}" stroke="none"/><path d="M17 29 Q24 33 31 29 M6 40 H16 M32 40 H42"/>',
 "bee": f'<path d="M20 14 C14 4 6 10 14 18 M28 14 C34 4 42 10 34 18" fill="#fff"/><ellipse cx="24" cy="27" rx="11" ry="9" fill="{G}"/><path d="M20 19 V35 M28 19 V35"/><path d="M35 27 L40 27"/>',
 "water": f'<path d="M5 16 Q11 11 17 16 T29 16 T41 16 M5 26 Q11 21 17 26 T29 26 T41 26 M5 36 Q11 31 17 36 T29 36 T41 36" stroke="{B}"/>',
 "sign": f'<path d="M24 14 V44"/><path d="M8 8 H34 L41 14 L34 20 H8 Z" fill="#B08A5E"/><path d="M13 14 H30" stroke="#fff"/>',
 "blaze": f'<path d="M14 4 V44 M34 4 V44"/><rect x="19" y="18" width="10" height="14" fill="{C}" stroke="{C}"/>',
 "bridge": f'<path d="M4 34 Q24 14 44 34"/><path d="M4 30 H44"/><path d="M10 30 V26 M17 30 V22 M24 30 V20 M31 30 V22 M38 30 V26"/><path d="M6 40 Q12 36 18 40 T30 40 T42 40" stroke="{B}"/>',
 "worm": f'<path d="M6 30 C12 18 18 18 22 28 C26 38 32 38 36 26 C38 20 41 20 43 22" stroke="#C9877A" stroke-width="5"/>',
 "dragonfly": f'<path d="M24 10 V44" stroke-width="3"/><g fill="#DCE8EE" stroke="{B}"><ellipse cx="13" cy="15" rx="11" ry="4"/><ellipse cx="35" cy="15" rx="11" ry="4"/><ellipse cx="14" cy="23" rx="10" ry="3.5"/><ellipse cx="34" cy="23" rx="10" ry="3.5"/></g><circle cx="24" cy="9" r="3" fill="{F}"/>',
 "breath": f'<circle cx="13" cy="24" r="8" fill="#F1D9C6"/><path d="M18 22 L19 25"/><path d="M24 22 Q30 16 34 22 Q40 18 42 24 Q42 31 35 30 Q31 34 26 30 Q22 28 24 22 Z" fill="#fff" stroke-dasharray="2 3"/>',
 "seed": f'<path d="M20 40 C15 30 18 14 34 6 C35 20 30 32 23 40 Z" fill="#D2B48C"/><circle cx="20" cy="40" r="4" fill="#A0764E"/>',
 "sprout": f'<path d="M24 44 V22"/><path d="M24 28 C14 28 10 22 10 16 C18 16 24 20 24 28 Z M24 24 C32 24 38 18 38 12 C30 12 24 16 24 24 Z" fill="{S}"/><path d="M8 44 H40"/>',
 "fern": f'<path d="M24 44 C24 26 30 10 18 8 C12 8 12 16 18 16 C22 16 22 12 20 12" fill="none"/><path d="M24 38 L16 34 M24 38 L32 34 M25 31 L18 27 M25 31 L32 27 M26 24 L20 21 M26 24 L32 21" stroke="{S}" stroke-width="3"/>',
 "ant": f'<g fill="{F}"><circle cx="12" cy="24" r="5"/><circle cx="23" cy="24" r="4"/><ellipse cx="35" cy="24" rx="7" ry="6"/></g><path d="M20 21 L16 12 M23 21 L24 11 M26 21 L32 13 M20 27 L16 36 M23 27 L24 37 M26 27 L32 35 M9 20 L5 14 M10 20 L10 13"/>',
 "clover": f'<g fill="{S}"><circle cx="18" cy="16" r="7"/><circle cx="30" cy="16" r="7"/><circle cx="24" cy="26" r="7"/></g><path d="M24 30 C24 36 22 40 18 44"/>',
 "three": f'<g fill="{S}"><path d="M24 22 C18 18 18 8 24 4 C30 8 30 18 24 22 Z"/><path d="M22 24 C16 30 8 28 5 22 C10 18 18 18 22 24 Z"/><path d="M26 24 C32 30 40 28 43 22 C38 18 30 18 26 24 Z"/></g><path d="M24 24 V44"/>',
 "geese": f'<path d="M6 14 L10 17 L14 14 M14 22 L18 25 L22 22 M22 30 L26 33 L30 30 M30 22 L34 25 L38 22 M38 14 L42 17 L46 14" stroke-width="2.4"/>',
 "woodhole": f'<path d="M14 4 V44 M34 4 V44"/><ellipse cx="24" cy="16" rx="4" ry="5" fill="{F}"/><rect x="20" y="27" width="8" height="11" rx="2" fill="{F}"/>',
 "log": f'<path d="M10 20 H40 V36 H10" fill="#B08A5E"/><ellipse cx="10" cy="28" rx="5" ry="8" fill="#E2C9A2"/><ellipse cx="10" cy="28" rx="2" ry="4"/>',
 "snail": f'<path d="M6 38 H38 Q42 38 42 34 L40 30" fill="none"/><circle cx="22" cy="26" r="11" fill="#D2B48C"/><path d="M22 26 m-5 0 a5 5 0 1 0 5 -5"/><path d="M38 30 L40 22 M38 30 L44 24"/>',
 "firefly": f'<circle cx="24" cy="28" r="12" fill="#F3E3A6" stroke="none"/><ellipse cx="24" cy="26" rx="5" ry="9" fill="{F}"/><path d="M19 24 L12 18 M29 24 L36 18"/><circle cx="24" cy="33" r="3" fill="{G}"/>',
 "mitten": f'<path d="M14 40 V20 Q14 10 22 10 Q30 10 30 18 V22 L34 18 Q38 16 38 21 L32 32 V40 Z" fill="{C}"/><path d="M12 40 H34"/>',
 "eye": f'<path d="M4 24 Q24 6 44 24 Q24 42 4 24 Z" fill="#fff"/><circle cx="24" cy="24" r="7" fill="{S}"/><circle cx="24" cy="24" r="3" fill="{F}"/>',
 "ear": f'<path d="M16 34 C16 40 26 42 28 34 C30 28 36 24 36 16 C36 8 30 4 24 4 C16 4 12 10 12 16"/><path d="M19 17 C19 12 28 11 28 17 C28 21 22 22 23 27"/>',
 "hand": f'<path d="M16 42 C10 36 8 30 10 26 L14 22 V10 Q14 7 17 7 Q20 7 20 10 V20 V6 Q20 3 23 3 Q26 3 26 6 V20 V8 Q26 5 29 5 Q32 5 32 8 V22 V12 Q32 9 35 9 Q38 9 38 12 V28 C38 36 34 42 28 42 Z" fill="#F1D9C6"/>',
 "nose": f'<path d="M24 6 C22 18 16 26 14 30 C12 34 16 38 20 36 C22 38 26 38 28 36 C32 38 36 34 34 30 C32 26 26 18 24 6 Z" fill="#F1D9C6"/>',
 "apple": f'<path d="M24 14 C16 8 6 14 8 26 C10 38 18 44 24 40 C30 44 38 38 40 26 C42 14 32 8 24 14 Z" fill="{C}"/><path d="M24 14 C24 10 26 6 29 4 M25 10 C30 6 36 8 36 8 C32 12 28 12 25 10 Z"/>',
 "whistle": f'<path d="M8 20 H30 A10 10 0 1 1 20 30 H8 Z" fill="{G}"/><circle cx="30" cy="30" r="3"/><path d="M8 20 V30"/><path d="M40 10 L44 6 M36 8 L37 3 M42 16 L47 15"/>',
 "group": f'<g fill="{S}"><circle cx="14" cy="14" r="5"/><circle cx="34" cy="14" r="5"/><circle cx="24" cy="20" r="4"/></g><path d="M7 40 V28 Q7 22 14 22 Q21 22 21 28 V40 M27 40 V28 Q27 22 34 22 Q41 22 41 28 V40 M19 40 V32 Q19 28 24 28 Q29 28 29 32 V40"/>',
 "cairn": f'<g fill="#C9C2B3"><ellipse cx="24" cy="39" rx="15" ry="5"/><ellipse cx="24" cy="29" rx="11" ry="5"/><ellipse cx="24" cy="20" rx="8" ry="4"/><ellipse cx="24" cy="12" rx="5" ry="3.5"/></g>',
 "map": f'<path d="M6 10 L17 6 L31 10 L42 6 V38 L31 42 L17 38 L6 42 Z" fill="#fff"/><path d="M17 6 V38 M31 10 V42"/><path d="M10 34 Q16 26 22 28 T36 16" stroke="{C}" stroke-dasharray="2 3"/>',
 "fire": f'<path d="M24 6 C30 14 36 20 36 30 A12 12 0 0 1 12 30 C12 24 16 20 18 16 C20 22 22 24 24 24 C22 18 22 12 24 6 Z" fill="{C}"/><path d="M8 44 L40 38 M8 38 L40 44"/>',
 "trash": f'<path d="M12 14 H36 L33 42 H15 Z" fill="#fff"/><path d="M8 14 H40 M19 14 V9 H29 V14 M20 20 V36 M28 20 V36"/>',
 "smile": f'<circle cx="24" cy="24" r="18" fill="#fff"/><circle cx="18" cy="20" r="2" fill="{F}" stroke="none"/><circle cx="30" cy="20" r="2" fill="{F}" stroke="none"/><path d="M16 29 Q24 36 32 29"/>',
 "boot": f'<path d="M12 6 H26 V24 L38 28 Q42 30 42 34 V38 H8 V34 Z" fill="#B08A5E"/><path d="M8 38 V42 H42 V38 M12 12 H26 M12 18 H26"/>',
}
def ic(name, size=44, sw=2.2):
    return (f'<svg class="ic" width="{size}" height="{size}" viewBox="0 0 48 48" fill="none" stroke="{F}" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{I[name]}</svg>')

def face(kind, size=40):
    mouth = {"great": "M14 28 Q24 38 34 28", "good": "M16 29 Q24 34 32 29", "ok": "M16 30 H32",
             "tired": "M16 32 Q24 27 32 32", "wow": ""}[kind]
    extra = '<circle cx="24" cy="31" r="4"/>' if kind == "wow" else f'<path d="{mouth}"/>'
    eyes = ('<path d="M14 19 Q18 16 22 19 M26 19 Q30 16 34 19"/>' if kind == "tired"
            else '<circle cx="18" cy="20" r="2" fill="#2C3B2E" stroke="none"/><circle cx="30" cy="20" r="2" fill="#2C3B2E" stroke="none"/>')
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 48 48" fill="none" stroke="{F}" stroke-width="2.2" '
            f'stroke-linecap="round"><circle cx="24" cy="24" r="19" fill="#fff"/>{eyes}{extra}</svg>')

CSS = """<style>
@media print{html,body{background:#fff}}
.hh{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2pt solid var(--forest);padding-bottom:8pt;margin-bottom:10pt}
.hh h2{margin:0;font-size:24pt}
.hh .lvl{display:flex;gap:4pt;align-items:center;font:700 8pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest)}
.hh .lvl i{display:inline-block;width:11pt;height:11pt;border-radius:50%;border:1.3pt solid var(--forest);background:#fff}
.hh .lvl i.on{background:var(--clay);border-color:var(--clay)}
.intro{font-size:12pt;margin:0 0 12pt}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:10pt}
.card{background:#fff;border:1pt solid #CFC7B6;border-radius:10pt;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8pt}
.card .tick{position:absolute;right:8pt;top:8pt;width:15pt;height:15pt;border:1.4pt solid var(--forest);border-radius:3pt;background:#fff}
.card.big{height:2.32in}
.card.big .nm{font:600 15.5pt/1.15 var(--serif);color:var(--forest);margin-top:8pt}
.card.big .hint{font-size:9pt;color:#8B8577;margin-top:2pt}
.card.mid{height:1.72in;justify-content:flex-start;padding-top:16pt}
.card.mid .nm{font-size:11pt;line-height:1.3;margin-top:9pt;color:var(--charcoal)}
.card.mid .nm b{color:var(--forest)}
.ch{display:grid;grid-template-columns:22pt 1fr;gap:0 8pt;padding:8pt 0;border-bottom:0.7pt solid var(--line);align-items:start}
.ch .n{font:600 15pt/1 var(--serif);color:var(--clay);padding-top:2pt}
.ch p{margin:0;font-size:10.8pt;line-height:1.35}
.ch .ans{display:flex;align-items:center;gap:8pt;margin-top:6pt;font-size:9.5pt;color:#8B8577}
.ln{display:inline-block;border-bottom:0.8pt solid #BDB5A4;min-width:1.1in;height:15pt}
.ln.w{min-width:2.4in}.ln.xw{min-width:3.6in}
.dots{display:inline-flex;gap:5pt}.dots i{display:inline-block;width:17pt;height:17pt;border-radius:50%;border:1.2pt solid var(--forest);background:#fff}
.bx{display:inline-flex;gap:8pt;flex-wrap:wrap}.bx span::before{content:"";display:inline-block;width:12pt;height:12pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff;margin-right:4pt;vertical-align:-1.5pt}
.draw{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;position:relative}
.draw span{position:absolute;left:9pt;top:7pt;font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:#A39C8D}
.foot{display:flex;justify-content:space-between;align-items:center;gap:14pt;margin-top:12pt}
.foot .count{font:600 12pt/1 var(--serif);color:var(--forest);white-space:nowrap}
.foot .count .ln{min-width:0.45in}
.tip{background:var(--soft);border-radius:8pt;padding:10pt 12pt;font-size:10pt;line-height:1.4;flex:1}
.tip b{color:var(--forest)}
.rule-row{display:grid;grid-template-columns:60pt 1fr;gap:14pt;align-items:center;padding:12pt 0;border-bottom:0.7pt solid var(--line)}
.rule-row h3{margin:0 0 3pt;font-size:16pt}
.rule-row p{margin:0;font-size:11pt;line-height:1.4}
.bingo{display:grid;grid-template-columns:repeat(5,1fr);border:1.6pt solid var(--forest);border-radius:6pt;overflow:hidden;background:#fff}
.bingo div{height:1.4in;border-right:0.8pt solid #CFC7B6;border-bottom:0.8pt solid #CFC7B6;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-size:10pt;line-height:1.2;padding:4pt;gap:6pt}
.bingo div:nth-child(5n){border-right:0}.bingo div:nth-last-child(-n+5){border-bottom:0}
.bingo .free{background:var(--forest);color:var(--stone);font:600 11pt/1.1 var(--serif)}
.bhead{display:grid;grid-template-columns:repeat(5,1fr);text-align:center;font:600 28pt/1 var(--serif);color:var(--forest);margin-bottom:6pt}
.sense{display:grid;grid-template-columns:70pt 1fr;gap:12pt;padding:11pt 0;border-bottom:0.7pt solid var(--line)}
.sense h3{margin:0 0 4pt;font-size:16pt}
.sense .slots{display:grid;grid-template-columns:1fr 1fr;gap:3pt 16pt}
.sense .slots div{border-bottom:0.8pt solid #BDB5A4;height:25pt}
.sp{display:grid;grid-template-columns:repeat(3,1fr);gap:10pt}
.sp .card{height:auto;justify-content:flex-start;padding:12pt 10pt 10pt;text-align:left;align-items:stretch}
.sp .card .top{display:flex;align-items:center;gap:8pt;margin-bottom:5pt}
.sp .card h3{margin:0;font-size:12.5pt}
.sp .card p{font-size:9.6pt;line-height:1.38;margin:0 0 8pt;flex:1}
.tally{border-top:0.8pt dashed #BDB5A4;padding-top:5pt;font:700 7pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:#A39C8D;height:40pt}
.jrow{display:grid;grid-template-columns:1fr 1fr;gap:0 20pt}
.fl{display:flex;align-items:flex-end;gap:6pt;height:25pt;border-bottom:0.8pt solid #BDB5A4;font:700 7.5pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);padding-bottom:3pt}
.fl .u{margin-left:auto;font-weight:500;color:#8B8577;letter-spacing:.03em;text-transform:none;font-size:8.5pt}
.fl .u b{display:inline-block;width:0.5in}
.lab{font:700 7.5pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);margin:11pt 0 4pt}
.wl{border-bottom:0.8pt solid #BDB5A4;height:26pt}
.wx{display:flex;gap:10pt;align-items:center}
.wx label{display:flex;flex-direction:column;align-items:center;gap:2pt;font-size:7.5pt;color:#8B8577}
.counts{display:grid;grid-template-columns:repeat(10,1fr);gap:6pt}
.counts div{height:0.62in;border:1pt solid #CFC7B6;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font:600 9pt/1 var(--serif);color:#A39C8D}
.counts div.ms{border:1.8pt solid var(--clay);color:var(--clay)}
.badges{display:grid;grid-template-columns:repeat(4,1fr);gap:10pt;margin-top:10pt}
.badges>div{background:var(--soft);border-radius:8pt;padding:11pt;text-align:center;font-size:9.5pt;line-height:1.35}
.badges b{display:block;font:600 15pt/1.1 var(--serif);color:var(--clay);margin-bottom:3pt}
.cert{padding:0.5in}
.cert .frame{border:3pt solid var(--forest);outline:1pt solid var(--forest);outline-offset:-9pt;border-radius:14pt;height:100%;padding:0.55in 0.6in;display:flex;flex-direction:column;align-items:center;text-align:center;background:#fff}
.cert h1{font-size:44pt;margin-top:14pt}
.cert .line{border-bottom:1pt solid var(--forest);width:4.6in;height:34pt;margin:2pt auto 4pt}
.cert .sig{display:grid;grid-template-columns:1fr 1fr;gap:28pt;width:100%;margin-top:auto}
.cert .sig div{border-top:1pt solid var(--forest);padding-top:5pt;font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest)}
.lnt{display:grid;grid-template-columns:1fr 1fr;gap:11pt 14pt}
.lnt>div{display:grid;grid-template-columns:44pt 1fr;gap:10pt;align-items:start;background:#fff;border:1pt solid #CFC7B6;border-radius:9pt;padding:13pt 12pt;min-height:1.5in}
.lnt h3{margin:0 0 4pt;font-size:13.5pt}
.lnt p{margin:0;font-size:10pt;line-height:1.4}
.lnt .num{font:700 7pt/1 var(--sans);letter-spacing:.14em;color:var(--clay);margin-bottom:3pt}
.mapbox{height:6.0in}
.legend{display:grid;grid-template-columns:repeat(4,1fr);gap:6pt;margin-top:8pt}
.legend div{display:flex;align-items:center;gap:6pt;font-size:9.5pt}
html.bw .page{background:#fff}
html.bw{--forest:#222;--clay:#444;--sage:#666;--rust:#333;--soft:#fff}
html.bw .cover{background:#fff;color:#222;border:2pt solid #222}
html.bw .cover h1{color:#222}
html.bw .cover .sub,html.bw .cover .meta,html.bw .cover .brand{color:#333}
html.bw .cover .art svg *{fill:none !important;stroke:#222 !important}
html.bw .ic *{fill:none !important}
html.bw .ic [stroke="none"]{fill:#222 !important}
html.bw .box,html.bw .tip,html.bw .badges>div{background:#fff;border:0.8pt solid #999}
html.bw .warn{background:#fff}
html.bw .box.forest{color:#222}html.bw .box.forest h3{color:#222}
html.bw .bingo .free{background:#fff;color:#222;border:1.4pt solid #222}
html.bw .hh .lvl i.on{background:#444}
</style>"""

def hunt(season, level, idx, items, intro, tip, n):
    lv = ''.join(f'<i class="{"on" if k <= idx else ""}"></i>' for k in (1, 2, 3))
    head = f'<div class="kicker">{season} hunt</div><div class="hh"><h2>{season}: {level}</h2><div class="lvl">Level {lv}</div></div><p class="intro">{intro}</p>'
    if idx == 1:
        cards = "".join(f'<div class="card big"><div class="tick"></div>{ic(i, 92, 1.8)}<div class="nm">{nm}</div>'
                        + (f'<div class="hint">{h}</div>' if h else "") + '</div>' for i, nm, h in items)
        body = f'<div class="g3">{cards}</div>'; total = len(items)
    elif idx == 2:
        cards = "".join(f'<div class="card mid"><div class="tick"></div>{ic(i, 58, 2)}<div class="nm">{nm}</div></div>' for i, nm in items)
        body = f'<div class="g3">{cards}</div>'; total = len(items)
    else:
        body = "".join(f'<div class="ch"><div class="n">{k}</div><div><p>{q}</p>' + (f'<div class="ans">{a}</div>' if a else '') + '</div></div>'
                       for k, (q, a) in enumerate(items, 1)); total = len(items)
    foot = f'<div class="foot"><div class="tip">{tip}</div><div class="count">I found <span class="ln"></span> of {total}</div></div>'
    page(head + body + foot, n)

L = lambda w="": f'<span class="ln {w}"></span>'
DOTS = lambda k: '<span class="dots">' + '<i></i>' * k + '</span>'
BX = lambda *o: '<span class="bx">' + ''.join(f'<span>{x}</span>' for x in o) + '</span>'

# ---------- 1 cover
page(f'''<div class="brand">HikeSupply Co.</div>
<div class="art"><svg width="500" height="380" viewBox="0 0 500 380" fill="none" stroke-linejoin="round" stroke-linecap="round">
<circle cx="390" cy="78" r="30" fill="#B85C38"/>
<path d="M0 300 L120 150 L180 220 L270 110 L400 260 L440 230 L500 290 V380 H0 Z" fill="#3C5040"/>
<path d="M245 140 L270 110 L298 145 L282 138 L270 150 L258 138 Z" fill="#F5F1EA"/>
<path d="M0 330 Q120 290 250 320 T500 310 V380 H0 Z" fill="#4E6450"/>
<path d="M60 330 L82 280 L104 330 Z M74 300 L82 282 L90 300" fill="#8A9A7E"/><path d="M82 330 V342" stroke="#8A9A7E" stroke-width="4"/>
<path d="M420 322 L446 262 L472 322 Z" fill="#8A9A7E"/><path d="M446 322 V336" stroke="#8A9A7E" stroke-width="4"/>
<path d="M380 330 L398 292 L416 330 Z" fill="#8A9A7E"/>
<path d="M150 372 C210 350 260 352 300 340 C330 331 350 322 372 318" stroke="#C9A04A" stroke-width="4" stroke-dasharray="3 12"/>
<g transform="translate(205 196)">
 <path d="M38 52 L22 120 M52 52 L64 120" stroke="#2C3B2E" stroke-width="12"/>
 <path d="M14 122 H32 M56 122 H76" stroke="#2C3B2E" stroke-width="10"/>
 <rect x="16" y="34" width="26" height="40" rx="8" fill="#C9A04A"/>
 <path d="M26 36 Q45 26 60 36 L62 68 Q45 76 28 68 Z" fill="#B85C38"/>
 <path d="M60 44 L84 30" stroke="#F1D9C6" stroke-width="7"/>
 <circle cx="92" cy="22" r="13" stroke="#F5F1EA" stroke-width="5"/><path d="M83 31 L78 37" stroke="#F5F1EA" stroke-width="5"/>
 <circle cx="46" cy="18" r="15" fill="#F1D9C6"/>
 <path d="M30 14 Q46 -4 62 14 Z" fill="#8A9A7E"/><path d="M58 13 H70" stroke="#8A9A7E" stroke-width="5"/>
 <circle cx="51" cy="19" r="1.8" fill="#2C3B2E"/><path d="M48 26 Q52 28 56 25" stroke="#2C3B2E" stroke-width="1.8"/>
</g>
</svg></div>
<div><h1>Kids Trail Explorer Pack</h1><p class="sub" style="max-width:6in">Scavenger hunts for every season, trail bingo and a junior hiker journal. Made for little legs and curious eyes, ages 4 to 10.</p>
<div class="meta" style="margin-top:22pt"><span>24 printable pages</span><span>3 levels</span><span>Letter + A4</span></div></div>''', 0, "cover")

# ---------- 2 grown-ups
page(f'''<div class="kicker">For grown-ups</div><h2>How to use this pack</h2>
<p class="lead">Kids walk farther and happier when they have a mission. Hand them a hunt sheet at the trailhead and the hike becomes a search, not a march.</p>
<h3>Pick the right level</h3>
<table><tr><th>Level</th><th>Best for</th><th>How it works</th></tr>
<tr><td><b>Easy</b></td><td>Ages 4 to 5</td><td>Nine big pictures. No reading needed. Spot it, tick the box.</td></tr>
<tr><td><b>Tricky</b></td><td>Ages 6 to 7</td><td>Twelve picture clues with short words to read together.</td></tr>
<tr><td><b>Expert</b></td><td>Ages 8 to 10</td><td>Ten challenges to count, compare, listen, draw and write.</td></tr></table>
<p class="small" style="margin-top:-2pt">Ages are a guide. Let siblings swap levels, or team a reader with a younger spotter.</p>
<div class="cols" style="margin-top:6pt">
<div><h3>What is inside</h3><ul class="check">
<li>Kid trail rules and Leave No Trace in kid words</li>
<li>Four seasonal hunts, three levels each</li>
<li>Trail bingo, a five senses walk, a sign spotter</li>
<li>Journal pages, a hike map page, a hike counter</li>
<li>A Junior Trail Explorer certificate</li></ul></div>
<div><h3>Printing tips</h3>
<p><b>Print at Actual size</b> on US Letter. An A4 file and a low-ink printer-friendly file are included.</p>
<p><b>Card stock</b> works well for bingo and the certificate. A clipboard and a crayon or pencil make the hunt easy on the move.</p>
<p><b>Reprint</b> the hunts and journal pages as often as you like for your own family.</p></div></div>
<div class="box forest"><h3>Spot it, don't take it</h3><p style="margin:0">Every hunt is a looking game. Nothing gets picked, collected or taken home. Kids tick the box, then leave the leaf, cone or rock for the next family. Many parks do not allow collecting at all.</p></div>
<div class="warn"><b>Before you go:</b> choose a short trail the slowest walker can finish, check the weather and park alerts, and pack water, snacks and layers. Give each child a whistle and practice the trail rules on page 3 at home. Take a photo of your child at the trailhead so you know exactly what they are wearing today. Do a tick check after the hike.</div>''', 2)

# ---------- 3 trail rules
rules = [
 ("group", "Stay where you can see your grown-up", "If you cannot see them, stop and call out. Grown-ups lead or follow, kids stay in the middle."),
 ("sign", "Stop at every trail sign and fork", "Wait there for your group, even if you know the way. Pick the path together."),
 ("boot", "Stay on the trail", "Trails keep you safe and protect plants. No shortcuts, even when it looks quicker."),
 ("eye", "Look, don't touch or taste", "Never eat berries, mushrooms or plants from the trail. Leave animals and their homes alone."),
 ("three", "Leaves of three, let it be", "Poison ivy can have three shiny or dull leaves. Do not touch plants you do not know."),
 ("tree", "If you are lost, hug a tree", "Stop. Stay in one place by a tree, even if you are scared. People will come to find you. Staying still makes you easier to find."),
 ("whistle", "Blow your whistle three times", "Three blows means \"I need help.\" Wait, then blow three times again. When you hear someone call your name, shout back. You are not in trouble."),
]
rr = "".join(f'<div class="rule-row">{ic(i, 58)}<div><h3>{h}</h3><p>{p}</p></div></div>' for i, h, p in rules)
page(f'''<div class="kicker">Read together before every hike</div><h2>My trail rules</h2>{rr}
<div class="foot"><div class="tip"><b>Practice at home:</b> play "hug a tree" in the yard or a park. Your child picks a tree, stays put and blows the whistle while you walk over.</div>
<div class="count">Explorer: {L()}</div></div>''', 3)

# ---------- 4 LNT
lnt = [
 ("map", "Plan with your grown-up", "Look at the map before you go. Pack water, a snack, a jacket and your whistle."),
 ("boot", "Stay on the path", "Walk on the trail, even through puddles and mud, so plants on the sides can keep growing."),
 ("trash", "Pack out every crumb", "Everything you bring comes home with you. Wrappers, apple cores and peels too."),
 ("rock", "Leave what you find", "Rocks, cones, flowers and feathers stay on the trail. Take a picture or draw them instead."),
 ("fire", "Be careful with fire", "Only grown-ups make fires, only where it is allowed. Never play with matches."),
 ("bird", "Watch animals from far away", "Be quiet and still. Never feed wild animals, not even a tiny crumb. People food makes them sick."),
 ("smile", "Share the trail kindly", "Say hi, step aside to let people pass, and use your quiet trail voice so everyone can hear the birds."),
]
lb = "".join(f'<div>{ic(i, 50)}<div><div class="num">PROMISE {k}</div><h3>{h}</h3><p>{p}</p></div></div>' for k, (i, h, p) in enumerate(lnt, 1))
page(f'''<div class="kicker">Leave No Trace for kids</div><h2>Seven trail promises</h2>
<p class="intro">Good explorers leave the trail just as nice as they found it, so animals stay healthy and the next family can enjoy it too.</p>
<div class="lnt">{lb}<div style="background:var(--soft);border-color:var(--soft);display:block"><h3>My promise</h3><p style="margin-bottom:8pt">I will follow the seven trail promises on every hike.</p><div class="wl" style="height:24pt"></div><p class="small" style="margin-top:3pt">Sign your name</p></div></div>
<p class="small" style="margin-top:10pt">Based on the seven Leave No Trace principles, written here in kid words. Learn more at lnt.org.</p>''', 4)

# ---------- hunts
n = 5
FALL = [
 ("Easy", [("redleaf", "Red leaf", ""), ("yellowleaf", "Yellow leaf", ""), ("acorn", "Acorn", ""),
           ("pinecone", "Pinecone", ""), ("mushroom", "Mushroom", "look, don't touch"), ("squirrel", "Squirrel", ""),
           ("feather", "Feather", ""), ("rock", "Big rock", ""), ("web", "Spider web", "")],
  "Find each thing and tick its box. Leave everything where it is."),
 ("Tricky", [("redleaf", "A leaf with <b>pointy edges</b>"), ("leaf", "A leaf <b>bigger than your hand</b>"),
            ("seed", "A seed with a <b>wing</b> that spins"), ("acorn", "An acorn with its <b>cap still on</b>"),
            ("nest", "A <b>bird nest</b> in a branch"), ("geese", "Birds flying in a <b>V shape</b>"),
            ("moss", "<b>Moss</b> on a log or rock"), ("stick", "A stick shaped like a <b>letter</b>"),
            ("nose", "Something that <b>smells</b> like fall"), ("tree", "A tree with <b>bumpy bark</b>"),
            ("squirrel", "An animal <b>carrying food</b>"), ("paw", "Animal <b>tracks</b> in mud")],
  "Read each clue with your grown-up. Tick it when you spot it."),
 ("Expert", [("Find leaves in five different colors. Color in one dot for each.", DOTS(5)),
            ("Find a leaf with points, like a maple leaf. How many points does it have?", L()),
            ("Look for a pile of chewed pinecone pieces. Squirrels leave these where they eat.", BX("Found it", "Not today")),
            ("Watch a bird for one minute. What is it doing?", BX("Walking", "Hopping", "Flying", "Eating")),
            ("Find a mushroom. Look only, never touch or taste. What color is the top?", L("w")),
            ("Find a seed that rides the wind and one that sticks to socks or fur.", BX("Wind seed", "Sticky seed")),
            ("Stand still and listen for one minute. How many different bird sounds?", L()),
            ("Find the oldest-looking tree. Can your arms reach all the way around it?", BX("Yes", "No", "Almost")),
            ("Count your steps from one trail sign or marker to the next.", L() + " steps"),
            ("Draw your favorite leaf shape on the back of this page.", BX("Done"))],
  "Use a pencil so you can fix mistakes, and save the drawing for your snack stop."),
]
WINTER = [
 ("Easy", [("pine", "Evergreen tree", ""), ("snowflake", "Snow or frost", ""), ("icicle", "Icicle", "look from a safe spot"),
           ("deer", "Animal tracks", ""), ("baretree", "Bare tree", ""), ("pinecone", "Pinecone", ""),
           ("bird", "A bird", ""), ("breath", "Your foggy breath", ""), ("berries", "Red berries", "look, don't eat")],
  "Find each thing and tick its box. No snow? Look for frost and cold puddles."),
 ("Tricky", [("paw", "Tracks from <b>two different</b> animals"), ("nest", "A <b>nest</b> you can see in a bare tree"),
            ("woodhole", "A <b>woodpecker hole</b> in a trunk"), ("puddle", "A <b>frozen</b> puddle"),
            ("pine", "A tree that is <b>still green</b>"), ("pinecone", "A pinecone on the <b>snow or ground</b>"),
            ("snowflake", "<b>Frost</b> or a snowflake up close"), ("sun", "Sun shining through <b>bare branches</b>"),
            ("icicle", "An icicle <b>longer than your finger</b>"), ("bird", "A bird <b>puffed up</b> to stay warm"),
            ("moss", "<b>Green moss</b> in winter"), ("mitten", "Mittens or gloves on <b>every hiker</b>")],
  "Read each clue with your grown-up. Never stand under big icicles."),
 ("Expert", [("Find animal tracks. Follow them with your eyes only, from the trail. Which way did it go?", BX("Left", "Right", "Ahead", "Back")),
            ("Find an evergreen. Do its needles grow in little bunches or one by one?", BX("Bunches", "One by one")),
            ("Trees make buds in fall and wait for spring. Count the buds on one twig.", L()),
            ("Find a spot where the snow or frost melted first. Why there?", L("w")),
            ("Find woodpecker holes. Are they round or long and rectangle-shaped?", BX("Round", "Rectangle", "Both")),
            ("If there is snow, push a stick in to measure it.", L() + " in &nbsp;/ " + L() + " cm"),
            ("Find three things that are still green in winter.", DOTS(3)),
            ("Stand still and listen. Do you hear birds, wind, water or crunching snow?", BX("Birds", "Wind", "Water", "Snow")),
            ("Blow a breath cloud. Count how long until it disappears.", L() + " seconds"),
            ("Draw a snowflake or a frost pattern on the back of this page.", BX("Done"))],
  "Keep moving to stay warm, and head back before anyone gets too cold."),
]
SPRING = [
 ("Easy", [("flower", "Flower", ""), ("sprout", "New sprout", ""), ("worm", "Worm", ""),
           ("puddle", "Puddle", ""), ("bird", "Singing bird", ""), ("butterfly", "Butterfly", ""),
           ("bee", "Bee", "look, don't touch"), ("fern", "Fern", ""), ("raincloud", "Rain cloud", "")],
  "Find each thing and tick its box. Leave every flower growing."),
 ("Tricky", [("fern", "A fern <b>unrolling</b>, curled like a snail"), ("flower", "Wildflowers in <b>three colors</b>"),
            ("nest", "A bird <b>carrying</b> grass or twigs"), ("tree", "A tree with <b>flowers</b> on it"),
            ("bee", "A bee <b>visiting</b> a flower"), ("paw", "A <b>footprint</b> in the mud"),
            ("sprout", "Tiny <b>new leaves</b> on a branch"), ("water", "A stream <b>full from rain</b>"),
            ("snail", "A <b>snail</b> or a slug"), ("frog", "<b>Frog songs</b> near water"),
            ("three", "<b>Leaves of three</b>. Point, don't touch!"), ("web", "A web with <b>water drops</b>")],
  "Read each clue with your grown-up. Tick it when you spot it."),
 ("Expert", [("Find a wildflower and count its petals. Leave it growing.", L()),
            ("Listen near water. Do the frogs peep, croak or trill?", BX("Peep", "Croak", "Trill", "None")),
            ("Find a leaf bud. Draw it on the back. Come back in two weeks and draw it again.", BX("Today", "Two weeks")),
            ("Spot a bird building a nest. What is it carrying?", L("w")),
            ("Find poison ivy from a safe distance and point it out to your grown-up.", BX("Spotted it", "None here")),
            ("Find five different shades of green. Color one dot for each.", DOTS(5)),
            ("Find a pollinator on a flower. Which one?", BX("Bee", "Butterfly", "Beetle", "Fly")),
            ("Find a track near a puddle or in mud. Who made it?", L("w")),
            ("Find something that was not here in winter.", L("w")),
            ("After rain, smell the air. Describe the smell in three words.", L("w"))],
  "Muddy trail? Walk through the middle of the mud, not around it, so the trail does not get wider."),
]
SUMMER = [
 ("Easy", [("butterfly", "Butterfly", ""), ("dragonfly", "Dragonfly", ""), ("flower", "Wildflower", ""),
           ("ant", "Ant", ""), ("cloud", "Fluffy cloud", ""), ("tree", "Shady tree", ""),
           ("water", "Stream", ""), ("bird", "A bird", ""), ("clover", "Clover", "")],
  "Find each thing and tick its box. Take a water break in the shade."),
 ("Tricky", [("dragonfly", "A dragonfly <b>resting</b>"), ("ant", "A line of ants <b>marching</b>"),
            ("cloud", "A cloud shaped like an <b>animal</b>"), ("tree", "<b>Cool shade</b> under a big tree"),
            ("butterfly", "A butterfly with <b>spots</b>"), ("berries", "Berries on a bush. <b>Never eat!</b>"),
            ("bug", "A <b>beetle</b> on a leaf"), ("rock", "A rock with <b>stripes</b> or lines"),
            ("feather", "A <b>feather</b> on the ground"), ("frog", "A <b>frog</b> or a <b>lizard</b>"),
            ("bridge", "A <b>bridge</b> or stepping stones"), ("firefly", "A <b>firefly</b> on an evening walk")],
  "Read each clue with your grown-up. Tick it when you spot it."),
 ("Expert", [("Find four different kinds of insects. Color a dot for each.", DOTS(4)),
            ("Find the coolest spot on the trail. Why is it cool there?", L("w")),
            ("Watch an ant trail. How many ants pass one spot while you count to 30?", L()),
            ("Lie back (on a dry spot on the trail) and watch the clouds. Draw one on the back.", BX("Done")),
            ("Find a flower that is not yellow or white. What color is it?", L("w")),
            ("Find tracks in dust, sand or dry mud. Who made them?", L("w")),
            ("Count butterflies and dragonflies for five minutes.", L() + " butterflies &nbsp;" + L() + " dragonflies"),
            ("Find a clue that an animal ate here: a chewed leaf, nut shells or a hole in a leaf.", L("w")),
            ("Name three sounds you hear that are not made by people.", L("w")),
            ("How did you stay cool today?", BX("Water", "Hat", "Shade", "Sunscreen"))],
  "Hot day? Sip water often, wear a hat and sunscreen, and rest in the shade."),
]
TIPS = {
 "Fall": ["<b>Spot it, leave it.</b> Take a photo instead of a leaf, so the next family can find it too.",
          "<b>Wear bright colors</b> in fall. Hunters may be out in some places, and bright clothes are easy to see.",
          "<b>Back home:</b> check everyone for ticks, behind ears and knees too."],
 "Winter": ["<b>Stay warm:</b> hat, mittens and dry socks. Tell your grown-up if your fingers or toes hurt from the cold.",
            "<b>Days are short</b> in winter. Start early and turn around with plenty of daylight left.",
            "<b>Snow tip:</b> walking where others walked is easier, and it keeps you on the trail."],
 "Spring": ["<b>Flowers stay in the ground.</b> Look close, smell gently, and leave them for bees and butterflies.",
            "<b>Baby animal season.</b> If you see a baby animal alone, leave it. Its parent is usually nearby.",
            ""],
 "Summer": ["<b>Look, don't eat.</b> Some berries look tasty but can make you very sick.",
            "<b>Sun safety:</b> hat on, sunscreen on, water bottle full before you leave.",
            ""],
}
for season, data in (("Fall", FALL), ("Winter", WINTER), ("Spring", SPRING), ("Summer", SUMMER)):
    for k, (lvl, items, intro) in enumerate(data, 1):
        tip = TIPS[season][k - 1]
        if k == 3: tip = "<b>Expert tip:</b> " + intro; intro = f"Big explorers only. Answer each {season.lower()} challenge on the trail, then count how many you finished."
        hunt(season, lvl, k, items, intro, tip, n); n += 1

# ---------- 17 bingo
bingo = [("pine", "Evergreen"), ("bird", "A bird"), ("rock", "Big rock"), ("water", "Water"), ("sign", "Trail sign"),
         ("leaf", "Green leaf"), ("bug", "A bug"), ("bridge", "Bridge"), ("stick", "Y-shaped stick"), ("cloud", "Cloud"),
         ("log", "Fallen log"), ("moss", "Moss"), None, ("paw", "Tracks"), ("flower", "Flower or bud"),
         ("pinecone", "Cone or seed"), ("web", "Spider web"), ("group", "Other hikers"), ("sun", "Sunny spot"), ("feather", "Feather"),
         ("tree", "Huge tree"), ("cairn", "Pile of rocks"), ("squirrel", "Furry animal"), ("puddle", "Puddle or mud"), ("baretree", "Dead tree")]
cells = "".join('<div class="free">FREE<br>You are hiking!</div>' if c is None else f'<div>{ic(c[0], 46)}<span>{c[1]}</span></div>' for c in bingo)
page(f'''<div class="kicker">Any season, any trail</div><h2>Trail bingo</h2>
<p class="intro">Cross off each square when you spot it. Five in a row in any direction is BINGO. Fill the whole card for a super bingo.</p>
<div class="bhead"><span>T</span><span>R</span><span>A</span><span>I</span><span>L</span></div>
<div class="bingo">{cells}</div>
<div class="foot"><div class="tip"><b>Play together:</b> print one card per kid. First to shout BINGO picks the snack break spot.</div><div class="count">Bingos: {L()}</div></div>''', n); n += 1

# ---------- 18 five senses
def slots(k): return '<div class="slots">' + '<div></div>' * k + '</div>'
senses = [("eye", "5 things I can see", "Look up, look down, look far away.", 6),
          ("ear", "4 things I can hear", "Close your eyes and count to ten first.", 4),
          ("hand", "3 things I can touch", "Bark, a smooth rock, cool water. Only safe things your grown-up says are OK.", 4),
          ("nose", "2 things I can smell", "Pine needles, wet soil, flowers, rain.", 2),
          ("apple", "1 thing I can taste", "Your trail snack! Never taste plants or berries from the trail.", 2)]
sb = "".join(f'<div class="sense">{ic(i, 64)}<div><h3>{h}</h3><p class="small" style="margin:0 0 3pt">{p}</p>{slots(k)}</div></div>' for i, h, p, k in senses)
page(f'''<div class="kicker">Slow down and notice</div><h2>Five senses walk</h2>
<p class="intro">Find a safe spot beside the trail. Stop, breathe, and use one sense at a time. Write or draw what you notice.</p>{sb}
<div class="foot"><div class="tip"><b>Great for tired legs.</b> A senses stop is a rest that feels like a game.</div><div class="count">Date: {L()}</div></div>''', n); n += 1

# ---------- 19 sign spotter
spot = [("blaze", "Trail blaze", "A painted mark on a tree or rock. It means you are on the trail. Each trail has its own color or shape."),
        ("blaze", "Turn ahead", "Two blazes, one above the other, mean the trail turns soon. On many trails the top one leans the way to go."),
        ("sign", "Junction sign", "Where trails meet. It shows trail names, arrows and how far to go. Stop here and wait for your group."),
        ("map", "Trailhead map", "The big board at the start. Find the dot that says You Are Here before you set off."),
        ("cairn", "Rock pile (cairn)", "Some trails over rock use piles of stones as markers. Never add rocks or knock them down."),
        ("sign", "Mile or km marker", "A small post with a number. Some trails count miles, some count kilometers.")]
sc = "".join(f'<div class="card"><div class="top">{ic(i, 36)}<h3>{h}</h3></div><p>{p}</p><div class="tally">Tally</div></div>' for i, h, p in spot)
page(f'''<div class="kicker">Read the trail</div><h2>Trail sign and blaze spotter</h2>
<p class="intro">Trails talk to hikers with signs and marks. Learn what they mean, then keep a tally of every one you spot.</p>
<div class="sp">{sc}</div>
<h3>Draw the blaze on your trail today</h3>
<div class="cols" style="gap:12pt"><div class="draw" style="height:1.9in"><span>My trail's blaze</span></div><div class="draw" style="height:1.9in"><span>Its color and shape</span></div></div>
<div class="foot"><div class="tip"><b>Good to know:</b> blaze colors and shapes are different from park to park. Check the map at the trailhead to learn yours.</div></div>''', n); n += 1

# ---------- 20-21 journal
FACES = '<div class="wx">' + ''.join(f'<label>{face(k, 40)}{t}</label>' for k, t in
        (("great", "Amazing"), ("good", "Happy"), ("ok", "Okay"), ("tired", "Tired"), ("wow", "Wow!"))) + '</div>'
WEA = '<div class="wx">' + ''.join(f'<label>{ic(k, 36, 2.2)}{t}</label>' for k, t in
      (("sun", "Sunny"), ("cloud", "Cloudy"), ("raincloud", "Rainy"), ("snowflake", "Snowy"), ("breath", "Cold"))) + '</div>'
def journal(no):
    page(f'''<div class="hh"><div><div class="kicker" style="margin:0 0 6pt">Junior hiker journal</div><h2>My hike</h2></div><div class="lvl">Hike number <span class="ln" style="min-width:0.6in"></span></div></div>
<div class="jrow"><div class="fl">Date</div><div class="fl">Trail name</div>
<div class="fl">How far<span class="u"><b></b> mi / <b></b> km</span></div><div class="fl">Who came with me</div></div>
<div class="jrow" style="margin-top:10pt"><div><div class="lab">The weather was (circle one)</div>{WEA}</div><div><div class="lab">I felt (circle one)</div>{FACES}</div></div>
<div class="draw" style="height:4.15in;margin-top:12pt"><span>Draw the best thing I saw</span></div>
<div class="lab">Animals and plants I saw</div><div class="wl"></div><div class="wl"></div>
<div class="jrow"><div><div class="lab">The best part</div><div class="wl"></div></div><div><div class="lab">The hardest part</div><div class="wl"></div></div></div>
<div class="lab">Next time I want to</div><div class="wl"></div>''', no)
journal(n); n += 1
journal(n); n += 1

# ---------- 22 map page
leg = [("sign", "Start and finish"), ("bridge", "Bridge"), ("water", "Water"), ("tree", "Big tree"),
       ("rock", "Big rock"), ("bird", "Animal I saw"), ("apple", "Snack stop"), ("cairn", "Top or lookout")]
lg = "".join(f'<div>{ic(i, 26, 2.4)}{t}</div>' for i, t in leg)
page(f'''<div class="kicker">Junior hiker journal</div><h2>Draw a map of my hike</h2>
<p class="intro">Draw the path you walked from start to finish. Add the things you passed, using the little pictures in the key.</p>
<div class="jrow"><div class="fl">Trail name</div><div class="fl">Date</div></div>
<div class="draw mapbox" style="margin-top:12pt"><span>My map</span>
<div style="position:absolute;right:12pt;top:10pt;text-align:center;font:700 9pt/1 var(--sans);color:var(--forest)">N<br><svg width="26" height="34" viewBox="0 0 26 34"><path d="M13 2 L22 30 L13 24 L4 30 Z" fill="#B85C38"/></svg></div></div>
<div class="lab">Map key</div><div class="legend">{lg}</div>
<div class="jrow" style="margin-top:6pt"><div class="fl">Steps or distance<span class="u"><b></b> mi / <b></b> km</span></div><div class="fl">Time on the trail</div></div>''', n); n += 1

# ---------- 23 hike counter
ms = {5, 10, 25, 50}
cnt = "".join(f'<div class="{"ms" if i in ms else ""}">{i}</div>' for i in range(1, 51))
page(f'''<div class="kicker">Keep count</div><h2>My hike counter</h2>
<p class="intro">After every hike, put a sticker on the next circle or color it in. Circled numbers are milestones, so plan a little celebration with your grown-up.</p>
<div class="counts">{cnt}</div>
<div class="badges">
<div><b>5 hikes</b>Trail Starter. You pick the snack for the next hike.</div>
<div><b>10 hikes</b>Trail Spotter. You choose the next trail from the map.</div>
<div><b>25 hikes</b>Trail Leader. You lead the group for part of a hike.</div>
<div><b>50 hikes</b>Trail Explorer. Time for your certificate on the next page!</div></div>
<h3>My favorite trails so far</h3>
<div class="jrow"><div><div class="wl"></div><div class="wl"></div><div class="wl"></div><div class="wl"></div></div><div><div class="wl"></div><div class="wl"></div><div class="wl"></div><div class="wl"></div></div></div>
<div class="jrow" style="margin-top:8pt"><div class="fl">Longest hike<span class="u"><b></b> mi / <b></b> km</span></div><div class="fl">Total distance<span class="u"><b></b> mi / <b></b> km</span></div></div>
<p class="small" style="margin-top:10pt">Handy to know: 1 mile is about 1.6 kilometers. 1 kilometer is about 0.6 miles.</p>''', n); n += 1

# ---------- 24 certificate
page(f'''<div class="frame">
<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage)">HikeSupply Co.</div>
<svg width="190" height="190" viewBox="0 0 150 150" style="margin-top:30pt" fill="none" stroke-linejoin="round" stroke-linecap="round">
<circle cx="75" cy="75" r="68" fill="#2C3B2E"/><circle cx="75" cy="75" r="58" stroke="#F5F1EA" stroke-width="2" stroke-dasharray="3 6"/>
<path d="M28 100 L62 56 L78 76 L94 52 L124 100 Z" fill="#8A9A7E"/><path d="M86 64 L94 52 L103 66 L96 62 L94 67 L91 62 Z" fill="#F5F1EA"/>
<circle cx="104" cy="44" r="9" fill="#B85C38"/><path d="M42 112 H108" stroke="#C9A04A" stroke-width="4" stroke-dasharray="2 8"/></svg>
<div class="kicker" style="margin-top:28pt">Official award</div>
<h1>Junior Trail Explorer</h1>
<p class="lead" style="margin-top:22pt;font-size:14pt">This certificate is proudly given to</p>
<div class="line"></div>
<p style="font-size:12.5pt;line-height:1.8;max-width:5.2in;margin-top:10pt">for exploring the trail with sharp eyes and a brave heart, finishing <span class="ln" style="min-width:0.55in"></span> hikes and <span class="ln" style="min-width:0.55in"></span> scavenger hunts, and keeping all seven trail promises.</p>
<div class="bx" style="margin-top:14pt;font-size:11pt;justify-content:center"><span>Trail rules expert</span><span>Bingo winner</span><span>Hug-a-tree ready</span></div>
<div class="sig"><div>Date</div><div>Signed by my trail buddy</div></div></div>''', 0, "cert")

html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css">{CSS}</head><body>{"".join(pages)}</body></html>'
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html"), "w").write(html)
print(len(pages), "pages")
