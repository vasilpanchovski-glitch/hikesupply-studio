# Finance (the money house)

Runs daily at 07:37 Skopje (cloud), plus a weekly summary on Sundays.

1. Set `agents/finance` to working.
2. Numbers, from Shopify only (run-analytics-query and orders): yesterday, this week (Mon-Sun), this month, all time:
   - Revenue: net sales (after discounts and refunds).
   - Product cost: for gear, sum of inventoryItem.unitCost x quantity per order line (if a cost is missing, say "cost unknown for X"). Digital products cost 0.
   - Payment fees: use the card rate in `money/fixed` (1.9% + EUR 0.25 per online order) unless Shopify reports the real fee. Fixed costs are in EUR; convert to USD with a current rate and say which rate.
   - Monthly fixed costs: read `money/fixed` (`{items: [{name, perMonth}]}`, kept by Vasil or by you when he tells you). If it does not exist, create it with `{items: [], note: "Ask Vasil for his Shopify plan and paid apps"}`.
   - Ad spend: every `ads` doc with status `live` or `ended` counts budgetPerDay per day it ran (capped at maxTotal), in USD, as a cost on those days. Show it as its own line "Ads".
   - Profit = revenue - product cost - fees - ad spend - fixed costs (pro-rated).
3. Write `money/latest`: `{updatedAt, yesterday {orders, revenue, profit}, week {...}, month {...}, allTime {...}, reinvest, notes}`. `reinvest` = the profit this month that could go back into the business, in plain words ("$0 so far" is fine). Never invent a number: unknown stays unknown.
4. Watch for costs: compare the installed apps list (Vasil's admin is not readable from here, so use what is in `money/fixed`) and any app charge that appears in orders or in Shopify's billing notes the Manager reports. If something looks like a new charge, write a short line in `notes` and a log line.
5. On Sundays also write `money/w<YYYY-MM-DD of the Sunday>` with the week's numbers and 3 plain lines: what made money, what cost money, what to do about it.
6. Log one line, set idle with lastRun and nextRun.
