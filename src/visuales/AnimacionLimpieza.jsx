// Fases de una limpieza orbital: imán, red, protocolo "1 lanzamiento = 1 limpieza" y envío al Sol.
import { C, T, TF, Lienzo, Estrellas, Tierra, Sol, Satelite, Etiqueta, Texto, Fragmento } from './comunes.jsx';

const FASES = {
  iman: { etiqueta: 'Satélite limpiador con brazo magnético que atrae fragmentos metálicos' },
  malla: { etiqueta: 'Red que se despliega desde un satélite y envuelve restos no metálicos' },
  protocolo: { etiqueta: 'Por cada satélite lanzado sale otro que limpia: 1 lanzamiento = 1 limpieza' },
  alsol: { etiqueta: 'Cápsula que sale de la Tierra hacia el Sol cuando se abre la ventana de lanzamiento' },
};
export const FASES_LIMPIEZA = Object.keys(FASES);

function Iman() {
  const chips = [[30, 40, 0], [24, 86, 0.7], [44, 128, 1.4], [70, 24, 2.1], [66, 146, 2.8], [92, 60, 3.4]];
  return (
    <g>
      <Satelite x={206} y={84} escala={0.8} color={C.aqua} />
      <g {...T}><line x1="190" y1="84" x2="150" y2="84" /><circle cx="150" cy="84" r="2.5" fill={C.sup2} /><line x1="150" y1="84" x2="134" y2="84" /></g>
      <path d="M134 72 L118 72 A12 12 0 0 0 118 96 L134 96" fill="none" stroke={C.tinta2} strokeWidth="7" strokeLinecap="butt" />
      <path d="M134 72 L124 72 M134 96 L124 96" stroke={C.rojo} strokeWidth="7" />
      <path d="M124 72 L118 72 A12 12 0 0 0 118 96 L124 96" fill="none" stroke={C.azul} strokeWidth="7" />
      <g stroke={C.azul} strokeWidth="0.7" fill="none" opacity="0.6" className="v-pulso"><path d="M104 66 A20 20 0 0 0 104 102 M94 58 A30 30 0 0 0 94 110" /></g>
      {chips.map(([x, y, d], i) => <Fragmento key={i} x={x} y={y} s={5} className="v-atraer" style={{ '--dx': `${108 - x}px`, '--dy': `${84 - y}px`, '--d': `${d}s` }} />)}
      <Texto x={130} y={166} tam={7} color={C.tinta3} className="v-fino">imán: atrae los pedazos de metal</Texto>
    </g>
  );
}

function Malla() {
  const copos = [[70, 100, C.magenta], [180, 90, C.oro], [100, 140, C.violeta], [160, 134, C.magenta], [130, 70, C.oro], [84, 60, C.violeta]];
  return (
    <g>
      <Satelite x={130} y={30} escala={0.8} color={C.aqua} />
      <g className="v-desplegar" style={{ transformOrigin: '130px 44px' }}>
        <path d="M130 44 L58 150 Q130 170 202 150 Z" fill={C.aqua} opacity="0.1" />
        <g stroke={C.aqua} strokeWidth="0.8" fill="none">
          {[0.25, 0.5, 0.75, 1].map((k) => <path key={k} d={`M${130 - 72 * k} ${44 + 106 * k} Q130 ${44 + 126 * k} ${130 + 72 * k} ${44 + 106 * k}`} />)}
          {[-1, -0.5, 0, 0.5, 1].map((k) => <line key={k} x1="130" y1="44" x2={130 + 72 * k} y2={150 + (1 - Math.abs(k)) * 10} />)}
        </g>
      </g>
      {copos.map(([x, y, c], i) => (
        <g key={i} className="v-atraer" style={{ '--dx': `${130 - x}px`, '--dy': `${110 - y}px`, '--d': `${1.4 + i * 0.3}s` }}>
          <polygon points={`${x - 5},${y - 2} ${x},${y - 6} ${x + 5},${y - 1} ${x + 3},${y + 5} ${x - 4},${y + 4}`} fill={c} {...TF} />
        </g>
      ))}
      <Texto x={130} y={170} tam={7} color={C.tinta3} className="v-fino">red: pintura, espuma y plástico</Texto>
    </g>
  );
}

function Protocolo() {
  return (
    <g>
      <Tierra x={40} y={160} r={54} />
      <line x1="60" y1="112" x2="178" y2="38" stroke={C.tinta3} strokeWidth="0.6" strokeDasharray="2 4" />
      <g className="v-lanzar" style={{ '--d': '0s' }}><Satelite x={60} y={112} escala={0.5} rot={-50} /></g>
      <g className="v-lanzar" style={{ '--d': '1.3s' }}><Satelite x={60} y={112} escala={0.5} rot={-50} color={C.aqua} panel={C.aqua} /></g>
      <g transform="translate(176 36)">
        <circle r="3" fill={C.azul} /><circle cx="22" cy="-4" r="3" fill={C.aqua} />
        <line x1="4" y1="-1" x2="18" y2="-3" stroke={C.tinta2} strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      </g>
      <Etiqueta x={160} y={96} texto="1 lanzamiento = 1 limpieza" color={C.aqua} tam={7.5} />
      <Texto x={160} y={120} tam={6.5} color={C.tinta3} className="v-fino">cada satélite nuevo paga su limpiador</Texto>
    </g>
  );
}

function AlSol() {
  return (
    <g>
      <Tierra x={44} y={104} r={20} />
      <Sol x={222} y={104} r={16} />
      <path d="M47 95 A250 250 0 0 1 217 95" fill="none" stroke={C.tinta3} strokeWidth="0.6" strokeDasharray="2 4" />
      <g className="v-alsol" style={{ transformOrigin: '132px 330px' }}>
        <g transform="translate(132 80)">
          <path d="M-10 -5 L6 -5 L14 0 L6 5 L-10 5 Z" fill={C.hielo} {...T} />
          <rect x="-10" y="-3" width="4" height="6" fill={C.azul} />
          <path d="M-10 -3 L-18 -5 L-16 0 L-18 5 L-10 3 Z" fill={C.naranja} className="v-llama" style={{ transformBox: 'fill-box', transformOrigin: 'right center' }} />
        </g>
      </g>
      <circle cx="44" cy="66" r="4" fill={C.oro} className="v-ventana" />
      <circle cx="44" cy="66" r="6.5" fill="none" stroke={C.oro} strokeWidth="0.8" strokeOpacity="0.6" />
      <Texto x={44} y={54} tam={6.5} color={C.oro}>ventana</Texto>
      <Texto x={130} y={166} tam={7} color={C.tinta3} className="v-fino">lo más peligroso se envía al Sol</Texto>
    </g>
  );
}

const DIBUJOS = { iman: Iman, malla: Malla, protocolo: Protocolo, alsol: AlSol };

/** <AnimacionLimpieza fase="iman|malla|protocolo|alsol" size={260} /> */
export default function AnimacionLimpieza({ fase = 'iman', size = 260, className = '', style }) {
  const k = DIBUJOS[fase] ? fase : 'iman';
  const Dibujo = DIBUJOS[k];
  return (
    <Lienzo size={size} ancho={260} alto={180} etiqueta={FASES[k].etiqueta} className={`v-limpieza v-limpieza-${k} ${className}`} style={style}>
      <Estrellas n={18} ancho={260} alto={180} semilla={k.length * 13} tenue />
      <Dibujo />
    </Lienzo>
  );
}
