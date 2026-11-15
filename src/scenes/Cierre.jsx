// Cierre del Acto 1: cada papel se voltea y muestra su descubrimiento. "No es basura: es historia."
import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { OBJETOS } from '../data/objetos';
import { CIERRE } from '../data/contenido';
import { tr } from '../i18n';

export default function Cierre() {
  const { modo, setEscena, seleccionar } = useAppStore();
  const [volteados, setVolteados] = useState({});
  const papeles = useMemo(() => {
    const con = OBJETOS.filter((o) => o.logro && (o.activo || o.patrimonio || o.a_proposito || o.cuerpo !== 'luna'));
    return con.sort(() => Math.random() - 0.5).slice(0, 18);
  }, []);
  const todos = papeles.length && papeles.every((p) => volteados[p.id]);

  return (
    <div className="escena-scroll" tabIndex={0} role="region" aria-label={tr('Cierre del Acto 1', 'Closing of Act 1')}>
      <div className="contenido" style={{ textAlign: 'center' }}>
        <div className="cabecera-escena"><div className="acto">{tr('Cierre del Acto 1', 'Closing of Act 1')}</div><h1>{tr('Voltea cada papel', 'Flip every paper')}</h1></div>
        <p style={{ color: 'var(--tinta-2)' }}>
          {modo === 'ninos'
            ? tr('Toca cada papel para ver qué descubrimiento esconde.', 'Tap each paper to see the discovery it hides.')
            : tr('Cada objeto se asocia a un resultado científico documentado. Toca para voltear.', 'Each object is linked to a documented scientific result. Tap to flip.')}
        </p>
        <div className="papeles-cierre">
          {papeles.map((o, i) => {
            const v = volteados[o.id];
            return (
              <button key={o.id} className={`papel-card ${v ? 'volteado' : ''}`} style={{ '--rot': `${((i * 37) % 9) - 4}deg`, border: 0, textAlign: 'left' }} aria-pressed={!!v} onClick={() => setVolteados({ ...volteados, [o.id]: !v })}>
                {v ? (<><strong>{o.nombre}</strong>{o.logro}</>) : (<><strong>{tr('Un papel', 'A paper')}</strong>{tr('No significa nada… ¿o sí?', 'It means nothing… or does it?')}</>)}
              </button>
            );
          })}
        </div>
        <div className="cierre" style={{ position: 'static', padding: '20px 0' }}>
          <div className="frase" style={{ opacity: todos ? 1 : 0.5, transition: 'opacity 0.6s' }}>{CIERRE[modo] || CIERRE.ninos}</div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => { seleccionar(null); setEscena('luna'); }}>{tr('Explorar la Luna', 'Explore the Moon')}</button>
          <button className="btn primario" onClick={() => setEscena('danos')}>{tr('Ver el otro lado: Acto 2 →', 'See the other side: Act 2 →')}</button>
          <button className="btn" onClick={() => setEscena('dashboard')}>Dashboard</button>
        </div>
      </div>
    </div>
  );
}
