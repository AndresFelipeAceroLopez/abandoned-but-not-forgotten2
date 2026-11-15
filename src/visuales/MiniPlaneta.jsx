// Iconos de 40–64 px: planetas con gradiente y pequeños pictogramas (satélite, cohete, átomo, bandera…).
import { useId } from 'react';
import { C, T, TF, Lienzo, Tierra, Luna, Sol, Satelite, Atomo, Texto } from './comunes.jsx';

const NOMBRES = {
  sol: 'el Sol', mercurio: 'Mercurio', venus: 'Venus', tierra: 'la Tierra', luna: 'la Luna', marte: 'Marte', jupiter: 'Júpiter', saturno: 'Saturno', urano: 'Urano',
  neptuno: 'Neptuno', ceres: 'Ceres', asteroide: 'un asteroide', satelite: 'un satélite', cohete: 'un cohete', atomo: 'un átomo', bandera: 'una bandera',
  estacion: 'una estación espacial', telescopio: 'un telescopio', bolsa: 'una bolsa de desechos', papel: 'una hoja de papel',
};
export const TIPOS_MINI = Object.keys(NOMBRES);

/** Esfera con gradiente (luz arriba-izquierda) y rasgos recortados a la esfera, que derivan despacio. */
function Esfera({ r = 22, colores, rasgos, deriva = -6, borde = true }) {
  const id = useId();
  return (
    <g>
      <defs>
        <radialGradient id={`${id}g`} cx="35%" cy="30%" r="80%"><stop offset="0" stopColor={colores[0]} /><stop offset="0.55" stopColor={colores[1]} /><stop offset="1" stopColor={colores[2]} /></radialGradient>
        <clipPath id={`${id}c`}><circle cx="32" cy="32" r={r} /></clipPath>
      </defs>
      <circle cx="32" cy="32" r={r} fill={`url(#${id}g)`} />
      {rasgos && <g clipPath={`url(#${id}c)`}><g className="v-deriva" style={{ '--dx': `${deriva}px`, '--dur': '10s' }}>{rasgos}</g></g>}
      <circle cx="32" cy="32" r={r} fill="none" stroke={colores[2]} strokeOpacity="0.6" strokeWidth="0.8" />
      {borde && <circle cx="32" cy="32" r={r} fill="none" stroke={C.tinta2} strokeOpacity="0.35" strokeWidth="0.6" />}
    </g>
  );
}

/** Saturno: anillo inclinado; la mitad delantera se dibuja encima de la esfera con un recorte. */
function Saturno() {
  const id = useId();
  const anillo = (
    <g transform="rotate(-20 32 32)">
      <ellipse cx="32" cy="32" rx="34" ry="8" fill="none" stroke="#e4caa0" strokeWidth="3" />
      <ellipse cx="32" cy="32" rx="34" ry="8" fill="none" stroke="#8a6a3e" strokeWidth="0.8" />
    </g>
  );
  return (
    <g>
      <defs><clipPath id={id}><rect x="-20" y="32" width="104" height="40" transform="rotate(-20 32 32)" /></clipPath></defs>
      {anillo}
      <Esfera r={18} colores={['#f4e2b8', '#d2b172', '#705327']} rasgos={<g opacity="0.4">{[20, 28, 36, 44].map((y) => <rect key={y} x="0" y={y} width="80" height="2.5" fill="#8c6a3a" />)}</g>} />
      <g clipPath={`url(#${id})`}>{anillo}</g>
    </g>
  );
}

const crateres = (col) => <g fill={col} opacity="0.5">{[[22, 24, 4], [38, 20, 3], [40, 40, 5], [26, 44, 2.5], [48, 30, 2]].map(([x, y, k]) => <circle key={`${x}${y}`} cx={x} cy={y} r={k} />)}</g>;

function Planeta({ tipo }) {
  switch (tipo) {
    case 'sol': return <Sol x={32} y={32} r={17} />;
    case 'mercurio': return <Esfera colores={['#d8d2c6', '#8f887c', '#3b3834']} rasgos={crateres('#4a463f')} />;
    case 'venus': return <Esfera colores={['#fff3cf', '#e2b86a', '#8c6a2a']} rasgos={<g fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2.5"><path d="M6 24 q14 -6 28 0 t26 0" /><path d="M8 40 q12 6 26 0 t26 2" /></g>} />;
    case 'tierra': return <Tierra x={32} y={32} r={22} />;
    case 'luna': return <Luna x={32} y={32} r={22} />;
    case 'marte': return <Esfera colores={['#ffb58f', '#d95926', '#5e2410']} rasgos={<g><g fill="#7a2f12" opacity="0.55"><ellipse cx="24" cy="34" rx="9" ry="4" /><ellipse cx="42" cy="26" rx="6" ry="3" /><ellipse cx="38" cy="44" rx="7" ry="3" /></g><ellipse cx="32" cy="12" rx="9" ry="3.5" fill="#fff" opacity="0.9" /></g>} />;
    case 'jupiter': return <Esfera colores={['#f6e3c8', '#d9a877', '#6e4a2c']} rasgos={<g><g opacity="0.55">{[[14, '#9c6b45', 4], [22, '#f3e4cf', 3], [30, '#b07a4f', 5], [40, '#f1dcc3', 3], [47, '#9c6b45', 4]].map(([y, c, h]) => <rect key={y} x="0" y={y} width="80" height={h} fill={c} />)}</g><ellipse cx="38" cy="38" rx="6" ry="3.2" fill={C.rojo} stroke="#8c3a2a" strokeWidth="0.6" /></g>} />;
    case 'saturno': return <Saturno />;
    case 'urano': return <g><ellipse cx="32" cy="32" rx="3" ry="30" fill="none" stroke={C.hielo} strokeOpacity="0.5" strokeWidth="1" transform="rotate(12 32 32)" /><Esfera r={20} colores={['#e2fbff', '#6fd3e0', '#1b6f80']} rasgos={<g opacity="0.25" fill="#fff"><rect x="0" y="22" width="80" height="3" /><rect x="0" y="40" width="80" height="2" /></g>} /></g>;
    case 'neptuno': return <Esfera colores={['#9cc2ff', '#2f5fd0', '#0f2460']} rasgos={<g><ellipse cx="26" cy="30" rx="6" ry="3.5" fill="#132b73" opacity="0.8" /><path d="M4 42 q14 -4 28 0 t26 0" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" /></g>} />;
    case 'ceres': return <Esfera r={16} colores={['#c4c0b7', '#7d7a73', '#2f2e2a']} rasgos={<g>{crateres('#3f3d38')}<circle cx="36" cy="28" r="2" fill="#fff" opacity="0.9" /></g>} />;
    case 'asteroide': return <g className="v-girar v-centro" style={{ '--dur': '24s' }}><polygon points="14,28 22,14 40,12 52,24 50,42 36,52 20,48 10,38" fill="#7d7a73" {...T} />{crateres('#3f3d38')}</g>;
    default: return null;
  }
}

function Icono({ tipo }) {
  switch (tipo) {
    case 'satelite': return <g className="v-flotar"><Satelite x={32} y={34} escala={1} /></g>;
    case 'cohete': return (
      <g className="v-flotar"><g transform="rotate(30 32 32)">
        <path d="M32 8 Q44 24 40 46 L24 46 Q20 24 32 8 Z" fill={C.hielo} {...T} />
        <circle cx="32" cy="26" r="4" fill={C.azul} {...TF} />
        <path d="M24 38 L14 50 L26 46 Z M40 38 L50 50 L38 46 Z" fill={C.rojo} {...TF} />
        <g className="v-llama" style={{ transformBox: 'fill-box', transformOrigin: 'center top' }}><path d="M27 47 Q32 50 37 47 L32 60 Z" fill={C.naranja} /><path d="M29.5 47 Q32 49 34.5 47 L32 54 Z" fill={C.oro} /></g>
      </g></g>
    );
    case 'atomo': return <g><circle cx="32" cy="32" r="26" fill={C.sup} stroke={C.rojo} strokeOpacity="0.4" /><Atomo x={32} y={32} r={18} dur="12s" /></g>;
    case 'bandera': return (
      <g>
        <line x1="20" y1="10" x2="20" y2="56" {...T} strokeWidth="2" />
        <g className="v-balanceo" style={{ transformOrigin: '20px 14px', '--dur': '3s' }}>
          <path d="M20 12 L50 12 Q46 20 50 28 L20 28 Z" fill={C.azul} {...TF} />
          <rect x="20" y="20" width="30" height="4" fill={C.tinta} opacity="0.8" />
          <circle cx="27" cy="17" r="2" fill={C.oro} />
        </g>
        <line x1="12" y1="56" x2="28" y2="56" {...TF} />
      </g>
    );
    case 'estacion': return (
      <g className="v-flotar">
        <line x1="6" y1="32" x2="58" y2="32" {...T} strokeWidth="2" />
        {[8, 46].map((x) => <g key={x}><rect x={x} y="14" width="10" height="14" rx="1" fill={C.azul} {...TF} /><rect x={x} y="36" width="10" height="14" rx="1" fill={C.azul} {...TF} /></g>)}
        <rect x="24" y="24" width="16" height="16" rx="3" fill={C.tinta2} {...T} />
        <rect x="27" y="6" width="10" height="16" rx="3" fill={C.grisClaro} {...TF} />
      </g>
    );
    case 'telescopio': return (
      <g className="v-flotar"><g transform="rotate(-30 32 32)">
        <rect x="24" y="8" width="16" height="40" rx="3" fill={C.hielo} {...T} />
        <rect x="24" y="8" width="16" height="7" rx="3" fill={C.sup2} {...T} /><circle cx="32" cy="11.5" r="2" fill={C.azul} />
        <rect x="27" y="20" width="10" height="20" rx="1" fill={C.azul} {...TF} />
        <polygon points="24,48 40,48 38,56 26,56" fill={C.gris} {...T} />
      </g></g>
    );
    case 'bolsa': return (
      <g>
        <path d="M20 22 Q32 16 44 22 L50 56 L14 56 Z" fill={C.hielo} {...T} />
        <path d="M26 22 L24 12 Q32 8 40 12 L38 22" fill="#e8e6dc" {...T} />
        <path d="M20 40 Q32 44 44 40" fill="none" stroke={C.gris} strokeWidth="1" />
        <rect x="38" y="28" width="12" height="8" rx="1" fill={C.oro} {...TF} transform="rotate(10 44 32)" />
      </g>
    );
    case 'papel': return (
      <g className="v-flotar"><g transform="rotate(-8 32 32)">
        <path d="M16 8 L40 8 L50 18 L50 56 L16 56 Z" fill="#f7f5ea" stroke={C.tinta2} strokeWidth="1" />
        <path d="M40 8 L40 18 L50 18" fill="#dcd9cc" stroke={C.tinta2} strokeWidth="1" />
        <g stroke={C.azul} strokeWidth="1.5" strokeLinecap="round"><line x1="22" y1="26" x2="44" y2="26" /><line x1="22" y1="34" x2="40" y2="34" /><line x1="22" y1="42" x2="44" y2="42" /></g>
      </g></g>
    );
    default: return null;
  }
}

/** <MiniPlaneta tipo="marte" size={48} /> */
export default function MiniPlaneta({ tipo = 'luna', size = 48, className = '', style }) {
  const nombre = NOMBRES[tipo];
  const planeta = ['sol', 'mercurio', 'venus', 'tierra', 'luna', 'marte', 'jupiter', 'saturno', 'urano', 'neptuno', 'ceres', 'asteroide'].includes(tipo);
  return (
    <Lienzo size={size} ancho={64} alto={64} etiqueta={nombre ? `Icono de ${nombre}` : 'Icono desconocido'} className={`v-mini v-mini-${tipo} ${className}`} style={style}>
      {planeta ? <g className="v-flotar" style={{ '--dur': '5s' }}><Planeta tipo={tipo} /></g> : nombre ? <Icono tipo={tipo} /> : (
        <g><Esfera r={20} colores={['#8c8a83', '#55544f', '#1a1a19']} /><Texto x={32} y={38} tam={18} color={C.tinta2}>?</Texto></g>
      )}
    </Lienzo>
  );
}
