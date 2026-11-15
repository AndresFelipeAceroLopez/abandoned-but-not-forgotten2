// Sistema solar animado con el Sol en el centro. Lo usan "Espacio profundo" (sondas + basura en órbita solar)
// y "Propuesta" (alineación de Mercurio y Venus detrás del Sol y cápsulas de basura rumbo al Sol).
import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETAS, SONDAS, BASURA_SOLAR, escalaUA } from '../data/sistema_solar';
import Sol from './Sol';
import { t as traducir, tr } from '../i18n'; // (dentro del componente, `t` es el reloj simulado)

const TAU = Math.PI * 2;
const D2R = Math.PI / 180;
const posOrbita = (a, ang, e = 0) => {
  const r = escalaUA(a * (1 - e * e)) / (1 + e * Math.cos(ang));
  return [r * Math.cos(ang), 0, -r * Math.sin(ang)];
};

function Orbita({ a, e = 0, color = '#2c2c2a', puntos = 128 }) {
  const pts = useMemo(() => Array.from({ length: puntos + 1 }, (_, i) => posOrbita(a, (i / puntos) * TAU, e)), [a, e, puntos]);
  return <Line points={pts} color={color} lineWidth={1} transparent opacity={0.7} />;
}

function Etiqueta({ children, color }) {
  return <Html center distanceFactor={9} zIndexRange={[2, 0]} style={{ pointerEvents: 'none' }}><div className="etiqueta-3d" style={{ borderColor: color }}>{children}</div></Html>;
}

/**
 * props:
 *  - modo: 'profundo' | 'propuesta'
 *  - anios: años simulados por segundo (velocidad)
 *  - alineado: si true, al inicio la Tierra está en 0° y Mercurio/Venus en 180° (detrás del Sol)
 *  - onVentana(estado): avisa cuando Mercurio o Venus están en conjunción superior (±8°)
 *  - onSelect(objeto)
 */
export default function SistemaSolar({ modo = 'profundo', anios = 0.15, alineado = false, onVentana, onSelect, mostrarEtiquetas = true }) {
  const t = useRef(0);
  const [hover, setHover] = useState(null);
  const refs = useRef({});
  const capsulas = useRef([]);
  const ventanaRef = useRef({ mercurio: false, venus: false });

  const fase0 = useMemo(() => {
    const f = {};
    for (const p of PLANETAS) f[p.id] = alineado ? (p.id === 'mercurio' || p.id === 'venus' ? Math.PI : p.id === 'tierra' ? 0 : Math.random() * TAU) : Math.random() * TAU;
    return f;
  }, [alineado]);

  const angulo = (p, tiempo) => fase0[p.id] + (TAU * tiempo) / p.periodo;

  useFrame((_, dt) => {
    t.current += dt * anios;
    const tiempo = t.current;
    const pos = {};
    for (const p of PLANETAS) {
      const ang = angulo(p, tiempo);
      pos[p.id] = posOrbita(p.a, ang);
      const g = refs.current[p.id];
      if (g) g.position.set(...pos[p.id]);
    }
    // Sondas
    for (const s of SONDAS) {
      const g = refs.current[s.id];
      if (!g) continue;
      if (s.modo === 'escape') {
        const d = escalaUA(Math.min(400, s.distanciaUA + s.velocidadUAporAnio * tiempo));
        g.position.set(d * Math.cos(s.anguloDeg * D2R), 0.15, -d * Math.sin(s.anguloDeg * D2R));
      } else if (s.modo === 'orbita') {
        g.position.set(...posOrbita(s.a, s.anguloDeg * D2R + (TAU * tiempo) / s.periodo));
      } else if (s.modo === 'cuerpo' && pos[s.cuerpo]) {
        g.position.set(pos[s.cuerpo][0], 0.12, pos[s.cuerpo][2]);
      }
    }
    for (const b of BASURA_SOLAR) {
      const g = refs.current[b.id];
      if (g && b.a) g.position.set(...posOrbita(b.a, b.anguloDeg * D2R + (TAU * tiempo) / Math.pow(b.a, 1.5), b.e));
    }
    // Ventanas (propuesta): planeta interior en conjunción superior = ángulo opuesto a la Tierra (±8°)
    if (modo === 'propuesta') {
      const aT = angulo(PLANETAS[2], tiempo);
      const estado = {};
      for (const id of ['mercurio', 'venus']) {
        const p = PLANETAS.find((x) => x.id === id);
        const dif = Math.abs(((angulo(p, tiempo) - aT - Math.PI) % TAU + TAU + Math.PI) % TAU - Math.PI);
        estado[id] = dif < 8 * D2R;
        if (estado[id] && !ventanaRef.current[id]) capsulas.current.push({ t0: tiempo, desde: [...pos.tierra], id: `${id}-${tiempo.toFixed(2)}` });
      }
      if (estado.mercurio !== ventanaRef.current.mercurio || estado.venus !== ventanaRef.current.venus) {
        ventanaRef.current = estado;
        onVentana?.({ ...estado, tiempo });
      }
      // Cápsulas: viajan de la Tierra al Sol en ~0,4 años simulados
      capsulas.current = capsulas.current.filter((c) => tiempo - c.t0 < 0.45);
      for (const c of capsulas.current) {
        const m = refs.current[c.id];
        const k = Math.min(1, (tiempo - c.t0) / 0.4);
        const x = c.desde[0] * (1 - k), z = c.desde[2] * (1 - k), y = 0.25 * Math.sin(k * Math.PI);
        if (m) { m.position.set(x, y, z); m.visible = k < 1; }
      }
    }
  });

  const cuerpoClick = (o) => (e) => { e.stopPropagation(); onSelect?.(o); };

  return (
    <group>
      <Sol />
      {PLANETAS.map((p) => (
        <group key={p.id}>
          <Orbita a={p.a} color={p.enano ? '#2c2c2a' : '#383835'} />
          <group ref={(g) => (refs.current[p.id] = g)} onClick={cuerpoClick({ tipo: 'planeta', ...p })} onPointerOver={() => setHover(p.id)} onPointerOut={() => setHover(null)}>
            <mesh><sphereGeometry args={[p.radio, 24, 24]} /><meshStandardMaterial color={p.color} roughness={0.9} /></mesh>
            {p.anillo && <mesh rotation={[Math.PI / 2.4, 0, 0]}><ringGeometry args={[p.radio * 1.4, p.radio * 2.1, 48]} /><meshBasicMaterial color="#cdb98a" side={THREE.DoubleSide} transparent opacity={0.7} /></mesh>}
            {(mostrarEtiquetas || hover === p.id) && <Etiqueta color={p.color}><strong>{traducir(p.nombre)}</strong></Etiqueta>}
          </group>
        </group>
      ))}

      {modo === 'profundo' && SONDAS.map((s) => (
        <group key={s.id} ref={(g) => (refs.current[s.id] = g)} onClick={cuerpoClick({ tipo: 'sonda', ...s })} onPointerOver={() => setHover(s.id)} onPointerOut={() => setHover(null)}>
          <mesh><octahedronGeometry args={[0.07, 0]} /><meshBasicMaterial color="#c98500" toneMapped={false} /></mesh>
          <mesh><sphereGeometry args={[0.16, 8, 8]} /><meshBasicMaterial color="#c98500" transparent opacity={0.15} /></mesh>
          {(mostrarEtiquetas || hover === s.id) && <Etiqueta color="#c98500"><strong>{s.nombre}</strong>{hover === s.id && <span>{s.modo === 'escape' ? tr(`${s.distanciaUA} UA y alejándose`, `${s.distanciaUA} AU and moving away`) : traducir(s.nota)}</span>}</Etiqueta>}
        </group>
      ))}
      {modo === 'profundo' && SONDAS.filter((s) => s.modo === 'escape').map((s) => (
        <Line key={s.id + '-estela'} points={[[0.5 * Math.cos(s.anguloDeg * D2R), 0.15, -0.5 * Math.sin(s.anguloDeg * D2R)], [escalaUA(s.distanciaUA) * Math.cos(s.anguloDeg * D2R), 0.15, -escalaUA(s.distanciaUA) * Math.sin(s.anguloDeg * D2R)]]} color="#c98500" lineWidth={1} dashed dashSize={0.15} gapSize={0.1} transparent opacity={0.5} />
      ))}

      {modo === 'profundo' && BASURA_SOLAR.filter((b) => b.a).map((b) => (
        <group key={b.id}>
          <Orbita a={b.a} e={b.e} color="#5b5b57" puntos={96} />
          <group ref={(g) => (refs.current[b.id] = g)} onClick={cuerpoClick({ tipo: 'basura', ...b })} onPointerOver={() => setHover(b.id)} onPointerOut={() => setHover(null)}>
            <mesh rotation={[0.4, 0.3, 0.2]}><cylinderGeometry args={[0.025, 0.03, 0.12, 8]} /><meshStandardMaterial color="#c3c2b7" metalness={0.6} roughness={0.4} /></mesh>
            <mesh><sphereGeometry args={[0.12, 8, 8]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} /></mesh>
            {hover === b.id && <Etiqueta color="#c3c2b7"><strong>{traducir(b.nombre)}</strong><span>{b.anio}</span></Etiqueta>}
          </group>
        </group>
      ))}

      {modo === 'propuesta' && <Capsulas capsulas={capsulas} refs={refs} />}
    </group>
  );
}

// Las cápsulas se crean dinámicamente; se dibujan hasta 6 reutilizables.
function Capsulas({ capsulas, refs }) {
  const [, forzar] = useState(0);
  useFrame(() => { if (capsulas.current.length && capsulas.current.some((c) => !refs.current[c.id])) forzar((n) => n + 1); });
  return (
    <>
      {capsulas.current.map((c) => (
        <group key={c.id} ref={(g) => (refs.current[c.id] = g)}>
          <mesh><coneGeometry args={[0.05, 0.14, 8]} /><meshBasicMaterial color="#e66767" toneMapped={false} /></mesh>
          <mesh><sphereGeometry args={[0.11, 8, 8]} /><meshBasicMaterial color="#e66767" transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} /></mesh>
        </group>
      ))}
    </>
  );
}
