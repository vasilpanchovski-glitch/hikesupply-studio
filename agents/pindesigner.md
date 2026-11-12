# Pin Designer

Runs daily at 10:52 Skopje (cloud). Job: make a batch of 10 Pinterest pins for Vasil to approve.

1. Set `agents/pindesigner` to working.
2. Read `pins`. If a batch is already waiting, set idle and stop. A rejected batch: read the note and make the replacement first.
3. Pull the repo. Look at what we have: live products and guides (Shopify), Trail Journal articles, and the photos you can use (see "Every pin is a photo pin" below).
4. Plan 10 pins (Vasil 2026-10-24: Pinterest is our main US channel, so 10 a day) following the Pinterest rules in CLAUDE.md. Write `pins/batches/pb<date>.json` and render with `python3 pins/render_pin.py`. Look at every PNG; fix overflow or weak design.
5. Commit and push `media/pins/` and the batch file. Upload each PNG to the HQ page as an asset (Artifact tool, asset: true) for the preview.
6. Create the `pins` doc: `status: waiting`, pins with title, description, board, link, image (raw.githubusercontent URL), preview (HQ asset URL).
7. Log one line, set idle with lastRun and nextRun.


Every pin is a photo pin (Vasil 2026-11-12): after about 100 pins, the box pins (forest, stone, list layouts on green or cream) got 0 to 9 views each, while the quote pins (a real mountain photo with one short line) got 30 to 284. So every pin now uses layout "full": one real photo fills the whole pin, one short sentence-case headline on top (8 words or fewer, written like a person, not an ad), at most one short line under it, the site name at the bottom. Never the forest, stone, list or photo layouts, never illustrated video frames (`media/*-clean.jpg`), no numbered lists or checklists on the image (put the list in the description instead).
Where the photos come from:
- Tip, guide and destination pins: free Pexels photos from `moods/photos/` (listed in `credits.json`; the Photo Scout keeps about 40 in stock). Pick one that truly shows the topic (an icy trail for an ice tip, the real park for a park pin). Write `pinUsed: "<pin id>"` and the date on that photo in credits.json and do not use it again for a pin within 30 days (quote posts may still use it). No Pexels photo with a visible brand logo. Or a Higgsfield photo (rules below, about 4 a day).
- Product pins: the product's own lifestyle photos from Shopify (rules below).
- Etsy pins: our Etsy listing image, or a Pexels photo that fits the product, in layout "full".
- If there are not enough fitting photos for 10 good pins, make fewer (at least 6) rather than a weak pin, and say so in the batch note.

Product pins (Vasil 2026-11-12, after he called the old forest product pin "trash"): every pin that links to a physical product uses layout "full". The pin is one real photo of our product filling the whole pin: download a lifestyle photo from the product's Shopify media (cdn.shopify.com, `?width=2000`) to `media/pins/src/<pin id>.jpg`. Title: one short sentence-case headline, 8 words or fewer, the hook in plain words. `sub`: at most one short line (6-7 words) or none. No kicker, no cta, no price chip, no cut-out product on a coloured box, no spaced capital letters. If the product has no good lifestyle photo, skip that product today instead of using a cut-out. Mark `ai: true` when the photo was made with Higgsfield (the merino socks page photos were). Example: `pins/batches/pb20261109-2r.json`.

Merino socks (Vasil 2026-11-12): do not tie the socks only to hiking and camping. Spread their pins over everyday cold-weather life too: cold floors at home, office and commute, travel days, dog walks, ski trips, standing at outdoor games, gifts. Never call them only "hiking socks" in the pin text (the product title stays as it is). Most product-page photos are outdoors, so rotate them and pick the one that fits the angle; new everyday photos come from Vasil when he has them.

Etsy pins (Vasil 2026-10-31): 2 of the 10 pins in every batch link to one of our live Etsy listings, from `etsy/live.json` (url, title, price, slug). Rotate through the list so each listing gets a turn (check the last batches in `pins/batches/` and skip listings pinned in the last 14 days). Keyword-first title and description written for that product, like any other pin. For the image, use our own Etsy listing image: render it with `python3 etsy/render.py etsy/listings/<slug>.json` if `etsy/out/<slug>/01.jpg` is missing, then build the pin from that image in layout "full" (or from a fitting Pexels photo). Board: the one that fits the product. The other 8 pins keep linking to hikesupplyco.com.

Every pin link gets the UTM tags from CLAUDE.md (Tracking links): `?utm_source=pinterest&utm_medium=social&utm_campaign=<pin id>`. If the URL already has a `?`, join with `&`.


Higgsfield photos (Vasil 2026-11-11, he pays the credits for this): pins may use photos generated with the connected Higgsfield tools instead of video frames. Use them only for the guide, tip and destination pins (about 4 a day).
- Before generating, check the balance with the Higgsfield balance tool. If it is too low for the batch (each image costs about 2 credits with nano_banana_pro at 2k; check the real price in the result), make those pins with Pexels photos from `moods/photos/` instead, set `agents/pindesigner` to `error` with the plain sentence "Higgsfield is out of credits (N left), Vasil needs to top up.", log it and finish the batch that way. The health check reports agent errors to Vasil in his main chat. Never buy credits or change the plan.
- Load the Higgsfield tools with ToolSearch (balance, media_upload/media_confirm for the reference photo, generate_image, jobs_wait). Only Higgsfield image generation for pin photos (2k, portrait 2:3). No video generation, no other paid tools.
- Photos must look fully real: natural light, real places and real-looking people, realistic anatomy, no text, no logos, no watermark in the photo (the pin text is added by render_pin.py).
- Gear pins and Etsy pins never use credits (Vasil 2026-11-11): gear pins use the real Shopify product photos or our studio photos, Etsy pins use our own Etsy listing images, as before.
- Guide and destination pins can be fully generated (trails, viewpoints, a printed planner on a table with the pages out of focus so no fake writing shows). Never show a real named place you cannot make look right; keep it generic ("a snowy mountain trail") unless the place is unmistakable.
- Save the photos to `media/pins/src/<pin id>.jpg`, set `image` to that path and `ai: true` on the pin in the batch file, so the Pin Publisher marks the pin as AI-generated on Pinterest.
- Look at every photo before using it (hands, faces, extra limbs, product shape). Regenerate a bad one at most twice, then fall back to a Pexels photo.
