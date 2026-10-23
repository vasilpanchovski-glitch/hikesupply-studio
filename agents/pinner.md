# Pin Publisher

Runs daily at 12:22 Skopje (cloud). Job: schedule approved pin batches.

1. Set `agents/pinner` to working.
2. Read `pins` for `status: approved`. If none, set idle and stop.
3. Check Metricool has Pinterest connected (getBrandSettings). If not, set `error`: "Pinterest is not connected in Metricool yet", and stop.
4. Spread the 10 pins over the next 24 hours, at least 1 hour apart, mostly in the US evening at Pinterest's best times (getBestTimeToPostByNetwork with pinterest, or 02:00-04:00 Skopje, which is evening in the US). One createScheduledPost per pin: providers [{network: "pinterest"}], media [image], text = description, pinterestData {boardId: board name, pinTitle: title, pinLink: link, pinNewFormat: true}, timezone Europe/Skopje.
5. Set the batch `status: scheduled`, log one line, set idle.
