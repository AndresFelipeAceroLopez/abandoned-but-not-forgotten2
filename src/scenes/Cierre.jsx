// Cierre del Acto 1: cada papel se voltea y muestra su descubrimiento. "No es basura: es historia."
import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { OBJETOS } from './GloboObjetos';
import { CIERRE } from '../data/contenido';

export default function Cierre() {
  const { modo, setEscena, seleccionar } = useAppStore();
  const [volteados, setVolteados] = useState({});
  const papeles = useMemo(() => {
    const con = OBJETOS.filter((o) => o.logro && (o.activo || o.patrimonio || o.a_proposito || o.cuerpo !== 'luna'));
    return con.sort(() => Math.random() - 0.5).slice(0, 18);
  }, []);
  const todos = papeles.length && papeles.every((p) => volteados[p.id]);

  return (
    <div className="escena-scroll">
      <div className="contenido" style={{ textAlign: 'center' }}>
        <div className="cabecera-escena"><div className="acto">Cierre del Acto 1</div><h1>Voltea cada papel</h1></div>
        <p style={{ color: 'var(--tinta-2)' }}>{modo === 'ninos' ? 'Toca cada papel para ver qué descubrimiento esconde.' : 'Cada objeto se asocia a un resultado científico documentado. Toca para voltear.'}</p>
        <div className="papeles-cierre">
          {papeles.map((o, i) => {
            const v = volteados[o.id];
            return (
              <div key={o.id} className={`papel-card ${v ? 'volteado' : ''}`} style={{ '--rot': `${((i * 37) % 9) - 4}deg` }} onClick={() => setVolteados({ ...volteados, [o.id]: !v })}>
                {v ? (<><strong>{o.nombre}</strong>{o.logro}</>) : (<><strong>Un papel</strong>No significa nada… ¿o sí?</>)}
              </div>
            );
          })}
        </div>
        <div className="cierre" style={{ position: 'static', padding: '20px 0' }}>
          <div className="frase" style={{ opacity: todos ? 1 : 0.5, transition: 'opacity 0.6s' }}>{CIERRE[modo] || CIERRE.ninos}</div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => { seleccionar(null); setEscena('luna'); }}>Explorar la Luna</button>
          <button className="btn primario" onClick={() => setEscena('danos')}>Ver el otro lado: Acto 2 →</button>
          <button className="btn" onClick={() => setEscena('dashboard')}>Dashboard</button>
        </div>
      </div>
    </div>
  );
}
