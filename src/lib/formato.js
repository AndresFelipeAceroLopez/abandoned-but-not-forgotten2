// Formato de cifras y fechas según el idioma (es: punto de miles y coma decimal; en: al revés).
import { getLang, locale, tr } from '../i18n';

const cache = {};
const nf = (opts) => { const k = locale() + JSON.stringify(opts); return (cache[k] ||= new Intl.NumberFormat(locale(), opts)); };

export const num = (x, dec) => (x === null || x === undefined ? '—' : nf({ maximumFractionDigits: dec === 0 ? 0 : 2 }).format(x));

/** Cifra redondeada para el modo niños: "más de 187 toneladas". */
export function cifraNinos(x, unidad = '') {
  if (x === null || x === undefined) return '—';
  if (x >= 1e6) return tr(`más de ${num(Math.floor(x / 1e5) / 10)} millones${unidad ? ' de ' + unidad : ''}`, `more than ${num(Math.floor(x / 1e5) / 10)} million${unidad ? ' ' + unidad : ''}`);
  if (x >= 1000) return `${tr('más de', 'more than')} ${num(Math.floor(x / 1000) * 1000, 0)}${unidad ? ' ' + unidad : ''}`;
  return `${num(Math.round(x), 0)}${unidad ? ' ' + unidad : ''}`;
}

const MESES = {
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};
export function fecha(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  if (!m) return y;
  const mes = MESES[getLang()][+m - 1];
  if (getLang() === 'en') return d ? `${mes} ${+d}, ${y}` : `${mes} ${y}`;
  return d ? `${+d}-${mes}-${y}` : `${mes}-${y}`;
}

/** Coordenadas con hemisferio: 2,5550 S, 27,8875 W */
export function coords(lat, lon) {
  if (lat === null || lat === undefined || lon === null || lon === undefined) return tr('paradero desconocido', 'whereabouts unknown');
  const nf4 = nf({ minimumFractionDigits: 2, maximumFractionDigits: 4 });
  const la = `${nf4.format(Math.abs(lat))} ${lat >= 0 ? 'N' : 'S'}`;
  const lo = `${nf4.format(Math.abs(lon))} ${lon >= 0 ? 'E' : 'W'}`;
  return `${la}, ${lo}`;
}

/** Comparación física para niños (masa en kg). Un elefante africano ≈ 6.000 kg. */
export function comparacionMasa(kg) {
  if (!kg) return '';
  const n = (div) => num(Math.max(1, Math.round(kg / div)), 0);
  if (kg >= 6000) return tr(`como ${n(6000)} elefantes`, `about as much as ${n(6000)} elephants`);
  if (kg >= 1000) return tr(`como ${n(1000)} autos pequeños`, `about as much as ${n(1000)} small cars`);
  if (kg >= 70) return tr(`como ${n(70)} personas adultas`, `about as much as ${n(70)} adults`);
  return tr(`como ${n(4)} gatos`, `about as much as ${n(4)} cats`);
}
