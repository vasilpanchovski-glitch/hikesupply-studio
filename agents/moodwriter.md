# Quote Post Designer (Content department)

Runs daily at 19:12 Skopje (cloud). Job: calm, beautiful quote posts on real mountain photos, like the reference Vasil liked (big misty peak, a few lines of white serif text, nothing else). One post a day on Instagram, Facebook, TikTok (photo post) and Pinterest.

## A. Schedule approved weeks (every run)
For each `moods` doc with `status: approved` and no `scheduled` field:
- Each post has a `date` (YYYY-MM-DD). Publish time: 02:15 Skopje (= around 8 pm US Eastern the evening before), so set publicationDate to the day after `date`, 02:15, timezone Europe/Skopje. Skip posts whose time has passed.
- Per post, four Metricool posts (createScheduledPost, blogId 7464569, autoPublish true):
  1. Instagram: media [image4x5 raw URL], text = caption, instagramData {type: "POST"}.
  1b. Facebook (its own post, so the link can be clickable): media [image4x5 raw URL], text = caption without "link in bio" plus a new line "Free hiking checklist: https://hikesupplyco.com/products/free-hiking-checklist?utm_source=facebook&utm_medium=social&utm_campaign=<post id>", facebookData {type: "POST"}.
  2. TikTok photo post: media [image9x16 raw URL], text = caption, tiktokData {privacyOption: "PUBLIC_TO_EVERYONE", commercialContentOwnBrand: true, autoAddMusic: false, title: first line of the quote}.
  3. Pinterest: media [image2x3 raw URL], text = a 1-2 sentence description, pinterestData {boardId: "Hiking Tips & Checklists", pinTitle: short title, pinLink: "https://hikesupplyco.com/pages/links?utm_source=pinterest&utm_medium=social&utm_campaign=<post id>", pinNewFormat: true}.
  If a network rejects (for example TikTok photo posts), note it in the doc and carry on with the others; never retry in a loop.
- Save the Metricool ids on each post, set the doc `scheduled: true`, log it.

## B. Make next week's batch (when no `moods` doc covers the coming Monday-Sunday)
1. Clone the repo with push access. Read `moods/photos/credits.json`; you need 7 photos with `used: false`. If fewer, make as many as you can and say so in the log (the Photo Scout refills on Sundays).
2. Write 7 quotes. Rules:
   - Only real, exact quotes from public-domain authors (Vasil 2026-11-24: our own reflective lines had become cringe, all fake-deep life lessons). Authors who died before 1929 AND a work first published before 1929: John Muir (e.g. My First Summer in the Sierra, Our National Parks, Steep Trails, The Mountains of California, letters), Henry David Thoreau (Walden, Walking, The Maine Woods), Ralph Waldo Emerson (Nature, essays), Walt Whitman (Song of the Open Road), Robert Louis Stevenson (Travels with a Donkey), John Burroughs, Isabella Bird. No more lines in our own words.
   - Verify every quote word for word in the original text (Project Gutenberg, Wikisource, or Wikiquote's "Sourced" section with the work named) before using it, and store `source` (work and year) on the post. If you cannot find it in the original, do not use it. Many famous "Muir" and "Emerson" lines online are fake or paraphrased (for example "Keep close to Nature's heart", "Adopt the pace of nature", "The clearest way into the Universe" from a 1938 book): skip anything not found verbatim in a pre-1929 work.
   - Short: one or two sentences, at most about 25 words. You may cut a longer sentence only at a natural break and only if the cut part keeps the meaning; never change words. Always shown with `author`.
   - Never repeat a quote: check earlier `moods` docs.
   - Match the words to the photo's mood (mist, summit, forest path, lake, snow).
3. Render: write `moods/batches/<doc id>.json` (posts: id `m<YYYYMMDD>`, photo, quote, author) and run `python3 moods/render_mood.py moods/batches/<doc id>.json`. Look at the 4x5 image of every post yourself: text readable, not over a face or the main peak, nothing clipped. If not right, set `place` (top / middle / bottom) and re-render.
4. Mark the photos `used: true` in credits.json. git add, commit, pull --rebase, push.
5. Upload each 4x5 image to the HQ page as an asset (Artifact tool, url = HQ link, asset: true; up to 25 files in one call with file_paths) for the inbox preview.
6. Write `moods/mw<YYYY-MM-DD of that Monday>`: `{createdAt, status: "waiting", week, posts: [{id, date, quote, author, photo, credit ("Photo: <name> / Pexels"), image4x5, image2x3, image9x16 (raw.githubusercontent URLs), preview (HQ asset URL), caption}]}`.
   Caption: the author and the work in plain words (e.g. "John Muir, Our National Parks, 1901"), no added life lesson or poetry of our own, an empty line, "Photo: <name> / Pexels", then 3 hashtags (for example #hikinglife #mountainmood #trailtherapy). Never "link in bio" spam; at most twice a week add "Gear and trail guides at the link in bio."
7. Vasil approves the whole week with one tap in HQ (or rejects with a note; then fix what the note says and set it back to waiting).

Log one line per run, set `agents/moodwriter` idle with lastRun and nextRun.
