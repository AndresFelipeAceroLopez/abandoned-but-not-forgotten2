// Dashboard: lee los mismos JSON que la simulación. El año es compartido con el mapa 4D (store).
import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import dash from '../data/dashboard.json';
import orbita from '../data/dashboard_orbita.json';
import satelites from '../data/dashboard_satelites.json';
import datos from '../data/objetos.json';
import referencias from '../data/referencias.json';
import { Barras, Linea, Dona, Area } from './Graficos';
import { Refs, ref } from '../ui/Referencias';
import { num } from '../lib/formato';
import { MiniPlaneta } from '../visuales';

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

// Recurso visual por indicador (mini planeta o icono).
const ICONO = {
  rastreados: 'tierra', mayores10cm: 'satelite', '1a10cm': 'papel', menos1cm: 'papel', masa_orbita: 'cohete', fragmentaciones: 'cohete',
  objetos_luna: 'luna', masa_luna: 'luna', bolsas: 'bolsa', objetos_marte: 'marte', masa_marte: 'marte', esporas: 'marte',
  profundo: 'saturno', reentradas: 'tierra', radiactivos: 'atomo', sin_identificar: 'papel', patrimonio: 'luna', asat: 'satelite', maniobras_iss: 'estacion', carta: 'bandera',
};

function Tile({ ind, modo, onIr }) {
  const r = ind.refs?.[0] ? ref(ind.refs[0]) : null;
  const valor = ind.unidad === '%' ? `${num(ind.valor)} %` : `${ind.aprox ? '~' : ''}${num(ind.valor, 0)}`;
  return (
    <div className={`tile ${modo}`} onClick={() => onIr(ind.escena)} style={{ cursor: 'pointer' }}>
      <div className="tile-icono"><MiniPlaneta tipo={ICONO[ind.id] || 'satelite'} size={modo === 'ninos' ? 64 : 48} /></div>
      <div>
        <div className="valor">{valor}</div>
        <div className="nombre">{modo === 'ninos' ? ind.ninos : `${ind.nombre}${ind.unidad !== '%' ? ` (${ind.unidad})` : ''}`}</div>
        <div className="pie">{modo === 'ninos' ? ind.comparacion : <>{ind.fecha} · {r ? r.autor : ''} <Refs ids={ind.refs} /></>}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { modo, anio, setAnio, setEscena, seleccionar, setFiltro, setColorPor } = useAppStore();
  const objetos = datos.objetos;
  const indicadores = modo === 'ninos' ? dash.indicadores.filter((i) => dash.ninos_destacados.includes(i.id)) : dash.indicadores;

  const porDecada = useMemo(() => {
    const m = new Map();
    for (const o of objetos) { if (o.cuerpo === 'espacio_profundo' || !o.fecha) continue; const d = `${o.fecha.slice(0, 3)}0s`; const k = `${d} ${o.cuerpo === 'luna' ? 'Luna' : 'Marte'}`; m.set(k, (m.get(k) || 0) + 1); }
    return [...m.entries()].sort().map(([clave, n]) => ({ clave, n }));
  }, [objetos]);
  const porCategoria = useMemo(() => [
    { clave: 'Patrimonio o en uso', n: objetos.filter((o) => o.activo || o.patrimonio).length },
    { clave: 'Estrellado a propósito (ciencia)', n: objetos.filter((o) => o.a_proposito).length },
    { clave: 'Con material radiactivo', n: objetos.filter((o) => o.radiactivo).length },
    { clave: 'Paradero desconocido', n: objetos.filter((o) => o.paradero_desconocido).length },
  ], [objetos]);
  const porPaisLuna = useMemo(() => {
    const m = new Map();
    for (const o of objetos) m.set(o.pais, (m.get(o.pais) || 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([clave, n]) => ({ clave, n }));
  }, [objetos]);
  const porCuerpo = useMemo(() => [
    { clave: 'Luna', n: objetos.filter((o) => o.cuerpo === 'luna').length },
    { clave: 'Marte', n: objetos.filter((o) => o.cuerpo === 'marte').length },
    { clave: 'Espacio profundo', n: objetos.filter((o) => o.cuerpo === 'espacio_profundo').length },
  ], [objetos]);
  const serieOrbita = orbita.por_anio.map((a) => ({ x: a.anio, y: a.en_orbita }));
  const nuevosPorAnio = orbita.por_anio.map((a) => ({ clave: String(a.anio), n: a.catalogados_nuevos }));
  const irMapa = (escena) => setEscena(escena || 'prologo');

  return (
    <div className="escena-scroll">
      <div className="contenido">
        <div className="cabecera-escena con-visual">
          <div>
            <div className="acto">Anexo</div>
            <h1>Dashboard</h1>
            <p className="mini">Lee los mismos archivos JSON que el mapa, así que el panel y la simulación siempre coinciden. Toca un indicador para ir a su escena.</p>
          </div>
          <div className="visual-cabecera planetas-fila"><MiniPlaneta tipo="sol" size={56} /><MiniPlaneta tipo="tierra" size={40} /><MiniPlaneta tipo="luna" size={26} /><MiniPlaneta tipo="marte" size={34} /><MiniPlaneta tipo="jupiter" size={54} /><MiniPlaneta tipo="saturno" size={60} /></div>
        </div>

        <div className="panel tenue" style={{ marginBottom: 16 }}>
          <div className="controles-mapa">
            <span className="anio-grande">{anio}</span>
            <input type="range" min={1957} max={2026} value={anio} onChange={(e) => setAnio(+e.target.value)} aria-label="Año" />
            <span className="mini">Objetos catalogados en órbita ese año: <strong>{num(serieOrbita.find((s) => s.x === anio)?.y ?? 0, 0)}</strong> · el mapa 4D salta al mismo año</span>
            {modo === 'org' && (
              <>
                <button className="btn chico" onClick={() => descargar('lunar_mars_memory_objetos.json', JSON.stringify({ ...datos, referencias: referencias.referencias }, null, 2), 'application/json')}>Descargar JSON (con fuentes)</button>
                <button className="btn chico" onClick={() => descargar('lunar_mars_memory_objetos.csv', aCSV(objetos), 'text/csv')}>Descargar CSV</button>
                <button className="btn chico" onClick={() => descargar('dashboard_orbita.json', JSON.stringify(orbita, null, 2), 'application/json')}>Series orbitales</button>
                <button className="btn chico" onClick={() => setEscena('referencias')}>Ver referencias</button>
              </>
            )}
          </div>
        </div>

        <div className="indicadores">{indicadores.map((i) => <Tile key={i.id} ind={i} modo={modo} onIr={irMapa} />)}</div>

        {modo === 'org' ? (
          <div className="graficos">
            <Area titulo="Objetos catalogados en órbita por año, 1957–2026" nota={`Catálogo Space-Track (≥ ~10 cm). ${orbita.nota}`} serie={serieOrbita} marcador={anio} onClick={(d) => setAnio(d.x)} icono={<MiniPlaneta tipo="tierra" size={40} />} />
            <Dona titulo="Satélites sobre la Tierra, por categoría" nota={`${num(satelites.total, 0)} objetos con posición real (catálogo del equipo).`} datos={satelites.por_categoria} icono={<MiniPlaneta tipo="satelite" size={40} />} />
            <Dona titulo="En órbita hoy, por tipo" nota="Space-Track, objetos sin fecha de reentrada." datos={orbita.por_tipo} icono={<MiniPlaneta tipo="cohete" size={40} />} />
            <Barras titulo="Satélites por país (posición real)" nota="Top 10 del catálogo del equipo. Toca para verlos en la escena Satélites." datos={satelites.por_pais} onClick={() => irMapa('satelites')} />
            <Barras titulo="Satélites por altura" nota="Bandas de altura del catálogo del equipo." datos={satelites.por_altura} onClick={() => irMapa('satelites')} />
            <Barras titulo="Objetos catalogados nuevos por año" nota="Lanzamientos y fragmentos que entraron al catálogo cada año (incluye los ya reentrados). Sustituto de 'fragmentaciones por año' hasta tener la lista de eventos de la ESA (> 660)." datos={nuevosPorAnio} horizontal={false} resaltar={String(anio)} onClick={(d) => setAnio(+d.clave)} />
            <Barras titulo="En órbita hoy, por país u organización" nota="Space-Track COUNTRY_CODE; 'Desconocido' = sin código." datos={orbita.por_pais} onClick={(d) => { setFiltro('pais', d.clave === 'Otros' ? 'todos' : d.clave); setColorPor('pais'); irMapa('prologo'); }} />
            <Barras titulo="Fragmentos catalogados de pruebas antisatélite y choques" nota="Catalogados / aún en órbita (Space-Track)." datos={orbita.nubes_asat.flatMap((n) => [{ clave: `${n.clave} · catalogados`, n: n.catalogados }, { clave: `${n.clave} · en órbita`, n: n.en_orbita }])} onClick={() => { setColorPor('nube'); irMapa('paises'); }} />
            <Dona titulo="Objetos de la lista por cuerpo" nota="116 objetos con fuente." datos={porCuerpo} icono={<MiniPlaneta tipo="luna" size={40} />} />
            <Barras titulo="Llegadas a la Luna y Marte por década" nota="objetos.json (NSSDCA + Kilic 2022)." datos={porDecada} />
            <Barras titulo="Objetos de la lista por categoría" nota="Patrimonio, ciencia a propósito, radiactivos y perdidos." datos={porCategoria} />
            <Barras titulo="Objetos de la lista por país" datos={porPaisLuna} />
          </div>
        ) : (
          <div className="graficos">
            <Area titulo="Cuántas cosas dan vueltas a la Tierra cada año" nota="Mueve el año y mira cómo crece." serie={serieOrbita} marcador={anio} onClick={(d) => setAnio(d.x)} icono={<MiniPlaneta tipo="tierra" size={44} />} />
            <Dona titulo="Qué tipo de cosas hay arriba" nota="Satélites de verdad, con su posición." datos={satelites.por_categoria} icono={<MiniPlaneta tipo="satelite" size={44} />} />
            <Barras titulo="Cuándo llegaron las cosas a la Luna y a Marte" datos={porDecada} />
            <Dona titulo="Dónde está cada cosa de nuestra lista" datos={porCuerpo} icono={<MiniPlaneta tipo="marte" size={44} />} />
          </div>
        )}

        <p className="mini" style={{ marginTop: 16 }}>Fuente de las series orbitales: {orbita.fuente}. Satélites con posición: {satelites.fuente || 'catálogo del equipo'}. Indicadores: ver referencia en cada tarjeta. Generado {dash.generado}.</p>
        <div style={{ marginTop: 10, display: 'flex', gap: 8 }}><button className="btn chico" onClick={() => { seleccionar(null); irMapa('prologo'); }}>Ir al mapa 4D</button><button className="btn chico" onClick={() => irMapa('satelites')}>Ver satélites reales</button></div>
      </div>
    </div>
  );
}
