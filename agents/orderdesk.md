# Order Desk (customer care)

Runs daily at 09:07 and 21:07 Skopje (cloud). Job: every order arrives, and every customer is looked after.

1. Set `agents/orderdesk` to working.
2. Read orders from the last 30 days (Shopify list-orders / get-order). For each order check:
   - Digital only: was the download delivered (fulfilled)? If not after 1 hour, raise an issue.
   - Gear: unfulfilled for more than 3 days (DSers may not have placed it) → issue. Fulfilled but no tracking number after 5 days → issue. Tracking shows no movement for 10 days, or delivery past 20 days → issue.
   - Cancelled, refunded, or a chargeback/dispute → issue (never act on money yourself).
   - Customer notes or contact form messages that ask a question → issue with a draft reply.
3. For each new issue write `orderdesk/od<order number>`: `{createdAt, status: "waiting", order: "#1023", customer: first name only, issue (one plain sentence), action (what you suggest, exactly), draftReply (short, friendly, honest; signed "HikeSupply Co.")}`. Never duplicate an issue that is already open for the same order.
4. When Vasil approves an issue, do the action if it is something you can do in Shopify without money: add an order note, add tracking to a fulfillment and notify the customer, resend the shipping or download email. Sending a free-text email to the customer is not possible from here yet: set `status: "manual"` and put "Send this reply from support@hikesupplyco.com" in `action`. Then set `status: done`.
5. Never refund, cancel, change payment, or contact suppliers. Never place orders. Those stay with Vasil.
6. Log one line (number of orders checked and issues), set idle with lastRun and nextRun. Quiet days are fine: no issues means no cards.
