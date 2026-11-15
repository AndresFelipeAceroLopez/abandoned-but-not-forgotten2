import { useRef, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getLang } from '../i18n';
import { Refs } from './Referencias';
import LineaTiempo from './LineaTiempo';
import { HISTORIA_1957 } from '../data/contenido';
import './SeccionCortos.css';

const CORTOS_INFO = {
  ES: [
    {
      id: 1,
      numero: '01',
      titulo: '01 · Salida de la Tierra y Sputnik 1 (1957)',
      sinopsis:
        'Un pequeño recolector robótico contempla el inicio de la era espacial desde la Tierra en 1957 con el Sputnik 1, viendo cómo la órbita baja comienza a poblarse de satélites y etapas desprendidas.',
      dato: '~47.390 objetos rastreados y 1,5 millones de 1 a 10 cm (ESA DISCOS, nov 2026). El primer objeto del catálogo fue el Sputnik 1 el 4-oct-1957.',
      fuenteNombre: 'ESA DISCOS (Estadísticas 2026) & NASA History',
      fuenteUrl: 'https://sdup.esoc.esa.int/discosweb/statistics/',
      refs: [5, 13, 17],
      videoBase: '01_Salida_Sputnik',
      duracion: '20 s · 1080p 60fps',
    },
    {
      id: 2,
      numero: '02',
      titulo: '02 · El papel que nadie recogió — Luna y Marte',
      sinopsis:
        'Rastreo de los desechos acumulados en la superficie de la Luna y Marte: restos de aterrizaje, etapas de ascenso y bolsas de residuos que quedaron atrás cuando los astronautas regresaron a casa.',
      dato: 'Más de 187.400 kg en la Luna ("como 30 elefantes", incluidas 96 bolsas Apollo) y 7.119 kg en Marte en 18 objetos de 14 misiones (Kilic, 2022). El 20,3 % en órbita no está identificado.',
      fuenteNombre: 'Kilic (2022) / The Conversation & NASA NSSDCA',
      fuenteUrl:
        'https://theconversation.com/mars-is-littered-with-15-694-pounds-of-human-trash-from-50-years-of-robotic-exploration-188881',
      refs: [37, 2, 7],
      videoBase: '02_Torres_Acumulacion',
      duracion: '20 s · 1080p 60fps',
    },
    {
      id: 3,
      numero: '03',
      titulo: '03 · Colección de Tesoros — No es basura, es historia',
      sinopsis:
        'Arco de casi falla convertido en triunfo científico. El impacto deliberado de la etapa S-IVB del Saturno V de Apollo 13 para medir ondas sísmicas en el interior de la Luna.',
      dato: 'Arco casi falla → lección → objeto que quedó. La etapa S-IVB del Apollo 13 se estrelló a propósito el 15-abr-1970 para medir un sismo lunar con el sismómetro del Apollo 12 (NASA NSSDCA / SVS).',
      fuenteNombre: 'NASA Scientific Visualization Studio & NSSDCA',
      fuenteUrl: 'https://svs.gsfc.nasa.gov/4803',
      refs: [27, 8],
      videoBase: '03_Coleccion_Tesoros',
      duracion: '20 s · 1080p 60fps',
    },
    {
      id: 4,
      numero: '04',
      titulo: '04 · Todavía trabajo y La Red',
      sinopsis:
        'Un prisma retrorreflector refleja pulsos láser cada noche sin baterías. La acumulación solitaria da paso a la cooperación internacional con la Carta Cero Basura y la protección del patrimonio histórico.',
      dato: 'Los retrorreflectores láser de Apollo 11, 14 y 15 y Lunokhod 1 y 2 siguen funcionando hoy. Unión internacional con la Carta Cero Basura de la ESA y la Ley One Small Step.',
      fuenteNombre: 'NASA ILRS & ESA Zero Debris Charter',
      fuenteUrl:
        'https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html',
      refs: [11, 80, 57],
      videoBase: '04_Esperanza_Laser',
      duracion: '20 s · 1080p 60fps',
    },
  ],
  EN: [
    {
      id: 1,
      numero: '01',
      titulo: '01 · Earth Departure & Sputnik 1 (1957)',
      sinopsis:
        'A small robotic collector watches humanity take its first steps into the cosmos in 1957 with Sputnik 1, witnessing low Earth orbit begin to accumulate satellites and spent rocket stages.',
      dato: '~47,390 tracked objects and 1.5 million between 1 and 10 cm (ESA DISCOS, Nov 2026). The first cataloged object was Sputnik 1 on Oct 4, 1957.',
      fuenteNombre: 'ESA DISCOS (2026 Stats) & NASA History',
      fuenteUrl: 'https://sdup.esoc.esa.int/discosweb/statistics/',
      refs: [5, 13, 17],
      videoBase: '01_Salida_Sputnik_EN',
      duracion: '20 s · 1080p 60fps',
    },
    {
      id: 2,
      numero: '02',
      titulo: '02 · The Paper Nobody Picked Up — Moon & Mars',
      sinopsis:
        'Tracking accumulated human hardware across the lunar and Martian surfaces: landing descent stages, jettisoned gear, and waste bags left behind when astronauts headed home.',
      dato: 'Over 187,400 kg on the Moon ("equivalent to 30 elephants", including 96 Apollo waste bags) and 7,119 kg on Mars across 18 objects from 14 missions (Kilic, 2022). 20.3% in orbit remains unidentified.',
      fuenteNombre: 'Kilic (2022) / The Conversation & NASA NSSDCA',
      fuenteUrl:
        'https://theconversation.com/mars-is-littered-with-15-694-pounds-of-human-trash-from-50-years-of-robotic-exploration-188881',
      refs: [37, 2, 7],
      videoBase: '02_Torres_Acumulacion_EN',
      duracion: '20 s · 1080p 60fps',
    },
    {
      id: 3,
      numero: '03',
      titulo: '03 · Collection of Treasures — Not Trash, but History',
      sinopsis:
        'A near-disaster turned into an engineering triumph. The deliberate Saturn V third-stage impact of Apollo 13 to record seismic shockwaves through the lunar crust.',
      dato: 'Near-miss arc → engineering lesson → relic left behind. Apollo 13\'s S-IVB stage was intentionally crashed on April 15, 1970 to record lunar seismometry with Apollo 12\'s ALSEP (NASA NSSDCA / SVS).',
      fuenteNombre: 'NASA Scientific Visualization Studio & NSSDCA',
      fuenteUrl: 'https://svs.gsfc.nasa.gov/4803',
      refs: [27, 8],
      videoBase: '03_Coleccion_Tesoros_EN',
      duracion: '20 s · 1080p 60fps',
    },
    {
      id: 4,
      numero: '04',
      titulo: '04 · Still Working & The Net',
      sinopsis:
        'A passive retroreflector array bounces laser pulses every night with zero batteries. Solitary isolation yields to international cooperation through the Zero Debris Charter and heritage protection.',
      dato: 'Laser retroreflectors on Apollo 11, 14, and 15 and Lunokhod 1 and 2 still reflect laser pulses today. International partnership backed by the ESA Zero Debris Charter and the One Small Step Act.',
      fuenteNombre: 'NASA ILRS & ESA Zero Debris Charter',
      fuenteUrl:
        'https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html',
      refs: [11, 80, 57],
      videoBase: '04_Esperanza_Laser_EN',
      duracion: '20 s · 1080p 60fps',
    },
  ],
};

function VideoPlayer({ corto, lang, es }) {
  const videoRef = useRef(null);
  const webmSrc = `${import.meta.env.BASE_URL}videos/${corto.videoBase}.webm`;
  const mp4Src = `${import.meta.env.BASE_URL}videos/${corto.videoBase}.mp4`;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [corto.videoBase, lang]);

  return (
    <div className="corto-video-wrapper">
      <span className="corto-duracion-badge">{corto.duracion}</span>
      <video
        ref={videoRef}
        key={`${corto.id}-${lang}-${corto.videoBase}`}
        className="corto-video-player"
        controls
        playsInline
        preload="metadata"
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
        {es
          ? 'Tu navegador no soporta reproducción de video HTML5.'
          : 'Your browser does not support HTML5 video playback.'}
      </video>
    </div>
  );
}

export default function SeccionCortos() {
  const modo = useAppStore((s) => s.modo);
  const siguienteEscena = useAppStore((s) => s.siguienteEscena);
  const storeLang = useAppStore((s) => s.lang);
  const lang = storeLang || getLang() || 'en';
  const es = lang === 'es';
  const idioma = es ? 'ES' : 'EN';

  const listaCortos = CORTOS_INFO[idioma] || CORTOS_INFO.ES;

  return (
    <div
      className="escena-scroll cortos-contenedor"
      tabIndex={0}
      role="region"
      aria-label={es ? 'Cortos para tomar conciencia' : 'Awareness Short Films'}
      onWheel={(e) => e.stopPropagation()}
      style={{ overflowY: 'auto' }}
    >
      {/* Cabecera */}
      <div className="cortos-header">
        <div className="cortos-header-info">
          <div className="cortos-badge-acto">Acto 2 · Escena 12</div>
          <h1 className="cortos-titulo">
            {es
              ? 'Cortos para tomar conciencia'
              : 'Short Films for Global Awareness'}
          </h1>
          <p className="cortos-subtitulo">
            {es
              ? modo === 'ninos'
                ? 'Cuatro historias con personajes propios en estilo cinematográfico (inspiración WALL-E, 100% original sin copyright). Cada corto concluye con una cifra científica verificada.'
                : 'Producción audiovisual original del equipo en 1080p 60 FPS. Tono de narrativa inspirada en WALL-E con personajes propios, datos de fuentes primarias (NASA / ESA) y licencias de dominio público.'
              : modo === 'ninos'
              ? 'Four original animated shorts inspired by WALL-E (original characters, no copyright). Each short concludes with a verified scientific fact.'
              : 'Original team audiovisual production rendered in 1080p 60 FPS. Storytelling tone inspired by WALL-E with original assets, primary sources (NASA / ESA), and public domain licenses.'}
          </p>
        </div>
      </div>

      {/* Grid de 4 Videos */}
      <div className="cortos-grid">
        {listaCortos.map((corto) => {
          const webmSrc = `${import.meta.env.BASE_URL}videos/${corto.videoBase}.webm`;
          const mp4Src = `${import.meta.env.BASE_URL}videos/${corto.videoBase}.mp4`;

          return (
            <article key={corto.id} className="corto-card">
              {/* Reproductor de Video */}
              <VideoPlayer corto={corto} lang={lang} es={es} />

              {/* Contenido e información */}
              <div className="corto-info">
                <div className="corto-info-top">
                  <span className="corto-numero-chip">
                    {idioma === 'ES' ? `Corto ${corto.numero}` : `Short ${corto.numero}`}
                  </span>
                  <span className="corto-tone-chip">Original · No Copyright</span>
                </div>

                <h3 className="corto-titulo-card">{corto.titulo}</h3>
                <p className="corto-sinopsis">{corto.sinopsis}</p>

                {/* Caja de Dato de Cierre Verificado */}
                <div className="corto-dato-caja">
                  <span className="corto-dato-etiqueta">
                    {idioma === 'ES' ? 'Dato de cierre verificado' : 'Verified Closing Fact'}
                  </span>
                  <p className="corto-dato-texto">
                    {corto.dato} <Refs ids={corto.refs} />
                  </p>
                </div>

                {/* Fila de Fuente Primaria y Descargas */}
                <div className="corto-fuente-fila">
                  <a
                    href={corto.fuenteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="corto-fuente-link"
                    title={
                      idioma === 'ES'
                        ? `Consultar fuente primaria oficial: ${corto.fuenteNombre}`
                        : `Inspect official primary source: ${corto.fuenteNombre}`
                    }
                  >
                    <span>↗</span> {corto.fuenteNombre}
                  </a>

                  <div className="corto-descarga-links">
                    <a
                      href={webmSrc}
                      download
                      className="corto-btn-descarga"
                      title="Descargar WebM (VP9)"
                    >
                      WebM
                    </a>
                    <a
                      href={mp4Src}
                      download
                      className="corto-btn-descarga"
                      title="Descargar MP4 (H.264)"
                    >
                      MP4
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Línea de tiempo si está en modo niños */}
      {modo === 'ninos' && (
        <div style={{ marginTop: 36, background: '#141822', padding: 20, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: 14 }}>
            {idioma === 'ES' ? 'Desde cuándo pasa esto' : 'How Long Has This Been Happening'}
          </h2>
          <LineaTiempo items={HISTORIA_1957} />
        </div>
      )}

      {/* Botón Siguiente Escena */}
      <div className="cortos-footer-acciones">
        <p className="cortos-nota-creditos">
          {idioma === 'ES'
            ? 'Nota de derechos de autor: Animaciones generadas proceduralmente con Three.js y React Three Fiber. Toda la música, modelos geométricos y guiones son originales del equipo. Ningún personaje protegido por copyright de Disney/Pixar fue utilizado.'
            : 'Copyright Notice: Animations procedurally generated with Three.js and React Three Fiber. All sound design, 3D geometry, and scripts are team originals. No copyrighted characters or assets from Disney/Pixar were utilized.'}
        </p>
        <button
          type="button"
          className="btn primario"
          onClick={siguienteEscena}
        >
          {idioma === 'ES' ? 'Siguiente escena: Soluciones →' : 'Next Scene: Solutions →'}
        </button>
      </div>
    </div>
  );
}

