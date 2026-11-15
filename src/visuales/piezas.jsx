// Dibujos de cada clase de objeto (viewBox 120×120, centro ≈ 60,62). Usados por IlustracionObjeto.
import { C, T, TF, Suelo, Texto } from './comunes.jsx';

const ORO = '#b8841c'; // lámina dorada de los módulos lunares
const ALU = '#9a9a93';

function Patas({ cx = 60, y = 70, n = 4, l = 22, color = ALU }) {
  const xs = n === 3 ? [-22, 0, 22] : [-26, -9, 9, 26];
  return xs.map((dx, i) => (
    <g key={i} {...T} stroke={color}>
      <line x1={cx + dx * 0.5} y1={y} x2={cx + dx} y2={y + l} />
      <line x1={cx + dx - 4} y1={y + l} x2={cx + dx + 4} y2={y + l} strokeWidth="2.2" />
    </g>
  ));
}

export function ModuloDescenso() {
  return (
    <g>
      <Suelo ancho={120} y={94} alto={120} />
      <Patas cx={60} y={70} n={4} l={22} />
      <polygon points="38,52 46,44 74,44 82,52 82,70 74,78 46,78 38,70" fill={ORO} {...T} />
      <rect x="50" y="52" width="20" height="18" rx="2" fill="#7a5411" stroke={C.tinta2} strokeWidth="0.8" />
      <g {...TF}><line x1="50" y1="58" x2="70" y2="58" /><line x1="50" y1="64" x2="70" y2="64" /></g>
      <g {...T} stroke={C.tinta2}><line x1="44" y1="60" x2="36" y2="94" /><line x1="50" y1="60" x2="42" y2="94" />{[0, 1, 2, 3, 4].map((i) => <line key={i} x1={43 - i * 1.6} y1={64 + i * 6.5} x2={49 - i * 1.6} y2={64 + i * 6.5} />)}</g>
      <path d="M54 78 L50 88 L70 88 L66 78 Z" fill={C.sup2} {...T} />
    </g>
  );
}

export function ModuloAscenso() {
  return (
    <g className="v-flotar">
      <polygon points="40,56 48,44 72,44 80,56 80,74 72,82 48,82 40,74" fill={ALU} {...T} />
      <rect x="36" y="60" width="8" height="14" rx="1.5" fill="#75746f" {...TF} />
      <rect x="76" y="60" width="8" height="14" rx="1.5" fill="#75746f" {...TF} />
      <polygon points="50,52 58,52 56,62 50,62" fill={C.fondo} {...TF} />
      <polygon points="62,52 70,52 70,62 64,62" fill={C.fondo} {...TF} />
      <g {...T} stroke={C.tinta2}><line x1="60" y1="44" x2="60" y2="30" /><circle cx="60" cy="28" r="2.5" fill={C.sup2} /></g>
      <g {...TF}><line x1="80" y1="52" x2="90" y2="48" /><line x1="80" y1="52" x2="90" y2="56" /><line x1="40" y1="52" x2="30" y2="48" /><line x1="40" y1="52" x2="30" y2="56" /></g>
      <path d="M54 82 L52 90 L68 90 L66 82 Z" fill={C.sup2} {...T} />
    </g>
  );
}

export function EtapaCohete({ color = C.tinta, pregunta = false }) {
  return (
    <g className="v-balanceo" style={{ transformOrigin: '60px 60px', '--dur': '6s' }}>
      <rect x="46" y="18" width="28" height="70" rx="6" fill={color} {...T} />
      <rect x="46" y="30" width="28" height="8" fill={C.fondo} opacity="0.85" />
      <rect x="46" y="66" width="28" height="6" fill={C.fondo} opacity="0.85" />
      <rect x="60" y="18" width="14" height="70" rx="6" fill={C.fondo} opacity="0.18" />
      <path d="M52 88 L48 104 L72 104 L68 88 Z" fill={C.sup2} {...T} />
      <ellipse cx="60" cy="104" rx="12" ry="2.5" fill={C.sup} {...TF} />
      {pregunta && <Texto x={60} y={56} tam={20} color={C.sup} peso="800">?</Texto>}
    </g>
  );
}

export function Rover({ solar = true, color = C.tinta2 }) {
  return (
    <g>
      <Suelo ancho={120} y={94} alto={120} />
      <g {...T}><line x1="52" y1="62" x2="52" y2="34" /><rect x="46" y="28" width="12" height="7" rx="1.5" fill={C.sup2} /><circle cx="49.5" cy="31.5" r="1.2" fill={C.azul} /><circle cx="54.5" cy="31.5" r="1.2" fill={C.azul} /></g>
      <rect x="30" y="62" width="60" height="18" rx="3" fill={color} {...T} />
      {solar && <rect x="34" y="56" width="52" height="8" rx="1" fill={C.azul} {...TF} />}
      {solar && <g stroke={C.tinta2} strokeWidth="0.5">{[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={42 + i * 8} y1="56" x2={42 + i * 8} y2="64" />)}</g>}
      <g {...TF} stroke={C.tinta2}><path d="M30 76 L22 86 M46 76 L46 86 M60 76 L60 86 M74 76 L74 86 M90 76 L98 86 M36 80 L46 86 M84 80 L74 86" /></g>
      {[24, 46, 60, 74, 96, 38].map((x, i) => (
        <g key={i} className="v-girar v-centro" style={{ '--dur': '5s' }}>
          <circle cx={x} cy="88" r="6" fill={C.sup} stroke={C.tinta2} strokeWidth="1.2" />
          <line x1={x - 3.5} y1="88" x2={x + 3.5} y2="88" stroke={C.tinta2} strokeWidth="0.8" /><line x1={x} y1="84.5" x2={x} y2="91.5" stroke={C.tinta2} strokeWidth="0.8" />
        </g>
      ))}
      <rect x="82" y="50" width="10" height="12" rx="1" fill={C.oro} {...TF} />
    </g>
  );
}

export function RoverLunar() {
  return (
    <g>
      <Suelo ancho={120} y={94} alto={120} />
      <g {...T}><line x1="68" y1="60" x2="68" y2="32" /><path d="M56 32 Q68 18 80 32" fill={C.sup2} /><line x1="68" y1="32" x2="68" y2="24" strokeWidth="1" /></g>
      <rect x="26" y="66" width="68" height="8" rx="2" fill={ALU} {...T} />
      <g fill={C.sup2} {...TF}><rect x="36" y="54" width="10" height="12" rx="1.5" /><rect x="50" y="54" width="10" height="12" rx="1.5" /></g>
      <rect x="30" y="60" width="4" height="6" fill={C.oro} {...TF} />
      <rect x="84" y="58" width="8" height="8" rx="1" fill={C.azul} {...TF} />
      {[34, 50, 72, 88].map((x, i) => (
        <g key={i} className="v-girar v-centro" style={{ '--dur': '4.5s' }}>
          <circle cx={x} cy="84" r="8" fill="none" stroke={C.tinta2} strokeWidth="1.4" />
          <circle cx={x} cy="84" r="4.5" fill="none" stroke={C.tinta2} strokeWidth="0.6" strokeDasharray="1.2 1.2" />
          <circle cx={x} cy="84" r="1.5" fill={C.tinta2} />
        </g>
      ))}
      <g {...TF}><line x1="34" y1="76" x2="34" y2="84" /><line x1="50" y1="76" x2="50" y2="84" /><line x1="72" y1="76" x2="72" y2="84" /><line x1="88" y1="76" x2="88" y2="84" /></g>
    </g>
  );
}

export function Helicoptero() {
  return (
    <g>
      <Suelo ancho={120} y={96} alto={120} />
      <g className="v-flotar" style={{ '--dur': '3s' }}>
        <g className="v-girar v-centro" style={{ '--dur': '2s' }}><ellipse cx="60" cy="40" rx="34" ry="2.6" fill={C.gris} {...TF} /></g>
        <g className="v-girar-inv v-centro" style={{ '--dur': '2s' }}><ellipse cx="60" cy="46" rx="34" ry="2.6" fill={C.gris} {...TF} /></g>
        <line x1="60" y1="36" x2="60" y2="62" {...T} />
        <rect x="52" y="60" width="16" height="12" rx="2" fill={C.oro} {...T} />
        <rect x="55" y="52" width="10" height="5" fill={C.azul} {...TF} />
        <g {...TF}><line x1="54" y1="72" x2="46" y2="88" /><line x1="66" y1="72" x2="74" y2="88" /><line x1="57" y1="72" x2="53" y2="88" /><line x1="63" y1="72" x2="67" y2="88" /></g>
      </g>
    </g>
  );
}

export function Orbitador({ color = C.tinta2 }) {
  return (
    <g className="v-flotar" style={{ '--dur': '5s' }}>
      <rect x="10" y="54" width="34" height="16" rx="1.5" fill={C.azul} {...T} />
      <rect x="76" y="54" width="34" height="16" rx="1.5" fill={C.azul} {...T} />
      <g stroke={C.tinta2} strokeWidth="0.5">{[18, 26, 34, 84, 92, 100].map((x) => <line key={x} x1={x} y1="54" x2={x} y2="70" />)}<line x1="10" y1="62" x2="44" y2="62" /><line x1="76" y1="62" x2="110" y2="62" /></g>
      <rect x="44" y="48" width="32" height="28" rx="3" fill={color} {...T} />
      <rect x="50" y="54" width="20" height="16" rx="1.5" fill={C.sup2} {...TF} />
      <g {...T}><line x1="60" y1="48" x2="60" y2="36" /><path d="M48 34 Q60 22 72 34" fill={C.sup2} /><line x1="60" y1="34" x2="60" y2="27" strokeWidth="1" /></g>
      <circle cx="56" cy="62" r="2" fill={C.rojo} className="v-pulso" />
    </g>
  );
}

export function SondaImpacto() {
  return (
    <g>
      <Suelo ancho={120} y={100} alto={120} />
      <g {...TF} stroke={C.tinta3} className="v-pulso"><line x1="90" y1="14" x2="78" y2="30" /><line x1="100" y1="22" x2="88" y2="38" /><line x1="80" y1="10" x2="70" y2="24" /></g>
      <g transform="rotate(35 60 60)">
        <polygon points="60,20 70,58 50,58" fill={C.grisClaro} {...T} />
        <polygon points="46,58 74,58 70,72 50,72" fill={C.gris} {...T} />
        <rect x="52" y="62" width="16" height="6" fill={C.azul} {...TF} />
        <g {...T}><line x1="46" y1="62" x2="30" y2="54" /><line x1="74" y1="62" x2="90" y2="54" /><line x1="60" y1="72" x2="60" y2="84" /><circle cx="60" cy="86" r="2" fill={C.sup2} /></g>
      </g>
      <path d="M44 100 L52 92 L60 100 L68 94 L76 100" fill="none" stroke={C.rojo} strokeWidth="1.2" className="v-pulso" />
    </g>
  );
}

export function AterrizadorPatas({ color = C.tinta2 }) {
  return (
    <g>
      <Suelo ancho={120} y={94} alto={120} />
      <Patas cx={60} y={70} n={3} l={22} />
      <polygon points="42,56 50,48 70,48 78,56 78,70 70,78 50,78 42,70" fill={color} {...T} />
      <rect x="52" y="56" width="16" height="14" rx="1.5" fill={C.sup2} {...TF} />
      <g {...T}><line x1="52" y1="48" x2="52" y2="34" /><path d="M40 34 Q52 22 64 34" fill={C.azul} /></g>
      <rect x="78" y="52" width="20" height="8" rx="1" fill={C.azul} {...TF} />
      <g {...T}><line x1="72" y1="48" x2="80" y2="40" /><circle cx="82" cy="38" r="2.5" fill={C.sup2} /></g>
    </g>
  );
}

export function Retrorreflector() {
  return (
    <g>
      <Suelo ancho={120} y={94} alto={120} />
      <line x1="94" y1="8" x2="64" y2="56" stroke={C.rojo} strokeWidth="1.3" className="v-laser" />
      <line x1="64" y1="56" x2="94" y2="8" stroke={C.oro} strokeWidth="1.3" className="v-laser" style={{ animationDelay: '0.4s' }} />
      <circle cx="94" cy="8" r="2.2" fill={C.rojo} className="v-pulso" />
      <g transform="rotate(-18 60 68)">
        <rect x="34" y="50" width="52" height="36" rx="2" fill={C.hielo} {...T} />
        {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <circle key={`${r}${c}`} cx={41.5 + c * 12.3} cy={57.5 + r * 10.5} r="4" fill={C.sup2} stroke={C.azul} strokeWidth="0.9" />))}
      </g>
      <g {...T}><line x1="42" y1="86" x2="44" y2="94" /><line x1="80" y1="84" x2="80" y2="94" /></g>
    </g>
  );
}

export function Bolsa() {
  return (
    <g>
      <Suelo ancho={120} y={96} alto={120} />
      <path d="M44 44 Q60 36 76 44 L84 94 L36 94 Z" fill={C.hielo} {...T} />
      <path d="M48 46 Q60 40 72 46" fill="none" {...TF} />
      <path d="M52 44 L48 32 Q60 26 72 32 L68 44" fill="#e8e6dc" {...T} />
      <g {...TF} stroke={C.gris}><path d="M46 66 Q60 70 74 66 M44 80 Q60 86 76 80" fill="none" /></g>
      <g transform="rotate(8 78 60)"><rect x="70" y="52" width="18" height="12" rx="1.5" fill={C.oro} {...TF} /><Texto x={79} y={61.5} tam={8} color={C.sup} peso="800">96</Texto><line x1="70" y1="52" x2="66" y2="46" {...TF} /></g>
    </g>
  );
}

export function Alsep() {
  return (
    <g>
      <Suelo ancho={120} y={94} alto={120} />
      <g {...TF} stroke={C.tinta3}><path d="M44 86 Q30 88 18 86 M74 86 Q90 90 104 86 M58 86 Q62 92 70 94" fill="none" strokeDasharray="2 2" /></g>
      <rect x="40" y="64" width="24" height="20" rx="2" fill={C.oro} {...T} />
      <g {...T}><line x1="52" y1="64" x2="52" y2="44" /><path d="M42 44 Q52 34 62 44" fill={C.sup2} /></g>
      <g>
        <rect x="76" y="66" width="16" height="20" rx="3" fill={C.gris} {...T} />
        {[0, 1, 2, 3].map((i) => <line key={i} x1="72" y1={70 + i * 4} x2="96" y2={70 + i * 4} stroke={C.tinta2} strokeWidth="1.3" />)}
        <g className="v-calor" style={{ '--dur': '3.4s' }}><path d="M80 62 q2 -3 0 -6 M88 62 q-2 -3 0 -6" fill="none" stroke={C.naranja} strokeWidth="1" /></g>
      </g>
      <rect x="12" y="78" width="10" height="8" rx="1" fill={C.azul} {...TF} />
      <rect x="100" y="80" width="8" height="6" rx="1" fill={C.magenta} {...TF} />
    </g>
  );
}

export function SondaProfunda() {
  return (
    <g className="v-flotar" style={{ '--dur': '6s' }}>
      <ellipse cx="60" cy="50" rx="36" ry="12" fill={C.hielo} {...T} />
      <ellipse cx="60" cy="50" rx="30" ry="9" fill="none" stroke={C.gris} strokeWidth="0.6" />
      <g {...T}><line x1="60" y1="50" x2="60" y2="30" /><line x1="40" y1="54" x2="60" y2="30" /><line x1="80" y1="54" x2="60" y2="30" /><circle cx="60" cy="28" r="2.5" fill={C.sup2} /></g>
      <polygon points="48,60 72,60 76,74 44,74" fill={C.azul} {...T} />
      <g {...T}><line x1="44" y1="64" x2="14" y2="56" /><line x1="76" y1="64" x2="106" y2="56" /><line x1="60" y1="74" x2="60" y2="98" /></g>
      <g fill={C.gris} {...TF}><rect x="8" y="50" width="10" height="12" rx="2" /><rect x="102" y="50" width="10" height="12" rx="2" /></g>
      <rect x="54" y="80" width="14" height="10" rx="1" fill={C.oro} {...TF} />
      <g stroke={C.sup} strokeWidth="0.7"><circle cx="58" cy="85" r="2" fill="none" /><line x1="62" y1="82" x2="62" y2="88" /><line x1="65" y1="82" x2="65" y2="88" /></g>
    </g>
  );
}

export function Telescopio() {
  return (
    <g className="v-flotar" style={{ '--dur': '5s' }}><g transform="rotate(-22 60 60)">
      <rect x="46" y="20" width="28" height="60" rx="4" fill={C.hielo} {...T} />
      <rect x="46" y="20" width="28" height="10" rx="3" fill={C.sup2} {...T} />
      <circle cx="60" cy="25" r="3" fill={C.fondo} />
      <rect x="52" y="34" width="16" height="40" rx="1.5" fill={C.azul} {...TF} />
      <g stroke={C.tinta2} strokeWidth="0.5">{[42, 50, 58, 66].map((y) => <line key={y} x1="52" y1={y} x2="68" y2={y} />)}</g>
      <polygon points="46,80 74,80 70,94 50,94" fill={C.gris} {...T} />
      <g {...T}><line x1="74" y1="88" x2="88" y2="92" /><path d="M86 88 Q94 92 88 98" fill={C.sup2} /></g>
    </g></g>
  );
}

export function Nave() {
  return (
    <g className="v-flotar">
      <path d="M44 86 L50 38 Q60 22 70 38 L76 86 Z" fill={C.hielo} {...T} />
      <ellipse cx="60" cy="86" rx="16" ry="4" fill={C.sup2} {...T} />
      <circle cx="60" cy="48" r="4" fill={C.azul} {...TF} />
      <rect x="20" y="58" width="24" height="10" rx="1" fill={C.azul} {...TF} /><rect x="76" y="58" width="24" height="10" rx="1" fill={C.azul} {...TF} />
    </g>
  );
}

export const DIBUJOS = {
  'modulo-descenso': ModuloDescenso, 'modulo-ascenso': ModuloAscenso, 'etapa-cohete': EtapaCohete, rover: Rover, 'rover-lunar': RoverLunar,
  helicoptero: Helicoptero, orbitador: Orbitador, 'sonda-impacto': SondaImpacto, 'aterrizador-patas': AterrizadorPatas, retrorreflector: Retrorreflector,
  bolsa: Bolsa, alsep: Alsep, 'sonda-profunda': SondaProfunda, telescopio: Telescopio,
  'cohete-desconocido': () => <EtapaCohete color={C.gris} pregunta />, nave: Nave,
};
