// Diagnóstico: geometría del GLB normalizado (mallas, centros y radios en el mundo).
import { chromium } from 'playwright-core';
const [base = 'http://localhost:5173', escena = 'prologo'] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
await page.addInitScript(() => { window.__depurar = true; });
await page.goto(`${base}/?modo=org&escena=${escena}&dbg=1`, { waitUntil: 'networkidle' });
await page.waitForTimeout(8000);
const info = await page.evaluate(() => {
  const w = window.__planeta, T = window.__THREE;
  if (!w) return 'sin planeta';
  w.updateMatrixWorld(true);
  const mallas = [];
  w.traverse((o) => {
    if (o.isMesh) {
      const b = new T.Box3().setFromObject(o, true);
      const s = b.getBoundingSphere(new T.Sphere());
      // ¿Normales invertidas? Compara la normal del vértice con su posición respecto al centro local.
      const p = o.geometry.attributes.position, n = o.geometry.attributes.normal;
      let dentro = 0, muestras = 0;
      if (n) for (let i = 0; i < p.count; i += Math.max(1, Math.floor(p.count / 50))) { const d = p.getX(i) * n.getX(i) + p.getY(i) * n.getY(i) + p.getZ(i) * n.getZ(i); muestras++; if (d < 0) dentro++; }
      mallas.push({ nombre: o.name, centro: s.center.toArray().map((v) => +v.toFixed(3)), radio: +s.radius.toFixed(3), verts: p.count, visible: o.visible, normalesHaciaDentro: `${dentro}/${muestras}`, lado: o.material.side, tipoMaterial: o.material.type, emisivo: o.material.emissive?.getHexString(), emisivoMapa: !!o.material.emissiveMap });
    }
  });
  const raiz = w.children[0];
  return { posW: w.position.toArray(), escalaW: w.scale.toArray(), raiz: { pos: raiz.position.toArray(), rot: raiz.rotation.toArray().slice(0, 3), esc: raiz.scale.toArray() }, mallas, padre: w.parent?.type, padrePos: w.parent?.position?.toArray() };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
