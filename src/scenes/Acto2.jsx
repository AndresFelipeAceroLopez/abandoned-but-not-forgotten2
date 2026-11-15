// Acto 2 · escenas 6–13 y la propuesta. Mismo mapa, mismos datos, dos modos. Cada tema con su animación.
import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { MapaOrbital } from './Prologo';
import { OBJETOS } from '../data/objetos';
import { Refs } from '../ui/Referencias';
import LineaTiempo from '../ui/LineaTiempo';
import Escena3D from '../three/Escena3D';
import SistemaSolar from '../three/SistemaSolar';
import { Linea } from '../dashboard/Graficos';
import { AnimacionDanos, AnimacionRadiactivo, AnimacionSolucion, AnimacionLimpieza, MiniPlaneta } from '../visuales';
import { potenciaPu238 } from '../lib/geo';
import { num } from '../lib/formato';
import { VENTANAS } from '../data/sistema_solar';
import { tr } from '../i18n';

// Props para que un <div> seleccionable funcione con teclado y lectores de pantalla.
const comoBoton = (activo, alPulsar) => ({ role: 'button', tabIndex: 0, 'aria-pressed': activo, onClick: alPulsar, onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alPulsar(); } } });
import {
  DANOS, DANOS_TEXTO, RADIACTIVOS, RADIACTIVOS_TEXTO, SIN_NOMBRE, SIN_NOMBRE_TEXTO, NO_ES_BASURA, ASAT, PAISES_TEXTO,
  UNION, UNION_TEXTO, CORTOS, CORTOS_NOTA, SOLUCIONES, MEDIDAS_TECNICAS, SOLUCIONES_FALTA, PROPUESTA, SESGOS, EFECTOS, FUTURO, MITOS, HISTORIA_1957,
} from '../data/contenido';
import SeccionCortos from '../ui/SeccionCortos';
import videoExplicacion from '../recursos/video_explicacion/video_subtitulado_ingles.mp4';

function Pagina({ numero, titulo, intro, children, angosto, visual }) {
  const siguienteEscena = useAppStore((s) => s.siguienteEscena);
  return (
    <div className="escena-scroll" tabIndex={0} role="region" aria-label={titulo}>
      <div className={`contenido ${angosto ? 'angosto' : ''}`}>
        <div className="cabecera-escena con-visual">
          <div>
            <div className="acto">{tr('Acto 2 · Escena', 'Act 2 · Scene')} {numero}</div>
            <h1>{titulo}</h1>
            {intro && <p style={{ fontSize: '1.1rem', color: 'var(--tinta-2)' }}>{intro}</p>}
          </div>
          {visual && <div className="visual-cabecera">{visual}</div>}
        </div>
        {children}
        <div style={{ marginTop: 24 }}><button className="btn primario" onClick={siguienteEscena}>{tr('Siguiente escena →', 'Next scene →')}</button></div>
      </div>
    </div>
  );
}

export function Danos() {
  const modo = useAppStore((s) => s.modo);
  const [caso, setCaso] = useState(0);
  return (
    <Pagina numero={6} titulo={tr('Daños colaterales: cuando el papel cae', 'Collateral damage: when the paper falls')} intro={DANOS_TEXTO[modo]}>
      <div className="dos-col" style={{ alignItems: 'start' }}>
        <div className="tarjeta" style={{ padding: 8 }}><AnimacionDanos caso={caso} size={520} /></div>
        <table className="tabla"><thead><tr><th>{tr('Caso', 'Case')}</th><th>{tr('Qué pasó', 'What happened')}</th>{modo === 'org' && <th>{tr('Fuente', 'Source')}</th>}</tr></thead>
          <tbody>{DANOS.map((d, i) => <tr key={d.caso} className={i === caso ? 'fila-activa' : ''} onMouseEnter={() => setCaso(i)} onClick={() => setCaso(i)} style={{ cursor: 'pointer' }}><td><strong>{d.caso}</strong></td><td>{d.que}</td>{modo === 'org' && <td><Refs ids={d.refs} /></td>}</tr>)}</tbody></table>
      </div>
      {modo === 'org' && (
        <>
          <h2 style={{ marginTop: 24 }}>{tr('Efectos que ya está teniendo', 'Effects it is already having')}</h2>
          <table className="tabla"><tbody>{EFECTOS.map((e) => <tr key={e.ambito}><td><strong>{e.ambito}</strong></td><td>{e.efecto} <Refs ids={e.refs} /></td></tr>)}</tbody></table>
        </>
      )}
      <h2 style={{ marginTop: 24 }}>{tr('¿Qué pasaría si…?', 'What if…?')}</h2>
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
    <Pagina numero={7} titulo={tr('¿Hay elementos radiactivos?', 'Is there radioactive material?')} intro={RADIACTIVOS_TEXTO[modo]} visual={<AnimacionRadiactivo tipo={tipo} size={180} />}>
      <div className="tarjetas">
        {RADIACTIVOS.map((r, i) => (
          <div key={r.donde} className={`tarjeta click ${tipo === TIPO_RTG[i] ? 'activa' : ''}`} {...comoBoton(tipo === TIPO_RTG[i], () => setTipo(TIPO_RTG[i]))}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><MiniPlaneta tipo={['luna', 'tierra', 'marte', 'cohete', 'satelite'][i]} size={40} /><h3 style={{ margin: 0 }}>⚛ {r.donde}</h3></div>
            <p style={{ marginTop: 8 }}>{r.que} {modo === 'org' && <Refs ids={r.refs} />}</p>
          </div>
        ))}
      </div>
      <div className="dos-col" style={{ marginTop: 20 }}>
        <Linea
          titulo={tr('Cuánta potencia le queda a un generador de plutonio-238', 'How much power a plutonium-238 generator has left')}
          nota={tr('P(t) = P₀ · 2^(−t/87,7 años). 100 % en 1970 (Apollo 12–17). En 2026 conserva cerca del 64 %.', 'P(t) = P₀ · 2^(−t/87.7 years). 100% in 1970 (Apollo 12–17). In 2026 it retains about 64%.')}
          serie={curva} marcador={2025} formato={(v) => tr(`${v} %`, `${v}%`)}
        />
        <div className="tarjeta">
          <h3>{tr('En el mapa', 'On the map')}</h3>
          <p>
            {tr(`Estos objetos llevan un símbolo de átomo (${conFuente.length} en nuestra lista).`, `These objects carry an atom symbol (${conFuente.length} in our list).`)}{' '}
            {modo === 'ninos'
              ? tr('Es una batería de calor, no una bomba: está pensada para no abrirse nunca.', 'It is a heat battery, not a bomb: it is designed never to open.')
              : tr('Fuentes selladas con blindaje de contención; el único material suelto son las gotas de NaK de los RORSAT.', 'Sealed sources with containment shielding; the only loose material is the NaK droplets from the RORSATs.')}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn chico" onClick={() => setEscena('luna')}>{tr('Verlos en la Luna', 'See them on the Moon')}</button>
            <button className="btn chico" onClick={() => setEscena('marte')}>{tr('Verlos en Marte', 'See them on Mars')}</button>
            <button className="btn chico" onClick={() => setEscena('profundo')}>{tr('Pioneer 10 y 11', 'Pioneer 10 and 11')}</button>
          </div>
        </div>
      </div>
    </Pagina>
  );
}

export function SinNombre() {
  const modo = useAppStore((s) => s.modo);
  const pasos = useMemo(() => {
    const titulos = [tr('En órbita', 'In orbit'), tr('Núcleos perdidos', 'Lost cores'), tr('En la Luna', 'On the Moon')];
    return [
      { titulo: tr('Papeles sin dueño', 'Ownerless papers'), ninos: SIN_NOMBRE_TEXTO.ninos, org: SIN_NOMBRE_TEXTO.org, refs: [7] },
      ...SIN_NOMBRE.map((s, i) => ({ titulo: titulos[i], ninos: s.texto, org: s.texto, refs: s.refs })),
    ];
  }, []);
  return (
    <MapaOrbital
      pasos={pasos}
      colorInicial="identificado"
      panelExtra={modo === 'org' ? (
        <div className="panel tenue"><small>
          {tr('Gris = tipo "sin identificar" (Space-Track UNKNOWN/TBA) o sin país. Comparar con 20,3 % no identificado en ESA 2025', 'Grey = type "unidentified" (Space-Track UNKNOWN/TBA) or no country. Compare with 20.3% unidentified in ESA 2025')} <Refs ids={[7]} />.
        </small></div>
      ) : null}
    />
  );
}

export function NoEsBasura() {
  const modo = useAppStore((s) => s.modo);
  const seleccionar = useAppStore((s) => s.seleccionar);
  const setEscena = useAppStore((s) => s.setEscena);
  const activos = useMemo(() => OBJETOS.filter((o) => o.activo || o.patrimonio), []);
  return (
    <Pagina
      numero={9}
      titulo={tr('No todo es basura', 'Not everything is junk')}
      intro={modo === 'ninos'
        ? tr('Antes de hablar de limpiar, el mapa marca en dorado lo que hay que cuidar.', 'Before we talk about cleaning up, the map marks in gold what must be looked after.')
        : tr('Antes de hablar de remoción, el mapa marca en dorado el patrimonio activo e histórico.', 'Before discussing removal, the map marks active and historic heritage in gold.')}
      visual={<AnimacionSolucion tipo="onesmallstep" size={180} />}
    >
      <div className="tarjetas">{NO_ES_BASURA.map((n, i) => <div key={n.titulo} className="tarjeta"><div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><MiniPlaneta tipo={['luna', 'bandera', 'cohete', 'telescopio'][i]} size={40} /><h3 style={{ color: 'var(--oro)', margin: 0 }}>{n.titulo}</h3></div><p style={{ marginTop: 8 }}>{n.texto} {modo === 'org' && <Refs ids={n.refs} />}</p></div>)}</div>
      <h2 style={{ marginTop: 24 }}>{tr('Patrimonio y objetos activos en la lista', 'Heritage and active objects in the list')} ({activos.length})</h2>
      <div className="bandeja">{activos.map((o) => <button key={o.id} style={{ borderColor: 'var(--oro)', color: 'var(--oro)' }} onClick={() => { seleccionar(o.id); setEscena(o.cuerpo === 'espacio_profundo' ? 'profundo' : o.cuerpo); }}>{o.activo ? '● ' : ''}{o.nombre}</button>)}</div>
      {modo === 'org' && (
        <>
          <h2 style={{ marginTop: 24 }}>{tr('Correcciones y mitos a evitar', 'Corrections and myths to avoid')}</h2>
          <table className="tabla"><thead><tr><th>{tr('No digan', "Don't say")}</th><th>{tr('Digan', 'Say')}</th></tr></thead><tbody>{MITOS.map((m) => <tr key={m.no}><td>{m.no}</td><td>{m.si} <Refs ids={m.refs} /></td></tr>)}</tbody></table>
          <h2 style={{ marginTop: 24 }}>{tr('Sesgos que no se ven', 'Biases you cannot see')}</h2>
          <ol>{SESGOS.map((s) => <li key={s.titulo} style={{ marginBottom: 8 }}><strong>{s.titulo}.</strong> {s.texto} <Refs ids={s.refs} /></li>)}</ol>
        </>
      )}
    </Pagina>
  );
}

export function Paises() {
  const modo = useAppStore((s) => s.modo);
  const pasos = useMemo(() => [
    { titulo: tr('Países que compiten', 'Countries that compete'), ninos: PAISES_TEXTO.ninos, org: PAISES_TEXTO.org, refs: PAISES_TEXTO.refs },
    ...ASAT.map((a) => ({ titulo: `${a.anio} · ${a.pais}`, ninos: `${a.que}. ${a.basura}.`, org: `${a.que}. ${a.basura}.`, refs: a.refs })),
  ], []);
  return (
    <MapaOrbital
      pasos={pasos}
      colorInicial="nube"
      panelExtra={
        <div className="panel tenue">
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><AnimacionSolucion tipo="moratoria" size={90} /><strong>{tr('Pruebas antisatélite', 'Anti-satellite tests')}</strong></div>
          <table className="tabla" style={{ fontSize: '0.82rem' }}><tbody>{ASAT.map((a) => <tr key={a.tag}><td>{a.anio}</td><td>{a.pais}</td><td>{a.basura}{modo === 'org' && <> <Refs ids={a.refs} /></>}</td></tr>)}</tbody></table>
          <small>{tr('Cambia "Color por" a País para ver de quién es cada papel.', 'Switch "Colour by" to Country to see whose paper each one is.')}</small>
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
    { titulo: tr('La misma órbita es de todos', 'The same orbit belongs to everyone'), ninos: UNION_TEXTO.ninos, org: UNION_TEXTO.org, refs: [76] },
    ...UNION.map((u) => ({ titulo: u.titulo, ninos: u.texto, org: u.texto, refs: u.refs })),
  ], []);
  return (
    <MapaOrbital
      pasos={pasos}
      colorInicial="pais"
      panelExtra={
        <div className="panel tenue"><div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><AnimacionSolucion tipo="carta" size={90} />
          <small>
            {tr('ISS: 5 agencias, 15 países', 'ISS: 5 agencies, 15 countries')} {modo === 'org' && <Refs ids={[76]} />}. {tr('Carta Cero Basura: > 250 firmantes, 36 países (nov-2026)', 'Zero Debris Charter: > 250 signatories, 36 countries (Nov 2026)')} {modo === 'org' && <Refs ids={[81]} />}.
          </small>
        </div></div>
      }
    />
  );
}

export function Cortos() {
  return <SeccionCortos />;
}

const ANIM_SOLUCION = ['regla5', 'carta', 'moratoria', 'adrasj', 'clearspace', 'lunarecycle', 'onesmallstep', 'proteccion'];
const ANIM_MEDIDA = ['whipple', 'pasivacion', 'desorbita', 'elipse', 'reutilizable', 'laser'];

export function Soluciones() {
  const modo = useAppStore((s) => s.modo);
  return (
    <Pagina numero={13} titulo={tr('Qué soluciones hay hoy', 'What solutions exist today')}>
      <div className="tarjetas tarjetas-anchas">
        {SOLUCIONES.map((s, i) => (
          <div key={i} className="tarjeta solucion">
            <AnimacionSolucion tipo={ANIM_SOLUCION[i]} size={200} />
            <div>
              <span className="chip">{s.tipo}</span>
              <p style={{ margin: '8px 0 4px' }}>{s.solucion}</p>
              <small><strong>{tr('Estado:', 'Status:')}</strong> {s.estado} {modo === 'org' && <Refs ids={s.refs} />}</small>
            </div>
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: 24 }}>{tr('Otras medidas técnicas que ya se usan o se estudian', 'Other technical measures already in use or under study')} <Refs ids={[85]} /></h2>
      <div className="tarjetas tarjetas-anchas">{MEDIDAS_TECNICAS.map(([titulo, d], i) => <div key={titulo} className="tarjeta solucion"><AnimacionSolucion tipo={ANIM_MEDIDA[i]} size={200} /><div><h3>{titulo}</h3><p>{d}</p></div></div>)}</div>
      <p style={{ marginTop: 20, fontSize: '1.1rem' }}><strong>{SOLUCIONES_FALTA}</strong></p>
    </Pagina>
  );
}

const fases = () => [
  { id: 'iman', titulo: tr('Fase 1 · Metal', 'Phase 1 · Metal'), texto: tr('Satélites exclusivos de limpieza con un captador magnético recogen primero todo lo que sea metal: etapas, paneles, tornillos, fragmentos de aluminio y acero.', 'Dedicated clean-up satellites with a magnetic collector first pick up everything made of metal: stages, panels, bolts, aluminium and steel fragments.') },
  { id: 'malla', titulo: tr('Fase 2 · Malla', 'Phase 2 · Net'), texto: tr('Una malla desplegable atrapa lo que no es metálico: mantas térmicas, escamas de pintura, plásticos y compuestos.', 'A deployable net catches what is not metallic: thermal blankets, paint flecks, plastics and composites.') },
  { id: 'protocolo', titulo: tr('Protocolo · 1 lanzamiento = 1 limpieza', 'Protocol · 1 launch = 1 clean-up'), texto: tr('Cada país que manda satélites se compromete a limpiarlos: por cada lanzamiento, una capacidad de recogida equivalente. Quién lo regula queda como decisión abierta (ONU, COSPAR, acuerdo multilateral).', 'Every country that launches satellites commits to cleaning them up: for each launch, an equivalent collection capacity. Who regulates it remains an open decision (UN, COSPAR, multilateral agreement).') },
  { id: 'alsol', titulo: tr('Destino · El Sol', 'Destination · The Sun'), texto: tr('Lo recogido se envía al Sol en las ventanas en que Mercurio y Venus quedan alineados al lado contrario de la Tierra, detrás del Sol.', 'What is collected is sent to the Sun in the windows when Mercury and Venus line up on the opposite side from Earth, behind the Sun.') },
];

export function Propuesta() {
  const modo = useAppStore((s) => s.modo);
  const setEscena = useAppStore((s) => s.setEscena);
  const [fase, setFase] = useState('iman');
  const [ventana, setVentana] = useState({ mercurio: false, venus: false });
  const [lanzamientos, setLanzamientos] = useState(0);
  const [velocidad, setVelocidad] = useState(0.25);
  useEffect(() => { if (ventana.mercurio || ventana.venus) setLanzamientos((n) => n + 1); }, [ventana]);
  const abierta = tr('● ventana abierta', '● window open');

  return (
    <div className="escena-scroll sin-padding" tabIndex={0} role="region" aria-label={PROPUESTA.titulo}>
      <div className="escena propuesta-3d">
        <Escena3D camara={[0, 5.5, 6.5]} minDist={2} maxDist={20}>
          <SistemaSolar modo="propuesta" anios={velocidad} alineado onVentana={setVentana} mostrarEtiquetas />
        </Escena3D>
        <div className="capa izq">
          <div className="panel narracion">
            <div className="acto">{tr('Acto 2 · Escena 14 · Propuesta', 'Act 2 · Scene 14 · Proposal')}</div>
            <h2>{PROPUESTA.titulo}</h2>
            <p className={modo === 'ninos' ? 'paso ninos' : 'paso'}>{PROPUESTA[modo] || PROPUESTA.ninos}</p>
            <div className="controles-mapa">
              <label>{tr('Velocidad', 'Speed')}
                <select value={velocidad} onChange={(e) => setVelocidad(+e.target.value)}>
                  <option value={0}>{tr('Pausa', 'Pause')}</option><option value={0.1}>{tr('1 mes/s', '1 month/s')}</option><option value={0.25}>{tr('3 meses/s', '3 months/s')}</option><option value={1}>{tr('1 año/s', '1 year/s')}</option>
                </select>
              </label>
              <span className={`chip ${ventana.mercurio ? 'verde' : 'gris'}`}>{tr('Mercurio detrás del Sol', 'Mercury behind the Sun')} {ventana.mercurio ? abierta : ''}</span>
              <span className={`chip ${ventana.venus ? 'verde' : 'gris'}`}>{tr('Venus detrás del Sol', 'Venus behind the Sun')} {ventana.venus ? abierta : ''}</span>
              <span className="chip" aria-live="polite">{tr('Envíos simulados:', 'Simulated shipments:')} {lanzamientos}</span>
            </div>
          </div>
        </div>
        <div className="capa der">
          <div className="panel tenue">
            <strong>{tr('Ventanas hacia el Sol', 'Windows towards the Sun')}</strong>
            <p className="mini" style={{ margin: '4px 0' }}>{tr(VENTANAS.equipo, 'The team proposes windows every 1 and 7 months (to be confirmed against the actual conjunctions).')}</p>
            {modo === 'org' && (
              <p className="mini" style={{ margin: 0 }}>
                {tr(
                  `Conjunción superior (planeta detrás del Sol visto desde la Tierra): Mercurio cada ${num(VENTANAS.mercurio.meses)} meses y Venus cada ${num(VENTANAS.venus.meses)} meses (periodos sinódicos). Nota técnica: caer al Sol desde la Tierra exige frenar ~30 km/s de velocidad orbital, más que escapar del sistema solar (~12 km/s); Parker Solar Probe lo resuelve con 7 asistencias gravitatorias de Venus. La ventana aprovecha esa asistencia; el costo energético debe validarse.`,
                  `Superior conjunction (planet behind the Sun as seen from Earth): Mercury every ${num(VENTANAS.mercurio.meses)} months and Venus every ${num(VENTANAS.venus.meses)} months (synodic periods). Technical note: falling into the Sun from Earth requires shedding ~30 km/s of orbital speed, more than escaping the solar system (~12 km/s); Parker Solar Probe solves it with 7 Venus gravity assists. The window takes advantage of that assist; the energy cost must be validated.`,
                )}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="contenido" style={{ padding: '24px clamp(16px, 4vw, 48px) 80px' }}>
        <figure className="video-propuesta">
          <video controls playsInline preload="metadata" aria-label={tr('Video explicativo de la propuesta, subtitulado en inglés', 'Proposal explainer video, with English subtitles')}>
            <source src={videoExplicacion} type="video/mp4" />
            {tr('Tu navegador no puede reproducir este video.', 'Your browser cannot play this video.')}
          </video>
        </figure>
        <h2>{tr('Cómo se recoge: por fases', 'How it is collected: in phases')}</h2>
        <div className="tarjetas tarjetas-anchas">
          {fases().map((f) => (
            <div key={f.id} className={`tarjeta solucion click ${fase === f.id ? 'activa' : ''}`} {...comoBoton(fase === f.id, () => setFase(f.id))}>
              <AnimacionLimpieza fase={f.id} size={240} />
              <div><h3>{f.titulo}</h3><p>{f.texto}</p></div>
            </div>
          ))}
        </div>
        <h2 style={{ marginTop: 24 }}>{tr('Y el inventario abierto', 'And the open inventory')}</h2>
        <ol style={{ fontSize: '1.05rem' }}>{PROPUESTA.pasos.map((p) => <li key={p} style={{ marginBottom: 8 }}>{p}</li>)}</ol>
        <p style={{ marginTop: 20, fontSize: '1.2rem', fontWeight: 600 }}>{tr('No es basura olvidada: es nuestra historia, y decidir qué hacemos con ella nos toca a todos.', "It's not forgotten junk: it's our history, and deciding what to do with it is up to all of us.")}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn oro" onClick={() => setEscena('dashboard')}>{tr('Ver el dashboard', 'View the dashboard')}</button>
          <button className="btn" onClick={() => setEscena('referencias')}>{tr('Referencias', 'References')}</button>
          <button className="btn" onClick={() => setEscena('prologo')}>{tr('Volver al inicio', 'Back to the start')}</button>
        </div>
      </div>
    </div>
  );
}
