// Buscador sin backend: filtra objetos.json por nombre, misión o programa.
import { useMemo, useState } from 'react';

export default function Buscador({ objetos, onElegir, placeholder = 'Buscar por nombre o misión…' }) {
  const [q, setQ] = useState('');
  const res = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    return objetos.filter((o) => `${o.nombre} ${o.mision} ${o.programa} ${o.pais}`.toLowerCase().includes(t)).slice(0, 8);
  }, [q, objetos]);
  return (
    <div className="buscador">
      <input type="text" value={q} placeholder={placeholder} onChange={(e) => setQ(e.target.value)} style={{ width: '100%' }} />
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
