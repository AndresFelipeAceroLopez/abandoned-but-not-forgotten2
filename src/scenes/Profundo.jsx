// Capítulo 3 · Espacio profundo: sistema solar animado (Sol al centro) con las 5 sondas y la basura en órbita solar,
// más la línea de tiempo y las fichas. "Perdidos, pero no olvidados".
import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { OBJETOS, porId } from './GloboObjetos';
import Escena3D from '../three/Escena3D';
import SistemaSolar from '../three/SistemaSolar';
import Ficha from '../ui/Ficha';
import Narracion from '../ui/Narracion';
import { Refs } from '../ui/Referencias';
import { PROFUNDO_PASOS } from '../data/contenido';
import { BASURA_SOLAR, SONDAS } from '../data/sistema_solar';
import { fecha } from '../lib/formato';

const PASOS = [
  ...PROFUNDO_PASOS,
  { titulo: 'El Sol en el centro', ninos: 'Mira el sistema solar desde arriba. Los puntos dorados son las cinco naves. Las dos Pioneer ya salieron y siguen alejándose.', org: 'Distancias comprimidas (r = 2·a^0,45) para que quepan Mercurio y Neptuno. Posiciones de las sondas esquemáticas; para la versión final se interpolan efemérides de JPL Horizons (anexo técnico, §9).', refs: [44, 45] },
  { titulo: 'Basura también alrededor del Sol', ninos: 'Los cohetes grises que ves girando alrededor del Sol son etapas que se quedaron allá después de llevar astronautas a la Luna. Una volvió a visitarnos en 2002.', org: 'Etapas S-IVB de Apollo 8, 10, 11 y 12 en órbita heliocéntrica (la de Apollo 12 fue redescubierta como J002E3 en 2002) y la etapa superior del Falcon Heavy de 2018. Órbitas esquemáticas.', refs: [2] },
];

export default function Profundo() {
  const { objetoSeleccionado, seleccionar, modo } = useAppStore();
  const [velocidad, setVelocidad] = useState(0.15);
  const [etiquetas, setEtiquetas] = useState(true);
  const [cuerpoSel, setCuerpoSel] = useState(null);
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
            <label>Velocidad
              <select value={velocidad} onChange={(e) => setVelocidad(+e.target.value)}>
                <option value={0}>Pausa</option><option value={0.05}>1 mes/s</option><option value={0.15}>2 meses/s</option><option value={1}>1 año/s</option>
              </select>
            </label>
            <label><input type="checkbox" checked={etiquetas} onChange={(e) => setEtiquetas(e.target.checked)} /> Nombres</label>
          </div>
          <div className="bandeja" style={{ marginTop: 8 }}>
            {lista.map((o) => <button key={o.id} style={{ borderColor: 'var(--oro)', color: 'var(--oro)' }} onClick={() => { seleccionar(o.id); setCuerpoSel(null); }}>{o.nombre}</button>)}
          </div>
          <small>Sondas en dorado · etapas abandonadas en gris · órbitas a escala comprimida</small>
        </div>
      </div>
      {sel && (
        <div className="capa der">
          <Ficha objeto={sel} onCerrar={() => seleccionar(null)} onOtra={() => seleccionar(lista[(lista.findIndex((o) => o.id === sel.id) + 1) % lista.length].id)} />
          <div className="panel tenue">
            <small>{fecha(sel.fecha)} → {fecha(sel.fecha_fin)} · {SONDAS.find((s) => s.id === sel.id)?.nota}</small>
          </div>
        </div>
      )}
      {cuerpoSel && !sel && (
        <div className="capa der">
          <div className="panel ficha">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h2>{cuerpoSel.nombre}</h2><button className="btn chico" onClick={() => setCuerpoSel(null)}>✕</button></div>
            {cuerpoSel.tipo === 'planeta' ? (
              <dl>
                <dt>Distancia media al Sol</dt><dd>{cuerpoSel.a} UA</dd>
                <dt>Periodo orbital</dt><dd>{cuerpoSel.periodo} años</dd>
                {cuerpoSel.id === 'ceres' && <><dt>Sonda</dt><dd>Dawn orbita Ceres desde 2015 y seguirá allí décadas.</dd></>}
                {cuerpoSel.id === 'tierra' && <><dt>Compañía</dt><dd>Kepler la sigue en una órbita casi igual, cada vez más lejos.</dd></>}
              </dl>
            ) : (
              <>
                <div className="meta">Basura en órbita solar · {cuerpoSel.anio}</div>
                <p className={modo === 'ninos' ? 'cuento' : ''}>{cuerpoSel.nota}</p>
                <dl><dt>Órbita</dt><dd>a ≈ {cuerpoSel.a} UA, e ≈ {cuerpoSel.e} (esquemática)</dd></dl>
                {modo === 'org' && cuerpoSel.refs?.length ? <small>Referencias: <Refs ids={cuerpoSel.refs} /></small> : null}
              </>
            )}
          </div>
        </div>
      )}
      {modo === 'org' && !sel && !cuerpoSel && (
        <div className="capa der">
          <div className="panel tenue">
            <strong>Basura en órbita solar (esquemática)</strong>
            <table className="tabla" style={{ fontSize: '0.82rem' }}><tbody>{BASURA_SOLAR.map((b) => <tr key={b.id}><td>{b.anio}</td><td>{b.nombre}</td><td>{b.a ? `${b.a} UA` : '—'}</td></tr>)}</tbody></table>
          </div>
        </div>
      )}
    </div>
  );
}
