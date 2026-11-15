// ETL · Validación de src/data/objetos.json y referencias.json antes de publicar.
// Comprueba: claves obligatorias, lat ±90 / lon ±180, paradero_desconocido coherente, fuente_url,
// textos en los dos modos, ids únicos, fuente_ids existentes, y lista 10 filas Apollo para cotejar a mano con el NSSDCA.
// Uso: node etl/validar_datos.mjs   (sale con código 1 si hay errores)
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const datos = JSON.parse(readFileSync(resolve(raiz, 'src/data/objetos.json'), 'utf8'));
const refs = JSON.parse(readFileSync(resolve(raiz, 'src/data/referencias.json'), 'utf8'));
const refIds = new Set(refs.referencias.map((r) => r.id));

const CLAVES = ['id', 'cuerpo', 'nombre', 'mision', 'programa', 'pais', 'agencia', 'objeto', 'tipo', 'fecha', 'lat', 'lon', 'paradero_desconocido', 'verificado_lroc', 'codigos_nssdca', 'masa_kg', 'activo', 'patrimonio', 'radiactivo', 'radiactivo_detalle', 'a_proposito', 'casi_fallo', 'leccion', 'logro', 'texto', 'faq', 'fuente_ids', 'fuente_url', 'verificado_fuente'];
const TIPOS = new Set(['aterrizaje', 'impacto', 'estrellado', 'orbita', 'trayectoria', 'en_orbita_de']);
const errores = [], avisos = [];
const ids = new Set();

for (const o of datos.objetos) {
  const e = (m) => errores.push(`${o.id || '(sin id)'}: ${m}`);
  for (const k of CLAVES) if (!(k in o)) e(`falta la clave "${k}"`);
  if (ids.has(o.id)) e('id duplicado'); ids.add(o.id);
  if (!TIPOS.has(o.tipo)) e(`tipo inválido "${o.tipo}"`);
  if (o.lat !== null && (typeof o.lat !== 'number' || o.lat < -90 || o.lat > 90)) e(`lat fuera de rango: ${o.lat}`);
  if (o.lon !== null && (typeof o.lon !== 'number' || o.lon < -180 || o.lon > 180)) e(`lon fuera de rango: ${o.lon}`);
  if (o.cuerpo !== 'espacio_profundo' && (o.lat === null) !== !!o.paradero_desconocido) e('paradero_desconocido no coincide con lat null');
  if (!o.fuente_url || !/^https?:\/\//.test(o.fuente_url)) e('fuente_url ausente o inválida');
  if (!o.texto?.ninos || !o.texto?.org) e('faltan texto.ninos o texto.org');
  if (!Array.isArray(o.faq) || o.faq.length < 2) avisos.push(`${o.id}: menos de 2 preguntas frecuentes`);
  for (const r of o.fuente_ids || []) if (!refIds.has(r)) e(`fuente_id ${r} no existe en referencias.json`);
  if (o.radiactivo && !o.radiactivo_detalle) avisos.push(`${o.id}: radiactivo sin detalle`);
  if (/\b(heces|orina|desechos humanos)\b/i.test(JSON.stringify(o)) && o.cuerpo === 'marte') e('menciona desechos humanos en Marte (mito a evitar)');
  if (!o.verificado_fuente) avisos.push(`${o.id}: no verificado contra la fuente primaria`);
}

const porCuerpo = {};
for (const o of datos.objetos) porCuerpo[o.cuerpo] = (porCuerpo[o.cuerpo] || 0) + 1;
console.log('Objetos:', datos.objetos.length, porCuerpo);
console.log('Paradero desconocido:', datos.objetos.filter((o) => o.paradero_desconocido).length, '· vistos por LRO:', datos.objetos.filter((o) => o.verificado_lroc).length, '· activos:', datos.objetos.filter((o) => o.activo).length);
console.log('Referencias:', refs.referencias.length);

const apollo = datos.objetos.filter((o) => o.programa === 'Apollo');
console.log(`\nApollo (${apollo.length} filas). Cotejar a mano con https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html:`);
for (const o of apollo.slice(0, 10)) console.log(`  ${o.fecha}  ${o.nombre.padEnd(42)} lat ${String(o.lat).padStart(9)}  lon ${String(o.lon).padStart(9)}  [${(o.codigos_nssdca || []).join('')}]`);
const faltanTextos = apollo.filter((o) => !o.texto?.ninos || !o.texto?.org).length;
console.log(`Apollo con las dos versiones de texto: ${apollo.length - faltanTextos}/${apollo.length}`);

if (avisos.length) { console.log(`\nAvisos (${avisos.length}):`); for (const a of avisos.slice(0, 20)) console.log('  -', a); if (avisos.length > 20) console.log(`  … y ${avisos.length - 20} más`); }
if (errores.length) { console.error(`\nERRORES (${errores.length}):`); for (const x of errores) console.error('  -', x); process.exit(1); }
console.log('\nValidación OK.');
