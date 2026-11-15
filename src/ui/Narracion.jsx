// Texto paso a paso sobre el 3D. Un dato por paso; el modo elige el texto.
import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Refs } from './Referencias';
import { tr } from '../i18n';

export default function Narracion({ pasos, onPaso, alFinal }) {
  const modo = useAppStore((s) => s.modo);
  const siguienteEscena = useAppStore((s) => s.siguienteEscena);
  const [i, setI] = useState(0);
  useEffect(() => { setI(0); }, [pasos]);
  useEffect(() => { onPaso?.(i); }, [i, onPaso]);
  const p = pasos[i];
  if (!p) return null;
  const ultimo = i === pasos.length - 1;
  return (
    <div className="panel narracion" aria-live="polite">
      <h3>{p.titulo}</h3>
      <p className={`paso ${modo}`}>{modo === 'ninos' ? p.ninos : p.org} {modo === 'org' && <Refs ids={p.refs} />}</p>
      <div className="controles">
        <button className="btn chico" disabled={i === 0} aria-label={tr('Paso anterior', 'Previous step')} onClick={() => setI(i - 1)}>←</button>
        <div className="puntos" role="img" aria-label={tr(`Paso ${i + 1} de ${pasos.length}`, `Step ${i + 1} of ${pasos.length}`)}>{pasos.map((_, k) => <i key={k} className={k === i ? 'on' : ''} />)}</div>
        {ultimo ? (
          <button className="btn chico primario" onClick={alFinal || siguienteEscena}>{alFinal ? tr('Explorar', 'Explore') : tr('Siguiente capítulo →', 'Next chapter →')}</button>
        ) : (
          <button className="btn chico primario" onClick={() => setI(i + 1)}>{tr('Seguir →', 'Continue →')}</button>
        )}
      </div>
    </div>
  );
}
