// Orden de la experiencia. Acto 1 = capítulos 0–3 + cierre; Acto 2 = escenas 6–13 + propuesta.
// `titulo`/`corto` en español; `en` lleva la versión en inglés (ver tituloEscena/cortoEscena).
import { getLang } from '../i18n';

export const ESCENAS = [
  { id: 'inicio', acto: 0, numero: null, titulo: 'Elige tu modo', corto: 'Inicio', en: ['Choose your mode', 'Home'] },
  { id: 'prologo', acto: 1, numero: 0, titulo: 'Prólogo: "No significa nada"', corto: 'Prólogo', en: ['Prologue: "It means nothing"', 'Prologue'], cuerpo: 'tierra' },
  { id: 'satelites', acto: 1, numero: null, titulo: 'Satélites sobre la Tierra', corto: 'Satélites', en: ['Satellites above Earth', 'Satellites'], cuerpo: 'tierra' },
  { id: 'luna', acto: 1, numero: 1, titulo: 'La Luna', corto: 'Luna', en: ['The Moon', 'Moon'], cuerpo: 'luna' },
  { id: 'marte', acto: 1, numero: 2, titulo: 'Marte', corto: 'Marte', en: ['Mars', 'Mars'], cuerpo: 'marte' },
  { id: 'profundo', acto: 1, numero: 3, titulo: 'Espacio profundo', corto: 'Profundo', en: ['Deep space', 'Deep space'], cuerpo: 'espacio_profundo' },
  { id: 'cierre', acto: 1, numero: 4, titulo: 'Cierre: no es basura, es historia', corto: 'Cierre', en: ["Closing: it's not junk, it's history", 'Closing'] },
  { id: 'danos', acto: 2, numero: 6, titulo: 'Daños colaterales: cuando el papel cae', corto: 'Daños', en: ['Collateral damage: when the paper falls', 'Damage'] },
  { id: 'radiactivos', acto: 2, numero: 7, titulo: '¿Hay elementos radiactivos?', corto: 'Radiactivos', en: ['Is there radioactive material?', 'Radioactive'] },
  { id: 'sinnombre', acto: 2, numero: 8, titulo: 'Objetos no identificados', corto: 'Fragmentos sin identificar', en: ['Unidentified objects', 'Unidentified fragments'], cuerpo: 'tierra' },
  { id: 'noesbasura', acto: 2, numero: 9, titulo: 'No todo es basura', corto: 'Patrimonio', en: ['Not everything is junk', 'Heritage'] },
  { id: 'paises', acto: 2, numero: 10, titulo: 'Países que compiten', corto: 'Países', en: ['Countries that compete', 'Countries'], cuerpo: 'tierra' },
  { id: 'union', acto: 2, numero: 11, titulo: 'Inspirar a unirse', corto: 'Unión', en: ['Inspiring unity', 'Unity'], cuerpo: 'tierra' },
  { id: 'cortos', acto: 2, numero: 12, titulo: 'Cortos para tomar conciencia', corto: 'Cortos', en: ['Short films to raise awareness', 'Shorts'] },
  { id: 'soluciones', acto: 2, numero: 13, titulo: 'Qué soluciones hay hoy', corto: 'Soluciones', en: ['What solutions exist today', 'Solutions'] },
  { id: 'propuesta', acto: 2, numero: 14, titulo: 'La solución que proponemos', corto: 'Propuesta', en: ['The solution we propose', 'Proposal'] },
  { id: 'dashboard', acto: 3, numero: null, titulo: 'Dashboard', corto: 'Dashboard', en: ['Dashboard', 'Dashboard'] },
  { id: 'referencias', acto: 3, numero: null, titulo: 'Referencias', corto: 'Referencias', en: ['References', 'References'] },
];

export const escenaPorId = (id) => ESCENAS.find((e) => e.id === id);
export const tituloEscena = (e) => (getLang() === 'en' ? e.en[0] : e.titulo);
export const cortoEscena = (e) => (getLang() === 'en' ? e.en[1] : e.corto);
