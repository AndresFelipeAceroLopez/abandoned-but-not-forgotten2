// Gráficos SVG sin librerías. Una serie por gráfico (sin leyenda), marcas finas, tooltip al pasar, vista de tabla.
// Paleta: slots validados para fondo oscuro (ver styles.css).
import { useRef, useState } from 'react';
import { num } from '../lib/formato';
import { t, tr } from '../i18n';

// Las claves vienen de los datos en español: se traducen solo al mostrarlas (los clics siguen usando la clave original).
const corta = (s) => (s.length > 24 ? s.slice(0, 23) + '…' : s);

const AZUL = '#3987e5', ORO = '#c98500';

function Tooltip({ t }) {
  if (!t) return null;
  return <div className="tooltip" style={{ left: t.x, top: t.y }}>{t.texto}</div>;
}

export function Barras({ titulo, nota, datos, color = AZUL, horizontal = true, formato = (v) => num(v, 0), onClick, resaltar }) {
  const [tip, setTip] = useState(null);
  const ref = useRef();
  const max = Math.max(1, ...datos.map((d) => d.n));
  const mover = (e, d) => { const r = ref.current.getBoundingClientRect(); setTip({ x: e.clientX - r.left, y: e.clientY - r.top, texto: `${t(d.clave)}: ${formato(d.n)}` }); };
  if (horizontal) {
    const H = datos.length * 26 + 10, W = 420, L = 150;
    return (
      <div className="grafico" ref={ref} style={{ position: 'relative' }}>
        <h3>{titulo}</h3>{nota && <small>{nota}</small>}
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={titulo}>
          {datos.map((d, i) => {
            const y = 6 + i * 26, w = ((W - L - 60) * d.n) / max;
            const sel = resaltar && resaltar === d.clave;
            return (
              <g key={d.clave} onMouseMove={(e) => mover(e, d)} onMouseLeave={() => setTip(null)} onClick={() => onClick?.(d)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
                <rect x={0} y={y} width={W} height={22} fill="transparent" />
                <text x={L - 8} y={y + 15} textAnchor="end" className="axis-text" style={{ fill: '#c3c2b7' }}>{corta(t(d.clave))}</text>
                <rect x={L} y={y + 4} width={Math.max(2, w)} height={14} fill={sel ? ORO : color} rx={0} />
                <rect x={L + Math.max(2, w) - 4} y={y + 4} width={4} height={14} fill={sel ? ORO : color} rx={4} />
                <text x={L + Math.max(2, w) + 6} y={y + 15} className="axis-text">{formato(d.n)}</text>
              </g>
            );
          })}
          <line x1={L} x2={L} y1={2} y2={H - 4} className="baseline" />
        </svg>
        <Tooltip t={tip} />
        <details><summary>{tr('Ver tabla', 'View table')}</summary><table className="tabla"><tbody>{datos.map((d) => <tr key={d.clave}><td>{t(d.clave)}</td><td className="num">{formato(d.n)}</td></tr>)}</tbody></table></details>
      </div>
    );
  }
  const W = 460, H = 180, P = 30;
  const bw = (W - P - 10) / datos.length;
  return (
    <div className="grafico" ref={ref} style={{ position: 'relative' }}>
      <h3>{titulo}</h3>{nota && <small>{nota}</small>}
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={titulo}>
        {[0.5, 1].map((f) => <g key={f}><line x1={P} x2={W - 5} y1={H - 24 - f * (H - 40)} y2={H - 24 - f * (H - 40)} className="grid-line" /><text x={P - 4} y={H - 20 - f * (H - 40)} textAnchor="end" className="axis-text">{formato(max * f)}</text></g>)}
        {datos.map((d, i) => {
          const h = ((H - 40) * d.n) / max, x = P + i * bw + 1, y = H - 24 - h;
          const sel = resaltar && resaltar === d.clave;
          return (
            <g key={d.clave} onMouseMove={(e) => mover(e, d)} onMouseLeave={() => setTip(null)} onClick={() => onClick?.(d)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
              <rect x={x} y={0} width={Math.max(1, bw - 2)} height={H - 24} fill="transparent" />
              <rect x={x} y={y} width={Math.max(1, bw - 2)} height={Math.max(1, h)} fill={sel ? ORO : color} />
              {datos.length <= 12 && <text x={x + (bw - 2) / 2} y={H - 8} textAnchor="middle" className="axis-text">{t(d.clave)}</text>}
            </g>
          );
        })}
        {datos.length > 12 && datos.filter((_, i) => i % Math.ceil(datos.length / 7) === 0).map((d) => <text key={d.clave} x={P + datos.indexOf(d) * bw + bw / 2} y={H - 8} textAnchor="middle" className="axis-text">{d.clave}</text>)}
        <line x1={P} x2={W - 5} y1={H - 24} y2={H - 24} className="baseline" />
      </svg>
      <Tooltip t={tip} />
      <details><summary>{tr('Ver tabla', 'View table')}</summary><table className="tabla"><tbody>{datos.map((d) => <tr key={d.clave}><td>{t(d.clave)}</td><td className="num">{formato(d.n)}</td></tr>)}</tbody></table></details>
    </div>
  );
}

// Paleta categórica validada (modo oscuro), en orden fijo.
export const CATEGORICA = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'];

/** Dona: partes de un todo (≤ 8 categorías; el resto se pliega en "Otros"). Leyenda siempre presente. */
export function Dona({ titulo, nota, datos, formato = (v) => num(v, 0), icono }) {
  const [tip, setTip] = useState(null);
  const ref = useRef();
  const top = datos.slice(0, 7);
  const resto = datos.slice(7).reduce((s, d) => s + d.n, 0);
  const partes = resto ? [...top, { clave: tr('Otros', 'Other'), n: resto }] : top;
  const total = Math.max(1, partes.reduce((s, d) => s + d.n, 0));
  const R = 70, r = 44, C = 90;
  let acum = 0;
  const arcos = partes.map((d, i) => {
    const a0 = (acum / total) * Math.PI * 2 - Math.PI / 2; acum += d.n;
    const a1 = (acum / total) * Math.PI * 2 - Math.PI / 2;
    const grande = a1 - a0 > Math.PI ? 1 : 0;
    const p = (a, rr) => [C + rr * Math.cos(a), C + rr * Math.sin(a)];
    const [x0, y0] = p(a0, R), [x1, y1] = p(a1, R), [x2, y2] = p(a1, r), [x3, y3] = p(a0, r);
    return { d, i, path: `M${x0},${y0} A${R},${R} 0 ${grande} 1 ${x1},${y1} L${x2},${y2} A${r},${r} 0 ${grande} 0 ${x3},${y3} Z` };
  });
  const mover = (e, d) => { const b = ref.current.getBoundingClientRect(); setTip({ x: e.clientX - b.left, y: e.clientY - b.top, texto: `${t(d.clave)}: ${formato(d.n)} (${Math.round((d.n / total) * 100)}${tr(' %', '%')})` }); };
  return (
    <div className="grafico" ref={ref} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>{icono}<div><h3>{titulo}</h3>{nota && <small>{nota}</small>}</div></div>
      <div className="dona-cuerpo">
        <svg viewBox="0 0 180 180" role="img" aria-label={titulo} style={{ maxWidth: 200 }}>
          {arcos.map(({ d, i, path }) => <path key={d.clave} d={path} fill={CATEGORICA[i]} stroke="#1a1a19" strokeWidth={2} onMouseMove={(e) => mover(e, d)} onMouseLeave={() => setTip(null)} />)}
          <text x={C} y={C - 4} textAnchor="middle" style={{ fill: '#fff', fontSize: 20, fontWeight: 700 }}>{formato(total)}</text>
          <text x={C} y={C + 14} textAnchor="middle" className="axis-text">total</text>
        </svg>
        <ul className="leyenda-lista">
          {partes.map((d, i) => <li key={d.clave}><i style={{ background: CATEGORICA[i] }} /><span>{t(d.clave)}</span><b>{formato(d.n)}</b></li>)}
        </ul>
      </div>
      <Tooltip t={tip} />
    </div>
  );
}

/** Área: una serie en el tiempo con relleno degradado; marcador de año y clic para cambiarlo. */
export function Area({ titulo, nota, serie, color = AZUL, marcador, onClick, formato = (v) => num(v, 0), icono }) {
  const [tip, setTip] = useState(null);
  const ref = useRef();
  const W = 460, H = 210, P = 46, B = 26;
  const xs = serie.map((d) => d.x), ys = serie.map((d) => d.y);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), ymax = Math.max(1, ...ys);
  const X = (x) => P + ((x - x0) / (x1 - x0)) * (W - P - 10);
  const Y = (y) => H - B - (y / ymax) * (H - B - 14);
  const linea = serie.map((d, i) => `${i ? 'L' : 'M'}${X(d.x).toFixed(1)},${Y(d.y).toFixed(1)}`).join(' ');
  const area = `${linea} L${X(x1).toFixed(1)},${H - B} L${X(x0).toFixed(1)},${H - B} Z`;
  const id = `grad-${titulo.replace(/\W/g, '').slice(0, 12)}`;
  const mover = (e) => {
    const r = ref.current.getBoundingClientRect();
    const svgX = ((e.clientX - r.left) / r.width) * W;
    const x = Math.round(x0 + ((svgX - P) / (W - P - 10)) * (x1 - x0));
    const d = serie.find((s) => s.x === x);
    if (d) setTip({ x: e.clientX - r.left, y: e.clientY - r.top, texto: `${d.x}: ${formato(d.y)}`, d });
  };
  const m = marcador !== undefined && serie.find((s) => s.x === marcador);
  return (
    <div className="grafico" ref={ref} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>{icono}<div><h3>{titulo}</h3>{nota && <small>{nota}</small>}</div></div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={titulo} onMouseMove={mover} onMouseLeave={() => setTip(null)} onClick={() => tip?.d && onClick?.(tip.d)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
        <defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.55} /><stop offset="100%" stopColor={color} stopOpacity={0.03} /></linearGradient></defs>
        {[0.25, 0.5, 0.75, 1].map((f) => <g key={f}><line x1={P} x2={W - 10} y1={Y(ymax * f)} y2={Y(ymax * f)} className="grid-line" /><text x={P - 6} y={Y(ymax * f) + 4} textAnchor="end" className="axis-text">{formato(Math.round(ymax * f))}</text></g>)}
        {[x0, Math.round((x0 + x1) / 2), x1].map((x) => <text key={x} x={X(x)} y={H - 8} textAnchor="middle" className="axis-text">{x}</text>)}
        <path d={area} fill={`url(#${id})`} />
        <path d={linea} fill="none" stroke={color} strokeWidth={2.2} strokeLinejoin="round" />
        <line x1={P} x2={W - 10} y1={H - B} y2={H - B} className="baseline" />
        {m && <g><line x1={X(marcador)} x2={X(marcador)} y1={12} y2={H - B} stroke={ORO} strokeDasharray="3 3" /><circle cx={X(marcador)} cy={Y(m.y)} r={5} fill={ORO} stroke="#1a1a19" strokeWidth={2} /><text x={X(marcador)} y={Y(m.y) - 10} textAnchor="middle" style={{ fill: '#fff', fontSize: 12, fontWeight: 600 }}>{formato(m.y)}</text></g>}
        {tip?.d && <g><line x1={X(tip.d.x)} x2={X(tip.d.x)} y1={12} y2={H - B} stroke="#898781" /><circle cx={X(tip.d.x)} cy={Y(tip.d.y)} r={4} fill={color} stroke="#1a1a19" strokeWidth={2} /></g>}
      </svg>
      <Tooltip t={tip} />
      <details><summary>{tr('Ver tabla', 'View table')}</summary><table className="tabla"><tbody>{serie.filter((_, i) => i % 5 === 0 || i === serie.length - 1).map((d) => <tr key={d.x}><td>{d.x}</td><td className="num">{formato(d.y)}</td></tr>)}</tbody></table></details>
    </div>
  );
}

export function Linea({ titulo, nota, serie, color = AZUL, marcador, onClick, formato = (v) => num(v, 0) }) {
  const [tip, setTip] = useState(null);
  const ref = useRef();
  const W = 460, H = 200, P = 44, B = 24;
  const xs = serie.map((d) => d.x), ys = serie.map((d) => d.y);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), ymax = Math.max(1, ...ys);
  const X = (x) => P + ((x - x0) / (x1 - x0)) * (W - P - 10);
  const Y = (y) => H - B - (y / ymax) * (H - B - 10);
  const path = serie.map((d, i) => `${i ? 'L' : 'M'}${X(d.x).toFixed(1)},${Y(d.y).toFixed(1)}`).join(' ');
  const mover = (e) => {
    const r = ref.current.getBoundingClientRect();
    const svgX = ((e.clientX - r.left) / r.width) * W;
    const x = Math.round(x0 + ((svgX - P) / (W - P - 10)) * (x1 - x0));
    const d = serie.find((s) => s.x === x);
    if (d) setTip({ x: e.clientX - r.left, y: e.clientY - r.top, texto: `${d.x}: ${formato(d.y)}`, d });
  };
  return (
    <div className="grafico" ref={ref} style={{ position: 'relative' }}>
      <h3>{titulo}</h3>{nota && <small>{nota}</small>}
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={titulo} onMouseMove={mover} onMouseLeave={() => setTip(null)} onClick={() => tip?.d && onClick?.(tip.d)} style={{ cursor: onClick ? 'pointer' : 'default' }}>
        {[0.25, 0.5, 0.75, 1].map((f) => <g key={f}><line x1={P} x2={W - 10} y1={Y(ymax * f)} y2={Y(ymax * f)} className="grid-line" /><text x={P - 6} y={Y(ymax * f) + 4} textAnchor="end" className="axis-text">{formato(Math.round(ymax * f))}</text></g>)}
        {[x0, Math.round((x0 + x1) / 2), x1].map((x) => <text key={x} x={X(x)} y={H - 6} textAnchor="middle" className="axis-text">{x}</text>)}
        <line x1={P} x2={W - 10} y1={H - B} y2={H - B} className="baseline" />
        <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        {marcador !== undefined && serie.find((s) => s.x === marcador) && (
          <g><line x1={X(marcador)} x2={X(marcador)} y1={10} y2={H - B} stroke={ORO} strokeDasharray="3 3" /><circle cx={X(marcador)} cy={Y(serie.find((s) => s.x === marcador).y)} r={5} fill={ORO} stroke="#1a1a19" strokeWidth={2} /></g>
        )}
        {tip?.d && <g><line x1={X(tip.d.x)} x2={X(tip.d.x)} y1={10} y2={H - B} stroke="#898781" /><circle cx={X(tip.d.x)} cy={Y(tip.d.y)} r={4} fill={color} stroke="#1a1a19" strokeWidth={2} /></g>}
      </svg>
      <Tooltip t={tip} />
      <details><summary>{tr('Ver tabla', 'View table')}</summary><table className="tabla"><tbody>{serie.filter((_, i) => i % 5 === 0 || i === serie.length - 1).map((d) => <tr key={d.x}><td>{d.x}</td><td className="num">{formato(d.y)}</td></tr>)}</tbody></table></details>
    </div>
  );
}
