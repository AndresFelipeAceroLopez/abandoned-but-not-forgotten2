// Escena de reentrada: fragmento con estela de fuego, paisaje con casa y tres marcadores de casos reales.
import { useId } from 'react';
import { C, T, TF, Lienzo, Estrellas, Texto } from './comunes.jsx';

// Mismo orden que DANOS en src/data/contenido.js (índice 3, "Órbita y cielo", no tiene marcador en tierra).
export const CASOS_DANOS = [
  { id: 0, nombre: 'Tulsa 1997', x: 120, y: 158, detalle: 'Lottie Williams, golpeada por un fragmento de un Delta II' },
  { id: 1, nombre: 'Naples 2024', x: 215, y: 150, detalle: 'Un soporte de baterías de la ISS atravesó una casa en Florida' },
  { id: 2, nombre: 'Canadá 1978', x: 40, y: 146, detalle: 'Kosmos 954 esparció restos radiactivos en el norte de Canadá' },
];

/**
 * <AnimacionDanos size={420} caso={0} activo />
 * `size` es el ancho; la escena es 16:9. `caso` (0–3): 0 = Tulsa 1997, 1 = Naples 2024, 2 = Canadá 1978, 3 u otro = ninguno resaltado.
 */
export default function AnimacionDanos({ size = 420, caso = null, activo = true, className = '', style }) {
  const id = useId();
  const resaltado = CASOS_DANOS.find((c) => c.id === Number(caso));
  const etiqueta = `Fragmento reentrando sobre un paisaje nocturno${resaltado ? `; caso resaltado: ${resaltado.nombre}` : ''}`;
  return (
    <Lienzo size={size} ancho={320} alto={180} etiqueta={etiqueta} className={`v-danos ${activo ? '' : 'v-pausa'} ${className}`} style={style}>
      <defs>
        <linearGradient id={`${id}cielo`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#05070d" /><stop offset="1" stopColor="#0c1733" /></linearGradient>
        <linearGradient id={`${id}fuego`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={C.oro} stopOpacity="1" /><stop offset="0.4" stopColor={C.naranja} stopOpacity="0.8" /><stop offset="1" stopColor={C.rojo} stopOpacity="0" /></linearGradient>
        <clipPath id={`${id}clip`}><rect x="0" y="0" width="320" height="180" rx="10" /></clipPath>
      </defs>
      <g clipPath={`url(#${id}clip)`}>
        <rect x="0" y="0" width="320" height="180" fill={`url(#${id}cielo)`} />
        <Estrellas n={26} ancho={320} alto={130} semilla={5} />
        <circle cx="160" cy="470" r="336" fill="none" stroke={C.azul} strokeOpacity="0.35" strokeWidth="6" />
        <circle cx="160" cy="470" r="330" fill="#0e1f1a" stroke={C.tinta2} strokeOpacity="0.5" strokeWidth="1" />
        <path d="M0 160 Q40 150 80 156 T160 152 T240 150 T320 154 L320 180 L0 180 Z" fill="#132a22" />
        <g>
          <polygon points="255,128 275,106 295,128" fill="#4a3b2a" {...T} />
          <rect x="259" y="128" width="32" height="18" fill="#6b5a44" {...T} />
          <rect x="270" y="136" width="8" height="10" fill="#2b2420" />
          <rect x="262" y="132" width="6" height="6" fill={C.oro} className="v-pulso" style={{ '--dur': '4s' }} />
          <g fill="#1f3b2a" {...TF}><polygon points="300,146 306,126 312,146" /><polygon points="232,146 240,120 248,146" /><polygon points="18,146 26,124 34,146" /></g>
        </g>
        <g className="v-reentrada">
          <g transform="translate(300 14)">
            <polygon points="0,0 70,-34 76,-30 64,-22 72,-12 4,8" fill={`url(#${id}fuego)`} opacity="0.95" />
            <polygon points="0,0 60,-28 62,-24 4,6" fill={C.oro} opacity="0.7" />
            <polygon points="-3,-3 4,-5 7,2 2,6 -4,3" fill={C.tinta} stroke={C.oro} strokeWidth="1" />
          </g>
        </g>
        {CASOS_DANOS.map((c) => {
          const on = resaltado?.id === c.id;
          const col = on ? C.oro : C.tinta3;
          return (
            <g key={c.id}>
              <circle cx={c.x} cy={c.y} r={on ? 9 : 6} fill={col} opacity="0.35" className="v-latir" style={{ transformOrigin: `${c.x}px ${c.y}px`, '--dur': on ? '1.6s' : '2.8s' }} />
              <circle cx={c.x} cy={c.y} r={on ? 3.2 : 2.4} fill={col} stroke={C.fondo} strokeWidth="0.8" />
              <Texto x={c.x} y={c.y + 13} tam={on ? 7.5 : 6.5} color={on ? C.oro : C.tinta2} peso={on ? 700 : 500}>{c.nombre}</Texto>
            </g>
          );
        })}
      </g>
    </Lienzo>
  );
}
