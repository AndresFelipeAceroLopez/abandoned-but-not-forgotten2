// Formato de cifras y fechas en español (punto de miles, coma decimal).
const nf = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2 });
const nf0 = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

export const num = (x, dec) => (x === null || x === undefined ? '—' : dec === 0 ? nf0.format(x) : nf.format(x));

/** Cifra redondeada para el modo niños: "más de 187 toneladas". */
export function cifraNinos(x, unidad = '') {
  if (x === null || x === undefined) return '—';
  if (x >= 1e6) return `más de ${num(Math.floor(x / 1e5) / 10)} millones${unidad ? ' de ' + unidad : ''}`;
  if (x >= 1000) return `más de ${num(Math.floor(x / 1000) * 1000, 0)}${unidad ? ' ' + unidad : ''}`;
  return `${num(Math.round(x), 0)}${unidad ? ' ' + unidad : ''}`;
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export function fecha(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  if (!m) return y;
  if (!d) return `${MESES[+m - 1]}-${y}`;
  return `${+d}-${MESES[+m - 1]}-${y}`;
}

/** Coordenadas con hemisferio: 2,5550 S, 27,8875 W */
export function coords(lat, lon) {
  if (lat === null || lat === undefined || lon === null || lon === undefined) return 'paradero desconocido';
  const nf4 = new Intl.NumberFormat('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  const la = `${nf4.format(Math.abs(lat))} ${lat >= 0 ? 'N' : 'S'}`;
  const lo = `${nf4.format(Math.abs(lon))} ${lon >= 0 ? 'E' : 'W'}`;
  return `${la}, ${lo}`;
}

/** Comparación física para niños (masa en kg). Un elefante africano ≈ 6.000 kg. */
export function comparacionMasa(kg) {
  if (!kg) return '';
  if (kg >= 6000) return `como ${num(Math.round(kg / 6000), 0)} elefantes`;
  if (kg >= 1000) return `como ${num(Math.round(kg / 1000), 0)} autos pequeños`;
  if (kg >= 70) return `como ${num(Math.round(kg / 70), 0)} personas adultas`;
  return `como ${num(Math.round(kg / 4), 0)} gatos`;
}
