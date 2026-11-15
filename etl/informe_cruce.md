# Informe de cruce · recursos del equipo vs. datos de la app

Generado: 2026-11-15 por `etl/fusionar_recursos.mjs`.

Entradas: `src/recursos/objects.json` (116 objetos, 51 referencias, 17345 objetos orbitales) y `src/recursos/data.json` (9 artefactos). Catálogo de la app: 116 objetos y 85 referencias.

## 1. Objetos

- Emparejados: **115 de 116** (método: id: 69, nombre: 15, nombre⊂: 26, mision+tipo: 2, alias: 1, nombre⊃: 2).
- Objetos de la app con algún dato del equipo (`fuente_equipo: true`): 116.
- Huecos rellenados desde el equipo: masa_kg 0, casi_fallo 3, leccion 5, logro 0.
- Artefactos de `data.json` volcados: 9 (apollo-11-lunar-module → luna-apollo-11-lm-descenso; sojourner-rover → marte-pathfinder-sojourner; spirit-rover → marte-spirit; opportunity-rover → marte-opportunity; viking-1-lander → marte-viking-1; viking-2-lander → marte-viking-2; phoenix-lander → marte-phoenix; insight-lander → marte-insight; ingenuity-helicopter → marte-ingenuity).

### 1.1 Sin pareja

Equipo (no existen en la app):
- `marte-mars-6` — Mars 6 (Marte, 1974, -23.9, -19.42)

App (no existen en objects.json del equipo):
- `marte-ingenuity` — Helicóptero Ingenuity (recibe el artefacto de data.json)

Nota: el equipo agrupa Perseverance e Ingenuity en un solo registro (`marte-perseverance-ingenuity`); se emparejó con `marte-perseverance` y el helicóptero recibe su ficha desde `data.json`.

### 1.2 Coordenadas

Regla: se conservan las de la app (cotejadas con el NSSDCA). Se listan diferencias mayores de 0,05°.

Discrepancias (ambas con valor) — 4:

| id | app lat | app lon | equipo lat | equipo lng | delta máx (°) |
| --- | --- | --- | --- | --- | --- |
| marte-viking-1 | 22.269 | -47.951 | 22.48 | -49.97 | 2.019 |
| marte-pathfinder-sojourner | 19.095 | -33.253 | 19.33 | -33.55 | 0.297 |
| marte-beagle-2 | 11.5 | 90.4 | 10.6 | 90 | 0.9 |
| marte-perseverance | 18.4447 | 77.4508 | 18.3628 | 77.5945 | 0.144 |

Coordenadas del equipo NO adoptadas (la app las tiene en null / paradero desconocido) — 2:

| id | equipo lat | equipo lng | nota del equipo |
| --- | --- | --- | --- |
| luna-change-5-ascenso | -30 | 0 | Etapa de ascenso de Chang'e 5 estrellada a propósito; sitio más probable: cráter Regiomontanus. |
| marte-mars-polar-lander | -76.57 | 165.2 | Perdido durante el descenso; posición leída de mapa HiRISE. |

Objetos con coordenadas en la app pero sin coordenadas en el equipo — 2:

| id | app lat | app lon |
| --- | --- | --- |
| luna-surveyor-4 | 0.5 | -1.5 |
| marte-schiaparelli | -2.07 | -6.21 |

Luna 2: la app y el equipo coinciden en 30, 0; según la nota del equipo y el código NSSDCA "a" es una aproximación (zona 29–31 N, 1 W–1 E), no un sitio identificado.

Diferencias con los artefactos de `data.json` (informativas) — 4:

| id | artefacto | app lat | app lon | data.json lat | data.json lng | delta máx (°) |
| --- | --- | --- | --- | --- | --- | --- |
| marte-viking-1 | viking-1-lander | 22.269 | -47.951 | 22.7 | -47.95 | 0.431 |
| marte-viking-2 | viking-2-lander | 47.668 | 134.28 | 47.64 | -134.26 | 91.46 |
| marte-pathfinder-sojourner | sojourner-rover | 19.095 | -33.253 | 19.33 | -33.52 | 0.267 |
| marte-ingenuity | ingenuity-helicopter | 18.5 | 77.4 | 18.4 | 77.3 | 0.1 |

### 1.3 Fechas (`fecha` vs `date`)

- Iguales: 80.
- Misma fecha con distinta precisión (año vs día): 14.
- Distintas: 0.
- Espacio profundo: el equipo usa la fecha de fin de misión, que coincide con `fecha_fin` de la app (`fecha` es el lanzamiento): 5.
- Sin fecha en el equipo: 15. Sin fecha en la app: 0.

Distintas:

(ninguna)

Coinciden con `fecha_fin` (espacio profundo):

| id | app fecha | app fecha_fin | equipo date |
| --- | --- | --- | --- |
| espacio-profundo-pioneer-10 | 1972-03-03 | 2003-01-23 | 2003-01-23 |
| espacio-profundo-pioneer-11 | 1973-04-06 | 1995-09-30 | 1995-09-30 |
| espacio-profundo-near-shoemaker | 1996-02-17 | 2001-02-28 | 2001-02-28 |
| espacio-profundo-dawn | 2007-09-27 | 2018-11-01 | 2018-11-01 |
| espacio-profundo-kepler | 2009-03-07 | 2018-10-30 | 2018-10-30 |

Distinta precisión:

| id | app | equipo |
| --- | --- | --- |
| marte-mars-2 | 1971-11-27 | 1971 |
| marte-mars-3 | 1971-12-02 | 1971 |
| marte-viking-1 | 1976-07-20 | 1976 |
| marte-viking-2 | 1976-09-03 | 1976 |
| marte-pathfinder-sojourner | 1997-07-04 | 1997 |
| marte-mars-polar-lander | 1999-12-03 | 1999 |
| marte-beagle-2 | 2003-12-25 | 2003 |
| marte-spirit | 2004-01-04 | 2004 |
| marte-opportunity | 2004-01-25 | 2004 |
| marte-phoenix | 2008-05-25 | 2008 |
| marte-curiosity | 2012-08-06 | 2012 |
| marte-schiaparelli | 2016-10-19 | 2016 |
| marte-insight | 2018-11-26 | 2018 |
| marte-perseverance | 2021-02-18 | 2021 |

Sin fecha en el equipo: `luna-luna-10` (app: 1966), `luna-luna-11` (app: 1966), `luna-luna-12` (app: 1967), `luna-lunar-orbiter-4` (app: 1967), `luna-luna-14` (app: 1968), `luna-apollo-10-lm-descenso` (app: 1969), `luna-apollo-11-lm-ascenso` (app: 1969), `luna-apollo-16-lm-ascenso` (app: 1972), `luna-apollo-16-brazo-espectrometro` (app: 1972), `luna-luna-19` (app: 1973), `luna-explorer-35` (app: 1973), `luna-apollo-15-subsatelite` (app: 1973), `luna-luna-22` (app: 1976), `luna-explorer-49` (app: 1977), `luna-ouna` (app: 2009).

Sin fecha en la app: —.

### 1.4 Banderas

`verificado_lroc` vs `lroc_verified` — 1 diferencias:

| id | app | equipo |
| --- | --- | --- |
| luna-cohete-no-identificado-2022 | true | false |

`paradero_desconocido` vs `whereabouts_unknown` — 9 diferencias (5 son de espacio profundo, donde el equipo marca "desconocido" por no tener lat/lon mientras la app usa `ubicacion` y paradero conocido; el resto son diferencias reales de criterio):

| id | app | equipo |
| --- | --- | --- |
| luna-surveyor-4 | false | true |
| luna-change-5-ascenso | true | false |
| marte-mars-polar-lander | true | false |
| marte-schiaparelli | false | true |
| espacio-profundo-pioneer-10 | false | true |
| espacio-profundo-pioneer-11 | false | true |
| espacio-profundo-near-shoemaker | false | true |
| espacio-profundo-dawn | false | true |
| espacio-profundo-kepler | false | true |

### 1.5 Masa

Rellenada desde el equipo (la app la tenía en null) — 0:

(ninguna)

Ambas con valor pero distintas (se conserva la de la app) — 5:

| id | app | equipo | origen |
| --- | --- | --- | --- |
| luna-apollo-11-lm-descenso | 2034 | 15103 | objects.json |
| marte-viking-1 | 572 | 576 | objects.json |
| marte-viking-2 | 572 | 576 | objects.json |
| marte-pathfinder-sojourner | 370 | 10.5 | objects.json |
| marte-perseverance | 1025 | 1.8 | objects.json |

Lectura: el 15 103 kg del equipo para Apollo 11 es el módulo lunar completo (la app guarda la etapa de descenso); 10,5 kg es solo el rover Sojourner (la app guarda módulo + rover); 1,8 kg es Ingenuity (registro combinado del equipo, emparejado con Perseverance).

### 1.6 Textos de data.json vs objects.json

Campos donde `objects.json` y `data.json` traen textos distintos para el mismo objeto (se conserva el de `objects.json`): ninguno.

## 2. Referencias

- Referencias del equipo: 51. Ya estaban en la app (misma URL normalizada): **24**. Añadidas: **27** (ids 86–112).
- Grupos nuevos: ninguno.

Coincidencias (n.º equipo → id app): 1→1, 2→2, 3→3, 5→5, 6→6, 7→7, 8→8, 9→9, 10→10, 11→15, 18→21, 23→27, 25→30, 29→34, 34→38, 35→39, 38→43, 39→44, 42→47, 43→48, 44→51, 45→52, 50→57, 51→58.

Añadidas:

| id | n.º equipo | grupo | autor | año | título | primaria | url |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 86 | 4 | Datos y catálogos (fuentes primarias) | NASA NSSDCA | — | Apollo tables: Where are they now? / Impact sites | true | https://webarchive.library.unt.edu/eot2008/20090117184326/http:/nssdc.gsfc.nasa.gov/planetary/lunar/apollo_tables.html |
| 87 | 12 | Historia 1957–1961 | Astronomy | 2020 | Vanguard 1: Earth's oldest artificial satellite that's still in orbit | false | https://www.astronomy.com/?p=44837 |
| 88 | 13 | Historia 1957–1961 | Linda Hall Library | 2025 | Scientist of the Day: Vanguard 1 | false | https://www.lindahall.org/about/news/scientist-of-the-day/vanguard-1/ |
| 89 | 14 | Historia 1957–1961 | Kruczek, T. / KeepTrack | — | Vanguard debris, 68 years late | false | https://keeptrack.space/deep-dive/vanguard-debris-68-years-late |
| 90 | 15 | Historia 1957–1961 | Kruczek, T. / KeepTrack | — | Project Vanguard | false | https://www.keeptrack.space/deep-dive/project-vanguard |
| 91 | 16 | Historia 1957–1961 | Discover Magazine | — | Vanguard 1: Earth's oldest artificial satellite | false | https://www.discovermagazine.com/vanguard-1-earths-oldest-artificial-satellite-thats-still-in-orbit-41683 |
| 92 | 17 | Historia 1957–1961 | NASA JSC | 1999 | Orbital Debris: A Chronology, p. 18 (citado en 1961 in spaceflight) | false | https://www.Wikipedia.com/wiki/1961_in_spaceflight |
| 93 | 19 | Misiones Apollo | NASA APPEL | 2019 | This Month in NASA History: Tragedy Strikes the Apollo Program | true | https://appel.nasa.gov/2019/01/31/this-month-in-nasa-history-tragedy-strikes-the-apollo-program |
| 94 | 20 | Misiones Apollo | Britannica | — | Apollo 13: Reentry and splashdown / Review Board | false | https://www.britannica.com:443/topic/Apollo-13-mission/Reentry-and-splashdown |
| 95 | 21 | Misiones Apollo | StarDate | 2019 | Apollo 12 lightning strike | false | https://legacy.stardate.org/radio/program/2019-11-14 |
| 96 | 22 | Misiones Apollo | Robinson, M. / LROC, Arizona State University | 2022 | Mystery Rocket Body Found! | true | https://www.lroc.asu.edu/images/1261 |
| 97 | 24 | Misiones Apollo | Live Science | — | Chinese rocket carrying 'undisclosed' object crashed into the moon | false | https://www.livescience.com/space/the-moon/chinese-rocket-carrying-undisclosed-object-crashed-into-the-moon-and-left-twin-craters-study-claims |
| 98 | 26 | Luna: desechos humanos y vida | SYFY Wire | 2019 | NASA wants to go check out the poop the Apollo missions left | false | https://syfy.com/syfywire/nasa-wants-poop-apollo-left-on-moon |
| 99 | 27 | Luna: desechos humanos y vida | Business Insider India | 2024 | Lunar loo: did Apollo astronauts' 96 bags seed the Moon with life? | false | https://businessinsider.in/science/space/article/lunar-loo-did-apollo-astronauts-96-bags-of-poop-and-urine-seed-the-moon-with-life/articleshow/113413267.cms |
| 100 | 28 | Luna: desechos humanos y vida | Wired | — | Pooping on the Moon is a messy business | false | https://space4peace.org/?p=11292 |
| 101 | 30 | Luna: desechos humanos y vida | Wikipedia | 2023 | Tardigrades on the Moon | false | https://kaweah.freedombox.rocks/kiwix/wikipedia_en_all_maxi_2023-10/Tardigrades_on_the_Moon |
| 102 | 31 | Luna: desechos humanos y vida | Spacewatchtower | 2019 | NASA studying Earth bacteria in space (Surveyor 3) | false | https://spacewatchtower.blogspot.com/2019/04/nasa-studying-earth-bacteria-in-space.html |
| 103 | 32 | Marte | Kilic, C. | 2022 | Mars is littered with 15,694 pounds of human trash. The Conversation, vía Astronomy | false | https://www.astronomy.com/science/mars-is-littered-with-thousands-of-pounds-of-trash-from-50-years-of-robotic-exploration/ |
| 104 | 33 | Marte | Kilic, C. | 2022 | Kilic, C. (2022), vía Nanowerk | false | https://www.nanowerk.com/news2/space/newsid=61491.php |
| 105 | 36 | Marte | — | 2024 | Mars is littered with junk. Historians want to save it | false | https://ccstartup.com/blog/?p=282812 |
| 106 | 37 | Espacio profundo | NASA | 2018 | NASA's Dawn Mission to Asteroid Belt Comes to End | true | https://solarsystem.nasa.gov/news/746/nasas-dawn-mission-to-asteroid-belt-comes-to-end |
| 107 | 40 | Espacio profundo | NASA | — | Pioneer 10 sends last signal (incluye Pioneer 11) | true | https://solarsystem.nasa.gov/news/329/pioneer-10-sends-last-signal |
| 108 | 41 | Espacio profundo | Davis, J. / The Planetary Society | 2018 | Farewell, Kepler | false | https://www.planetary.org/articles/farewell-kepler |
| 109 | 46 | Órbita terrestre: efectos y futuro | NASA | 2018 | USA Space Debris Environment, Operations, and Research Updates | true | https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20180001749.pdf |
| 110 | 47 | Órbita terrestre: efectos y futuro | Live Science | 2024 | ISS dodges its 39th piece of potentially hazardous space junk | false | https://www.livescience.com/space/space-exploration/iss-dodges-its-39th-piece-of-potentially-hazardous-space-junk-experts-say-it-wont-be-the-last |
| 111 | 48 | Órbita terrestre: efectos y futuro | Kruk, S. et al. | 2023 | The impact of satellite trails on Hubble Space Telescope observations. Nature Astronomy, 7, 262–268 (vía Phys.org) | false | https://phys.org/news/2023-03-problem-satellite-trails-marring-hubble.html |
| 112 | 49 | Órbita terrestre: efectos y futuro | Space4Peace | — | Over 6,600 tons of space junk are floating around in Earth's orbit (ClearSpace-1) | false | https://space4peace.org/?p=12121 |

## 3. Satélites (instantánea)

- Filas de entrada: 17345. Escritas en `public/data/satelites.json`: **17309**.
- Omitidas: 36 (sin lat/lon/altura: 8; altura ≤ 0 km: 0; altura > 100 000 km: 28).
- Época de las posiciones: no documentada en el archivo; se trata como instantánea ilustrativa.
- Por categoría: Fragmento 12201, Satélite inactivo 2855, Cuerpo de cohete 2253.
- Por altura: < 500 km: 363, 500–1.000 km: 8657, 1.000–2.000 km: 3856, 2.000–20.000 km: 1760, 20.000–36.000 km: 1884, > 36.000 km: 789.
