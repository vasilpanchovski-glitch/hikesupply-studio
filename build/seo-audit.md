# HikeSupply Co. SEO and conversion audit

Date: 2026-10-29. Site: https://hikesupplyco.com (Shopify, theme t/13).
Method: Claude SEO toolkit (seo-audit, seo-technical, seo-ecommerce, seo-schema, seo-images, seo-geo, seo-content, seo-page, seo-sitemap). Raw HTML was fetched with curl and parsed with `scripts/parse_html.py`. Product JSON-LD was checked with `scripts/schema_ecommerce_validate.py`. Pages were rendered in headless Chromium at 390x844 (mobile) and 1366x768 (desktop) with the US localization cookie. Read only: nothing was changed.
Not measured: field Core Web Vitals (CrUX) and PageSpeed Insights. The googleapis.com host is blocked from this machine, and no paid APIs or keys were used.

Pages checked (all returned 200): home, 4 collections, 10 products (winter guide, trekking pole, hiking journal, dry bag, merino socks, headlamp, first-aid kit 13 pcs, women's fleece, beginner bundle, Smokies trip pack), the blog index, 3 articles (what-to-pack-for-a-day-hike, are-trekking-poles-worth-it, what-to-wear-hiking-in-40-degree-weather), the FAQ, robots.txt, sitemap.xml and its 6 child sitemaps, and every internal link found on those pages (75 URLs).

---

## 1. Scores per area

Each score is my judgment of the checks below, not a tool number.

| Area | Score | Why |
|---|---|---|
| Technical | 80/100 | HTTPS with HSTS, CSP and X-Frame-Options. robots.txt is clean (only cart, checkout, account and filter traps are blocked). The sitemap index is valid with 6 children, and all URLs checked return 200. Every page has a self-referencing canonical and no stray noindex. Content is server-rendered (product text and JSON-LD are in the raw HTML). Minus: one broken homepage link (404), an indexable thin `/collections/frontpage` that is also in the sitemap, all 55 product `lastmod` values identical (2026-10-29T18:22:13), and theme H2s like "Your cart is empty" and "Country/region" on every page. |
| On-page | 65/100 | Every page has a unique title, H1 and meta description, and the article H2s are written as questions. Minus: 15 of 20 titles are longer than 60 characters, the homepage meta description is 171 characters, the blog index has no meta description, collection intros are a single generic sentence, and the FAQ and Contact pages have no internal links pointing to them. |
| Product pages | 55/100 | Copy is honest and specific: spec tables, "sold as a single pole", care notes, and FAQ blocks on guides. A "Pairs well with" cross-sell list exists. Minus: on mobile the cross-sell sits above the title, price and Add to cart. Specs are metric-only with UK spelling. The pole photo shows a supplier logo. The main image has no alt text. Several items carry compare-at "Sale" prices. No reviews (already known). |
| Structured data | 60/100 | Product (digital) and ProductGroup (variants) JSON-LD with brand, sku, price, priceCurrency and availability. The toolkit validator returns PASS with 0 critical issues. Minus: no shippingDetails, no hasMerchantReturnPolicy, and no BreadcrumbList anywhere. Organization has 6 empty `sameAs` strings and no logo. Article `author` is a Person named "HikeSupply Co." |
| Images | 60/100 | The Shopify CDN serves WebP with srcset, and product images have width and height set. Minus: the first (main) product image has empty alt on most gear products, and homepage category images have empty alt and no dimensions. The theme story image is a 472 KB JPEG that is not resized. 34 of 53 images on the 10 products are named `Gemini_Generated_Image_*` and carry no IPTC/XMP metadata. The homepage hero video uses preload="auto" (2.2 MB on mobile, 8.4 MB on desktop). |
| AI search / GEO | 70/100 | OAI-SearchBot, GPTBot, PerplexityBot, Claude-SearchBot and Bingbot all get 200 with full HTML, and robots.txt allows them. Articles have quick-answer paragraphs and question H2s, and 2 of 3 cite NPS, weather.gov, REI or Backpacker. Minus: no named author or expertise anywhere. The what-to-pack article has 0 external sources and 18 product links. The FAQ page cannot be found from the site. llms.txt is Shopify's default agent text (no weight either way). |
| Trust / conversion | 40/100 | Clear refund, shipping and contact policies; a 30-day return window; support email. Minus: the five known issues (all confirmed or seen below), the "Read our story" 404, no About page, no address or phone, "Taxes included" on US prices, and delivery times that differ between pages. |

Speed signals (lab only, no field data):
- Server response (TTFB) was 0.12-0.80 s across 20 pages.
- Mobile LCP in headless Chromium with 4x CPU throttle and no network throttle: home 1.2-1.5 s, pole 1.5-2.1 s, socks 1.5-1.6 s, gear collection 1.4-1.8 s.
- CLS: 0 to 0.058 on mobile, 0 to 0.031 on desktop.
- The homepage LCP element is the hero video. Homepage transfer was about 2.4 MB on mobile and 2.8 MB on desktop, mostly that video.
- One unthrottled run measured LCP at 22 s on the pole page. It did not repeat in 2 later runs, so treat it as noise.
- Once, desktop headless Chromium was served a Cloudflare challenge on /products/folding-trekking-pole. Plain curl with bot user-agents was never challenged.

## Known issues: confirmation status

- Email popup covering Add to cart on mobile: NOT reproduced. No fixed or overlay element appeared within 9 s of load in my mobile renders. The Shopify Forms script (forms.shopifyapps.com) does load on every page. It may need a scroll, more time, or a fresh session to show.
- Untrue homepage claims: CONFIRMED on https://hikesupplyco.com/
  - "Premium hiking gear and trail guides..."
  - "Trail-tested gear" (shown twice)
  - "Every product we carry is tested on real trails..."
  - "We work with a small group of makers..."
  - "Field-tested — Every product is carried on real trails..."
  - New, same kind: the Apparel tile says "Jackets, base layers and trail-ready apparel". The Clothing collection sells no base layers.
- Free worldwide shipping vs "Shipping calculated at checkout": CONFIRMED. The announcement bar, the homepage strip and the gear meta descriptions say free worldwide shipping. The pole, fleece and socks product pages say "Taxes included. Shipping calculated at checkout."
- No reviews: CONFIRMED. The Judge.me widget renders at the very bottom of product pages (mobile y≈3200-4100 px) with "Be the first to write a review".
- Product title too large on mobile: CONFIRMED. The H1 is 34px on mobile and 41px on desktop. See fix 1 for a bigger cause of the price sitting below the fold.

---

## 2. Top 15 fixes (ranked by impact on sales, then Google and AI traffic)

"Agents" means a copy or SEO field change through the Shopify Admin API, safe for our agents (Store Doctor or Search Specialist card). "Vasil" means a theme, settings or photo change that needs his approval.

### 1. Mobile product pages show the cross-sell before the product's own title, price and Add to cart
- Wrong: on https://hikesupplyco.com/products/folding-trekking-pole (mobile 390x844), the "Pairs well with" block sits directly under the image gallery. Positions on the page: cross-sell price at y=704, product H1 at y=892-999, Add to cart at y=1306. The viewport is 844 px tall, so a visitor sees the photo and two other products but not this product's name, price or buy button.
- Same layout on every product checked: winter guide (H1 y=1064, the first price shown is the headlamp's "From $16.99"), socks (Add to cart y=1430) and fleece. Evidence: `shots/mobile-p-pole.png` and `shots/mobile-p-winter.png`.
- Change: in the theme editor, Product information section, drag the "Pairs well with" (complementary products) block below "Buy buttons" and "Description". Do this together with the known fix that shrinks the mobile title to about 24-26px.
- Who: Vasil (theme editor). Effort: 10 minutes.

### 2. "Read our story" on the homepage goes to a 404, and there is no About page
- Wrong: https://hikesupplyco.com/ links "Read our story →" to https://hikesupplyco.com/pages/about, which returns 404. /pages/about-us and /pages/our-story are also 404. The link sits directly under the untrue "tested on real trails" story.
- Change: create /pages/about with a true, short story. Example: "HikeSupply Co. is a small online shop run by one person. We write our own printable hiking guides and checklists, and we pick day-hiking gear from trusted suppliers, check each listing's specs and photos, and describe it honestly, including what it is not. Gear ships from our suppliers' warehouses in 6-13 business days after 1-3 days of processing. Questions: support@hikesupplyco.com." Then replace the homepage story text the same way (known issue).
- Who: Agents can create the page via the Admin API (pageCreate) as a fix card. Changing the homepage text block is the theme, so Vasil. Effort: 30 minutes.

### 3. Main product photos have no alt text
- Wrong: in the product media, alt is empty for 6 of 7 images on /products/folding-trekking-pole, 12 of 13 on /products/waterproof-dry-bag, 7 of 8 on /products/polar-fleece-soft-shell-jacket-womens and 2 of 3 on /products/trail-first-aid-kit-13-pieces. The first gallery image, which is the LCP image and the og:image, renders with `alt=""` on the pole and dry bag pages.
- Change: set alt per image describing what it shows. Examples:
  - "Black folding 4-section aluminum trekking pole with T-handle grip"
  - "Yellow 3L roll-top waterproof dry bag, closed"
  - "Women's rose red polar fleece jacket, front view"
- Who: Agents (productUpdate media alt). Effort: 1-2 hours for all gear.

### 4. Supplier logo on the trekking pole's main photo, and AI-named product images
- Wrong: the main image on /products/folding-trekking-pole (Gemini_Generated_Image_nhwdqtnhwdqtnhwd.jpg) shows the brand print "QIANGSHENG" on the shaft. This breaks our own rule "no supplier logos printed on the product" and confuses buyers about the brand.
- Separately, 34 of 53 images on the 10 products checked (pole 7/7, dry bag 13/13, headlamp 5/5, first-aid 3/3, socks 6/9) are named `Gemini_Generated_Image_*`. The one I downloaded has no IPTC/XMP metadata.
- Why it matters: if these are AI-generated product photos, Google Merchant Center's AI-generated content policy asks for IPTC `DigitalSourceType: TrainedAlgorithmicMedia`, which matters if the Google & YouTube channel is ever used. Photos that do not match the delivered item are also a return and chargeback risk.
- Change: paint out the logo (same process as `scripts/product_cutout.py --logo`) or use a supplier photo without it. Re-upload with descriptive file names such as `folding-trekking-pole-black.jpg`.
- Who: Vasil (photo edits are his step in the Gear flow). Effort: 1 hour for the pole, more for a full rename.

### 5. Product structured data has no shipping or return policy
- Wrong: on all 10 products, the toolkit validator reports "missing shippingDetails" and "missing hasMerchantReturnPolicy". For example, /products/winter-hiking-guide-cold-weather-checklist has an Offer with only price, currency, availability and url. Without these, Google cannot show "Free shipping" or "30-day returns" in product snippets.
- Change, step 1 (no code): in Google Search Console, Settings, "Shipping and returns", enter:
  - US and Canada: shipping $0, handling 1-3 business days, transit 6-13 business days
  - Returns: 30 days, customer pays return shipping, by mail
- Change, step 2 (optional, theme JSON-LD): on each Offer add
  `"shippingDetails":{"@type":"OfferShippingDetails","shippingRate":{"@type":"MonetaryAmount","value":0,"currency":"USD"},"shippingDestination":{"@type":"DefinedRegion","addressCountry":["US","CA"]},"deliveryTime":{"@type":"ShippingDeliveryTime","handlingTime":{"@type":"QuantitativeValue","minValue":1,"maxValue":3,"unitCode":"DAY"},"transitTime":{"@type":"QuantitativeValue","minValue":6,"maxValue":13,"unitCode":"DAY"}}}`
  and
  `"hasMerchantReturnPolicy":{"@type":"MerchantReturnPolicy","applicableCountry":["US","CA"],"returnPolicyCategory":"https://schema.org/MerchantReturnFiniteReturnWindow","merchantReturnDays":30,"returnMethod":"https://schema.org/ReturnByMail","returnFees":"https://schema.org/ReturnFeesCustomerResponsibility"}`
  For digital products use `MerchantReturnNotPermitted`.
- Only do this once the shipping truth (known issue) is settled.
- Who: Vasil (Search Console settings; theme code). Effort: 20 minutes for Search Console, 1 hour for the theme.

### 6. Titles are cut off in Google (15 of 20 pages are over 60 characters)
- Wrong: the theme appends " – HikeSupply Co." (17 characters) unless the SEO title already contains the brand, as on the headlamp page. Rendered lengths:
  - /products/winter-hiking-guide-cold-weather-checklist: 75
  - /products/folding-trekking-pole: 72
  - /collections/gear-equipment: 74
  - /products/polar-fleece-soft-shell-jacket-womens: 74
  - /blogs/trail-journal/are-trekking-poles-worth-it: 78
  - /blogs/trail-journal/what-to-pack-for-a-day-hike: 76
  - /blogs/trail-journal/what-to-wear-hiking-in-40-degree-weather: 75
- Change: write SEO titles of 60 characters or less, ending in "| HikeSupply Co." when space allows. Examples:
  - Winter guide: "Winter Hiking Checklist & Guide (Printable PDF)"
  - Pole: "Folding Trekking Pole, 4-Section Aluminum | HikeSupply Co."
  - Gear: "Hiking Gear: Packs, Poles, Filters & Safety | HikeSupply"
  - Women's fleece: "Women's Polar Fleece Hiking Jacket | HikeSupply Co."
  - Poles article: "Are Trekking Poles Worth It? When They Help"
  - Pack article: "What to Pack for a Day Hike: Checklist + Free PDF"
  - 40°F article: "What to Wear Hiking in 40 Degree Weather"
- Who: Agents (SEO title field). Effort: 1 hour.

### 7. Homepage and blog meta descriptions
- Wrong: the homepage description is 171 characters (cut off) and repeats "Free worldwide shipping on gear". https://hikesupplyco.com/blogs/trail-journal has no meta description at all; og:description falls back to the homepage text.
- Change:
  - Home (153 characters): "Day-hiking gear and clothing plus printable hiking guides, checklists and national park trip planners for US and Canadian hikers. Instant PDF downloads."
  - Blog: "Trail Journal: plain-language hiking advice from HikeSupply Co. What to pack, what to wear, trekking poles, winter hiking and national park day hikes."
  - Add the free-shipping wording back only after the shipping truth is fixed.
- Who: Agents (shop SEO description; blog SEO field). Effort: 15 minutes.

### 8. Collection pages have one generic sentence of text
- Wrong:
  - /collections/gear-equipment: "Essential outdoor gear for every adventure."
  - /collections/clothing: "Trail-ready apparel built for performance."
  - /collections/all-gear: "Shop our complete range of hiking apparel and outdoor gear."
  These are the pages that should rank for "day hiking gear" and "hiking clothing".
- Change: write 80-150 words per collection, specific and true, with 2-3 links to Trail Journal articles. Example for Gear: "Day-hiking gear for US and Canadian trails: hydration packs and bladders, folding trekking poles, water filter straws, headlamps, first-aid kits, emergency bivvies and dry bags. Each listing states what is included (a single pole, a pair of gaiters) and the real specs. New to it? Start with What to Pack for a Day Hike and Are Trekking Poles Worth It?"
- Also fix the homepage Apparel tile wording "base layers". That is theme text, so Vasil.
- Who: Agents (collection descriptionHtml). Effort: 1 hour.

### 9. The FAQ and Contact pages cannot be reached from the site
- Wrong: across all 20 pages crawled, no link points to /pages/frequently-asked-questions or /pages/contact-us. The footer only links the five policies. The FAQ holds the best answer content for AI tools: shipping times, customs, downloads, returns.
- Change: add "FAQ", "Contact" and "About" (after fix 2) to the footer menu.
- Who: Agents (menuUpdate on the footer menu via the Admin API: a content change, reversible). Effort: 10 minutes.

### 10. Product copy reads European to US buyers
- Wrong:
  - /products/folding-trekking-pole: "53–110 cm" only, "Aluminium" (8 times on the page).
  - /products/merino-wool-hiking-socks: variants are named "EU 36-40 / EU 40-45". The US sizes are only in the description.
  - "colour" on the pole, socks, journal, fleece and winter pages; "odour" on socks; "plasters" on the first-aid kit.
  - Our product rule asks for imperial plus metric.
- Change: "Adjustable 21–43 in (53–110 cm), folds to 21 in (53 cm)". Use "Aluminum", "color", "odor", "bandages". Rename sock variants to "US M 4–7 / W 6–9 (EU 36–40)" and "US M 7–11 / W 9–12 (EU 40–45)".
- Who: Agents (title, description, option values). Effort: 1-2 hours.

### 11. Compare-at "Sale" prices on physical items
- Wrong: the collection pages show strike-through prices:
  - Quick-Dry Trail Shorts $59.99 (was $74.99)
  - Trail Skort $44.99 (was $59.99)
  - Trail First-Aid Pouch $24.99 (was $34.99)
  I found no evidence these items were ever sold at the higher price. US FTC and state rules treat invented "was" prices as deceptive. The bundle compare-at prices (sum of parts) are fine.
- Change: remove compare-at on those three unless they really sold at that price.
- Who: Agents (variant compareAtPrice; reversible). Effort: 5 minutes.

### 12. Thin or duplicate collection URLs are indexable
- Wrong:
  - https://hikesupplyco.com/collections/frontpage is titled "Home page – HikeSupply Co." and is listed in sitemap_collections_1.xml.
  - https://hikesupplyco.com/collections/all is titled "Products – HikeSupply Co." and is the target of the homepage "View All →" and the cart's "Continue shopping".
- Change: remove the "Home page" collection from the Online Store sales channel (it drops out of the sitemap), or give it a noindex SEO setting. Point "View All" at /collections/all-gear.
- Who: Agents (unpublish the collection: reversible). Vasil (homepage link is theme). Effort: 15 minutes.

### 13. Free hiking checklist exists twice
- Wrong: https://hikesupplyco.com/pages/free-hiking-checklist ("Free Printable Hiking Checklist (PDF)") and https://hikesupplyco.com/products/free-hiking-checklist ("Free Hiking Checklist — Printable PDF") target the same search. The article links to the page, and the Guides collection links to the product.
- Change: choose the page as the search target. Retitle the product SEO title to "Free Hiking Checklist (Download)" and add a link from the product description to the page. Keep both live because checkout needs the product.
- Who: Agents (SEO fields, description). Effort: 15 minutes.

### 14. Author and organization signals for Google and AI answers
- Wrong:
  - Article JSON-LD has `"author":{"@type":"Person","name":"HikeSupply Co."}`, and the articles show only a date, with no byline.
  - The Organization JSON-LD on every page has `sameAs` with 6 empty strings and no `logo`.
  - /blogs/trail-journal/what-to-pack-for-a-day-hike has 0 external sources (the poles article cites REI, NYNJTC and Backpacker; the 40°F article cites NPS and weather.gov) and 18 product links in 1,126 words.
- Change:
  - Theme: author as `{"@type":"Organization","name":"HikeSupply Co.","url":"https://hikesupplyco.com/pages/about"}`.
  - Theme settings: leave unused social fields truly empty or remove them from the schema. Add `"logo"`.
  - Content: add an NPS Ten Essentials source link to the pack article and cut product links to the 6-8 that truly help.
- Who: Agents (article body). Vasil (theme schema and settings). Effort: 1 hour.

### 15. Homepage weight and image hygiene
- Wrong:
  - The hero video autoplays with `preload="auto"`: hsc-hero-fog-720.mp4 is 2.2 MB on mobile, the 1080 version is 8.4 MB on desktop.
  - The theme asset hsc-story-trail.jpg is 472 KB (JPEG, not CDN-resized).
  - The homepage category images (hsc-cat-*.jpg) have empty alt and no width/height.
  - The homepage logo image has empty alt inside a link with no text.
  - No `fetchpriority="high"` on any LCP image.
  - The homepage has two H1s ("HikeSupply Co." logo and "Gear Built for Every Trail").
  - Lab LCP is fine today (1.2-1.5 s), but this will hurt on slow mobile networks.
- Change:
  - Video: `preload="metadata"`, with the poster as the first paint.
  - Story image: move to Files so the CDN resizes it.
  - Category images: alt "Hiking gear and equipment", "Hiking clothing", "Printable hiking guides and planners", plus width and height.
  - Logo: give it an accessible label.
  - Make only the hero heading the H1.
- Who: Vasil (theme code). Effort: 1 hour.

---

## Other observations (smaller, for the backlog)

- "Taxes included." shows next to US prices (product pages and cart, also with the US localization cookie). US shoppers expect tax to be added at checkout. Check Settings > Taxes and duties > "Include sales tax in product price". Vasil.
- Delivery promise wording differs:
  - Product pages and homepage: "Delivered in 6–13 business days"
  - Shipping policy and FAQ: processing 1–3 business days, then 6–13 business days (7–16 in total)
  Use one sentence everywhere: "Ships in 1–3 business days, then 6–13 business days to arrive." Agents for the FAQ; theme for the product shipping block.
- The country selector lists "United States" twice plus "North Macedonia" (Markets setting). Vasil.
- Collection H1 renders as "Collection: Gear & Equipment" (a visually hidden prefix in the theme). Harmless.
- Theme headings such as "Your cart is empty", "Estimated total" and "Country/region" are H2 tags on every page. Low.
- Sitemap: all 55 product `<lastmod>` values are the same timestamp (2026-10-29T18:22:13+01:00). Google ignores lastmod that does not reflect real edits. This is Shopify-generated, so no action, but avoid bulk no-op product saves.
- No BreadcrumbList schema and no visible breadcrumbs on products or articles. Theme. Low.
- Winter guide JSON-LD description runs "trailhead.$7.99. Instant PDF..." (two paragraphs joined). Cosmetic; the visible page is fine.
- On the winter guide cover image the zoom button sits over the "HIKESUPPLY CO." label (mobile). Cosmetic.
- robots.txt and /llms.txt (served as the agents.md text) are Shopify defaults. They contain Shopify text addressed to AI agents ("install shop.com/SKILL.md"). It is standard platform text, not ours, and nothing needs doing.
- AI crawler access: OAI-SearchBot, GPTBot, PerplexityBot, Claude-SearchBot, Bingbot and a plain script user-agent all received 200 with the full 243 KB product HTML and no challenge.

## Evidence files (scratch, not in the repo)

- Screenshots: /tmp/claude-0/-home-claude/d744c2b0-8433-5cda-b093-a641ce85c74a/scratchpad/shots/ (mobile-p-pole.png, mobile-p-winter.png, render.json with element positions)
- Raw HTML, parsed SEO elements, product JSON: /tmp/claude-0/-home-claude/d744c2b0-8433-5cda-b093-a641ce85c74a/scratchpad/site/
