// Fills the Etsy listing editor (after photos, category and Digital type are set) from etsy/listings/<slug>.json on GitHub.
// Usage in the page: await fillListing('<slug>')
window.fillListing = async (slug) => {
  const L = await (await fetch(`https://raw.githubusercontent.com/vasilpanchovski-glitch/hikesupply-studio/main/etsy/listings/${slug}.json?x=${Date.now()}`)).json();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const setVal = (el, v) => {
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
  };
  const byLabel = (txt) => {
    const lab = [...document.querySelectorAll('label')].find((l) => l.textContent.trim().replace(/\*$/, '').trim() === txt);
    return lab && (document.getElementById(lab.htmlFor) || lab.parentElement.querySelector('input,textarea,select'));
  };
  const out = [];
  const title = document.getElementById('listing-title-input'); if (title) { setVal(title, L.title); out.push('title'); }
  const desc = document.getElementById('listing-description-textarea') || byLabel('Description'); if (desc) { setVal(desc, L.description); out.push('desc'); }
  // tags
  const inp = document.getElementById('listing-tags-input') || document.querySelector('input[placeholder^="Shape, colour"]');
  const addBtn = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Add');
  for (const b of [...document.querySelectorAll('button')].filter((b) => /^Delete tag/.test(b.getAttribute('aria-label') || ''))) { b.click(); await sleep(80); }
  for (const t of L.tags) { inp.focus(); setVal(inp, t); await sleep(100); addBtn.click(); await sleep(160); }
  out.push('tags:' + [...document.querySelectorAll('button')].filter((b) => /^Delete tag/.test(b.getAttribute('aria-label') || '')).length);
  const pages = byLabel('Number of pages'); if (pages && L.pageCount) { setVal(pages, String(L.pageCount)); out.push('pages'); }
  const fmt = [...document.querySelectorAll('select')].find((s) => [...s.options].some((o) => o.text === 'eBook')); if (fmt) { const o = [...fmt.options].find((o) => o.text === 'eBook'); setVal(fmt, o.value); out.push('ebook'); }
  const price = document.getElementById('listing-price-input') || byLabel('Price'); if (price) { setVal(price, L.price); out.push('price'); }
  const qty = byLabel('Quantity'); if (qty) { setVal(qty, '999'); out.push('qty'); }
  const radio = (t) => { const r = [...document.querySelectorAll('input[type=radio]')].find((r) => (r.getAttribute('aria-label') || r.labels?.[0]?.textContent || '').trim().startsWith(t) || r.value === t); if (r) { r.click(); return 1; } return 0; };
  out.push('radios:' + (radio('I did') + radio('A finished product') + radio('ai_gen')));
  return out.join(' ');
};
'ok';
window.labelInputs = () => {
  const p = document.querySelector('#field-listingImages input[type=file]'); if (p) p.setAttribute('aria-label', 'photoinput');
  const d = document.querySelector('#field-digitalFiles input[type=file]'); if (d) d.setAttribute('aria-label', 'digitalinput');
  return !!p + ',' + !!d;
};
window.checkSave = async (nFiles) => {
  await new Promise((r) => setTimeout(r, 6000));
  const s = { title: document.getElementById('listing-title-input').value.length, desc: document.getElementById('listing-description-textarea').value.length, price: document.getElementById('listing-price-input').value,
    files: (document.querySelector('#field-digitalFiles').innerText.match(/\.(pdf|zip)/g) || []).length, photos: document.querySelectorAll('#field-listingImages img').length, tags: document.querySelectorAll('button[aria-label^="Delete tag"]').length };
  if (s.files === nFiles && s.photos === 5 && s.tags === 13 && s.title > 50 && s.desc > 300) { [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Save as draft').click(); s.saved = 1; }
  return JSON.stringify(s);
};
