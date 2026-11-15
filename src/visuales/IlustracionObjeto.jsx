// Ilustración plana de un objeto del catálogo, elegida por heurística sobre sus campos de texto.
import { C, Lienzo, Estrellas, Atomo } from './comunes.jsx';
import { t, tr } from '../i18n';
import { DIBUJOS } from './piezas.jsx';

export const CLASES_OBJETO = Object.keys(DIBUJOS);

const NOMBRE_CLASE = {
  'modulo-descenso': 'etapa de descenso de un módulo lunar', 'modulo-ascenso': 'etapa de ascenso de un módulo lunar', 'etapa-cohete': 'etapa de cohete',
  rover: 'rover de exploración', 'rover-lunar': 'vehículo lunar (LRV)', helicoptero: 'helicóptero', orbitador: 'orbitador', 'sonda-impacto': 'sonda de impacto',
  'aterrizador-patas': 'módulo de aterrizaje con patas', retrorreflector: 'retrorreflector láser', bolsa: 'bolsa de desechos', alsep: 'estación científica ALSEP',
  'sonda-profunda': 'sonda de espacio profundo', telescopio: 'telescopio espacial', 'cohete-desconocido': 'cuerpo de cohete no identificado', nave: 'nave espacial',
};

/** Devuelve la clase de dibujo para un objeto del catálogo (nunca lanza; `objeto` puede venir incompleto). */
export function claseObjeto(o) {
  if (!o || typeof o !== 'object') return 'nave';
  o = o._es || o; // las palabras clave de abajo están en español: se usa siempre el texto original
  // `tipo` queda fuera del texto: "aterrizaje"/"orbita" describen el destino, no la forma del objeto.
  const t = [o.objeto, o.nombre, o.programa, o.mision].filter((v) => typeof v === 'string').join(' | ').toLowerCase();
  const es = (re) => re.test(t);
  if (es(/desconocid|no identificad|unknown|we0913a/)) return 'cohete-desconocido';
  if (es(/helic[oó]ptero|ingenuity/)) return 'helicoptero';
  if (es(/ascenso|ascender/)) return 'modulo-ascenso';
  if (es(/m[oó]dulo lunar|\blm-\d/)) return 'modulo-descenso';
  if (es(/s-ivb|tercera etapa|etapa (superior|\d|del cohete|de cohete)|cohete|booster|propulsor|saturno v|centaur/)) return 'etapa-cohete';
  if (es(/bolsa|desechos|basura/)) return 'bolsa';
  if (es(/alsep|easep/)) return 'alsep';
  if (es(/kepler|telescopio espacial/)) return 'telescopio';
  if (es(/pioneer|near shoemaker|\bnear\b|\bdawn\b|placa de mensaje|interplanetaria/)) return 'sonda-profunda';
  // Aterrizadores por frase específica (antes que "rover": "Módulo de aterrizaje con rover" es el módulo).
  if (es(/m[oó]dulo de (aterrizaje|alunizaje|descenso|demostraci[oó]n)|plataforma de aterrizaje|sonda de alunizaje|retorno de muestras|\blander\b|surveyor|viking|phoenix|insight|beagle|pathfinder|schiaparelli/)) return 'aterrizador-patas';
  if (es(/veh[ií]culo lunar|\blrv\b|buggy/)) return 'rover-lunar';
  if (es(/rover|lunokhod|veh[ií]culo explorador|ocho ruedas|curiosity|perseverance|sojourner|yutu|pragyan/)) return 'rover';
  if (es(/retrorreflector|reflector/)) return 'retrorreflector';
  if (es(/sonda de impacto|ranger|microsonda|impactor|proyectil/)) return 'sonda-impacto';
  if (es(/orbit|subsat|sat[eé]lite|gravimetr|navegaci[oó]n|radiotelescopio/)) return 'orbitador';
  if (es(/aterriz|alunizaje|descenso/)) return 'aterrizador-patas';
  if (o.tipo === 'impacto' && es(/impact/)) return 'sonda-impacto';
  return 'nave';
}

/**
 * <IlustracionObjeto objeto={o} size={160} />
 * Dibuja el objeto con una insignia dorada si sigue activo y un átomo si lleva material radiactivo.
 */
export default function IlustracionObjeto({ objeto, clase, size = 160, className = '', estrellas = true, style }) {
  const k = clase && DIBUJOS[clase] ? clase : claseObjeto(objeto);
  const Dibujo = DIBUJOS[k] || DIBUJOS.nave;
  const nombre = objeto?.nombre ? `${objeto.nombre}: ${t(NOMBRE_CLASE[k])}` : tr(`Ilustración de ${NOMBRE_CLASE[k]}`, `Illustration of a ${t(NOMBRE_CLASE[k])}`);
  const semilla = (objeto?.id || k).length * 7 + 3;
  return (
    <Lienzo size={size} ancho={120} alto={120} etiqueta={nombre} className={`v-objeto v-objeto-${k} ${className}`} style={style}>
      {estrellas && <Estrellas n={10} ancho={120} alto={120} semilla={semilla} tenue />}
      <Dibujo />
      {objeto?.activo && (
        <g>
          <circle cx="104" cy="16" r="8" fill={C.sup} stroke={C.oro} strokeWidth="1.6" />
          <circle cx="104" cy="16" r="3" fill={C.oro} className="v-latir v-centro" />
        </g>
      )}
      {objeto?.radiactivo && (
        <g>
          <circle cx="16" cy="16" r="10" fill={C.sup} stroke={C.rojo} strokeOpacity="0.6" strokeWidth="1" />
          <Atomo x={16} y={16} r={6.5} />
        </g>
      )}
    </Lienzo>
  );
}
