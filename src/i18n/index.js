// Idioma de la interfaz. Inglés por defecto; español como alternativa (?lang=es o el botón EN | ES).
// - tr(es, en): par en línea para textos de la interfaz.
// - t(es): busca en el diccionario (src/i18n/en.js) las etiquetas cortas que vienen de los datos.
// Al cambiar de idioma la app se vuelve a montar (key en App.jsx), así que no hacen falta hooks.
import EN from './en';

export const IDIOMAS = ['en', 'es'];

function inicial() {
  try {
    const p = new URLSearchParams(window.location.search).get('lang');
    if (IDIOMAS.includes(p)) return p;
    const g = window.localStorage.getItem('lang');
    if (IDIOMAS.includes(g)) return g;
  } catch { /* sin acceso a la URL o al almacenamiento */ }
  return 'en';
}

let lang = inicial();
const oyentes = new Set();
const marcarDocumento = () => { if (typeof document !== 'undefined') document.documentElement.lang = lang; };
marcarDocumento();

export const getLang = () => lang;
export const onLang = (fn) => { oyentes.add(fn); return () => oyentes.delete(fn); };
export function setLang(nuevo) {
  if (!IDIOMAS.includes(nuevo) || nuevo === lang) return;
  lang = nuevo;
  try { window.localStorage.setItem('lang', lang); } catch { /* modo privado */ }
  marcarDocumento();
  oyentes.forEach((fn) => fn(lang));
}

export const tr = (es, en) => (lang === 'en' ? en : es);
export const t = (es) => (lang === 'en' && typeof es === 'string' ? EN[es] ?? es : es);
export const locale = () => (lang === 'en' ? 'en-US' : 'es-CO');
