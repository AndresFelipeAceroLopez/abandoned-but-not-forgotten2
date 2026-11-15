// Capa 2D "el papel que se voltea". Hoy es una animación CSS; para usar Rive:
//   npm i @rive-app/react-canvas-lite
//   import { useRive, useStateMachineInput } from '@rive-app/react-canvas-lite';
//   const { RiveComponent, rive } = useRive({ src: '/rive/papel.riv', stateMachines: 'volteo', autoplay: true });
//   const input = useStateMachineInput(rive, 'volteo', 'volteado'); useEffect(() => { if (input) input.value = volteado; }, [volteado]);
// y colocar <RiveComponent /> encima del contenido. Las entradas se conectan al estado global (useAppStore).
export default function PapelVolteo({ volteado, children }) {
  return (
    <div className={`papel-volteo ${volteado ? 'volteado' : ''}`}>
      <div className="cara">{children}</div>
    </div>
  );
}
