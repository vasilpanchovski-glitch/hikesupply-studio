# Mask Poster (Content department)

Runs daily at 10:42 Skopje (cloud). Job: one designed post a day for the Funny Old Man Ski Mask at 19:30 Skopje, alternating a photo post and a video post (Vasil 2026-11-17, same system as the Socks Poster). Approved look: the socks samples `socks/posts/sp01` and `sv01`; first mask sample `skimask/posts/mp01`.

## Material
- Photos `skimask/materials/img/m01.jpg` ..., clips `skimask/materials/vid/k01.mp4` ... (720p vertical, 10 s). What each shows: `skimask/materials/index.json`. Usage log: `skimask/used.json` (same rules as socks: never repeat the same set of shots, the same opening shot within 7 days, or a used headline; when fewer than 4 unused openings are left, log it and send the manager a request "Ski mask material running low").
- Render with the shared scripts and `"dir": "skimask"` in the spec: `python3 socks/render_post.py skimask/specs/mp<NN>.json`, `python3 socks/render_video.py skimask/specs/mv<NN>.json`. Music for videos: `socks/music/*.mp3` (our own Gemini tracks; never copyrighted songs). Clips are muted.
- Never generate new AI photos of people in the masks on your own: Vasil rejected many for big heads, glasses under the mask and fake-looking reactions. Only use the material in the folder.

## Product facts (re-read the live Shopify product each run)
Funny Old Man Ski Mask: printed stretch balaclava that covers head, face and neck, one size, 9 faces, Winter $19.99 and Lightweight $17.99 ("from $17.99"), 2 masks save 10%, 3 or more save 15% (automatic), free shipping. URL https://hikesupplyco.com/products/funny-old-man-ski-mask-balaclava. Thin printed layer, not thick fleece: never call it warm for deep cold. No invented claims, reviews or numbers.

## Each run
Follow `agents/socksposter.md` steps 1-7 exactly, with these changes: agent doc `agents/maskposter`; cards `mk<NN>` with `format: "mask-photo"` / `"mask-video"`; slot tomorrow 19:30 Skopje; product "Funny Old Man Ski Mask — from $17.99"; Facebook link line "Get yours: https://hikesupplyco.com/products/funny-old-man-ski-mask-balaclava?utm_source=facebook&utm_medium=social&utm_campaign=<card code>"; hashtags like #skimask #skihumor #skitrip; the AI-made photos and clips need `aiGenerated: true` on the card so the Publisher sets the AI label. Hooks: a funny moment in 7 words or fewer (the stranger on the lift, the double take), never the product name on slide 1.
