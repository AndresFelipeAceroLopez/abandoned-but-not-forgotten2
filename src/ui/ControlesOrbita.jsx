// Controles del mapa 4D: año (compartido con el dashboard), velocidad, color y filtros. Leyenda por modo de color.
import { useAppStore } from '../store/useAppStore';
import { COLORES_PAIS, COLORES_TIPO_ORBITA, COLORES_NUBE } from '../three/NubeOrbital';

const TIPOS = { P: 'Carga útil (satélites)', R: 'Etapas de cohete', D: 'Fragmentos', U: 'Sin identificar' };
const NUBES = { FY1C: 'Fengyun-1C (2007)', K1408: 'Kosmos 1408 (2021)', IR33: 'Iridium 33 (2009)', K2251: 'Kosmos 2251 (2009)', USA193: 'USA-193 (2008)', MSR: 'Microsat-R (2019)' };

export default function ControlesOrbita({ mostrarColor = true, mostrarFiltros = true }) {
  const { anio, setAnio, velocidad, setVelocidad, colorPor, setColorPor, filtros, setFiltro, orbita, modo } = useAppStore();
  const leyenda =
    colorPor === 'pais' ? Object.entries(COLORES_PAIS).map(([k, c]) => [k, c]).concat([['Otros', '#c3c2b7']])
    : colorPor === 'nube' ? Object.entries(COLORES_NUBE).map(([k, c]) => [NUBES[k], c]).concat([['Resto', '#2e2e2c']])
    : colorPor === 'identificado' ? [['Identificado', '#3987e5'], ['Sin identificar', '#898781']]
    : colorPor === 'union' ? [['Humanidad', '#f0efec']]
    : Object.entries(COLORES_TIPO_ORBITA).map(([k, c]) => [TIPOS[k], c]);

  return (
    <div className="panel tenue">
      <div className="controles-mapa">
        <span className="anio-grande">{anio}</span>
        <input type="range" min={1957} max={2026} value={anio} onChange={(e) => setAnio(+e.target.value)} aria-label="Año" />
        <label>Velocidad
          <select value={velocidad} onChange={(e) => setVelocidad(+e.target.value)}>
            <option value={0}>Pausa</option>
            <option value={5}>5 min/s</option>
            <option value={60}>1 h/s</option>
            <option value={360}>6 h/s</option>
          </select>
        </label>
        {mostrarColor && (
          <label>Color por
            <select value={colorPor} onChange={(e) => setColorPor(e.target.value)}>
              <option value="tipo">Tipo de objeto</option>
              <option value="pais">País</option>
              <option value="identificado">Identificado / sin nombre</option>
              <option value="nube">Nubes de pruebas y choques</option>
              <option value="union">Un solo color</option>
            </select>
          </label>
        )}
        {mostrarFiltros && modo === 'org' && (
          <>
            <label>Tipo
              <select value={filtros.tipo} onChange={(e) => setFiltro('tipo', e.target.value)}>
                <option value="todos">Todos</option>
                {Object.entries(TIPOS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label>País
              <select value={filtros.pais} onChange={(e) => setFiltro('pais', e.target.value)}>
                <option value="todos">Todos</option>
                {Object.keys(COLORES_PAIS).map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </label>
            {colorPor === 'nube' && (
              <label>Nube
                <select value={filtros.nube || ''} onChange={(e) => setFiltro('nube', e.target.value || null)}>
                  <option value="">Todas</option>
                  {Object.entries(NUBES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </label>
            )}
            <input type="text" placeholder="Nombre (p. ej. VANGUARD)" value={filtros.busqueda} onChange={(e) => setFiltro('busqueda', e.target.value)} />
          </>
        )}
      </div>
      <div className="leyenda" style={{ marginTop: 8 }}>
        {leyenda.map(([k, c]) => <span key={k}><i style={{ background: c }} />{k}</span>)}
        <span className="mini">· Tamaños aumentados para que se vean · {orbita?.simulado ? 'nube simulada (falta orbita.json)' : `catálogo Space-Track, ${orbita ? orbita.total.toLocaleString('es') : '…'} objetos`}</span>
      </div>
    </div>
  );
}
