// Quiz del modo niños (primer recorte si falta tiempo, según la planeación).
import { useState } from 'react';
import { QUIZ } from '../data/contenido';
import { Refs } from './Referencias';

export default function Quiz() {
  const [i, setI] = useState(0);
  const [elegida, setElegida] = useState(null);
  const [puntos, setPuntos] = useState(0);
  if (i >= QUIZ.length) {
    return (
      <div className="panel quiz">
        <h3>¡Terminaste!</h3>
        <p>Acertaste {puntos} de {QUIZ.length}. {puntos === QUIZ.length ? 'Ya sabes más que la mayoría de los adultos.' : 'Vuelve a explorar las fichas y repite el quiz.'}</p>
        <button className="btn chico" onClick={() => { setI(0); setPuntos(0); setElegida(null); }}>Otra vez</button>
      </div>
    );
  }
  const q = QUIZ[i];
  return (
    <div className="panel quiz">
      <small>Pregunta {i + 1} de {QUIZ.length}</small>
      <h3>{q.pregunta}</h3>
      {q.opciones.map((op, k) => (
        <button
          key={k}
          className={`opcion ${elegida !== null ? (k === q.correcta ? 'bien' : k === elegida ? 'mal' : '') : ''}`}
          disabled={elegida !== null}
          onClick={() => { setElegida(k); if (k === q.correcta) setPuntos(puntos + 1); }}
        >
          {op}
        </button>
      ))}
      {elegida !== null && (
        <>
          <p style={{ marginTop: 8 }}>{elegida === q.correcta ? '¡Correcto! ' : 'Casi. '}{q.explicacion} <Refs ids={q.refs} /></p>
          <button className="btn chico primario" onClick={() => { setI(i + 1); setElegida(null); }}>Siguiente</button>
        </>
      )}
    </div>
  );
}
