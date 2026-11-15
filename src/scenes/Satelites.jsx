// Satélites sobre la Tierra con información real (public/data/satelites.json, 17.345 objetos del equipo: posición instantánea).
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../store/useAppStore';
import Escena3D from '../three/Escena3D';
import PlanetaGLB from '../three/PlanetaGLB';
import Narracion from '../ui/Narracion';
import { latLonAVec3, RADIOS_KM } from '../lib/geo';
import { num } from '../lib/formato';

const COLOR_CAT = {
  ACTIVE_SATELLITE: '#3987e5', PAYLOAD: '#3987e5', INACTIVE_SATELLITE: '#9085e9', ROCKET_BODY: '#d95926', DEBRIS: '#8c8c86',
  UNKNOWN: '#5b5b57', TBA: '#5b5b57', STATION: '#c98500', ISS: '#c98500',
};
const colorCat = (c) => COLOR_CAT[c] || (/ACTIVE/.test(c) ? '#3987e5' : /ROCKET/.test(c) ? '#d95926' : /DEBRIS|FRAG/.test(c) ? '#8c8c86' : /STATION/.test(c) ? '#c98500' : '#199e70');
const BANDAS = [['Todas', 0, 1e9], ['Órbita baja (< 2.000 km)', 0, 2000], ['Media (2.000–35.000 km)', 2000, 35000], ['Geoestacionaria y más (> 35.000 km)', 35000, 1e9]];

const PASOS = [
  { titulo: 'Satélites de verdad', ninos: 'Cada punto es un satélite o un pedazo real, con su nombre y su país. Toca uno para conocerlo.', org: 'Posiciones instantáneas (lat, lon, altura) de 17.345 objetos catalogados, aportadas por el equipo. Es una foto fija: no se propagan en el tiempo.', refs: [5] },
  { titulo: 'Dos cinturones', ninos: 'Casi todos viven muy cerca de la Tierra (órbita baja). Otros flotan lejos, quietos sobre un mismo lugar (geoestacionarios).', org: 'LEO concentra la mayoría; el anillo GEO a ~35.786 km se ve como una corona ecuatorial. Filtra por categoría, país o altura.', refs: [5] },
  { titulo: 'Activos e inactivos', ninos: 'Los azules trabajan. Los morados ya se apagaron. Los naranjas son cohetes vacíos y los grises, pedazos.', org: 'Categorías del catálogo del equipo. Los inactivos y los cuerpos de cohete son los candidatos a remoción activa (escena 13).', refs: [5] },
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

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/satelites.json`).then((r) => r.json()).then(setDatos).catch(() => setDatos({ filas: [], categorias: {}, paises: {}, error: true }));
  }, []);

  const filas = useMemo(() => {
    if (!datos) return [];
    const q = f.q.trim().toUpperCase();
    const [, lo, hi] = BANDAS[f.banda];
    return datos.filas.filter((r) => (f.categoria === 'todas' || r[2] === f.categoria) && (f.pais === 'todos' || r[3] === f.pais) && r[6] >= lo && r[6] < hi && (!q || r[1].toUpperCase().includes(q)));
  }, [datos, f]);

  const categorias = datos ? Object.entries(datos.categorias) : [];
  const paises = datos ? Object.entries(datos.paises).sort((a, b) => a[1].localeCompare(b[1])) : [];

  return (
    <div className="escena">
      <Escena3D camara={[0, 1.4, 4]} minDist={1.3} maxDist={14} onFondoClick={() => setSel(null)}>
        <group ref={rot}>
          <PlanetaGLB cuerpo="tierra" atmosfera />
          {datos && <Puntos filas={filas} radio={1} onSelect={setSel} seleccionado={sel} />}
        </group>
      </Escena3D>
      {!datos && <div className="cargando"><div className="panel">Cargando satélites…</div></div>}
      <div className="capa izq">
        <Narracion pasos={PASOS} />
        <div className="panel tenue">
          <div className="controles-mapa">
            <label>Categoría
              <select value={f.categoria} onChange={(e) => setF({ ...f, categoria: e.target.value })}>
                <option value="todas">Todas</option>
                {categorias.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label>País
              <select value={f.pais} onChange={(e) => setF({ ...f, pais: e.target.value })}>
                <option value="todos">Todos</option>
                {paises.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label>Altura
              <select value={f.banda} onChange={(e) => setF({ ...f, banda: +e.target.value })}>
                {BANDAS.map((b, i) => <option key={b[0]} value={i}>{b[0]}</option>)}
              </select>
            </label>
            <input type="text" placeholder="Nombre (p. ej. ISS, STARLINK)" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} />
          </div>
          <div className="leyenda" style={{ marginTop: 8 }}>
            <span><i style={{ background: '#3987e5' }} />Activo</span><span><i style={{ background: '#9085e9' }} />Inactivo</span><span><i style={{ background: '#d95926' }} />Cuerpo de cohete</span><span><i style={{ background: '#8c8c86' }} />Fragmento</span><span><i style={{ background: '#c98500' }} />Estación</span>
          </div>
          <small>{num(filas.length, 0)} de {datos ? num(datos.total, 0) : '…'} objetos · posiciones instantáneas del catálogo del equipo · tamaños aumentados</small>
        </div>
      </div>
      {sel && (
        <div className="capa der">
          <div className="panel ficha">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h2>{sel[1]}</h2><button className="btn chico" onClick={() => setSel(null)}>✕</button></div>
            <div className="meta">{datos.categorias[sel[2]] || sel[2]} · {datos.paises[sel[3]] || sel[3]}</div>
            {modo === 'ninos' ? (
              <p className="cuento">Este objeto se llama {sel[1]}. Es de {datos.paises[sel[3]] || 'un país desconocido'} y está a unos {num(Math.round(sel[6] / 100) * 100, 0)} km de altura. {/INACTIVE/.test(sel[2]) ? 'Ya no funciona, pero sigue dando vueltas.' : /ROCKET/.test(sel[2]) ? 'Es un cohete vacío que se quedó arriba.' : /DEBRIS/.test(sel[2]) ? 'Es un pedazo de algo que se rompió.' : 'Todavía trabaja.'}</p>
            ) : (
              <dl>
                <dt>NORAD</dt><dd>{sel[0]}</dd>
                <dt>Categoría</dt><dd>{datos.categorias[sel[2]] || sel[2]}</dd>
                <dt>Posición</dt><dd>{num(sel[4])}°, {num(sel[5])}° · {num(sel[6], 0)} km</dd>
                <dt>Tamaño radar (RCS)</dt><dd>{sel[7] || '—'}</dd>
                <dt>Fuente</dt><dd>Catálogo del equipo (objects.json, orbital_objects); origen Space-Track</dd>
              </dl>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
