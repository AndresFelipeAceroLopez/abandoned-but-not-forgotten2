// Prueba de humo: recorre todas las escenas en Chrome (headless), captura errores de consola y capturas de pantalla.
// Uso: node etl/humo_navegador.mjs [http://localhost:4173] [--dbg]
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] || 'http://localhost:4173';
const dbg = process.argv.includes('--dbg');
mkdirSync('capturas', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
const errores = [];
page.on('console', (m) => { if (m.type() === 'error') errores.push(`[consola] ${m.text().slice(0, 300)}`); });
page.on('pageerror', (e) => errores.push(`[pageerror] ${String(e).slice(0, 300)}`));
page.on('requestfailed', (r) => errores.push(`[request] ${r.url()} ${r.failure()?.errorText}`));

const escenas = ['prologo', 'satelites', 'luna', 'marte', 'profundo', 'cierre', 'danos', 'radiactivos', 'sinnombre', 'noesbasura', 'paises', 'union', 'cortos', 'soluciones', 'propuesta', 'dashboard', 'referencias'];
const con3D = new Set(['prologo', 'satelites', 'luna', 'marte', 'profundo', 'sinnombre', 'paises', 'union', 'propuesta']);

await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'capturas/00-inicio.png' });
await page.click('text=Para niños y jóvenes');
await page.waitForTimeout(1500);

if (dbg) {
  for (const [esc, nombre] of [['prologo', 'tierra'], ['marte', 'marte'], ['luna', 'luna']]) {
    await page.goto(`${base}/?modo=org&escena=${esc}&dbg=1`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(6000);
    await page.screenshot({ path: `capturas/dbg-${nombre}.png` });
  }
}

for (const modo of ['ninos', 'org']) {
  for (const e of escenas) {
    const antes = errores.length;
    await page.goto(`${base}/?modo=${modo}&escena=${e}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(con3D.has(e) ? 5000 : 1500);
    if (e === 'luna' && modo === 'org') {
      await page.fill('input[placeholder^="Buscar"]', 'Apollo 13');
      await page.waitForTimeout(500);
      await page.click('.bandeja button >> nth=0').catch(() => {});
      await page.waitForTimeout(800);
    }
    if (e === 'satelites' && modo === 'org') {
      await page.fill('input[placeholder^="Nombre"]', 'ISS');
      await page.waitForTimeout(800);
    }
    await page.screenshot({ path: `capturas/${modo}-${e}.png` });
    const nuevos = errores.slice(antes);
    console.log(`${modo}/${e}: ${nuevos.length ? 'ERRORES ' + nuevos.length : 'ok'}`);
    for (const n of nuevos) console.log('   ', n);
  }
}
await browser.close();
console.log(`\nTotal de errores: ${errores.length}`);
for (const e of errores) console.log('  ', e);
process.exit(errores.length ? 1 : 0);
