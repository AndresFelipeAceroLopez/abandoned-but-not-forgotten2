// Sol con relieve: la superficie se desplaza con ruido (granulación que hierve), se sombrea con la normal
// del relieve y se oscurece hacia el borde. Encima, una corona que late. Todo procedural, sin texturas.
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Ruido simplex 3D (Ian McEwan / Ashima Arts, licencia MIT).
const RUIDO = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
// Altura del relieve en una dirección de la esfera, aprox. en [-1, 1]: celdas grandes + granulación fina.
float relieve(vec3 d, float t){
  float n = snoise(d*2.6 + vec3(0.0, 0.0, t*0.10)) * 0.55;
  n += snoise(d*6.5 - vec3(t*0.16, 0.0, 0.0)) * 0.28;
  n += snoise(d*14.0 + vec3(0.0, t*0.24, 0.0)) * 0.17;
  return n;
}
`;

const VERTICES = /* glsl */ `
uniform float uTiempo; uniform float uAmp;
varying vec3 vDir; varying vec3 vNormalVista; varying vec3 vPosVista;
${RUIDO}
vec3 desplazar(vec3 d, float r){ return d * (r + relieve(d, uTiempo) * uAmp); }
void main(){
  float r = length(position);
  vec3 d = position / r;
  // Normal del relieve por diferencias finitas sobre dos tangentes de la esfera.
  vec3 arriba = abs(d.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
  vec3 tg = normalize(cross(d, arriba));
  vec3 bt = cross(d, tg);
  float e = 0.03;
  vec3 p0 = desplazar(d, r);
  vec3 pa = desplazar(normalize(d + tg * e), r);
  vec3 pb = desplazar(normalize(d + bt * e), r);
  vec3 n = normalize(cross(pa - p0, pb - p0));
  vec4 mv = modelViewMatrix * vec4(p0, 1.0);
  vDir = d; vNormalVista = normalMatrix * n; vPosVista = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAGMENTOS = /* glsl */ `
uniform float uTiempo;
varying vec3 vDir; varying vec3 vNormalVista; varying vec3 vPosVista;
${RUIDO}
void main(){
  vec3 N = normalize(vNormalVista);
  vec3 V = normalize(-vPosVista);
  float h = relieve(vDir, uTiempo);
  float grano = snoise(vDir * 34.0 + vec3(uTiempo * 0.35)) * 0.5 + 0.5; // granulación por píxel
  float a = clamp(h * 0.5 + 0.5 + (grano - 0.5) * 0.22, 0.0, 1.0);
  // Valles oscuros → crestas incandescentes
  vec3 col = mix(vec3(0.62, 0.14, 0.01), vec3(1.0, 0.50, 0.07), smoothstep(0.12, 0.52, a));
  col = mix(col, vec3(1.0, 0.86, 0.48), smoothstep(0.50, 0.86, a));
  col = mix(col, vec3(1.0, 0.98, 0.86), smoothstep(0.86, 1.0, a));
  // Sombreado del relieve: una "luz" rasante fija respecto a la cámara marca crestas y valles.
  float luz = dot(N, normalize(vec3(-0.5, 0.6, 0.62)));
  col *= 0.62 + 0.55 * clamp(luz, 0.0, 1.0);
  // Oscurecimiento del limbo y borde caliente
  float frente = clamp(dot(N, V), 0.0, 1.0);
  col *= 0.5 + 0.5 * pow(frente, 0.45);
  col += vec3(1.0, 0.42, 0.08) * pow(1.0 - frente, 2.5) * 0.55;
  gl_FragColor = vec4(col, 1.0);
}
`;

// Halo de la corona: degradado radial pintado una vez en un lienzo.
function texturaCorona() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255, 214, 130, 0.95)');
  grad.addColorStop(0.3, 'rgba(255, 160, 50, 0.55)');
  grad.addColorStop(0.55, 'rgba(255, 110, 20, 0.18)');
  grad.addColorStop(1, 'rgba(255, 90, 0, 0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function Sol({ radio = 0.42 }) {
  const material = useRef();
  const corona = useRef();
  const uniforms = useMemo(() => ({ uTiempo: { value: 0 }, uAmp: { value: radio * 0.085 } }), [radio]);
  const halo = useMemo(texturaCorona, []);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (material.current) material.current.uniforms.uTiempo.value = t;
    if (corona.current) corona.current.scale.setScalar(radio * (5.6 + 0.25 * Math.sin(t * 1.7)));
  });
  return (
    <group>
      <mesh rotation={[0, 0, 0.12]}>
        <sphereGeometry args={[radio, 128, 96]} />
        <shaderMaterial ref={material} uniforms={uniforms} vertexShader={VERTICES} fragmentShader={FRAGMENTOS} toneMapped={false} />
      </mesh>
      <sprite ref={corona} scale={radio * 5.6} raycast={() => null}>
        <spriteMaterial map={halo} transparent blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </sprite>
      <pointLight intensity={12} distance={40} decay={1.2} color="#fff2cc" />
    </group>
  );
}
