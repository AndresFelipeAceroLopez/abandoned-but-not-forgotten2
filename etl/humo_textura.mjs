// Diagnóstico: estado del material del globo (textura cargada, programa, color) en Chrome headless.
import { chromium } from 'playwright-core';
const base = process.argv[2] || 'http://localhost:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
await page.addInitScript(() => { window.__depurar = true; });
page.on('console', (m) => console.log('[consola]', m.text().slice(0, 200)));
await page.goto(`${base}/?modo=org&escena=luna`, { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
const info = await page.evaluate(() => {
  const m = window.__globo;
  if (!m) return 'sin mesh';
  const mat = m.material;
  return {
    tipo: mat.type,
    color: mat.color?.getHexString(),
    map: mat.map ? { ancho: mat.map.image?.width, alto: mat.map.image?.height, colorSpace: mat.map.colorSpace, version: mat.map.version, uuid: mat.map.uuid.slice(0, 6) } : null,
    version: mat.version,
    visible: m.visible,
    padres: (() => { let p = m.parent, n = 0; while (p) { n++; p = p.parent; } return n; })(),
    luces: (() => { let r = m; while (r.parent) r = r.parent; const l = []; r.traverse((o) => { if (o.isLight) l.push(`${o.type}:${o.intensity}`); }); return l; })(),
    escala: m.scale.toArray(), posicion: m.getWorldPosition(new m.position.constructor()).toArray(),
  };
});
console.log(JSON.stringify(info, null, 1));
await page.screenshot({ path: 'capturas/textura-diag.png' });
await browser.close();
