// Ecuaciones del anexo técnico: lat/lon → 3D, Kepler, J2, GMST.
import * as THREE from 'three';

export const RADIOS_KM = { tierra: 6378.137, luna: 1737.4, marte: 3389.5 };
export const MU = { tierra: 398600.4, luna: 4902.8, marte: 42828.4 }; // km³/s²
export const J2_TIERRA = 1.08263e-3;

const D2R = Math.PI / 180;

/** Sección 1: de latitud/longitud (grados) a un vector 3D sobre una esfera de radio R (unidades de escena).
 *  Convención Three.js: +y es el polo norte, +x es lon 0 y el este va hacia -z (coincide con el mapeo de texturas equirectangulares). */
export function latLonAVec3(lat, lon, R = 1, target = new THREE.Vector3()) {
  const f = lat * D2R, l = lon * D2R;
  return target.set(R * Math.cos(f) * Math.cos(l), R * Math.sin(f), -R * Math.cos(f) * Math.sin(l));
}

/** Sección 2: tiempo sidéreo de Greenwich (grados) a partir de días desde J2000. */
export function gmstGrados(diasJ2000) {
  const t = 280.46061837 + 360.98564736629 * diasJ2000;
  return ((t % 360) + 360) % 360;
}

/** Sección 3: resuelve M = E − e·sin E con Newton. Entradas y salida en radianes. */
export function anomaliaExcentrica(M, e) {
  let E = e < 0.8 ? M : Math.PI;
  for (let k = 0; k < 6; k++) {
    const d = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= d;
    if (Math.abs(d) < 1e-8) break;
  }
  return E;
}

/** Movimiento medio n (rad/s) y periodo T (s) para un semieje a (km). */
export const movimientoMedio = (a, mu = MU.tierra) => Math.sqrt(mu / (a * a * a));
export const periodoS = (a, mu = MU.tierra) => 2 * Math.PI * Math.sqrt((a * a * a) / mu);

/** Sección 4: deriva del nodo por J2 (rad/s). */
export function derivaNodoJ2(a, e, iRad, mu = MU.tierra) {
  const n = movimientoMedio(a, mu);
  const p = a * (1 - e * e);
  return -1.5 * n * J2_TIERRA * Math.pow(RADIOS_KM.tierra / p, 2) * Math.cos(iRad);
}

/**
 * Posición de un objeto en órbita terrestre en el instante t (días desde J2000), en unidades de escena
 * (radio de la Tierra = 1). Entradas: elementos medios en km y grados, época en días J2000.
 * Escribe x, y, z en `out` a partir de `k`. Devuelve false si no se pudo calcular.
 */
export function posicionKepler(a, e, iDeg, raanDeg, argpDeg, M0Deg, epocaDias, tDias, out, k) {
  if (!(a > 0) || e >= 1) return false;
  const dt = (tDias - epocaDias) * 86400; // s
  const i = iDeg * D2R;
  const n = movimientoMedio(a);
  const M = (M0Deg * D2R + n * dt) % (2 * Math.PI);
  const E = anomaliaExcentrica(M < 0 ? M + 2 * Math.PI : M, e);
  const cosE = Math.cos(E), sinE = Math.sin(E);
  const r = a * (1 - e * cosE);
  const nu = Math.atan2(Math.sqrt(1 - e * e) * sinE, cosE - e);
  const raan = raanDeg * D2R + derivaNodoJ2(a, e, i) * dt;
  const u = argpDeg * D2R + nu; // argumento de latitud
  const cosU = Math.cos(u), sinU = Math.sin(u);
  const cosO = Math.cos(raan), sinO = Math.sin(raan);
  const cosI = Math.cos(i), sinI = Math.sin(i);
  // Marco inercial ecuatorial (X hacia el equinoccio, Z hacia el polo norte)
  const X = r * (cosO * cosU - sinO * sinU * cosI);
  const Y = r * (sinO * cosU + cosO * sinU * cosI);
  const Z = r * (sinU * sinI);
  const s = 1 / RADIOS_KM.tierra;
  // A ejes de Three.js: y arriba, el este va hacia -z (ver latLonAVec3)
  out[k] = X * s;
  out[k + 1] = Z * s;
  out[k + 2] = -Y * s;
  return true;
}

/** Sección 8: potencia restante de un generador de Pu-238 tras t años. */
export const potenciaPu238 = (P0, anios) => P0 * Math.pow(2, -anios / 87.7);

/** Días desde J2000 para una fecha JS. */
export const diasJ2000 = (fecha = new Date()) => (fecha.getTime() - Date.UTC(2000, 0, 1, 12)) / 86400000;

/** Año decimal → días J2000 (aprox., para el control de tiempo del mapa 4D). */
export const anioADiasJ2000 = (anio) => (anio - 2000) * 365.25 - 0.5;
