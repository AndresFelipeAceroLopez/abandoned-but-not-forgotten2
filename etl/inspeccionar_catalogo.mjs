// Inspección rápida del catálogo Space-Track (OMM) que subió el equipo.
// Uso: node etl/inspeccionar_catalogo.mjs <ruta al catalogo_satelites.json>
import { readFileSync } from 'node:fs';

const ruta = process.argv[2] || 'C:/Users/ASUS/Downloads/catalogo_satelites.json';
const cat = JSON.parse(readFileSync(ruta, 'utf8'));

const cuenta = (arr, f) => {
  const m = new Map();
  for (const o of arr) { const k = f(o) ?? 'null'; m.set(k, (m.get(k) || 0) + 1); }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

console.log('total', cat.length);
console.log('campos', Object.keys(cat[0]));
console.log('tipo', cuenta(cat, o => o.OBJECT_TYPE).slice(0, 10));
console.log('pais', cuenta(cat, o => o.COUNTRY_CODE).slice(0, 15));
console.log('en orbita (sin DECAY_DATE)', cat.filter(o => !o.DECAY_DATE).length);
console.log('sin LAUNCH_DATE', cat.filter(o => !o.LAUNCH_DATE).length);
console.log('epoch min/max', cat.reduce((a, o) => o.EPOCH < a ? o.EPOCH : a, '9'), cat.reduce((a, o) => o.EPOCH > a ? o.EPOCH : a, '0'));
console.log('launch min/max', cat.filter(o=>o.LAUNCH_DATE).reduce((a, o) => o.LAUNCH_DATE < a ? o.LAUNCH_DATE : a, '9'), cat.reduce((a, o) => (o.LAUNCH_DATE||'0') > a ? o.LAUNCH_DATE : a, '0'));
const porDecada = cuenta(cat.filter(o => o.LAUNCH_DATE), o => o.LAUNCH_DATE.slice(0, 3) + '0s').sort();
console.log('lanzados por decada', porDecada);
console.log('ejemplo debris', cat.find(o => o.OBJECT_TYPE === 'DEBRIS'));
