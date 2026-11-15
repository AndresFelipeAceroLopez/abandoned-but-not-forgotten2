// Marcadores por lat/lon sobre un globo. Clic → ficha. Dorado = patrimonio o sigue activo. Anillo = visto por LRO.
import { useMemo, useState } from 'react';
import { Html } from '@react-three/drei';
import { latLonAVec3 } from '../lib/geo';

export const COLOR_TIPO = {
  aterrizaje: '#3987e5',
  impacto: '#d95926',
  estrellado: '#e66767',
  orbita: '#898781',
  trayectoria: '#9085e9',
  en_orbita_de: '#9085e9',
};
export const COLOR_ORO = '#c98500';

export function colorObjeto(o, colorPor = 'tipo') {
  if (colorPor === 'patrimonio') return o.activo || o.patrimonio ? COLOR_ORO : '#55554f';
  if (colorPor === 'radiactivo') return o.radiactivo ? '#e66767' : '#55554f';
  if (colorPor === 'identificado') return o.paradero_desconocido || o.pais === 'Desconocido' ? '#898781' : '#3987e5';
  if (o.activo) return COLOR_ORO;
  return COLOR_TIPO[o.tipo] || '#c3c2b7';
}

export default function Marcadores({ objetos, radio = 1, seleccionadoId, onSelect, colorPor = 'tipo', escala = 1 }) {
  const [hover, setHover] = useState(null);
  const posiciones = useMemo(
    () => objetos.map((o) => ({ o, p: latLonAVec3(o.lat, o.lon, radio * 1.005), n: latLonAVec3(o.lat, o.lon, radio * 1.06) })),
    [objetos, radio],
  );
  const r = 0.018 * radio * escala;

  return (
    <group>
      {posiciones.map(({ o, p, n }) => {
        const sel = o.id === seleccionadoId;
        const color = colorObjeto(o, colorPor);
        return (
          <group key={o.id}>
            <mesh
              position={p}
              onClick={(e) => { e.stopPropagation(); onSelect?.(o.id); }}
              onPointerOver={(e) => { e.stopPropagation(); setHover(o.id); document.body.style.cursor = 'pointer'; }}
              onPointerOut={() => { setHover(null); document.body.style.cursor = 'auto'; }}
            >
              <sphereGeometry args={[sel ? r * 1.8 : r, 12, 12]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            {/* Área de clic más grande que el marcador */}
            <mesh position={p} visible={false} onClick={(e) => { e.stopPropagation(); onSelect?.(o.id); }}>
              <sphereGeometry args={[r * 3, 8, 8]} />
            </mesh>
            {(o.verificado_lroc || sel) && (
              <mesh position={p} rotation={[0, 0, 0]} onUpdate={(m) => m.lookAt(0, 0, 0)}>
                <ringGeometry args={[r * 1.9, r * 2.3, 24]} />
                <meshBasicMaterial color={sel ? '#ffffff' : color} toneMapped={false} transparent opacity={0.9} />
              </mesh>
            )}
            {hover === o.id && !sel && (
              <Html position={n} center distanceFactor={radio * 3} zIndexRange={[2, 0]} style={{ pointerEvents: 'none' }}>
                <div className="etiqueta-3d">
                  <strong>{o.nombre}</strong>
                  <span>{o.mision} · {o.fecha?.slice(0, 4)}</span>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
