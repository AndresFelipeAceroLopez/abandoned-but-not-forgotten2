// Orden de la experiencia. Acto 1 = capítulos 0–3 + cierre; Acto 2 = escenas 6–13 + propuesta.
export const ESCENAS = [
  { id: 'inicio', acto: 0, numero: null, titulo: 'Elige tu modo', corto: 'Inicio' },
  { id: 'prologo', acto: 1, numero: 0, titulo: 'Prólogo: "No significa nada"', corto: 'Prólogo', cuerpo: 'tierra' },
  { id: 'satelites', acto: 1, numero: null, titulo: 'Satélites sobre la Tierra', corto: 'Satélites', cuerpo: 'tierra' },
  { id: 'luna', acto: 1, numero: 1, titulo: 'La Luna', corto: 'Luna', cuerpo: 'luna' },
  { id: 'marte', acto: 1, numero: 2, titulo: 'Marte', corto: 'Marte', cuerpo: 'marte' },
  { id: 'profundo', acto: 1, numero: 3, titulo: 'Espacio profundo', corto: 'Profundo', cuerpo: 'espacio_profundo' },
  { id: 'cierre', acto: 1, numero: 4, titulo: 'Cierre: no es basura, es historia', corto: 'Cierre' },
  { id: 'danos', acto: 2, numero: 6, titulo: 'Daños colaterales: cuando el papel cae', corto: 'Daños' },
  { id: 'radiactivos', acto: 2, numero: 7, titulo: '¿Hay elementos radiactivos?', corto: 'Radiactivos' },
  { id: 'sinnombre', acto: 2, numero: 8, titulo: 'Objetos no identificados', corto: 'Sin nombre', cuerpo: 'tierra' },
  { id: 'noesbasura', acto: 2, numero: 9, titulo: 'No todo es basura', corto: 'Patrimonio' },
  { id: 'paises', acto: 2, numero: 10, titulo: 'Países que compiten', corto: 'Países', cuerpo: 'tierra' },
  { id: 'union', acto: 2, numero: 11, titulo: 'Inspirar a unirse', corto: 'Unión', cuerpo: 'tierra' },
  { id: 'cortos', acto: 2, numero: 12, titulo: 'Cortos para tomar conciencia', corto: 'Cortos' },
  { id: 'soluciones', acto: 2, numero: 13, titulo: 'Qué soluciones hay hoy', corto: 'Soluciones' },
  { id: 'propuesta', acto: 2, numero: 14, titulo: 'La solución que proponemos', corto: 'Propuesta' },
  { id: 'dashboard', acto: 3, numero: null, titulo: 'Dashboard', corto: 'Dashboard' },
  { id: 'referencias', acto: 3, numero: null, titulo: 'Referencias', corto: 'Referencias' },
  { id: 'fotos', acto: 3, numero: null, titulo: 'Fotos y Objetos Perdidos', corto: 'Fotos y Objetos Perdidos' },
];

export const escenaPorId = (id) => ESCENAS.find((e) => e.id === id);
