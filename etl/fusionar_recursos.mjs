// ETL · Fusiona los recursos del equipo con los datos de la app y genera un informe de cruce.
//
// Entradas : src/recursos/objects.json  (116 objetos en cuerpos, 51 referencias, 17 345 objetos orbitales)
//            src/recursos/data.json     (9 artefactos con historia, legado, hardware, masa, lanzamiento, órbita)
//            src/data/objetos.json      (catálogo de la app, 116 objetos; se conserva su esquema y sus valores)
//            src/data/referencias.json  (85 referencias de la app)
// Salidas  : src/data/objetos.json              (mismos objetos + campos opcionales del equipo)
//            src/data/referencias.json          (+ referencias del equipo que no estaban)
//            public/data/satelites.json         (instantánea de posiciones de orbital_objects)
//            src/data/dashboard_satelites.json  (series para el panel)
//            etl/informe_cruce.md               (informe de cruce en español)
//
// Reglas de fusión (resumen): lat/lon, fecha, banderas y masa de la app mandan; el equipo solo rellena huecos
// (masa, casi_fallo, leccion, logro) y aporta campos nuevos (estado, historia, legado, etc.). Toda diferencia
// se anota en el informe, nunca se corrige en silencio.
//
// Uso: node etl/fusionar_recursos.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (p) => JSON.parse(readFileSync(resolve(raiz, p), 'utf8'));
const HOY = new Date().toISOString().slice(0, 10);

console.time('lectura');
const equipo = leer('src/recursos/objects.json');
const dataJson = leer('src/recursos/data.json');
const app = leer('src/data/objetos.json');
const refsApp = leer('src/data/referencias.json');
console.timeEnd('lectura');

// =====================================================================================
// 1. OBJETOS
// =====================================================================================

const CUERPO = { Luna: 'luna', Marte: 'marte', 'Espacio profundo': 'espacio_profundo' };

// Sinónimos inglés → español para comparar nombres; palabras vacías que se ignoran.
const SINONIMOS = { descent: 'descenso', ascent: 'ascenso', subsatellite: 'subsatelite', boom: 'brazo', booster: 'cohete', '3rd': '3', mission: 'mision', helicopter: 'helicoptero' };
const IGNORAR = new Set(['etapa', 'del', 'de', 'la', 'el', 'los', 'las', 'y', 'modulo', 'lunar', 'lm', 'stage', 'craft', 'spacecraft', 'lander', 'mision', 'nave', 'sonda', 'plataforma', 'the', 'of', 'module', 'rover']);
const PALABRAS_TIPO = ['descenso', 'ascenso', 'subsatelite', 'brazo', 'centaur', 'cohete'];

const tokens = (s) => {
  if (!s) return [];
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ').trim().split(' ')
    .map((t) => SINONIMOS[t] || t).filter((t) => t && !IGNORAR.has(t));
};
const clave = (ts) => [...new Set(ts)].sort().join(' ');
const subconjunto = (a, b) => a.length > 0 && a.every((t) => b.includes(t));
const tipoDe = (ts) => PALABRAS_TIPO.find((p) => ts.includes(p)) || null;
const sinTipo = (ts) => ts.filter((t) => !PALABRAS_TIPO.includes(t) && t !== '3');

// Alias explícitos para los casos que ninguna heurística resuelve (se documentan en el informe).
const ALIAS = {
  'luna-intuitive-machines-2': 'luna-im-2-athena', // la app usa el nombre del módulo (Athena, IM-2)
};

const porId = new Map(app.objetos.map((o) => [o.id, o]));
const libres = new Set(app.objetos.map((o) => o.id)); // objetos de la app aún sin pareja
const emparejados = []; // { equipo, app, metodo }
let pendientes = [...equipo.objects];

const emparejar = (nombreMetodo, fn) => {
  const resto = [];
  for (const t of pendientes) {
    const candidatos = app.objetos.filter((a) => libres.has(a.id) && a.cuerpo === CUERPO[t.body]);
    const hallados = fn(t, candidatos);
    if (hallados.length === 1) {
      emparejados.push({ equipo: t, app: hallados[0], metodo: nombreMetodo });
      libres.delete(hallados[0].id);
    } else resto.push(t);
  }
  pendientes = resto;
};

// Paso 1: id exacto
emparejar('id', (t) => (libres.has(t.id) && porId.get(t.id).cuerpo === CUERPO[t.body] ? [porId.get(t.id)] : []));
// Paso 2: nombre normalizado idéntico (mismo conjunto de palabras)
emparejar('nombre', (t, c) => c.filter((a) => clave(tokens(a.nombre)) === clave(tokens(t.name))));
// Paso 3: las palabras del nombre del equipo están contenidas en el de la app (único en el cuerpo)
emparejar('nombre⊂', (t, c) => c.filter((a) => subconjunto(tokens(t.name), tokens(a.nombre))));
// Paso 3b: al revés, las palabras de la app contenidas en las del equipo
emparejar('nombre⊃', (t, c) => c.filter((a) => subconjunto(tokens(a.nombre), tokens(t.name))));
// Paso 4: misión + tipo de pieza (descenso/ascenso/subsatélite/brazo/cohete)
emparejar('mision+tipo', (t, c) => {
  const base = sinTipo(tokens(t.mission));
  const tipoT = tipoDe([...tokens(t.type), ...tokens(t.name), ...tokens(t.mission)]);
  return c.filter((a) => {
    const baseA = sinTipo(tokens(a.mision));
    return (clave(base) === clave(baseA) || subconjunto(base, baseA)) && tipoT === tipoDe(tokens(a.nombre));
  });
});
// Paso 5: alias explícito
emparejar('alias', (t) => (ALIAS[t.id] && libres.has(ALIAS[t.id]) ? [porId.get(ALIAS[t.id])] : []));

const sinParejaEquipo = pendientes;
const sinParejaApp = app.objetos.filter((o) => libres.has(o.id));
console.log(`Objetos emparejados: ${emparejados.length}/${equipo.objects.length}. Sin pareja (equipo): ${sinParejaEquipo.map((o) => o.id).join(', ') || '—'}. Sin pareja (app): ${sinParejaApp.map((o) => o.id).join(', ') || '—'}`);

// ---- Artefactos de data.json → objeto de la app (por nombre/misión; tabla explícita, son 9) ----
const ARTEFACTOS = {
  'apollo-11-lunar-module': 'luna-apollo-11-lm-descenso',
  'sojourner-rover': 'marte-pathfinder-sojourner',
  'spirit-rover': 'marte-spirit',
  'opportunity-rover': 'marte-opportunity',
  'viking-1-lander': 'marte-viking-1',
  'viking-2-lander': 'marte-viking-2',
  'phoenix-lander': 'marte-phoenix',
  'insight-lander': 'marte-insight',
  'ingenuity-helicopter': 'marte-ingenuity',
};
const artefactos = dataJson.flatMap((b) => b.artifacts);
for (const a of artefactos) if (!ARTEFACTOS[a.id] || !porId.has(ARTEFACTOS[a.id])) console.warn('AVISO: artefacto de data.json sin destino:', a.id);

// ---- Informe: acumuladores ----
const inf = {
  coordDiscrepancia: [], coordNoAdoptada: [], coordSoloApp: [], coordArtefacto: [],
  fechas: { igual: 0, precision: [], distinta: [], fechaFin: [], faltaEquipo: [], faltaApp: [] },
  lroc: [], paradero: [], masaRellenada: [], masaDistinta: [], huecos: { casi_fallo: 0, leccion: 0, logro: 0 },
  textoEquipoDistinto: [], metodos: {},
};
const difLon = (a, b) => { let d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
const r3 = (x) => +(+x).toFixed(3);
const vacio = (v) => v === null || v === undefined || v === '' || (Array.isArray(v) && !v.length);
const parametrosOrbitales = (p) => (p && Object.values(p).some((v) => v !== null && v !== undefined) ? p : null);

const NUEVOS = { estado: null, por_que_termino: null, nota: null, historia: null, legado_cientifico: null, equipo_dejado: null, donde_esta: null, parametros_orbitales: null, fecha_lanzamiento: null, imagen: null, etiquetas: null, texto_equipo: null, muestras_kg: null, fuente_equipo: false };
const porIdEquipo = new Map(emparejados.map((p) => [p.app.id, p]));
const porIdArtefacto = new Map(artefactos.filter((a) => ARTEFACTOS[a.id]).map((a) => [ARTEFACTOS[a.id], a]));

const objetosSalida = app.objetos.map((o) => {
  const n = { ...o, ...NUEVOS };
  let tocado = false;
  const poner = (k, v) => { if (!vacio(v) && vacio(n[k])) { n[k] = v; tocado = true; } };
  const par = porIdEquipo.get(o.id);
  if (par) {
    const t = par.equipo;
    inf.metodos[par.metodo] = (inf.metodos[par.metodo] || 0) + 1;
    poner('estado', t.status); poner('por_que_termino', t.why_it_ended); poner('nota', t.note);
    poner('historia', t.history); poner('legado_cientifico', t.scientific_legacy); poner('equipo_dejado', t.equipment_left);
    poner('donde_esta', t.where_is_it); poner('parametros_orbitales', parametrosOrbitales(t.orbital_parameters));
    poner('fecha_lanzamiento', t.launch_date); poner('imagen', t.path); poner('etiquetas', t.tags);
    poner('texto_equipo', t.text ? { ninos: t.text.kids ?? null, org: t.text.org ?? null } : null);
    poner('muestras_kg', t.samples_kg);
    // Huecos de la app que el equipo rellena
    if (vacio(o.masa_kg) && !vacio(t.mass_kg)) { n.masa_kg = t.mass_kg; tocado = true; inf.masaRellenada.push({ id: o.id, masa: t.mass_kg, origen: 'objects.json' }); }
    else if (!vacio(o.masa_kg) && !vacio(t.mass_kg) && o.masa_kg !== t.mass_kg) inf.masaDistinta.push({ id: o.id, app: o.masa_kg, equipo: t.mass_kg, origen: 'objects.json' });
    for (const [k, kt] of [['casi_fallo', 'near_failure'], ['leccion', 'lesson'], ['logro', 'achievement']]) {
      if (vacio(o[k]) && !vacio(t[kt])) { n[k] = t[kt]; tocado = true; inf.huecos[k]++; }
    }
    // Cruces (solo se anotan)
    const tl = t.coordinates?.lat ?? null, tg = t.coordinates?.lng ?? null;
    if (o.lat !== null && tl !== null) {
      const d = Math.max(Math.abs(o.lat - tl), difLon(o.lon, tg));
      if (d > 0.05) inf.coordDiscrepancia.push({ id: o.id, app: [o.lat, o.lon], equipo: [tl, tg], delta: r3(d) });
    } else if (o.lat === null && tl !== null) inf.coordNoAdoptada.push({ id: o.id, equipo: [tl, tg], nota: t.note });
    else if (o.lat !== null && tl === null) inf.coordSoloApp.push({ id: o.id, app: [o.lat, o.lon] });
    const fa = o.fecha ?? null, fe = t.date ?? null;
    if (fa && fe) {
      if (fa === fe) inf.fechas.igual++;
      else if (o.cuerpo === 'espacio_profundo' && o.fecha_fin === fe) inf.fechas.fechaFin.push({ id: o.id, app: fa, fin: o.fecha_fin, equipo: fe });
      else if (fa.startsWith(fe) || fe.startsWith(fa)) inf.fechas.precision.push({ id: o.id, app: fa, equipo: fe });
      else inf.fechas.distinta.push({ id: o.id, app: fa, equipo: fe });
    } else if (fa && !fe) inf.fechas.faltaEquipo.push({ id: o.id, app: fa });
    else if (!fa && fe) inf.fechas.faltaApp.push({ id: o.id, equipo: fe });
    if (!!o.verificado_lroc !== !!t.lroc_verified) inf.lroc.push({ id: o.id, app: !!o.verificado_lroc, equipo: !!t.lroc_verified });
    if (!!o.paradero_desconocido !== !!t.whereabouts_unknown) inf.paradero.push({ id: o.id, app: !!o.paradero_desconocido, equipo: !!t.whereabouts_unknown });
  }
  const art = porIdArtefacto.get(o.id);
  if (art) {
    for (const [k, ka] of [['historia', 'story'], ['legado_cientifico', 'science_legacy'], ['equipo_dejado', 'hardware_left']]) {
      if (!vacio(n[k]) && !vacio(art[ka]) && n[k] !== art[ka]) inf.textoEquipoDistinto.push({ id: o.id, campo: k });
      poner(k, art[ka]);
    }
    poner('fecha_lanzamiento', art.launch_date);
    poner('parametros_orbitales', parametrosOrbitales(art.orbital_parameters));
    poner('estado', art.status);
    if (vacio(o.masa_kg) && !vacio(art.mass_kg)) { n.masa_kg = art.mass_kg; tocado = true; inf.masaRellenada.push({ id: o.id, masa: art.mass_kg, origen: 'data.json' }); }
    else if (!vacio(o.masa_kg) && !vacio(art.mass_kg) && o.masa_kg !== art.mass_kg && !inf.masaDistinta.some((x) => x.id === o.id && x.equipo === art.mass_kg)) inf.masaDistinta.push({ id: o.id, app: o.masa_kg, equipo: art.mass_kg, origen: 'data.json' });
    const al = art.coordinates?.lat ?? null, ag = art.coordinates?.lng ?? null;
    if (o.lat !== null && al !== null) {
      const d = Math.max(Math.abs(o.lat - al), difLon(o.lon, ag));
      if (d > 0.05) inf.coordArtefacto.push({ id: o.id, artefacto: art.id, app: [o.lat, o.lon], equipo: [al, ag], delta: r3(d) });
    }
  }
  n.fuente_equipo = tocado;
  return n;
});

const conEquipo = objetosSalida.filter((o) => o.fuente_equipo).length;
writeFileSync(resolve(raiz, 'src/data/objetos.json'), JSON.stringify({
  ...app,
  objetos: objetosSalida,
  fusion_equipo: { fecha: HOY, fuente: 'src/recursos/objects.json y data.json', objetos_con_datos_del_equipo: conEquipo, informe: 'etl/informe_cruce.md' },
}, null, 2));
console.log(`objetos.json: ${objetosSalida.length} objetos, ${conEquipo} con datos del equipo.`);

// =====================================================================================
// 2. REFERENCIAS
// =====================================================================================

const normUrl = (u) => (u || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/:443(?=\/|$)/, '').replace(/\/+$/, '');
const dominio = (u) => normUrl(u).split('/')[0];
const urlsApp = new Map();
for (const r of refsApp.referencias) for (const u of [r.url, ...(r.urls_extra || [])]) if (u) urlsApp.set(normUrl(u), r.id);

// Regla de "primaria": dominios ya clasificados en referencias.json; si es nuevo, oficial (.gov/.mil/.edu/.int/ONU/ESA) → primaria.
const dominioPrimario = new Map();
for (const r of refsApp.referencias) dominioPrimario.set(dominio(r.url), r.primaria);
const esPrimaria = (u) => {
  const d = dominio(u);
  if (dominioPrimario.has(d)) return dominioPrimario.get(d);
  return /(\.gov|\.mil|\.edu|\.int|\.gob)$|nasa\.gov$|esa\.int$|unoosa\.org$|un\.org$/.test(d);
};

const ABREV = new Set(['st', 'dr', 'mr', 'jr', 'vs', 'cf', 'et', 'al', 'inc', 'vol', 'no', 'p', 'pp']);
const limpiarTitulo = (s) => s.trim().replace(/\.+$/, '').trim();
function parsearCita(c) {
  c = c.trim();
  let m = c.match(/^(.+?)\s*\((\d{4})\)\.?$/); // "Título (año)." sin autor
  if (m) return { autor: null, anio: m[2], titulo: limpiarTitulo(m[1]) };
  m = c.match(/^(.+?)\s*\(([^)]*)\)\.\s*(.+)$/); // "Autor (año). Título."
  if (m) return { autor: m[1].trim(), anio: (m[2].match(/\d{4}/) || [null])[0], titulo: limpiarTitulo(m[3]) };
  m = c.match(/^(.+?)\s*\((\d{4})[^)]*\)[,.]?\s*(.*)$/); // "Autor (año), resto" → el resto suele ser solo "vía X": se deja la cita completa
  if (m) return { autor: m[1].trim(), anio: m[2], titulo: limpiarTitulo(c) };
  // "Autor. Título." — se corta en el primer ". " que no siga a una inicial o abreviatura
  const re = /\.\s+/g; let p;
  while ((p = re.exec(c))) {
    const antes = c.slice(0, p.index); const ultima = (antes.match(/([A-Za-zÁ-ú]+)$/) || ['', ''])[1];
    if (ultima.length > 1 && !ABREV.has(ultima.toLowerCase())) return { autor: antes.trim(), anio: null, titulo: limpiarTitulo(c.slice(p.index + p[0].length)) };
  }
  return { autor: null, anio: null, titulo: limpiarTitulo(c) };
}

const refsCoinciden = [], refsNuevas = [];
let siguienteId = Math.max(...refsApp.referencias.map((r) => r.id)) + 1;
const gruposSalida = [...refsApp.grupos];
for (const r of equipo.references) {
  const n = normUrl(r.url);
  if (urlsApp.has(n)) { refsCoinciden.push({ numero: r.number, id_app: urlsApp.get(n), url: r.url }); continue; }
  const { autor, anio, titulo } = parsearCita(r.citation);
  const nueva = {
    id: siguienteId++,
    grupo: r.section,
    autor, anio, titulo,
    publicacion: null,
    url: r.url,
    urls_extra: [],
    nota: 'Aportada por el equipo (objects.json)',
    primaria: esPrimaria(r.url),
    aportada_por_equipo: true,
  };
  if (!gruposSalida.includes(r.section)) gruposSalida.push(r.section);
  refsNuevas.push({ ...nueva, numero_equipo: r.number, cita: r.citation });
  urlsApp.set(n, nueva.id);
}
writeFileSync(resolve(raiz, 'src/data/referencias.json'), JSON.stringify({
  ...refsApp,
  grupos: gruposSalida,
  referencias: [...refsApp.referencias, ...refsNuevas.map(({ numero_equipo, cita, ...r }) => r)],
}, null, 2));
console.log(`referencias.json: ${refsCoinciden.length} del equipo ya estaban, ${refsNuevas.length} añadidas (ids ${refsNuevas[0]?.id}–${refsNuevas.at(-1)?.id}).`);

// =====================================================================================
// 3. SATÉLITES (instantánea de orbital_objects)
// =====================================================================================

const categorias = {}, paises = {};
const filas = [];
const omitidos = { sin_datos: 0, altura_no_positiva: 0, altura_mayor_100000: 0 };
for (const s of equipo.orbital_objects) {
  if (s.lat === null || s.lon === null || s.altitude_km === null || s.lat === undefined || s.lon === undefined || s.altitude_km === undefined) { omitidos.sin_datos++; continue; }
  if (s.altitude_km <= 0) { omitidos.altura_no_positiva++; continue; }
  if (s.altitude_km > 100000) { omitidos.altura_mayor_100000++; continue; }
  if (s.category) categorias[s.category] = s.category_name || s.category;
  if (s.country) paises[s.country] = s.country_name || s.country;
  filas.push([s.norad_id, s.name, s.category, s.country, r3(s.lat), r3(s.lon), Math.round(s.altitude_km), s.rcs ?? null]);
}
const totalOmitidos = Object.values(omitidos).reduce((a, b) => a + b, 0);
mkdirSync(resolve(raiz, 'public/data'), { recursive: true });
writeFileSync(resolve(raiz, 'public/data/satelites.json'), JSON.stringify({
  generado: HOY,
  fuente: 'objects.json del equipo (orbital_objects), posiciones instantáneas',
  nota: `Instantánea: cada fila es la posición (lat, lon, altura) calculada por el equipo en un único instante cuya época no está documentada en el archivo. No representa posiciones actuales ni permite propagar órbitas; para eso está public/data/orbita.json. Se omitieron ${totalOmitidos} filas de ${equipo.orbital_objects.length} (sin lat/lon/altura: ${omitidos.sin_datos}; altura ≤ 0 km: ${omitidos.altura_no_positiva}; altura > 100 000 km: ${omitidos.altura_mayor_100000}).`,
  categorias,
  paises,
  campos: ['norad', 'nombre', 'categoria', 'pais', 'lat', 'lon', 'alt_km', 'rcs'],
  total: filas.length,
  filas,
}));
console.log(`satelites.json: ${filas.length} filas; omitidas ${totalOmitidos}`, omitidos);

const contar = (f, etiqueta) => {
  const m = new Map();
  for (const x of filas) { const k = f(x); m.set(k, (m.get(k) || 0) + 1); }
  return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([codigo, n]) => ({ clave: etiqueta(codigo), codigo, n }));
};
const porCategoria = contar((x) => x[2], (c) => categorias[c] || c);
const porPaisTodos = contar((x) => x[3], (c) => paises[c] || c || 'Desconocido');
const porPais = porPaisTodos.slice(0, 10);
const otros = porPaisTodos.slice(10).reduce((s, p) => s + p.n, 0);
if (otros) porPais.push({ clave: 'Otros', codigo: null, n: otros });
const BANDAS = [['< 500 km', 0, 500], ['500–1.000 km', 500, 1000], ['1.000–2.000 km', 1000, 2000], ['2.000–20.000 km', 2000, 20000], ['20.000–36.000 km', 20000, 36000], ['> 36.000 km', 36000, Infinity]];
const porAltura = BANDAS.map(([clave, lo, hi]) => ({ clave, n: filas.filter((x) => x[6] >= lo && x[6] < hi).length }));
const RCS = { SMALL: 'Pequeño (< 0,1 m²)', MEDIUM: 'Mediano (0,1–1 m²)', LARGE: 'Grande (> 1 m²)', 'N/A': 'Sin dato' };
const porRcs = contar((x) => x[7] ?? 'N/A', (c) => RCS[c] || c).map(({ clave, n }) => ({ clave, n }));
writeFileSync(resolve(raiz, 'src/data/dashboard_satelites.json'), JSON.stringify({
  generado: HOY,
  fuente: 'objects.json del equipo (orbital_objects)',
  nota: 'Instantánea de posiciones sin época documentada; cuenta solo objetos inactivos, cuerpos de cohete y fragmentos incluidos por el equipo (no es el catálogo completo).',
  total: filas.length,
  por_categoria: porCategoria,
  por_pais: porPais,
  por_altura: porAltura,
  por_rcs: porRcs,
}, null, 1));
console.log('dashboard_satelites.json listo.');

// =====================================================================================
// 4. INFORME
// =====================================================================================

const fmt = (v) => (v === null || v === undefined ? '—' : String(v));
const lista = (arr, f) => (arr.length ? arr.map((x) => `- ${f(x)}`).join('\n') : '- (ninguno)');
const tabla = (cab, filasT) => (filasT.length ? [`| ${cab.join(' | ')} |`, `| ${cab.map(() => '---').join(' | ')} |`, ...filasT.map((f) => `| ${f.map(fmt).join(' | ')} |`)].join('\n') : '(ninguna)');
const metodos = Object.entries(inf.metodos).map(([m, n]) => `${m}: ${n}`).join(', ');

const md = `# Informe de cruce · recursos del equipo vs. datos de la app

Generado: ${HOY} por \`etl/fusionar_recursos.mjs\`.

Entradas: \`src/recursos/objects.json\` (${equipo.objects.length} objetos, ${equipo.references.length} referencias, ${equipo.orbital_objects.length} objetos orbitales) y \`src/recursos/data.json\` (${artefactos.length} artefactos). Catálogo de la app: ${app.objetos.length} objetos y ${refsApp.referencias.length} referencias.

## 1. Objetos

- Emparejados: **${emparejados.length} de ${equipo.objects.length}** (método: ${metodos}).
- Objetos de la app con algún dato del equipo (\`fuente_equipo: true\`): ${conEquipo}.
- Huecos rellenados desde el equipo: masa_kg ${inf.masaRellenada.length}, casi_fallo ${inf.huecos.casi_fallo}, leccion ${inf.huecos.leccion}, logro ${inf.huecos.logro}.
- Artefactos de \`data.json\` volcados: ${artefactos.length} (${artefactos.map((a) => `${a.id} → ${ARTEFACTOS[a.id] || '?'}`).join('; ')}).

### 1.1 Sin pareja

Equipo (no existen en la app):
${lista(sinParejaEquipo, (o) => `\`${o.id}\` — ${o.name} (${o.body}, ${fmt(o.date)}, ${fmt(o.coordinates?.lat)}, ${fmt(o.coordinates?.lng)})`)}

App (no existen en objects.json del equipo):
${lista(sinParejaApp, (o) => `\`${o.id}\` — ${o.nombre}${porIdArtefacto.has(o.id) ? ' (recibe el artefacto de data.json)' : ''}`)}

Nota: el equipo agrupa Perseverance e Ingenuity en un solo registro (\`marte-perseverance-ingenuity\`); se emparejó con \`marte-perseverance\` y el helicóptero recibe su ficha desde \`data.json\`.

### 1.2 Coordenadas

Regla: se conservan las de la app (cotejadas con el NSSDCA). Se listan diferencias mayores de 0,05°.

Discrepancias (ambas con valor) — ${inf.coordDiscrepancia.length}:

${tabla(['id', 'app lat', 'app lon', 'equipo lat', 'equipo lng', 'delta máx (°)'], inf.coordDiscrepancia.map((x) => [x.id, x.app[0], x.app[1], x.equipo[0], x.equipo[1], x.delta]))}

Coordenadas del equipo NO adoptadas (la app las tiene en null / paradero desconocido) — ${inf.coordNoAdoptada.length}:

${tabla(['id', 'equipo lat', 'equipo lng', 'nota del equipo'], inf.coordNoAdoptada.map((x) => [x.id, x.equipo[0], x.equipo[1], x.nota]))}

Objetos con coordenadas en la app pero sin coordenadas en el equipo — ${inf.coordSoloApp.length}:

${tabla(['id', 'app lat', 'app lon'], inf.coordSoloApp.map((x) => [x.id, x.app[0], x.app[1]]))}

Luna 2: la app y el equipo coinciden en 30, 0; según la nota del equipo y el código NSSDCA "a" es una aproximación (zona 29–31 N, 1 W–1 E), no un sitio identificado.

Diferencias con los artefactos de \`data.json\` (informativas) — ${inf.coordArtefacto.length}:

${tabla(['id', 'artefacto', 'app lat', 'app lon', 'data.json lat', 'data.json lng', 'delta máx (°)'], inf.coordArtefacto.map((x) => [x.id, x.artefacto, x.app[0], x.app[1], x.equipo[0], x.equipo[1], x.delta]))}

### 1.3 Fechas (\`fecha\` vs \`date\`)

- Iguales: ${inf.fechas.igual}.
- Misma fecha con distinta precisión (año vs día): ${inf.fechas.precision.length}.
- Distintas: ${inf.fechas.distinta.length}.
- Espacio profundo: el equipo usa la fecha de fin de misión, que coincide con \`fecha_fin\` de la app (\`fecha\` es el lanzamiento): ${inf.fechas.fechaFin.length}.
- Sin fecha en el equipo: ${inf.fechas.faltaEquipo.length}. Sin fecha en la app: ${inf.fechas.faltaApp.length}.

Distintas:

${tabla(['id', 'app', 'equipo'], inf.fechas.distinta.map((x) => [x.id, x.app, x.equipo]))}

Coinciden con \`fecha_fin\` (espacio profundo):

${tabla(['id', 'app fecha', 'app fecha_fin', 'equipo date'], inf.fechas.fechaFin.map((x) => [x.id, x.app, x.fin, x.equipo]))}

Distinta precisión:

${tabla(['id', 'app', 'equipo'], inf.fechas.precision.map((x) => [x.id, x.app, x.equipo]))}

Sin fecha en el equipo: ${inf.fechas.faltaEquipo.map((x) => `\`${x.id}\` (app: ${x.app})`).join(', ') || '—'}.

Sin fecha en la app: ${inf.fechas.faltaApp.map((x) => `\`${x.id}\` (equipo: ${x.equipo})`).join(', ') || '—'}.

### 1.4 Banderas

\`verificado_lroc\` vs \`lroc_verified\` — ${inf.lroc.length} diferencias:

${tabla(['id', 'app', 'equipo'], inf.lroc.map((x) => [x.id, x.app, x.equipo]))}

\`paradero_desconocido\` vs \`whereabouts_unknown\` — ${inf.paradero.length} diferencias (${inf.paradero.filter((x) => x.id.startsWith('espacio-profundo')).length} son de espacio profundo, donde el equipo marca "desconocido" por no tener lat/lon mientras la app usa \`ubicacion\` y paradero conocido; el resto son diferencias reales de criterio):

${tabla(['id', 'app', 'equipo'], inf.paradero.map((x) => [x.id, x.app, x.equipo]))}

### 1.5 Masa

Rellenada desde el equipo (la app la tenía en null) — ${inf.masaRellenada.length}:

${tabla(['id', 'masa_kg', 'origen'], inf.masaRellenada.map((x) => [x.id, x.masa, x.origen]))}

Ambas con valor pero distintas (se conserva la de la app) — ${inf.masaDistinta.length}:

${tabla(['id', 'app', 'equipo', 'origen'], inf.masaDistinta.map((x) => [x.id, x.app, x.equipo, x.origen]))}

Lectura: el 15 103 kg del equipo para Apollo 11 es el módulo lunar completo (la app guarda la etapa de descenso); 10,5 kg es solo el rover Sojourner (la app guarda módulo + rover); 1,8 kg es Ingenuity (registro combinado del equipo, emparejado con Perseverance).

### 1.6 Textos de data.json vs objects.json

Campos donde \`objects.json\` y \`data.json\` traen textos distintos para el mismo objeto (se conserva el de \`objects.json\`): ${inf.textoEquipoDistinto.length ? inf.textoEquipoDistinto.map((x) => `\`${x.id}\`.${x.campo}`).join(', ') : 'ninguno'}.

## 2. Referencias

- Referencias del equipo: ${equipo.references.length}. Ya estaban en la app (misma URL normalizada): **${refsCoinciden.length}**. Añadidas: **${refsNuevas.length}** (ids ${refsNuevas[0]?.id ?? '—'}–${refsNuevas.at(-1)?.id ?? '—'}).
- Grupos nuevos: ${gruposSalida.length > refsApp.grupos.length ? gruposSalida.slice(refsApp.grupos.length).join(', ') : 'ninguno'}.

Coincidencias (n.º equipo → id app): ${refsCoinciden.map((x) => `${x.numero}→${x.id_app}`).join(', ') || '—'}.

Añadidas:

${tabla(['id', 'n.º equipo', 'grupo', 'autor', 'año', 'título', 'primaria', 'url'], refsNuevas.map((r) => [r.id, r.numero_equipo, r.grupo, r.autor, r.anio, r.titulo, r.primaria, r.url]))}

## 3. Satélites (instantánea)

- Filas de entrada: ${equipo.orbital_objects.length}. Escritas en \`public/data/satelites.json\`: **${filas.length}**.
- Omitidas: ${totalOmitidos} (sin lat/lon/altura: ${omitidos.sin_datos}; altura ≤ 0 km: ${omitidos.altura_no_positiva}; altura > 100 000 km: ${omitidos.altura_mayor_100000}).
- Época de las posiciones: no documentada en el archivo; se trata como instantánea ilustrativa.
- Por categoría: ${porCategoria.map((c) => `${c.clave} ${c.n}`).join(', ')}.
- Por altura: ${porAltura.map((c) => `${c.clave}: ${c.n}`).join(', ')}.
`;
writeFileSync(resolve(raiz, 'etl/informe_cruce.md'), md);
console.log('informe_cruce.md escrito.');
console.log(`Resumen: coord. discrepantes ${inf.coordDiscrepancia.length}, no adoptadas ${inf.coordNoAdoptada.length}, fechas distintas ${inf.fechas.distinta.length} (+${inf.fechas.precision.length} precisión), lroc ${inf.lroc.length}, paradero ${inf.paradero.length}.`);
