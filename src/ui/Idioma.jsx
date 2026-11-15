// Selector de idioma: inglés por defecto, español como alternativa. Queda guardado y en la URL (?lang=es).
import { useAppStore } from '../store/useAppStore';

const OPCIONES = [['en', 'EN', 'English'], ['es', 'ES', 'Español']];

export default function Idioma({ className = '' }) {
  const lang = useAppStore((s) => s.lang);
  const setLang = useAppStore((s) => s.setLang);
  return (
    <div className={`modo-toggle idioma ${className}`} role="group" aria-label="Language / Idioma">
      {OPCIONES.map(([id, corto, nombre]) => (
        <button key={id} lang={id} className={lang === id ? 'activa' : ''} aria-pressed={lang === id} title={nombre} aria-label={nombre} onClick={() => setLang(id)}>
          {corto}
        </button>
      ))}
    </div>
  );
}
