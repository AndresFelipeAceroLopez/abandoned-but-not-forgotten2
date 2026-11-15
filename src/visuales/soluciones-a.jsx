// Animaciones de soluciones (parte A). Todas dibujan dentro de un viewBox 220×170.
import { C, T, TF, Tierra, Satelite, Etiqueta, Texto, Suelo } from './comunes.jsx';

export function Regla5() {
  return (
    <g>
      <circle cx="110" cy="95" r="36" fill={C.azul} opacity="0.12" />
      <circle cx="110" cy="95" r="36" fill="none" stroke={C.azul} strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
      <Tierra x={110} y={95} r={24} />
      <circle cx="110" cy="95" r="62" fill="none" stroke={C.tinta3} strokeWidth="0.6" strokeDasharray="1 4" />
      <g className="v-caer" style={{ transformOrigin: '110px 95px' }}>
        <g className="v-arder">
          <path d="M160 95 L196 88 L190 95 L196 102 Z" fill={C.naranja} opacity="0.9" />
          <path d="M164 95 L186 91 L186 99 Z" fill={C.oro} />
        </g>
        <Satelite x={172} y={95} escala={0.5} rot={90} />
      </g>
      <Etiqueta x={38} y={22} texto="5 años" color={C.oro} tam={8} />
      <Texto x={38} y={38} tam={6} color={C.tinta3} className="v-fino">máximo en órbita</Texto>
    </g>
  );
}

export function Carta() {
  const cols = [C.azul, C.naranja, C.aqua, C.oro, C.magenta, C.violeta, C.rojo, C.tinta2];
  const hex = (x, y, r) => Array.from({ length: 6 }, (_, i) => `${x + r * Math.cos((Math.PI / 3) * i)},${y + r * Math.sin((Math.PI / 3) * i)}`).join(' ');
  return (
    <g>
      <g className="v-unir" style={{ transformOrigin: '110px 88px' }}>
        {cols.map((c, i) => {
          const a = (i / cols.length) * Math.PI * 2; const x = 110 + Math.cos(a) * 50; const y = 88 + Math.sin(a) * 50;
          return <g key={i}><polygon points={hex(x, y, 11)} fill={c} opacity="0.9" {...TF} /><line x1={x} y1={y} x2={x + 8} y2={y - 8} stroke={C.sup} strokeWidth="2" strokeLinecap="round" /></g>;
        })}
        <circle cx="110" cy="88" r="50" fill="none" stroke={C.tinta2} strokeWidth="0.8" strokeDasharray="3 3" />
      </g>
      <circle cx="110" cy="88" r="24" fill={C.sup} stroke={C.oro} strokeWidth="1.2" />
      <Texto x={110} y={93} tam={13} color={C.oro} className="v-fase-a" style={{ '--dur': '5s' }}>50+</Texto>
      <Texto x={110} y={93} tam={13} color={C.oro} className="v-fase-b" style={{ '--dur': '5s' }}>150+</Texto>
      <Texto x={110} y={93} tam={13} color={C.oro} className="v-fase-c" style={{ '--dur': '5s' }}>250+</Texto>
      <Texto x={110} y={158} tam={7} color={C.tinta3} className="v-fino">organizaciones firmantes</Texto>
    </g>
  );
}

export function Moratoria() {
  return (
    <g>
      <Suelo ancho={220} y={150} alto={170} color="#1f2a1f" />
      <Satelite x={60} y={40} escala={0.6} />
      <g className="v-escudo" style={{ transformOrigin: '60px 62px' }}>
        <path d="M30 52 Q60 84 90 52" fill={C.aqua} opacity="0.25" />
        <path d="M30 52 Q60 84 90 52" fill="none" stroke={C.aqua} strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="v-misil">
        <path d="M60 136 L56 150 L64 150 Z" fill={C.rojo} />
        <rect x="56" y="150" width="8" height="18" rx="1.5" fill={C.grisClaro} {...TF} />
        <path d="M52 168 L56 162 L64 162 L68 168 Z" fill={C.gris} {...TF} />
      </g>
      <line x1="60" y1="150" x2="60" y2="72" stroke={C.rojo} strokeWidth="0.7" strokeDasharray="2 3" opacity="0.5" />
      <Etiqueta x={160} y={36} texto="155 votos" color={C.aqua} tam={8} />
      <Texto x={160} y={54} tam={6.5} color={C.tinta3} className="v-fino">ONU · sin pruebas ASAT</Texto>
      <Texto x={160} y={66} tam={6.5} color={C.tinta3} className="v-fino">destructivas</Texto>
    </g>
  );
}

export function Adrasj() {
  return (
    <g>
      <g transform="rotate(12 176 90)">
        <rect x="166" y="48" width="20" height="78" rx="6" fill={C.grisClaro} {...T} />
        <rect x="166" y="60" width="20" height="6" fill={C.fondo} opacity="0.8" />
        <path d="M170 126 L166 140 L186 140 L182 126 Z" fill={C.sup2} {...T} />
      </g>
      <line x1="60" y1="90" x2="160" y2="90" stroke={C.tinta3} strokeWidth="0.6" strokeDasharray="2 3" />
      <g className="v-acercar"><Satelite x={44} y={90} escala={0.55} color={C.aqua} panel={C.azul} /><circle cx="56" cy="90" r="2" fill={C.oro} className="v-pulso" /></g>
      <Texto x={110} y={30} tam={12} color={C.tinta} className="v-fase-a">150 m</Texto>
      <Texto x={110} y={30} tam={12} color={C.tinta} className="v-fase-b">50 m</Texto>
      <Texto x={110} y={30} tam={12} color={C.oro} className="v-fase-c">15 m</Texto>
      <Texto x={110} y={46} tam={6.5} color={C.tinta3} className="v-fino">distancia a la etapa</Texto>
    </g>
  );
}

function Garra({ espejo = false, ang = 0 }) {
  return (
    <g transform={`translate(110 44) scale(${espejo ? -1 : 1} 1) rotate(${ang})`}>
      <g className="v-garra" style={{ transformOrigin: '0px 0px' }}>
        <polyline points="0,0 -30,30 -28,64" fill="none" stroke={C.tinta2} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="0,0 -30,30 -28,64" fill="none" stroke={C.aqua} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="-30" cy="30" r="2.5" fill={C.sup} stroke={C.tinta2} strokeWidth="1" />
      </g>
    </g>
  );
}

export function Clearspace() {
  return (
    <g>
      <rect x="92" y="14" width="36" height="30" rx="4" fill={C.tinta2} {...T} />
      <rect x="50" y="22" width="40" height="12" rx="1" fill={C.azul} {...TF} /><rect x="130" y="22" width="40" height="12" rx="1" fill={C.azul} {...TF} />
      <Garra ang={-8} /><Garra ang={14} /><Garra espejo ang={-8} /><Garra espejo ang={14} />
      <circle cx="110" cy="44" r="5" fill={C.sup} stroke={C.tinta2} strokeWidth="1.2" />
      <Satelite x={110} y={104} escala={0.45} color={C.gris} panel={C.gris} rot={20} antena={false} />
      <Texto x={110} y={158} tam={7} color={C.tinta3} className="v-fino">captura con 4 brazos</Texto>
    </g>
  );
}

export function Lunarecycle() {
  return (
    <g>
      <Suelo ancho={220} y={124} alto={170} />
      <g transform="translate(44 92)">
        <polygon points="-14,0 -8,-10 8,-10 14,0 14,14 8,20 -8,20 -14,14" fill={C.tinta2} {...T} />
        <g {...T}><line x1="-10" y1="18" x2="-20" y2="34" /><line x1="10" y1="18" x2="20" y2="34" /><line x1="0" y1="-10" x2="0" y2="-22" /><path d="M-8 -22 Q0 -30 8 -22" fill={C.azul} /></g>
      </g>
      <g className="v-girar" style={{ transformOrigin: '140px 72px', '--dur': '9s' }}>
        {[0, 120, 240].map((a) => (
          <g key={a} transform={`rotate(${a} 140 72)`}>
            <path d="M140 42 A30 30 0 0 1 166 57" fill="none" stroke={C.aqua} strokeWidth="4" strokeLinecap="round" />
            <polygon points="170,50 169,64 158,58" fill={C.aqua} />
          </g>
        ))}
      </g>
      <circle cx="140" cy="72" r="12" fill={C.sup} stroke={C.aqua} strokeWidth="1" />
      <g fill={C.grisClaro}><rect x="134" y="66" width="5" height="12" rx="1" /><rect x="141" y="69" width="5" height="9" rx="1" /></g>
      <Texto x={110} y={154} tam={7} color={C.tinta3} className="v-fino">reutilizar lo que ya está en la Luna</Texto>
    </g>
  );
}

export function Onesmallstep() {
  return (
    <g>
      <rect x="0" y="0" width="220" height="170" fill="#2d2c28" rx="10" />
      <ellipse cx="40" cy="40" rx="18" ry="7" fill="none" stroke={C.tinta3} strokeWidth="0.6" />
      <ellipse cx="190" cy="130" rx="12" ry="5" fill="none" stroke={C.tinta3} strokeWidth="0.6" />
      <g className="v-girar" style={{ transformOrigin: '110px 82px', '--dur': '16s' }}>
        <circle cx="110" cy="82" r="48" fill="none" stroke={C.oro} strokeWidth="1.4" strokeDasharray="6 5" />
      </g>
      <g transform="rotate(-14 110 82)">
        <path d="M94 50 Q110 44 126 50 L128 92 Q128 118 110 118 Q92 118 92 92 Z" fill="#1c1b18" stroke={C.tinta2} strokeWidth="1.2" />
        {[58, 68, 78, 88, 98, 108].map((y) => <rect key={y} x="98" y={y} width="24" height="5" rx="2" fill="#3a3933" stroke={C.tinta3} strokeWidth="0.5" />)}
      </g>
      <Etiqueta x={110} y={150} texto="patrimonio" color={C.oro} tam={8} />
    </g>
  );
}
