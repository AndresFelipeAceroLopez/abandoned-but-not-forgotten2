// Diagnóstico de orientación: compara la longitud del mundo de cada vértice con la longitud que implica su UV
// (mapa equirectangular: lon_tex = (u − 0,5)·360). Si la diferencia es constante, el mapa está centrado y el
// desfase a sumar es esa constante. Uso: node etl/humo_uv.mjs <base> <escena>
import { chromium } from 'playwright-core';
const [base = 'http://localhost:5173', escena = 'marte'] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
await page.addInitScript(() => { window.__depurar = true; });
await page.goto(`${base}/?modo=org&escena=${escena}&dbg=1`, { waitUntil: 'networkidle' });
await page.waitForTimeout(8000);
const info = await page.evaluate(() => {
  const w = window.__planeta, T = window.__THREE;
  if (!w) return 'sin planeta';
  w.updateMatrixWorld(true);
  const res = [];
  w.traverse((o) => {
    if (!o.isMesh) return;
    const p = o.geometry.attributes.position, uv = o.geometry.attributes.uv;
    if (!uv) { res.push('sin uv'); return; }
    const v = new T.Vector3();
    const difs = [];
    for (let i = 0; i < p.count; i += Math.max(1, Math.floor(p.count / 400))) {
      v.fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld);
      const lat = Math.asin(Math.max(-1, Math.min(1, v.y / v.length()))) * 180 / Math.PI;
      if (Math.abs(lat) > 60) continue;
      const lonW = Math.atan2(-v.z, v.x) * 180 / Math.PI;
      const u = uv.getX(i);
      const lonT = (u - 0.5) * 360;
      let d = lonT - lonW; d = ((d + 540) % 360) - 180;
      difs.push({ d: +d.toFixed(1), u: +u.toFixed(3), lonW: +lonW.toFixed(1), lat: +lat.toFixed(1), vInv: +uv.getY(i).toFixed(3) });
    }
    difs.sort((a, b) => a.lonW - b.lonW);
    const ds = difs.map((x) => x.d);
    const media = ds.reduce((s, x) => s + x, 0) / ds.length;
    const desv = Math.sqrt(ds.reduce((s, x) => s + (x - media) ** 2, 0) / ds.length);
    res.push({ malla: o.name, muestras: ds.length, mediaDif: +media.toFixed(1), desviacion: +desv.toFixed(1), ejemplos: difs.filter((_, k) => k % Math.ceil(difs.length / 8) === 0) });
  });
  return res;
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
