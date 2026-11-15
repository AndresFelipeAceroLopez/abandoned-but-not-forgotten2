// Enlace de referencia en línea ([5]) y página completa de referencias (los dos modos).
import { useMemo, useState } from 'react';
import referencias from '../data/referencias.json';
import { useAppStore } from '../store/useAppStore';

const porId = new Map(referencias.referencias.map((r) => [r.id, r]));
export const ref = (id) => porId.get(id);

export function Refs({ ids = [] }) {
  if (!ids.length) return null;
  return (
    <>
      {ids.map((id) => {
        const r = porId.get(id);
        if (!r) return null;
        return (
          <a key={id} className="ref" href={r.url} target="_blank" rel="noreferrer" title={`${r.autor} (${r.anio || 's. f.'}). ${r.titulo}`}>
            [{id}]
          </a>
        );
      })}
    </>
  );
}

export default function Referencias() {
  const modo = useAppStore((s) => s.modo);
  const [q, setQ] = useState('');
  const [soloPrimarias, setSoloPrimarias] = useState(false);
  const lista = useMemo(() => {
    const t = q.trim().toLowerCase();
    return referencias.referencias.filter((r) => (!soloPrimarias || r.primaria) && (!t || `${r.autor} ${r.titulo} ${r.grupo} ${r.anio}`.toLowerCase().includes(t)));
  }, [q, soloPrimarias]);

  if (modo === 'ninos') {
    return (
      <div className="escena-scroll">
        <div className="contenido angosto">
          <div className="cabecera-escena"><div className="acto">¿De dónde sale esto?</div><h1>Nuestras fuentes</h1></div>
          <p>Todo lo que cuenta esta historia sale de las listas oficiales de NASA y de la Agencia Espacial Europea, y de artículos de científicos. Cada ficha tiene un botón "Fuente" para que lo compruebes.</p>
          <ul>
            <li><a href={ref(2).url} target="_blank" rel="noreferrer">La lista de todo lo que hay en la Luna (NASA NSSDCA)</a></li>
            <li><a href={ref(37).url} target="_blank" rel="noreferrer">Cuánta basura hay en Marte (Cagri Kilic, 2022)</a></li>
            <li><a href={ref(5).url} target="_blank" rel="noreferrer">Cuántos objetos dan vueltas a la Tierra (ESA)</a></li>
            <li><a href={ref(29).url} target="_blank" rel="noreferrer">Las 96 bolsas de los astronautas (NASA)</a></li>
            <li><a href={ref(11).url} target="_blank" rel="noreferrer">Los espejos que siguen funcionando (NASA ILRS)</a></li>
          </ul>
          <p><small>La lista completa, con {referencias.referencias.length} fuentes, está en el modo para organizaciones.</small></p>
        </div>
      </div>
    );
  }

  return (
    <div className="escena-scroll">
      <div className="contenido">
        <div className="cabecera-escena"><div className="acto">Anexo</div><h1>Referencias ({referencias.referencias.length})</h1><p className="mini">{referencias.nota}</p></div>
        <div className="controles-mapa" style={{ marginBottom: 14 }}>
          <input type="text" placeholder="Buscar autor, título, grupo…" value={q} onChange={(e) => setQ(e.target.value)} />
          <label><input type="checkbox" checked={soloPrimarias} onChange={(e) => setSoloPrimarias(e.target.checked)} /> Solo fuentes primarias</label>
          <span className="mini">{lista.length} resultados</span>
        </div>
        {referencias.grupos.map((g) => {
          const items = lista.filter((r) => r.grupo === g);
          if (!items.length) return null;
          return (
            <section key={g} style={{ marginBottom: 22 }}>
              <h2>{g}</h2>
              <ol start={items[0].id} style={{ paddingLeft: 28 }}>
                {items.map((r) => (
                  <li key={r.id} value={r.id} style={{ marginBottom: 8 }}>
                    {r.autor}{r.anio ? ` (${r.anio})` : ''}. <em>{r.titulo}</em>{r.publicacion ? `. ${r.publicacion}` : ''}.{' '}
                    <a href={r.url} target="_blank" rel="noreferrer">{new URL(r.url).hostname}</a>
                    {r.urls_extra?.map((u) => <> · <a key={u} href={u} target="_blank" rel="noreferrer">{new URL(u).hostname}</a></>)}
                    {r.nota && <span className="mini"> — {r.nota}</span>}
                    {!r.primaria && <span className="chip gris" style={{ marginLeft: 6 }}>prensa / secundaria</span>}
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
