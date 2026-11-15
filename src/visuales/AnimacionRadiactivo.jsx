// Generadores de radioisótopos (RTG) y reactor con NaK, con calor animado y símbolo de átomo girando.
import { useId } from 'react';
import { C, T, TF, Lienzo, Estrellas, Atomo, Texto } from './comunes.jsx';
import { t, tr } from '../i18n';

export const TIPOS_RADIACTIVO = {
  snap27: { nombre: 'SNAP-27', uso: 'ALSEP · Apollo 12 a 17', isotopo: 'Pu-238', vida: 'vida media 87,7 años', reactor: false },
  mmrtg: { nombre: 'MMRTG', uso: 'Curiosity · Perseverance', isotopo: 'Pu-238', vida: 'vida media 87,7 años', reactor: false },
  snap19: { nombre: 'SNAP-19', uso: 'Viking · Pioneer 10 y 11', isotopo: 'Pu-238', vida: 'vida media 87,7 años', reactor: false },
  nak: { nombre: 'Reactor BES-5', uso: 'satélites RORSAT', isotopo: 'NaK', vida: 'gotas de sodio-potasio en órbita', reactor: true },
};

function Rtg({ id }) {
  return (
    <g>
      <defs><radialGradient id={id} cx="50%" cy="50%" r="50%"><stop offset="0" stopColor={C.naranja} stopOpacity="0.55" /><stop offset="1" stopColor={C.naranja} stopOpacity="0" /></radialGradient></defs>
      <circle cx="100" cy="112" r="64" fill={`url(#${id})`} className="v-latir" style={{ transformOrigin: '100px 112px', '--dur': '3.2s' }} />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${82 + i * 18} 62 c 3 -5 -3 -9 0 -14 c 3 -5 -3 -9 0 -14`} fill="none" stroke={C.naranja} strokeWidth="1.3" strokeLinecap="round" className="v-calor" style={{ '--d': `${i * 1}s`, '--dur': '3s' }} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x="62" y={74 + i * 9} width="76" height="2.6" rx="1" fill={C.grisClaro} stroke={C.tinta2} strokeWidth="0.5" />)}
      <rect x="80" y="66" width="40" height="88" rx="7" fill={C.gris} {...T} />
      <rect x="88" y="66" width="10" height="88" rx="4" fill={C.tinta} opacity="0.08" />
      <rect x="92" y="92" width="16" height="36" rx="3" fill={C.naranja} opacity="0.85" className="v-pulso" style={{ '--dur': '3.2s' }} />
      <g {...TF}><line x1="100" y1="154" x2="100" y2="164" /><line x1="86" y1="164" x2="114" y2="164" /></g>
    </g>
  );
}

function ReactorNak({ id }) {
  const gotas = [[26, -22, 0], [34, 6, 0.9], [24, 28, 1.8], [40, -8, 2.6], [30, 18, 3.3]];
  return (
    <g>
      <defs><radialGradient id={id} cx="50%" cy="50%" r="50%"><stop offset="0" stopColor={C.oro} stopOpacity="0.5" /><stop offset="1" stopColor={C.oro} stopOpacity="0" /></radialGradient></defs>
      <circle cx="90" cy="110" r="60" fill={`url(#${id})`} className="v-latir" style={{ transformOrigin: '90px 110px', '--dur': '3s' }} />
      <rect x="58" y="72" width="64" height="76" rx="6" fill={C.gris} {...T} />
      <g {...TF} stroke={C.tinta2}>{[72, 90, 108].map((x) => <line key={x} x1={x} y1="58" x2={x} y2="84" />)}<line x1="66" y1="58" x2="114" y2="58" /></g>
      <circle cx="90" cy="112" r="20" fill="#3b2a12" stroke={C.oro} strokeWidth="1.2" />
      {[0, 60, 120, 180, 240, 300].map((a) => <rect key={a} x="87" y="96" width="6" height="12" rx="2" fill={C.oro} className="v-pulso" style={{ '--dur': '2.5s' }} transform={`rotate(${a} 90 112)`} />)}
      <path d="M122 96 L136 96 M122 128 L136 128" stroke={C.azul} strokeWidth="3" strokeLinecap="round" />
      {gotas.map(([dx, dy, d], i) => (
        <circle key={i} cx="138" cy={100 + i * 7} r="2.6" fill={C.azul} stroke={C.hielo} strokeWidth="0.6" className="v-gota" style={{ '--dx': `${dx}px`, '--dy': `${dy}px`, '--d': `${d}s` }} />
      ))}
    </g>
  );
}

/** <AnimacionRadiactivo tipo="snap27|mmrtg|snap19|nak" size={200} /> */
export default function AnimacionRadiactivo({ tipo = 'snap27', size = 200, className = '', style }) {
  const id = useId();
  const d = TIPOS_RADIACTIVO[tipo] || { ...TIPOS_RADIACTIVO.snap27, nombre: 'RTG', uso: 'generador de radioisótopos' };
  const etiqueta = d.reactor
    ? tr(`${d.nombre}: reactor nuclear que suelta gotas de ${d.isotopo}`, `${t(d.nombre)}: nuclear reactor releasing ${d.isotopo} droplets`)
    : tr(`${d.nombre}: generador de radioisótopos con ${d.isotopo}, ${d.vida}`, `${d.nombre}: radioisotope generator with ${d.isotopo}, ${t(d.vida)}`);
  return (
    <Lienzo size={size} ancho={200} alto={200} etiqueta={etiqueta} className={`v-radiactivo v-radiactivo-${tipo} ${className}`} style={style}>
      <Estrellas n={10} ancho={200} alto={200} semilla={9} tenue />
      {d.reactor ? <ReactorNak id={`${id}g`} /> : <Rtg id={`${id}g`} />}
      <circle cx="166" cy="40" r="20" fill={C.sup} stroke={C.rojo} strokeOpacity="0.5" strokeWidth="1" />
      <Atomo x={166} y={40} r={13} dur="12s" />
      <Texto x={100} y={180} tam={9} color={C.tinta}>{`${t(d.nombre)} · ${t(d.uso)}`}</Texto>
      <Texto x={100} y={193} tam={7} color={d.reactor ? C.azul : C.rojo} className="v-fino">{`${d.isotopo} · ${t(d.vida)}`}</Texto>
    </Lienzo>
  );
}
