// Traducción de los textos de src/data/objetos.json (español → inglés).
//
//   node etl/i18n_objetos.mjs extraer <carpeta>   → escribe <carpeta>/es_NN.txt con las cadenas únicas numeradas ("n|texto")
//   node etl/i18n_objetos.mjs armar <carpeta>     → lee <carpeta>/en_*.txt ("n|text") y genera src/data/objetos.en.json
//
// objetos.en.json guarda, por id, solo los campos de texto traducidos; src/data/objetos.js los superpone al original.
// Si se edita objetos.json, hay que volver a extraer, traducir las cadenas nuevas y armar.
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const ORIGEN = path.join(RAIZ, 'src/data/objetos.json');
const DESTINO = path.join(RAIZ, 'src/data/objetos.en.json');
const CAMPOS = ['nombre', 'mision', 'agencia', 'objeto', 'estado', 'casi_fallo', 'leccion', 'logro', 'por_que_termino', 'nota', 'historia', 'legado_cientifico', 'equipo_dejado', 'donde_esta', 'radiactivo_detalle', 'ubicacion'];
const POR_ARCHIVO = 16000; // caracteres aproximados por archivo de extracción

const objetos = JSON.parse(fs.readFileSync(ORIGEN, 'utf8')).objetos;

// Recorre todas las cadenas traducibles de un objeto: fn(cadena) → valor nuevo.
function mapear(o, fn) {
  const r = {};
  for (const c of CAMPOS) if (typeof o[c] === 'string' && o[c]) r[c] = fn(o[c]);
  if (o.texto) r.texto = { ninos: fn(o.texto.ninos), org: fn(o.texto.org) };
  if (o.faq?.length) r.faq = o.faq.map((f) => ({ pregunta: fn(f.pregunta), ninos: fn(f.ninos), org: fn(f.org) }));
  return r;
}

function unicas() {
  const lista = [], visto = new Map();
  for (const o of objetos) mapear(o, (s) => { if (!visto.has(s)) { visto.set(s, lista.length); lista.push(s); } return s; });
  return { lista, visto };
}

const [modo, carpeta] = process.argv.slice(2);
if (!modo || !carpeta) { console.error('uso: node etl/i18n_objetos.mjs extraer|armar <carpeta>'); process.exit(1); }

if (modo === 'extraer') {
  const { lista } = unicas();
  fs.mkdirSync(carpeta, { recursive: true });
  let n = 0, buf = [], tam = 0, total = 0;
  const volcar = () => { if (buf.length) fs.writeFileSync(path.join(carpeta, `es_${String(n++).padStart(2, '0')}.txt`), buf.join('\n') + '\n'); buf = []; tam = 0; };
  lista.forEach((s, i) => {
    if (/[\n|]/.test(s)) throw new Error(`La cadena ${i} contiene salto de línea o "|": ${s.slice(0, 60)}`);
    buf.push(`${i}|${s}`); tam += s.length; total += s.length;
    if (tam >= POR_ARCHIVO) volcar();
  });
  volcar();
  console.log(`${lista.length} cadenas únicas, ${total} caracteres, ${n} archivos en ${carpeta}`);
} else if (modo === 'armar') {
  const { lista, visto } = unicas();
  const en = new Map();
  for (const f of fs.readdirSync(carpeta).filter((x) => /^en_.*\.txt$/.test(x)).sort()) {
    for (const linea of fs.readFileSync(path.join(carpeta, f), 'utf8').split(/\r?\n/)) {
      if (!linea.trim()) continue;
      const m = linea.match(/^(\d+)\|(.*)$/);
      if (!m) throw new Error(`${f}: línea sin formato "n|texto": ${linea.slice(0, 60)}`);
      if (en.has(+m[1])) throw new Error(`${f}: índice repetido ${m[1]}`);
      en.set(+m[1], m[2].trim());
    }
  }
  const faltan = lista.map((_, i) => i).filter((i) => !en.get(i));
  if (faltan.length) console.warn(`Faltan ${faltan.length} cadenas (quedan en español): ${faltan.slice(0, 20).join(', ')}${faltan.length > 20 ? '…' : ''}`);
  const sobran = [...en.keys()].filter((i) => i >= lista.length);
  if (sobran.length) throw new Error(`Índices fuera de rango: ${sobran.join(', ')}`);
  const salida = {};
  for (const o of objetos) salida[o.id] = mapear(o, (s) => en.get(visto.get(s)) || s);
  fs.writeFileSync(DESTINO, JSON.stringify(salida, null, 1) + '\n');
  console.log(`${Object.keys(salida).length} objetos → ${path.relative(RAIZ, DESTINO)} (${en.size}/${lista.length} cadenas traducidas)`);
} else {
  console.error(`modo desconocido: ${modo}`); process.exit(1);
}
