// Quiz del modo niños (primer recorte si falta tiempo, según la planeación).
import { useState } from 'react';
import { QUIZ } from '../data/contenido';
import { Refs } from './Referencias';
import { tr } from '../i18n';

export default function Quiz() {
  const [i, setI] = useState(0);
  const [elegida, setElegida] = useState(null);
  const [puntos, setPuntos] = useState(0);
  if (i >= QUIZ.length) {
    return (
      <div className="panel quiz" aria-live="polite">
        <h3>{tr('¡Terminaste!', 'You finished!')}</h3>
        <p>
          {tr(`Acertaste ${puntos} de ${QUIZ.length}.`, `You got ${puntos} out of ${QUIZ.length} right.`)}{' '}
          {puntos === QUIZ.length
            ? tr('Ya sabes más que la mayoría de los adultos.', 'You now know more than most adults.')
            : tr('Vuelve a explorar las fichas y repite el quiz.', 'Explore the cards again and retake the quiz.')}
        </p>
        <button className="btn chico" onClick={() => { setI(0); setPuntos(0); setElegida(null); }}>{tr('Otra vez', 'Again')}</button>
      </div>
    );
  }
  const q = QUIZ[i];
  return (
    <div className="panel quiz">
      <small>{tr(`Pregunta ${i + 1} de ${QUIZ.length}`, `Question ${i + 1} of ${QUIZ.length}`)}</small>
      <h3>{q.pregunta}</h3>
      {q.opciones.map((op, k) => (
        <button
          key={k}
          className={`opcion ${elegida !== null ? (k === q.correcta ? 'bien' : k === elegida ? 'mal' : '') : ''}`}
          disabled={elegida !== null}
          onClick={() => { setElegida(k); if (k === q.correcta) setPuntos(puntos + 1); }}
        >
          {op}{elegida !== null && k === q.correcta ? ' ✓' : elegida !== null && k === elegida ? ' ✗' : ''}
        </button>
      ))}
      {elegida !== null && (
        <div aria-live="polite">
          <p style={{ marginTop: 8 }}>{elegida === q.correcta ? tr('¡Correcto! ', 'Correct! ') : tr('Casi. ', 'Almost. ')}{q.explicacion} <Refs ids={q.refs} /></p>
          <button className="btn chico primario" onClick={() => { setI(i + 1); setElegida(null); }}>{tr('Siguiente', 'Next')}</button>
        </div>
      )}
    </div>
  );
}
