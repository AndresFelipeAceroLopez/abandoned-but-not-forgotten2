// Esfera con textura de NASA (public/texturas/<cuerpo>.jpg). Si la textura falta, usa un color plano.
import { useEffect, useState } from 'react';
import * as THREE from 'three';

const COLOR_FALLBACK = { tierra: '#1f5fae', luna: '#8f8f8a', marte: '#b5542b' };

export default function Globo({ cuerpo = 'luna', radio = 1, rotacionY = 0, atmosfera = false, segmentos = 96 }) {
  const [textura, setTextura] = useState(null);

  useEffect(() => {
    let viva = true;
    const url = `${import.meta.env.BASE_URL}texturas/${cuerpo}.jpg`;
    new THREE.TextureLoader().load(
      url,
      (t) => { if (!viva) return; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; setTextura(t); },
      undefined,
      () => { if (viva) setTextura(null); },
    );
    return () => { viva = false; };
  }, [cuerpo]);

  return (
    <group rotation-y={rotacionY}>
      <mesh onUpdate={(m) => { if (import.meta.env.DEV || window.__depurar) window.__globo = m; }}>
        <sphereGeometry args={[radio, segmentos, segmentos / 2]} />
        {/* `key` fuerza un material nuevo cuando llega la textura: asignar `map` después de crearlo no recompila el shader (three no marca needsUpdate). */}
        <meshStandardMaterial key={textura ? 'con-textura' : 'plano'} map={textura || null} color={textura ? '#ffffff' : COLOR_FALLBACK[cuerpo] || '#777'} roughness={1} metalness={0} />
      </mesh>
      {atmosfera && (
        <mesh>
          <sphereGeometry args={[radio * 1.02, 48, 24]} />
          <meshBasicMaterial color="#5aa9ff" transparent opacity={0.12} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      )}
    </group>
  );
}
