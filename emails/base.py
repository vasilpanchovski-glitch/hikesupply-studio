import sys
def page(preheader, body):
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f2ee;font-family:Arial,Helvetica,sans-serif;color:#2b2f2a;">
<div style="display:none;max-height:0;overflow:hidden;">{preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2ee;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;">
<tr><td align="center" style="padding:28px 24px 16px;font-size:24px;color:#2b2f2a;">HikeSupply Co.</td></tr>
<tr><td style="padding:0 24px;"><div style="border-top:1px solid #2b2f2a;"></div></td></tr>
{body}
<tr><td align="center" style="padding:28px 24px;font-size:12px;line-height:1.6;color:#8a8a84;">HikeSupply Co. · Raya 7, 4001 Plovdiv, Bulgaria<br><a href="{{{{ unsubscribe_link }}}}" style="color:#8a8a84;">Unsubscribe</a></td></tr>
</table></td></tr></table>
{{{{ open_tracking_block }}}}
</body></html>"""
H='<tr><td style="padding:28px 28px 8px;font-size:30px;line-height:1.2;color:#2b2f2a;">{}</td></tr>'
P='<tr><td style="padding:8px 28px;font-size:16px;line-height:1.6;color:#4a4f48;">{}</td></tr>'
H3='<tr><td style="padding:18px 28px 0;font-size:18px;line-height:1.4;color:#2b2f2a;">{}</td></tr>'
BTN='<tr><td align="center" style="padding:20px 28px;"><a href="{}" style="background:#000000;color:#ffffff;text-decoration:none;padding:14px 28px;font-size:16px;display:inline-block;">{}</a></td></tr>'
def prod(img,name,price,url):
    return f'''<tr><td style="padding:12px 28px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td width="120" valign="top"><a href="{url}"><img src="{img}&width=240" width="120" alt="{name}" style="display:block;width:120px;border:0;"></a></td>
<td valign="middle" style="padding-left:16px;font-size:16px;line-height:1.5;color:#2b2f2a;"><a href="{url}" style="color:#2b2f2a;text-decoration:none;">{name}</a><br><span style="color:#4a4f48;">${price}</span><br><a href="{url}" style="color:#2b2f2a;font-size:14px;">View</a></td></tr></table></td></tr>'''
