// Pantalla inicial: video principal y selector de dos modos. Los datos son los mismos; cambia el lenguaje y la profundidad.
import { useAppStore } from '../store/useAppStore';
import { tr } from '../i18n';
import Idioma from '../ui/Idioma';
import videoPrincipal from '../recursos/video_principal/videoFinal.mp4';
import articuloPdf from '../articulo/NASA_App_Space_Challenge_EN-1.pdf';
import posterVideo from '../recursos/video_principal/poster.jpg';

export default function Inicio() {
  const setModo = useAppStore((s) => s.setModo);
  const setEscena = useAppStore((s) => s.setEscena);
  const elegir = (m) => { setModo(m); setEscena('prologo'); };
  return (
    <div className="inicio">
      <Idioma className="idioma-fijo" />
      <img className="logo-spaceapps" src="/marca/logo-circular.jpeg" alt="NASA Space Apps Challenge" />
      <main className="inicio-caja">
        <div className="papel" aria-hidden="true">📄</div>
        <h1>{tr('"Es solo un papel. No significa nada."', '"It\'s just a piece of paper. It means nothing."')}</h1>
        <p style={{ color: 'var(--tinta-2)', fontSize: '1.1rem' }}>
          {tr(
            'Lo que la humanidad dejó en la órbita, en la Luna, en Marte y en el espacio profundo. Y la ciencia que cada pedazo hizo posible.',
            'What humanity left in orbit, on the Moon, on Mars and in deep space. And the science each piece made possible.',
          )}
        </p>
        <p className="enlace-articulo"><a href={articuloPdf} target="_blank" rel="noopener noreferrer">{tr('Visita nuestro artículo →', 'Visit our article →')}</a></p>
        <figure className="video-principal">
          <video controls playsInline preload="metadata" poster={posterVideo} aria-label={tr('Video principal del proyecto (30 segundos, en inglés)', 'Main project video (30 seconds)')}>
            <source src={videoPrincipal} type="video/mp4" />
            {tr('Tu navegador no puede reproducir este video.', 'Your browser cannot play this video.')}
          </video>
          <figcaption>{tr('Video principal · 30 s · narrado en inglés con subtítulos', 'Main video · 30 s · with captions')}</figcaption>
        </figure>
        <div className="modos">
          <button className="modo-card" onClick={() => elegir('ninos')}>
            <h2>{tr('Para niños y jóvenes', 'For kids and teens')}</h2>
            <p>{tr('Frases cortas, comparaciones y una pregunta por pieza.', 'Short sentences, comparisons and one question per piece.')}</p>
            <ul>
              <li>{tr('Cuento por objeto', 'A story for each object')}</li>
              <li>{tr('Quiz y línea de tiempo ilustrada', 'Quiz and illustrated timeline')}</li>
              <li>{tr('"Explora otra pieza"', '"Explore another piece"')}</li>
            </ul>
          </button>
          <button className="modo-card" onClick={() => elegir('org')}>
            <h2>{tr('Para organizaciones', 'For organizations')}</h2>
            <p>{tr('Coordenadas, códigos NSSDCA, verificación LRO y fuente primaria.', 'Coordinates, NSSDCA codes, LRO verification and primary sources.')}</p>
            <ul>
              <li>{tr('Sesgos de los datos, efectos y escenarios', 'Data biases, effects and scenarios')}</li>
              <li>{tr('Marco legal (One Small Step Act, COSPAR)', 'Legal framework (One Small Step Act, COSPAR)')}</li>
              <li>{tr('Descarga JSON/CSV y referencias completas', 'JSON/CSV download and full references')}</li>
            </ul>
          </button>
        </div>
        <small>
          {tr(
            'NASA Space Apps 2026 · Reto "Abandoned but not Forgotten" · Puedes cambiar de modo y de idioma en cualquier momento con los botones de arriba.',
            'NASA Space Apps 2026 · "Abandoned but not Forgotten" challenge · You can switch mode and language at any time with the buttons at the top.',
          )}
        </small>
      </main>
    </div>
  );
}
