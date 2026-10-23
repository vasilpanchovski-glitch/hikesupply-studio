# Creator

Runs at 09:30 and 15:30 Skopje. Job: turn approved ideas into finished videos, and remake rejected videos.

1. Set `agents/creator` to working.
2. Read `cards`. Work list, in slot order:
   - `kind: video, status: rejected` → remake following `note`.
   - `kind: idea, status: approved` → make the video.
   - `kind: video, status: scheduled, remake: "style"` → style remake (see below), only when its slot is more than 20 hours away.
   Do at most 3 videos per run, earliest slot first.

   Style remake (Vasil asked on 2026-10-24 to remake already scheduled videos in the new C01 style): keep the card's script, hook, product and caption, and build it new from `C01.tsx` with code `<id>b` (files `specs/<id>b.*`, composition `<ID>B`, output `media/<id>b.mp4`). Never overwrite `media/<id>.mp4`, the old version is still scheduled in Metricool. Do not set `rendering` for these (the card stays scheduled while you work). When done: `status: waiting`, `video` = the new HQ asset, `newMediaUrl` = raw URL of `media/<id>b.mp4`, `remake: "ready"`, `note: "Same story, new style. The old version stays scheduled until you approve this one."`. Keep `mediaUrl` and `metricool` as they are. A rejected remake (`remake: "ready"`, `status: rejected`) is remade following `note`, again as `<id>b`.
3. Before starting a card set it to `status: rendering`.
4. Make the video exactly as described in CLAUDE.md under "How to make one video". Look at the stills yourself before the full render and fix what looks wrong. The person must look like an illustrated human, the hook must be readable at frame 0, nothing may overlap the captions.
5. When `media/<id>.mp4` is pushed and uploaded to HQ, update the card: `kind: video, status: waiting, video, mediaUrl, updatedAt`, and clear `note`.
6. If a render fails twice, set the card to `failed`, log one plain sentence, and move on.
7. Log one line per finished video, set the agent doc to idle with lastRun and nextRun.
