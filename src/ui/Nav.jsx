import { useAppStore } from '../store/useAppStore';
import { ESCENAS, tituloEscena, cortoEscena } from '../data/escenas';
import { tr } from '../i18n';
import Idioma from './Idioma';

const GRUPOS = [
  { acto: 1, es: 'Acto 1 · Historia', en: 'Act 1 · History' },
  { acto: 2, es: 'Acto 2 · El otro lado', en: 'Act 2 · The other side' },
  { acto: 3, es: 'Anexos', en: 'Annexes' },
];

export default function Nav() {
  const { modo, escena, setEscena, setModo } = useAppStore();
  if (!modo || escena === 'inicio') return null;
  return (
    <nav className="nav" aria-label={tr('Capítulos', 'Chapters')}>
      <button className="marca" onClick={() => setEscena('inicio')} title={tr('Volver al inicio', 'Back to home')}>
        Lunar/Mars Memory <span>· Abandoned but not Forgotten</span>
      </button>
      <div className="nav-grupos">
        {GRUPOS.map((g) => (
          <div key={g.acto} className="nav-grupo">
            <span className="nav-etiqueta">{tr(g.es, g.en)}</span>
            <div className="nav-capitulos">
              {ESCENAS.filter((e) => e.acto === g.acto).map((e) => (
                <button key={e.id} className={e.id === escena ? 'activa' : ''} aria-current={e.id === escena ? 'page' : undefined} onClick={() => setEscena(e.id)} title={tituloEscena(e)}>
                  {e.numero !== null && e.numero !== undefined ? <b>{e.numero}</b> : null}{cortoEscena(e)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="modo-toggle" role="group" aria-label={tr('Modo de lectura', 'Reading mode')} title={tr('Cambiar de modo no recarga el mapa', 'Switching mode does not reload the map')}>
        <button className={modo === 'ninos' ? 'activa' : ''} aria-pressed={modo === 'ninos'} onClick={() => setModo('ninos')}>{tr('Niños y jóvenes', 'Kids and teens')}</button>
        <button className={modo === 'org' ? 'activa' : ''} aria-pressed={modo === 'org'} onClick={() => setModo('org')}>{tr('Organizaciones', 'Organizations')}</button>
      </div>
      <Idioma />
    </nav>
  );
}
