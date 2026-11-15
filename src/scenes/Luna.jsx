// Capítulo 1 · La Luna: 96 objetos, filtro Apollo (21), insignias LRO y "paradero desconocido".
import GloboObjetos from './GloboObjetos';
import { LUNA_PASOS, PATRONES, APOLLO_MUESTRAS } from '../data/contenido';
import { useAppStore } from '../store/useAppStore';
import { Refs } from '../ui/Referencias';
import { num } from '../lib/formato';
import { tr } from '../i18n';

export default function Luna() {
  const modo = useAppStore((s) => s.modo);
  return (
    <GloboObjetos
      cuerpo="luna"
      pasos={LUNA_PASOS}
      panelExtra={
        <div className="panel tenue">
          <details>
            <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{modo === 'ninos' ? tr('¿Por qué casi fallaron?', 'Why did they almost fail?') : tr('Patrones de falla (Johnson, NASA JSC 2018)', 'Failure patterns (Johnson, NASA JSC 2018)')} <Refs ids={[21]} /></summary>
            <ol style={{ paddingLeft: 18, marginTop: 6, fontSize: '0.9rem', color: 'var(--tinta-2)' }}>
              {PATRONES.map((p) => <li key={p.titulo}><strong style={{ color: 'var(--tinta)' }}>{p.titulo}</strong> ({p.misiones}): {p.texto}</li>)}
            </ol>
            <p className="mini">
              {tr('Muestras traídas:', 'Samples returned:')} {APOLLO_MUESTRAS.filter((m) => m.kg).map((m) => `${m.mision.replace('Apollo ', 'A')} ${num(m.kg)} kg`).join(' · ')}. {tr('Cada misión aprendió de la anterior.', 'Each mission learned from the one before.')} <Refs ids={[3]} />
            </p>
          </details>
        </div>
      }
    />
  );
}
