// Ficha de un objeto: mismos datos en los dos modos, cambia cómo se explican (texto.ninos / texto.org).
// Incluye la ilustración del objeto (src/visuales) y los campos aportados por el equipo (historia, legado, equipo dejado…).
import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Refs } from './Referencias';
import { fecha, coords, num, comparacionMasa } from '../lib/formato';
import { PREGUNTAS_GENERALES } from '../data/contenido';
import PapelVolteo from '../rive/PapelVolteo';
import { IlustracionObjeto } from '../visuales';
import { t, tr } from '../i18n';

const tipoTxt = (k) => ({
  aterrizaje: tr('Aterrizaje', 'Landing'), impacto: tr('Impacto a propósito', 'Deliberate impact'), estrellado: tr('Se estrelló', 'Crashed'),
  orbita: tr('Quedó en órbita', 'Left in orbit'), trayectoria: tr('Sigue viajando', 'Still travelling'), en_orbita_de: tr('En órbita de otro cuerpo', 'Orbiting another body'),
})[k] || k;

export default function Ficha({ objeto, onCerrar, onOtra }) {
  const modo = useAppStore((s) => s.modo);
  const [volteado, setVolteado] = useState(false);
  useEffect(() => { setVolteado(false); const tm = setTimeout(() => setVolteado(true), 50); return () => clearTimeout(tm); }, [objeto?.id]);
  if (!objeto) return null;
  const o = objeto;
  const ninos = modo === 'ninos';
  const po = o.parametros_orbitales;

  return (
    <div className="panel ficha" aria-live="polite">
      <PapelVolteo volteado={volteado}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <h2>{o.nombre}</h2>
          <button className="btn chico" onClick={onCerrar} aria-label={tr('Cerrar', 'Close')}>✕</button>
        </div>
        <div className="meta">{o.mision} · {o.agencia || t(o.pais)} · {fecha(o.fecha)}</div>
        <div className="ficha-visual"><IlustracionObjeto objeto={o} size={150} /></div>
        <div className="insignias">
          <span className="chip">{tipoTxt(o.tipo)}</span>
          {o.activo && <span className="chip oro">● {tr('Sigue funcionando', 'Still working')}</span>}
          {o.patrimonio && !o.activo && <span className="chip oro">{tr('Patrimonio', 'Heritage')}</span>}
          {o.verificado_lroc && <span className="chip azul">{tr('Visto desde órbita (LRO)', 'Seen from orbit (LRO)')}</span>}
          {o.paradero_desconocido && <span className="chip gris">{tr('Paradero desconocido', 'Whereabouts unknown')}</span>}
          {o.radiactivo && <span className="chip rojo">⚛ {tr('Material radiactivo', 'Radioactive material')}</span>}
          {o.a_proposito && <span className="chip verde">{tr('Estrellado a propósito para hacer ciencia', 'Crashed on purpose for science')}</span>}
        </div>

        {ninos ? (
          <>
            <p className="cuento">{o.texto?.ninos}</p>
            {o.historia && <p>{o.historia}</p>}
            <dl>
              <dt>{tr('¿Dónde está?', 'Where is it?')}</dt>
              <dd>{o.donde_esta || o.ubicacion || (o.lat === null ? tr('Nadie sabe exactamente dónde cayó.', 'Nobody knows exactly where it fell.') : o.cuerpo === 'luna' ? tr('En la Luna', 'On the Moon') : tr('En Marte', 'On Mars'))}</dd>
              {o.equipo_dejado && <><dt>{tr('¿Qué quedó?', 'What was left?')}</dt><dd>{o.equipo_dejado}</dd></>}
              {o.masa_kg ? <><dt>{tr('¿Cuánto pesa?', 'How much does it weigh?')}</dt><dd>{num(Math.round(o.masa_kg), 0)} kg, {comparacionMasa(o.masa_kg)}</dd></> : null}
              {(o.legado_cientifico || o.logro) && <><dt>{tr('¿Qué logró?', 'What did it achieve?')}</dt><dd>{o.legado_cientifico || o.logro}</dd></>}
              {o.casi_fallo && <><dt>{tr('¿Qué casi sale mal?', 'What almost went wrong?')}</dt><dd>{o.casi_fallo}</dd></>}
              {o.leccion && <><dt>{tr('¿Qué aprendimos?', 'What did we learn?')}</dt><dd>{o.leccion}</dd></>}
              {o.por_que_termino && <><dt>{tr('¿Por qué terminó?', 'Why did it end?')}</dt><dd>{o.por_que_termino}</dd></>}
            </dl>
          </>
        ) : (
          <>
            <p>{o.texto?.org}</p>
            {o.historia && <p className="mini">{o.historia}</p>}
            <dl>
              <dt>{tr('Objeto', 'Object')}</dt><dd>{o.objeto}</dd>
              {o.estado && <><dt>{tr('Estado', 'Status')}</dt><dd>{o.estado}</dd></>}
              <dt>{tr('Coordenadas', 'Coordinates')}</dt><dd>{o.ubicacion || coords(o.lat, o.lon)}{o.lat !== null && o.cuerpo === 'luna' && ' (DE421)'}</dd>
              {o.codigos_nssdca?.length ? <><dt>{tr('Códigos NSSDCA', 'NSSDCA codes')}</dt><dd>{o.codigos_nssdca.join(', ')}</dd></> : null}
              {o.fecha_lanzamiento && <><dt>{tr('Lanzamiento', 'Launch')}</dt><dd>{fecha(o.fecha_lanzamiento)}</dd></>}
              {o.masa_kg ? <><dt>{tr('Masa', 'Mass')}</dt><dd>{num(o.masa_kg)} kg</dd></> : null}
              {po && (po.periapsis_km || po.apoapsis_km) ? <><dt>{tr('Órbita previa', 'Previous orbit')}</dt><dd>{num(po.periapsis_km)} × {num(po.apoapsis_km)} km, i = {num(po.inclination_deg)}°{po.period_minutes ? `, T = ${num(po.period_minutes)} min` : ''}</dd></> : null}
              {o.radiactivo_detalle && <><dt>{tr('Fuente radiactiva', 'Radioactive source')}</dt><dd>{o.radiactivo_detalle}</dd></>}
              {o.equipo_dejado && <><dt>{tr('Equipo dejado', 'Equipment left')}</dt><dd>{o.equipo_dejado}</dd></>}
              {o.casi_fallo && <><dt>{tr('Casi falla', 'Near miss')}</dt><dd>{o.casi_fallo}</dd></>}
              {o.leccion && <><dt>{tr('Lección', 'Lesson')}</dt><dd>{o.leccion}</dd></>}
              {(o.legado_cientifico || o.logro) && <><dt>{tr('Logro', 'Achievement')}</dt><dd>{o.legado_cientifico || o.logro}</dd></>}
              {o.por_que_termino && <><dt>{tr('Por qué terminó', 'Why it ended')}</dt><dd>{o.por_que_termino}</dd></>}
              {o.nota && <><dt>{tr('Nota', 'Note')}</dt><dd>{o.nota}</dd></>}
              <dt>{tr('Verificación', 'Verification')}</dt>
              <dd>
                {o.verificado_fuente ? tr('Fila cotejada con la fuente primaria', 'Row checked against the primary source') : tr('Pendiente de cotejar con la fuente primaria', 'Pending check against the primary source')}
                {o.fuente_equipo ? tr(' · datos del equipo integrados', ' · team data merged in') : ''}
              </dd>
            </dl>
          </>
        )}

        <div className="faq">
          {[...(o.faq || []), ...PREGUNTAS_GENERALES.slice(0, 1)].map((f, i) => (
            <details key={i}>
              <summary>{f.pregunta}</summary>
              <p>{ninos ? f.ninos : f.org}</p>
            </details>
          ))}
        </div>

        <div className="pie">
          {o.fuente_url && <a className="btn chico" href={o.fuente_url} target="_blank" rel="noreferrer">{tr('Fuente', 'Source')}</a>}
          {!ninos && o.fuente_ids?.length ? <span className="mini">{tr('Referencias:', 'References:')} <Refs ids={o.fuente_ids} /></span> : null}
          {ninos ? <button className="btn chico primario" onClick={onOtra}>{tr('Explora otra pieza', 'Explore another piece')}</button> : null}
        </div>
      </PapelVolteo>
    </div>
  );
}
