// Capítulo 3 · Espacio profundo: sistema solar animado (Sol al centro) con las 5 sondas y la basura en órbita solar,
// más la línea de tiempo y las fichas. "Perdidos, pero no olvidados".
import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { OBJETOS, porId } from '../data/objetos';
import Escena3D from '../three/Escena3D';
import SistemaSolar from '../three/SistemaSolar';
import Ficha from '../ui/Ficha';
import Narracion from '../ui/Narracion';
import { Refs } from '../ui/Referencias';
import { PROFUNDO_PASOS } from '../data/contenido';
import { BASURA_SOLAR, SONDAS } from '../data/sistema_solar';
import { fecha, num } from '../lib/formato';
import { t, tr } from '../i18n';

const pasos = () => [
  ...PROFUNDO_PASOS,
  {
    titulo: tr('El Sol en el centro', 'The Sun at the centre'),
    ninos: tr('Mira el sistema solar desde arriba. Los puntos dorados son las cinco naves. Las dos Pioneer ya salieron y siguen alejándose.', 'Look at the solar system from above. The golden dots are the five spacecraft. The two Pioneers have already left and keep moving away.'),
    org: tr('Distancias comprimidas (r = 2·a^0,45) para que quepan Mercurio y Neptuno. Posiciones de las sondas esquemáticas; para la versión final se interpolan efemérides de JPL Horizons (anexo técnico, §9).', 'Compressed distances (r = 2·a^0.45) so that Mercury and Neptune both fit. Probe positions are schematic; the final version would interpolate JPL Horizons ephemerides (technical annex, §9).'),
    refs: [44, 45],
  },
  {
    titulo: tr('Basura también alrededor del Sol', 'Debris around the Sun too'),
    ninos: tr('Los cohetes grises que ves girando alrededor del Sol son etapas que se quedaron allá después de llevar astronautas a la Luna. Una volvió a visitarnos en 2002.', 'The grey rockets you see circling the Sun are stages that stayed out there after taking astronauts to the Moon. One came back to visit us in 2002.'),
    org: tr('Etapas S-IVB de Apollo 8, 10, 11 y 12 en órbita heliocéntrica (la de Apollo 12 fue redescubierta como J002E3 en 2002) y la etapa superior del Falcon Heavy de 2018. Órbitas esquemáticas.', 'S-IVB stages of Apollo 8, 10, 11 and 12 in heliocentric orbit (the Apollo 12 one was rediscovered as J002E3 in 2002) and the 2018 Falcon Heavy upper stage. Schematic orbits.'),
    refs: [2],
  },
];

export default function Profundo() {
  const { objetoSeleccionado, seleccionar, modo } = useAppStore();
  const [velocidad, setVelocidad] = useState(0.15);
  const [etiquetas, setEtiquetas] = useState(true);
  const [cuerpoSel, setCuerpoSel] = useState(null);
  const PASOS = useMemo(pasos, []);
  const lista = useMemo(() => OBJETOS.filter((o) => o.cuerpo === 'espacio_profundo').sort((a, b) => (a.fecha || '').localeCompare(b.fecha || '')), []);
  const sel = objetoSeleccionado ? porId(objetoSeleccionado) : null;

  const elegir = (o) => {
    if (o.tipo === 'sonda') { seleccionar(o.id); setCuerpoSel(null); }
    else { seleccionar(null); setCuerpoSel(o); }
  };

  return (
    <div className="escena">
      <Escena3D camara={[0, 7.5, 9]} minDist={2} maxDist={30} onFondoClick={() => { seleccionar(null); setCuerpoSel(null); }}>
        <SistemaSolar modo="profundo" anios={velocidad} onSelect={elegir} mostrarEtiquetas={etiquetas} />
      </Escena3D>
      <div className="capa izq">
        <Narracion pasos={PASOS} alFinal={() => seleccionar(lista[0]?.id)} />
        <div className="panel tenue">
          <div className="controles-mapa">
            <label>{tr('Velocidad', 'Speed')}
              <select value={velocidad} onChange={(e) => setVelocidad(+e.target.value)}>
                <option value={0}>{tr('Pausa', 'Pause')}</option><option value={0.05}>{tr('1 mes/s', '1 month/s')}</option><option value={0.15}>{tr('2 meses/s', '2 months/s')}</option><option value={1}>{tr('1 año/s', '1 year/s')}</option>
              </select>
            </label>
            <label><input type="checkbox" checked={etiquetas} onChange={(e) => setEtiquetas(e.target.checked)} /> {tr('Nombres', 'Names')}</label>
          </div>
          <div className="bandeja" style={{ marginTop: 8 }}>
            {lista.map((o) => <button key={o.id} style={{ borderColor: 'var(--oro)', color: 'var(--oro)' }} onClick={() => { seleccionar(o.id); setCuerpoSel(null); }}>{o.nombre}</button>)}
          </div>
          <small>{tr('Sondas en dorado · etapas abandonadas en gris · órbitas a escala comprimida', 'Probes in gold · abandoned stages in grey · orbits on a compressed scale')}</small>
        </div>
      </div>
      {sel && (
        <div className="capa der">
          <Ficha objeto={sel} onCerrar={() => seleccionar(null)} onOtra={() => seleccionar(lista[(lista.findIndex((o) => o.id === sel.id) + 1) % lista.length].id)} />
          <div className="panel tenue">
            <small>{fecha(sel.fecha)} → {fecha(sel.fecha_fin)} · {t(SONDAS.find((s) => s.id === sel.id)?.nota)}</small>
          </div>
        </div>
      )}
      {cuerpoSel && !sel && (
        <div className="capa der">
          <div className="panel ficha" aria-live="polite">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h2>{t(cuerpoSel.nombre)}</h2><button className="btn chico" aria-label={tr('Cerrar', 'Close')} onClick={() => setCuerpoSel(null)}>✕</button></div>
            {cuerpoSel.tipo === 'planeta' ? (
              <dl>
                <dt>{tr('Distancia media al Sol', 'Mean distance from the Sun')}</dt><dd>{num(cuerpoSel.a)} {tr('UA', 'AU')}</dd>
                <dt>{tr('Periodo orbital', 'Orbital period')}</dt><dd>{num(cuerpoSel.periodo)} {tr('años', 'years')}</dd>
                {cuerpoSel.id === 'ceres' && <><dt>{tr('Sonda', 'Probe')}</dt><dd>{tr('Dawn orbita Ceres desde 2015 y seguirá allí décadas.', 'Dawn has orbited Ceres since 2015 and will stay there for decades.')}</dd></>}
                {cuerpoSel.id === 'tierra' && <><dt>{tr('Compañía', 'Company')}</dt><dd>{tr('Kepler la sigue en una órbita casi igual, cada vez más lejos.', 'Kepler trails it in an almost identical orbit, drifting further away.')}</dd></>}
              </dl>
            ) : (
              <>
                <div className="meta">{tr('Basura en órbita solar', 'Debris in solar orbit')} · {cuerpoSel.anio}</div>
                <p className={modo === 'ninos' ? 'cuento' : ''}>{t(cuerpoSel.nota)}</p>
                <dl><dt>{tr('Órbita', 'Orbit')}</dt><dd>a ≈ {num(cuerpoSel.a)} {tr('UA', 'AU')}, e ≈ {num(cuerpoSel.e)} ({tr('esquemática', 'schematic')})</dd></dl>
                {modo === 'org' && cuerpoSel.refs?.length ? <small>{tr('Referencias:', 'References:')} <Refs ids={cuerpoSel.refs} /></small> : null}
              </>
            )}
          </div>
        </div>
      )}
      {modo === 'org' && !sel && !cuerpoSel && (
        <div className="capa der">
          <div className="panel tenue">
            <strong>{tr('Basura en órbita solar (esquemática)', 'Debris in solar orbit (schematic)')}</strong>
            <table className="tabla" style={{ fontSize: '0.82rem' }}><tbody>{BASURA_SOLAR.map((b) => <tr key={b.id}><td>{b.anio}</td><td>{t(b.nombre)}</td><td>{b.a ? `${num(b.a)} ${tr('UA', 'AU')}` : '—'}</td></tr>)}</tbody></table>
          </div>
        </div>
      )}
    </div>
  );
}
