// Enlace de referencia en línea ([5]) y página completa de referencias (los dos modos).
import { Fragment, useMemo, useState } from 'react';
import referencias from '../data/referencias.json';
import { useAppStore } from '../store/useAppStore';
import { t, tr } from '../i18n';

const porId = new Map(referencias.referencias.map((r) => [r.id, r]));
export const ref = (id) => porId.get(id);

export function Refs({ ids = [] }) {
  if (!ids.length) return null;
  return (
    <>
      {ids.map((id) => {
        const r = porId.get(id);
        if (!r) return null;
        const cita = `${r.autor} (${r.anio || tr('s. f.', 'n.d.')}). ${r.titulo}`;
        return (
          <a key={id} className="ref" href={r.url} target="_blank" rel="noreferrer" title={cita} aria-label={`${tr('Referencia', 'Reference')} ${id}: ${cita}`}>
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
    const b = q.trim().toLowerCase();
    return referencias.referencias.filter((r) => (!soloPrimarias || r.primaria) && (!b || `${r.autor} ${r.titulo} ${r.grupo} ${t(r.grupo)} ${r.anio}`.toLowerCase().includes(b)));
  }, [q, soloPrimarias]);
  const total = referencias.referencias.length;

  if (modo === 'ninos') {
    return (
      <div className="escena-scroll" tabIndex={0} role="region" aria-label={tr('Nuestras fuentes', 'Our sources')}>
        <div className="contenido angosto">
          <div className="cabecera-escena"><div className="acto">{tr('¿De dónde sale esto?', 'Where does this come from?')}</div><h1>{tr('Nuestras fuentes', 'Our sources')}</h1></div>
          <p>
            {tr(
              'Todo lo que cuenta esta historia sale de las listas oficiales de NASA y de la Agencia Espacial Europea, y de artículos de científicos. Cada ficha tiene un botón "Fuente" para que lo compruebes.',
              'Everything this story tells comes from the official lists of NASA and the European Space Agency, and from articles by scientists. Every card has a "Source" button so you can check it yourself.',
            )}
          </p>
          <ul>
            <li><a href={ref(2).url} target="_blank" rel="noreferrer">{tr('La lista de todo lo que hay en la Luna (NASA NSSDCA)', 'The list of everything on the Moon (NASA NSSDCA)')}</a></li>
            <li><a href={ref(37).url} target="_blank" rel="noreferrer">{tr('Cuánta basura hay en Marte (Cagri Kilic, 2022)', 'How much trash is on Mars (Cagri Kilic, 2022)')}</a></li>
            <li><a href={ref(5).url} target="_blank" rel="noreferrer">{tr('Cuántos objetos dan vueltas a la Tierra (ESA)', 'How many objects circle Earth (ESA)')}</a></li>
            <li><a href={ref(29).url} target="_blank" rel="noreferrer">{tr('Las 96 bolsas de los astronautas (NASA)', "The astronauts' 96 bags (NASA)")}</a></li>
            <li><a href={ref(11).url} target="_blank" rel="noreferrer">{tr('Los espejos que siguen funcionando (NASA ILRS)', 'The mirrors that still work (NASA ILRS)')}</a></li>
          </ul>
          <p><small>{tr(`La lista completa, con ${total} fuentes, está en el modo para organizaciones.`, `The full list, with ${total} sources, is in the mode for organizations.`)}</small></p>
        </div>
      </div>
    );
  }

  return (
    <div className="escena-scroll" tabIndex={0} role="region" aria-label={tr('Referencias', 'References')}>
      <div className="contenido">
        <div className="cabecera-escena"><div className="acto">{tr('Anexo', 'Annex')}</div><h1>{tr('Referencias', 'References')} ({total})</h1><p className="mini">{t(referencias.nota)}</p></div>
        <div className="controles-mapa" style={{ marginBottom: 14 }}>
          <input type="search" aria-label={tr('Buscar en las referencias', 'Search the references')} placeholder={tr('Buscar autor, título, grupo…', 'Search author, title, group…')} value={q} onChange={(e) => setQ(e.target.value)} />
          <label><input type="checkbox" checked={soloPrimarias} onChange={(e) => setSoloPrimarias(e.target.checked)} /> {tr('Solo fuentes primarias', 'Primary sources only')}</label>
          <span className="mini" aria-live="polite">{lista.length} {tr('resultados', 'results')}</span>
        </div>
        {referencias.grupos.map((g) => {
          const items = lista.filter((r) => r.grupo === g);
          if (!items.length) return null;
          return (
            <section key={g} style={{ marginBottom: 22 }}>
              <h2>{t(g)}</h2>
              <ol start={items[0].id} style={{ paddingLeft: 28 }}>
                {items.map((r) => (
                  <li key={r.id} value={r.id} style={{ marginBottom: 8 }}>
                    {r.autor}{r.anio ? ` (${r.anio})` : ''}. <em>{t(r.titulo)}</em>{r.publicacion ? `. ${t(r.publicacion)}` : ''}.{' '}
                    <a href={r.url} target="_blank" rel="noreferrer">{new URL(r.url).hostname}</a>
                    {r.urls_extra?.map((u) => <Fragment key={u}> · <a href={u} target="_blank" rel="noreferrer">{new URL(u).hostname}</a></Fragment>)}
                    {r.nota && <span className="mini"> — {t(r.nota)}</span>}
                    {!r.primaria && <span className="chip gris" style={{ marginLeft: 6 }}>{tr('prensa / secundaria', 'press / secondary')}</span>}
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
