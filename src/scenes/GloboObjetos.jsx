// Globo (Luna o Marte) con marcadores por lat/lon, filtros, bandeja de "perdidos", ficha y buscador.
import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { OBJETOS, porId } from '../data/objetos';
import Escena3D from '../three/Escena3D';
import Globo from '../three/Globo';
import PlanetaGLB from '../three/PlanetaGLB';
import MarcadoresPrueba from '../three/MarcadoresPrueba';
import Marcadores from '../three/Marcadores';
import ModeloObjeto from '../spline/ModeloObjeto';
import Narracion from '../ui/Narracion';
import Ficha from '../ui/Ficha';
import Buscador from '../ui/Buscador';
import Quiz from '../ui/Quiz';
import { latLonAVec3 } from '../lib/geo';
import { num } from '../lib/formato';
import { t, tr } from '../i18n';

export { OBJETOS, porId };

export default function GloboObjetos({ cuerpo, pasos, panelExtra, colorPorInicial = 'tipo' }) {
  const { modo, objetoSeleccionado, seleccionar, filtros, setFiltro } = useAppStore();
  const [colorPor, setColorPor] = useState(colorPorInicial);
  const [verQuiz, setVerQuiz] = useState(false);
  const [paso, setPaso] = useState(0);

  const todos = useMemo(() => OBJETOS.filter((o) => o.cuerpo === cuerpo), [cuerpo]);
  const programas = useMemo(() => [...new Set(todos.map((o) => o.programa).filter(Boolean))].sort(), [todos]);
  const visibles = useMemo(
    () => todos.filter((o) => (filtros.programa === 'todos' || o.programa === filtros.programa) && (!filtros.soloLRO || o.verificado_lroc)),
    [todos, filtros.programa, filtros.soloLRO],
  );
  const enGlobo = visibles.filter((o) => o.lat !== null && o.lon !== null);
  const perdidos = visibles.filter((o) => o.lat === null || o.lon === null);
  const sel = objetoSeleccionado ? porId(objetoSeleccionado) : null;
  const masa = todos.reduce((s, o) => s + (o.masa_kg || 0), 0);

  // Paso 3 de la Luna ("A propósito") resalta los impactos deliberados; paso 4, el patrimonio activo.
  const colorEfectivo = cuerpo === 'luna' && paso === 3 ? 'patrimonio' : colorPor;

  const elegirOtra = () => {
    const lista = enGlobo.length ? enGlobo : visibles;
    const o = lista[Math.floor(Math.random() * lista.length)];
    if (o) seleccionar(o.id);
  };

  return (
    <div className="escena">
      <Escena3D camara={[0, 0.8, 3.2]} minDist={1.3} maxDist={6} autoRotar={!sel} onFondoClick={() => seleccionar(null)}>
        {cuerpo === 'marte' ? <PlanetaGLB cuerpo="marte" /> : <Globo cuerpo={cuerpo} />}
        <MarcadoresPrueba cuerpo={cuerpo} />
        <Marcadores objetos={enGlobo} seleccionadoId={sel?.id} onSelect={seleccionar} colorPor={colorEfectivo} />
        {sel && sel.lat !== null && <ModeloObjeto objeto={sel._es || sel} posicion={latLonAVec3(sel.lat, sel.lon, 1.03).toArray()} escala={0.04} />}
      </Escena3D>

      <div className="capa izq">
        {!verQuiz && <Narracion pasos={pasos} onPaso={setPaso} alFinal={elegirOtra} />}
        {verQuiz && <Quiz />}
        <div className="panel tenue">
          <div className="controles-mapa">
            <label>{tr('Programa', 'Programme')}
              <select value={filtros.programa} onChange={(e) => setFiltro('programa', e.target.value)}>
                <option value="todos">{tr('Todos', 'All')} ({todos.length})</option>
                {programas.map((p) => <option key={p} value={p}>{t(p)} ({todos.filter((o) => o.programa === p).length})</option>)}
              </select>
            </label>
            <label><input type="checkbox" checked={filtros.soloLRO} onChange={(e) => setFiltro('soloLRO', e.target.checked)} /> {tr('Solo vistos por LRO', 'Only seen by LRO')}</label>
            <label>{tr('Color', 'Colour')}
              <select value={colorPor} onChange={(e) => setColorPor(e.target.value)}>
                <option value="tipo">{tr('Tipo', 'Type')}</option>
                <option value="patrimonio">{tr('Patrimonio / activo', 'Heritage / active')}</option>
                <option value="radiactivo">{tr('Material radiactivo', 'Radioactive material')}</option>
              </select>
            </label>
            {modo === 'ninos' && <button className="btn chico" onClick={() => setVerQuiz(!verQuiz)}>{verQuiz ? tr('Volver a la historia', 'Back to the story') : 'Quiz'}</button>}
          </div>
          <div className="leyenda" style={{ marginTop: 8 }}>
            {colorPor === 'tipo' && <><span><i style={{ background: '#3987e5' }} />{tr('Aterrizaje', 'Landing')}</span><span><i style={{ background: '#d95926' }} />{tr('Impacto a propósito', 'Deliberate impact')}</span><span><i style={{ background: '#e66767' }} />{tr('Se estrelló', 'Crashed')}</span><span><i style={{ background: '#c98500' }} />{tr('Sigue activo', 'Still active')}</span><span>◯ {tr('Visto por LRO', 'Seen by LRO')}</span></>}
            {colorPor === 'patrimonio' && <><span><i style={{ background: '#c98500' }} />{tr('Patrimonio o activo', 'Heritage or active')}</span><span><i style={{ background: '#55554f' }} />{tr('Resto', 'Other')}</span></>}
            {colorPor === 'radiactivo' && <><span><i style={{ background: '#e66767' }} />{tr('Con fuente radiactiva', 'With a radioactive source')}</span><span><i style={{ background: '#55554f' }} />{tr('Resto', 'Other')}</span></>}
          </div>
          <div style={{ marginTop: 8 }}><Buscador objetos={todos} onElegir={seleccionar} /></div>
          <small>
            {tr(
              `${enGlobo.length} en el globo · ${perdidos.length} sin paradero · masa conocida en esta lista: ${num(Math.round(masa), 0)} kg`,
              `${enGlobo.length} on the globe · ${perdidos.length} with unknown whereabouts · known mass in this list: ${num(Math.round(masa), 0)} kg`,
            )}
          </small>
        </div>
        {perdidos.length > 0 && (
          <div className="panel tenue">
            <strong>{tr('Bandeja: paradero desconocido', 'Tray: whereabouts unknown')} ({perdidos.length})</strong>
            <p className="mini">
              {cuerpo === 'luna'
                ? tr('Quedaron en órbita sin seguimiento y cayeron en un sitio desconocido (código NSSDCA "g"). Son los papeles sin dueño.', 'They were left in orbit untracked and fell at an unknown site (NSSDCA code "g"). They are the ownerless papers.')
                : tr('Se perdió el contacto antes de aterrizar y el sitio exacto de impacto no está confirmado.', 'Contact was lost before landing and the exact impact site is not confirmed.')}
            </p>
            <div className="bandeja">{perdidos.map((o) => <button key={o.id} onClick={() => seleccionar(o.id)}>{o.nombre}</button>)}</div>
          </div>
        )}
        {panelExtra}
      </div>

      {sel && (
        <div className="capa der">
          <Ficha objeto={sel} onCerrar={() => seleccionar(null)} onOtra={elegirOtra} />
        </div>
      )}
    </div>
  );
}
