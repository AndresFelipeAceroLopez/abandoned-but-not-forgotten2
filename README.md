# Abandoned but not Forgotten · Lunar/Mars Memory

Experiencia web para el reto de NASA Space Apps 2026 **"Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars"**. Cuenta la historia de lo que la humanidad dejó en la órbita terrestre, la Luna, Marte y el espacio profundo, con el giro: *cada pedazo que parecía no significar nada es una historia de ciencia*.

Sitio estático (sin backend), construido a partir de la planeación `Abandoned but not Forgotten — Storytelling y datos.md` y de los recursos reales del equipo en `src/recursos/`.

## Qué incluye

| Parte | Dónde | Estado |
| --- | --- | --- |
| Selector de dos modos (niños y jóvenes / organizaciones), modo en la URL (`?modo=ninos`, `?modo=org`) | `src/scenes/Inicio.jsx`, `src/store/useAppStore.js` | Listo; cambiar de modo no recarga el mapa |
| Capítulo 0 · Prólogo: mapa 4D orbital con ~68.700 "papeles" del catálogo Space-Track sobre la **Tierra GLB del equipo**, año y velocidad | `src/scenes/Prologo.jsx`, `src/three/NubeOrbital.jsx`, `src/three/PlanetaGLB.jsx` | Listo (Kepler + J2 del anexo técnico) |
| **Satélites sobre la Tierra con info real**: 17.309 objetos con posición instantánea (catálogo del equipo), filtros por categoría, país, altura y nombre, ficha por objeto | `src/scenes/Satelites.jsx`, `public/data/satelites.json` | Listo |
| Capítulo 1 · Luna: globo con 96 objetos (NSSDCA), filtro Apollo (21), insignias LRO, bandeja "paradero desconocido" (18), fichas con **ilustración del objeto**, buscador, quiz | `src/scenes/Luna.jsx`, `GloboObjetos.jsx`, `src/visuales/IlustracionObjeto.jsx` | Listo |
| Capítulo 2 · Marte: **Marte GLB del equipo** con 15 objetos, protección planetaria | `src/scenes/Marte.jsx` | Listo |
| Capítulo 3 · Espacio profundo: **sistema solar animado** (Sol al centro, 8 planetas + Ceres, 5 sondas, basura en órbita solar: etapas S-IVB de Apollo 8/10/11/12 y la etapa del Falcon Heavy) + línea de tiempo | `src/scenes/Profundo.jsx`, `src/three/SistemaSolar.jsx`, `src/data/sistema_solar.js` | Listo (posiciones esquemáticas) |
| Cierre: cada papel se voltea y muestra su descubrimiento | `src/scenes/Cierre.jsx` | Listo |
| Acto 2 · 6 Daños (**animación de reentrada**), 7 Radiactivos (**RTG animado + curva de Pu-238**), 8 Sin nombre, 9 Patrimonio, 10 Países, 11 Unión, 12 Cortos, 13 Soluciones (**una animación por solución y por medida técnica**) | `src/scenes/Acto2.jsx`, `src/visuales/` | Listo |
| 14 · Propuesta: **sistema solar con Mercurio y Venus alineados detrás del Sol**, ventanas de envío al Sol y cápsulas simuladas; fases de limpieza (imán → malla), protocolo "1 lanzamiento = 1 limpieza", regulación abierta | `src/scenes/Acto2.jsx` (`Propuesta`), `src/visuales/AnimacionLimpieza.jsx` | Listo; texto marcado como borrador del equipo |
| Dashboard: 20 indicadores con mini planeta, gráficos de área, dona y barras, año compartido con el mapa, descarga JSON/CSV | `src/dashboard/` | Listo |
| Referencias: 112 fuentes (85 del documento + 27 aportadas por `objects.json` del equipo) | `src/data/referencias.json`, `src/ui/Referencias.jsx` | Listo |
| Datos: 116 objetos con `texto.ninos`/`texto.org`, FAQ, fuente, y los campos del equipo (estado, historia, legado, equipo dejado, parámetros orbitales…) | `src/data/objetos.json` | Listo; cruce documentado en `etl/informe_cruce.md` |

## Cómo correrlo

```powershell
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/ (publicar en GitHub Pages, Netlify o Vercel)
npm run preview
```

Datos (solo si cambian los archivos fuente):

```powershell
npm run etl:orbita    # catálogo Space-Track (C:/Users/ASUS/Downloads/catalogo_satelites.json) → public/data/orbita.json
npm run etl:fusionar  # src/recursos/{objects,data}.json → objetos.json, referencias.json, satelites.json, informe_cruce.md
npm run etl:validar   # valida objetos.json y referencias.json
node etl/humo_navegador.mjs http://localhost:4173          # prueba de humo en Chrome headless (todas las escenas, dos modos)
node etl/humo_navegador.mjs http://localhost:4173 --dbg    # además, capturas con marcadores de prueba (?dbg=1) para alinear los GLB
```

## Estructura

```
src/
  store/useAppStore.js   # modo, año, escena, objetoSeleccionado, filtros, colorPor, velocidad (Zustand)
  data/                  # objetos.json, referencias.json, dashboard*.json, contenido.js, escenas.js, sistema_solar.js
  lib/geo.js             # lat/lon → 3D, Kepler (Newton), J2, GMST, Pu-238 (anexo técnico)
  three/                 # Escena3D, Globo (textura), PlanetaGLB (GLB del equipo), Marcadores, NubeOrbital, SistemaSolar, MarcadoresPrueba
  visuales/              # ilustraciones y animaciones SVG: IlustracionObjeto, AnimacionSolucion, AnimacionDanos, AnimacionRadiactivo, AnimacionLimpieza, MiniPlaneta, Galeria
  spline/ModeloObjeto    # figura 3D del objeto junto a su marcador (primitivas por clase; usa GLTF si existe public/modelos/<programa>.glb)
  rive/PapelVolteo       # volteo del papel (CSS); instrucciones para cambiarlo por Rive
  scenes/                # Inicio, Prologo, Satelites, Luna, Marte, Profundo, Cierre, Acto2, GloboObjetos
  dashboard/             # Dashboard, Graficos (Barras, Linea, Area, Dona)
  ui/                    # Nav, Ficha, Narracion, Buscador, Referencias, Quiz, LineaTiempo, ControlesOrbita
  recursos/              # LO QUE SUBIÓ EL EQUIPO: objects.json, data.json, GLB originales (no se cargan directamente)
public/
  modelos/               # earth.glb, mars.glb, moon.glb del equipo, optimizados a 2048 px WebP (63 MB → 0,3 MB la Tierra)
  texturas/luna.jpg      # NASA SVS CGI Moon Kit (la Luna usa textura; Tierra y Marte usan los GLB)
  data/orbita.json       # 68.744 objetos compactos (Space-Track)
  data/satelites.json    # 17.309 satélites con posición real (catálogo del equipo)
etl/                     # construir_orbita, fusionar_recursos, validar_datos, informe_cruce.md, humo_* (pruebas en Chrome)
```

## Datos y verificación

- **Luna (96)**: filas de la tabla del NSSDCA con coordenadas DE421 y códigos (`d` = fotografiado por LRO, `g` = quedó en órbita, sitio desconocido).
- **Marte (15)** y **espacio profundo (5)**: coordenadas de The Planetary Society / PDS; Schiaparelli, Ingenuity y las 5 sondas no se cotejaron con fuente primaria (`verificado_fuente: false`).
- **Cruce con los datos del equipo** (`etl/informe_cruce.md`): 115/116 objetos emparejados; 4 discrepancias de coordenadas > 0,05° (Viking 1, Beagle 2, Pathfinder, Perseverance; se conservó el valor cotejado con la fuente), 1 de verificación LRO, 4 de paradero desconocido. **Ojo:** en `data.json` Viking 2 trae longitud −134,26 (signo invertido; la correcta es 134,26 E). Mars 6 está en el catálogo del equipo pero no en la app.
- **Órbita**: catálogo Space-Track (68.744 válidos; 34.494 sin reentrada). Posiciones propagadas con elementos medios; para objetos reentrados son ilustrativas. Tamaños aumentados.
- **Satélites con posición real**: 17.309 de 17.345 filas del equipo (36 descartadas por altura nula o > 100.000 km). La época de la foto no está documentada en el archivo.
- **Sistema solar**: distancias comprimidas (r = 2·a^0,45); posiciones de sondas y de etapas en órbita solar esquemáticas. Para la versión final, interpolar efemérides de JPL Horizons (anexo técnico §9).
- **Propuesta**: las ventanas "cada 1 y 7 meses" son una estimación del equipo (pendiente de confirmar). Los periodos sinódicos reales son ~3,8 meses (Mercurio) y ~19,2 meses (Venus); la app los muestra en modo organizaciones junto con la nota de que caer al Sol exige frenar ~30 km/s, más que escapar del sistema solar.

## Pendientes para el equipo

1. Confirmar el texto de la propuesta (escena 14) y las ventanas de lanzamiento.
2. Fotos, videos y los 4 cortos (escena 12 muestra "por completar").
3. Si se quiere la Luna también como GLB, cambiar `Globo` por `PlanetaGLB cuerpo="luna"` en `GloboObjetos.jsx` y ajustar `DESFASE_LON.luna` con `?dbg=1`.
4. Modelos de Spline / animaciones de Rive: exportar a `public/modelos/*.glb` o seguir `src/rive/PapelVolteo.jsx`.
5. Revisar la cita de Hugo Lopez (Wired) antes de usarla en pantalla; no está en la app.

## Créditos de datos

NASA NSSDCA, NASA ILRS, NASA JPL, NASA RPS, ESA Space Debris Office (DISCOS/MASTER-8), Space-Track.org (18 SPCS), Kilic (The Conversation, 2022), Johnson (NASA JSC, 2018), el catálogo `objects.json` y los modelos GLB del equipo, y las demás fuentes listadas en `src/data/referencias.json`. Textura lunar: NASA SVS (CGI Moon Kit)

##AUTORES
Daniel Molina
Mariana Cortes
Andres Lopez
Cristian Valencia
Carlos Acosta
