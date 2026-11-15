// Acto 2 · escenas 6–13 y la propuesta. Mismo mapa, mismos datos, dos modos. Cada tema con su animación.
import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { MapaOrbital } from './Prologo';
import { OBJETOS } from './GloboObjetos';
import { Refs } from '../ui/Referencias';
import LineaTiempo from '../ui/LineaTiempo';
import Escena3D from '../three/Escena3D';
import SistemaSolar from '../three/SistemaSolar';
import { Linea } from '../dashboard/Graficos';
import { AnimacionDanos, AnimacionRadiactivo, AnimacionSolucion, AnimacionLimpieza, MiniPlaneta } from '../visuales';
import { potenciaPu238 } from '../lib/geo';
import { VENTANAS } from '../data/sistema_solar';
import {
  DANOS, DANOS_TEXTO, RADIACTIVOS, RADIACTIVOS_TEXTO, SIN_NOMBRE, SIN_NOMBRE_TEXTO, NO_ES_BASURA, ASAT, PAISES_TEXTO,
  UNION, UNION_TEXTO, CORTOS, CORTOS_NOTA, SOLUCIONES, MEDIDAS_TECNICAS, SOLUCIONES_FALTA, PROPUESTA, SESGOS, EFECTOS, FUTURO, MITOS, HISTORIA_1957,
} from '../data/contenido';

function Pagina({ acto = 'Acto 2', numero, titulo, intro, children, angosto, visual }) {
  const siguienteEscena = useAppStore((s) => s.siguienteEscena);
  return (
    <div className="escena-scroll">
      <div className={`contenido ${angosto ? 'angosto' : ''}`}>
        <div className="cabecera-escena con-visual">
          <div>
            <div className="acto">{acto} · Escena {numero}</div>
            <h1>{titulo}</h1>
            {intro && <p style={{ fontSize: '1.1rem', color: 'var(--tinta-2)' }}>{intro}</p>}
          </div>
          {visual && <div className="visual-cabecera">{visual}</div>}
        </div>
        {children}
        <div style={{ marginTop: 24 }}><button className="btn primario" onClick={siguienteEscena}>Siguiente escena →</button></div>
      </div>
    </div>
  );
}

export function Danos() {
  const modo = useAppStore((s) => s.modo);
  const [caso, setCaso] = useState(0);
  return (
    <Pagina numero={6} titulo="Daños colaterales: cuando el papel cae" intro={DANOS_TEXTO[modo]}>
      <div className="dos-col" style={{ alignItems: 'start' }}>
        <div className="tarjeta" style={{ padding: 8 }}><AnimacionDanos caso={caso} size={520} /></div>
        <table className="tabla"><thead><tr><th>Caso</th><th>Qué pasó</th>{modo === 'org' && <th>Fuente</th>}</tr></thead>
          <tbody>{DANOS.map((d, i) => <tr key={d.caso} className={i === caso ? 'fila-activa' : ''} onMouseEnter={() => setCaso(i)} onClick={() => setCaso(i)} style={{ cursor: 'pointer' }}><td><strong>{d.caso}</strong></td><td>{d.que}</td>{modo === 'org' && <td><Refs ids={d.refs} /></td>}</tr>)}</tbody></table>
      </div>
      {modo === 'org' && (
        <>
          <h2 style={{ marginTop: 24 }}>Efectos que ya está teniendo</h2>
          <table className="tabla"><tbody>{EFECTOS.map((e) => <tr key={e.ambito}><td><strong>{e.ambito}</strong></td><td>{e.efecto} <Refs ids={e.refs} /></td></tr>)}</tbody></table>
        </>
      )}
      <h2 style={{ marginTop: 24 }}>¿Qué pasaría si…?</h2>
      <div className="tarjetas">{FUTURO.map((f) => <div key={f.pregunta} className="tarjeta"><h3>{f.pregunta}</h3><p>{f.texto} {modo === 'org' && <Refs ids={f.refs} />}</p></div>)}</div>
    </Pagina>
  );
}

const TIPO_RTG = ['snap27', 'snap27', 'mmrtg', 'snap19', 'nak'];

export function Radiactivos() {
  const modo = useAppStore((s) => s.modo);
  const setEscena = useAppStore((s) => s.setEscena);
  const conFuente = useMemo(() => OBJETOS.filter((o) => o.radiactivo), []);
  const [tipo, setTipo] = useState('snap27');
  const curva = useMemo(() => Array.from({ length: 21 }, (_, i) => ({ x: 1970 + i * 5, y: Math.round(potenciaPu238(100, i * 5)) })), []);
  return (
    <Pagina numero={7} titulo="¿Hay elementos radiactivos?" intro={RADIACTIVOS_TEXTO[modo]} visual={<AnimacionRadiactivo tipo={tipo} size={180} />}>
      <div className="tarjetas">
        {RADIACTIVOS.map((r, i) => (
          <div key={r.donde} className={`tarjeta click ${tipo === TIPO_RTG[i] ? 'activa' : ''}`} onClick={() => setTipo(TIPO_RTG[i])}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><MiniPlaneta tipo={['luna', 'tierra', 'marte', 'cohete', 'satelite'][i]} size={40} /><h3 style={{ margin: 0 }}>⚛ {r.donde}</h3></div>
            <p style={{ marginTop: 8 }}>{r.que} {modo === 'org' && <Refs ids={r.refs} />}</p>
          </div>
        ))}
      </div>
      <div className="dos-col" style={{ marginTop: 20 }}>
        <Linea titulo="Cuánta potencia le queda a un generador de plutonio-238" nota="P(t) = P₀ · 2^(−t/87,7 años). 100 % en 1970 (Apollo 12–17). En 2026 conserva cerca del 64 %." serie={curva} marcador={2025} formato={(v) => `${v} %`} />
        <div className="tarjeta">
          <h3>En el mapa</h3>
          <p>Estos objetos llevan un símbolo de átomo ({conFuente.length} en nuestra lista). {modo === 'ninos' ? 'Es una batería de calor, no una bomba: está pensada para no abrirse nunca.' : 'Fuentes selladas con blindaje de contención; el único material suelto son las gotas de NaK de los RORSAT.'}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn chico" onClick={() => setEscena('luna')}>Verlos en la Luna</button>
            <button className="btn chico" onClick={() => setEscena('marte')}>Verlos en Marte</button>
            <button className="btn chico" onClick={() => setEscena('profundo')}>Pioneer 10 y 11</button>
          </div>
        </div>
      </div>
    </Pagina>
  );
}

export function SinNombre() {
  const modo = useAppStore((s) => s.modo);
  const pasos = useMemo(() => [
    { titulo: 'Papeles sin dueño', ninos: SIN_NOMBRE_TEXTO.ninos, org: SIN_NOMBRE_TEXTO.org, refs: [7] },
    ...SIN_NOMBRE.map((s, i) => ({ titulo: ['En órbita', 'Núcleos perdidos', 'En la Luna'][i], ninos: s.texto, org: s.texto, refs: s.refs })),
  ], []);
  return <MapaOrbital pasos={pasos} colorInicial="identificado" panelExtra={modo === 'org' ? <div className="panel tenue"><small>Gris = tipo "sin identificar" (Space-Track UNKNOWN/TBA) o sin país. Comparar con 20,3 % no identificado en ESA 2025 <Refs ids={[7]} />.</small></div> : null} />;
}

export function NoEsBasura() {
  const modo = useAppStore((s) => s.modo);
  const seleccionar = useAppStore((s) => s.seleccionar);
  const setEscena = useAppStore((s) => s.setEscena);
  const activos = useMemo(() => OBJETOS.filter((o) => o.activo || o.patrimonio), []);
  return (
    <Pagina numero={9} titulo="No todo es basura" intro={modo === 'ninos' ? 'Antes de hablar de limpiar, el mapa marca en dorado lo que hay que cuidar.' : 'Antes de hablar de remoción, el mapa marca en dorado el patrimonio activo e histórico.'} visual={<AnimacionSolucion tipo="onesmallstep" size={180} />}>
      <div className="tarjetas">{NO_ES_BASURA.map((n, i) => <div key={n.titulo} className="tarjeta"><div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><MiniPlaneta tipo={['luna', 'bandera', 'cohete', 'telescopio'][i]} size={40} /><h3 style={{ color: 'var(--oro)', margin: 0 }}>{n.titulo}</h3></div><p style={{ marginTop: 8 }}>{n.texto} {modo === 'org' && <Refs ids={n.refs} />}</p></div>)}</div>
      <h2 style={{ marginTop: 24 }}>Patrimonio y objetos activos en la lista ({activos.length})</h2>
      <div className="bandeja">{activos.map((o) => <button key={o.id} style={{ borderColor: 'var(--oro)', color: 'var(--oro)' }} onClick={() => { seleccionar(o.id); setEscena(o.cuerpo === 'espacio_profundo' ? 'profundo' : o.cuerpo); }}>{o.activo ? '● ' : ''}{o.nombre}</button>)}</div>
      {modo === 'org' && (
        <>
          <h2 style={{ marginTop: 24 }}>Correcciones y mitos a evitar</h2>
          <table className="tabla"><thead><tr><th>No digan</th><th>Digan</th></tr></thead><tbody>{MITOS.map((m) => <tr key={m.no}><td>{m.no}</td><td>{m.si} <Refs ids={m.refs} /></td></tr>)}</tbody></table>
          <h2 style={{ marginTop: 24 }}>Sesgos que no se ven</h2>
          <ol>{SESGOS.map((s) => <li key={s.titulo} style={{ marginBottom: 8 }}><strong>{s.titulo}.</strong> {s.texto} <Refs ids={s.refs} /></li>)}</ol>
        </>
      )}
    </Pagina>
  );
}

export function Paises() {
  const modo = useAppStore((s) => s.modo);
  const pasos = useMemo(() => [
    { titulo: 'Países que compiten', ninos: PAISES_TEXTO.ninos, org: PAISES_TEXTO.org, refs: PAISES_TEXTO.refs },
    ...ASAT.map((a) => ({ titulo: `${a.anio} · ${a.pais}`, ninos: `${a.que}. ${a.basura}.`, org: `${a.que}. ${a.basura}.`, refs: a.refs })),
  ], []);
  return (
    <MapaOrbital
      pasos={pasos}
      colorInicial="nube"
      panelExtra={
        <div className="panel tenue">
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><AnimacionSolucion tipo="moratoria" size={90} /><strong>Pruebas antisatélite</strong></div>
          <table className="tabla" style={{ fontSize: '0.82rem' }}><tbody>{ASAT.map((a) => <tr key={a.tag}><td>{a.anio}</td><td>{a.pais}</td><td>{a.basura}{modo === 'org' && <> <Refs ids={a.refs} /></>}</td></tr>)}</tbody></table>
          <small>Cambia "Color por" a País para ver de quién es cada papel.</small>
        </div>
      }
    />
  );
}

export function Union() {
  const modo = useAppStore((s) => s.modo);
  const setColorPor = useAppStore((s) => s.setColorPor);
  useEffect(() => { setColorPor('pais'); const t = setTimeout(() => setColorPor('union'), 4000); return () => clearTimeout(t); }, [setColorPor]);
  const pasos = useMemo(() => [
    { titulo: 'La misma órbita es de todos', ninos: UNION_TEXTO.ninos, org: UNION_TEXTO.org, refs: [76] },
    ...UNION.map((u) => ({ titulo: u.titulo, ninos: u.texto, org: u.texto, refs: u.refs })),
  ], []);
  return <MapaOrbital pasos={pasos} colorInicial="pais" panelExtra={<div className="panel tenue"><div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><AnimacionSolucion tipo="carta" size={90} /><small>ISS: 5 agencias, 15 países {modo === 'org' && <Refs ids={[76]} />}. Carta Cero Basura: &gt; 250 firmantes, 36 países (nov-2026) {modo === 'org' && <Refs ids={[81]} />}.</small></div></div>} />;
}

export function Cortos() {
  const modo = useAppStore((s) => s.modo);
  return (
    <Pagina numero={12} titulo="Cortos para tomar conciencia" intro={modo === 'ninos' ? 'Cuatro historias cortas con personajes propios. Cada una termina con un dato real.' : CORTOS_NOTA}>
      <div className="tarjetas">{CORTOS.map((c, i) => <div key={c.titulo} className="tarjeta"><div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><MiniPlaneta tipo={['papel', 'luna', 'satelite', 'tierra'][i]} size={44} /><div><small>Corto {i + 1} · 15–30 s</small><h3 style={{ margin: 0 }}>"{c.titulo}"</h3></div></div><p style={{ marginTop: 8 }}>{c.sinopsis}</p><p className="mini"><strong>Dato de cierre:</strong> {c.dato} <Refs ids={c.refs} /></p><span className="pendiente">Video: por completar (archivo o enlace, responsable)</span></div>)}</div>
      {modo === 'ninos' && <div style={{ marginTop: 24 }}><h2>Desde cuándo pasa esto</h2><LineaTiempo items={HISTORIA_1957} /></div>}
    </Pagina>
  );
}

const ANIM_SOLUCION = ['regla5', 'carta', 'moratoria', 'adrasj', 'clearspace', 'lunarecycle', 'onesmallstep', 'proteccion'];
const ANIM_MEDIDA = ['whipple', 'pasivacion', 'desorbita', 'elipse', 'reutilizable', 'laser'];

export function Soluciones() {
  const modo = useAppStore((s) => s.modo);
  return (
    <Pagina numero={13} titulo="Qué soluciones hay hoy">
      <div className="tarjetas tarjetas-anchas">
        {SOLUCIONES.map((s, i) => (
          <div key={i} className="tarjeta solucion">
            <AnimacionSolucion tipo={ANIM_SOLUCION[i]} size={200} />
            <div>
              <span className="chip">{s.tipo}</span>
              <p style={{ margin: '8px 0 4px' }}>{s.solucion}</p>
              <small><strong>Estado:</strong> {s.estado} {modo === 'org' && <Refs ids={s.refs} />}</small>
            </div>
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: 24 }}>Otras medidas técnicas que ya se usan o se estudian <Refs ids={[85]} /></h2>
      <div className="tarjetas tarjetas-anchas">{MEDIDAS_TECNICAS.map(([t, d], i) => <div key={t} className="tarjeta solucion"><AnimacionSolucion tipo={ANIM_MEDIDA[i]} size={200} /><div><h3>{t}</h3><p>{d}</p></div></div>)}</div>
      <p style={{ marginTop: 20, fontSize: '1.1rem' }}><strong>{SOLUCIONES_FALTA}</strong></p>
    </Pagina>
  );
}

const FASES = [
  { id: 'iman', titulo: 'Fase 1 · Metal', texto: 'Satélites exclusivos de limpieza con un captador magnético recogen primero todo lo que sea metal: etapas, paneles, tornillos, fragmentos de aluminio y acero.' },
  { id: 'malla', titulo: 'Fase 2 · Malla', texto: 'Una malla desplegable atrapa lo que no es metálico: mantas térmicas, escamas de pintura, plásticos y compuestos.' },
  { id: 'protocolo', titulo: 'Protocolo · 1 lanzamiento = 1 limpieza', texto: 'Cada país que manda satélites se compromete a limpiarlos: por cada lanzamiento, una capacidad de recogida equivalente. Quién lo regula queda como decisión abierta (ONU, COSPAR, acuerdo multilateral).' },
  { id: 'alsol', titulo: 'Destino · El Sol', texto: 'Lo recogido se envía al Sol en las ventanas en que Mercurio y Venus quedan alineados al lado contrario de la Tierra, detrás del Sol.' },
];

export function Propuesta() {
  const modo = useAppStore((s) => s.modo);
  const setEscena = useAppStore((s) => s.setEscena);
  const [fase, setFase] = useState('iman');
  const [ventana, setVentana] = useState({ mercurio: false, venus: false });
  const [lanzamientos, setLanzamientos] = useState(0);
  const [velocidad, setVelocidad] = useState(0.25);
  useEffect(() => { if (ventana.mercurio || ventana.venus) setLanzamientos((n) => n + 1); }, [ventana]);

  return (
    <div className="escena-scroll sin-padding">
      <div className="escena propuesta-3d">
        <Escena3D camara={[0, 5.5, 6.5]} minDist={2} maxDist={20}>
          <SistemaSolar modo="propuesta" anios={velocidad} alineado onVentana={setVentana} mostrarEtiquetas />
        </Escena3D>
        <div className="capa izq">
          <div className="panel narracion">
            <div className="acto">Acto 2 · Escena 14 · Propuesta</div>
            <h2>{PROPUESTA.titulo}</h2>
            <p className={modo === 'ninos' ? 'paso ninos' : 'paso'}>{PROPUESTA[modo] || PROPUESTA.ninos}</p>
            <div className="controles-mapa">
              <label>Velocidad
                <select value={velocidad} onChange={(e) => setVelocidad(+e.target.value)}><option value={0}>Pausa</option><option value={0.1}>1 mes/s</option><option value={0.25}>3 meses/s</option><option value={1}>1 año/s</option></select>
              </label>
              <span className={`chip ${ventana.mercurio ? 'verde' : 'gris'}`}>Mercurio detrás del Sol {ventana.mercurio ? '● ventana abierta' : ''}</span>
              <span className={`chip ${ventana.venus ? 'verde' : 'gris'}`}>Venus detrás del Sol {ventana.venus ? '● ventana abierta' : ''}</span>
              <span className="chip">Envíos simulados: {lanzamientos}</span>
            </div>
          </div>
        </div>
        <div className="capa der">
          <div className="panel tenue">
            <strong>Ventanas hacia el Sol</strong>
            <p className="mini" style={{ margin: '4px 0' }}>{VENTANAS.equipo}</p>
            {modo === 'org' && (
              <p className="mini" style={{ margin: 0 }}>
                Conjunción superior (planeta detrás del Sol visto desde la Tierra): Mercurio cada {VENTANAS.mercurio.meses} meses y Venus cada {VENTANAS.venus.meses} meses (periodos sinódicos). Nota técnica: caer al Sol desde la Tierra exige frenar ~30 km/s de velocidad orbital, más que escapar del sistema solar (~12 km/s); Parker Solar Probe lo resuelve con 7 asistencias gravitatorias de Venus. La ventana aprovecha esa asistencia; el costo energético debe validarse.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="contenido" style={{ padding: '24px clamp(16px, 4vw, 48px) 80px' }}>
        {PROPUESTA.pendiente && <p className="pendiente">Borrador del equipo: confirmar texto, cifras y responsables antes de enviar.</p>}
        <h2>Cómo se recoge: por fases</h2>
        <div className="tarjetas tarjetas-anchas">
          {FASES.map((f) => (
            <div key={f.id} className={`tarjeta solucion click ${fase === f.id ? 'activa' : ''}`} onClick={() => setFase(f.id)}>
              <AnimacionLimpieza fase={f.id} size={240} />
              <div><h3>{f.titulo}</h3><p>{f.texto}</p></div>
            </div>
          ))}
        </div>
        <h2 style={{ marginTop: 24 }}>Y el inventario abierto</h2>
        <ol style={{ fontSize: '1.05rem' }}>{PROPUESTA.pasos.map((p) => <li key={p} style={{ marginBottom: 8 }}>{p}</li>)}</ol>
        <p style={{ marginTop: 20, fontSize: '1.2rem', fontWeight: 600 }}>No es basura olvidada: es nuestra historia, y decidir qué hacemos con ella nos toca a todos.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn oro" onClick={() => setEscena('dashboard')}>Ver el dashboard</button>
          <button className="btn" onClick={() => setEscena('referencias')}>Referencias</button>
          <button className="btn" onClick={() => setEscena('prologo')}>Volver al inicio</button>
        </div>
      </div>
    </div>
  );
}
