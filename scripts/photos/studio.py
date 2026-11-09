# HikeSupply "Gemini look" product photos: warm peach radial backdrop, centred product,
# soft floor reflection and contact shadow. 2048x2048 JPG.
# usage: python3 studio.py cut  <in> <out>   (cutout product, recomposed)
#        python3 studio.py flat <in> <out>   (keep layout and text, recolour near-white background only)
import sys, os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

S = 2048
CENTER = np.array([255, 253, 248], float)
EDGE = np.array([238, 215, 188], float)


def backdrop():
    y, x = np.mgrid[0:S, 0:S].astype(float)
    d = np.sqrt((x - S / 2) ** 2 + ((y - S * 0.46) * 1.05) ** 2) / (S * 0.72)
    t = np.clip(d, 0, 1) ** 1.6
    img = CENTER[None, None] * (1 - t[..., None]) + EDGE[None, None] * t[..., None]
    img += np.random.default_rng(1).normal(0, 0.8, img.shape)  # dither, no banding
    return img


def cutout(path):
    from rembg import remove, new_session
    src = Image.open(path).convert("RGB")
    rgba = remove(src, session=new_session("u2net"), alpha_matting=True,
                  alpha_matting_foreground_threshold=250, alpha_matting_background_threshold=15,
                  alpha_matting_erode_size=12)
    a = np.asarray(rgba)[..., 3].astype(float) / 255
    a = np.clip((a - 0.22) / 0.78, 0, 1)
    rgb = np.asarray(src).astype(float)
    solid = a > 0.5
    lab, n = ndimage.label(solid)
    if n > 1:  # drop stray graphics / badges: keep blobs >= 35% of the largest
        sizes = ndimage.sum(solid, lab, range(1, n + 1))
        keep = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s >= float(os.environ.get('MINFRAC', '0.35')) * sizes.max()])
        a = a * ndimage.binary_dilation(keep, iterations=3)
    filled = ndimage.binary_fill_holes(a > 0.5)
    nearwhite = (rgb.min(-1) > 235)
    a = np.where(filled & ~nearwhite, np.maximum(a, 1.0), a)
    ys, xs = np.where(a > 0.05)
    box = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
    return rgb[box[1]:box[3], box[0]:box[2]], a[box[1]:box[3], box[0]:box[2]]


def resize(rgb, a, w, h):
    pm = np.dstack([rgb * a[..., None], a * 255]).astype(np.uint8)
    im = Image.fromarray(pm, "RGBA").resize((w, h), Image.LANCZOS)
    arr = np.asarray(im).astype(float)
    al = arr[..., 3] / 255
    col = np.where(al[..., None] > 0.01, arr[..., :3] / np.maximum(al[..., None], 0.01), 0)
    col = np.asarray(Image.fromarray(np.clip(col, 0, 255).astype(np.uint8)).filter(
        ImageFilter.UnsharpMask(radius=2, percent=110, threshold=2))).astype(float)
    return col, al


_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
FONT_H = os.path.join(_ROOT, "video/public/BarlowCondensed-ExtraBold.ttf")
FONT_B = os.path.join(_ROOT, "video/public/Inter.ttf")
INK = (58, 58, 56)


def caption(img, title, sub):
    from PIL import ImageDraw, ImageFont
    d = ImageDraw.Draw(img)
    ft = ImageFont.truetype(FONT_H, 128)
    t = title.upper()
    w = d.textlength(t, font=ft)
    d.text(((S - w) / 2, 120), t, font=ft, fill=INK)
    if sub:
        fb = ImageFont.truetype(FONT_B, 66)
        try:
            fb.set_variation_by_axes([500])
        except Exception:
            pass
        y = 282
        for line in sub.split("|"):
            w = d.textlength(line, font=fb)
            d.text(((S - w) / 2, y), line, font=fb, fill=INK)
            y += 86
    return img


def compose(path, out):
    title = os.environ.get("TITLE")
    rgb, a = cutout(path)
    h0, w0 = a.shape
    anchor = os.environ.get("ANCHOR") == "bottom"
    k = min(S * (0.56 if title else 0.66) / h0, S * float(os.environ.get("WFRAC", "0.70")) / w0)
    if anchor:
        k = min(S * 0.64 / h0, S * 0.80 / w0)
    w, h = int(w0 * k), int(h0 * k)
    col, al = resize(rgb, a, w, h)
    bg = backdrop()
    x0 = (S - w) // 2
    base = S if anchor else int(S * (0.88 if title else 0.80))
    y0 = base - h
    # contact shadow
    sh = np.zeros((S, S))
    yy, xx = np.mgrid[0:S, 0:S]
    sh[((xx - S / 2) / (w * 0.42)) ** 2 + ((yy - base) / (S * 0.018)) ** 2 <= 1] = 1
    sh = ndimage.gaussian_filter(sh, 28) * (0 if anchor else 0.32)
    bg *= (1 - sh[..., None] * 0.55)
    # reflection: flipped, fading
    rh = 0 if anchor else int(h * 0.28)
    rc, ra = col[::-1][:rh], al[::-1][:rh]
    fade = np.linspace(0.12, 0, rh)[:, None]
    ra = ra * fade
    ys, ye = base + 4, min(base + 4 + rh, S)
    seg = bg[ys:ye, x0:x0 + w]
    n = ye - ys
    bg[ys:ye, x0:x0 + w] = seg * (1 - ra[:n, :, None]) + rc[:n] * ra[:n, :, None]
    seg = bg[y0:base, x0:x0 + w]
    bg[y0:base, x0:x0 + w] = seg * (1 - al[..., None]) + col * al[..., None]
    img = Image.fromarray(np.clip(bg, 0, 255).astype(np.uint8))
    if title:
        img = caption(img, title, os.environ.get("SUB", ""))
    img.save(out, quality=93)


def keep(path, out):
    src = Image.open(path).convert("RGB")
    k = S / max(src.size)
    src = src.resize((int(src.width * k), int(src.height * k)), Image.LANCZOS)
    src = src.filter(ImageFilter.UnsharpMask(radius=2, percent=80, threshold=2))
    c = Image.fromarray(np.clip(backdrop(), 0, 255).astype(np.uint8))
    c.paste(src, ((S - src.width) // 2, (S - src.height) // 2))
    c.save(out, quality=93)


def flat(path, out):
    src = Image.open(path).convert("RGB")
    k = S / max(src.size)
    src = src.resize((int(src.width * k), int(src.height * k)), Image.LANCZOS)
    rgb = np.asarray(src).astype(float)
    canvas = np.full((S, S, 3), 255.0)
    ox, oy = (S - src.width) // 2, (S - src.height) // 2
    canvas[oy:oy + src.height, ox:ox + src.width] = rgb
    bright = canvas.mean(-1)
    spread = canvas.max(-1) - canvas.min(-1)
    m = np.clip((bright - 225) / 25, 0, 1) * np.clip((30 - spread) / 20, 0, 1)
    m = ndimage.gaussian_filter(m, 1.2)
    bg = backdrop()
    res = canvas * (1 - m[..., None]) + bg * m[..., None]
    Image.fromarray(np.clip(res, 0, 255).astype(np.uint8)).save(out, quality=93)


if __name__ == "__main__":
    mode, i, o = sys.argv[1:4]
    {"cut": compose, "flat": flat, "keep": keep}[mode](i, o)
