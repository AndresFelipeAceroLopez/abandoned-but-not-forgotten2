// Contenido narrativo de todas las escenas. Cada cifra lleva su referencia (ids de referencias.json).
// Los textos "ninos" y "org" explican el mismo dato; los datos no cambian entre modos.

export const GUION = [
  { n: 1, tiempo: '0:00–0:15', ve: 'Un papelito arrugado flota en negro. Tres personas lo miran y se van.', ninos: 'Es solo un papel. No significa nada.', org: 'Es solo un papel. No significa nada.', refs: [] },
  { n: 2, tiempo: '0:15–0:35', ve: 'El papel se multiplica: 10, 100, miles. Cada papel es un punto del mapa 4D alrededor de la Tierra.', ninos: 'Hoy se siguen unos 47.000 objetos alrededor de la Tierra. Pero hay más de 68.000 grandes: uno de cada tres no aparece en ningún mapa. Y 1,5 millones más son tan pequeños que nadie los puede seguir.', org: '~47.390 objetos rastreados y catalogados (ESA DISCOS, nov-2026). El modelo MASTER-8 (feb-2026) estima 68.450 objetos > 10 cm, ~1,5 millones de 1–10 cm y ~230 millones de 1 mm–1 cm.', refs: [5] },
  { n: 3, tiempo: '0:35–0:55', ve: 'La cámara se aleja de la Tierra y viaja a la Luna. Aparecen papeles en los sitios Apollo.', ninos: 'En la Luna dejamos más de 187 toneladas. Como 30 elefantes.', org: 'Más de 187.400 kg de material humano en la Luna; lo más pesado son las terceras etapas S-IVB de los Saturno V.', refs: [10, 2] },
  { n: 4, tiempo: '0:55–1:15', ve: 'Zoom a un papel: es una bolsa blanca. Etiqueta: "96".', ninos: 'Y 96 bolsas con desechos humanos. Quizá sea el lugar con más probabilidad de que algo de la Tierra siga vivo allá. Nadie lo sabe todavía.', org: '96 bolsas de desechos humanos en las 6 misiones Apollo (1969–1972), dejadas para compensar la masa de las muestras. Supervivencia microbiana: muy improbable, pero "la mayor probabilidad de cualquier cosa que aterrizó en la Luna" (Schuerger). Hipótesis abierta; NASA GSFC propone estudiarlas in situ.', refs: [29, 30, 31, 32] },
  { n: 5, tiempo: '1:15–1:35', ve: 'Viaje a Marte. Papeles sobre Jezero: red, manta térmica, el rover Opportunity cubierto de polvo.', ninos: 'En Marte nunca ha pisado un humano, pero dejamos 7 toneladas.', org: '7.119 kg (15.694 lb) de material inactivo en Marte: masa total enviada (~9.979 kg) menos equipos activos (2.860 kg). 18 objetos en 14 misiones (UNOOSA).', refs: [37] },
  { n: 6, tiempo: '1:35–2:00', ve: 'Los papeles se dan vuelta y cada uno muestra un descubrimiento: agua en Marte, el espejo láser que aún se usa.', ninos: 'No es basura olvidada. Es nuestra historia. Explora cada pieza.', org: 'Los retrorreflectores de Apollo 11, 14 y 15 y de Lunokhod 1 y 2 siguen en uso (ILRS). No es basura olvidada: es nuestra historia. Explora cada pieza.', refs: [11, 12] },
];

export const PROLOGO_PASOS = [
  { titulo: 'Es solo un papel', ninos: 'Mira ese punto. Es un papel arrugado que alguien dejó flotando. Parece que no significa nada.', org: 'Cada punto es un objeto catalogado por Space-Track (≥ ~10 cm). Posiciones calculadas con elementos medios y las ecuaciones de Kepler; tamaños aumentados para que se vean.', refs: [5] },
  { titulo: 'Se multiplica', ninos: 'Hoy se siguen unos 47.000 objetos alrededor de la Tierra. Mueve el año y mira cómo aparecen.', org: '~47.390 objetos rastreados y catalogados; ~28.570 satélites lanzados desde 1957, ~19.610 siguen en el espacio y ~15.800 funcionan (ESA DISCOS, 2-nov-2026).', refs: [5] },
  { titulo: 'Uno de cada tres es invisible', ninos: 'Pero hay más de 68.000 objetos grandes. Uno de cada tres no aparece en ningún mapa. Y 1,5 millones más son tan chiquitos que nadie los puede seguir.', org: 'MASTER-8 (feb-2026) estima 68.450 objetos > 10 cm (de ellos ~11.300 satélites activos), ~1,5 millones de 1–10 cm y ~230 millones de 1 mm–1 cm. Más de 660 fragmentaciones; > 17.500 t en órbita.', refs: [5, 6] },
  { titulo: 'Esto pasa cerca de casa', ninos: 'Y todo esto es solo lo que pasa cerca de casa. Ahora viajemos a la Luna.', org: 'La brecha entre fragmentos detectados y catalogados crece (ESA, informe 2026). El Índice de Salud del Entorno Espacial pasó de ~4 a ~50 en un año. Esto es el prólogo: el núcleo del reto está en la Luna y Marte.', refs: [6] },
];

export const LUNA_PASOS = [
  { titulo: 'Más de 187 toneladas', ninos: 'En la Luna dejamos más de 187 toneladas. ¡Como 30 elefantes! Cada punto es una cosa que quedó allá.', org: '> 187.400 kg de material antropogénico. 96 objetos en la tabla del NSSDCA: 63 son impactos o choques, no aterrizajes.', refs: [10, 2] },
  { titulo: 'Casi falla → lección → objeto', ninos: 'Casi todas las misiones Apollo estuvieron a punto de fallar. Cada vez aprendieron algo nuevo. Activa el filtro Apollo y toca un punto.', org: 'Arco narrativo por objeto: qué casi salió mal, qué lección quedó y qué objeto permanece (Johnson, NASA JSC 2018). Filtro "Apollo" = 21 filas.', refs: [21, 2, 3] },
  { titulo: 'A propósito', ninos: 'Muchos cohetes no se perdieron: los lanzaron contra la Luna a propósito para sentir un temblor. ¡Como tocar una campana gigante!', org: 'Las etapas de ascenso (Apollo 12, 14, 15, 17) y los S-IVB (13–17) se estrellaron como fuentes sísmicas para los sismómetros pasivos del ALSEP.', refs: [4, 27] },
  { titulo: 'Lo que sigue trabajando', ninos: 'Hay espejitos que todavía devuelven un rayo láser cada noche. Están en dorado.', org: 'Retrorreflectores de Apollo 11, 14, 15 y Lunokhod 1, 2 en uso (ILRS). Insignias: "visto por LRO" (código NSSDCA "d") y "paradero desconocido" (código "g").', refs: [11, 12, 2] },
];

export const MARTE_PASOS = [
  { titulo: 'Nadie ha pisado Marte', ninos: 'En Marte nunca ha pisado un humano, pero dejamos 7 toneladas de robots, paracaídas y escudos.', org: '7.119 kg de material inactivo (Kilic, 2022): hardware descartado, 9 naves inactivas y naves estrelladas. 18 objetos en 14 misiones (UNOOSA).', refs: [37] },
  { titulo: 'Una red en el camino', ninos: 'El rover Perseverance encontró una maraña de red de su propio aterrizaje. Sus científicos anotan cada pedacito para no confundirlo con una roca.', org: 'Perseverance documentó una maraña de red de su EDL el 12-jul-2022. Las ruedas de Curiosity han dejado pedacitos de aluminio. El equipo documenta cada desecho para no contaminar las muestras.', refs: [37] },
  { titulo: 'Protección planetaria', ninos: 'Las naves se limpian muchísimo antes de salir. Las pocas bacterias que viajan ni siquiera cubrirían el lente de la cámara de un celular.', org: 'Mars 2020: < 500.000 esporas en toda la nave; ≤ 300.000 en las partes que aterrizaron; 41.000 en el rover (NASA JPL). Hoy no existe una forma compatible con COSPAR de enviar humanos.', refs: [38, 39] },
  { titulo: 'La pregunta', ninos: 'Si algún día llevamos humanos y sus desechos a Marte, ¿cómo sabremos si la vida que encontremos es marciana o nuestra?', org: 'Coordenadas de Spirit y Opportunity: sitio de aterrizaje, no posición final. No existe inventario central de objetos en Marte (Holcomb et al., 2024).', refs: [40, 41] },
];

export const PROFUNDO_PASOS = [
  { titulo: 'Perdidos, pero no olvidados', ninos: 'Estas cinco naves ya no hablan con nosotros, pero siguen viajando. Cada una hizo algo por primera vez.', org: 'Cinco misiones NASA fuera del sistema Tierra-Luna: Pioneer 10 y 11, NEAR Shoemaker, Kepler y Dawn. Fin de misión por energía, combustible o frío; ninguna fue recuperada.', refs: [42, 43, 44, 45, 46] },
];

export const CIERRE = {
  ninos: 'Al principio dijimos: "es solo un papel, no significa nada". Ahora sabemos que cada pedazo es una historia de ciencia. No es basura olvidada: es nuestra historia, y decidir qué hacemos con ella nos toca a todos.',
  org: 'La gente pasó de "no significa nada" a ver por qué importa: cada objeto es un dato (sismos artificiales, retrorreflectores, muestras de 21,55 a 110,52 kg). No es basura olvidada: es nuestra historia, y decidir qué hacemos con ella nos toca a todos.',
};

export const MITOS = [
  { no: '"Hay heces humanas en Marte"', si: 'Las heces están en la Luna (96 bolsas Apollo). En Marte solo hay robots y algunas esporas que viajaron en ellos.', refs: [29, 38] },
  { no: '"Hay vida de la Tierra en la Luna"', si: 'Es una pregunta abierta y muy improbable. Por eso los científicos quieren traer las bolsas para estudiarlas.', refs: [31, 32] },
  { no: '"Bacterias sobrevivieron 2 años en la Surveyor 3"', si: 'Hacia 2011 ese hallazgo quedó muy cuestionado. Lo más probable es que la contaminación ocurriera en la Tierra.', refs: [36] },
  { no: '"La basura ocupa un gran porcentaje del espacio"', si: 'El problema no es el volumen, sino la densidad en órbitas concretas y las colisiones en cadena (síndrome de Kessler). Usamos número de objetos, no porcentaje.', refs: [47] },
  { no: '"Todo es basura"', si: 'Algunos objetos siguen activos, como los retrorreflectores lunares. El reto los trata como patrimonio e historia.', refs: [11] },
];

export const SESGOS = [
  { titulo: 'Solo vemos lo grande', texto: 'Los catálogos rastrean ~47.390 objetos, pero el modelo de la ESA estima 68.450 de más de 10 cm y 1,5 millones de 1 a 10 cm. El mapa muestra lo que se detecta, no todo lo que hay.', refs: [5] },
  { titulo: 'Contamos los éxitos', texto: '63 de los 96 objetos de la Luna son impactos o choques, no aterrizajes. La historia popular recuerda las huellas, no los choques.', refs: [2] },
  { titulo: 'Mirada de un solo país', texto: 'El reto es sobre NASA, pero la Luna tiene objetos de la URSS, China, India, Japón, Israel y otros. La ley de patrimonio lunar solo cubre sitios y actores de EE. UU.', refs: [58, 57] },
  { titulo: 'Lo que no se ve no se cuenta', texto: 'No existe un inventario central de objetos en Marte, y un grupo de arqueólogos pide crearlo.', refs: [40, 41] },
  { titulo: '¿Basura o patrimonio?', texto: 'El mismo objeto puede llamarse de una u otra forma según quién lo mire; Kilic dice que las naves inactivas en Marte son más reliquias que basura.', refs: [37] },
  { titulo: 'Sesgos de nuestros propios datos', texto: 'Las coordenadas de Spirit y Opportunity son del aterrizaje, no de donde quedaron, y 18 objetos lunares no tienen paradero conocido. El mapa lo dice.', refs: [2, 8] },
];

export const HISTORIA_1957 = [
  { fecha: '4-oct-1957', hecho: 'La URSS lanza el Sputnik 1. Su cohete reentró a las pocas semanas y el satélite el 4 de enero de 1958.', importa: 'El primer "papel": también el primer cohete que quedó dando vueltas.', refs: [17] },
  { fecha: '3-nov-1957', hecho: 'Sputnik 2, con la perra Laika; reentró el 14 de abril de 1958.', importa: 'Los primeros objetos caían solos porque estaban bajos.', refs: [17] },
  { fecha: '6-dic-1957', hecho: 'El cohete Vanguard TV-3 explota en la plataforma, en televisión.', importa: 'La prisa de la carrera espacial.', refs: [16] },
  { fecha: '31-ene-1958', hecho: 'Explorer 1, primer satélite de EE. UU.; reentró el 31 de marzo de 1970.', importa: '', refs: [18] },
  { fecha: '17-mar-1958', hecho: 'Vanguard 1 llega a órbita. Dejó de transmitir en 1964 y sigue allá.', importa: 'El satélite más viejo en órbita; se estimó que duraría 2.000 años (hoy, unos 240).', refs: [14, 13] },
  { fecha: '17-mar-1958', hecho: 'La tercera etapa del Vanguard (1958-002A) queda en órbita.', importa: 'La basura espacial más antigua que sigue en órbita.', refs: [13, 15] },
  { fecha: '1958', hecho: 'Se crea NASA; el equipo del Vanguard pasa a formar el núcleo de Goddard.', importa: 'El NSSDCA, de donde vienen nuestros datos, está en Goddard.', refs: [19] },
  { fecha: '13-sep-1959', hecho: 'Luna 2 (URSS) se estrella contra la Luna; su tercera etapa también.', importa: 'El primer objeto humano en la Luna.', refs: [2] },
  { fecha: '29-jun-1961', hecho: 'La etapa Ablestar del Transit 4A explota 2 horas después del lanzamiento: al menos 294 piezas rastreables.', importa: 'Primera rotura accidental en el espacio; triplicó los objetos conocidos.', refs: [20] },
  { fecha: '1978', hecho: 'Kessler y Cour-Palais publican que los choques pueden crear un cinturón de basura. Un año después NASA crea su Oficina de Basura Orbital.', importa: 'Nace la idea del síndrome de Kessler.', refs: [47, 49] },
  { fecha: '11-ene-2007', hecho: 'China destruye su satélite Fengyun-1C en una prueba antisatélite: más de 3.000 objetos rastreados.', importa: 'La nube más grande hecha a propósito.', refs: [50] },
  { fecha: '10-feb-2009', hecho: 'Primer choque accidental entre dos satélites intactos (Iridium 33 y Cosmos 2251), a 790 km; más de 1.400 fragmentos mayores de 10 cm.', importa: 'El cinturón ya se forma solo.', refs: [51] },
  { fecha: '4-mar-2022', hecho: 'Un propulsor no identificado deja un doble cráter de unos 29 m en la Luna, cerca del cráter Hertzsprung.', importa: 'Un "papel sin dueño" llegó a la Luna.', refs: [26, 28] },
];

export const CURIOSIDADES_ORBITA = [
  { texto: 'En 1957 el NORAD empezó una base de datos de objetos en órbita, y el primero fue el Sputnik.', refs: [85] },
  { texto: 'En 2008, a la astronauta Heidemarie Stefanyshyn-Piper se le escapó una caja de herramientas en una caminata espacial; dio más de 4.000 vueltas a la Tierra antes de desintegrarse casi un año después.', refs: [85] },
  { texto: 'Estos objetos viajan a más de 28.000 km/h, por eso hasta una escama de pintura es un proyectil.', refs: [85] },
  { texto: 'Tres tipos de basura (ESA): carga útil, etapas de cohetes y objetos relacionados con las misiones (tornillos, cables, cámaras).', refs: [85, 5] },
  { texto: 'De todas las fragmentaciones, solo siete fueron por colisión; la mayoría fueron explosiones por restos de combustible.', refs: [85] },
];

export const EFECTOS = [
  { ambito: 'Estación Espacial', efecto: '41 maniobras para esquivar objetos rastreados desde 1999.', refs: [52] },
  { ambito: 'Riesgo invisible', efecto: 'Esquivar los objetos rastreados (casi todos de 10 cm o más) cubre menos del 1 % del riesgo de perder una misión.', refs: [53] },
  { ambito: 'Constelaciones', efecto: 'Starlink reportó unas 50.000 maniobras entre dic-2023 y may-2024.', refs: [54] },
  { ambito: 'Astronomía', efecto: 'El 2,7 % de las imágenes del Hubble (2002–2021) tiene estelas de satélites, y la proporción sube.', refs: [55] },
  { ambito: 'Sostenibilidad', efecto: 'El Índice de Salud del Entorno Espacial de la ESA pasó de ~4 a ~50 en un año.', refs: [6] },
  { ambito: 'Ciencia en Marte', efecto: 'El equipo de Perseverance documenta cada desecho para que no contamine las muestras.', refs: [37] },
  { ambito: 'Patrimonio lunar', efecto: 'Desde dic-2020 una ley de EE. UU. obliga a sus misiones a respetar los sitios Apollo.', refs: [57] },
];

export const FUTURO = [
  { pregunta: '¿Qué pasaría si los choques se encadenan?', texto: 'En 1978 Kessler y Cour-Palais dijeron que el cinturón podía empezar a formarse en el siglo XX y ser un problema serio en el XXI. En 2012, Kessler dijo que la cascada ya empezó y avanza poco a poco.', refs: [47, 48] },
  { pregunta: '¿Qué pasaría si la Luna se llena de tráfico?', texto: 'Entre 2023 y 2025 se sumaron 9 objetos a la tabla del NSSDCA (Japón, Rusia, India, EE. UU. y China). Con Artemis y las empresas privadas, los sitios Apollo pueden quedar cerca de nuevos aterrizajes.', refs: [2] },
  { pregunta: '¿Qué pasaría si llevamos humanos a Marte?', texto: 'Hoy no existe una forma de enviar humanos a Marte que cumpla las normas de COSPAR.', refs: [39] },
  { pregunta: '¿Qué pasaría si empezamos a limpiar?', texto: 'La ESA planea que ClearSpace-1 retire el satélite PROBA-1; la misión ahora apunta a 2029.', refs: [56] },
];

export const PATRONES = [
  { titulo: '"La Tierra no es el espacio"', misiones: 'Apollo 1, 15', texto: 'Pruebas que no imitaban el vuelo: oxígeno puro, gravedad cero.' },
  { titulo: '"Un cambio pequeño, un problema enorme"', misiones: 'Apollo 13', texto: 'Un cambio de 28 V a 65 V que nadie revisó en todas las piezas.' },
  { titulo: '"El plan B salva vidas"', misiones: 'Apollo 12, 13, 14', texto: 'Sobrevivieron porque había procedimientos y alternativas preparadas.' },
  { titulo: '"Un respaldo que de verdad respalde"', misiones: 'Apollo 12', texto: 'Copias del mismo sistema pueden fallar igual.' },
  { titulo: '"La prisa es enemiga de la seguridad"', misiones: 'Apollo 1', texto: 'La presión por el calendario llevó a decisiones contra la seguridad.' },
];

export const APOLLO_MUESTRAS = [
  { mision: 'Apollo 11', kg: 21.55, anio: 1969 },
  { mision: 'Apollo 12', kg: 34.35, anio: 1969 },
  { mision: 'Apollo 13', kg: 0, anio: 1970 },
  { mision: 'Apollo 14', kg: 42.28, anio: 1971 },
  { mision: 'Apollo 15', kg: 77.31, anio: 1971 },
  { mision: 'Apollo 16', kg: 95.71, anio: 1972 },
  { mision: 'Apollo 17', kg: 110.52, anio: 1972 },
];

// ---------- Acto 2 ----------
export const DANOS = [
  { caso: 'Tulsa, EE. UU., ene-1997', que: 'Lottie Williams fue tocada en el hombro por un fragmento de un cohete Delta II; salió ilesa y es la única persona conocida golpeada por basura espacial.', refs: [60] },
  { caso: 'Naples, EE. UU., 8-mar-2024', que: 'Un trozo del pallet de baterías de la Estación Espacial (2.630 kg en total) atravesó el techo de una casa; NASA esperaba que se quemara completo.', refs: [59] },
  { caso: 'Norte de Canadá, 24-ene-1978', que: 'El satélite soviético Kosmos 954 cayó con su reactor nuclear y esparció restos radiactivos sobre unos 124.000 km²; la limpieza tomó 9 meses. Los habitantes Dene, cerca del Gran Lago del Esclavo, vivían donde cayeron los restos.', refs: [61, 62] },
  { caso: 'Órbita y cielo', que: '41 maniobras de la Estación y estelas de satélites en el 2,7 % de las imágenes del Hubble.', refs: [52, 55] },
];
export const DANOS_TEXTO = {
  ninos: 'Lo que se deja en el espacio no siempre se queda allá. A veces cae sobre personas que no decidieron el lanzamiento.',
  org: 'Reentradas no controladas con daño documentado en superficie. El caso Kosmos 954 (Operación Morning Light) es el mejor ejemplo de que el daño cae sobre quienes no decidieron el lanzamiento.',
};

export const RADIACTIVOS = [
  { donde: 'Luna', que: '5 generadores SNAP-27 (Apollo 12, 14, 15, 16 y 17), cada uno con unos 3,9 kg de plutonio-238 en óxido; alimentaban los ALSEP.', refs: [63, 65] },
  { donde: 'Fondo del Pacífico', que: 'El SNAP-27 del Apollo 13 cayó al Pacífico, en la zona de la fosa de Tonga, sin liberar plutonio, porque la misión no alunizó.', refs: [64] },
  { donde: 'Marte', que: 'Curiosity y Perseverance usan un MMRTG con 4,8 kg de dióxido de plutonio; los Viking usaban SNAP-19.', refs: [66, 63] },
  { donde: 'Espacio profundo', que: 'Pioneer 10 y 11 llevan generadores SNAP-19.', refs: [63] },
  { donde: 'Órbita terrestre', que: '16 reactores soviéticos RORSAT soltaron gotas de refrigerante sodio-potasio (NaK) a 900–950 km; las de más de 1 cm seguirán décadas en órbita.', refs: [67, 68] },
];
export const RADIACTIVOS_TEXTO = {
  ninos: 'Algunas naves llevan una batería especial que funciona con el calor de un material radiactivo. Están identificadas y tienen un blindaje diseñado para contenerlas.',
  org: 'Fuentes identificadas, casi todas colocadas a propósito como generadores termoeléctricos de radioisótopos (Pu-238, vida media 87,7 años) con blindaje de contención. Excepción: refrigerante NaK de los RORSAT.',
};

export const SIN_NOMBRE = [
  { texto: 'En órbita: con datos de 2024, 7.967 de los 39.246 objetos rastreados (20,3 %) estaban clasificados como no identificados. El informe 2026 dice que esta brecha sigue creciendo.', refs: [7, 6] },
  { texto: 'Núcleos perdidos: de los reactores RORSAT, los núcleos de Cosmos 1670, 1677 y 1900 no han sido detectados.', refs: [69] },
  { texto: 'En la Luna: 18 de 96 objetos sin paradero conocido, y el propulsor que dejó el doble cráter en 2022. China negó que fuera suyo; un estudio posterior sostiene que era el cohete de Chang\'e 5-T1 con una masa adicional no explicada.', refs: [2, 26, 28] },
];
export const SIN_NOMBRE_TEXTO = {
  ninos: 'No sabemos qué son ni de quién son muchos de los papeles. En el mapa son grises, sin nombre ni bandera.',
  org: 'Objetos sin vínculo a fuente: en el mapa, los de tipo "sin identificar" (Space-Track UNKNOWN/TBA) y sin país se dibujan en gris.',
};

export const NO_ES_BASURA = [
  { titulo: 'Sigue trabajando', texto: 'Los retrorreflectores láser de Apollo 11, 14 y 15 y de los Lunokhod 1 y 2 siguen en uso. Curiosity y Perseverance siguen activos en Marte.', refs: [11] },
  { titulo: 'Patrimonio', texto: 'Los sitios Apollo están protegidos por ley en EE. UU.; Kilic dice que las naves inactivas en Marte son más reliquias que basura.', refs: [57, 37] },
  { titulo: 'Mensajes', texto: 'Pioneer 10 y 11 llevan placas con un mensaje de la humanidad.', refs: [44, 45] },
  { titulo: 'Ciencia guardada', texto: 'Los datos de Kepler se siguen analizando.', refs: [46] },
];

export const ASAT = [
  { anio: 2007, pais: 'China', que: 'Satélite Fengyun-1C, a unos 850 km', basura: 'Más de 3.000 objetos rastreados; 2.763 seguían en órbita en 2022', tag: 'FY1C', refs: [50, 70] },
  { anio: 2008, pais: 'EE. UU.', que: 'Satélite USA-193, a baja altura', basura: 'Unos 175 fragmentos, todos ya reentraron', tag: 'USA193', refs: [71] },
  { anio: 2019, pais: 'India', que: 'Satélite propio (Microsat-R), a baja altura', basura: '11 piezas seguían en 2022', tag: 'MSR', refs: [70] },
  { anio: 2021, pais: 'Rusia', que: 'Satélite Kosmos 1408', basura: 'Más de 1.500 piezas rastreables; la tripulación de la Estación tuvo que refugiarse', tag: 'K1408', refs: [72, 73] },
];
export const PAISES_TEXTO = {
  ninos: 'La carrera espacial empezó como una competencia. Algunos países rompieron sus propios satélites para probar armas, y los pedazos siguen dando vueltas.',
  org: 'En 2022, los restos de las pruebas rusa y china causaron cerca del 20 % de las alertas de posible choque. En dic-2022, 155 países votaron en la ONU para no hacer más pruebas destructivas; 9 en contra (entre ellos China y Rusia); India se abstuvo.',
  refs: [74, 75],
};

export const UNION = [
  { titulo: 'La Estación Espacial Internacional', texto: 'Cinco agencias espaciales de 15 países la operan juntas, y la alianza se ha mantenido a pesar de los conflictos en la Tierra.', refs: [76, 77] },
  { titulo: 'Apollo-Soyuz (1975)', texto: 'EE. UU. y la URSS se acoplaron en órbita en plena Guerra Fría.', refs: [78] },
  { titulo: 'Carta Cero Basura (ESA)', texto: 'Busca no añadir basura para 2030; en noviembre de 2026 pasaba de 250 firmantes en 36 países.', refs: [81, 80] },
];
export const UNION_TEXTO = {
  ninos: 'La misma órbita es de todos. Mira cómo los colores de cada país se funden en uno solo: el de la humanidad.',
  org: 'Cooperación existente como base: ISS, Apollo-Soyuz, Carta Cero Basura. En el mapa, la coloración por país se funde en un solo color.',
};

export const CORTOS = [
  { titulo: 'El papel que nadie recogió', sinopsis: 'Un papel cae del bolsillo de un astronauta, flota 50 años y lo encuentra un niño del futuro.', dato: 'El objeto más viejo en órbita es la tercera etapa del Vanguard, de 1958.', refs: [13, 15] },
  { titulo: 'Todavía trabajo', sinopsis: 'Un espejito en la Luna devuelve un rayo láser cada noche aunque nadie lo visite.', dato: 'Los retrorreflectores de Apollo 11, 14 y 15 siguen en uso desde 1969.', refs: [11] },
  { titulo: 'Sin bandera', sinopsis: 'Un fragmento gris pregunta a todos "¿de quién soy?" y nadie responde.', dato: 'En 2024, el 20,3 % de los objetos rastreados no tenía identificación.', refs: [7] },
  { titulo: 'La red', sinopsis: 'Los papeles de todos los países se juntan y forman una red que atrapa la basura en lugar de crearla.', dato: 'Más de 250 firmantes en 36 países apoyan la Carta Cero Basura (nov-2026).', refs: [81] },
];
export const CORTOS_NOTA = 'Referencia de tono: WALL-E (Pixar, 2008). No se usan clips, imágenes ni el personaje: tienen derechos de autor. Los cortos son propios, de 15 a 30 segundos, con personajes originales, y cada uno cierra con un dato real y su fuente.';

export const SOLUCIONES = [
  { tipo: 'Norma', solucion: 'Regla de 5 años de la FCC (EE. UU.): los satélites en órbita baja deben salir de órbita a más tardar 5 años después de su misión (antes eran 25).', estado: 'Aprobada el 29-sep-2022', refs: [82] },
  { tipo: 'Compromiso', solucion: 'Carta Cero Basura: no añadir basura para 2030.', estado: '12 países firmaron en may-2024; más de 250 firmantes en 36 países en nov-2026', refs: [79, 81] },
  { tipo: 'Política', solucion: 'Moratoria de pruebas antisatélite destructivas.', estado: 'Resolución ONU, dic-2022, 155 votos a favor', refs: [75] },
  { tipo: 'Tecnología', solucion: 'ADRAS-J (Astroscale/JAXA) se acercó a 15 m de una etapa de cohete H-IIA de 2009; la fase II la capturará y sacará de órbita.', estado: 'Demostración en 2024', refs: [83] },
  { tipo: 'Tecnología', solucion: 'ClearSpace-1 (ESA): primera misión europea de retiro.', estado: 'Apunta a 2029', refs: [56] },
  { tipo: 'Reciclaje', solucion: 'NASA LunaRecycle: premio de USD 3 millones para reciclar residuos en la Luna.', estado: 'Convocatoria abierta en 2024', refs: [84] },
  { tipo: 'Patrimonio', solucion: 'Ley One Small Step: protege los sitios Apollo en misiones de EE. UU.', estado: 'Ley desde dic-2020', refs: [57] },
  { tipo: 'Contaminación biológica', solucion: 'Protección planetaria: Mars 2020 llevó menos de 500.000 esporas.', estado: 'Aplicada', refs: [38] },
];
export const MEDIDAS_TECNICAS = [
  ['Escudos Whipple', 'Una capa exterior que protege las paredes de la Estación Espacial y de muchos satélites contra impactos.'],
  ['Pasivación', 'Vaciar las fuentes de energía (combustible, baterías) al final de la misión para que el satélite o la etapa no explote.'],
  ['Salida de órbita programada', 'El satélite baja por sí mismo al final de su vida y se quema en la atmósfera.'],
  ['Órbitas que decaen solas', 'Órbitas elípticas con el punto más bajo dentro de la atmósfera.'],
  ['Cohetes reutilizables', 'Etapas que regresan intactas en lugar de quedar en órbita.'],
  ['Láser (en estudio)', 'Frenar fragmentos vaporizando un poco de su superficie para que caigan.'],
];
export const SOLUCIONES_FALTA = 'Falta lo más difícil: no existe un inventario único y abierto de todo lo que dejamos fuera de la Tierra, ni un acuerdo obligatorio entre todos los países.';

// La sección "La solución que proponemos" está vacía en la planeación: el equipo debe completarla.
export const PROPUESTA = {
  pendiente: true,
  titulo: 'Recoger por fases y enviar al Sol',
  ninos: 'Nuestra idea: satélites que solo sirven para limpiar. Primero recogen todo lo que sea metal con un imán gigante; después, con una malla, lo demás. Cada país que manda satélites también los limpia. Y cuando Mercurio y Venus se esconden detrás del Sol, mandamos la basura hacia el Sol.',
  org: 'Propuesta del equipo (borrador): remoción activa por fases con satélites dedicados a limpieza (fase 1: captación magnética de metales; fase 2: malla para no metálicos), protocolo "1 lanzamiento = 1 limpieza" para cada país que lance, regulación a definir (ONU/COSPAR/acuerdo multilateral), y envío de lo recogido hacia el Sol en las ventanas en que Mercurio y Venus quedan en conjunción superior (detrás del Sol respecto a la Tierra). Complementado con un inventario único y abierto, del que esta app es el prototipo.',
  pasos: [
    'Satélites exclusivos para limpieza: fase 1 con captación magnética (metal), fase 2 con malla (otros materiales).',
    'Protocolo: cada país que manda satélites también los limpia; quién lo regula queda como decisión abierta.',
    'Ventanas hacia el Sol: cuando Mercurio y Venus se alinean al lado contrario de la Tierra, detrás del Sol (el equipo estima cada 1 y 7 meses).',
    'Datos abiertos: un solo archivo JSON/CSV con fuente por objeto (hoy: 116 objetos, 85 referencias).',
    'Verificación: insignia "visto desde órbita" (LRO) y marca de "paradero desconocido" en lugar de inventar posiciones.',
    'Dos públicos, un dato: la misma cifra se explica para niños y para organizaciones.',
    'Colaboración: cualquier agencia o persona puede proponer una fila con su fuente primaria.',
  ],
};

export const QUIZ = [
  { pregunta: '¿Dónde están las 96 bolsas con desechos de los astronautas?', opciones: ['En Marte', 'En la Luna', 'En la Estación Espacial'], correcta: 1, explicacion: 'Las dejaron las seis misiones Apollo en la Luna para compensar el peso de las rocas que traían.', refs: [29] },
  { pregunta: '¿Cuántos objetos grandes se rastrean hoy alrededor de la Tierra?', opciones: ['Unos 470', 'Unos 4.700', 'Unos 47.000'], correcta: 2, explicacion: 'Unos 47.000 rastreados, pero hay más de 68.000 grandes: uno de cada tres no aparece en el mapa.', refs: [5] },
  { pregunta: '¿Por qué lanzaron cohetes contra la Luna a propósito?', opciones: ['Para hacer cráteres bonitos', 'Para sentir un temblor con los sismómetros', 'Para deshacerse de ellos'], correcta: 1, explicacion: 'Los sismómetros Apollo midieron el temblor y así aprendimos cómo es la Luna por dentro.', refs: [4, 27] },
  { pregunta: '¿Cuánto pesa todo lo que dejamos en la Luna?', opciones: ['Como 3 elefantes', 'Como 30 elefantes', 'Como 300 elefantes'], correcta: 1, explicacion: 'Más de 187 toneladas: como 30 elefantes.', refs: [10] },
  { pregunta: '¿Qué sigue funcionando en la Luna desde 1969?', opciones: ['Un espejo que devuelve rayos láser', 'Un carrito lunar', 'Una cámara de video'], correcta: 0, explicacion: 'Los retrorreflectores de Apollo 11, 14 y 15 todavía devuelven láseres que se disparan desde la Tierra.', refs: [11] },
  { pregunta: '¿Ha pisado algún humano Marte?', opciones: ['Sí, en 1976', 'Sí, en 2021', 'No, solo robots'], correcta: 2, explicacion: 'Nunca. Las 7 toneladas que dejamos allá son de robots, paracaídas y escudos.', refs: [37] },
];

export const PREGUNTAS_GENERALES = [
  { pregunta: '¿De dónde salen estos datos?', ninos: 'De las listas oficiales de NASA y la ESA. Abajo de cada ficha hay un botón "Fuente".', org: 'NSSDCA (Luna), Kilic 2022 / UNOOSA (Marte), ESA DISCOS y Space-Track (órbita). Lista completa en Referencias.' },
  { pregunta: '¿Por qué algunos puntos están en gris?', ninos: 'Porque nadie sabe de quién son ni qué son. Son papeles sin dueño.', org: 'Objetos sin identificación (Space-Track UNKNOWN/TBA) o sin paradero conocido (NSSDCA código "g").' },
  { pregunta: '¿Es peligroso?', ninos: 'A veces. Las naves tienen que esquivar pedazos, y una vez un trozo atravesó el techo de una casa.', org: 'ISS: 41 maniobras desde 1999; reentradas con daño (Naples 2024, Kosmos 954); evitar lo rastreado cubre < 1 % del riesgo de perder una misión.' },
];
