// Marcadores de depuración (?dbg=1) para alinear los GLB con la convención lat/lon de latLonAVec3.
import { Html } from '@react-three/drei';
import { latLonAVec3 } from '../lib/geo';

const PUNTOS = {
  tierra: [
    ['Golfo de Guinea 0,0', 0, 0, '#ff0'],
    ['Nueva York', 40.7, -74, '#f0f'],
    ['Sídney', -33.9, 151.2, '#0ff'],
    ['Polo Norte', 89, 0, '#fff'],
  ],
  marte: [
    ['Olympus Mons', 18.65, -133.8, '#ff0'],
    ['Valles Marineris (centro)', -14, -70, '#f0f'],
    ['Hellas', -42.4, 70.5, '#0ff'],
    ['Polo Norte', 89, 0, '#fff'],
  ],
  luna: [
    ['Mar de la Tranquilidad', 8.5, 31.4, '#ff0'],
    ['Tycho', -43.3, -11.4, '#f0f'],
    ['Copernicus', 9.6, -20.1, '#0ff'],
  ],
};

// Se lee una sola vez al cargar: el store reescribe la URL y perdería el parámetro.
const DBG = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dbg') === '1';
export const dbgActivo = () => DBG;

export default function MarcadoresPrueba({ cuerpo, radio = 1 }) {
  if (!dbgActivo()) return null;
  return (
    <group>
      {(PUNTOS[cuerpo] || []).map(([nombre, lat, lon, color]) => {
        const p = latLonAVec3(lat, lon, radio * 1.01);
        return (
          <group key={nombre} position={p}>
            <mesh><sphereGeometry args={[0.035, 10, 10]} /><meshBasicMaterial color={color} toneMapped={false} /></mesh>
            <Html center distanceFactor={4} style={{ pointerEvents: 'none' }}><div className="etiqueta-3d" style={{ borderColor: color }}>{nombre}</div></Html>
          </group>
        );
      })}
    </group>
  );
}
