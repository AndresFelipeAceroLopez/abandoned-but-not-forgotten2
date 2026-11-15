// Satélites sobre la Tierra con información real (public/data/satelites.json, 17.345 objetos del equipo: posición instantánea).
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../store/useAppStore';
import Escena3D from '../three/Escena3D';
import PlanetaGLB from '../three/PlanetaGLB';
import Narracion from '../ui/Narracion';
import { latLonAVec3, RADIOS_KM } from '../lib/geo';
import { num } from '../lib/formato';
import { t, tr } from '../i18n';

const COLOR_CAT = {
  ACTIVE_SATELLITE: '#3987e5', PAYLOAD: '#3987e5', INACTIVE_SATELLITE: '#9085e9', ROCKET_BODY: '#d95926', DEBRIS: '#8c8c86',
  UNKNOWN: '#5b5b57', TBA: '#5b5b57', STATION: '#c98500', ISS: '#c98500',
};
const colorCat = (c) => COLOR_CAT[c] || (/ACTIVE/.test(c) ? '#3987e5' : /ROCKET/.test(c) ? '#d95926' : /DEBRIS|FRAG/.test(c) ? '#8c8c86' : /STATION/.test(c) ? '#c98500' : '#199e70');
const bandas = () => [
  [tr('Todas', 'All'), 0, 1e9],
  [tr('Órbita baja (< 2.000 km)', 'Low orbit (< 2,000 km)'), 0, 2000],
  [tr('Media (2.000–35.000 km)', 'Medium (2,000–35,000 km)'), 2000, 35000],
  [tr('Geoestacionaria y más (> 35.000 km)', 'Geostationary and beyond (> 35,000 km)'), 35000, 1e9],
];

const pasos = () => [
  {
    titulo: tr('Satélites de verdad', 'Real satellites'),
    ninos: tr('Cada punto es un satélite o un pedazo real, con su nombre y su país. Toca uno para conocerlo.', 'Each dot is a real satellite or fragment, with its name and country. Tap one to meet it.'),
    org: tr('Posiciones instantáneas (lat, lon, altura) de 17.345 objetos catalogados, aportadas por el equipo. Es una foto fija: no se propagan en el tiempo.', 'Instantaneous positions (lat, lon, altitude) of 17,345 catalogued objects, provided by the team. It is a snapshot: they are not propagated in time.'),
    refs: [5],
  },
  {
    titulo: tr('Dos cinturones', 'Two belts'),
    ninos: tr('Casi todos viven muy cerca de la Tierra (órbita baja). Otros flotan lejos, quietos sobre un mismo lugar (geoestacionarios).', 'Almost all of them live very close to Earth (low orbit). Others float far away, hovering over the same spot (geostationary).'),
    org: tr('LEO concentra la mayoría; el anillo GEO a ~35.786 km se ve como una corona ecuatorial. Filtra por categoría, país o altura.', 'LEO holds the majority; the GEO ring at ~35,786 km shows up as an equatorial crown. Filter by category, country or altitude.'),
    refs: [5],
  },
  {
    titulo: tr('Activos e inactivos', 'Active and inactive'),
    ninos: tr('Los azules trabajan. Los morados ya se apagaron. Los naranjas son cohetes vacíos y los grises, pedazos.', 'The blue ones are working. The purple ones have shut down. The orange ones are empty rockets and the grey ones are fragments.'),
    org: tr('Categorías del catálogo del equipo. Los inactivos y los cuerpos de cohete son los candidatos a remoción activa (escena 13).', "Categories from the team's catalogue. Inactive satellites and rocket bodies are the candidates for active removal (scene 13)."),
    refs: [5],
  },
];

function Puntos({ filas, radio, onSelect, seleccionado }) {
  const geo = useMemo(() => {
    const n = filas.length;
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
    const v = new THREE.Vector3(), c = new THREE.Color();
    for (let k = 0; k < n; k++) {
      const f = filas[k];
      latLonAVec3(f[4], f[5], radio * (1 + f[6] / RADIOS_KM.tierra), v);
      pos.set([v.x, v.y, v.z], k * 3);
      c.set(colorCat(f[2]));
      col.set([c.r, c.g, c.b], k * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return g;
  }, [filas, radio]);
  const sel = seleccionado ? latLonAVec3(seleccionado[4], seleccionado[5], radio * (1 + seleccionado[6] / RADIOS_KM.tierra)) : null;
  return (
    <group>
      <points geometry={geo} onClick={(e) => { e.stopPropagation(); onSelect(filas[e.index]); }}>
        <pointsMaterial size={0.022} sizeAttenuation vertexColors transparent opacity={0.95} depthWrite={false} toneMapped={false} />
      </points>
      {sel && (
        <mesh position={sel}><sphereGeometry args={[0.03, 12, 12]} /><meshBasicMaterial color="#ffffff" toneMapped={false} /></mesh>
      )}
    </group>
  );
}

export default function Satelites() {
  const modo = useAppStore((s) => s.modo);
  const [datos, setDatos] = useState(null);
  const [sel, setSel] = useState(null);
  const [f, setF] = useState({ categoria: 'todas', pais: 'todos', banda: 0, q: '' });
  const rot = useRef();
  const BANDAS = useMemo(bandas, []);
  const PASOS = useMemo(pasos, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/satelites.json`).then((r) => r.json()).then(setDatos).catch(() => setDatos({ filas: [], categorias: {}, paises: {}, error: true }));
  }, []);

  const filas = useMemo(() => {
    if (!datos) return [];
    const q = f.q.trim().toUpperCase();
    const [, lo, hi] = BANDAS[f.banda];
    return datos.filas.filter((r) => (f.categoria === 'todas' || r[2] === f.categoria) && (f.pais === 'todos' || r[3] === f.pais) && r[6] >= lo && r[6] < hi && (!q || r[1].toUpperCase().includes(q)));
  }, [datos, f, BANDAS]);

  const categorias = datos ? Object.entries(datos.categorias) : [];
  const paises = datos ? Object.entries(datos.paises).map(([k, v]) => [k, t(v)]).sort((a, b) => a[1].localeCompare(b[1])) : [];
  const cat = sel ? t(datos.categorias[sel[2]] || sel[2]) : '';
  const pais = sel ? t(datos.paises[sel[3]] || sel[3]) : '';
  const altura = sel ? num(Math.round(sel[6] / 100) * 100, 0) : '';

  return (
    <div className="escena">
      <Escena3D camara={[0, 1.4, 4]} minDist={1.3} maxDist={14} onFondoClick={() => setSel(null)}>
        <group ref={rot}>
          <PlanetaGLB cuerpo="tierra" atmosfera />
          {datos && <Puntos filas={filas} radio={1} onSelect={setSel} seleccionado={sel} />}
        </group>
      </Escena3D>
      {!datos && <div className="cargando"><div className="panel" role="status">{tr('Cargando satélites…', 'Loading satellites…')}</div></div>}
      <div className="capa izq">
        <Narracion pasos={PASOS} />
        <div className="panel tenue">
          <div className="controles-mapa">
            <label>{tr('Categoría', 'Category')}
              <select value={f.categoria} onChange={(e) => setF({ ...f, categoria: e.target.value })}>
                <option value="todas">{tr('Todas', 'All')}</option>
                {categorias.map(([k, v]) => <option key={k} value={k}>{t(v)}</option>)}
              </select>
            </label>
            <label>{tr('País', 'Country')}
              <select value={f.pais} onChange={(e) => setF({ ...f, pais: e.target.value })}>
                <option value="todos">{tr('Todos', 'All')}</option>
                {paises.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label>{tr('Altura', 'Altitude')}
              <select value={f.banda} onChange={(e) => setF({ ...f, banda: +e.target.value })}>
                {BANDAS.map((b, i) => <option key={b[0]} value={i}>{b[0]}</option>)}
              </select>
            </label>
            <input type="text" aria-label={tr('Buscar por nombre', 'Search by name')} placeholder={tr('Nombre (p. ej. ISS, STARLINK)', 'Name (e.g. ISS, STARLINK)')} value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} />
          </div>
          <div className="leyenda" style={{ marginTop: 8 }}>
            <span><i style={{ background: '#3987e5' }} />{tr('Activo', 'Active')}</span><span><i style={{ background: '#9085e9' }} />{tr('Inactivo', 'Inactive')}</span><span><i style={{ background: '#d95926' }} />{tr('Cuerpo de cohete', 'Rocket body')}</span><span><i style={{ background: '#8c8c86' }} />{tr('Fragmento', 'Fragment')}</span><span><i style={{ background: '#c98500' }} />{tr('Estación', 'Station')}</span>
          </div>
          <small>{num(filas.length, 0)} {tr('de', 'of')} {datos ? num(datos.total, 0) : '…'} {tr('objetos · posiciones instantáneas del catálogo del equipo · tamaños aumentados', "objects · instantaneous positions from the team's catalogue · sizes enlarged")}</small>
        </div>
      </div>
      {sel && (
        <div className="capa der">
          <div className="panel ficha" aria-live="polite">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h2>{sel[1]}</h2><button className="btn chico" aria-label={tr('Cerrar', 'Close')} onClick={() => setSel(null)}>✕</button></div>
            <div className="meta">{cat} · {pais}</div>
            {modo === 'ninos' ? (
              <p className="cuento">
                {tr(
                  `Este objeto se llama ${sel[1]}. Es de ${datos.paises[sel[3]] || 'un país desconocido'} y está a unos ${altura} km de altura.`,
                  `This object is called ${sel[1]}. It belongs to ${datos.paises[sel[3]] ? pais : 'an unknown country'} and is about ${altura} km up.`,
                )}{' '}
                {/INACTIVE/.test(sel[2]) ? tr('Ya no funciona, pero sigue dando vueltas.', 'It no longer works, but it keeps circling.')
                  : /ROCKET/.test(sel[2]) ? tr('Es un cohete vacío que se quedó arriba.', 'It is an empty rocket that stayed up there.')
                  : /DEBRIS/.test(sel[2]) ? tr('Es un pedazo de algo que se rompió.', 'It is a piece of something that broke apart.')
                  : tr('Todavía trabaja.', 'It is still working.')}
              </p>
            ) : (
              <dl>
                <dt>NORAD</dt><dd>{sel[0]}</dd>
                <dt>{tr('Categoría', 'Category')}</dt><dd>{cat}</dd>
                <dt>{tr('Posición', 'Position')}</dt><dd>{num(sel[4])}°, {num(sel[5])}° · {num(sel[6], 0)} km</dd>
                <dt>{tr('Tamaño radar (RCS)', 'Radar size (RCS)')}</dt><dd>{t(sel[7]) || '—'}</dd>
                <dt>{tr('Fuente', 'Source')}</dt><dd>{tr('Catálogo del equipo (objects.json, orbital_objects); origen Space-Track', "Team's catalogue (objects.json, orbital_objects); originally from Space-Track")}</dd>
              </dl>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
