// Modelo 3D del objeto seleccionado, dentro del mismo canvas de Three.js, junto a su marcador.
// Plan original: modelos de Spline. Riesgo anotado en la planeación: @splinetool/r3f-spline no se actualiza desde 2022.
// Por eso aquí se carga GLTF (exportado desde Spline) con useGLTF de drei si existe public/modelos/<programa>.glb;
// si no hay modelo, se arma una figura con primitivas según la clase del objeto (misma heurística que la ilustración 2D).
import { Component, Suspense, useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const MODELOS = { Apollo: 'modelos/modulo-lunar.glb', 'Mars 2020': 'modelos/rover.glb', Pioneer: 'modelos/pioneer.glb' };

export function clase3D(o) {
  const t = `${o.objeto || ''} ${o.nombre || ''} ${o.programa || ''} ${o.mision || ''}`.toLowerCase();
  if (/reflector/.test(t)) return 'reflector';
  if (/helic/.test(t)) return 'helicoptero';
  if (/rover|vehículo lunar|lrv|lunokhod|yutu|sojourner/.test(t)) return 'rover';
  if (/descenso|lander|aterrizador|surveyor|viking|phoenix|insight|pathfinder|luna 9|luna 13|chang'e 3|chang'e 4|chang'e 5|slim|vikram|odysseus|blue ghost/.test(t) && o.tipo === 'aterrizaje') return 'lander';
  if (/ascenso/.test(t)) return 'ascenso';
  if (/s-ivb|etapa|cohete|booster|propulsor|rocket/.test(t)) return 'etapa';
  if (/orbiter|orbitador|subsat|satélite|smart|kaguya|grail|ladee|lcross|hiten|chandrayaan-1|luna 1[0-9]|explorer|rhea/.test(t)) return 'orbitador';
  if (/pioneer|near|dawn|kepler/.test(t)) return 'sonda';
  if (o.tipo === 'impacto' || o.tipo === 'estrellado') return 'impactor';
  return 'nave';
}

const METAL = { color: '#c3c2b7', metalness: 0.7, roughness: 0.35 };
const ORO = { color: '#c98500', metalness: 0.8, roughness: 0.3 };

function Lander({ color }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.55, 0.55, 0.5, 8]} /><meshStandardMaterial {...ORO} /></mesh>
      <mesh position={[0, 1.0, 0]}><octahedronGeometry args={[0.45, 0]} /><meshStandardMaterial color={color} metalness={0.5} roughness={0.5} /></mesh>
      {[0, 1, 2, 3].map((k) => (
        <group key={k} rotation={[0, (k * Math.PI) / 2 + Math.PI / 4, 0]}>
          <mesh position={[0.75, 0.25, 0]} rotation={[0, 0, 0.6]}><cylinderGeometry args={[0.04, 0.04, 0.9, 6]} /><meshStandardMaterial {...METAL} /></mesh>
          <mesh position={[1.0, 0, 0]}><cylinderGeometry args={[0.18, 0.18, 0.05, 10]} /><meshStandardMaterial {...METAL} /></mesh>
        </group>
      ))}
    </group>
  );
}
function Ascenso({ color }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}><boxGeometry args={[0.9, 0.7, 0.8]} /><meshStandardMaterial color={color} metalness={0.5} roughness={0.5} /></mesh>
      <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.2, 0.3, 0.4, 10]} /><meshStandardMaterial {...METAL} /></mesh>
      <mesh position={[0.5, 0.9, 0]}><sphereGeometry args={[0.18, 10, 10]} /><meshStandardMaterial {...METAL} /></mesh>
    </group>
  );
}
function Etapa({ color }) {
  return (
    <group rotation={[0.5, 0, 0.9]}>
      <mesh><cylinderGeometry args={[0.35, 0.35, 1.8, 14]} /><meshStandardMaterial color={color} metalness={0.4} roughness={0.5} /></mesh>
      <mesh position={[0, -1.05, 0]}><coneGeometry args={[0.32, 0.4, 14, 1, true]} /><meshStandardMaterial {...METAL} side={2} /></mesh>
      <mesh position={[0, 1.0, 0]}><cylinderGeometry args={[0.2, 0.35, 0.3, 14]} /><meshStandardMaterial {...METAL} /></mesh>
    </group>
  );
}
function Rover({ color }) {
  return (
    <group>
      <mesh position={[0, 0.45, 0]}><boxGeometry args={[1.1, 0.35, 0.7]} /><meshStandardMaterial color={color} metalness={0.4} roughness={0.6} /></mesh>
      <mesh position={[0, 0.66, 0]}><boxGeometry args={[1.3, 0.04, 0.9]} /><meshStandardMaterial color="#1c3f78" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[0.35, 1.05, 0]}><cylinderGeometry args={[0.03, 0.03, 0.8, 6]} /><meshStandardMaterial {...METAL} /></mesh>
      <mesh position={[0.35, 1.45, 0]}><boxGeometry args={[0.2, 0.12, 0.3]} /><meshStandardMaterial {...METAL} /></mesh>
      {[-0.45, 0, 0.45].flatMap((x) => [-0.45, 0.45].map((z) => (
        <mesh key={`${x}${z}`} position={[x, 0.2, z]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.2, 0.2, 0.12, 12]} /><meshStandardMaterial color="#444" roughness={0.9} /></mesh>
      )))}
    </group>
  );
}
function Orbitador({ color }) {
  return (
    <group rotation={[0.2, 0.4, 0]}>
      <mesh><boxGeometry args={[0.6, 0.6, 0.6]} /><meshStandardMaterial color={color} metalness={0.5} roughness={0.5} /></mesh>
      <mesh position={[1.0, 0, 0]}><boxGeometry args={[1.2, 0.5, 0.03]} /><meshStandardMaterial color="#1c3f78" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[-1.0, 0, 0]}><boxGeometry args={[1.2, 0.5, 0.03]} /><meshStandardMaterial color="#1c3f78" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[0, 0.55, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.3, 0.3, 16, 1, true]} /><meshStandardMaterial {...METAL} side={2} /></mesh>
    </group>
  );
}
function Sonda({ color }) {
  return (
    <group rotation={[0.3, 0, 0]}>
      <mesh rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.9, 0.45, 24, 1, true]} /><meshStandardMaterial {...METAL} side={2} /></mesh>
      <mesh position={[0, -0.5, 0]}><boxGeometry args={[0.5, 0.3, 0.5]} /><meshStandardMaterial color={color} /></mesh>
      <mesh position={[0.9, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.03, 0.03, 1.2, 6]} /><meshStandardMaterial {...METAL} /></mesh>
      <mesh position={[1.5, -0.5, 0]}><cylinderGeometry args={[0.12, 0.12, 0.3, 8]} /><meshStandardMaterial color="#e66767" /></mesh>
    </group>
  );
}
function Helicoptero({ color }) {
  const r = useRef();
  useFrame((_, dt) => { if (r.current) r.current.rotation.y += dt * 12; });
  return (
    <group>
      <mesh position={[0, 0.3, 0]}><boxGeometry args={[0.3, 0.3, 0.3]} /><meshStandardMaterial color={color} /></mesh>
      <mesh position={[0, 0.65, 0]}><cylinderGeometry args={[0.03, 0.03, 0.5, 6]} /><meshStandardMaterial {...METAL} /></mesh>
      <group ref={r} position={[0, 0.85, 0]}><mesh><boxGeometry args={[1.6, 0.02, 0.1]} /><meshStandardMaterial {...METAL} /></mesh><mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0.08, 0]}><boxGeometry args={[1.6, 0.02, 0.1]} /><meshStandardMaterial {...METAL} /></mesh></group>
      {[-0.25, 0.25].flatMap((x) => [-0.25, 0.25].map((z) => <mesh key={`${x}${z}`} position={[x, 0.08, z]}><cylinderGeometry args={[0.02, 0.02, 0.3, 5]} /><meshStandardMaterial {...METAL} /></mesh>))}
    </group>
  );
}
function Reflector() {
  const r = useRef();
  useFrame((s) => { if (r.current) r.current.material.opacity = 0.4 + 0.4 * Math.abs(Math.sin(s.clock.elapsedTime * 3)); });
  return (
    <group>
      <mesh position={[0, 0.3, 0]} rotation={[-0.6, 0, 0]}><boxGeometry args={[1.0, 0.7, 0.08]} /><meshStandardMaterial {...ORO} /></mesh>
      <mesh ref={r} position={[0, 1.6, 0.6]} rotation={[-0.6, 0, 0]}><cylinderGeometry args={[0.03, 0.03, 2.4, 6]} /><meshBasicMaterial color="#e66767" transparent opacity={0.6} toneMapped={false} /></mesh>
    </group>
  );
}
function Impactor({ color }) {
  return (
    <group rotation={[0.9, 0, 0.3]}>
      <mesh><coneGeometry args={[0.35, 1.0, 12]} /><meshStandardMaterial color={color} metalness={0.5} roughness={0.5} /></mesh>
      <mesh position={[0, -0.6, 0]}><cylinderGeometry args={[0.35, 0.3, 0.3, 12]} /><meshStandardMaterial {...METAL} /></mesh>
    </group>
  );
}

function Primitiva({ objeto, escala }) {
  const color = objeto.activo ? '#c98500' : objeto.tipo === 'aterrizaje' ? '#3987e5' : objeto.tipo === 'estrellado' ? '#e66767' : '#d95926';
  const c = clase3D(objeto);
  const Comp = { lander: Lander, ascenso: Ascenso, etapa: Etapa, rover: Rover, orbitador: Orbitador, sonda: Sonda, helicoptero: Helicoptero, reflector: Reflector, impactor: Impactor, nave: Orbitador }[c] || Orbitador;
  return <group scale={escala}><Comp color={color} /></group>;
}

function Gltf({ url, escala }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={escala} />;
}
class ErrorBoundaryGltf extends Component {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? this.props.fallback : <Gltf url={this.props.url} escala={this.props.escala} />; }
}

// Antes de pedir el GLTF comprobamos que exista (un 404 en un sitio estático devuelve index.html).
const disponibles = new Map();
function useModeloDisponible(url) {
  const [ok, setOk] = useState(disponibles.get(url) ?? false);
  useEffect(() => {
    if (!url || disponibles.has(url)) { setOk(disponibles.get(url) ?? false); return; }
    let viva = true;
    fetch(url, { method: 'HEAD' })
      .then((r) => { const t = r.headers.get('content-type') || ''; const bien = r.ok && !t.includes('text/html'); disponibles.set(url, bien); if (viva) setOk(bien); })
      .catch(() => { disponibles.set(url, false); if (viva) setOk(false); });
    return () => { viva = false; };
  }, [url]);
  return ok;
}

/** Orienta el modelo con su "arriba" hacia afuera de la esfera (la posición ya está sobre la superficie). */
function Orientado({ posicion, children }) {
  const ref = useRef();
  useEffect(() => { if (ref.current) ref.current.lookAt(0, 0, 0); }, [posicion]);
  return <group ref={ref} position={posicion}><group rotation={[-Math.PI / 2, 0, 0]}>{children}</group></group>;
}

export default function ModeloObjeto({ objeto, posicion = [0, 0, 0], escala = 0.05 }) {
  const ruta = objeto ? MODELOS[objeto.programa] : null;
  const url = ruta ? `${import.meta.env.BASE_URL}${ruta}` : null;
  const hayModelo = useModeloDisponible(url);
  if (!objeto) return null;
  return (
    <Orientado posicion={posicion}>
      <Suspense fallback={<Primitiva objeto={objeto} escala={escala} />}>
        {hayModelo ? <ErrorBoundaryGltf url={url} escala={escala} fallback={<Primitiva objeto={objeto} escala={escala} />} /> : <Primitiva objeto={objeto} escala={escala} />}
      </Suspense>
    </Orientado>
  );
}
