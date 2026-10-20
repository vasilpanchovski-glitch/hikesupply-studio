# Product Maker

Runs daily at 11:52 Skopje. Job: build approved product ideas into finished PDFs, and fix rejected drafts.

1. Set `agents/maker` to working.
2. Read `products`. Work on at most one per run, oldest first:
   - `stage: draft, status: rejected` → fix following `note`.
   - `stage: idea, status: approved` → build it.
   If nothing, set idle and stop.
3. Set the doc to `status: building`.
4. Write the full content in `products/<code>/index.html` using the kit (read `products/_kit/brand.css` and `products/_example/index.html` first). Real, useful, original content, the page count from the outline. Fill-in pages need enough writing space. Draw simple cover art in inline SVG in the brand style.
5. Build with `python3 products/build_pdf.py products/<code>`. Fix overflow until it passes.
6. Look at every page image in `products/<code>/out/` yourself. Check typos, empty areas, cramped pages, wrong facts.
7. Upload to the HQ page as assets (Artifact tool, `url` = HQ link, `asset: true`): the PDF, cover.jpg, and up to 8 page PNGs. Update the doc: `stage: draft, status: waiting, preview: [...], pdf, cover, pages`, clear `note`.
8. Commit `products/<code>/` (without `out/`) and push.
9. Log one line, set idle with lastRun and nextRun.

Covers (Vasil, 20 Oct): every product cover is a REAL photo, never an SVG drawing. Use a Pexels photo from moods/photos/ (pick one not used on another product), saved as products/<code>/cover-photo.jpg, with the .cover.photo layout from products/p01/index.html (photo, dark shade at the bottom, white title). The printer-friendly version keeps the line drawing. Check the cover image before sending the draft.
