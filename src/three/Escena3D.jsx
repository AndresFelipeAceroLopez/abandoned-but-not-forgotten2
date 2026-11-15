// Un solo <Canvas> por escena, con resolución limitada (dpr 1–2) para que corra en un portátil.
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

export default function Escena3D({ children, camara = [0, 1.2, 3.6], minDist = 1.4, maxDist = 14, autoRotar = false, onFondoClick }) {
  return (
    <Canvas
      className="lienzo-3d"
      dpr={[1, 2]}
      camera={{ position: camara, fov: 45, near: 0.01, far: 200 }}
      raycaster={{ params: { Points: { threshold: 0.03 }, Line: { threshold: 0.01 } } }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onPointerMissed={onFondoClick}
    >
      <color attach="background" args={['#05070d']} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 3, 4]} intensity={1.4} />
      <Stars radius={80} depth={40} count={2500} factor={3} fade speed={0.4} />
      <Suspense fallback={null}>{children}</Suspense>
      <OrbitControls enablePan={false} minDistance={minDist} maxDistance={maxDist} autoRotate={autoRotar} autoRotateSpeed={0.4} />
    </Canvas>
  );
}
