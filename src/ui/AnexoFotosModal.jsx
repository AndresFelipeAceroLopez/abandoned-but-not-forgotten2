import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getLang } from '../i18n';
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
  const storeLang = useAppStore((s) => s.lang);
  const lang = storeLang || getLang() || 'en';
  const es = lang === 'es';
  const idioma = es ? 'ES' : 'EN';

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

  // Tabla oficial de Créditos y Licencias verificadas (100% oficial NASA / LROC / HiRISE)
  const TABLA_LICENCIAS = [
    {
      id: 1,
      titulo:
        idioma === 'ES'
          ? 'Doble cráter de impacto lunar (propulsor de 2022)'
          : 'Lunar double impact crater (mystery 2022 booster)',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 8' : 'Photo Annex & Scene 8',
      tipo: 'orbital',
      archivo: 'doble_crater_2022_lroc.png',
      enlace: 'https://www.lroc.asu.edu/images/1261',
      credito: 'NASA / GSFC / Arizona State University (LROC NAC M1407760984R)',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
    },
    {
      id: 2,
      titulo:
        idioma === 'ES'
          ? 'Apollo 11: Etapa Eagle y retrorreflector láser desde órbita'
          : 'Apollo 11: Eagle descent stage & laser reflector from orbit',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 1 (Luna)' : 'Photo Annex & Scene 1 (Moon)',
      tipo: 'orbital',
      archivo: 'svs4185_apollo11_site.jpg',
      enlace: 'https://svs.gsfc.nasa.gov/cgi-bin/details.cgi?aid=4185',
      credito: 'NASA / GSFC / Arizona State University (LROC NAC M175124932R)',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
    },
    {
      id: 3,
      titulo:
        idioma === 'ES'
          ? 'Apollo 12 y Surveyor 3 visibles juntos (PIA12903)'
          : 'Apollo 12 and Surveyor 3 imaged together (PIA12903)',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 1 (Luna)' : 'Photo Annex & Scene 1 (Moon)',
      tipo: 'orbital',
      archivo: 'pia12903_apollo12_surveyor3.jpg',
      enlace: 'https://photojournal.jpl.nasa.gov/catalog/PIA12903',
      credito: 'NASA / GSFC / Arizona State University / JPL',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
    },
    {
      id: 4,
      titulo:
        idioma === 'ES'
          ? 'Cráter de impacto de la etapa S-IVB del Apollo 13'
          : 'Apollo 13 S-IVB Saturn V stage impact crater',
      escena:
        idioma === 'ES'
          ? 'Anexo Fotos & Escena 12 (Corto 3)'
          : 'Photo Annex & Scene 12 (Short 3)',
      tipo: 'orbital',
      archivo: 'apollo13_sivb_svs.jpg',
      enlace: 'https://svs.gsfc.nasa.gov/4803',
      credito: 'NASA Scientific Visualization Studio / LROC',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
    },
    {
      id: 5,
      titulo:
        idioma === 'ES'
          ? 'Rover de Apollo 15 en estacionamiento final en Hadley Rille'
          : 'Apollo 15 Lunar Roving Vehicle parked at Hadley Rille',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 1 (Luna)' : 'Photo Annex & Scene 1 (Moon)',
      tipo: 'orbital',
      archivo: 'lroc_apollo15_rover.png',
      enlace: 'https://www.lroc.asu.edu/images/1198',
      credito: 'NASA / GSFC / Arizona State University (LROC NAC)',
      licencia: 'Dominio Público NASA / ASU',
    },
    {
      id: 6,
      titulo:
        idioma === 'ES'
          ? 'Apollo 16: Etapa de descenso Orion y rover en Descartes'
          : 'Apollo 16: Orion descent stage and rover oblique view',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 1 (Luna)' : 'Photo Annex & Scene 1 (Moon)',
      tipo: 'orbital',
      archivo: 'lroc_apollo16_details.png',
      enlace: 'https://www.lroc.asu.edu/images/529',
      credito: 'NASA / GSFC / Arizona State University (LROC NAC)',
      licencia: 'Dominio Público NASA / ASU',
    },
    {
      id: 7,
      titulo:
        idioma === 'ES'
          ? 'Apollo 17: Challenger y rover LRV en Taurus-Littrow'
          : 'Apollo 17: Challenger lander and LRV at Taurus-Littrow',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 1 (Luna)' : 'Photo Annex & Scene 1 (Moon)',
      tipo: 'superficie / orbital',
      archivo: 'lroc_apollo17_challenger.jpg',
      enlace: 'https://www.lroc.asu.edu/images/72',
      credito: 'NASA / GSFC / Arizona State University / ALSJ',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
    },
    {
      id: 8,
      titulo:
        idioma === 'ES'
          ? 'Lunokhod 1 y 2: Aterrizador Luna 17 y huellas de rovers'
          : 'Lunokhod 1 & 2: Luna 17 lander and rover tracks on Moon',
      escena:
        idioma === 'ES'
          ? 'Anexo Fotos & Escena 12 (Corto 4)'
          : 'Photo Annex & Scene 12 (Short 4)',
      tipo: 'orbital',
      archivo: 'lroc_lunokhod1.png / lroc_lunokhod2.png',
      enlace: 'https://www.lroc.asu.edu/images/11',
      credito: 'NASA / GSFC / Arizona State University (LROC NAC)',
      licencia: 'Dominio Público NASA / ASU',
    },
    {
      id: 9,
      titulo:
        idioma === 'ES'
          ? 'Chandrayaan-3: Vikram lander y halo en Punto Shiv Shakti'
          : 'Chandrayaan-3: Vikram lander halo at Shiv Shakti point',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 1 (Luna)' : 'Photo Annex & Scene 1 (Moon)',
      tipo: 'orbital',
      archivo: 'lroc_chandrayaan3.png',
      enlace: 'https://www.lroc.asu.edu/images/1314',
      credito: 'NASA / GSFC / Arizona State University (LROC NAC M1447750764LR)',
      licencia: 'Dominio Público NASA / ASU',
    },
    {
      id: 10,
      titulo:
        idioma === 'ES'
          ? 'Perseverance y componentes Mars 2020 en Jezero (PIA24333)'
          : 'Perseverance and Mars 2020 components on surface (PIA24333)',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 2 (Marte)' : 'Photo Annex & Scene 2 (Mars)',
      tipo: 'orbital',
      archivo: 'pia24333_perseverance_edl.jpg',
      enlace: 'https://photojournal.jpl.nasa.gov/catalog/PIA24333',
      credito: 'NASA / JPL-Caltech / University of Arizona (HiRISE)',
      licencia: 'Dominio Público NASA / JPL-Caltech',
    },
    {
      id: 11,
      titulo:
        idioma === 'ES'
          ? 'Manta térmica EDL y red de Dacron en cráter Jezero'
          : 'EDL thermal blanket & Dacron netting in Jezero Crater',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 2 (Marte)' : 'Photo Annex & Scene 2 (Mars)',
      tipo: 'superficie',
      archivo: 'perseverance_thermal_blanket.jpg',
      enlace: 'https://mars.nasa.gov',
      credito: 'NASA / JPL-Caltech (Perseverance Mastcam-Z / Sol 467-495)',
      licencia: 'Dominio Público NASA / JPL-Caltech',
    },
    {
      id: 12,
      titulo:
        idioma === 'ES'
          ? 'Ingenuity en reposo final en Valinor Hills (PIA26237)'
          : 'Ingenuity final resting site at Valinor Hills (PIA26237)',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 2 (Marte)' : 'Photo Annex & Scene 2 (Mars)',
      tipo: 'superficie',
      archivo: 'pia26237_ingenuity_valinor.jpg',
      enlace: 'https://photojournal.jpl.nasa.gov/catalog/PIA26237',
      credito: 'NASA / JPL-Caltech / ASU / MSSS',
      licencia: 'Dominio Público NASA / JPL-Caltech',
    },
    {
      id: 13,
      titulo:
        idioma === 'ES'
          ? 'Curiosity: Vista cenital desde órbita (PIA15696)'
          : 'Curiosity overhead view from Mars orbit (PIA15696)',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 2 (Marte)' : 'Photo Annex & Scene 2 (Mars)',
      tipo: 'orbital',
      archivo: 'pia15696_curiosity_overhead.jpg',
      enlace: 'https://photojournal.jpl.nasa.gov/catalog/PIA15696',
      credito: 'NASA / JPL-Caltech / Univ. of Arizona / USGS (HiRISE)',
      licencia: 'Dominio Público NASA / JPL-Caltech',
    },
    {
      id: 14,
      titulo:
        idioma === 'ES'
          ? 'Curiosity: Desgaste severo en ruedas de aluminio (PIA21486)'
          : 'Curiosity wheel aluminum tread fatigue and punctures',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 2 (Marte)' : 'Photo Annex & Scene 2 (Mars)',
      tipo: 'superficie',
      archivo: 'curiosity_wheel_wear.jpg',
      enlace: 'https://images.nasa.gov/details/PIA21486',
      credito: 'NASA / JPL-Caltech (Curiosity MAHLI)',
      licencia: 'Dominio Público NASA / JPL-Caltech',
    },
    {
      id: 15,
      titulo:
        idioma === 'ES'
          ? 'InSight: Aterrizador, escudo y paracaídas en Elysium Planitia'
          : 'InSight lander, heat shield and parachute on Mars surface',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 2 (Marte)' : 'Photo Annex & Scene 2 (Mars)',
      tipo: 'orbital',
      archivo: 'hirise_insight.jpg',
      enlace: 'https://hirise.lpl.arizona.edu/ESP_058005_1845',
      credito: 'NASA / JPL-Caltech / UArizona (HiRISE)',
      licencia: 'Dominio Público NASA / UArizona',
    },
    {
      id: 16,
      titulo:
        idioma === 'ES'
          ? 'Phoenix: Descenso con paracaídas y escudo térmico en caída libre'
          : 'Phoenix descent with parachute and free-fall heat shield',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 2 (Marte)' : 'Photo Annex & Scene 2 (Mars)',
      tipo: 'orbital',
      archivo: 'hirise_phoenix_descent.jpg',
      enlace: 'https://hirise.lpl.arizona.edu/releases/phoenix-descent-color.php',
      credito: 'NASA / JPL-Caltech / UArizona (HiRISE PSP_008579_9020)',
      licencia: 'Dominio Público NASA / UArizona',
    },
    {
      id: 17,
      titulo:
        idioma === 'ES'
          ? 'Zhurong y Tianwen-1: Plataforma, rover y paracaídas en Utopia'
          : 'Tianwen-1 lander and Zhurong rover in Utopia Planitia',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 2 (Marte)' : 'Photo Annex & Scene 2 (Mars)',
      tipo: 'orbital',
      archivo: 'hirise_zhurong.jpg',
      enlace: 'https://hirise.lpl.arizona.edu/ESP_069665_2055',
      credito: 'NASA / JPL-Caltech / UArizona (HiRISE ESP_069665_2055)',
      licencia: 'Dominio Público NASA / UArizona',
    },
    {
      id: 18,
      titulo:
        idioma === 'ES'
          ? 'Visualización orbital: Satélites y basura en órbita terrestre'
          : 'Scientific visualization: Tracking satellites & space debris',
      escena:
        idioma === 'ES'
          ? 'Anexo Fotos & Escena 0 (Prólogo)'
          : 'Photo Annex & Scene 0 (Prologue)',
      tipo: 'visualización',
      archivo: 'svs5258_earth_orbit_debris.jpg',
      enlace: 'https://svs.gsfc.nasa.gov/5258',
      credito: 'NASA Scientific Visualization Studio (SVS 5258)',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
    },
    {
      id: 19,
      titulo:
        idioma === 'ES'
          ? 'Bolsa de herramientas en órbita (EVA STS-126)'
          : 'EVA crew lock tool bag floating in orbit (STS-126)',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 6 (Daños)' : 'Photo Annex & Scene 6 (Damage)',
      tipo: 'orbital',
      archivo: 'eva_tool_bag_2008.jpg',
      enlace: 'https://images.nasa.gov',
      credito: 'NASA (Heidemarie Stefanyshyn-Piper, ISS018-E-009413)',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
    },
    {
      id: 20,
      titulo:
        idioma === 'ES'
          ? 'Soporte Inconel de pallet de baterías de la ISS (Naples, FL)'
          : 'ISS battery pallet Inconel stanchion (Naples, FL)',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 6 (Daños)' : 'Photo Annex & Scene 6 (Damage)',
      tipo: 'superficie (reentrada)',
      archivo: 'florida_stanchion_nasa.png',
      enlace:
        'https://www.nasa.gov/blogs/spacestation/2024/04/15/nasa-completes-analysis-of-recovered-space-object/',
      credito: 'NASA Kennedy Space Center / Materials Analysis Lab',
      licencia: 'Dominio Público NASA (17 U.S.C. § 105)',
    },
    {
      id: 21,
      titulo:
        idioma === 'ES'
          ? 'Catálogo oficial de Impactos y Artefactos Antropogénicos en la Luna'
          : 'Master Table of Anthropogenic Impacts and Artifacts on the Moon',
      escena: idioma === 'ES' ? 'Anexo Fotos & Escena 1 (Luna)' : 'Photo Annex & Scene 1 (Moon)',
      tipo: 'catálogo oficial',
      archivo: 'NSSDCA Master Catalog (96 filas)',
      enlace: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html',
      credito: 'NASA National Space Science Data Center (NSSDCA)',
      licencia: 'Datos Abiertos Oficiales (Gobierno Federal de EE. UU.)',
    },
  ];

  const handleCerrar = () => {
    if (anteriorEscena) {
      anteriorEscena();
    } else {
      setEscena('prologo');
    }
  };

  return (
    <div
      className="escena-scroll anexo-contenedor"
      tabIndex={0}
      role="region"
      aria-label={idioma === 'ES' ? 'Fotos Reales y Objetos Perdidos' : 'Real Photos & Lost Objects'}
      onWheel={(e) => e.stopPropagation()}
      style={{ overflowY: 'auto' }}
    >
      {/* Cabecera Principal */}
      <div className="anexo-header">
        <div className="anexo-header-info">
          <div className="anexo-badge-anexo">
            {idioma === 'ES'
              ? 'Anexo Documental Oficial · Fotos y Videos'
              : 'Official Documentary Annex · Photos & Videos'}
          </div>
          <h1 className="anexo-titulo">
            {idioma === 'ES'
              ? 'Fotos Reales y Objetos Perdidos'
              : 'Real Photos & Lost Lunar Artifacts'}
          </h1>
          <p className="anexo-subtitulo">
            {idioma === 'ES'
              ? modo === 'ninos'
                ? 'Fotografías 100% oficiales de NASA, LROC y HiRISE que demuestran qué pasó de verdad con los artefactos que dejamos en el espacio, la Luna y Marte.'
                : 'Evidencia fotográfica primaria y catálogo verificado de impactos extraterrestres: cámaras orbitales LROC (ASU), HiRISE (University of Arizona), rovers en Marte y análisis balístico de fragmentos recuperados en la Tierra.'
              : modo === 'ninos'
              ? '100% official NASA, LROC, and HiRISE imagery showing what actually happened to the hardware we left behind on the Moon, Mars, and in Earth orbit.'
              : 'Primary photographic evidence and verified extraterrestrial impact registry: LROC NAC (ASU), HiRISE (University of Arizona), Mars rover imaging, and ballistic laboratory forensics on recovered debris.'}
          </p>
        </div>

        {/* Controles Superiores: Modo, Idioma, Cerrar */}
        <div className="anexo-controles-superiores">
          {/* Selector de Modo */}
          <div className="modo-toggle" role="group" aria-label="Modo de lectura">
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

          {/* Botón de Cerrar / Volver */}
          <button
            type="button"
            className="anexo-btn-cerrar"
            onClick={handleCerrar}
            title={idioma === 'ES' ? 'Volver a la experiencia' : 'Back to exploration'}
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

      {/* PESTAÑA 1: 🚀 Cohete no identificado de 2022 (Impacto en la Luna) */}
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
                  ? 'El 4 de marzo de 2022, un propulsor sin control chocó contra la cara oculta de la Luna, cerca del cráter Hertzsprung. La cámara LROC de NASA descubrió un cráter doble inusual de ~29 m de largo, confirmando dos masas pesadas en sus extremos.'
                  : 'On March 4, 2022, an uncontrolled rocket booster struck the lunar farside near Hertzsprung crater. NASA\'s LROC camera revealed an unprecedented ~29-meter double crater, proving substantial concentrated masses at opposite ends.'}
              </p>
            </div>
            <span className="anexo-chip-codigo">LROC ASU #1261 · 4-mar-2022</span>
          </div>

          <div className="anexo-foto-grid">
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/doble_crater_2022_lroc.png`,
                    titulo:
                      idioma === 'ES'
                        ? 'Doble cráter de impacto en la cara oculta (LROC NAC M1407760984R)'
                        : 'Lunar farside double crater impact (LROC NAC M1407760984R)',
                    credito: 'NASA / GSFC / Arizona State University',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/doble_crater_2022_lroc.png`}
                  alt="Doble cráter lunar de 2022"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  LROC NAC · NASA / GSFC / Arizona State University
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Cráter doble de ~29 m (Este 18 m, Oeste 16 m)'
                    : '~29 m Double Crater (Eastern 18 m, Western 16 m)'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? modo === 'ninos'
                      ? 'Ningún cohete había hecho dos agujeros pegados en la Luna. El impacto fue tan violento que dejó dos cráteres fusionados porque llevaba dos cargas muy pesadas en lados opuestos.'
                      : 'Las etapas gastadas (como los S-IVB) concentran la masa en el motor y cavan cráteres circulares simples. La formación de cráter doble requería una segunda masa de magnitud comparable en la parte delantera.'
                    : modo === 'ninos'
                    ? 'No spent booster had ever left twin overlapping craters on the Moon. It formed a double impact because it carried heavy masses at opposite ends.'
                    : 'Typical spent rocket stages concentrate their mass at the engine, forming single circular depressions. This dual formation indicates an unannounced substantial payload at the front end.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Ubicación:' : 'Location:'}</strong> 5.226° N, 234.486° E (Cerca de Hertzsprung) ·{' '}
                  <strong>{idioma === 'ES' ? 'Designación:' : 'Designation:'}</strong> Objeto WE0913A / Chang&apos;e 5-T1 booster <Refs ids={[26, 28]} />
                </div>
                <a
                  href="https://www.lroc.asu.edu/images/1261"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Publicación oficial en LROC ASU' : 'Official release at LROC ASU'}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PESTAÑA 2: 🌑 Los 18 Objetos Lunares Perdidos (Código NSSDCA "g") */}
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
                  ? 'De las 96 filas del catálogo oficial NSSDCA de la NASA, exactamente 18 objetos quedaron en órbita lunar sin seguimiento activo. Debido a las concentraciones de masa gravitacional de la Luna (mascons), sus órbitas se volvieron inestables y cayeron en coordenadas no determinadas (lat: null, lon: null).'
                  : 'From NASA\'s 96-row NSSDCA lunar catalog, exactly 18 objects were left in unmonitored lunar orbit. Lunar gravitational mass concentrations (mascons) destabilized their trajectories, resulting in impacts at unknown coordinates (lat: null, lon: null).'}
              </p>
            </div>
            <span className="anexo-chip-codigo">NSSDCA Code &quot;g&quot; · 18 Objetos</span>
          </div>

          <div className="anexo-perdidos-intro-caja">
            <p>
              <strong>{idioma === 'ES' ? '¿Por qué no se sabe dónde están?' : 'Why are their crash sites unknown?'}</strong>{' '}
              {idioma === 'ES'
                ? 'La Luna no tiene una atmósfera densa que frene de manera predecible, pero sus mares de basalto generan anomalías gravitatorias ("mascons") que tuercen las órbitas bajas hasta hacerlas estrellar de forma caótica. Incluye reliquias de gran valor histórico como el brazo extensible del espectrómetro de masa del Apollo 16 y las etapas de ascenso de Apollo 11 y 16.'
                : 'The Moon lacks an atmosphere to decelerate craft predictably, but its basaltic mare generate gravitational mascons that perturb low lunar orbits into chaotic decay. These include historic relics such as the Apollo 16 mass spectrometer boom and Apollo 11/16 ascent stages.'}{' '}
              <Refs ids={[2, 8]} />
            </p>
          </div>

          {/* Buscador de objetos perdidos */}
          <div className="anexo-filtro-perdidos">
            <input
              type="text"
              value={filtroPerdidos}
              onChange={(e) => setFiltroPerdidos(e.target.value)}
              placeholder={
                idioma === 'ES'
                  ? 'Buscar entre los 18 objetos (ej: Apollo 16, Luna, Eagle, brazo...)'
                  : 'Search among the 18 lost objects (e.g. Apollo 16, Luna, Eagle, boom...)'
              }
              className="anexo-input-filtro"
            />
            <small style={{ color: 'var(--tinta-3)' }}>
              {perdidosFiltrados.length} / {OBJETOS_PERDIDOS_18.length}{' '}
              {idioma === 'ES' ? 'objetos encontrados' : 'objects matched'}
            </small>
          </div>

          {/* Tabla de los 18 objetos perdidos */}
          <div className="anexo-tabla-wrapper">
            <table className="anexo-tabla">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{idioma === 'ES' ? 'Artefacto / Objeto' : 'Artifact / Object'}</th>
                  <th>{idioma === 'ES' ? 'Misión / Programa' : 'Mission / Program'}</th>
                  <th>{idioma === 'ES' ? 'Fecha' : 'Date'}</th>
                  <th>{idioma === 'ES' ? 'Código NSSDCA' : 'NSSDCA Code'}</th>
                  <th>{idioma === 'ES' ? 'Causa de pérdida y contexto científico' : 'Loss Context & Details'}</th>
                </tr>
              </thead>
              <tbody>
                {perdidosFiltrados.map((obj, idx) => (
                  <tr key={obj.id || idx}>
                    <td style={{ color: 'var(--oro)', fontWeight: 700 }}>{idx + 1}</td>
                    <td>
                      <strong>{obj.nombre}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--tinta-3)' }}>{obj.objeto}</div>
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
                    <td style={{ fontSize: '0.84rem', color: 'var(--tinta-2)', maxWidth: 440 }}>
                      {modo === 'ninos'
                        ? obj.texto?.ninos || 'Quedó orbitando la Luna hasta estrellarse en un punto no identificado.'
                        : obj.texto?.org || 'Órbita decaída por mascons sin telemetría de impacto registrada.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* PESTAÑA 3: 🛰️ Verificados por LRO (Código NSSDCA "d") */}
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
                  ? 'El orbitador LRO de NASA ha fotografiado con resolución de hasta 50 cm/px más de 47 sitios de artefactos humanos en la Luna, confirmando huellas de astronautas, etapas de descenso, sismómetros ALSEP, reflectores láser y rovers robóticos.'
                  : 'NASA\'s LRO Narrow Angle Camera has photographed over 47 human artifact sites on the Moon with sub-meter resolution, confirming astronaut tracks, descent stages, laser retroreflectors, and robotic rovers.'}
              </p>
            </div>
            <span className="anexo-chip-codigo">LROC NAC / SVS Oficial</span>
          </div>

          <div className="anexo-foto-grid">
            {/* Foto: Apollo 11 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/svs4185_apollo11_site.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Sitio de alunizaje del Apollo 11 visto desde baja órbita por LRO'
                        : 'Apollo 11 Landing Site from Low Orbit by LRO',
                    credito: 'NASA / GSFC / Arizona State University (LROC NAC M175124932R)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/svs4185_apollo11_site.jpg`}
                  alt="Apollo 11 sitio de alunizaje LROC"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  NASA / GSFC / ASU · Apollo 11 Tranquility Base
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Apollo 11: Etapa Eagle y Retrorreflector Láser'
                    : 'Apollo 11: Eagle Stage & Laser Retroreflector'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'Visible la etapa de descenso del Eagle, el paquete de experimentos EASEP con su retrorreflector láser de cubos de cuarzo y los senderos oscuros formados por las pisadas de Armstrong y Aldrin sobre el regolito.'
                    : 'Shows the Eagle descent stage, the EASEP laser retroreflector array, and the darker footpaths trampled by Neil Armstrong and Buzz Aldrin across the lunar regolith.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Coordenadas:' : 'Coordinates:'}</strong> 0.67408° N, 23.47297° E · Mare Tranquillitatis <Refs ids={[2, 11]} />
                </div>
                <a
                  href="https://svs.gsfc.nasa.gov/cgi-bin/details.cgi?aid=4185"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Detalle completo en NASA SVS' : 'Full dataset at NASA SVS'}
                </a>
              </div>
            </div>

            {/* Foto: Apollo 12 y Surveyor 3 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/pia12903_apollo12_surveyor3.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Apollo 12 y Surveyor 3 fotografiados juntos (PIA12903)'
                        : 'Apollo 12 and Surveyor 3 imaged together (PIA12903)',
                    credito: 'NASA / GSFC / Arizona State University / JPL',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/pia12903_apollo12_surveyor3.jpg`}
                  alt="Apollo 12 y Surveyor 3 juntos"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  NASA / GSFC / ASU / JPL · PIA12903
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Apollo 12 y Sonda Surveyor 3 a 180 metros'
                    : 'Apollo 12 & Surveyor 3 Probe (180 m apart)'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'Pete Conrad y Alan Bean alunizaron a pasos de la sonda robótica Surveyor 3 lanzada en 1967. Es la primera y única vez que astronautas visitaron una nave robótica enviada previamente a otro mundo.'
                    : 'Astronauts Pete Conrad and Alan Bean landed within walking distance of the 1967 robotic Surveyor 3 lander—the only time humans have retrieved components from a robotic craft on another celestial body.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Ubicación:' : 'Location:'}</strong> Oceanus Procellarum · 3.0124° S, 23.4216° W
                </div>
                <a
                  href="https://photojournal.jpl.nasa.gov/catalog/PIA12903"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ver en JPL Photojournal' : 'View on JPL Photojournal'}
                </a>
              </div>
            </div>

            {/* Foto: S-IVB Apollo 13 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/apollo13_sivb_svs.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Cráter de impacto de la etapa S-IVB de Apollo 13'
                        : 'Apollo 13 S-IVB Stage Impact Crater',
                    credito: 'NASA Scientific Visualization Studio / LROC',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/apollo13_sivb_svs.jpg`}
                  alt="Cráter del cohete Apollo 13 en la Luna"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  NASA SVS / LROC · 2.5550° S, 27.8875° W
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Etapa S-IVB Apollo 13: Impacto Sísmico Deliberado'
                    : 'Apollo 13 S-IVB: Deliberate Seismic Impact'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'Estrellada el 15-abr-1970 a 9.200 km/h. La energía cinética equivalente a 11 toneladas de TNT fue registrada por el sismómetro del Apollo 12 durante más de 3 horas, calibrando la corteza lunar.'
                    : 'Deliberately crashed on April 15, 1970 at 9,200 km/h. The kinetic impact shockwave was recorded by the Apollo 12 seismometer for over 3 hours, calibrating the lunar interior.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Cráter:' : 'Crater:'}</strong> ~30 m · <strong>{idioma === 'ES' ? 'Masa seca:' : 'Dry mass:'}</strong> 13.925 kg <Refs ids={[27, 8]} />
                </div>
                <a
                  href="https://svs.gsfc.nasa.gov/4803"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Visualización y datos en NASA SVS' : 'Data visualization at NASA SVS'}
                </a>
              </div>
            </div>

            {/* Foto: Rover Apollo 15 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/lroc_apollo15_rover.png`,
                    titulo:
                      idioma === 'ES'
                        ? 'Rover de Apollo 15 en estacionamiento final junto al Falcon'
                        : 'Apollo 15 LRV parked at Hadley Rille',
                    credito: 'NASA / GSFC / Arizona State University (LROC NAC)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/lroc_apollo15_rover.png`}
                  alt="Rover de Apollo 15 visto por LRO"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  LROC NAC · NASA / GSFC / ASU
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Apollo 15: Rover Lunar LRV-1 Estacionado'
                    : 'Apollo 15: LRV-1 Parked at Hadley'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'El primer vehículo conducido por humanos en otro mundo quedó aparcado a 100 m del módulo Falcon para televisar el despegue de regreso a la Tierra. Sigue intacto en Hadley Rille.'
                    : 'The first manned vehicle driven on another celestial body was parked 100 meters away from the Falcon lander to broadcast liftoff back to Earth.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Coordenadas:' : 'Coordinates:'}</strong> 26.1322° N, 3.6339° E · Hadley-Apennine
                </div>
                <a
                  href="https://www.lroc.asu.edu/images/1198"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Informe en LROC ASU' : 'Report at LROC ASU'}
                </a>
              </div>
            </div>

            {/* Foto: Apollo 16 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/lroc_apollo16_details.png`,
                    titulo:
                      idioma === 'ES'
                        ? 'Apollo 16: Vista oblicua de la etapa Orion y rover LRV-2'
                        : 'Apollo 16: Oblique view of Orion stage and LRV-2',
                    credito: 'NASA / GSFC / Arizona State University (LROC NAC)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/lroc_apollo16_details.png`}
                  alt="Apollo 16 Orion y Rover LROC"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  LROC NAC · NASA / GSFC / ASU
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Apollo 16: Etapa Orion y Rover en Descartes'
                    : 'Apollo 16: Orion Descent Stage & LRV-2'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'Perspectiva oblicua tomada a baja cota por LRO. Muestra la etapa de descenso dorada en el centro y las rodadas del rover lunar que exploró las tierras altas de Descartes.'
                    : 'Oblique perspective acquired by LRO NAC, showing the golden descent stage and wheel ruts across the Descartes highlands.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Ubicación:' : 'Location:'}</strong> 8.9730° S, 15.5002° E · Descartes Highlands
                </div>
                <a
                  href="https://www.lroc.asu.edu/images/529"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ver en LROC ASU' : 'View on LROC ASU'}
                </a>
              </div>
            </div>

            {/* Foto: Lunokhod 1 y 2 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/lroc_lunokhod1.png`,
                    titulo:
                      idioma === 'ES'
                        ? 'Lunokhod 1 en su posición final en Mare Imbrium (LROC NAC)'
                        : 'Lunokhod 1 in final parking spot on Mare Imbrium (LROC NAC)',
                    credito: 'NASA / GSFC / Arizona State University',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/lroc_lunokhod1.png`}
                  alt="Lunokhod 1 y Luna 17 LROC"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  LROC NAC · NASA / GSFC / ASU
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Lunokhod 1 y 2: Rovers y Retrorreflectores'
                    : 'Lunokhod 1 & 2: Robotic Rovers & Reflectors'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'El aterrizador Luna 17 y el rover Lunokhod 1 (1970). Tras recorrer 10 km, su retrorreflector láser de fabricación francesa fue relocalizado por LRO en 2010 y sigue devolviendo fotones.'
                    : 'Luna 17 and Lunokhod 1 (1970). After driving 10 km, its French corner-cube laser reflector was relocated by LRO in 2010 and continues returning laser pulses today.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Ubicación:' : 'Location:'}</strong> Mare Imbrium (38.315° N, 324.992° E) & Le Monnier <Refs ids={[11]} />
                </div>
                <a
                  href="https://www.lroc.asu.edu/images/11"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Artículo oficial en LROC ASU' : 'Official post at LROC ASU'}
                </a>
              </div>
            </div>

            {/* Foto: Chandrayaan-3 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/lroc_chandrayaan3.png`,
                    titulo:
                      idioma === 'ES'
                        ? 'Chandrayaan-3 Vikram lander en el Punto Shiv Shakti (LROC M1447750764LR)'
                        : 'Chandrayaan-3 Vikram lander at Shiv Shakti Point (LROC M1447750764LR)',
                    credito: 'NASA / GSFC / Arizona State University (LROC NAC)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/lroc_chandrayaan3.png`}
                  alt="Chandrayaan-3 Vikram lander visto por LRO"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  LROC NAC · M1447750764LR · NASA / ASU
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Chandrayaan-3: Alunizaje en el Polo Sur Lunar'
                    : 'Chandrayaan-3: South Polar Landing'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'El módulo Vikram de ISRO fotografiado cuatro días después de alunizar el 23 de agosto de 2023. Se aprecia el halo brillante de regolito barrido por el motor de descenso.'
                    : 'ISRO\'s Vikram lander photographed 4 days after touching down on August 23, 2023. Shows a bright blast halo produced by the rocket plume interacting with soil.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Coordenadas:' : 'Coordinates:'}</strong> 69.373° S, 32.319° E · Punto Shiv Shakti
                </div>
                <a
                  href="https://www.lroc.asu.edu/images/1314"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ver comunicado oficial en LROC' : 'Official release at LROC ASU'}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PESTAÑA 4: 🔴 Fotos en Marte (Solo NASA / JPL / HiRISE) */}
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
                  ? 'En Marte se acumulan más de 7.119 kg de artefactos de 14 misiones (Kilic, 2022). Las cámaras HiRISE de MRO y los rovers han capturado las piezas desprendidas del aterrizaje, roturas mecánicas por rocas y reliquias en reposo definitivo.'
                  : 'Over 7,119 kg of anthropogenic hardware across 18 objects rest on Mars (Kilic, 2022). MRO HiRISE and rover cameras have documented entry descent hardware, mechanical wear, and permanent relics.'}
              </p>
            </div>
            <span className="anexo-chip-codigo">HiRISE UArizona & NASA JPL</span>
          </div>

          <div className="anexo-foto-grid">
            {/* Foto: Perseverance componentes EDL */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/pia24333_perseverance_edl.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Perseverance y componentes de aterrizaje esparcidos en Jezero (PIA24333)'
                        : 'Perseverance & Landing Components Scattered in Jezero (PIA24333)',
                    credito: 'NASA / JPL-Caltech / University of Arizona (HiRISE)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/pia24333_perseverance_edl.jpg`}
                  alt="Perseverance componentes en Jezero"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  NASA / JPL / UArizona · PIA24333
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Perseverance: Componentes de Aterrizaje en Jezero'
                    : 'Perseverance: Mars 2020 EDL Hardware'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'HiRISE captó todos los restos del aterrizaje de febrero de 2021: el escudo térmico descartado, el paracaídas supersónico junto a la cubierta trasera, la etapa de descenso (Sky Crane) y el rover en su primer rodaje.'
                    : 'HiRISE captured all components of the February 2021 landing: the heat shield, supersonic parachute, backshell, crashed sky crane, and the rover itself.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Masa descartada:' : 'Discarded mass:'}</strong> ~1.500 kg en componentes EDL <Refs ids={[37]} />
                </div>
                <a
                  href="https://photojournal.jpl.nasa.gov/catalog/PIA24333"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ficha en JPL Photojournal' : 'Record at JPL Photojournal'}
                </a>
              </div>
            </div>

            {/* Foto: Manta térmica Perseverance */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/perseverance_thermal_blanket.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Red de Dacron y manta térmica arrastrada por el viento marciano'
                        : 'Dacron netting and thermal blanket blown by Martian wind',
                    credito: 'NASA / JPL-Caltech',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/perseverance_thermal_blanket.jpg`}
                  alt="Manta térmica y red en rocas de Marte"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  NASA / JPL-Caltech · Sol 467-495
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Red de Dacron y Manta Térmica en Rocas de Jezero'
                    : 'Dacron Netting & Thermal Foil in Jezero'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'Encontrada por Perseverance a 2 km del sitio del Sky Crane. El viento marciano arrastró esta fibra de poliéster y lámina de aislamiento térmico hasta enredarse en las piedras del delta.'
                    : 'Spotted by Perseverance 2 km from the descent stage crash site. Martian winds carried this polyester Dacron netting and thermal blanket across the rocky delta floor.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Fecha hallazgo:' : 'Discovery date:'}</strong> 12-jul-2022 (Sol 495) <Refs ids={[37, 103]} />
                </div>
                <a
                  href="https://theconversation.com/mars-is-littered-with-15-694-pounds-of-human-trash-from-50-years-of-robotic-exploration-188881"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Estudio del Dr. Kilic en The Conversation' : 'Dr. Kilic study in The Conversation'}
                </a>
              </div>
            </div>

            {/* Foto: Ingenuity Valinor Hills */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/pia26237_ingenuity_valinor.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Ingenuity en su reposo definitivo en Valinor Hills (PIA26237)'
                        : 'Ingenuity final resting location at Valinor Hills (PIA26237)',
                    credito: 'NASA / JPL-Caltech / ASU / MSSS',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/pia26237_ingenuity_valinor.jpg`}
                  alt="Ingenuity en Valinor Hills"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  NASA / JPL / MSSS · PIA26237
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Ingenuity en Valinor Hills (72 Vuelos Históricos)'
                    : 'Ingenuity at Valinor Hills (72 Flights)'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'Tras superar en 14 veces su vida prevista, una pala de rotor se dañó durante el aterrizaje del vuelo 72. Permanece inmóvil en las dunas de Jezero como el primer artefacto volador en otro planeta.'
                    : 'After surviving 14x its expected lifetime, a rotor blade broke during Flight 72 landing. It rests permanently in Jezero sand dunes as humanity\'s first interplanetary aircraft.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Estado:' : 'Status:'}</strong> Reliquia histórica in situ (enero 2024)
                </div>
                <a
                  href="https://photojournal.jpl.nasa.gov/catalog/PIA26237"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ficha oficial en JPL Photojournal' : 'Official record at JPL Photojournal'}
                </a>
              </div>
            </div>

            {/* Foto: Curiosity desde órbita */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/pia15696_curiosity_overhead.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Curiosity visto desde órbita casi vertical por MRO HiRISE (PIA15696)'
                        : 'Curiosity seen from near-vertical orbit by MRO HiRISE (PIA15696)',
                    credito: 'NASA / JPL-Caltech / Univ. of Arizona / USGS',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/pia15696_curiosity_overhead.jpg`}
                  alt="Curiosity desde órbita HiRISE"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  HiRISE · NASA / JPL / UArizona · PIA15696
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Curiosity: Vista Cenital desde Órbita'
                    : 'Curiosity: Overhead Orbiter View'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'La cámara HiRISE de la sonda MRO apuntó directo hacia el rover en el cráter Gale. Se distinguen las dos extensiones brillantes de su mástil y el cuerpo de 899 kg.'
                    : 'MRO HiRISE acquired this near-zenith view of Curiosity in Gale Crater. The rover mast and its 899-kg chassis are sharply resolved against the bedrock.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Resolución:' : 'Resolution:'}</strong> ~25 cm/pixel · Cráter Gale
                </div>
                <a
                  href="https://www.jpl.nasa.gov/images/pia15696-orbiter-view-of-curiosity-from-nearly-straight-overhead/"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ver en JPL NASA' : 'View on NASA JPL'}
                </a>
              </div>
            </div>

            {/* Foto: Desgaste en ruedas Curiosity */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/curiosity_wheel_wear.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Desgaste severo en ruedas de aluminio de Curiosity (PIA21486)'
                        : 'Curiosity aluminum wheel tread wear and punctures (PIA21486)',
                    credito: 'NASA / JPL-Caltech (Curiosity MAHLI)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/curiosity_wheel_wear.jpg`}
                  alt="Desgaste en ruedas de Curiosity"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  NASA / JPL-Caltech · PIA21486
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Curiosity: Fatiga y Roturas en Ruedas de Aluminio'
                    : 'Curiosity: Aluminum Tread Fatigue'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'Las afiladas rocas piramidales (ventifactos) de Gale desgarraron las bandas de aluminio de 0,75 mm. Este desgaste forzó a NASA a replantear el diseño de ruedas para Perseverance.'
                    : 'Sharp ventifact rocks in Gale Crater punctured the 0.75 mm aluminum skin. This wear prompted NASA engineers to redesign wheel treads for Perseverance.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Cámara:' : 'Camera:'}</strong> MAHLI · Catálogo PIA21486
                </div>
                <a
                  href="https://images.nasa.gov/details/PIA21486"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ficha en NASA Images' : 'Record at NASA Images'}
                </a>
              </div>
            </div>

            {/* Foto: InSight en Elysium */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/hirise_insight.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'InSight: Aterrizador, escudo y paracaídas en Elysium Planitia'
                        : 'InSight lander, heat shield and parachute in Elysium Planitia',
                    credito: 'NASA / JPL-Caltech / UArizona (HiRISE ESP_058005_1845)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/hirise_insight.jpg`}
                  alt="InSight en Marte HiRISE"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  HiRISE · NASA / JPL / UArizona
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'InSight: Estación Sísmica y Desechos EDL'
                    : 'InSight: Seismic Lander & EDL Hardware'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'HiRISE fotografió el módulo de aterrizaje en el centro con sus paneles circulares de 6 metros, el escudo térmico brillante arriba a la derecha y el paracaídas abajo a la izquierda.'
                    : 'HiRISE imaged the lander with its 6-meter circular solar arrays, the bright heat shield (top right), and the discarded parachute (bottom left).' }
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Ubicación:' : 'Location:'}</strong> Elysium Planitia (4.502° N, 135.623° E)
                </div>
                <a
                  href="https://hirise.lpl.arizona.edu/ESP_058005_1845"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ver en HiRISE UArizona' : 'View on HiRISE UArizona'}
                </a>
              </div>
            </div>

            {/* Foto: Phoenix descenso */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/hirise_phoenix_descent.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Phoenix: Descenso con paracaídas y escudo térmico en caída libre'
                        : 'Phoenix descent with parachute and free-falling heat shield',
                    credito: 'NASA / JPL-Caltech / UArizona (HiRISE PSP_008579_9020)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/hirise_phoenix_descent.jpg`}
                  alt="Phoenix descenso en paracaídas HiRISE"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  HiRISE · NASA / JPL / UArizona
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Phoenix: Paracaídas y Escudo en Caída Libre'
                    : 'Phoenix: Parachute & Falling Heat Shield'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'Primera fotografía en la historia de una nave aterrizando en otro planeta captada por otra nave en órbita. Debajo del módulo se distingue el punto oscuro del escudo térmico eyectado.'
                    : 'The first photograph in human history of a spacecraft landing on another planet captured in-flight by an orbiting probe. The dark dot below is the falling heat shield.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Fecha:' : 'Date:'}</strong> 25-may-2008 · Vastitas Borealis
                </div>
                <a
                  href="https://hirise.lpl.arizona.edu/releases/phoenix-descent-color.php"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Publicación en HiRISE' : 'Release at HiRISE'}
                </a>
              </div>
            </div>

            {/* Foto: Zhurong y Tianwen-1 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/hirise_zhurong.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Zhurong y Tianwen-1 en Utopia Planitia (HiRISE ESP_069665_2055)'
                        : 'Tianwen-1 lander and Zhurong rover in Utopia Planitia',
                    credito: 'NASA / JPL-Caltech / UArizona (HiRISE)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/hirise_zhurong.jpg`}
                  alt="Tianwen-1 y Zhurong HiRISE"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  HiRISE · NASA / JPL / UArizona
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Zhurong y Tianwen-1: Módulo y Paracaídas'
                    : 'Tianwen-1 & Zhurong: Lander & Parachute'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'La misión china Tianwen-1 fotografiada en Utopia Planitia el 6 de junio de 2021. Se aprecian la plataforma con su halo de impacto, el rover al sur y los restos del escudo y paracaídas.'
                    : 'China\'s Tianwen-1 mission in Utopia Planitia on June 6, 2021. The lander blast pattern, the rover southwards, and the parachute/backshell are distinctly visible.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Ubicación:' : 'Location:'}</strong> Utopia Planitia (25.066° N, 109.925° E)
                </div>
                <a
                  href="https://hirise.lpl.arizona.edu/ESP_069665_2055"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ver en HiRISE UArizona' : 'View on HiRISE UArizona'}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PESTAÑA 5: 🛠️ Bolsa EVA & Daños Tierra */}
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
                  ? 'La basura espacial no siempre se queda en órbita. Casos documentados de objetos extraviados durante paseos espaciales y reentradas incontroladas que han causado impactos en estructuras habitadas.'
                  : 'Space debris does not remain indefinitely in orbit. Documented incidents of items lost during spacewalks and uncontrolled reentries penetrating inhabited residential structures.'}
              </p>
            </div>
            <span className="anexo-chip-codigo">Escena 6 Daños Colaterales</span>
          </div>

          <div className="anexo-foto-grid">
            {/* Foto: Visualización orbital SVS 5258 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/svs5258_earth_orbit_debris.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Visualización orbital de satélites y basura espacial (NASA SVS 5258)'
                        : 'Orbital visualization: Satellites & debris in Earth orbit (NASA SVS 5258)',
                    credito: 'NASA Scientific Visualization Studio',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/svs5258_earth_orbit_debris.jpg`}
                  alt="Satélites y desechos en órbita terrestre SVS 5258"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  NASA SVS 5258 · Feb 2024
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Monitoreo de Satélites y Desechos en Órbita Terrestre'
                    : 'Tracking Satellites & Space Debris in Orbit'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'Visualización oficial desarrollada por NASA SVS con datos de Space Surveillance Network. Ilustra la densa envoltura de satélites activos y miles de etapas de cohete y fragmentos en órbita LEO y GEO.'
                    : 'Official visualization by NASA SVS using Space Surveillance Network data. Depicts the dense shell of active satellites and spent rocket boosters in LEO and GEO.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Datos:' : 'Data:'}</strong> Space-Track & NASA SVS <Refs ids={[5, 7]} />
                </div>
                <a
                  href="https://svs.gsfc.nasa.gov/5258"
                  target="_blank"
                  rel="noreferrer"
                  className="anexo-foto-enlace"
                >
                  ↗ {idioma === 'ES' ? 'Ver animación en NASA SVS' : 'Watch video at NASA SVS'}
                </a>
              </div>
            </div>

            {/* Foto: Bolsa STS-126 */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/eva_tool_bag_2008.jpg`,
                    titulo:
                      idioma === 'ES'
                        ? 'Bolsa de herramientas en órbita (Heidemarie Stefanyshyn-Piper, STS-126)'
                        : 'Toolbag floating in orbit (Heidemarie Stefanyshyn-Piper, STS-126)',
                    credito: 'NASA (ISS018-E-009413)',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/eva_tool_bag_2008.jpg`}
                  alt="Bolsa de herramientas flotando en el espacio"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  NASA · ISS018-E-009413 · 18-nov-2008
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Bolsa de Herramientas Perdida en Paseo Espacial (2008)'
                    : 'Toolbag Lost During EVA Spacewalk (2008)'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'La bolsa de 13 kg se escapó mientras reparaban la junta solar de la ISS. Dio más de 4.000 vueltas al planeta a 28.000 km/h (visible con telescopios aficionados de magnitud +6) antes de consumirse el 3-ago-2009.'
                    : 'The 13-kg toolbag drifted away during a solar rotary joint repair spacewalk. It completed >4,000 orbits at 28,000 km/h (visible at magnitude 6) before reentering on August 3, 2009.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Misión:' : 'Mission:'}</strong> STS-126 Endeavour · <strong>{idioma === 'ES' ? 'Órbitas:' : 'Orbits:'}</strong> &gt;4.000
                </div>
              </div>
            </div>

            {/* Foto: Fragmento Naples Florida */}
            <div className="anexo-foto-card">
              <div
                className="anexo-foto-img-wrapper"
                onClick={() =>
                  setFotoModal({
                    src: `${baseUrl}fotos/florida_stanchion_nasa.png`,
                    titulo:
                      idioma === 'ES'
                        ? 'Soporte Inconel de batería de la ISS que atravesó casa en Naples, FL'
                        : 'Inconel stanchion from ISS battery pallet that pierced home in Naples, FL',
                    credito: 'NASA Kennedy Space Center Materials Analysis Lab',
                  })
                }
              >
                <img
                  src={`${baseUrl}fotos/florida_stanchion_nasa.png`}
                  alt="Fragmento de la ISS en casa de Florida"
                  className="anexo-foto-img"
                  style={{ maxHeight: '400px', objectFit: 'contain' }}
                  loading="lazy"
                />
                <span className="anexo-foto-zoom-hint">🔍 {idioma === 'ES' ? 'Ampliar' : 'Zoom'}</span>
                <span className="anexo-foto-badge-credito">
                  NASA KSC Analysis · 8-mar-2024
                </span>
              </div>
              <div className="anexo-foto-info">
                <h3 className="anexo-foto-titulo">
                  {idioma === 'ES'
                    ? 'Fragmento de la ISS que Cayó en Naples, Florida (2024)'
                    : 'ISS Battery Pallet Stanchion Impact (Naples, FL)'}
                </h3>
                <p className="anexo-foto-descripcion">
                  {idioma === 'ES'
                    ? 'El pallet EP9 de 2.630 kg de baterías viejas fue eyectado de la ISS en 2021. El 8-mar-2024, este poste de Inconel (0,725 kg, 10 x 4 cm) no se quemó y atravesó el techo y dos pisos de una vivienda particular.'
                    : 'The 2,630-kg EP9 battery pallet was jettisoned from the ISS in 2021. On March 8, 2024, this 0.725-kg Inconel stanchion survived reentry, smashing through the roof and two floors of a home.'}
                </p>
                <div className="anexo-foto-meta">
                  <strong>{idioma === 'ES' ? 'Análisis:' : 'Forensics:'}</strong> NASA KSC Materials Lab (abril 2024) <Refs ids={[59, 60]} />
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

      {/* PESTAÑA 6: 📜 Tabla Oficial de Créditos y Licencias (Jueces) */}
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
                  ? 'Matriz legal de verificación para los jurados de NASA Space Apps Challenge 2026. Todas las imágenes provienen exclusivamente de servidores de dominio público del Gobierno Federal de EE. UU. (NASA .gov, 17 U.S.C. § 105), LROC (Arizona State University) y HiRISE (University of Arizona).'
                  : 'Legal attribution matrix prepared for NASA Space Apps Challenge 2026 judges. All assets originate from US Federal Government public domain repositories (NASA .gov, 17 U.S.C. § 105), LROC (Arizona State University), and HiRISE (University of Arizona).'}
              </p>
            </div>
            <span className="anexo-chip-licencia">100% NASA / LROC / HiRISE Public Domain</span>
          </div>

          <div className="anexo-tabla-wrapper">
            <table className="anexo-tabla">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{idioma === 'ES' ? 'Título del Activo / Evidencia' : 'Asset / Evidence Title'}</th>
                  <th>{idioma === 'ES' ? 'Escena' : 'App Scene'}</th>
                  <th>{idioma === 'ES' ? 'Tipo' : 'Type'}</th>
                  <th>{idioma === 'ES' ? 'Enlace Oficial' : 'Official Primary Link'}</th>
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
                      <span className="chip chico gris">{row.tipo}</span>
                    </td>
                    <td>
                      <a
                        href={row.enlace}
                        target="_blank"
                        rel="noreferrer"
                        className="anexo-foto-enlace"
                        title={row.enlace}
                      >
                        ↗ {row.archivo}
                      </a>
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

      {/* Modal Lightbox para Ampliar Fotografías */}
      {fotoModal && (
        <div className="anexo-lightbox-overlay" onClick={() => setFotoModal(null)}>
          <div className="anexo-lightbox-caja" onClick={(e) => e.stopPropagation()}>
            <img src={fotoModal.src} alt={fotoModal.titulo} />
            <div className="anexo-lightbox-pie">
              <div>
                <strong style={{ color: '#fff', fontSize: '1.05rem', display: 'block' }}>
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
