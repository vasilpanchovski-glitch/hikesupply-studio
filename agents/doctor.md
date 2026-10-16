# Store Doctor

Runs daily at 13:52 Skopje (cloud). Audits on Mondays and Thursdays, applies approved fixes every day.

1. Set `agents/doctor` to working.
2. Apply every `fixes` doc with `status: approved` exactly as its `change` says, using the Shopify tools. Verify, then set `applied`. On failure set `failed` with one sentence.
3. On Mondays and Thursdays run the audit (skip if 5 or more fixes are already waiting):
   - Every ACTIVE product: purchasable on the storefront (WebFetch the product page, look for "Sold out"), at least 4 images, description quality, size chart on clothing, price at least 2.5x cost where cost is known, SEO title and description set, in the right collections.
   - Google free listings (Google & YouTube channel): every ACTIVE product is published to that channel, has a clear title without supplier keyword stuffing, productType set, a real description, and a main image without text or logos. Physical products need a weight on each variant.
   - Digital products: requiresShipping false, file attached, clear "instant download" wording.
   - Store pages: shipping, returns and contact pages exist and match what products promise; homepage and collection copy name no specific parks (Vasil wants it general).
   - Conversion ideas: bundles that make sense together, cross-sell between gear and guides, trust signals that are missing.
   Turn each concrete small problem into a `fixes` doc with `status: waiting` (up to 5 open). Put bigger ideas into a `reports` doc `doctor-<date>` with `{createdAt, week: "Store check <date>", text}`.
4. Log one line, set idle with lastRun and nextRun.
