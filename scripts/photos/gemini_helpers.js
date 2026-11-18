// Helpers for making product photos in Gemini (Vasil's Chrome). Paste into the Gemini tab.
(() => {
  if (!window.__hsPatched) {
    const o = HTMLInputElement.prototype.click;
    HTMLInputElement.prototype.click = function () {
      if (this.type === 'file') { this.setAttribute('aria-label', 'gemini file input'); this.style.display = 'block'; document.body.appendChild(this); return; }
      return o.call(this);
    };
    window.__hsPatched = 1;
  }
  const S = t => new Promise(r => setTimeout(r, t));
  window.S = S;
  window.openUp = async () => {
    document.querySelectorAll('input[aria-label="gemini file input"]').forEach(e => e.remove());
    document.querySelector('button[aria-label="Upload & tools"]').click(); await S(900);
    [...document.querySelectorAll('button,[role=menuitem]')].find(e => /Upload files/.test(e.textContent))?.click(); await S(900);
    return !!document.querySelector('input[aria-label="gemini file input"]');
  };
  window.imgMode = async () => {
    document.querySelector('button[aria-label="Upload & tools"]').click(); await S(900);
    [...document.querySelectorAll('button,[role=menuitem]')].find(e => /^\s*Create image/.test(e.textContent))?.click(); await S(900);
  };
  window.gen = async p => {
    const box = document.querySelector('[aria-label="Enter a prompt for Gemini"]'); box.focus();
    document.execCommand('insertText', false, p); await S(1500);
    document.querySelector('button[aria-label="Send message"],button[aria-label="Submit"]').click(); return 'sent';
  };
  window.nImg = () => document.querySelectorAll('button[aria-label="Download full size image"]').length;
  window.waitN = async n => { for (let i = 0; i < 10; i++) { if (nImg() >= n) { await S(4000); return 'ready'; } await S(4000); } return 'n=' + nImg(); };
  performance.setResourceTimingBufferSize(5000);
  window.saveIdx = async (i, name) => {
    for (let t = 0; t < 2; t++) {
      performance.clearResourceTimings();
      const b = [...document.querySelectorAll('button[aria-label="Download full size image"]')]; b[i].click();
      for (let k = 0; k < 20; k++) {
        await S(1500);
        const l = performance.getEntriesByType('resource').map(e => e.name).filter(u => /rd-gg\/.*=s0-d-I/.test(u));
        for (const u of l) {
          const bl = await (await fetch(u, { credentials: 'include' })).blob();
          if (bl.size > 100000) { const a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = name; document.body.appendChild(a); a.click(); a.remove(); return bl.size; }
        }
      }
    }
    return 'none';
  };
  return 'helpers ok';
})();
