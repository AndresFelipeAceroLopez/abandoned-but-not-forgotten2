// Catálogo de objetos en el idioma activo. objetos.json es el original (español) y objetos.en.json trae solo
// los textos traducidos por id. Cada objeto traducido guarda el original en `_es`: las heurísticas que eligen
// la ilustración o el modelo 3D leen palabras en español.
import datos from './objetos.json';
import EN from './objetos.en.json';
import { getLang, onLang } from '../i18n';

const ES = datos.objetos;
const EN_OBJETOS = ES.map((o) => (EN[o.id] ? { ...o, ...EN[o.id], _es: o } : o));

export const META = datos;
export let OBJETOS = ES;
const aplicar = () => { OBJETOS = getLang() === 'en' ? EN_OBJETOS : ES; };
aplicar();
onLang(aplicar);

export const porId = (id) => OBJETOS.find((o) => o.id === id);
