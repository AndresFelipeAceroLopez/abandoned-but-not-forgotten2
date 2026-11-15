// Capítulo 0 · Prólogo "No significa nada": mapa 4D orbital con papeles. También lo reutilizan las escenas 8, 10 y 11.
import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import Escena3D from '../three/Escena3D';
import PlanetaGLB from '../three/PlanetaGLB';
import MarcadoresPrueba from '../three/MarcadoresPrueba';
import NubeOrbital, { filaAObjeto } from '../three/NubeOrbital';
import Narracion from '../ui/Narracion';
import ControlesOrbita from '../ui/ControlesOrbita';
import { PROLOGO_PASOS, CURIOSIDADES_ORBITA } from '../data/contenido';
import { Refs } from '../ui/Referencias';
import { num } from '../lib/formato';

const TIPO = { P: 'Carga útil', R: 'Etapa de cohete', D: 'Fragmento', U: 'Sin identificar' };

export function MapaOrbital({ pasos, colorInicial = 'tipo', anioInicial, panelExtra, alFinal }) {
  const { setColorPor, setAnio, modo, cargandoOrbita, orbita } = useAppStore();
  const [sel, setSel] = useState(null);
  useEffect(() => { setColorPor(colorInicial); if (anioInicial) setAnio(anioInicial); }, [colorInicial, anioInicial, setColorPor, setAnio]);

  return (
    <div className="escena">
      <Escena3D camara={[0, 1.6, 4.2]} minDist={1.3} maxDist={16} onFondoClick={() => setSel(null)}>
        <PlanetaGLB cuerpo="tierra" atmosfera />
        <MarcadoresPrueba cuerpo="tierra" />
        <NubeOrbital onSelect={(f) => setSel(filaAObjeto(f))} />
      </Escena3D>
      {(cargandoOrbita || !orbita) && <div className="cargando"><div className="panel">Cargando catálogo orbital…</div></div>}
      <div className="capa izq">
        <Narracion pasos={pasos} alFinal={alFinal} />
        {panelExtra}
      </div>
      {sel && (
        <div className="capa der">
          <div className="panel ficha">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h2>{sel.nombre}</h2><button className="btn chico" onClick={() => setSel(null)}>✕</button></div>
            <div className="meta">{TIPO[sel.tipo]} · {sel.pais} · lanzado en {Math.floor(sel.lanzamiento)}{sel.reentrada ? ` · reentró en ${Math.floor(sel.reentrada)}` : ' · sigue en órbita'}</div>
            {modo === 'ninos' ? (
              <p className="cuento">{sel.tipo === 'D' ? 'Este es un pedacito de algo que se rompió. Da vueltas a la Tierra a más de 28.000 km/h.' : sel.tipo === 'R' ? 'Este es un cohete que llevó algo al espacio y se quedó allá arriba.' : sel.tipo === 'U' ? 'Nadie sabe bien qué es ni de quién es. Es un papel sin dueño.' : 'Este es un satélite. Algunos siguen trabajando; otros ya se apagaron.'} Está a unos {num(Math.round((sel.a_km - 6378) / 100) * 100, 0)} km de altura.</p>
            ) : (
              <dl>
                <dt>NORAD</dt><dd>{sel.norad}</dd>
                <dt>Semieje mayor</dt><dd>{num(sel.a_km, 0)} km (altura media ≈ {num(sel.a_km - 6378, 0)} km)</dd>
                <dt>Excentricidad</dt><dd>{sel.e}</dd>
                <dt>Inclinación</dt><dd>{sel.i_deg}°</dd>
                {sel.nube && <><dt>Nube</dt><dd>{orbita?.nubes?.[sel.nube]}</dd></>}
                <dt>Fuente</dt><dd>Space-Track.org (18 SPCS); posición propagada con Kepler + J2 desde el último elemento medio</dd>
              </dl>
            )}
          </div>
        </div>
      )}
      <div className="capa abajo"><ControlesOrbita /></div>
    </div>
  );
}

export default function Prologo() {
  const modo = useAppStore((s) => s.modo);
  return (
    <MapaOrbital
      pasos={PROLOGO_PASOS}
      colorInicial="tipo"
      panelExtra={
        modo === 'org' ? (
          <div className="panel tenue">
            <details>
              <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Datos para el guion</summary>
              <ul style={{ paddingLeft: 18, marginTop: 6, fontSize: '0.9rem', color: 'var(--tinta-2)' }}>
                {CURIOSIDADES_ORBITA.map((c, i) => <li key={i}>{c.texto} <Refs ids={c.refs} /></li>)}
              </ul>
            </details>
          </div>
        ) : null
      }
    />
  );
}
