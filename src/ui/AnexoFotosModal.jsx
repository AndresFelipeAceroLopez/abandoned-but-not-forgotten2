import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import datosObjetos from '../data/objetos.json';
import { Refs } from './Referencias';
import './AnexoFotosModal.css';

// 18 objetos de la Luna con latitud y longitud desconocidas (código NSSDCA "g")
const OBJETOS_PERDIDOS_18 = (datosObjetos.objetos || []).filter(
  (o) => o.cuerpo === 'luna' && o.lat === null
);

export default function AnexoFotosModal() {
  const modo = useAppStore((s) => s.modo);
  const setModo = useAppStore((s) => s.setModo);
  const setEscena = useAppStore((s) => s.setEscena);
  const anteriorEscena = useAppStore((s) => s.anteriorEscena);

  const [idioma, setIdioma] = useState('ES');
  const [tabActiva, setTabActiva] = useState('todos');
  const [filtroPerdidos, setFiltroPerdidos] = useState('');
  const [fotoModal, setFotoModal] = useState(null);

  const baseUrl = import.meta.env.BASE_URL;

  const perdidosFiltrados = useMemo(() => {
    const q = filtroPerdidos.toLowerCase().trim();
    if (!q) return OBJETOS_PERDIDOS_18;
    return OBJETOS_PERDIDOS_18.filter(
      (o) =>
        (o.nombre || '').toLowerCase().includes(q) ||
        (o.objeto || '').toLowerCase().includes(q) ||
        (o.programa || '').toLowerCase().includes(q) ||
        (o.mision || '').toLowerCase().includes(q)
    );
  }, [filtroPerdidos]);

  // Tabla oficial de Créditos y Licencias para los Jueces de NASA Space Apps
  const TABLA_LICENCIAS = [
    {
      id: 1,
      titulo:
        idioma === 'ES'
          ? 'Doble cráter de impacto lunar (propulsor de 2022)'
          : 'Lunar double impact crater (mystery 2022 booster)',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 8' : 'Photo Annex & Scene 8',
      archivo: 'doble_crater_2022_lroc.png',
      enlace: 'https://www.lroc.asu.edu/images/1261',
      credito: 'NASA / GSFC / Arizona State University (LROC NAC M1407760984R)',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
      tipoLicencia: 'public-domain',
    },
    {
      id: 2,
      titulo:
        idioma === 'ES'
          ? 'Cráter de impacto de la etapa S-IVB del Apollo 13'
          : 'Apollo 13 S-IVB Saturn V stage impact crater',
      escena:
        idioma === 'ES'
          ? 'Anexo Fotos & Escena 12 (Corto 3)'
          : 'Photo Annex & Scene 12 (Short 3)',
      archivo: 'apollo13_sivb_svs.jpg',
      enlace: 'https://svs.gsfc.nasa.gov/4803',
      credito: 'NASA Scientific Visualization Studio / LROC',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
      tipoLicencia: 'public-domain',
    },
    {
      id: 3,
      titulo:
        idioma === 'ES'
          ? 'Manta térmica EDL y red de Dacron en cráter Jezero'
          : 'EDL thermal blanket & Dacron netting in Jezero Crater',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 2 (Marte)' : 'Photo Annex & Scene 2 (Mars)',
      archivo: 'perseverance_thermal_blanket.jpg',
      enlace: 'https://mars.nasa.gov',
      credito: 'NASA / JPL-Caltech (Perseverance Mastcam-Z / Sol 467-495)',
      licencia: 'Dominio Público NASA / JPL-Caltech',
      tipoLicencia: 'public-domain',
    },
    {
      id: 4,
      titulo:
        idioma === 'ES'
          ? 'Desgaste y roturas en ruedas de aluminio de Curiosity'
          : 'Curiosity aluminum wheel tread wear and punctures',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 2 (Marte)' : 'Photo Annex & Scene 2 (Mars)',
      archivo: 'curiosity_wheel_wear.jpg',
      enlace: 'https://images.nasa.gov/details/PIA21486',
      credito: 'NASA / JPL-Caltech (Curiosity MAHLI, PIA21486)',
      licencia: 'Dominio Público NASA / JPL-Caltech',
      tipoLicencia: 'public-domain',
    },
    {
      id: 5,
      titulo:
        idioma === 'ES'
          ? 'Bolsa de herramientas en órbita (EVA STS-126)'
          : 'EVA crew lock tool bag floating in orbit (STS-126)',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 6 (Daños)' : 'Photo Annex & Scene 6 (Damage)',
      archivo: 'eva_tool_bag_2008.jpg',
      enlace: 'https://images.nasa.gov',
      credito: 'NASA (Heidemarie Stefanyshyn-Piper, ISS018-E-009413)',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
      tipoLicencia: 'public-domain',
    },
    {
      id: 6,
      titulo:
        idioma === 'ES'
          ? 'Soporte Inconel de pallet de baterías de la ISS (Naples, FL)'
          : 'ISS battery pallet Inconel stanchion (Naples, FL)',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 6 (Daños)' : 'Photo Annex & Scene 6 (Damage)',
      archivo: 'florida_stanchion_nasa.png',
      enlace:
        'https://www.nasa.gov/blogs/spacestation/2024/04/15/nasa-completes-analysis-of-recovered-space-object/',
      credito: 'NASA Kennedy Space Center / Materials Analysis Lab',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
      tipoLicencia: 'public-domain',
    },
    {
      id: 7,
      titulo:
        idioma === 'ES'
          ? 'Catálogo de Impactos y Artefactos Antropogénicos en la Luna'
          : 'Table of Anthropogenic Impacts and Spacecraft on the Moon',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 1 (Luna)' : 'Photo Annex & Scene 1 (Moon)',
      archivo: 'NSSDCA Master Catalog (96 filas)',
      enlace: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html',
      credito: 'NASA National Space Science Data Center (NSSDCA)',
      licencia: 'Datos Abiertos Oficiales (Gobierno Federal de EE. UU.)',
      tipoLicencia: 'open-data',
    },
    {
      id: 8,
      titulo:
        idioma === 'ES'
          ? 'Estadísticas del Entorno Espacial y Base DISCOS'
          : 'Space Environment Statistics & DISCOS Database',
      escena:
        idioma === 'ES'
          ? 'Escena 0 (Prólogo) & Escena 12 (Corto 1)'
          : 'Scene 0 (Prologue) & Scene 12 (Short 1)',
      archivo: 'DISCOS / MASTER-8 (nov-2026)',
      enlace: 'https://sdup.esoc.esa.int/discosweb/statistics/',
      credito: 'ESA Space Debris Office (ESOC Darmstadt)',
      licencia: 'Open Data ESA / Uso de divulgación y estudio',
      tipoLicencia: 'open-data',
    },
    {
      id: 9,
      titulo:
        idioma === 'ES'
          ? 'Masa de basura acumulada en Marte (7.119 kg en 18 objetos)'
          : 'Human trash mass on Mars (7,119 kg across 18 objects)',
      escena:
        idioma === 'ES'
          ? 'Escena 2 (Marte) & Escena 12 (Corto 2)'
          : 'Scene 2 (Mars) & Scene 12 (Short 2)',
      archivo: 'The Conversation / Astronomy (2022)',
      enlace:
        'https://theconversation.com/mars-is-littered-with-15-694-pounds-of-human-trash-from-50-years-of-robotic-exploration-188881',
      credito: 'Dr. Cagri Kilic (West Virginia University)',
      licencia: 'Creative Commons CC BY-ND 4.0',
      tipoLicencia: 'cc',
    },
    {
      id: 10,
      titulo:
        idioma === 'ES'
          ? '4 Cortos de Animación 3D Estilo WALL-E (ES / EN)'
          : '4 3D Animated Shorts in WALL-E Style (ES / EN)',
      escena:
        idioma === 'ES' ? 'Escena 12 (Cortos para tomar conciencia)' : 'Scene 12 (Awareness Shorts)',
      archivo: 'public/videos/01..04_*.webm / .mp4',
      enlace: 'Repositorio Local Videos-Wall-e',
      credito: 'Equipo Lunar/Mars Memory (Animación Three.js original, sin derechos reservados de terceros)',
      licencia: 'Producción Original Abierta / NASA Space Apps Challenge 2026',
      tipoLicencia: 'original',
    },
  ];

  const handleCerrar = () => {
    // Si venía de una escena previa, regresa o va al prólogo
    if (anteriorEscena) {
      anteriorEscena();
    } else {
      setEscena('prologo');
    }
  };

  return (
    <div className="anexo-contenedor">
      {/* Cabecera Principal */}
      <div className="anexo-header">
        <div className="anexo-header-info">
          <div className="anexo-badge-anexo">
            {idioma === 'ES'
              ? 'Anexo Documental · Fotos y Videos'
              : 'Documentary Annex · Photos & Videos'}
          </div>
          <h1 className="anexo-titulo">
            {idioma === 'ES'
              ? 'Fotos Reales y Objetos Perdidos'
              : 'Real Photos & Lost Lunar Artifacts'}
          </h1>
          <p className="anexo-subtitulo">
            {idioma === 'ES'
              ? modo === 'ninos'
                ? 'Fotografías oficiales de NASA y la agencia europea que demuestran qué pasó de verdad con los artefactos que dejamos en el espacio, la Luna y Marte.'
                : 'Evidencia fotográfica primaria y catálogo verificado de impactos extraterrestres: cámaras LROC, satélites de reconocimiento orbital, misiones rover en Marte y análisis de laboratorio de fragmentos recuperados en la Tierra.'
              : modo === 'ninos'
              ? 'Official NASA and European Space Agency imagery showing what actually happened to the artifacts we left behind on the Moon, Mars, and in Earth orbit.'
              : 'Primary photographic evidence and verified extraterrestrial impact registry: LROC NAC imagery, Mars rover cameras, orbital debris decay, and laboratory ballistic forensics on recovered hardware.'}
          </p>
        </div>

        {/* Controles: Idioma, Modo, Cerrar */}
        <div className="anexo-controles-superiores">
          {/* Selector de Modo */}
          <div className="modo-toggle" title="Cambiar modo de narrativa">
            <button
              type="button"
              className={modo === 'ninos' ? 'activa' : ''}
              onClick={() => setModo('ninos')}
            >
              {idioma === 'ES' ? 'Niños y jóvenes' : 'Youth & Kids'}
            </button>
            <button
              type="button"
              className={modo === 'org' ? 'activa' : ''}
              onClick={() => setModo('org')}
            >
              {idioma === 'ES' ? 'Organizaciones' : 'Organizations'}
            </button>
          </div>

          {/* Selector de Idioma */}
          <div className="cortos-idioma-toggle" role="group" aria-label="Idioma">
            <button
              type="button"
              className={`cortos-btn-idioma ${idioma === 'ES' ? 'activo' : ''}`}
              onClick={() => setIdioma('ES')}
            >
              ES
            </button>
            <button
              type="button"
              className={`cortos-btn-idioma ${idioma === 'EN' ? 'activo' : ''}`}
              onClick={() => setIdioma('EN')}
            >
              EN
            </button>
          </div>

          {/* Botón de Cerrar / Volver */}
          <button
            type="button"
            className="anexo-btn-cerrar"
            onClick={handleCerrar}
            title={idioma === 'ES' ? 'Volver a la exploración' : 'Back to exploration'}
          >
            ✕ {idioma === 'ES' ? 'Cerrar Anexo' : 'Close Annex'}
          </button>
        </div>
      </div>

      {/* Barra de Tabs / Filtros Rápidos */}
      <div className="anexo-tabs-navegacion">
        <button
          type="button"
          className={`anexo-tab-btn ${tabActiva === 'todos' ? 'activo' : ''}`}
          onClick={() => setTabActiva('todos')}
        >
          {idioma === 'ES' ? '📋 Ver Todo' : '📋 View All'}
        </button>
        <button
          type="button"
          className={`anexo-tab-btn ${tabActiva === 'cohete' ? 'activo' : ''}`}
          onClick={() => setTabActiva('cohete')}
        >
          🚀 {idioma === 'ES' ? 'Cohete Misterioso 2022' : '2022 Mystery Rocket'}
        </button>
        <button
          type="button"
          className={`anexo-tab-btn ${tabActiva === 'perdidos' ? 'activo' : ''}`}
          onClick={() => setTabActiva('perdidos')}
        >
          🌑 {idioma === 'ES' ? '18 Objetos Perdidos (g)' : '18 Lost Objects (g)'}
        </button>
        <button
          type="button"
          className={`anexo-tab-btn ${tabActiva === 'lroc' ? 'activo' : ''}`}
          onClick={() => setTabActiva('lroc')}
        >
          🛰️ {idioma === 'ES' ? 'Verificados por LRO (d)' : 'LRO Verified Sites (d)'}
        </button>
        <button
          type="button"
          className={`anexo-tab-btn ${tabActiva === 'marte' ? 'activo' : ''}`}
          onClick={() => setTabActiva('marte')}
        >
          🔴 {idioma === 'ES' ? 'Fotos en Marte' : 'Mars Surface Photos'}
        </button>
        <button
          type="button"
          className={`anexo-tab-btn ${tabActiva === 'tierra' ? 'activo' : ''}`}
          onClick={() => setTabActiva('tierra')}
        >
          🛠️ {idioma === 'ES' ? 'Bolsa EVA & Daños Tierra' : 'EVA Toolbag & Earth Damage'}
        </button>
        <button
          type="button"
          className={`anexo-tab-btn ${tabActiva === 'licencias' ? 'activo' : ''}`}
          onClick={() => setTabActiva('licencias')}
        >
          📜 {idioma === 'ES' ? 'Tabla de Licencias (Jueces)' : 'License Table (Judges)'}
        </button>
      </div>

      {/* SECCIÓN 1: Cohete no identificado de 2022 (Impacto en la Luna) */}
      {(tabActiva === 'todos' || tabActiva === 'cohete') && (
        <section className="anexo-seccion">
          <div className="anexo-seccion-cabecera">
            <div>
              <h2 className="anexo-seccion-titulo">
                🚀{' '}
                {idioma === 'ES'
                  ? 'Cohete no identificado de 2022: Doble Cráter en la Luna'
                  : 'Unidentified 2022 Rocket: Lunar Double Crater Impact'}
              </h2>
              <p className="anexo-seccion-bajada">
                {idioma === 'ES'
                  ? 'El 4 de marzo de 2022, un propulsor fuera de control impactó en la cara oculta de la Luna, cerca del cráter Hertzsprung. Las imágenes de la cámara LROC de NASA revelaron un cráter doble inusual de ~29 m de largo, confirmando que el cuerpo tenía dos masas pesadas en sus extremos.'
                  : 'On March 4, 2022, a rogue rocket booster struck the lunar farside near Hertzsprung crater. LROC NAC imagery revealed an unprecedented ~29-meter-wide double crater, confirming substantial heavy masses at both ends.'}
              </p>
            </div>
            <span className="anexo-chip-codigo">NSSDCA / LROC #1261</span>
          </div>

          <div className="anexo-foto-grid">
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/doble_crater_2022_lroc.png`,
                    titulo:
                      idioma === 'ES'
                        ? 'Doble cráter de impacto (LROC NAC M1407760984R)'
                        : 'Double Impact Crater (LROC NAC M1407760984R)',
                    credito: 'NASA / GSFC / Arizona State University',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/doble_crater_2022_lroc.png`}
                  alt="Doble cráter de cohete no identificado 2022 en la Luna"
                  className="anexo-foto-img"
                  loading="lazy"
                />
                <span className="anexo-foto-badge-credito">
                  LROC NAC · NASA / GSFC / ASU
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Cráter doble de ~29 m (Cráter Este 18 m, Cráter Oeste 16 m)'
                    : '~29 m Double Crater (Eastern 18 m, Western 16 m)'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? modo === 'ninos'
                      ? 'Ningún cohete había hecho dos agujeros pegados en la Luna. El choque fue tan fuerte que dejó dos cráteres unidos porque el objeto tenía dos partes muy pesadas que nadie esperaba.'
                      : 'Casi ningún impacto de etapa gastada (como los S-IVB de Saturno V) produce cráter doble: suelen tener la masa concentrada en el motor. Este objeto requería una masa frontal comparable al motor para cavar dos cráteres solapados.'
                    : modo === 'ninos'
                    ? 'No rocket had ever produced two overlapping craters on the Moon before. The impact formed a twin crater because the object carried unexpected heavy masses on both ends.'
                    : 'Spent rocket boosters typically have mass concentrated at the engine end, forming circular single craters. This twin crater formation requires roughly equal mass distributions at opposite ends.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Coordenadas:' : 'Coordinates:'}</strong> 5.226° N, 234.486° E (Cara oculta lunar) ·{' '}
                  <strong>{idioma === 'ES' ? 'Designación:' : 'Designation:'}</strong> WE0913A / Chang&apos;e 5-T1 booster (disputado) <Refs ids={[26, 28]} />
                </div>
                <a
                  href="https://www.lroc.asu.edu/images/1261"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ver comunicado oficial en LROC ASU' : 'Read official release at LROC ASU'}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN 2: Los 18 Objetos Lunares Perdidos (Código NSSDCA "g") */}
      {(tabActiva === 'todos' || tabActiva === 'perdidos') && (
        <section className="anexo-seccion">
          <div className="anexo-seccion-cabecera">
            <div>
              <h2 className="anexo-seccion-titulo">
                🌑{' '}
                {idioma === 'ES'
                  ? 'Los 18 Objetos Lunares Perdidos (Código NSSDCA "g")'
                  : 'The 18 Lost Lunar Objects (NSSDCA Code "g")'}
              </h2>
              <p className="anexo-seccion-bajada">
                {idioma === 'ES'
                  ? 'De las 96 filas oficiales del catálogo de artefactos en la Luna de NASA (NSSDCA), exactamente 18 objetos quedaron en órbita sin seguimiento activo. Debido a las anomalías de gravedad de la Luna (mascons), sus órbitas decayeron y se estrellaron en coordenadas desconocidas (lat: null, lon: null).'
                  : 'Out of the 96 official rows in NASA\'s NSSDCA lunar artifact catalog, exactly 18 objects were discarded in unmonitored orbits. Lunar gravitational anomalies (mascons) destabilized their orbits until they impacted at unknown coordinates (lat: null, lon: null).'}
              </p>
            </div>
            <span className="anexo-chip-codigo">NSSDCA Code &quot;g&quot; · 18 objetos</span>
          </div>

          <div className="anexo-perdidos-intro-caja">
            <p>
              <strong>{idioma === 'ES' ? '¿Por qué son los papeles perdidos?' : 'Why are these the lost papers?'}</strong>{' '}
              {idioma === 'ES'
                ? 'A diferencia de los sitios de alunizaje y los impactos monitoreados, estos 18 artefactos (incluidos el brazo extensible del espectrómetro de masa del Apollo 16, etapas de ascenso de Apollo 11 y 16, y subsatélites como Hagoromo y Explorer 35) no tienen tumba conocida en la cartografía lunar.'
                : 'Unlike photographed landing sites and tracked telemetry impacts, these 18 artifacts (including Apollo 16\'s mass spectrometer boom, Apollo 11 and 16 ascent stages, and subsatellites like Hagoromo and Explorer 35) have no known resting coordinates.'}{' '}
              <Refs ids={[2, 8]} />
            </p>
          </div>

          {/* Buscador interno para los 18 objetos */}
          <div className="anexo-filtro-perdidos">
            <input
              type="text"
              value={filtroPerdidos}
              onChange={(e) => setFiltroPerdidos(e.target.value)}
              placeholder={
                idioma === 'ES'
                  ? 'Filtrar por nombre, programa (Apollo, Luna...) o misión'
                  : 'Filter by name, program (Apollo, Luna...) or mission'
              }
              className="anexo-input-filtro"
            />
            <small style={{ color: 'var(--tinta-3)' }}>
              {perdidosFiltrados.length} / {OBJETOS_PERDIDOS_18.length}{' '}
              {idioma === 'ES' ? 'objetos' : 'objects'}
            </small>
          </div>

          {/* Tabla de los 18 objetos */}
          <div className="anexo-tabla-wrapper">
            <table className="anexo-tabla">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{idioma === 'ES' ? 'Artefacto / Objeto' : 'Artifact / Object'}</th>
                  <th>{idioma === 'ES' ? 'Programa / Misión' : 'Program / Mission'}</th>
                  <th>{idioma === 'ES' ? 'Fecha estimada' : 'Estimated Date'}</th>
                  <th>{idioma === 'ES' ? 'Código NSSDCA' : 'NSSDCA Code'}</th>
                  <th>{idioma === 'ES' ? 'Causa de pérdida y detalle' : 'Loss Context & Details'}</th>
                </tr>
              </thead>
              <tbody>
                {perdidosFiltrados.map((obj, idx) => (
                  <tr key={obj.id || idx}>
                    <td style={{ color: 'var(--oro)', fontWeight: 700 }}>{idx + 1}</td>
                    <td>
                      <strong>{obj.nombre}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--tinta-3)' }}>
                        {obj.objeto}
                      </div>
                    </td>
                    <td>
                      <span className="chip chico">{obj.programa || 'Lunar'}</span>
                      {obj.mision && <div style={{ fontSize: '0.78rem' }}>{obj.mision}</div>}
                    </td>
                    <td>{obj.fecha || '1966–1977'}</td>
                    <td>
                      <span className="anexo-chip-codigo">
                        {obj.codigos_nssdca ? obj.codigos_nssdca.join(', ') : 'g'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.84rem', color: 'var(--tinta-2)', maxWidth: 420 }}>
                      {modo === 'ninos'
                        ? obj.texto?.ninos || 'Quedó orbitando la Luna hasta que cayó en un lugar no registrado.'
                        : obj.texto?.org || 'Órbita decaída por perturbaciones de masa lunar (mascons); coordenadas no confirmadas.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SECCIÓN 3: Objetos verificados desde órbita (Código NSSDCA "d") */}
      {(tabActiva === 'todos' || tabActiva === 'lroc') && (
        <section className="anexo-seccion">
          <div className="anexo-seccion-cabecera">
            <div>
              <h2 className="anexo-seccion-titulo">
                🛰️{' '}
                {idioma === 'ES'
                  ? 'Objetos Verificados desde Órbita (Código NSSDCA "d")'
                  : 'Orbitally Verified Artifacts (NSSDCA Code "d")'}
              </h2>
              <p className="anexo-seccion-bajada">
                {idioma === 'ES'
                  ? 'El orbitador Lunar Reconnaissance Orbiter (LRO) de NASA ha fotografiado con su cámara de ángulo estrecho (resolución de hasta 0,5 m/px) 47 objetos de las 96 filas del catálogo lunar, incluidos los cráteres de las etapas S-IVB del Saturno V y los módulos de alunizaje Apollo.'
                  : 'NASA\'s Lunar Reconnaissance Orbiter (LRO) Narrow Angle Camera (up to 0.5 m/px resolution) has photographed 47 objects in the lunar catalog, including Saturn V S-IVB impact craters and Apollo lunar landing stages.'}
              </p>
            </div>
            <span className="anexo-chip-codigo">NSSDCA Code &quot;d&quot; · 47 verificados</span>
          </div>

          <div className="anexo-foto-grid">
            {/* Foto 1: S-IVB Apollo 13 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/apollo13_sivb_svs.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Cráter de impacto de la etapa S-IVB del Apollo 13'
                        : 'Apollo 13 S-IVB Impact Crater',
                    credito: 'NASA Scientific Visualization Studio / LROC',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/apollo13_sivb_svs.jpg`}
                  alt="Cráter de la etapa S-IVB de Apollo 13 en la Luna"
                  className="anexo-foto-img"
                  loading="lazy"
                />
                <span className="anexo-foto-badge-credito">
                  NASA SVS / LROC · 2.5550° S, 27.8875° W
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Etapa S-IVB del Apollo 13: Impacto Sísmico Deliberado'
                    : 'Apollo 13 S-IVB Stage: Deliberate Seismic Impact'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'Estrellada intencionalmente el 15 de abril de 1970 a 9.200 km/h. La energía cinética equivalente a 11 toneladas de TNT fue registrada por el sismómetro del Apollo 12 durante más de 3 horas, revelando la estructura elástica de la corteza lunar.'
                    : 'Intentionally crashed on April 15, 1970 at 9,200 km/h. The kinetic energy generated seismic signals detected by the Apollo 12 seismometer for over 3 hours, unlocking the deep internal structure of the Moon.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Cráter resultante:' : 'Resulting crater:'}</strong> ~30 m de diámetro ·{' '}
                  <strong>{idioma === 'ES' ? 'Masa del cohete:' : 'Rocket dry mass:'}</strong> 13.925 kg <Refs ids={[27, 8]} />
                </div>
                <a
                  href="https://svs.gsfc.nasa.gov/4803"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ver animación y ficha en NASA SVS' : 'View visualization at NASA SVS'}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN 4: Desechos reales fotografiados en Marte */}
      {(tabActiva === 'todos' || tabActiva === 'marte') && (
        <section className="anexo-seccion">
          <div className="anexo-seccion-cabecera">
            <div>
              <h2 className="anexo-seccion-titulo">
                🔴{' '}
                {idioma === 'ES'
                  ? 'Desechos Reales Fotografiados en Marte'
                  : 'Real Space Debris Photographed on Mars'}
              </h2>
              <p className="anexo-seccion-bajada">
                {idioma === 'ES'
                  ? 'En Marte hay más de 7.119 kg de artefactos dejados por 14 misiones en 18 objetos (Kilic, 2022). Las cámaras de los rovers Perseverance y Curiosity han documentado desde restos de las mantas térmicas de aterrizaje arrastrados por el viento hasta el desgaste severo del metal de sus ruedas.'
                  : 'Mars hosts over 7,119 kg of anthropogenic hardware across 18 objects from 14 missions (Kilic, 2022). Rovers Perseverance and Curiosity have documented landing debris displaced by Martian winds and severe mechanical wear.'}
              </p>
            </div>
            <span className="anexo-chip-codigo">Mars Rover Imaging · NASA / JPL</span>
          </div>

          <div className="anexo-foto-grid">
            {/* Foto 1: Manta térmica Perseverance */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/perseverance_thermal_blanket.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Red de Dacron y Manta Térmica en Cráter Jezero'
                        : 'Dacron Netting & Thermal Blanket in Jezero Crater',
                    credito: 'NASA / JPL-Caltech',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/perseverance_thermal_blanket.jpg`}
                  alt="Manta térmica y red en Marte fotografiada por Perseverance"
                  className="anexo-foto-img"
                  loading="lazy"
                />
                <span className="anexo-foto-badge-credito">
                  NASA / JPL-Caltech · Jezero Crater
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Red de Dacron y Manta Térmica EDL (12-jul-2022)'
                    : 'Dacron Netting & Thermal Blanket (Sol 495, 2022)'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'Encontrada por Perseverance a 2 km del sitio de impacto de la etapa de descenso (Sky Crane). La red de fibra de poliéster y el papel reflectante fueron empujados por las tormentas de polvo marcianas a través de las rocas.'
                    : 'Found by Perseverance 2 km away from the sky crane descent stage crash site. Lightweight polyester Dacron mesh and reflective foil insulation were blown across the rocky landscape by Martian winds.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Misión:' : 'Mission:'}</strong> Mars 2020 (Perseverance) ·{' '}
                  <strong>{idioma === 'ES' ? 'Ubicación:' : 'Location:'}</strong> Jezero Crater delta <Refs ids={[37, 103]} />
                </div>
                <a
                  href="https://theconversation.com/mars-is-littered-with-15-694-pounds-of-human-trash-from-50-years-of-robotic-exploration-188881"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Leer estudio del Dr. Kilic en The Conversation' : 'Read Dr. Kilic study in The Conversation'}
                </a>
              </div>
            </div>

            {/* Foto 2: Rueda Curiosity desgastada */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/curiosity_wheel_wear.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Desgaste y rotura en las ruedas de aluminio de Curiosity'
                        : 'Curiosity Wheel Aluminum Tread Fatigue and Punctures',
                    credito: 'NASA / JPL-Caltech (PIA21486)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/curiosity_wheel_wear.jpg`}
                  alt="Desgaste en la rueda de aluminio del rover Curiosity"
                  className="anexo-foto-img"
                  loading="lazy"
                />
                <span className="anexo-foto-badge-credito">
                  NASA / JPL-Caltech · PIA21486
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Fatiga Mecánica en Ruedas de Aluminio de 0,75 mm'
                    : 'Mechanical Fatigue on 0.75 mm Aluminum Wheels'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'El terreno rocoso y afilado de Gale Crater perforó la piel de aluminio del rover Curiosity. La ingeniería humana debe adaptarse a la degradación física implacable fuera de nuestro planeta.'
                    : 'The razor-sharp ventifacts of Gale Crater punctured Curiosity\'s thin aluminum wheel skin. Demonstrates the relentless mechanical degradation that all spacecraft experience over time.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Cámara:' : 'Camera:'}</strong> MAHLI (Mars Hand Lens Imager) ·{' '}
                  <strong>{idioma === 'ES' ? 'Catálogo NASA:' : 'NASA Catalog:'}</strong> PIA21486
                </div>
                <a
                  href="https://images.nasa.gov/details/PIA21486"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ficha oficial en NASA Images' : 'Official record at NASA Images'}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN 5: Caja de herramientas perdida en órbita y Daños en la Tierra */}
      {(tabActiva === 'todos' || tabActiva === 'tierra') && (
        <section className="anexo-seccion">
          <div className="anexo-seccion-cabecera">
            <div>
              <h2 className="anexo-seccion-titulo">
                🛠️{' '}
                {idioma === 'ES'
                  ? 'Bolsa de Herramientas Perdida (2008) y Daños en la Tierra'
                  : 'Lost EVA Tool Bag (2008) & Earth Impact Damage'}
              </h2>
              <p className="anexo-seccion-bajada">
                {idioma === 'ES'
                  ? 'La basura espacial no siempre permanece en órbita. En 2008 una bolsa de herramientas se escapó en una caminata espacial y orbitó la Tierra miles de veces. En 2024, un trozo de soporte metálico de la Estación Espacial sobrevivió a la reentrada y atravesó una vivienda en Florida.'
                  : 'Space debris does not always stay benignly in orbit. In 2008 an astronaut toolbag floated away, orbiting Earth thousands of times. In 2024, a surviving structural fragment from the ISS battery pallet penetrated a residential roof in Florida.'}
              </p>
            </div>
            <span className="anexo-chip-codigo">Escena 6 Daños Colaterales</span>
          </div>

          <div className="anexo-foto-grid">
            {/* Foto 1: Bolsa de herramientas STS-126 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/eva_tool_bag_2008.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Bolsa de herramientas flotando en órbita (STS-126)'
                        : 'Toolbag drifting in low Earth orbit (STS-126)',
                    credito: 'NASA (ISS018-E-009413)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/eva_tool_bag_2008.jpg`}
                  alt="Bolsa de herramientas de astronauta flotando en el espacio"
                  className="anexo-foto-img"
                  loading="lazy"
                />
                <span className="anexo-foto-badge-credito">
                  NASA · ISS018-E-009413
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Bolsa de Herramientas de Heidemarie Stefanyshyn-Piper'
                    : 'Heidemarie Stefanyshyn-Piper\'s Toolbag (18-Nov-2008)'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'La bolsa de 13 kg escapó mientras reparaban la junta rotatoria solar de la ISS. Dio más de 4.000 vueltas al planeta a 28.000 km/h (visible con telescopios aficionados con magnitud 6) antes de quemarse en la atmósfera el 3-ago-2009.'
                    : 'The 13-kg toolbag drifted away during an ISS solar alpha rotary joint repair spacewalk. It completed over 4,000 orbits at 28,000 km/h (visible to amateur skywatchers at magnitude 6) before reentering on August 3, 2009.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Misión:' : 'Mission:'}</strong> STS-126 Endeavour ·{' '}
                  <strong>{idioma === 'ES' ? 'Órbitas completadas:' : 'Completed orbits:'}</strong> &gt;4.000 vueltas
                </div>
              </div>
            </div>

            {/* Foto 2: Trozo de soporte de batería ISS en Florida */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/florida_stanchion_nasa.png`,
                    titulo:
                      idioma === 'ES'
                        ? 'Soporte Inconel recuperado tras impactar casa en Florida'
                        : 'Inconel stanchion recovered after Florida home impact',
                    credito: 'NASA Kennedy Space Center Materials Lab',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/florida_stanchion_nasa.png`}
                  alt="Fragmento de la Estación Espacial que cayó en una casa en Florida"
                  className="anexo-foto-img"
                  loading="lazy"
                />
                <span className="anexo-foto-badge-credito">
                  NASA KSC Analysis · 8-mar-2024
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Soporte de Batería de la ISS (Naples, Florida, 2024)'
                    : 'ISS Battery Pallet Stanchion (Naples, FL, March 2024)'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'El pallet EP9 de 2.630 kg de baterías viejas fue eyectado de la ISS en 2021. El 8 de marzo de 2024, este poste cilíndrico de aleación Inconel (0,725 kg, 10 cm x 4 cm) no se quemó y atravesó el tejado y dos pisos de una casa particular en Naples, Florida.'
                    : 'The 2,630-kg EP9 battery pallet was jettisoned from the ISS in 2021. On March 8, 2024, this 0.725-kg Inconel stanchion survived atmospheric reentry and smashed through the roof and two floors of a residence in Naples, Florida.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Análisis NASA:' : 'NASA Analysis:'}</strong> Laboratorio KSC (abril 2024) ·{' '}
                  <strong>{idioma === 'ES' ? 'Material:' : 'Material:'}</strong> Superaleación Inconel <Refs ids={[59, 60]} />
                </div>
                <a
                  href="https://www.nasa.gov/blogs/spacestation/2024/04/15/nasa-completes-analysis-of-recovered-space-object/"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Informe oficial de NASA Space Station' : 'Official NASA Space Station report'}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN 6: Tabla oficial de Créditos y Licencias del Anexo */}
      {(tabActiva === 'todos' || tabActiva === 'licencias') && (
        <section className="anexo-seccion">
          <div className="anexo-seccion-cabecera">
            <div>
              <h2 className="anexo-seccion-titulo">
                📜{' '}
                {idioma === 'ES'
                  ? 'Tabla Oficial de Créditos y Licencias del Anexo'
                  : 'Official Annex Credits & Licensing Registry'}
              </h2>
              <p className="anexo-seccion-bajada">
                {idioma === 'ES'
                  ? 'Matriz legal y de atribución para los jurados de NASA Space Apps Challenge 2026. Todo el material visual, datos astronómicos y videos cumplen estrictamente con derechos de autor y licencias de dominio público.'
                  : 'Legal attribution matrix prepared for NASA Space Apps Challenge 2026 judges. All imagery, astronomical ephemeris data, and video productions comply with copyright regulations and public domain statutes.'}
              </p>
            </div>
            <span className="anexo-chip-licencia">100% NASA Public Domain / CC</span>
          </div>

          <div className="anexo-tabla-wrapper">
            <table className="anexo-tabla">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{idioma === 'ES' ? 'Título del Activo / Evidencia' : 'Asset / Evidence Title'}</th>
                  <th>{idioma === 'ES' ? 'Escena de la App' : 'App Scene'}</th>
                  <th>{idioma === 'ES' ? 'Archivo o Enlace Primario' : 'File or Primary URL'}</th>
                  <th>{idioma === 'ES' ? 'Crédito Institucional' : 'Institutional Credit'}</th>
                  <th>{idioma === 'ES' ? 'Licencia Legal' : 'Legal License'}</th>
                </tr>
              </thead>
              <tbody>
                {TABLA_LICENCIAS.map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontWeight: 700, color: 'var(--oro)' }}>{row.id}</td>
                    <td>
                      <strong>{row.titulo}</strong>
                    </td>
                    <td>
                      <span className="chip chico">{row.escena}</span>
                    </td>
                    <td>
                      {row.enlace ? (
                        <a
                          href={row.enlace}
                          target="_blank"
                          rel="noreferrer"
                          className="anexo-foto-enlace"
                        >
                          ↗ {row.archivo}
                        </a>
                      ) : (
                        row.archivo
                      )}
                    </td>
                    <td style={{ fontSize: '0.84rem' }}>{row.credito}</td>
                    <td>
                      <span className="anexo-chip-licencia">{row.licencia}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modal Lightbox para ampliar fotografías */}
      {fotoModal && (
        <div className="anexo-lightbox-overlay" onClick={() => setFotoModal(null)}>
          <div className="anexo-lightbox-caja" onClick={(e) => e.stopPropagation()}>
            <img src={fotoModal.src} alt={fotoModal.titulo} />
            <div className="anexo-lightbox-pie">
              <div>
                <strong style={{ color: '#fff', fontSize: '1rem', display: 'block' }}>
                  {fotoModal.titulo}
                </strong>
                <small style={{ color: 'var(--tinta-3)' }}>{fotoModal.credito}</small>
              </div>
              <button
                type="button"
                className="btn chico"
                onClick={() => setFotoModal(null)}
              >
                ✕ {idioma === 'ES' ? 'Cerrar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

