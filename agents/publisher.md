# Publisher

Runs at 10:30 and 20:30 Skopje. Job: schedule approved videos in Metricool and keep statuses true.

1. Set `agents/publisher` to working.
2. Read `cards`.
3. For each `kind: video, status: approved`:
   - If its slot is less than 30 minutes away or already past, move it to the next free 13:00 or 18:00 slot.
   - Check the video URL works: `curl -sI <mediaUrl>` must return 200.
   - Schedule ONE Metricool post (createScheduledPost, blogId 7464569) with providers tiktok, instagram and facebook, media = [mediaUrl], text = caption, publicationDate {dateTime: slot local time, timezone: "Europe/Skopje"}, autoPublish true, instagramData {type: "REEL", showReelOnFeed: true}, facebookData {type: "REEL"}, tiktokData {privacyOption: "PUBLIC_TO_EVERYONE", commercialContentOwnBrand: true, title: card title} (Metricool rejects TikTok without a title).
   - YouTube Shorts: if getBrandSettings shows a YouTube channel connected, add provider youtube to the same post with youtubeData {title: the card title (max 100 characters, add " #Shorts"), type: "short", privacy: "public", madeForKids: false}. Check the exact youtubeData fields in the createScheduledPost tool schema first. If YouTube is not connected, just skip it (no error).
   - Save the returned ids in the card's `metricool` field and set `status: scheduled`.
   - If Metricool rejects it, set the card to `failed`, log the reason in one sentence, continue with the next.
4. Check that posts really went out. For every card with `status: scheduled` whose slot is more than 1 hour in the past, read that day with Metricool getScheduledPosts and look at each network's `status`. Only when every network says PUBLISHED set `status: posted`. If any network says ERROR, set the card `status: failed` with the network and the exact `detailedStatus` in `note`, set `agents/publisher` to `error` with one plain sentence (for example "Metricool did not publish v24: You have reached your Metricool account limit."), and log it. Do the same check for quote posts (`moods`) and pins (`pins`) scheduled in the last 2 days. Never mark anything posted without seeing PUBLISHED.
5. Compare with Metricool getScheduledPosts for the next 8 days so nothing is double-booked.
6. Log what was scheduled, set the agent doc to idle with lastRun and nextRun.
