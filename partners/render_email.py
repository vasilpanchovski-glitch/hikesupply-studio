#!/usr/bin/env python3
"""Turn a partners doc into a branded email for Gmail send_message.

Usage: python3 partners/render_email.py <doc.json> [out_dir]
<doc.json> is the partners doc data ({subject, body, guide, offer, discount, ...}).
Writes <out_dir>/email.html (htmlBody), email.txt (plain-text body) and
email.json ({subject, htmlBody, body, attachments:[logo inline]}) ready to pass
to mcp__Gmail__send_message (to = doc.contact). The logo is the only image and
goes as inline attachment 0, referenced as cid:att0 in the HTML.
"""
import base64, html, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
FOREST = "#1F3A2E"
CLAY = "#B15A34"
INK = "#24211C"
MUTED = "#6B6559"
LINE = "#E4DDCF"



def paragraphs(text):
    """Plain email body -> <p> blocks. Drops the sign-off lines (the signature replaces them)."""
    lines = text.strip().splitlines()
    while lines and re.match(r"^\s*(vasil|hikesupply|hikesupplyco\.com|—|-|best|thanks|thank you|cheers|warm(ly)?)\b", lines[-1].strip().lower().rstrip(",")):
        lines.pop()
    blocks = re.split(r"\n\s*\n", "\n".join(lines).strip())
    out = []
    for b in blocks:
        b = html.escape(b.strip()).replace("\n", "<br>")
        b = re.sub(r"(https?://[^\s<]+)", rf'<a href="\1" style="color:{FOREST};text-decoration:underline">\1</a>', b)
        out.append(f'<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:{INK}">{b}</p>')
    return "\n".join(out)


def offer_box(doc):
    guide = doc.get("guide")
    code = doc.get("discount")
    if not guide and not code:
        return ""
    rows = []
    if guide:
        rows.append(f'<div style="font-size:16px;font-weight:600;color:{FOREST};margin:0 0 4px">{html.escape(guide)}</div>')
        rows.append(f'<div style="font-size:13px;color:{MUTED};margin:0 0 {10 if code else 0}px">Free for your members. Printable PDF.</div>')
    if code:
        rows.append(f'<div style="font-size:13px;color:{MUTED}">Member code: <span style="font-family:Menlo,Consolas,monospace;font-size:14px;color:{INK};background:#F4EFE6;padding:2px 8px;border-radius:3px">{html.escape(code)}</span> · 10% off at hikesupplyco.com</div>')
    return f'''<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 22px">
  <tr><td bgcolor="#FAF7F1" style="border-left:3px solid {CLAY};background:#FAF7F1;padding:14px 16px">{"".join(rows)}</td></tr>
</table>'''


def signature(code="outreach"):
    return f'''<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:8px;border-top:1px solid {LINE};padding-top:16px;width:100%">
  <tr>
    <td style="padding-top:16px;width:70px;vertical-align:middle"><img src="cid:att0" width="56" height="27" alt="HikeSupply Co." style="display:block;border:0"></td>
    <td style="padding-top:16px;padding-left:14px;vertical-align:middle;border-left:2px solid {CLAY}">
      <div style="font-size:15px;font-weight:600;color:{INK};line-height:1.3">HikeSupply Co.</div>
      <div style="font-size:13px;color:{MUTED};line-height:1.5">Hiking gear and printable trail guides</div>
      <div style="font-size:13px;line-height:1.6"><a href="https://hikesupplyco.com/?utm_source=partners&amp;utm_medium=email&amp;utm_campaign={code}" style="color:{FOREST};text-decoration:none;font-weight:600">hikesupplyco.com</a>
        <span style="color:{LINE}">&nbsp;|&nbsp;</span><a href="mailto:hikesupplyco@gmail.com" style="color:{MUTED};text-decoration:none">hikesupplyco@gmail.com</a></div>
      <div style="font-size:12px;line-height:1.6;color:{MUTED}">
        <a href="https://www.instagram.com/hikesupplyco" style="color:{MUTED};text-decoration:none">Instagram</a> &nbsp;·&nbsp;
        <a href="https://www.tiktok.com/@hikesupplyco" style="color:{MUTED};text-decoration:none">TikTok</a> &nbsp;·&nbsp;
        <a href="https://www.facebook.com/hikesupplyco" style="color:{MUTED};text-decoration:none">Facebook</a> &nbsp;·&nbsp;
        <a href="https://www.pinterest.com/hikesupplyco" style="color:{MUTED};text-decoration:none">Pinterest</a>
      </div>
    </td>
  </tr>
</table>'''


def render(doc):
    body_html = paragraphs(doc.get("body", ""))
    html_out = f'''<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#ffffff">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:8px 0">
<table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif">
<tr><td style="padding:0 4px">
{body_html}
{offer_box(doc)}
<p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:{INK}">All the best,</p>
{signature(doc.get("code") or "outreach")}
<p style="margin:22px 0 0;font-size:11px;line-height:1.5;color:#9A9386">You are getting this one-off note because this address is listed as your group's contact. Reply "no thanks" and we will not write again.</p>
</td></tr></table>
</td></tr></table>
</body></html>'''
    sig_txt = "All the best,\nHikeSupply Co.\nhikesupplyco.com | hikesupplyco@gmail.com"
    txt = re.sub(r"<[^>]+>", "", body_html.replace("<br>", "\n").replace("</p>", "\n\n"))
    txt = html.unescape(txt).strip()
    if doc.get("guide"):
        txt += f"\n\n{doc['guide']}: free for your members."
    if doc.get("discount"):
        txt += f"\nMember code: {doc['discount']} (10% off at hikesupplyco.com)"
    txt += "\n\n" + sig_txt + "\n\nReply \"no thanks\" and we will not write again."
    logo = base64.b64encode(open(os.path.join(HERE, "logo-mark-small.png"), "rb").read()).decode()
    return html_out, txt, {"subject": doc.get("subject", ""), "htmlBody": html_out, "body": txt,
                           "attachments": [{"content": logo, "filename": "hikesupply.png", "mimeType": "image/png", "inline": True}]}


if __name__ == "__main__":
    doc = json.load(open(sys.argv[1]))
    doc = doc.get("data", doc)
    out = sys.argv[2] if len(sys.argv) > 2 else "."
    os.makedirs(out, exist_ok=True)
    h, t, j = render(doc)
    open(os.path.join(out, "email.html"), "w").write(h)
    open(os.path.join(out, "email.txt"), "w").write(t)
    json.dump(j, open(os.path.join(out, "email.json"), "w"))
    print("ok", os.path.join(out, "email.json"))
