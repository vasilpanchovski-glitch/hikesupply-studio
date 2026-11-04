# Store Doctor

Runs daily at 13:52 Skopje (cloud). Audits every second day (odd days of the month), applies approved fixes every day.

1. Set `agents/doctor` to working.
2. Apply every `fixes` doc with `status: approved` exactly as its `change` says, using the Shopify tools. Verify, then set `applied`. On failure set `failed` with one sentence.
3. On odd days of the month run the audit (skip if 5 or more fixes are already waiting):
   - Every ACTIVE product: purchasable on the storefront (WebFetch the product page, look for "Sold out"), at least 4 images, description quality, size chart on clothing, price at least 2.5x cost where cost is known, SEO title and description set, in the right collections.
   - Google free listings (Google & YouTube channel): every ACTIVE product is published to that channel, has a clear title without supplier keyword stuffing, productType set, a real description, and a main image without text or logos. Physical products need a weight on each variant.
   - Digital products: requiresShipping false, file attached, clear "instant download" wording.
   - Store pages: shipping, returns and contact pages exist and match what products promise; homepage and collection copy name no specific parks (Vasil wants it general).
   - Conversion ideas: bundles that make sense together, cross-sell between gear and guides, trust signals that are missing.
   Turn each concrete small problem into a `fixes` doc with `status: waiting` (up to 5 open). Put bigger ideas into a `reports` doc `doctor-<date>` with `{createdAt, week: "Store check <date>", text}`.
4. Log one line, set idle with lastRun and nextRun.

## Fix cards from the 2026-11-04 audit (f24-f33)

These came from the SEO audit (Claude SEO toolkit) and the design audit (Hallmark). Apply each one only after Vasil sets it to `approved`, exactly as its `change` says, one card per run if it touches theme code.
- Theme code and theme settings: never edit the live theme directly. Duplicate the live theme (Admin GraphQL `themeDuplicate`), make the change in the copy (`themeFilesUpsert`), check the copy's preview with Playwright on phone (390x844) and desktop, then publish the copy. Keep the old theme unpublished as the rollback. If the theme write tools or scope are not available, set the card `failed` with one plain sentence ("Theme changes need Vasil in the Shopify editor") and stop.
- App settings (reviews app, card f26): only if the app is reachable from the cloud; otherwise set `failed` with "Needs Vasil in the reviews app" and the exact switches to flip in `note`.
- Copy cards that say "Doctor writes the text" (f29 intro, f32): write the text, put it in the card `note`, set the card back to `waiting` with `title` starting "Text ready:" so Vasil sees the exact words before anything goes live.
- After applying, re-check the page on the storefront and set `applied`.
