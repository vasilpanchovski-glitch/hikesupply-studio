# Photo Scout (Content department)

Runs Sundays at 17:12 Skopje on Vasil's PC (Claude in Chrome + the device tools). Job: keep a stock of free-to-use photos for the quote posts and the Pinterest pins (Vasil 2026-11-12: every pin is now a real photo, so the stock must be about 40).

1. Set `agents/photoscout` to working.
2. Attach the repo with push access (add_repo, access "push"), clone it, read `moods/photos/credits.json`. Count photos that are free for pins (no `pinUsed` in the last 30 days). If there are 40 or more, set idle and stop. Otherwise download enough to reach about 40 (at most 40 in one run).
3. Load the Chrome tools in one ToolSearch call and read the chrome-browser skill first. Work in a new tab, close it at the end.
   If Chrome is not reachable, set `error` ("Chrome was not open on Sunday at 17:12, no new photos this week") and stop.
4. On pexels.com only (its license allows free commercial use without attribution; never use any other site), search portrait photos, for example: misty mountain, alpine lake, mountain ridge hiker, forest trail fog, mountain sunrise, snowy peaks, autumn forest mountains, desert canyon, national park, waterfall forest. Also search for pin topics: icy winter trail, snowy hiking boots, hiker with headlamp at dusk, trail map and compass, camping tent at night, backpack on trail, Great Smoky Mountains, Zion, Bryce Canyon, Arches, Yellowstone, Grand Canyon, Glacier National Park, family hike with kids, hiking with dog, cozy wool socks at home, winter dog walk, snowy city commute. Pick the ones that:
   - are portrait, sharp, calm, with an open area of sky, mist, snow or water where white text can sit;
   - show no recognisable faces (a small distant hiker is great), no logos, no text, no brands, no watermarks;
   - feel like real places hikers love (US and Canada scenery when possible), not people posing. For the everyday sock topics, a cozy home or a snowy town street is fine.
   Add a short `topic` to each photo in credits.json (for example "icy trail", "Zion", "cozy socks at home") so the Pin Designer can find it.
   Skip any id already in credits.json.
5. Download each one: open the photo page `https://www.pexels.com/photo/<id>/`, then in that page run JavaScript that fetches `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=1600` and saves it with an `<a download="hsc-pexels-<id>.jpg">` link. One photo per page load. Note the photographer name shown on the page.
6. Check the files arrived in `C:\Users\Vasil.Panchovski\Downloads` (device_list_dir). Stage them (device_stage_files), copy to `moods/photos/pexels-<id>.jpg` in the repo, add each to credits.json `{photographer, url, alt, used: false}`. Look at each photo once yourself; drop any that turned out unsuitable.
7. Move the downloaded files into `Downloads\HikeSupply photos` with device_bash (`mkdir -p` then `mv`), so Vasil's Downloads stays tidy. Never delete anything.
8. git add, commit "photos: <n> new", pull --rebase, push. Log one line, set idle with lastRun and nextRun.
