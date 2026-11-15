// Animación en bucle de una "solución" al problema de la basura espacial.
import { Lienzo, Estrellas } from './comunes.jsx';
import { Regla5, Carta, Moratoria, Adrasj, Clearspace, Lunarecycle, Onesmallstep } from './soluciones-a.jsx';
import { Proteccion, Whipple, Pasivacion, Desorbita, Elipse, Reutilizable, Laser, Generico } from './soluciones-b.jsx';

export const SOLUCIONES = {
  regla5: { Dibujo: Regla5, etiqueta: 'Regla de los 5 años: el satélite baja en espiral y se quema en la atmósfera' },
  carta: { Dibujo: Carta, etiqueta: 'Carta de Basura Cero: más de 250 organizaciones se unen en círculo' },
  moratoria: { Dibujo: Moratoria, etiqueta: 'Moratoria de pruebas antisatélite: un misil detenido por un escudo, 155 votos' },
  adrasj: { Dibujo: Adrasj, etiqueta: 'ADRAS-J: una nave se acerca a una etapa de cohete hasta 15 metros' },
  clearspace: { Dibujo: Clearspace, etiqueta: 'ClearSpace: una garra de cuatro brazos se cierra sobre un satélite' },
  lunarecycle: { Dibujo: Lunarecycle, etiqueta: 'LunaRecycle: flechas de reciclaje sobre la superficie lunar' },
  onesmallstep: { Dibujo: Onesmallstep, etiqueta: 'One Small Step: una huella protegida como patrimonio' },
  proteccion: { Dibujo: Proteccion, etiqueta: 'Protección planetaria: un rover bajo una cúpula limpia que rebota los microbios' },
  whipple: { Dibujo: Whipple, etiqueta: 'Escudo Whipple: una partícula se deshace en el parachoques antes de la pared' },
  pasivacion: { Dibujo: Pasivacion, etiqueta: 'Pasivación: el tanque ventea y la batería se vacía' },
  desorbita: { Dibujo: Desorbita, etiqueta: 'Desorbitar: el satélite frena con su motor y desciende' },
  elipse: { Dibujo: Elipse, etiqueta: 'Órbita elíptica que roza la atmósfera en cada vuelta' },
  reutilizable: { Dibujo: Reutilizable, etiqueta: 'Cohete reutilizable aterrizando sobre sus patas' },
  laser: { Dibujo: Laser, etiqueta: 'Láser desde tierra que empuja un fragmento hacia abajo' },
};
export const TIPOS_SOLUCION = Object.keys(SOLUCIONES);

/** <AnimacionSolucion tipo="regla5" size={220} /> — tipo desconocido muestra un satélite genérico. */
export default function AnimacionSolucion({ tipo, size = 220, className = '', estrellas = true, style }) {
  const def = SOLUCIONES[tipo] || { Dibujo: Generico, etiqueta: 'Satélite orbitando la Tierra' };
  const { Dibujo } = def;
  return (
    <Lienzo size={size} ancho={220} alto={170} etiqueta={def.etiqueta} className={`v-solucion v-solucion-${tipo || 'generico'} ${className}`} style={style}>
      {estrellas && <Estrellas n={16} ancho={220} alto={170} semilla={(tipo || 'x').length * 11} tenue />}
      <Dibujo />
    </Lienzo>
  );
}
