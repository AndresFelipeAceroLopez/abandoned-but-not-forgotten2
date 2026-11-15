// Sistema solar para las escenas "Espacio profundo" y "Propuesta".
// Distancias en UA y periodos en años (valores medios, NASA). En pantalla se comprime la distancia: r = 2·a^0.45.

export const PLANETAS = [
  { id: 'mercurio', nombre: 'Mercurio', a: 0.387, periodo: 0.2408, radio: 0.06, color: '#9c9c96', tipo: 'mercurio' },
  { id: 'venus', nombre: 'Venus', a: 0.723, periodo: 0.6152, radio: 0.1, color: '#e3c27a', tipo: 'venus' },
  { id: 'tierra', nombre: 'Tierra', a: 1.0, periodo: 1.0, radio: 0.105, color: '#3987e5', tipo: 'tierra' },
  { id: 'marte', nombre: 'Marte', a: 1.524, periodo: 1.8809, radio: 0.08, color: '#c1562f', tipo: 'marte' },
  { id: 'ceres', nombre: 'Ceres', a: 2.767, periodo: 4.6, radio: 0.035, color: '#8a8a84', tipo: 'ceres', enano: true },
  { id: 'jupiter', nombre: 'Júpiter', a: 5.203, periodo: 11.862, radio: 0.26, color: '#c9a27a', tipo: 'jupiter' },
  { id: 'saturno', nombre: 'Saturno', a: 9.537, periodo: 29.457, radio: 0.22, color: '#e0c98f', tipo: 'saturno', anillo: true },
  { id: 'urano', nombre: 'Urano', a: 19.19, periodo: 84.02, radio: 0.15, color: '#8fd3e0', tipo: 'urano' },
  { id: 'neptuno', nombre: 'Neptuno', a: 30.07, periodo: 164.8, radio: 0.145, color: '#4a6fe0', tipo: 'neptuno' },
];

export const escalaUA = (a) => 2 * Math.pow(a, 0.45);

// Sondas del capítulo 3 (posición esquemática a 2026; las trayectorias reales son hiperbólicas y se tomarían de JPL Horizons).
export const SONDAS = [
  { id: 'espacio-profundo-pioneer-10', nombre: 'Pioneer 10', modo: 'escape', distanciaUA: 137, anguloDeg: 70, velocidadUAporAnio: 2.5, nota: 'Rumbo a Aldebarán; última señal 2003', refs: [44] },
  { id: 'espacio-profundo-pioneer-11', nombre: 'Pioneer 11', modo: 'escape', distanciaUA: 115, anguloDeg: 250, velocidadUAporAnio: 2.4, nota: 'Rumbo a la constelación de Aquila; última señal 1995', refs: [45] },
  { id: 'espacio-profundo-near-shoemaker', nombre: 'NEAR Shoemaker', modo: 'orbita', a: 1.458, periodo: 1.76, anguloDeg: 200, nota: 'Sobre el asteroide Eros (433 Eros, a = 1,46 UA)', refs: [43] },
  { id: 'espacio-profundo-dawn', nombre: 'Dawn', modo: 'cuerpo', cuerpo: 'ceres', nota: 'En órbita de Ceres desde 2015; sin hidracina desde 2018', refs: [42] },
  { id: 'espacio-profundo-kepler', nombre: 'Kepler', modo: 'orbita', a: 1.013, periodo: 1.02, anguloDeg: -35, nota: 'Órbita heliocéntrica que sigue a la Tierra (se aleja ~0,1 UA por año)', refs: [46] },
];

// "Basura" en órbita solar: etapas y objetos abandonados en órbita heliocéntrica (posiciones esquemáticas).
export const BASURA_SOLAR = [
  { id: 'sivb-apollo-8', nombre: 'Etapa S-IVB del Apollo 8', a: 1.0, e: 0.02, anguloDeg: 40, anio: 1968, tipo: 'etapa', nota: 'Tercera etapa enviada a órbita solar tras la inyección translunar.', refs: [2] },
  { id: 'sivb-apollo-10', nombre: 'Etapa S-IVB del Apollo 10', a: 1.0, e: 0.03, anguloDeg: 120, anio: 1969, tipo: 'etapa', nota: 'Sigue en órbita heliocéntrica.', refs: [2] },
  { id: 'sivb-apollo-11', nombre: 'Etapa S-IVB del Apollo 11', a: 1.0, e: 0.02, anguloDeg: 185, anio: 1969, tipo: 'etapa', nota: 'Sigue en órbita heliocéntrica.', refs: [2] },
  { id: 'sivb-apollo-12', nombre: 'Etapa S-IVB del Apollo 12 (J002E3)', a: 1.0, e: 0.04, anguloDeg: 300, anio: 1969, tipo: 'etapa', nota: 'Redescubierta en 2002 como "asteroide" J002E3; fue capturada temporalmente por la Tierra en 2002–2003.', refs: [2] },
  { id: 'roadster', nombre: 'Etapa superior Falcon Heavy + Tesla Roadster', a: 1.33, e: 0.26, anguloDeg: 230, anio: 2018, tipo: 'etapa', nota: 'Lanzamiento de prueba de 2018; cruza la órbita de Marte.', refs: [] },
  { id: 'snap-apollo13', nombre: 'Módulo lunar Apollo 13 (Aquarius)', a: null, anio: 1970, tipo: 'reentrada', nota: 'No está en órbita solar: reentró sobre el Pacífico con su SNAP-27 (ver escena 7).', refs: [64] },
];

// Ventanas de la propuesta: Mercurio y Venus "detrás del Sol" respecto a la Tierra (conjunción superior).
// Periodo sinódico S = 1 / |1/T_planeta − 1/T_tierra| (en años).
export const sinodico = (periodo) => 1 / Math.abs(1 / periodo - 1);
export const VENTANAS = {
  mercurio: { meses: +(sinodico(0.2408) * 12).toFixed(1) },
  venus: { meses: +(sinodico(0.6152) * 12).toFixed(1) },
  equipo: 'El equipo propone ventanas cada 1 y 7 meses (por confirmar con las conjunciones reales).',
};
