// Animaciones de soluciones (parte B). ViewBox 220×170.
import { C, T, TF, Tierra, Satelite, Etiqueta, Texto, Suelo, Llama, Fragmento } from './comunes.jsx';

function MiniRover({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <line x1="-6" y1="-6" x2="-6" y2="-24" {...T} /><rect x="-11" y="-28" width="10" height="5" rx="1" fill={C.sup2} {...TF} />
      <rect x="-24" y="-6" width="48" height="12" rx="2" fill={C.tinta2} {...T} />
      <rect x="-20" y="-10" width="40" height="4" fill={C.azul} {...TF} />
      {[-18, 0, 18].map((dx) => <circle key={dx} cx={dx} cy="10" r="5" fill={C.sup} stroke={C.tinta2} strokeWidth="1.2" />)}
    </g>
  );
}

export function Proteccion() {
  const esporas = [[20, 60, 36, 8, C.magenta, 0], [26, 110, 26, -14, C.verde, 1.1], [200, 70, -34, 10, C.magenta, 0.5], [196, 120, -26, -10, C.verde, 1.7], [110, 14, 0, 22, C.violeta, 2.3]];
  return (
    <g>
      <line x1="30" y1="124" x2="190" y2="124" stroke={C.tinta2} strokeWidth="1" />
      <path d="M50 124 Q110 20 170 124" fill={C.aqua} opacity="0.1" />
      <path d="M50 124 Q110 20 170 124" fill="none" stroke={C.aqua} strokeWidth="1.6" />
      <g stroke={C.aqua} strokeWidth="0.6" opacity="0.6"><path d="M66 124 Q110 48 154 124 M84 124 Q110 70 136 124" fill="none" /></g>
      <rect x="96" y="54" width="28" height="8" rx="2" fill={C.sup} stroke={C.aqua} strokeWidth="1" />
      <g stroke={C.aqua} strokeWidth="0.7">{[100, 104, 108, 112, 116, 120].map((x) => <line key={x} x1={x} y1="55" x2={x} y2="61" />)}</g>
      <MiniRover x={110} y={108} />
      {esporas.map(([x, y, dx, dy, c, d], i) => (
        <g key={i} className="v-espora" style={{ '--dx': `${dx}px`, '--dy': `${dy}px`, '--d': `${d}s` }}>
          <circle cx={x} cy={y} r="3.2" fill={c} /><circle cx={x} cy={y} r="5.5" fill="none" stroke={c} strokeWidth="0.6" strokeDasharray="1.5 1.5" />
        </g>
      ))}
      <Texto x={110} y={150} tam={7} color={C.tinta3} className="v-fino">sala limpia: nada de microbios a bordo</Texto>
    </g>
  );
}

export function Whipple() {
  const frags = [[14, -22], [26, -10], [30, 4], [22, 18], [12, 28], [8, -30]];
  return (
    <g>
      <rect x="118" y="30" width="4" height="110" rx="1" fill={C.tinta2} />
      <rect x="164" y="30" width="10" height="110" rx="1" fill={C.azul} {...T} />
      <Texto x={120} y={22} tam={6.5} color={C.tinta3} className="v-fino">parachoques</Texto>
      <Texto x={169} y={22} tam={6.5} color={C.tinta3} className="v-fino">pared</Texto>
      <g className="v-impacto" style={{ '--dx': '84px' }}>
        <circle cx="32" cy="84" r="4" fill={C.naranja} />
        <line x1="8" y1="84" x2="26" y2="84" stroke={C.naranja} strokeWidth="1" opacity="0.6" />
      </g>
      <circle cx="120" cy="84" r="9" fill={C.oro} className="v-destello" style={{ transformOrigin: '120px 84px' }} />
      {frags.map(([dx, dy], i) => (
        <circle key={i} cx="121" cy="84" r="1.6" fill={C.naranja} className="v-fragmento" style={{ '--dx': `${dx}px`, '--dy': `${dy}px` }} />
      ))}
      <Texto x={110} y={158} tam={7} color={C.tinta3} className="v-fino">el impacto se deshace antes de la pared</Texto>
    </g>
  );
}

export function Pasivacion() {
  return (
    <g>
      <rect x="34" y="58" width="48" height="74" rx="14" fill={C.grisClaro} {...T} />
      <rect x="54" y="46" width="8" height="12" fill={C.gris} {...TF} /><line x1="48" y1="46" x2="68" y2="46" {...T} />
      {[0, 1, 2].map((i) => <circle key={i} cx={58 + (i - 1) * 4} cy="40" r={2.5 + i * 0.5} fill={C.tinta2} opacity="0.6" className="v-calor" style={{ '--d': `${i * 1}s`, '--dur': '3s' }} />)}
      <Texto x={58} y={150} tam={6.5} color={C.tinta3} className="v-fino">tanque: ventear</Texto>
      <rect x="128" y="74" width="60" height="30" rx="4" fill={C.sup2} {...T} /><rect x="188" y="83" width="5" height="12" rx="1" fill={C.tinta2} />
      <g className="v-vaciar" style={{ transformOrigin: '131px 89px' }}><rect x="131" y="77" width="54" height="24" rx="2" fill={C.aqua} /></g>
      <Texto x={158} y={150} tam={6.5} color={C.tinta3} className="v-fino">batería: descargar</Texto>
      <Texto x={110} y={28} tam={7} color={C.tinta2}>sin energía guardada, no explota</Texto>
    </g>
  );
}

export function Desorbita() {
  return (
    <g>
      <Tierra x={58} y={160} r={44} nubes={false} />
      <line x1="150" y1="50" x2="78" y2="124" stroke={C.tinta3} strokeWidth="0.6" strokeDasharray="2 3" />
      <g className="v-descender">
        <g transform="rotate(-45 150 50)"><Llama x={150} y={60} w={7} h={14} /></g>
        <Satelite x={150} y={50} escala={0.55} />
      </g>
      <Etiqueta x={168} y={130} texto="frenar y caer" color={C.naranja} tam={7} />
    </g>
  );
}

export function Elipse() {
  const rx = 66; const ry = 34; const k = ry / rx;
  return (
    <g>
      <circle cx="88" cy="85" r="25" fill={C.azul} opacity="0.14" />
      <circle cx="88" cy="85" r="25" fill="none" stroke={C.azul} strokeWidth="0.8" strokeDasharray="2 3" />
      <Tierra x={88} y={85} r={15} nubes={false} />
      <ellipse cx="132" cy="85" rx={rx} ry={ry} fill="none" stroke={C.tinta2} strokeWidth="0.9" strokeDasharray="3 2" />
      <g transform={`translate(132 85) scale(1 ${k.toFixed(4)})`}>
        <g className="v-girar" style={{ transformOrigin: '0px 0px', '--dur': '6s' }}>
          <g transform={`translate(${-rx} 0) scale(1 ${(1 / k).toFixed(4)})`}><Satelite x={0} y={0} escala={0.4} /></g>
        </g>
      </g>
      <Texto x={62} y={128} tam={6.5} color={C.azul} className="v-fino">roza la atmósfera</Texto>
      <Texto x={110} y={156} tam={7} color={C.tinta3} className="v-fino">cada vuelta frena un poco más</Texto>
    </g>
  );
}

export function Reutilizable() {
  return (
    <g>
      <Suelo ancho={220} y={146} alto={170} color="#20262e" />
      <rect x="70" y="142" width="80" height="4" rx="1" fill={C.gris} stroke={C.tinta2} strokeWidth="0.8" />
      <path d="M100 136 L120 144 M120 136 L100 144" stroke={C.oro} strokeWidth="1.4" />
      <g className="v-aterrizar">
        <rect x="100" y="48" width="20" height="78" rx="4" fill={C.hielo} {...T} />
        <rect x="100" y="66" width="20" height="6" fill={C.fondo} opacity="0.8" />
        <g stroke={C.tinta2} strokeWidth="1"><line x1="96" y1="58" x2="100" y2="58" /><line x1="120" y1="58" x2="124" y2="58" /></g>
        <g transform="translate(102 124)"><g className="v-pata" style={{ transformOrigin: '0px 0px', '--ang': '36deg' }}><line x1="0" y1="0" x2="0" y2="18" stroke={C.tinta2} strokeWidth="2" strokeLinecap="round" /></g></g>
        <g transform="translate(118 124)"><g className="v-pata" style={{ transformOrigin: '0px 0px', '--ang': '-36deg' }}><line x1="0" y1="0" x2="0" y2="18" stroke={C.tinta2} strokeWidth="2" strokeLinecap="round" /></g></g>
        <g className="v-encendido"><Llama x={110} y={126} w={10} h={20} /></g>
      </g>
      <Etiqueta x={176} y={40} texto="vuelve a casa" color={C.aqua} tam={7} />
    </g>
  );
}

export function Laser() {
  return (
    <g>
      <Suelo ancho={220} y={150} alto={170} color="#1f2a1f" />
      <path d="M26 152 Q40 132 54 152" fill={C.sup2} {...T} />
      <line x1="40" y1="142" x2="40" y2="134" {...T} />
      <line x1="40" y1="134" x2="150" y2="54" stroke={C.rojo} strokeWidth="1.4" className="v-laser" />
      <g className="v-empujar"><Fragmento x={152} y={50} s={7} /></g>
      <g className="v-pulso" stroke={C.oro} strokeWidth="1.2" fill="none"><path d="M176 48 L176 70 M171 65 L176 71 L181 65" /></g>
      <Texto x={110} y={24} tam={7} color={C.tinta2}>un empujón de luz, sin tocarlo</Texto>
    </g>
  );
}

export function Generico() {
  return (
    <g>
      <Tierra x={60} y={110} r={34} />
      <circle cx="60" cy="110" r="70" fill="none" stroke={C.tinta3} strokeWidth="0.6" strokeDasharray="1 4" />
      <g className="v-girar" style={{ transformOrigin: '60px 110px', '--dur': '14s' }}><Satelite x={130} y={110} escala={0.55} rot={90} /></g>
      <g className="v-flotar"><Satelite x={170} y={44} escala={0.5} color={C.aqua} /></g>
    </g>
  );
}
