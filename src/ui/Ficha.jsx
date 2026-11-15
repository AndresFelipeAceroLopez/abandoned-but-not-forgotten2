// Ficha de un objeto: mismos datos en los dos modos, cambia cómo se explican (texto.ninos / texto.org).
// Incluye la ilustración del objeto (src/visuales) y los campos aportados por el equipo (historia, legado, equipo dejado…).
import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Refs } from './Referencias';
import { fecha, coords, num, comparacionMasa } from '../lib/formato';
import { PREGUNTAS_GENERALES } from '../data/contenido';
import PapelVolteo from '../rive/PapelVolteo';
import { IlustracionObjeto } from '../visuales';

const TIPO_TXT = { aterrizaje: 'Aterrizaje', impacto: 'Impacto a propósito', estrellado: 'Se estrelló', orbita: 'Quedó en órbita', trayectoria: 'Sigue viajando', en_orbita_de: 'En órbita de otro cuerpo' };

export default function Ficha({ objeto, onCerrar, onOtra }) {
  const modo = useAppStore((s) => s.modo);
  const [volteado, setVolteado] = useState(false);
  useEffect(() => { setVolteado(false); const t = setTimeout(() => setVolteado(true), 50); return () => clearTimeout(t); }, [objeto?.id]);
  if (!objeto) return null;
  const o = objeto;
  const ninos = modo === 'ninos';
  const po = o.parametros_orbitales;

  return (
    <div className="panel ficha">
      <PapelVolteo volteado={volteado}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <h2>{o.nombre}</h2>
          <button className="btn chico" onClick={onCerrar} aria-label="Cerrar">✕</button>
        </div>
        <div className="meta">{o.mision} · {o.agencia || o.pais} · {fecha(o.fecha)}</div>
        <div className="ficha-visual"><IlustracionObjeto objeto={o} size={150} /></div>
        <div className="insignias">
          <span className="chip">{TIPO_TXT[o.tipo] || o.tipo}</span>
          {o.activo && <span className="chip oro">● Sigue funcionando</span>}
          {o.patrimonio && !o.activo && <span className="chip oro">Patrimonio</span>}
          {o.verificado_lroc && <span className="chip azul">Visto desde órbita (LRO)</span>}
          {o.paradero_desconocido && <span className="chip gris">Paradero desconocido</span>}
          {o.radiactivo && <span className="chip rojo">⚛ Material radiactivo</span>}
          {o.a_proposito && <span className="chip verde">Estrellado a propósito para hacer ciencia</span>}
        </div>

        {ninos ? (
          <>
            <p className="cuento">{o.texto?.ninos}</p>
            {o.historia && <p>{o.historia}</p>}
            <dl>
              <dt>¿Dónde está?</dt><dd>{o.donde_esta || o.ubicacion || (o.lat === null ? 'Nadie sabe exactamente dónde cayó.' : o.cuerpo === 'luna' ? 'En la Luna' : 'En Marte')}</dd>
              {o.equipo_dejado && <><dt>¿Qué quedó?</dt><dd>{o.equipo_dejado}</dd></>}
              {o.masa_kg ? <><dt>¿Cuánto pesa?</dt><dd>{num(Math.round(o.masa_kg), 0)} kg, {comparacionMasa(o.masa_kg)}</dd></> : null}
              {(o.legado_cientifico || o.logro) && <><dt>¿Qué logró?</dt><dd>{o.legado_cientifico || o.logro}</dd></>}
              {o.casi_fallo && <><dt>¿Qué casi sale mal?</dt><dd>{o.casi_fallo}</dd></>}
              {o.leccion && <><dt>¿Qué aprendimos?</dt><dd>{o.leccion}</dd></>}
              {o.por_que_termino && <><dt>¿Por qué terminó?</dt><dd>{o.por_que_termino}</dd></>}
            </dl>
          </>
        ) : (
          <>
            <p>{o.texto?.org}</p>
            {o.historia && <p className="mini">{o.historia}</p>}
            <dl>
              <dt>Objeto</dt><dd>{o.objeto}</dd>
              {o.estado && <><dt>Estado</dt><dd>{o.estado}</dd></>}
              <dt>Coordenadas</dt><dd>{o.ubicacion || coords(o.lat, o.lon)}{o.lat !== null && o.cuerpo === 'luna' && ' (DE421)'}</dd>
              {o.codigos_nssdca?.length ? <><dt>Códigos NSSDCA</dt><dd>{o.codigos_nssdca.join(', ')}</dd></> : null}
              {o.fecha_lanzamiento && <><dt>Lanzamiento</dt><dd>{fecha(o.fecha_lanzamiento)}</dd></>}
              {o.masa_kg ? <><dt>Masa</dt><dd>{num(o.masa_kg)} kg</dd></> : null}
              {po && (po.periapsis_km || po.apoapsis_km) ? <><dt>Órbita previa</dt><dd>{num(po.periapsis_km)} × {num(po.apoapsis_km)} km, i = {num(po.inclination_deg)}°{po.period_minutes ? `, T = ${num(po.period_minutes)} min` : ''}</dd></> : null}
              {o.radiactivo_detalle && <><dt>Fuente radiactiva</dt><dd>{o.radiactivo_detalle}</dd></>}
              {o.equipo_dejado && <><dt>Equipo dejado</dt><dd>{o.equipo_dejado}</dd></>}
              {o.casi_fallo && <><dt>Casi falla</dt><dd>{o.casi_fallo}</dd></>}
              {o.leccion && <><dt>Lección</dt><dd>{o.leccion}</dd></>}
              {(o.legado_cientifico || o.logro) && <><dt>Logro</dt><dd>{o.legado_cientifico || o.logro}</dd></>}
              {o.por_que_termino && <><dt>Por qué terminó</dt><dd>{o.por_que_termino}</dd></>}
              {o.nota && <><dt>Nota</dt><dd>{o.nota}</dd></>}
              <dt>Verificación</dt><dd>{o.verificado_fuente ? 'Fila cotejada con la fuente primaria' : 'Pendiente de cotejar con la fuente primaria'}{o.fuente_equipo ? ' · datos del equipo integrados' : ''}</dd>
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
          {o.fuente_url && <a className="btn chico" href={o.fuente_url} target="_blank" rel="noreferrer">Fuente</a>}
          {!ninos && o.fuente_ids?.length ? <span className="mini">Referencias: <Refs ids={o.fuente_ids} /></span> : null}
          {ninos ? <button className="btn chico primario" onClick={onOtra}>Explora otra pieza</button> : null}
        </div>
      </PapelVolteo>
    </div>
  );
}
