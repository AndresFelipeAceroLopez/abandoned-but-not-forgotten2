// Capítulo 2 · Marte: 15 objetos; robots que siguieron sin humanos; protección planetaria.
import GloboObjetos from './GloboObjetos';
import { MARTE_PASOS } from '../data/contenido';
import { useAppStore } from '../store/useAppStore';
import { Refs } from '../ui/Referencias';
import { tr } from '../i18n';

export default function Marte() {
  const modo = useAppStore((s) => s.modo);
  return (
    <GloboObjetos
      cuerpo="marte"
      pasos={MARTE_PASOS}
      panelExtra={
        <div className="panel tenue">
          <strong>{modo === 'ninos' ? tr('Ojo: en Marte no hay desechos humanos', 'Careful: there is no human waste on Mars') : tr('Corrección obligatoria', 'Mandatory correction')}</strong>
          <p className="mini" style={{ marginBottom: 0 }}>
            {modo === 'ninos'
              ? tr(
                'Ningún humano ha ido a Marte, así que allá no hay heces. Las 96 bolsas están en la Luna. Las naves llevan algunas bacterias dormidas aunque se limpian mucho; por eso existe la "protección planetaria".',
                'No human has been to Mars, so there are no faeces there. The 96 bags are on the Moon. Spacecraft carry a few dormant bacteria even though they are cleaned very thoroughly; that is why "planetary protection" exists.',
              )
              : tr(
                'Ningún humano ha ido a Marte: no hay heces allá (las 96 bolsas son lunares). Lo real: las naves portan esporas residuales pese a la limpieza (< 500.000 en Mars 2020), de ahí la protección planetaria (COSPAR).',
                'No human has been to Mars: there are no faeces there (the 96 bags are on the Moon). What is real: spacecraft carry residual spores despite cleaning (< 500,000 on Mars 2020), hence planetary protection (COSPAR).',
              )}{' '}
            <Refs ids={[38, 39]} />
          </p>
        </div>
      }
    />
  );
}
