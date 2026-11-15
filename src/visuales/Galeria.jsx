// Página de desarrollo: muestra todos los visuales con sus variantes. Se puede montar en cualquier escena.
import IlustracionObjeto, { CLASES_OBJETO, claseObjeto } from './IlustracionObjeto.jsx';
import AnimacionSolucion, { TIPOS_SOLUCION } from './AnimacionSolucion.jsx';
import AnimacionDanos, { CASOS_DANOS } from './AnimacionDanos.jsx';
import AnimacionRadiactivo, { TIPOS_RADIACTIVO } from './AnimacionRadiactivo.jsx';
import MiniPlaneta, { TIPOS_MINI } from './MiniPlaneta.jsx';
import AnimacionLimpieza, { FASES_LIMPIEZA } from './AnimacionLimpieza.jsx';
import './visuales.css';

const EJEMPLOS_OBJETO = [
  { nombre: 'Eagle (Apollo 11)', objeto: 'Etapa de descenso del módulo lunar (LM-5, Eagle)', tipo: 'aterrizaje', programa: 'Apollo', activo: true },
  { nombre: 'Antares', objeto: 'Etapa de ascenso del módulo lunar (LM-8, Antares)', tipo: 'impacto', programa: 'Apollo' },
  { nombre: 'S-IVB Apollo 13', objeto: 'Tercera etapa del Saturno V', tipo: 'impacto', programa: 'Apollo' },
  { nombre: 'Curiosity', objeto: 'Rover de exploración con laboratorio', tipo: 'aterrizaje', programa: 'Mars Science Laboratory', activo: true, radiactivo: true },
  { nombre: 'LRV-1', objeto: 'Vehículo lunar (LRV-1)', tipo: 'aterrizaje', programa: 'Apollo' },
  { nombre: 'Ingenuity', objeto: 'Helicóptero de demostración tecnológica', tipo: 'aterrizaje', programa: 'Mars 2020' },
  { nombre: 'Lunar Orbiter 1', objeto: 'Orbitador fotográfico', tipo: 'impacto', programa: 'Lunar Orbiter' },
  { nombre: 'Ranger 7', objeto: 'Sonda de impacto con cámaras', tipo: 'impacto', programa: 'Ranger' },
  { nombre: 'Viking 1', objeto: 'Módulo de aterrizaje (lander)', tipo: 'aterrizaje', programa: 'Viking', radiactivo: true },
  { nombre: 'Retrorreflector', objeto: 'Retrorreflector láser', tipo: 'aterrizaje', programa: 'Apollo', activo: true },
  { nombre: 'Bolsa de desechos', objeto: 'Bolsa de desechos', tipo: 'aterrizaje', programa: 'Apollo' },
  { nombre: 'ALSEP Apollo 12', objeto: 'Estación ALSEP', tipo: 'aterrizaje', programa: 'Apollo', radiactivo: true },
  { nombre: 'Pioneer 10', objeto: 'Sonda interplanetaria con placa de mensaje', tipo: 'trayectoria', programa: 'Pioneer', radiactivo: true },
  { nombre: 'Kepler', objeto: 'Telescopio espacial cazador de planetas', tipo: 'orbita', programa: 'Discovery' },
  { nombre: 'WE0913A', objeto: 'Etapa de cohete abandonada, objeto WE0913A', tipo: 'impacto', programa: 'desconocido' },
  { nombre: 'Brazo del SIM', objeto: 'Brazo extensible del espectrómetro de masas', tipo: 'impacto', programa: 'Apollo' },
  {},
];

function Figura({ ancha, children, titulo, sub }) {
  return (
    <figure className={ancha ? 'ancha' : ''}>
      {children}
      <figcaption><b>{titulo}</b>{sub}</figcaption>
    </figure>
  );
}

/** <Galeria /> — recorre todos los componentes y variantes de src/visuales. */
export default function Galeria() {
  return (
    <div className="v-galeria">
      <h2>IlustracionObjeto · {CLASES_OBJETO.length} clases</h2>
      {EJEMPLOS_OBJETO.map((o, i) => (
        <Figura key={i} titulo={o.nombre || '(sin datos)'} sub={`claseObjeto → ${claseObjeto(o)}`}>
          <IlustracionObjeto objeto={o} size={150} />
        </Figura>
      ))}

      <h2>AnimacionSolucion · {TIPOS_SOLUCION.length} tipos</h2>
      {[...TIPOS_SOLUCION, 'otro'].map((t) => (
        <Figura key={t} titulo={t} sub={t === 'otro' ? 'tipo desconocido → genérico' : 'bucle 3–6 s'}>
          <AnimacionSolucion tipo={t} size={200} />
        </Figura>
      ))}

      <h2>AnimacionDanos · casos</h2>
      {[0, 1, 2, 3].map((c) => (
        <Figura key={c} ancha titulo={CASOS_DANOS[c] ? CASOS_DANOS[c].nombre : 'Órbita y cielo (sin marcador)'} sub={`caso=${c}${CASOS_DANOS[c] ? ` · ${CASOS_DANOS[c].detalle}` : ''}`}>
          <AnimacionDanos size={400} caso={c} />
        </Figura>
      ))}
      <Figura ancha titulo="pausada" sub="activo=false">
        <AnimacionDanos size={400} caso={0} activo={false} />
      </Figura>

      <h2>AnimacionRadiactivo</h2>
      {Object.keys(TIPOS_RADIACTIVO).map((t) => (
        <Figura key={t} titulo={t} sub={TIPOS_RADIACTIVO[t].uso}>
          <AnimacionRadiactivo tipo={t} size={180} />
        </Figura>
      ))}

      <h2>MiniPlaneta · {TIPOS_MINI.length} tipos (48 px) + desconocido</h2>
      {[...TIPOS_MINI, 'nada'].map((t) => (
        <Figura key={t} titulo={t}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <MiniPlaneta tipo={t} size={40} /><MiniPlaneta tipo={t} size={48} /><MiniPlaneta tipo={t} size={64} />
          </div>
        </Figura>
      ))}

      <h2>AnimacionLimpieza · fases</h2>
      {FASES_LIMPIEZA.map((f) => (
        <Figura key={f} titulo={f}>
          <AnimacionLimpieza fase={f} size={240} />
        </Figura>
      ))}
    </div>
  );
}
