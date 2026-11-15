// Controles del mapa 4D: año (compartido con el dashboard), velocidad, color y filtros. Leyenda por modo de color.
import { useAppStore } from '../store/useAppStore';
import { COLORES_PAIS, COLORES_TIPO_ORBITA, COLORES_NUBE } from '../three/NubeOrbital';
import { num } from '../lib/formato';
import { t, tr } from '../i18n';

const tipos = () => ({ P: tr('Carga útil (satélites)', 'Payloads (satellites)'), R: tr('Etapas de cohete', 'Rocket stages'), D: tr('Fragmentos', 'Fragments'), U: tr('Sin identificar', 'Unidentified') });
const NUBES = { FY1C: 'Fengyun-1C (2007)', K1408: 'Kosmos 1408 (2021)', IR33: 'Iridium 33 (2009)', K2251: 'Kosmos 2251 (2009)', USA193: 'USA-193 (2008)', MSR: 'Microsat-R (2019)' };

export default function ControlesOrbita({ mostrarColor = true, mostrarFiltros = true }) {
  const { anio, setAnio, velocidad, setVelocidad, colorPor, setColorPor, filtros, setFiltro, orbita, modo } = useAppStore();
  const TIPOS = tipos();
  const leyenda =
    colorPor === 'pais' ? Object.entries(COLORES_PAIS).map(([k, c]) => [t(k), c]).concat([[tr('Otros', 'Other'), '#c3c2b7']])
    : colorPor === 'nube' ? Object.entries(COLORES_NUBE).map(([k, c]) => [NUBES[k], c]).concat([[tr('Resto', 'Other'), '#2e2e2c']])
    : colorPor === 'identificado' ? [[tr('Identificado', 'Identified'), '#3987e5'], [tr('Sin identificar', 'Unidentified'), '#898781']]
    : colorPor === 'union' ? [[tr('Humanidad', 'Humanity'), '#f0efec']]
    : Object.entries(COLORES_TIPO_ORBITA).map(([k, c]) => [TIPOS[k], c]);

  return (
    <div className="panel tenue">
      <div className="controles-mapa">
        <span className="anio-grande" aria-live="polite">{anio}</span>
        <input type="range" min={1957} max={2026} value={anio} onChange={(e) => setAnio(+e.target.value)} aria-label={tr('Año', 'Year')} />
        <label>{tr('Velocidad', 'Speed')}
          <select value={velocidad} onChange={(e) => setVelocidad(+e.target.value)}>
            <option value={0}>{tr('Pausa', 'Pause')}</option>
            <option value={5}>5 min/s</option>
            <option value={60}>1 h/s</option>
            <option value={360}>6 h/s</option>
          </select>
        </label>
        {mostrarColor && (
          <label>{tr('Color por', 'Colour by')}
            <select value={colorPor} onChange={(e) => setColorPor(e.target.value)}>
              <option value="tipo">{tr('Tipo de objeto', 'Object type')}</option>
              <option value="pais">{tr('País', 'Country')}</option>
              <option value="identificado">{tr('Identificado / sin identificar', 'Identified / unidentified')}</option>
              <option value="nube">{tr('Nubes de pruebas y choques', 'Clouds from tests and collisions')}</option>
              <option value="union">{tr('Un solo color', 'A single colour')}</option>
            </select>
          </label>
        )}
        {mostrarFiltros && modo === 'org' && (
          <>
            <label>{tr('Tipo', 'Type')}
              <select value={filtros.tipo} onChange={(e) => setFiltro('tipo', e.target.value)}>
                <option value="todos">{tr('Todos', 'All')}</option>
                {Object.entries(TIPOS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label>{tr('País', 'Country')}
              <select value={filtros.pais} onChange={(e) => setFiltro('pais', e.target.value)}>
                <option value="todos">{tr('Todos', 'All')}</option>
                {Object.keys(COLORES_PAIS).map((k) => <option key={k} value={k}>{t(k)}</option>)}
              </select>
            </label>
            {colorPor === 'nube' && (
              <label>{tr('Nube', 'Cloud')}
                <select value={filtros.nube || ''} onChange={(e) => setFiltro('nube', e.target.value || null)}>
                  <option value="">{tr('Todas', 'All')}</option>
                  {Object.entries(NUBES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </label>
            )}
            <input type="text" aria-label={tr('Buscar por nombre', 'Search by name')} placeholder={tr('Nombre (p. ej. VANGUARD)', 'Name (e.g. VANGUARD)')} value={filtros.busqueda} onChange={(e) => setFiltro('busqueda', e.target.value)} />
          </>
        )}
      </div>
      <div className="leyenda" style={{ marginTop: 8 }}>
        {leyenda.map(([k, c]) => <span key={k}><i style={{ background: c }} />{k}</span>)}
        <span className="mini">
          · {tr('Tamaños aumentados para que se vean', 'Sizes enlarged so they can be seen')} ·{' '}
          {orbita?.simulado
            ? tr('nube simulada (falta orbita.json)', 'simulated cloud (orbita.json is missing)')
            : tr(`catálogo Space-Track, ${orbita ? num(orbita.total, 0) : '…'} objetos`, `Space-Track catalogue, ${orbita ? num(orbita.total, 0) : '…'} objects`)}
        </span>
      </div>
    </div>
  );
}
