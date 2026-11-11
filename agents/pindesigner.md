# Pin Designer

Runs daily at 10:52 Skopje (cloud). Job: make a batch of 10 Pinterest pins for Vasil to approve.

1. Set `agents/pindesigner` to working.
2. Read `pins`. If a batch is already waiting, set idle and stop. A rejected batch: read the note and make the replacement first.
3. Pull the repo. Look at what we have: live products and guides (Shopify), recent videos (`media/*-clean.jpg`), Trail Journal articles.
4. Plan 10 pins (Vasil 2026-10-24: Pinterest is our main US channel, so 10 a day) following the Pinterest rules in CLAUDE.md. Write `pins/batches/pb<date>.json` and render with `python3 pins/render_pin.py`. Look at every PNG; fix overflow or weak design.
5. Commit and push `media/pins/` and the batch file. Upload each PNG to the HQ page as an asset (Artifact tool, asset: true) for the preview.
6. Create the `pins` doc: `status: waiting`, pins with title, description, board, link, image (raw.githubusercontent URL), preview (HQ asset URL).
7. Log one line, set idle with lastRun and nextRun.


Etsy pins (Vasil 2026-10-31): 2 of the 10 pins in every batch link to one of our live Etsy listings, from `etsy/live.json` (url, title, price, slug). Rotate through the list so each listing gets a turn (check the last batches in `pins/batches/` and skip listings pinned in the last 14 days). Keyword-first title and description written for that product, like any other pin. For the image, use our own Etsy listing image: render it with `python3 etsy/render.py etsy/listings/<slug>.json` if `etsy/out/<slug>/01.jpg` is missing, then build the pin from that image or from the product's `media/*-clean.jpg` frames. Board: the one that fits the product. The other 8 pins keep linking to hikesupplyco.com.

Every pin link gets the UTM tags from CLAUDE.md (Tracking links): `?utm_source=pinterest&utm_medium=social&utm_campaign=<pin id>`. If the URL already has a `?`, join with `&`.


Higgsfield photos (Vasil 2026-11-11, he pays the credits for this): pins may use photos generated with the connected Higgsfield tools instead of video frames. Use them only for the guide, tip and destination pins (about 4 a day).
- Before generating, check the balance with the Higgsfield balance tool. If it is too low for the batch (each image costs about 2 credits with nano_banana_pro at 2k; check the real price in the result), make the pins with `media/*-clean.jpg` frames as before, set `agents/pindesigner` to `error` with the plain sentence "Higgsfield is out of credits (N left), Vasil needs to top up.", log it and finish the batch that way. The health check reports agent errors to Vasil in his main chat. Never buy credits or change the plan.
- Load the Higgsfield tools with ToolSearch (balance, media_upload/media_confirm for the reference photo, generate_image, jobs_wait). Only Higgsfield image generation for pin photos (2k, portrait 2:3). No video generation, no other paid tools.
- Photos must look fully real: natural light, real places and real-looking people, realistic anatomy, no text, no logos, no watermark in the photo (the pin text is added by render_pin.py).
- Gear pins and Etsy pins never use credits (Vasil 2026-11-11): gear pins use the real Shopify product photos or our studio photos, Etsy pins use our own Etsy listing images, as before.
- Guide and destination pins can be fully generated (trails, viewpoints, a printed planner on a table with the pages out of focus so no fake writing shows). Never show a real named place you cannot make look right; keep it generic ("a snowy mountain trail") unless the place is unmistakable.
- Save the photos to `media/pins/src/<pin id>.jpg`, set `image` to that path and `ai: true` on the pin in the batch file, so the Pin Publisher marks the pin as AI-generated on Pinterest.
- Look at every photo before using it (hands, faces, extra limbs, product shape). Regenerate a bad one at most twice, then fall back to a video frame.
