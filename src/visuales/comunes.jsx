// Piezas compartidas de la biblioteca de visuales: lienzo SVG, estrellas, planetas básicos, satélite, átomo, etiquetas.
import { useId } from 'react';
import { t } from '../i18n';

export const C = {
  azul: '#3987e5', naranja: '#d95926', aqua: '#199e70', oro: '#c98500', magenta: '#d55181', verde: '#008300',
  violeta: '#9085e9', rojo: '#e66767', tinta: '#ffffff', tinta2: '#c3c2b7', tinta3: '#898781',
  sup: '#1a1a19', sup2: '#232322', fondo: '#05070d', gris: '#55544f', grisClaro: '#8c8a83', hielo: '#dfe7f2',
};
// Trazo fino estándar (el "lápiz" de la ilustración científica).
export const T = { stroke: C.tinta2, strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
export const TF = { ...T, strokeWidth: 1 };

/** Envoltorio SVG: viewBox fijo, escala por `size` (ancho en px), accesible. */
export function Lienzo({ size = 160, ancho = 100, alto = 100, etiqueta = 'Ilustración', className = '', style, children, ...rest }) {
  const w = Number(size) || 160;
  return (
    <svg
      role="img"
      aria-label={t(etiqueta)}
      viewBox={`0 0 ${ancho} ${alto}`}
      width={w}
      height={Math.round((w * alto) / ancho)}
      className={`visual ${className}`.trim()}
      style={style}
      {...rest}
    >
      <title>{t(etiqueta)}</title>
      {children}
    </svg>
  );
}

// Pseudoaleatorio determinista (misma semilla → mismas estrellas en cada render).
export function azar(semilla = 1) {
  let s = (semilla * 9301 + 49297) % 233280;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

/** Polvo de estrellas que titila suavemente. */
export function Estrellas({ n = 14, ancho = 100, alto = 100, semilla = 1, color = C.tinta2, tenue = false }) {
  const r = azar(semilla);
  const pts = Array.from({ length: n }, () => ({ x: r() * ancho, y: r() * alto, s: 0.4 + r() * 0.9, d: r() * 3, k: 2 + r() * 3 }));
  return (
    <g opacity={tenue ? 0.5 : 0.85} fill={color}>
      {pts.map((p, i) => (
        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r={p.s.toFixed(2)} className="v-titilar" style={{ '--d': `${p.d.toFixed(1)}s`, '--dur': `${p.k.toFixed(1)}s` }} />
      ))}
    </g>
  );
}

/** Tierra: esfera azul con continentes y atmósfera. */
export function Tierra({ x = 50, y = 50, r = 20, nubes = true, atmosfera = true }) {
  const id = useId();
  return (
    <g>
      <defs>
        <radialGradient id={`${id}t`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#7fb6ff" /><stop offset="0.55" stopColor={C.azul} /><stop offset="1" stopColor="#123b7a" />
        </radialGradient>
        <clipPath id={`${id}c`}><circle cx={x} cy={y} r={r} /></clipPath>
      </defs>
      {atmosfera && <circle cx={x} cy={y} r={r * 1.12} fill="none" stroke="#7fb6ff" strokeOpacity="0.35" strokeWidth={r * 0.12} />}
      <circle cx={x} cy={y} r={r} fill={`url(#${id}t)`} />
      <g clipPath={`url(#${id}c)`} fill={C.aqua} opacity="0.95">
        <path d={`M${x - r * 0.9} ${y - r * 0.35} c ${r * 0.3} -${r * 0.4} ${r * 0.7} -${r * 0.3} ${r * 0.9} -${r * 0.1} c ${r * 0.1} ${r * 0.3} -${r * 0.3} ${r * 0.5} -${r * 0.5} ${r * 0.7} c -${r * 0.4} ${r * 0.1} -${r * 0.6} -${r * 0.5} -${r * 0.4} -${r * 0.6} z`} />
        <path d={`M${x + r * 0.1} ${y + r * 0.1} c ${r * 0.4} -${r * 0.3} ${r * 0.8} -${r * 0.1} ${r * 0.8} ${r * 0.3} c -${r * 0.1} ${r * 0.4} -${r * 0.5} ${r * 0.5} -${r * 0.7} ${r * 0.3} c -${r * 0.2} -${r * 0.2} -${r * 0.3} -${r * 0.4} -${r * 0.1} -${r * 0.6} z`} />
        <ellipse cx={x + r * 0.35} cy={y - r * 0.6} rx={r * 0.3} ry={r * 0.15} />
        {nubes && (
          <g fill={C.tinta} opacity="0.75" className="v-deriva" style={{ '--dx': `${-r * 0.5}px`, '--dur': '9s' }}>
            <ellipse cx={x - r * 0.2} cy={y - r * 0.55} rx={r * 0.35} ry={r * 0.09} />
            <ellipse cx={x + r * 0.5} cy={y + r * 0.45} rx={r * 0.3} ry={r * 0.08} />
            <ellipse cx={x - r * 0.55} cy={y + r * 0.3} rx={r * 0.25} ry={r * 0.07} />
          </g>
        )}
      </g>
      <circle cx={x} cy={y} r={r} fill="none" stroke={C.tinta2} strokeOpacity="0.5" strokeWidth="0.8" />
    </g>
  );
}

/** Luna gris con cráteres. */
export function Luna({ x = 50, y = 50, r = 20 }) {
  const id = useId();
  const cr = [[-0.35, -0.3, 0.22], [0.3, 0.1, 0.16], [-0.1, 0.45, 0.12], [0.45, -0.45, 0.09], [-0.55, 0.15, 0.08]];
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="80%"><stop offset="0" stopColor="#e9e7df" /><stop offset="0.6" stopColor="#a9a79f" /><stop offset="1" stopColor="#5e5d57" /></radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} stroke={C.tinta2} strokeOpacity="0.5" strokeWidth="0.8" />
      {cr.map(([dx, dy, k], i) => <circle key={i} cx={x + dx * r} cy={y + dy * r} r={k * r} fill="#6f6e67" opacity="0.6" stroke="#4a4944" strokeWidth="0.5" />)}
    </g>
  );
}

/** Sol con corona animada. */
export function Sol({ x = 50, y = 50, r = 16, rayos = 12 }) {
  const id = useId();
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="40%" cy="35%" r="75%"><stop offset="0" stopColor="#ffe8a3" /><stop offset="0.55" stopColor={C.oro} /><stop offset="1" stopColor={C.naranja} /></radialGradient>
        {/* Relieve: ruido fractal iluminado de lado (granulación solar), recortado al disco. */}
        <filter id={`${id}r`} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={2.4 / r} numOctaves="3" seed="7" result="ruido" />
          <feDiffuseLighting in="ruido" surfaceScale={r * 0.16} diffuseConstant="1.2" lightingColor="#fff6dc" result="luz"><feDistantLight azimuth="225" elevation="56" /></feDiffuseLighting>
          <feComposite in="luz" in2="SourceGraphic" operator="in" result="relieve" />
          <feBlend in="SourceGraphic" in2="relieve" mode="multiply" />
        </filter>
        <radialGradient id={`${id}l`} cx="50%" cy="50%" r="50%"><stop offset="0.6" stopColor="#8a3200" stopOpacity="0" /><stop offset="1" stopColor="#8a3200" stopOpacity="0.45" /></radialGradient>
      </defs>
      {/* El halo va dentro de un grupo tenue: la animación v-latir cambia la opacidad del círculo y lo volvía un disco sólido. */}
      <g opacity="0.2"><circle cx={x} cy={y} r={r * 1.45} fill={C.oro} className="v-latir v-centro" style={{ '--dur': '4s' }} /></g>
      <g className="v-girar" style={{ transformOrigin: `${x}px ${y}px`, '--dur': '24s' }} stroke={C.oro} strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
        {Array.from({ length: rayos }, (_, i) => {
          const a = (i / rayos) * Math.PI * 2; const l = i % 2 ? r * 1.35 : r * 1.6;
          return <line key={i} x1={x + Math.cos(a) * r * 1.15} y1={y + Math.sin(a) * r * 1.15} x2={x + Math.cos(a) * l} y2={y + Math.sin(a) * l} />;
        })}
      </g>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} filter={`url(#${id}r)`} />
      <circle cx={x} cy={y} r={r} fill={`url(#${id}l)`} />
    </g>
  );
}

/** Satélite genérico: cuerpo, dos paneles, antena. Centrado en (x, y); `escala` 1 ≈ 44 unidades de ancho. */
export function Satelite({ x = 50, y = 50, escala = 1, color = C.azul, panel = C.azul, rot = 0, antena = true }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${escala})`}>
      <rect x="-22" y="-4" width="12" height="8" rx="1" fill={panel} stroke={C.tinta2} strokeWidth="1" />
      <rect x="10" y="-4" width="12" height="8" rx="1" fill={panel} stroke={C.tinta2} strokeWidth="1" />
      <line x1="-16" y1="-4" x2="-16" y2="4" stroke={C.tinta2} strokeWidth="0.6" /><line x1="16" y1="-4" x2="16" y2="4" stroke={C.tinta2} strokeWidth="0.6" />
      <rect x="-7" y="-6" width="14" height="12" rx="2" fill={color} stroke={C.tinta2} strokeWidth="1.2" />
      <rect x="-4" y="-3" width="8" height="6" rx="1" fill={C.sup} opacity="0.5" />
      {antena && <><line x1="0" y1="-6" x2="0" y2="-11" stroke={C.tinta2} strokeWidth="1" /><path d="M-4 -11 q4 -4 8 0" fill="none" stroke={C.tinta2} strokeWidth="1" /></>}
    </g>
  );
}

/** Símbolo de átomo: núcleo + 3 órbitas de electrones (gira despacio). */
export function Atomo({ x = 50, y = 50, r = 10, color = C.rojo, girar = true, dur = '10s' }) {
  return (
    <g className={girar ? 'v-girar' : ''} style={{ transformOrigin: `${x}px ${y}px`, '--dur': dur }}>
      {[0, 60, 120].map((a) => <ellipse key={a} cx={x} cy={y} rx={r} ry={r * 0.38} fill="none" stroke={color} strokeWidth="1.1" transform={`rotate(${a} ${x} ${y})`} />)}
      <circle cx={x} cy={y} r={r * 0.22} fill={color} />
      <circle cx={x + r} cy={y} r={r * 0.12} fill={C.tinta} />
      <circle cx={x - r * 0.5} cy={y - r * 0.33} r={r * 0.12} fill={C.tinta} />
      <circle cx={x - r * 0.5} cy={y + r * 0.33} r={r * 0.12} fill={C.tinta} />
    </g>
  );
}

/** Etiqueta tipo "chip": rectángulo redondeado con texto centrado. */
export function Etiqueta({ x = 50, y = 50, texto = '', color = C.tinta2, fondo = C.sup, tam = 7, className = '', style }) {
  texto = t(texto);
  const w = Math.max(12, String(texto).length * tam * 0.58 + tam * 1.4);
  const h = tam * 1.9;
  return (
    <g className={className} style={style}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2} fill={fondo} stroke={color} strokeWidth="0.9" />
      <text x={x} y={y + tam * 0.36} textAnchor="middle" fontSize={tam} fill={color}>{texto}</text>
    </g>
  );
}

/** Texto simple sin fondo. */
export function Texto({ x, y, children, tam = 7, color = C.tinta2, anchor = 'middle', peso, className = '', style }) {
  return <text x={x} y={y} textAnchor={anchor} fontSize={tam} fill={color} fontWeight={peso} className={className} style={style}>{typeof children === 'string' ? t(children) : children}</text>;
}

/** Suelo lunar/marciano: arco con cráteres. `ancho` del viewBox, `y` altura del horizonte. */
export function Suelo({ ancho = 100, y = 80, alto = 100, color = '#3c3b36', borde = C.tinta2 }) {
  return (
    <g>
      <path d={`M0 ${y + 6} Q ${ancho / 2} ${y - 8} ${ancho} ${y + 6} L ${ancho} ${alto} L 0 ${alto} Z`} fill={color} />
      <path d={`M0 ${y + 6} Q ${ancho / 2} ${y - 8} ${ancho} ${y + 6}`} fill="none" stroke={borde} strokeWidth="1" strokeOpacity="0.7" />
      <ellipse cx={ancho * 0.2} cy={y + 8} rx={ancho * 0.07} ry={ancho * 0.018} fill="none" stroke={borde} strokeWidth="0.6" strokeOpacity="0.5" />
      <ellipse cx={ancho * 0.78} cy={y + 10} rx={ancho * 0.05} ry={ancho * 0.014} fill="none" stroke={borde} strokeWidth="0.6" strokeOpacity="0.5" />
    </g>
  );
}

/** Llama de motor (naranja/oro) que parpadea; la punta mira hacia +y. */
export function Llama({ x = 0, y = 0, w = 6, h = 12, color = C.naranja }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="v-llama" style={{ transformBox: 'fill-box', transformOrigin: 'center top' }}>
        <path d={`M${-w / 2} 0 Q 0 ${h * 0.3} ${w / 2} 0 L 0 ${h} Z`} fill={color} opacity="0.9" />
        <path d={`M${-w / 4} 0 Q 0 ${h * 0.2} ${w / 4} 0 L 0 ${h * 0.55} Z`} fill={C.oro} />
      </g>
    </g>
  );
}

/** Fragmento metálico (ficha gris irregular). */
export function Fragmento({ x = 0, y = 0, s = 4, color = C.grisClaro, className = '', style }) {
  return (
    <g className={className} style={style}>
      <polygon points={`${x - s} ${y - s * 0.4}, ${x - s * 0.2} ${y - s}, ${x + s} ${y - s * 0.3}, ${x + s * 0.6} ${y + s}, ${x - s * 0.6} ${y + s * 0.7}`} fill={color} stroke={C.tinta2} strokeWidth="0.7" strokeLinejoin="round" />
    </g>
  );
}
