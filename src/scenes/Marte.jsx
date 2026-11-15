// Capítulo 2 · Marte: 15 objetos; robots que siguieron sin humanos; protección planetaria.
import GloboObjetos from './GloboObjetos';
import { MARTE_PASOS } from '../data/contenido';
import { useAppStore } from '../store/useAppStore';
import { Refs } from '../ui/Referencias';

export default function Marte() {
  const modo = useAppStore((s) => s.modo);
  return (
    <GloboObjetos
      cuerpo="marte"
      pasos={MARTE_PASOS}
      panelExtra={
        <div className="panel tenue">
          <strong>{modo === 'ninos' ? 'Ojo: en Marte no hay desechos humanos' : 'Corrección obligatoria'}</strong>
          <p className="mini" style={{ marginBottom: 0 }}>
            {modo === 'ninos'
              ? 'Ningún humano ha ido a Marte, así que allá no hay heces. Las 96 bolsas están en la Luna. Las naves llevan algunas bacterias dormidas aunque se limpian mucho; por eso existe la "protección planetaria".'
              : 'Ningún humano ha ido a Marte: no hay heces allá (las 96 bolsas son lunares). Lo real: las naves portan esporas residuales pese a la limpieza (< 500.000 en Mars 2020), de ahí la protección planetaria (COSPAR).'}{' '}
            <Refs ids={[38, 39]} />
          </p>
        </div>
      }
    />
  );
}
