// Pantalla inicial: selector de dos modos. Los datos son los mismos; cambia el lenguaje y la profundidad.
import { useAppStore } from '../store/useAppStore';

export default function Inicio() {
  const setModo = useAppStore((s) => s.setModo);
  const setEscena = useAppStore((s) => s.setEscena);
  const elegir = (m) => { setModo(m); setEscena('prologo'); };
  return (
    <div className="inicio">
      <div className="inicio-caja">
        <div className="papel">📄</div>
        <h1>"Es solo un papel. No significa nada."</h1>
        <p style={{ color: 'var(--tinta-2)', fontSize: '1.1rem' }}>
          Lo que la humanidad dejó en la órbita, en la Luna, en Marte y en el espacio profundo. Y la ciencia que cada pedazo hizo posible.
        </p>
        <div className="modos">
          <button className="modo-card" onClick={() => elegir('ninos')}>
            <h2>Para niños y jóvenes</h2>
            <p>Frases cortas, comparaciones y una pregunta por pieza.</p>
            <ul><li>Cuento por objeto</li><li>Quiz y línea de tiempo ilustrada</li><li>"Explora otra pieza"</li></ul>
          </button>
          <button className="modo-card" onClick={() => elegir('org')}>
            <h2>Para organizaciones</h2>
            <p>Coordenadas, códigos NSSDCA, verificación LRO y fuente primaria.</p>
            <ul><li>Sesgos de los datos, efectos y escenarios</li><li>Marco legal (One Small Step Act, COSPAR)</li><li>Descarga JSON/CSV y referencias completas</li></ul>
          </button>
        </div>
        <small>NASA Space Apps 2026 · Reto "Abandoned but not Forgotten" · Puedes cambiar de modo en cualquier momento con el botón de arriba.</small>
      </div>
    </div>
  );
}
