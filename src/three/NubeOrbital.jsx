// Mapa 4D orbital: miles de "papeles" (THREE.Points, una sola llamada de dibujo) movidos con Kepler + J2.
// Lee public/data/orbita.json (filas compactas del catálogo Space-Track). El año filtra qué objetos existen;
// la velocidad avanza el tiempo simulado. Tamaños aumentados para que se vean (advertencia de escala del anexo).
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../store/useAppStore';
import { posicionKepler, anioADiasJ2000 } from '../lib/geo';

export const COLORES_PAIS = {
  'EE. UU.': '#3987e5', 'URSS/Rusia': '#e66767', China: '#c98500', Francia: '#9085e9', Japón: '#d55181',
  India: '#199e70', 'Reino Unido': '#d95926', ESA: '#008300', Desconocido: '#898781',
};
export const COLORES_TIPO_ORBITA = { P: '#3987e5', R: '#d95926', D: '#8c8c86', U: '#5b5b57' };
export const COLORES_NUBE = { FY1C: '#c98500', K1408: '#e66767', IR33: '#3987e5', K2251: '#9085e9', USA193: '#199e70', MSR: '#d55181' };
const OTRO = '#c3c2b7';
const UNION = '#f0efec';
const APAGADO = '#2e2e2c';

function colorFila(f, colorPor, nubeSel) {
  switch (colorPor) {
    case 'pais': return COLORES_PAIS[f[3]] || OTRO;
    case 'identificado': return f[2] === 'U' || f[3] === 'Desconocido' ? '#898781' : '#3987e5';
    case 'nube':
      if (nubeSel) return f[13] === nubeSel ? '#e66767' : APAGADO;
      return f[13] ? COLORES_NUBE[f[13]] : APAGADO;
    case 'union': return UNION;
    default: return COLORES_TIPO_ORBITA[f[2]] || OTRO;
  }
}

// Sprite de "papelito": un cuadrado blanco algo inclinado.
function texturaPapel() {
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const g = c.getContext('2d');
  g.translate(16, 16);
  g.rotate(0.35);
  g.fillStyle = '#fff';
  g.fillRect(-7, -9, 14, 18);
  g.fillStyle = 'rgba(0,0,0,0.25)';
  g.fillRect(-7, 6, 14, 3);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Nube simulada por si no existe orbita.json (distribución aproximada LEO/MEO/GEO).
function nubeSimulada(n = 8000) {
  const filas = [];
  for (let k = 0; k < n; k++) {
    const u = Math.random();
    const a = u < 0.75 ? 6378 + 300 + Math.random() * 1500 : u < 0.9 ? 6378 + 2000 + Math.random() * 18000 : 42164;
    filas.push([k, 'simulado', 'D', 'Desconocido', 1957 + Math.random() * 69, null, a, +(Math.random() * 0.02).toFixed(4), +(Math.random() * 100).toFixed(1), +(Math.random() * 360).toFixed(1), +(Math.random() * 360).toFixed(1), +(Math.random() * 360).toFixed(1), 9000, null]);
  }
  return { simulado: true, filas };
}

export default function NubeOrbital({ onSelect, tamano = 0.04, maxPuntos = 80000 }) {
  const orbita = useAppStore((s) => s.orbita);
  const cargarOrbita = useAppStore((s) => s.cargarOrbita);
  const anio = useAppStore((s) => s.anio);
  const colorPor = useAppStore((s) => s.colorPor);
  const velocidad = useAppStore((s) => s.velocidad);
  const filtros = useAppStore((s) => s.filtros);
  const [sprite] = useState(texturaPapel);
  const ref = useRef();
  const tRef = useRef({ t: anioADiasJ2000(anio), ultimoAnio: anio });

  useEffect(() => { cargarOrbita(); }, [cargarOrbita]);

  const datos = useMemo(() => {
    const base = orbita && !orbita.simulado ? orbita : nubeSimulada();
    const q = filtros.busqueda.trim().toUpperCase();
    const visibles = [];
    for (const f of base.filas) {
      if (f[4] > anio + 1) continue; // aún no lanzado
      if (f[5] !== null && f[5] < anio) continue; // ya reentró
      if (filtros.tipo !== 'todos' && f[2] !== filtros.tipo) continue;
      if (filtros.pais !== 'todos' && f[3] !== filtros.pais) continue;
      if (q && !f[1].toUpperCase().includes(q)) continue;
      visibles.push(f);
      if (visibles.length >= maxPuntos) break;
    }
    const n = visibles.length;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const c = new THREE.Color();
    for (let k = 0; k < n; k++) {
      c.set(colorFila(visibles[k], colorPor, filtros.nube));
      col[k * 3] = c.r; col[k * 3 + 1] = c.g; col[k * 3 + 2] = c.b;
    }
    return { visibles, pos, col, simulado: !!base.simulado };
  }, [orbita, anio, colorPor, filtros.tipo, filtros.pais, filtros.nube, filtros.busqueda, maxPuntos]);

  // Si cambia el año, reiniciamos el reloj simulado a ese año.
  useEffect(() => {
    if (tRef.current.ultimoAnio !== anio) { tRef.current = { t: anioADiasJ2000(anio), ultimoAnio: anio }; }
  }, [anio]);

  useFrame((_, dt) => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    tRef.current.t += (dt * velocidad) / 1440; // minutos simulados → días
    const t = tRef.current.t;
    const { visibles, pos } = datos;
    for (let k = 0; k < visibles.length; k++) {
      const f = visibles[k];
      if (!posicionKepler(f[6], f[7], f[8], f[9], f[10], f[11], f[12], t, pos, k * 3)) { pos[k * 3] = pos[k * 3 + 1] = pos[k * 3 + 2] = 0; }
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeBoundingSphere();
  });

  const geometria = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(datos.pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(datos.col, 3));
    return g;
  }, [datos]);

  return (
    <points
      ref={ref}
      geometry={geometria}
      onClick={(e) => {
        e.stopPropagation();
        const f = datos.visibles[e.index];
        if (f) onSelect?.(f);
      }}
    >
      <pointsMaterial
        map={sprite}
        size={tamano}
        sizeAttenuation
        vertexColors
        transparent
        alphaTest={0.2}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

export const CAMPOS_ORBITA = ['norad', 'nombre', 'tipo', 'pais', 'lanzamiento', 'reentrada', 'a_km', 'e', 'i_deg', 'raan_deg', 'argp_deg', 'M_deg', 'epoca', 'nube'];
export const filaAObjeto = (f) => Object.fromEntries(CAMPOS_ORBITA.map((c, i) => [c, f[i]]));
