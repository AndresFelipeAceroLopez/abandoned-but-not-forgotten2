// Planeta a partir de los GLB del equipo (public/modelos/{earth,mars,moon}.glb, Sketchfab, optimizados a 2048 px webp).
// Se normaliza a radio = `radio` y se centra en el origen; mientras carga se muestra la esfera de Globo.
import { Suspense, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import Globo from './Globo';

const ARCHIVO = { tierra: 'earth.glb', marte: 'mars.glb', luna: 'moon.glb' };
// Desfase de longitud (rad) para que lon 0 del modelo coincida con lon 0 de los marcadores (latLonAVec3).
// Ajustado con marcadores de prueba (?dbg=1): ver etl/humo_navegador.mjs.
export const DESFASE_LON = { tierra: (-5 * Math.PI) / 180, marte: (-90 * Math.PI) / 180, luna: Math.PI / 2 };

function Modelo({ url, radio, cuerpo }) {
  const { scene } = useGLTF(url);
  const clon = useMemo(() => {
    // Envolvemos el clon en un grupo propio: el nodo raíz de Sketchfab trae su propia transformación
    // (posición/rotación/escala) y no debe sobrescribirse.
    const s = scene.clone(true);
    s.updateMatrixWorld(true);
    const caja = new THREE.Box3().setFromObject(s, true);
    const esfera = caja.getBoundingSphere(new THREE.Sphere());
    // Radio real: máxima distancia de los vértices al centro (Box3.getBoundingSphere da la esfera circunscrita a la caja, √3 veces mayor).
    let rMax = 0;
    const v = new THREE.Vector3();
    s.traverse((o) => {
      if (!o.isMesh) return;
      const p = o.geometry.attributes.position;
      for (let i = 0; i < p.count; i += Math.max(1, Math.floor(p.count / 4000))) {
        v.fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld);
        rMax = Math.max(rMax, v.distanceTo(esfera.center));
      }
    });
    const k = radio / (rMax || esfera.radius || 1);
    const envoltorio = new THREE.Group();
    envoltorio.add(s);
    envoltorio.scale.setScalar(k);
    envoltorio.position.copy(esfera.center).multiplyScalar(-k);
    s.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = false; o.receiveShadow = false;
        // Es una esfera: normales = dirección radial desde su centro (evita normales/tangentes raras del export).
        const g = o.geometry;
        g.computeBoundingSphere();
        const c = g.boundingSphere.center, p = g.attributes.position;
        const n = new Float32Array(p.count * 3);
        const v = new THREE.Vector3();
        for (let i = 0; i < p.count; i++) { v.set(p.getX(i) - c.x, p.getY(i) - c.y, p.getZ(i) - c.z).normalize(); n[i * 3] = v.x; n[i * 3 + 1] = v.y; n[i * 3 + 2] = v.z; }
        g.setAttribute('normal', new THREE.BufferAttribute(n, 3));
        g.deleteAttribute('tangent');
        if (o.material) {
          const m = new THREE.MeshStandardMaterial({ map: o.material.map || null, color: o.material.color || 0xffffff, roughness: 1, metalness: 0, side: THREE.DoubleSide });
          if (m.map) m.map.anisotropy = 4;
          o.material = m;
        }
      }
    });
    if (typeof window !== 'undefined' && window.__depurar) { window.__planeta = envoltorio; window.__THREE = THREE; }
    return envoltorio;
  }, [scene, radio]);
  return <primitive object={clon} rotation-y={DESFASE_LON[cuerpo] || 0} />;
}

export default function PlanetaGLB({ cuerpo = 'tierra', radio = 1, rotacionY = 0, atmosfera = false }) {
  const url = `${import.meta.env.BASE_URL}modelos/${ARCHIVO[cuerpo]}`;
  return (
    <group rotation-y={rotacionY}>
      <Suspense fallback={<Globo cuerpo={cuerpo} radio={radio} />}>
        <Modelo url={url} radio={radio} cuerpo={cuerpo} />
      </Suspense>
      {atmosfera && (
        <mesh>
          <sphereGeometry args={[radio * 1.02, 48, 24]} />
          <meshBasicMaterial color="#5aa9ff" transparent opacity={0.12} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      )}
    </group>
  );
}

export const precargarPlaneta = (cuerpo) => useGLTF.preload(`${import.meta.env.BASE_URL}modelos/${ARCHIVO[cuerpo]}`);
