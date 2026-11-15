// Buscador sin backend: filtra los objetos por nombre, misión, programa o país (en el idioma activo y en español).
import { useMemo, useState } from 'react';
import { t, tr } from '../i18n';

export default function Buscador({ objetos, onElegir, placeholder }) {
  const [q, setQ] = useState('');
  const texto = placeholder || tr('Buscar por nombre o misión…', 'Search by name or mission…');
  const res = useMemo(() => {
    const b = q.trim().toLowerCase();
    if (b.length < 2) return [];
    return objetos.filter((o) => `${o.nombre} ${o.mision} ${o.programa} ${o.pais} ${t(o.pais)} ${o._es?.nombre || ''}`.toLowerCase().includes(b)).slice(0, 8);
  }, [q, objetos]);
  return (
    <div className="buscador">
      <input type="search" value={q} placeholder={texto} aria-label={texto} onChange={(e) => setQ(e.target.value)} style={{ width: '100%' }} />
      {res.length > 0 && (
        <div className="bandeja" style={{ marginTop: 6 }}>
          {res.map((o) => (
            <button key={o.id} onClick={() => { onElegir(o.id); setQ(''); }}>{o.nombre}</button>
          ))}
        </div>
      )}
    </div>
  );
}
