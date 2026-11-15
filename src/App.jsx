import { lazy, Suspense } from 'react';
import { useAppStore } from './store/useAppStore';
import Nav from './ui/Nav';
import Inicio from './scenes/Inicio';

// Cada escena se carga solo cuando se llega a ella (React.lazy + Suspense).
const Prologo = lazy(() => import('./scenes/Prologo'));
const Satelites = lazy(() => import('./scenes/Satelites'));
const Luna = lazy(() => import('./scenes/Luna'));
const Marte = lazy(() => import('./scenes/Marte'));
const Profundo = lazy(() => import('./scenes/Profundo'));
const Cierre = lazy(() => import('./scenes/Cierre'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Referencias = lazy(() => import('./ui/Referencias'));
const Acto2 = {
  danos: lazy(() => import('./scenes/Acto2').then((m) => ({ default: m.Danos }))),
  radiactivos: lazy(() => import('./scenes/Acto2').then((m) => ({ default: m.Radiactivos }))),
  sinnombre: lazy(() => import('./scenes/Acto2').then((m) => ({ default: m.SinNombre }))),
  noesbasura: lazy(() => import('./scenes/Acto2').then((m) => ({ default: m.NoEsBasura }))),
  paises: lazy(() => import('./scenes/Acto2').then((m) => ({ default: m.Paises }))),
  union: lazy(() => import('./scenes/Acto2').then((m) => ({ default: m.Union }))),
  cortos: lazy(() => import('./scenes/Acto2').then((m) => ({ default: m.Cortos }))),
  soluciones: lazy(() => import('./scenes/Acto2').then((m) => ({ default: m.Soluciones }))),
  propuesta: lazy(() => import('./scenes/Acto2').then((m) => ({ default: m.Propuesta }))),
};

const ESCENA = { prologo: Prologo, satelites: Satelites, luna: Luna, marte: Marte, profundo: Profundo, cierre: Cierre, dashboard: Dashboard, referencias: Referencias, ...Acto2 };

export default function App() {
  const modo = useAppStore((s) => s.modo);
  const escena = useAppStore((s) => s.escena);
  const Comp = modo && escena !== 'inicio' ? ESCENA[escena] : null;
  return (
    <div className="app">
      <Nav />
      <div className="escena">
        {Comp ? (
          <Suspense fallback={<div className="cargando"><div className="panel">Cargando…</div></div>}>
            <Comp />
          </Suspense>
        ) : (
          <Inicio />
        )}
      </div>
    </div>
  );
}
