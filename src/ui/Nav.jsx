import { useAppStore } from '../store/useAppStore';
import { ESCENAS } from '../data/escenas';

const GRUPOS = [
  { acto: 1, etiqueta: 'Acto 1 · Historia' },
  { acto: 2, etiqueta: 'Acto 2 · El otro lado' },
  { acto: 3, etiqueta: 'Anexos' },
];

export default function Nav() {
  const { modo, escena, setEscena, setModo } = useAppStore();
  if (!modo || escena === 'inicio') return null;
  return (
    <nav className="nav">
      <div className="marca" onClick={() => setEscena('inicio')} style={{ cursor: 'pointer' }} title="Volver al inicio">
        Lunar/Mars Memory <span>· Abandoned but not Forgotten</span>
      </div>
      <div className="nav-grupos">
        {GRUPOS.map((g) => (
          <div key={g.acto} className="nav-grupo">
            <span className="nav-etiqueta">{g.etiqueta}</span>
            <div className="nav-capitulos">
              {ESCENAS.filter((e) => e.acto === g.acto).map((e) => (
                <button key={e.id} className={e.id === escena ? 'activa' : ''} onClick={() => setEscena(e.id)} title={e.titulo}>
                  {e.numero !== null && e.numero !== undefined ? <b>{e.numero}</b> : null}{e.corto}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="modo-toggle" title="Cambiar de modo no recarga el mapa">
        <button className={modo === 'ninos' ? 'activa' : ''} onClick={() => setModo('ninos')}>Niños y jóvenes</button>
        <button className={modo === 'org' ? 'activa' : ''} onClick={() => setModo('org')}>Organizaciones</button>
      </div>
    </nav>
  );
}
