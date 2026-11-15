// Un solo estado para toda la experiencia (Three.js, UI 2D y dashboard leen y escriben aquí).
import { create } from 'zustand';
import { ESCENAS } from '../data/escenas';

const leerURL = () => {
  const p = new URLSearchParams(window.location.search);
  const modo = p.get('modo');
  const escena = p.get('escena');
  return {
    modo: modo === 'ninos' || modo === 'org' ? modo : null,
    escena: ESCENAS.some((e) => e.id === escena) ? escena : 'inicio',
    objetoSeleccionado: p.get('obj') || null,
    anio: Math.min(2026, Math.max(1957, +(p.get('anio') || 2026))),
  };
};

export const FILTROS_INICIALES = {
  programa: 'todos', // 'todos' | 'Apollo' | ...
  soloLRO: false,
  soloPerdidos: false,
  pais: 'todos',
  tipo: 'todos', // órbita: 'P' | 'R' | 'D' | 'U'
  nube: null, // órbita: 'FY1C' | 'K1408' | ...
  busqueda: '',
};

export const useAppStore = create((set, get) => ({
  ...leerURL(),
  colorPor: 'tipo', // órbita: 'tipo' | 'pais' | 'identificado' | 'nube' | 'union'
  velocidad: 60, // minutos simulados por segundo real (mapa orbital)
  filtros: FILTROS_INICIALES,
  orbita: null, // se carga bajo demanda (public/data/orbita.json)
  cargandoOrbita: false,
  temaViz: 'dark',

  setModo: (modo) => set({ modo }),
  setEscena: (escena) => set({ escena, objetoSeleccionado: null }),
  setAnio: (anio) => set({ anio: Math.min(2026, Math.max(1957, Math.round(anio))) }),
  seleccionar: (id) => set({ objetoSeleccionado: id }),
  setColorPor: (colorPor) => set({ colorPor }),
  setVelocidad: (velocidad) => set({ velocidad }),
  setFiltro: (clave, valor) => set({ filtros: { ...get().filtros, [clave]: valor } }),
  limpiarFiltros: () => set({ filtros: FILTROS_INICIALES }),

  siguienteEscena: () => {
    const i = ESCENAS.findIndex((e) => e.id === get().escena);
    const sig = ESCENAS[Math.min(ESCENAS.length - 1, i + 1)];
    if (sig) get().setEscena(sig.id);
  },
  anteriorEscena: () => {
    const i = ESCENAS.findIndex((e) => e.id === get().escena);
    const ant = ESCENAS[Math.max(0, i - 1)];
    if (ant) get().setEscena(ant.id);
  },

  cargarOrbita: async () => {
    if (get().orbita || get().cargandoOrbita) return;
    set({ cargandoOrbita: true });
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}data/orbita.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      set({ orbita: json, cargandoOrbita: false });
    } catch (e) {
      console.warn('No se pudo cargar orbita.json; se usa una nube simulada.', e);
      set({ orbita: { simulado: true, filas: [] }, cargandoOrbita: false });
    }
  },
}));

// Mantiene el modo, la escena, el año y el objeto en la URL (compartible, sin recargar).
useAppStore.subscribe((s) => {
  const p = new URLSearchParams();
  if (s.modo) p.set('modo', s.modo);
  if (s.escena && s.escena !== 'inicio') p.set('escena', s.escena);
  if (s.objetoSeleccionado) p.set('obj', s.objetoSeleccionado);
  if (s.anio !== 2026) p.set('anio', String(s.anio));
  const q = p.toString();
  const nueva = `${window.location.pathname}${q ? '?' + q : ''}`;
  if (nueva !== window.location.pathname + window.location.search) {
    window.history.replaceState(null, '', nueva);
  }
});
