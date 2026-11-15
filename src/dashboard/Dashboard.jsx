// Dashboard: lee los mismos JSON que la simulación. El año es compartido con el mapa 4D (store).
import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import dash from '../data/dashboard.json';
import orbita from '../data/dashboard_orbita.json';
import satelites from '../data/dashboard_satelites.json';
import { OBJETOS, META } from '../data/objetos';
import referencias from '../data/referencias.json';
import { Barras, Dona, Area } from './Graficos';
import { Refs, ref } from '../ui/Referencias';
import { num, fecha } from '../lib/formato';
import { MiniPlaneta } from '../visuales';
import { t, tr } from '../i18n';

function descargar(nombre, contenido, tipo) {
  const blob = new Blob([contenido], { type: tipo });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = nombre;
  a.click();
  URL.revokeObjectURL(a.href);
}
const CSV_CAMPOS = ['id', 'cuerpo', 'nombre', 'mision', 'programa', 'pais', 'agencia', 'objeto', 'tipo', 'fecha', 'lat', 'lon', 'paradero_desconocido', 'verificado_lroc', 'masa_kg', 'activo', 'patrimonio', 'radiactivo', 'a_proposito', 'estado', 'fuente_url'];
const aCSV = (objs) => [CSV_CAMPOS.join(','), ...objs.map((o) => CSV_CAMPOS.map((c) => { const v = o[c]; return v === null || v === undefined ? '' : `"${String(v).replace(/"/g, '""')}"`; }).join(','))].join('\n');
const sinOriginal = (objs) => objs.map(({ _es, ...o }) => o);

// Recurso visual por indicador (mini planeta o icono).
const ICONO = {
  rastreados: 'tierra', mayores10cm: 'satelite', '1a10cm': 'papel', menos1cm: 'papel', masa_orbita: 'cohete', fragmentaciones: 'cohete',
  objetos_luna: 'luna', masa_luna: 'luna', bolsas: 'bolsa', objetos_marte: 'marte', masa_marte: 'marte', esporas: 'marte',
  profundo: 'saturno', reentradas: 'tierra', radiactivos: 'atomo', sin_identificar: 'papel', patrimonio: 'luna', asat: 'satelite', maniobras_iss: 'estacion', carta: 'bandera',
};

function Tile({ ind, modo, onIr }) {
  const r = ind.refs?.[0] ? ref(ind.refs[0]) : null;
  const valor = ind.unidad === '%' ? tr(`${num(ind.valor)} %`, `${num(ind.valor)}%`) : `${ind.aprox ? '~' : ''}${num(ind.valor, 0)}`;
  return (
    <div className={`tile ${modo}`} role="button" tabIndex={0} onClick={() => onIr(ind.escena)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onIr(ind.escena); } }} style={{ cursor: 'pointer' }}>
      <div className="tile-icono"><MiniPlaneta tipo={ICONO[ind.id] || 'satelite'} size={modo === 'ninos' ? 64 : 48} /></div>
      <div>
        <div className="valor">{valor}</div>
        <div className="nombre">{modo === 'ninos' ? t(ind.ninos) : `${t(ind.nombre)}${ind.unidad !== '%' ? ` (${t(ind.unidad)})` : ''}`}</div>
        <div className="pie">{modo === 'ninos' ? t(ind.comparacion) : <>{fecha(ind.fecha)} · {r ? r.autor : ''} <Refs ids={ind.refs} /></>}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { modo, anio, setAnio, setEscena, seleccionar, setFiltro, setColorPor } = useAppStore();
  const objetos = OBJETOS;
  const indicadores = modo === 'ninos' ? dash.indicadores.filter((i) => dash.ninos_destacados.includes(i.id)) : dash.indicadores;

  const porDecada = useMemo(() => {
    const m = new Map();
    for (const o of objetos) { if (o.cuerpo === 'espacio_profundo' || !o.fecha) continue; const d = `${o.fecha.slice(0, 3)}0s`; const k = `${d} ${o.cuerpo === 'luna' ? tr('Luna', 'Moon') : tr('Marte', 'Mars')}`; m.set(k, (m.get(k) || 0) + 1); }
    return [...m.entries()].sort().map(([clave, n]) => ({ clave, n }));
  }, [objetos]);
  const porCategoria = useMemo(() => [
    { clave: tr('Patrimonio o en uso', 'Heritage or in use'), n: objetos.filter((o) => o.activo || o.patrimonio).length },
    { clave: tr('Estrellado a propósito (ciencia)', 'Crashed on purpose (science)'), n: objetos.filter((o) => o.a_proposito).length },
    { clave: tr('Con material radiactivo', 'With radioactive material'), n: objetos.filter((o) => o.radiactivo).length },
    { clave: tr('Paradero desconocido', 'Whereabouts unknown'), n: objetos.filter((o) => o.paradero_desconocido).length },
  ], [objetos]);
  const porPaisLuna = useMemo(() => {
    const m = new Map();
    for (const o of objetos) m.set(o.pais, (m.get(o.pais) || 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([clave, n]) => ({ clave, n }));
  }, [objetos]);
  const porCuerpo = useMemo(() => [
    { clave: tr('Luna', 'Moon'), n: objetos.filter((o) => o.cuerpo === 'luna').length },
    { clave: tr('Marte', 'Mars'), n: objetos.filter((o) => o.cuerpo === 'marte').length },
    { clave: tr('Espacio profundo', 'Deep space'), n: objetos.filter((o) => o.cuerpo === 'espacio_profundo').length },
  ], [objetos]);
  const serieOrbita = orbita.por_anio.map((a) => ({ x: a.anio, y: a.en_orbita }));
  const nuevosPorAnio = orbita.por_anio.map((a) => ({ clave: String(a.anio), n: a.catalogados_nuevos }));
  const irMapa = (escena) => setEscena(escena || 'prologo');
  const catalogados = tr('catalogados', 'catalogued'), enOrbita = tr('en órbita', 'in orbit');

  return (
    <div className="escena-scroll" tabIndex={0} role="region" aria-label="Dashboard">
      <div className="contenido">
        <div className="cabecera-escena con-visual">
          <div>
            <div className="acto">{tr('Anexo', 'Annex')}</div>
            <h1>Dashboard</h1>
            <p className="mini">{tr('Lee los mismos archivos JSON que el mapa, así que el panel y la simulación siempre coinciden. Toca un indicador para ir a su escena.', 'It reads the same JSON files as the map, so the panel and the simulation always match. Tap an indicator to go to its scene.')}</p>
          </div>
          <div className="visual-cabecera planetas-fila"><MiniPlaneta tipo="sol" size={56} /><MiniPlaneta tipo="tierra" size={40} /><MiniPlaneta tipo="luna" size={26} /><MiniPlaneta tipo="marte" size={34} /><MiniPlaneta tipo="jupiter" size={54} /><MiniPlaneta tipo="saturno" size={60} /></div>
        </div>

        <div className="panel tenue" style={{ marginBottom: 16 }}>
          <div className="controles-mapa">
            <span className="anio-grande" aria-live="polite">{anio}</span>
            <input type="range" min={1957} max={2026} value={anio} onChange={(e) => setAnio(+e.target.value)} aria-label={tr('Año', 'Year')} />
            <span className="mini">{tr('Objetos catalogados en órbita ese año:', 'Catalogued objects in orbit that year:')} <strong>{num(serieOrbita.find((s) => s.x === anio)?.y ?? 0, 0)}</strong> · {tr('el mapa 4D salta al mismo año', 'the 4D map jumps to the same year')}</span>
            {modo === 'org' && (
              <>
                <button className="btn chico" onClick={() => descargar('lunar_mars_memory_objetos.json', JSON.stringify({ ...META, objetos: sinOriginal(objetos), referencias: referencias.referencias }, null, 2), 'application/json')}>{tr('Descargar JSON (con fuentes)', 'Download JSON (with sources)')}</button>
                <button className="btn chico" onClick={() => descargar('lunar_mars_memory_objetos.csv', aCSV(objetos), 'text/csv')}>{tr('Descargar CSV', 'Download CSV')}</button>
                <button className="btn chico" onClick={() => descargar('dashboard_orbita.json', JSON.stringify(orbita, null, 2), 'application/json')}>{tr('Series orbitales', 'Orbital series')}</button>
                <button className="btn chico" onClick={() => setEscena('referencias')}>{tr('Ver referencias', 'View references')}</button>
              </>
            )}
          </div>
        </div>

        <div className="indicadores">{indicadores.map((i) => <Tile key={i.id} ind={i} modo={modo} onIr={irMapa} />)}</div>

        {modo === 'org' ? (
          <div className="graficos">
            <Area titulo={tr('Objetos catalogados en órbita por año, 1957–2026', 'Catalogued objects in orbit by year, 1957–2026')} nota={`${tr('Catálogo Space-Track (≥ ~10 cm).', 'Space-Track catalogue (≥ ~10 cm).')} ${t(orbita.nota)}`} serie={serieOrbita} marcador={anio} onClick={(d) => setAnio(d.x)} icono={<MiniPlaneta tipo="tierra" size={40} />} />
            <Dona titulo={tr('Satélites sobre la Tierra, por categoría', 'Satellites above Earth, by category')} nota={tr(`${num(satelites.total, 0)} objetos con posición real (catálogo del equipo).`, `${num(satelites.total, 0)} objects with a real position (team's catalogue).`)} datos={satelites.por_categoria} icono={<MiniPlaneta tipo="satelite" size={40} />} />
            <Dona titulo={tr('En órbita hoy, por tipo', 'In orbit today, by type')} nota={tr('Space-Track, objetos sin fecha de reentrada.', 'Space-Track, objects with no re-entry date.')} datos={orbita.por_tipo} icono={<MiniPlaneta tipo="cohete" size={40} />} />
            <Barras titulo={tr('Satélites por país (posición real)', 'Satellites by country (real position)')} nota={tr('Top 10 del catálogo del equipo. Toca para verlos en la escena Satélites.', "Top 10 from the team's catalogue. Tap to see them in the Satellites scene.")} datos={satelites.por_pais} onClick={() => irMapa('satelites')} />
            <Barras titulo={tr('Satélites por altura', 'Satellites by altitude')} nota={tr('Bandas de altura del catálogo del equipo.', "Altitude bands from the team's catalogue.")} datos={satelites.por_altura} onClick={() => irMapa('satelites')} />
            <Barras titulo={tr('Objetos catalogados nuevos por año', 'Newly catalogued objects per year')} nota={tr("Lanzamientos y fragmentos que entraron al catálogo cada año (incluye los ya reentrados). Sustituto de 'fragmentaciones por año' hasta tener la lista de eventos de la ESA (> 660).", "Launches and fragments that entered the catalogue each year (including those that have since re-entered). A stand-in for 'fragmentations per year' until ESA's list of events (> 660) is available.")} datos={nuevosPorAnio} horizontal={false} resaltar={String(anio)} onClick={(d) => setAnio(+d.clave)} />
            <Barras titulo={tr('En órbita hoy, por país u organización', 'In orbit today, by country or organization')} nota={tr("Space-Track COUNTRY_CODE; 'Desconocido' = sin código.", "Space-Track COUNTRY_CODE; 'Unknown' = no code.")} datos={orbita.por_pais} onClick={(d) => { setFiltro('pais', d.clave === 'Otros' ? 'todos' : d.clave); setColorPor('pais'); irMapa('prologo'); }} />
            <Barras titulo={tr('Fragmentos catalogados de pruebas antisatélite y choques', 'Catalogued fragments from anti-satellite tests and collisions')} nota={tr('Catalogados / aún en órbita (Space-Track).', 'Catalogued / still in orbit (Space-Track).')} datos={orbita.nubes_asat.flatMap((n) => [{ clave: `${t(n.clave)} · ${catalogados}`, n: n.catalogados }, { clave: `${t(n.clave)} · ${enOrbita}`, n: n.en_orbita }])} onClick={() => { setColorPor('nube'); irMapa('paises'); }} />
            <Dona titulo={tr('Objetos de la lista por cuerpo', 'Objects in the list by body')} nota={tr('116 objetos con fuente.', '116 objects with a source.')} datos={porCuerpo} icono={<MiniPlaneta tipo="luna" size={40} />} />
            <Barras titulo={tr('Llegadas a la Luna y Marte por década', 'Arrivals at the Moon and Mars by decade')} nota="objetos.json (NSSDCA + Kilic 2022)." datos={porDecada} />
            <Barras titulo={tr('Objetos de la lista por categoría', 'Objects in the list by category')} nota={tr('Patrimonio, ciencia a propósito, radiactivos y perdidos.', 'Heritage, science on purpose, radioactive and lost.')} datos={porCategoria} />
            <Barras titulo={tr('Objetos de la lista por país', 'Objects in the list by country')} datos={porPaisLuna} />
          </div>
        ) : (
          <div className="graficos">
            <Area titulo={tr('Cuántas cosas dan vueltas a la Tierra cada año', 'How many things circle Earth each year')} nota={tr('Mueve el año y mira cómo crece.', 'Move the year and watch it grow.')} serie={serieOrbita} marcador={anio} onClick={(d) => setAnio(d.x)} icono={<MiniPlaneta tipo="tierra" size={44} />} />
            <Dona titulo={tr('Qué tipo de cosas hay arriba', 'What kinds of things are up there')} nota={tr('Satélites de verdad, con su posición.', 'Real satellites, with their position.')} datos={satelites.por_categoria} icono={<MiniPlaneta tipo="satelite" size={44} />} />
            <Barras titulo={tr('Cuándo llegaron las cosas a la Luna y a Marte', 'When things arrived at the Moon and Mars')} datos={porDecada} />
            <Dona titulo={tr('Dónde está cada cosa de nuestra lista', 'Where each thing in our list is')} datos={porCuerpo} icono={<MiniPlaneta tipo="marte" size={44} />} />
          </div>
        )}

        <p className="mini" style={{ marginTop: 16 }}>
          {tr('Fuente de las series orbitales:', 'Source of the orbital series:')} {t(orbita.fuente)}. {tr('Satélites con posición:', 'Satellites with a position:')} {t(satelites.fuente) || tr('catálogo del equipo', "team's catalogue")}. {tr('Indicadores: ver referencia en cada tarjeta. Generado', 'Indicators: see the reference on each card. Generated')} {fecha(dash.generado)}.
        </p>
        <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
          <button className="btn chico" onClick={() => { seleccionar(null); irMapa('prologo'); }}>{tr('Ir al mapa 4D', 'Go to the 4D map')}</button>
          <button className="btn chico" onClick={() => irMapa('satelites')}>{tr('Ver satélites reales', 'See real satellites')}</button>
        </div>
      </div>
    </div>
  );
}
