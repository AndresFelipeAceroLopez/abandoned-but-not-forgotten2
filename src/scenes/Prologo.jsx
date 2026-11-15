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
import { t, tr } from '../i18n';

const tipoTxt = (k) => ({ P: tr('Carga útil', 'Payload'), R: tr('Etapa de cohete', 'Rocket stage'), D: tr('Fragmento', 'Fragment'), U: tr('Sin identificar', 'Unidentified') })[k];

export function MapaOrbital({ pasos, colorInicial = 'tipo', anioInicial, panelExtra, alFinal }) {
  const { setColorPor, setAnio, modo, cargandoOrbita, orbita } = useAppStore();
  const [sel, setSel] = useState(null);
  useEffect(() => { setColorPor(colorInicial); if (anioInicial) setAnio(anioInicial); }, [colorInicial, anioInicial, setColorPor, setAnio]);
  const altura = sel ? num(Math.round((sel.a_km - 6378) / 100) * 100, 0) : '';

  return (
    <div className="escena">
      <Escena3D camara={[0, 1.6, 4.2]} minDist={1.3} maxDist={16} onFondoClick={() => setSel(null)}>
        <PlanetaGLB cuerpo="tierra" atmosfera />
        <MarcadoresPrueba cuerpo="tierra" />
        <NubeOrbital onSelect={(f) => setSel(filaAObjeto(f))} />
      </Escena3D>
      {(cargandoOrbita || !orbita) && <div className="cargando"><div className="panel" role="status">{tr('Cargando catálogo orbital…', 'Loading orbital catalogue…')}</div></div>}
      <div className="capa izq">
        <Narracion pasos={pasos} alFinal={alFinal} />
        {panelExtra}
      </div>
      {sel && (
        <div className="capa der">
          <div className="panel ficha" aria-live="polite">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h2>{sel.nombre}</h2><button className="btn chico" aria-label={tr('Cerrar', 'Close')} onClick={() => setSel(null)}>✕</button></div>
            <div className="meta">
              {tipoTxt(sel.tipo)} · {t(sel.pais)} · {tr('lanzado en', 'launched in')} {Math.floor(sel.lanzamiento)}
              {sel.reentrada ? ` · ${tr('reentró en', 're-entered in')} ${Math.floor(sel.reentrada)}` : ` · ${tr('sigue en órbita', 'still in orbit')}`}
            </div>
            {modo === 'ninos' ? (
              <p className="cuento">
                {sel.tipo === 'D' ? tr('Este es un pedacito de algo que se rompió. Da vueltas a la Tierra a más de 28.000 km/h.', 'This is a little piece of something that broke apart. It circles Earth at more than 28,000 km/h.')
                  : sel.tipo === 'R' ? tr('Este es un cohete que llevó algo al espacio y se quedó allá arriba.', 'This is a rocket that carried something into space and stayed up there.')
                  : sel.tipo === 'U' ? tr('Nadie sabe bien qué es ni de quién es. Es un papel sin dueño.', 'Nobody really knows what it is or whose it is. It is an ownerless paper.')
                  : tr('Este es un satélite. Algunos siguen trabajando; otros ya se apagaron.', 'This is a satellite. Some are still working; others have shut down.')}{' '}
                {tr(`Está a unos ${altura} km de altura.`, `It is about ${altura} km up.`)}
              </p>
            ) : (
              <dl>
                <dt>NORAD</dt><dd>{sel.norad}</dd>
                <dt>{tr('Semieje mayor', 'Semi-major axis')}</dt><dd>{num(sel.a_km, 0)} km ({tr('altura media', 'mean altitude')} ≈ {num(sel.a_km - 6378, 0)} km)</dd>
                <dt>{tr('Excentricidad', 'Eccentricity')}</dt><dd>{num(sel.e)}</dd>
                <dt>{tr('Inclinación', 'Inclination')}</dt><dd>{num(sel.i_deg)}°</dd>
                {sel.nube && <><dt>{tr('Nube', 'Cloud')}</dt><dd>{t(orbita?.nubes?.[sel.nube])}</dd></>}
                <dt>{tr('Fuente', 'Source')}</dt><dd>{tr('Space-Track.org (18 SPCS); posición propagada con Kepler + J2 desde el último elemento medio', 'Space-Track.org (18 SPCS); position propagated with Kepler + J2 from the latest mean element set')}</dd>
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
              <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{tr('Datos para el guion', 'Facts for the script')}</summary>
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
