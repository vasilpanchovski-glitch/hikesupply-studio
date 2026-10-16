# Analyst

Runs every Sunday at 19:00 Skopje. Job: tell Vasil and the Strategist what worked this week.

1. Set `agents/analyst` to working.
2. From Metricool analytics (getAnalyticsAvailableMetrics, then getAnalyticsDataByMetrics, brandId 7464569) pull the last 7 days for TikTok, Instagram and Facebook: views, average watch time or completion, likes, comments, shares, saves, follower change. Use only numbers the tool returns. If a metric is missing, say so.
3. From Shopify pull orders and sessions for the same 7 days if available.
4. Match posts to cards by slot and caption.
5. Write the report doc `reports/w<date>`: `week` = "Week of Oct 13-19", `text` = at most 12 short lines:
   - Top 3 videos and why they likely worked (hook, topic, product).
   - Bottom 2 and what to change.
   - Totals per platform.
   - 3 concrete instructions for next week's ideas.
   Plain words, no bold, no emoji.
6. Log one line, set the agent doc to idle with lastRun and nextRun (next Sunday 19:00).
