// ETL · Catálogo Space-Track (OMM/TLE) → archivos compactos para el mapa 4D y el dashboard.
//
// Entrada : catalogo_satelites.json (exportado de space-track.org por el equipo, ~70.000 objetos)
// Salidas : public/data/orbita.json         (elementos medios compactos, todos los objetos)
//           src/data/dashboard_orbita.json  (series para los gráficos: por año, país, tipo, nube ASAT)
//
// Uso: node --max-old-space-size=4096 etl/construir_orbita.mjs [ruta/al/catalogo.json]
//
// Nota: las posiciones se calculan en el navegador con las ecuaciones de Kepler (anexo técnico).
// Para objetos reentrados usamos su último elemento conocido; la posición es ilustrativa.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entrada = process.argv[2] || 'C:/Users/ASUS/Downloads/catalogo_satelites.json';

const PAIS = {
  US: 'EE. UU.', CIS: 'URSS/Rusia', PRC: 'China', FR: 'Francia', JPN: 'Japón', UK: 'Reino Unido',
  IND: 'India', ESA: 'ESA', GER: 'Alemania', IT: 'Italia', CA: 'Canadá', SPN: 'España', ITSO: 'Intelsat',
  ISRA: 'Israel', SKOR: 'Corea del Sur', AUS: 'Australia', BRAZ: 'Brasil', ARGN: 'Argentina', LUXE: 'Luxemburgo',
  NETH: 'Países Bajos', SWED: 'Suecia', NOR: 'Noruega', TURK: 'Turquía', UAE: 'Emiratos Árabes Unidos',
  SES: 'SES', GLOB: 'Globalstar', ORB: 'Orbcomm', O3B: 'O3b', IRID: 'Iridium', EUTE: 'Eutelsat', EUME: 'Eumetsat',
  TBD: 'Desconocido', null: 'Desconocido',
};
const TIPO = { PAYLOAD: 'P', 'ROCKET BODY': 'R', DEBRIS: 'D', UNKNOWN: 'U', TBA: 'U' };

// Nubes de fragmentación relevantes para las escenas 8 y 10 (nombre Space-Track → etiqueta corta)
const NUBES = [
  [/FENGYUN 1C DEB/, 'FY1C'],
  [/COSMOS 1408 DEB/, 'K1408'],
  [/IRIDIUM 33 DEB/, 'IR33'],
  [/COSMOS 2251 DEB/, 'K2251'],
  [/USA 193 DEB/, 'USA193'],
  [/MICROSAT-R DEB/, 'MSR'],
];

console.time('lectura');
const cat = JSON.parse(readFileSync(entrada, 'utf8'));
console.timeEnd('lectura');

const J2000 = Date.UTC(2000, 0, 1, 12);
const diasJ2000 = (iso) => (Date.parse(iso + (iso.length <= 10 ? 'T00:00:00Z' : 'Z')) - J2000) / 86400000;
const anioDecimal = (iso) => {
  if (!iso) return null;
  const d = new Date(iso.length <= 10 ? iso + 'T00:00:00Z' : iso + 'Z');
  const y = d.getUTCFullYear();
  const ini = Date.UTC(y, 0, 1), fin = Date.UTC(y + 1, 0, 1);
  return +(y + (d - ini) / (fin - ini)).toFixed(3);
};
const r = (x, n) => (x === null || x === undefined || x === '' ? null : +(+x).toFixed(n));

const filas = [];
let descartados = 0;
for (const o of cat) {
  const a = +o.SEMIMAJOR_AXIS;
  if (!a || a < 6400 || a > 500000) { descartados++; continue; }
  const anioLanz = o.LAUNCH_DATE ? anioDecimal(o.LAUNCH_DATE) : (/^(\d{4})-/.test(o.OBJECT_ID || '') ? +o.OBJECT_ID.slice(0, 4) : null);
  if (anioLanz === null) { descartados++; continue; }
  let nube = null;
  for (const [re, tag] of NUBES) if (re.test(o.OBJECT_NAME)) { nube = tag; break; }
  // [norad, nombre, tipo, pais, lanzamiento, reentrada|null, a, e, i, raan, argp, M, epoca(dias J2000), nube|null]
  filas.push([
    +o.NORAD_CAT_ID,
    o.OBJECT_NAME,
    TIPO[o.OBJECT_TYPE] || 'U',
    PAIS[o.COUNTRY_CODE] || o.COUNTRY_CODE || 'Desconocido',
    anioLanz,
    o.DECAY_DATE ? anioDecimal(o.DECAY_DATE) : null,
    Math.round(a),
    r(o.ECCENTRICITY, 4),
    r(o.INCLINATION, 1),
    r(o.RA_OF_ASC_NODE, 1),
    r(o.ARG_OF_PERICENTER, 1),
    r(o.MEAN_ANOMALY, 1),
    r(diasJ2000(o.EPOCH), 2),
    nube,
  ]);
}
filas.sort((x, y) => x[4] - y[4]);

mkdirSync(resolve(raiz, 'public/data'), { recursive: true });
const salida = {
  generado: new Date().toISOString().slice(0, 10),
  fuente: 'Space-Track.org (18 SPCS), catálogo OMM exportado por el equipo',
  campos: ['norad', 'nombre', 'tipo', 'pais', 'lanzamiento', 'reentrada', 'a_km', 'e', 'i_deg', 'raan_deg', 'argp_deg', 'M_deg', 'epoca_dias_J2000', 'nube'],
  tipos: { P: 'Carga útil', R: 'Etapa de cohete', D: 'Fragmento', U: 'Sin identificar' },
  nubes: { FY1C: 'Fengyun-1C (China, 2007)', K1408: 'Kosmos 1408 (Rusia, 2021)', IR33: 'Iridium 33 (choque 2009)', K2251: 'Kosmos 2251 (choque 2009)', USA193: 'USA-193 (EE. UU., 2008)', MSR: 'Microsat-R (India, 2019)' },
  total: filas.length,
  filas,
};
writeFileSync(resolve(raiz, 'public/data/orbita.json'), JSON.stringify(salida));
console.log('orbita.json', filas.length, 'objetos; descartados', descartados);

// ---------- Series para el dashboard ----------
const anios = [];
for (let y = 1957; y <= 2026; y++) {
  const enOrbita = filas.filter((f) => f[4] <= y + 1 && (f[5] === null || f[5] > y + 1)).length;
  const lanzados = filas.filter((f) => Math.floor(f[4]) === y).length;
  const reentrados = filas.filter((f) => f[5] !== null && Math.floor(f[5]) === y).length;
  anios.push({ anio: y, en_orbita: enOrbita, catalogados_nuevos: lanzados, reentrados });
}
const agrupar = (f) => {
  const m = new Map();
  for (const x of filas) if (x[5] === null) m.set(f(x), (m.get(f(x)) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([clave, n]) => ({ clave, n }));
};
const porPais = agrupar((x) => x[3]);
const top = porPais.slice(0, 7);
const otros = porPais.slice(7).reduce((s, p) => s + p.n, 0);
if (otros) top.push({ clave: 'Otros', n: otros });
const porTipo = agrupar((x) => salida.tipos[x[2]]);
const bandas = [['Órbita baja (< 2.000 km)', 0, 2000], ['Órbita media (2.000–35.000 km)', 2000, 35000], ['Geoestacionaria y más alta (> 35.000 km)', 35000, 1e9]];
const porAltura = bandas.map(([clave, lo, hi]) => ({ clave, n: filas.filter((x) => x[5] === null && x[6] - 6378 >= lo && x[6] - 6378 < hi).length }));
const porNube = Object.entries(salida.nubes).map(([tag, clave]) => ({
  clave, tag,
  catalogados: filas.filter((x) => x[13] === tag).length,
  en_orbita: filas.filter((x) => x[13] === tag && x[5] === null).length,
}));

mkdirSync(resolve(raiz, 'src/data'), { recursive: true });
writeFileSync(resolve(raiz, 'src/data/dashboard_orbita.json'), JSON.stringify({
  generado: salida.generado,
  fuente: salida.fuente,
  nota: 'Cuenta objetos catalogados por Space-Track (≥ ~10 cm). No incluye los que no se rastrean. "En órbita" = lanzado antes del fin del año y sin fecha de reentrada anterior.',
  total_catalogado: filas.length,
  en_orbita_hoy: filas.filter((x) => x[5] === null).length,
  por_anio: anios,
  por_pais: top,
  por_tipo: porTipo,
  por_altura: porAltura,
  nubes_asat: porNube,
}, null, 1));
console.log('dashboard_orbita.json listo. En órbita hoy:', filas.filter((x) => x[5] === null).length);
