// Línea de tiempo ilustrada 1957–2022 (modo niños) / con fuentes (modo org).
import { HISTORIA_1957 } from '../data/contenido';
import { useAppStore } from '../store/useAppStore';
import { Refs } from './Referencias';

// Hitos "primeros" o "más antiguos" (en cualquiera de los dos idiomas) se marcan en dorado.
const DESTACADO = /primer|más antigua|first|oldest/i;

export default function LineaTiempo({ items = HISTORIA_1957 }) {
  const modo = useAppStore((s) => s.modo);
  return (
    <div className="linea">
      {items.map((h, i) => (
        <div key={i} className={`hito ${DESTACADO.test(h.importa || '') ? 'oro' : ''}`}>
          <div className="cuando">{h.fecha}</div>
          <div>{h.hecho} {modo === 'org' && <Refs ids={h.refs} />}</div>
          {h.importa && <div className="importa">{h.importa}</div>}
        </div>
      ))}
    </div>
  );
}
