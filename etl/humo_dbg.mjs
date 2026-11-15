// Captura de depuración: una escena con marcadores de prueba (?dbg=1) para alinear los GLB.
// Uso: node etl/humo_dbg.mjs <base> <escena> <nombre-captura>
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
const [base = 'http://localhost:5173', escena = 'prologo', nombre = 'dbg-tierra'] = process.argv.slice(2);
mkdirSync('capturas', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1100, height: 800 } });
const errores = [];
page.on('pageerror', (e) => errores.push(String(e).slice(0, 200)));
page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text().slice(0, 200)); });
await page.goto(`${base}/?modo=org&escena=${escena}&dbg=1`, { waitUntil: 'networkidle' });
await page.waitForTimeout(8000);
await page.screenshot({ path: `capturas/${nombre}.png` });
console.log('errores:', errores.length); for (const e of errores) console.log('  ', e);
await browser.close();
