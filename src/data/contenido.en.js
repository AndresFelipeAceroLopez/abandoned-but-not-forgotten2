// English version of contenido.es.js. Same exports, same order, same reference ids (referencias.json).
// The "ninos" (kids) and "org" (organizations) texts explain the same fact; the data does not change between modes.

export const GUION = [
  { n: 1, tiempo: '0:00–0:15', ve: 'A crumpled piece of paper floats in the dark. Three people look at it and walk away.', ninos: "It's just a piece of paper. It means nothing.", org: "It's just a piece of paper. It means nothing.", refs: [] },
  { n: 2, tiempo: '0:15–0:35', ve: 'The paper multiplies: 10, 100, thousands. Each paper is a dot on the 4D map around Earth.', ninos: 'Today about 47,000 objects are tracked around Earth. But there are more than 68,000 big ones: one in three is not on any map. And 1.5 million more are so small that nobody can track them.', org: '~47,390 tracked and catalogued objects (ESA DISCOS, Nov 2026). The MASTER-8 model (Feb 2026) estimates 68,450 objects > 10 cm, ~1.5 million of 1–10 cm and ~230 million of 1 mm–1 cm.', refs: [5] },
  { n: 3, tiempo: '0:35–0:55', ve: 'The camera pulls away from Earth and travels to the Moon. Papers appear at the Apollo sites.', ninos: 'We left more than 187 tonnes on the Moon. That is like 30 elephants.', org: 'More than 187,400 kg of human-made material on the Moon; the heaviest items are the Saturn V S-IVB third stages.', refs: [10, 2] },
  { n: 4, tiempo: '0:55–1:15', ve: 'Zoom in on one paper: it is a white bag. Label: "96".', ninos: 'And 96 bags of human waste. It may be the place where something from Earth is most likely to still be alive up there. Nobody knows yet.', org: '96 bags of human waste from the 6 Apollo missions (1969–1972), left behind to offset the mass of the samples. Microbial survival: very unlikely, but "the highest probability of anything that landed on the Moon" (Schuerger). Open hypothesis; NASA GSFC proposes studying them in situ.', refs: [29, 30, 31, 32] },
  { n: 5, tiempo: '1:15–1:35', ve: 'Trip to Mars. Papers over Jezero: netting, a thermal blanket, the Opportunity rover covered in dust.', ninos: 'No human has ever set foot on Mars, but we left 7 tonnes there.', org: '7,119 kg (15,694 lb) of inactive material on Mars: total mass sent (~9,979 kg) minus active equipment (2,860 kg). 18 objects from 14 missions (UNOOSA).', refs: [37] },
  { n: 6, tiempo: '1:35–2:00', ve: 'The papers flip over and each one shows a discovery: water on Mars, the laser mirror that is still in use.', ninos: "It's not forgotten junk. It's our history. Explore every piece.", org: "The retroreflectors of Apollo 11, 14 and 15 and of Lunokhod 1 and 2 are still in use (ILRS). It's not forgotten junk: it's our history. Explore every piece.", refs: [11, 12] },
];

export const PROLOGO_PASOS = [
  { titulo: "It's just a piece of paper", ninos: 'Look at that dot. It is a crumpled piece of paper someone left floating. It seems to mean nothing.', org: 'Each dot is an object catalogued by Space-Track (≥ ~10 cm). Positions computed from mean elements and Kepler\'s equations; sizes enlarged so they can be seen.', refs: [5] },
  { titulo: 'It multiplies', ninos: 'Today about 47,000 objects are tracked around Earth. Move the year and watch them appear.', org: '~47,390 tracked and catalogued objects; ~28,570 satellites launched since 1957, ~19,610 still in space and ~15,800 working (ESA DISCOS, Nov 2, 2026).', refs: [5] },
  { titulo: 'One in three is invisible', ninos: 'But there are more than 68,000 big objects. One in three is not on any map. And 1.5 million more are so tiny that nobody can track them.', org: 'MASTER-8 (Feb 2026) estimates 68,450 objects > 10 cm (of which ~11,300 are active satellites), ~1.5 million of 1–10 cm and ~230 million of 1 mm–1 cm. More than 660 fragmentation events; > 17,500 t in orbit.', refs: [5, 6] },
  { titulo: 'This is happening close to home', ninos: 'And all of this is only what happens close to home. Now let\'s travel to the Moon.', org: 'The gap between detected and catalogued fragments keeps growing (ESA, 2026 report). The Space Environment Health Index went from ~4 to ~50 in one year. This is the prologue: the core of the challenge is on the Moon and Mars.', refs: [6] },
];

export const LUNA_PASOS = [
  { titulo: 'More than 187 tonnes', ninos: 'We left more than 187 tonnes on the Moon. Like 30 elephants! Each dot is something that stayed there.', org: '> 187,400 kg of anthropogenic material. 96 objects in the NSSDCA table: 63 are impacts or crashes, not landings.', refs: [10, 2] },
  { titulo: 'Near miss → lesson → object', ninos: 'Almost every Apollo mission came close to failing. Each time they learned something new. Turn on the Apollo filter and tap a dot.', org: 'Narrative arc per object: what almost went wrong, what lesson remained and what object is still there (Johnson, NASA JSC 2018). "Apollo" filter = 21 rows.', refs: [21, 2, 3] },
  { titulo: 'On purpose', ninos: 'Many rockets were not lost: they were crashed into the Moon on purpose to feel a moonquake. Like ringing a giant bell!', org: 'The ascent stages (Apollo 12, 14, 15, 17) and the S-IVBs (13–17) were crashed as seismic sources for the ALSEP passive seismometers.', refs: [4, 27] },
  { titulo: 'What is still working', ninos: 'There are little mirrors that still bounce back a laser beam every night. They are shown in gold.', org: 'Retroreflectors of Apollo 11, 14, 15 and Lunokhod 1, 2 in use (ILRS). Badges: "seen by LRO" (NSSDCA code "d") and "whereabouts unknown" (code "g").', refs: [11, 12, 2] },
];

export const MARTE_PASOS = [
  { titulo: 'Nobody has walked on Mars', ninos: 'No human has ever set foot on Mars, but we left 7 tonnes of robots, parachutes and heat shields.', org: '7,119 kg of inactive material (Kilic, 2022): discarded hardware, 9 inactive spacecraft and crashed spacecraft. 18 objects from 14 missions (UNOOSA).', refs: [37] },
  { titulo: 'A net in the way', ninos: 'The Perseverance rover found a tangle of netting from its own landing. Its scientists log every little piece so they do not mistake it for a rock.', org: 'Perseverance documented a tangle of netting from its EDL on Jul 12, 2022. Curiosity\'s wheels have shed small pieces of aluminium. The team documents every piece of debris to avoid contaminating the samples.', refs: [37] },
  { titulo: 'Planetary protection', ninos: 'Spacecraft are cleaned very thoroughly before they leave. The few bacteria that travel would not even cover the lens of a phone camera.', org: 'Mars 2020: < 500,000 spores on the whole spacecraft; ≤ 300,000 on the landed parts; 41,000 on the rover (NASA JPL). Today there is no COSPAR-compliant way to send humans.', refs: [38, 39] },
  { titulo: 'The question', ninos: 'If one day we take humans and their waste to Mars, how will we know whether the life we find is Martian or ours?', org: 'Coordinates of Spirit and Opportunity: landing site, not final position. There is no central inventory of objects on Mars (Holcomb et al., 2024).', refs: [40, 41] },
];

export const PROFUNDO_PASOS = [
  { titulo: 'Lost, but not forgotten', ninos: 'These five spacecraft no longer talk to us, but they keep travelling. Each one did something for the first time.', org: 'Five NASA missions beyond the Earth–Moon system: Pioneer 10 and 11, NEAR Shoemaker, Kepler and Dawn. End of mission due to power, fuel or cold; none was recovered.', refs: [42, 43, 44, 45, 46] },
];

export const CIERRE = {
  ninos: 'At the start we said: "it\'s just a piece of paper, it means nothing". Now we know every piece is a story of science. It\'s not forgotten junk: it\'s our history, and deciding what to do with it is up to all of us.',
  org: 'People went from "it means nothing" to seeing why it matters: every object is a data point (artificial moonquakes, retroreflectors, samples from 21.55 to 110.52 kg). It\'s not forgotten junk: it\'s our history, and deciding what to do with it is up to all of us.',
};

export const MITOS = [
  { no: '"There is human faeces on Mars"', si: 'The faeces are on the Moon (96 Apollo bags). On Mars there are only robots and some spores that travelled on them.', refs: [29, 38] },
  { no: '"There is life from Earth on the Moon"', si: 'It is an open and very unlikely question. That is why scientists want to bring the bags back to study them.', refs: [31, 32] },
  { no: '"Bacteria survived 2 years on Surveyor 3"', si: 'By 2011 that finding had been seriously questioned. Most likely the contamination happened on Earth.', refs: [36] },
  { no: '"Debris takes up a large percentage of space"', si: 'The problem is not volume but density in specific orbits and chain collisions (Kessler syndrome). We use number of objects, not percentage.', refs: [47] },
  { no: '"It is all junk"', si: 'Some objects are still active, such as the lunar retroreflectors. The challenge treats them as heritage and history.', refs: [11] },
];

export const SESGOS = [
  { titulo: 'We only see the big ones', texto: 'Catalogues track ~47,390 objects, but ESA\'s model estimates 68,450 larger than 10 cm and 1.5 million between 1 and 10 cm. The map shows what is detected, not everything that is there.', refs: [5] },
  { titulo: 'We count the successes', texto: '63 of the 96 objects on the Moon are impacts or crashes, not landings. Popular history remembers the footprints, not the crashes.', refs: [2] },
  { titulo: 'A single-country view', texto: 'The challenge is about NASA, but the Moon holds objects from the USSR, China, India, Japan, Israel and others. The lunar heritage law only covers US sites and actors.', refs: [58, 57] },
  { titulo: 'What is not seen is not counted', texto: 'There is no central inventory of objects on Mars, and a group of archaeologists is asking for one.', refs: [40, 41] },
  { titulo: 'Junk or heritage?', texto: 'The same object can be called one or the other depending on who is looking; Kilic says the inactive spacecraft on Mars are more relics than trash.', refs: [37] },
  { titulo: 'Biases in our own data', texto: 'The coordinates of Spirit and Opportunity are those of the landing, not of where they ended up, and 18 lunar objects have no known whereabouts. The map says so.', refs: [2, 8] },
];

export const HISTORIA_1957 = [
  { fecha: 'Oct 4, 1957', hecho: 'The USSR launches Sputnik 1. Its rocket re-entered within a few weeks and the satellite on January 4, 1958.', importa: 'The first "paper": also the first rocket left circling.', refs: [17] },
  { fecha: 'Nov 3, 1957', hecho: 'Sputnik 2, with the dog Laika; it re-entered on April 14, 1958.', importa: 'The first objects fell by themselves because they were low.', refs: [17] },
  { fecha: 'Dec 6, 1957', hecho: 'The Vanguard TV-3 rocket explodes on the pad, on television.', importa: 'The rush of the space race.', refs: [16] },
  { fecha: 'Jan 31, 1958', hecho: 'Explorer 1, the first US satellite; it re-entered on March 31, 1970.', importa: '', refs: [18] },
  { fecha: 'Mar 17, 1958', hecho: 'Vanguard 1 reaches orbit. It stopped transmitting in 1964 and is still up there.', importa: 'The oldest satellite in orbit; it was estimated to last 2,000 years (today, about 240).', refs: [14, 13] },
  { fecha: 'Mar 17, 1958', hecho: 'The Vanguard third stage (1958-002A) stays in orbit.', importa: 'The oldest piece of space debris still in orbit.', refs: [13, 15] },
  { fecha: '1958', hecho: 'NASA is created; the Vanguard team becomes the core of Goddard.', importa: 'The NSSDCA, where our data comes from, is at Goddard.', refs: [19] },
  { fecha: 'Sep 13, 1959', hecho: 'Luna 2 (USSR) crashes into the Moon; so does its third stage.', importa: 'The first human-made object on the Moon.', refs: [2] },
  { fecha: 'Jun 29, 1961', hecho: 'The Ablestar stage of Transit 4A explodes 2 hours after launch: at least 294 trackable pieces.', importa: 'First accidental breakup in space; it tripled the number of known objects.', refs: [20] },
  { fecha: '1978', hecho: 'Kessler and Cour-Palais publish that collisions can create a debris belt. A year later NASA creates its Orbital Debris Office.', importa: 'The idea of the Kessler syndrome is born.', refs: [47, 49] },
  { fecha: 'Jan 11, 2007', hecho: 'China destroys its Fengyun-1C satellite in an anti-satellite test: more than 3,000 tracked objects.', importa: 'The largest cloud ever made on purpose.', refs: [50] },
  { fecha: 'Feb 10, 2009', hecho: 'First accidental collision between two intact satellites (Iridium 33 and Cosmos 2251), at 790 km; more than 1,400 fragments larger than 10 cm.', importa: 'The belt is now forming by itself.', refs: [51] },
  { fecha: 'Mar 4, 2022', hecho: 'An unidentified booster leaves a double crater about 29 m wide on the Moon, near Hertzsprung crater.', importa: 'An "ownerless paper" reached the Moon.', refs: [26, 28] },
];

export const CURIOSIDADES_ORBITA = [
  { texto: 'In 1957 NORAD started a database of objects in orbit, and the first entry was Sputnik.', refs: [85] },
  { texto: 'In 2008, astronaut Heidemarie Stefanyshyn-Piper lost a tool bag during a spacewalk; it circled Earth more than 4,000 times before burning up almost a year later.', refs: [85] },
  { texto: 'These objects travel at more than 28,000 km/h, which is why even a fleck of paint is a projectile.', refs: [85] },
  { texto: 'Three kinds of debris (ESA): payloads, rocket stages and mission-related objects (bolts, cables, cameras).', refs: [85, 5] },
  { texto: 'Of all fragmentation events, only seven were collisions; most were explosions caused by leftover fuel.', refs: [85] },
];

export const EFECTOS = [
  { ambito: 'Space Station', efecto: '41 manoeuvres to dodge tracked objects since 1999.', refs: [52] },
  { ambito: 'Invisible risk', efecto: 'Dodging tracked objects (almost all 10 cm or larger) covers less than 1% of the risk of losing a mission.', refs: [53] },
  { ambito: 'Constellations', efecto: 'Starlink reported about 50,000 manoeuvres between Dec 2023 and May 2024.', refs: [54] },
  { ambito: 'Astronomy', efecto: '2.7% of Hubble images (2002–2021) show satellite trails, and the share is rising.', refs: [55] },
  { ambito: 'Sustainability', efecto: "ESA's Space Environment Health Index went from ~4 to ~50 in one year.", refs: [6] },
  { ambito: 'Science on Mars', efecto: 'The Perseverance team documents every piece of debris so it does not contaminate the samples.', refs: [37] },
  { ambito: 'Lunar heritage', efecto: 'Since Dec 2020 a US law requires its missions to respect the Apollo sites.', refs: [57] },
];

export const FUTURO = [
  { pregunta: 'What if collisions start a chain reaction?', texto: 'In 1978 Kessler and Cour-Palais said the belt could begin forming in the 20th century and become a serious problem in the 21st. In 2012, Kessler said the cascade has already started and is advancing slowly.', refs: [47, 48] },
  { pregunta: 'What if the Moon fills up with traffic?', texto: 'Between 2023 and 2025, 9 objects were added to the NSSDCA table (Japan, Russia, India, USA and China). With Artemis and private companies, the Apollo sites may end up close to new landings.', refs: [2] },
  { pregunta: 'What if we take humans to Mars?', texto: 'Today there is no way to send humans to Mars that complies with COSPAR rules.', refs: [39] },
  { pregunta: 'What if we start cleaning up?', texto: 'ESA plans for ClearSpace-1 to remove the PROBA-1 satellite; the mission now targets 2029.', refs: [56] },
];

export const PATRONES = [
  { titulo: '"Earth is not space"', misiones: 'Apollo 1, 15', texto: 'Tests that did not mimic flight: pure oxygen, zero gravity.' },
  { titulo: '"A small change, a huge problem"', misiones: 'Apollo 13', texto: 'A change from 28 V to 65 V that nobody checked across every part.' },
  { titulo: '"Plan B saves lives"', misiones: 'Apollo 12, 13, 14', texto: 'They survived because procedures and alternatives had been prepared.' },
  { titulo: '"A backup that really backs up"', misiones: 'Apollo 12', texto: 'Copies of the same system can fail in the same way.' },
  { titulo: '"Haste is the enemy of safety"', misiones: 'Apollo 1', texto: 'Schedule pressure led to decisions against safety.' },
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

// ---------- Act 2 ----------
export const DANOS = [
  { caso: 'Tulsa, USA, Jan 1997', que: 'Lottie Williams was touched on the shoulder by a fragment of a Delta II rocket; she was unhurt and is the only person known to have been hit by space debris.', refs: [60] },
  { caso: 'Naples, USA, Mar 8, 2024', que: 'A piece of the Space Station battery pallet (2,630 kg in total) went through the roof of a house; NASA expected it to burn up completely.', refs: [59] },
  { caso: 'Northern Canada, Jan 24, 1978', que: 'The Soviet satellite Kosmos 954 fell with its nuclear reactor and scattered radioactive debris over about 124,000 km²; the clean-up took 9 months. The Dene people, near Great Slave Lake, lived where the debris fell.', refs: [61, 62] },
  { caso: 'Orbit and sky', que: '41 Station manoeuvres and satellite trails in 2.7% of Hubble images.', refs: [52, 55] },
];
export const DANOS_TEXTO = {
  ninos: 'What is left in space does not always stay there. Sometimes it falls on people who did not decide the launch.',
  org: 'Uncontrolled re-entries with documented damage on the ground. The Kosmos 954 case (Operation Morning Light) is the best example that the damage falls on those who did not decide the launch.',
};

export const RADIACTIVOS = [
  { donde: 'Moon', que: '5 SNAP-27 generators (Apollo 12, 14, 15, 16 and 17), each with about 3.9 kg of plutonium-238 oxide; they powered the ALSEPs.', refs: [63, 65] },
  { donde: 'Pacific seabed', que: 'The Apollo 13 SNAP-27 fell into the Pacific, in the Tonga Trench area, without releasing plutonium, because the mission did not land on the Moon.', refs: [64] },
  { donde: 'Mars', que: 'Curiosity and Perseverance use an MMRTG with 4.8 kg of plutonium dioxide; the Vikings used SNAP-19.', refs: [66, 63] },
  { donde: 'Deep space', que: 'Pioneer 10 and 11 carry SNAP-19 generators.', refs: [63] },
  { donde: 'Earth orbit', que: '16 Soviet RORSAT reactors released droplets of sodium-potassium coolant (NaK) at 900–950 km; those larger than 1 cm will stay in orbit for decades.', refs: [67, 68] },
];
export const RADIACTIVOS_TEXTO = {
  ninos: 'Some spacecraft carry a special battery that runs on the heat of a radioactive material. They are identified and have shielding designed to contain them.',
  org: 'Identified sources, almost all placed on purpose as radioisotope thermoelectric generators (Pu-238, half-life 87.7 years) with containment shielding. Exception: NaK coolant from the RORSATs.',
};

export const SIN_NOMBRE = [
  { texto: 'In orbit: with 2024 data, 7,967 of the 39,246 tracked objects (20.3%) were classified as unidentified. The 2026 report says this gap keeps growing.', refs: [7, 6] },
  { texto: 'Lost cores: of the RORSAT reactors, the cores of Cosmos 1670, 1677 and 1900 have not been detected.', refs: [69] },
  { texto: "On the Moon: 18 of 96 objects with unknown whereabouts, plus the booster that left the double crater in 2022. China denied it was theirs; a later study argues it was the Chang'e 5-T1 rocket with an unexplained extra mass.", refs: [2, 26, 28] },
];
export const SIN_NOMBRE_TEXTO = {
  ninos: 'We do not know what many of the papers are or whose they are. On the map they are grey, with no name and no flag.',
  org: 'Objects with no link to a source: on the map, those of type "unidentified" (Space-Track UNKNOWN/TBA) and with no country are drawn in grey.',
};

export const NO_ES_BASURA = [
  { titulo: 'Still working', texto: 'The laser retroreflectors of Apollo 11, 14 and 15 and of Lunokhod 1 and 2 are still in use. Curiosity and Perseverance are still active on Mars.', refs: [11] },
  { titulo: 'Heritage', texto: 'The Apollo sites are protected by law in the US; Kilic says the inactive spacecraft on Mars are more relics than trash.', refs: [57, 37] },
  { titulo: 'Messages', texto: 'Pioneer 10 and 11 carry plaques with a message from humanity.', refs: [44, 45] },
  { titulo: 'Stored science', texto: 'Kepler data is still being analysed.', refs: [46] },
];

export const ASAT = [
  { anio: 2007, pais: 'China', que: 'Fengyun-1C satellite, at about 850 km', basura: 'More than 3,000 tracked objects; 2,763 were still in orbit in 2022', tag: 'FY1C', refs: [50, 70] },
  { anio: 2008, pais: 'USA', que: 'USA-193 satellite, at low altitude', basura: 'About 175 fragments, all of which have re-entered', tag: 'USA193', refs: [71] },
  { anio: 2019, pais: 'India', que: 'Its own satellite (Microsat-R), at low altitude', basura: '11 pieces were still up in 2022', tag: 'MSR', refs: [70] },
  { anio: 2021, pais: 'Russia', que: 'Kosmos 1408 satellite', basura: 'More than 1,500 trackable pieces; the Station crew had to take shelter', tag: 'K1408', refs: [72, 73] },
];
export const PAISES_TEXTO = {
  ninos: 'The space race began as a competition. Some countries broke up their own satellites to test weapons, and the pieces are still circling.',
  org: 'In 2022, debris from the Russian and Chinese tests caused about 20% of possible-collision alerts. In Dec 2022, 155 countries voted at the UN to stop destructive tests; 9 against (including China and Russia); India abstained.',
  refs: [74, 75],
};

export const UNION = [
  { titulo: 'The International Space Station', texto: 'Five space agencies from 15 countries operate it together, and the partnership has held despite conflicts on Earth.', refs: [76, 77] },
  { titulo: 'Apollo-Soyuz (1975)', texto: 'The USA and the USSR docked in orbit in the middle of the Cold War.', refs: [78] },
  { titulo: 'Zero Debris Charter (ESA)', texto: 'It aims to add no more debris by 2030; in November 2026 it had more than 250 signatories in 36 countries.', refs: [81, 80] },
];
export const UNION_TEXTO = {
  ninos: 'The same orbit belongs to everyone. Watch the colours of each country blend into one: the colour of humanity.',
  org: 'Existing cooperation as a foundation: ISS, Apollo-Soyuz, Zero Debris Charter. On the map, the colouring by country blends into a single colour.',
};

export const CORTOS = [
  { titulo: 'The paper nobody picked up', sinopsis: "A piece of paper falls out of an astronaut's pocket, floats for 50 years and is found by a child from the future.", dato: 'The oldest object in orbit is the Vanguard third stage, from 1958.', refs: [13, 15] },
  { titulo: "I'm still working", sinopsis: 'A little mirror on the Moon bounces back a laser beam every night even though nobody visits it.', dato: 'The retroreflectors of Apollo 11, 14 and 15 have been in use since 1969.', refs: [11] },
  { titulo: 'No flag', sinopsis: 'A grey fragment asks everyone "whose am I?" and nobody answers.', dato: 'In 2024, 20.3% of tracked objects had no identification.', refs: [7] },
  { titulo: 'The net', sinopsis: 'The papers of every country come together and form a net that catches debris instead of creating it.', dato: 'More than 250 signatories in 36 countries support the Zero Debris Charter (Nov 2026).', refs: [81] },
];
export const CORTOS_NOTA = 'Tone reference: WALL-E (Pixar, 2008). No clips, images or the character are used: they are copyrighted. The shorts are our own, 15 to 30 seconds long, with original characters, and each one closes with a real fact and its source.';

export const SOLUCIONES = [
  { tipo: 'Regulation', solucion: 'FCC 5-year rule (USA): satellites in low Earth orbit must deorbit no later than 5 years after their mission ends (it used to be 25).', estado: 'Adopted on Sep 29, 2022', refs: [82] },
  { tipo: 'Commitment', solucion: 'Zero Debris Charter: add no more debris by 2030.', estado: '12 countries signed in May 2024; more than 250 signatories in 36 countries by Nov 2026', refs: [79, 81] },
  { tipo: 'Policy', solucion: 'Moratorium on destructive anti-satellite tests.', estado: 'UN resolution, Dec 2022, 155 votes in favour', refs: [75] },
  { tipo: 'Technology', solucion: 'ADRAS-J (Astroscale/JAXA) came within 15 m of a 2009 H-IIA rocket stage; phase II will capture and deorbit it.', estado: 'Demonstration in 2024', refs: [83] },
  { tipo: 'Technology', solucion: 'ClearSpace-1 (ESA): first European removal mission.', estado: 'Targeting 2029', refs: [56] },
  { tipo: 'Recycling', solucion: 'NASA LunaRecycle: USD 3 million prize for recycling waste on the Moon.', estado: 'Call opened in 2024', refs: [84] },
  { tipo: 'Heritage', solucion: 'One Small Step Act: protects the Apollo sites for US missions.', estado: 'Law since Dec 2020', refs: [57] },
  { tipo: 'Biological contamination', solucion: 'Planetary protection: Mars 2020 carried fewer than 500,000 spores.', estado: 'In force', refs: [38] },
];
export const MEDIDAS_TECNICAS = [
  ['Whipple shields', 'An outer layer that protects the walls of the Space Station and many satellites against impacts.'],
  ['Passivation', 'Emptying the energy sources (fuel, batteries) at the end of the mission so the satellite or stage does not explode.'],
  ['Planned deorbit', 'The satellite lowers itself at the end of its life and burns up in the atmosphere.'],
  ['Self-decaying orbits', 'Elliptical orbits whose lowest point is inside the atmosphere.'],
  ['Reusable rockets', 'Stages that come back intact instead of staying in orbit.'],
  ['Laser (under study)', 'Slowing fragments down by vaporising a little of their surface so they fall.'],
];
export const SOLUCIONES_FALTA = 'The hardest part is still missing: there is no single, open inventory of everything we have left beyond Earth, and no binding agreement among all countries.';

// The section "The solution we propose" is empty in the planning document: the team must complete it.
export const PROPUESTA = {
  titulo: 'Collect in phases and send it to the Sun',
  ninos: 'Our idea: satellites whose only job is to clean up. First they collect everything made of metal with a giant magnet; then, with a net, everything else. Every country that launches satellites also cleans them up. And when Mercury and Venus hide behind the Sun, we send the debris towards the Sun.',
  org: 'Team proposal: phased active removal with dedicated clean-up satellites (phase 1: magnetic capture of metals; phase 2: net for non-metallic items), a "1 launch = 1 clean-up" protocol for every launching country, regulation to be defined (UN/COSPAR/multilateral agreement), and sending what is collected towards the Sun in the windows when Mercury and Venus are at superior conjunction (behind the Sun as seen from Earth). Complemented by a single, open inventory, of which this app is the prototype.',
  pasos: [
    'Dedicated clean-up satellites: phase 1 with magnetic capture (metal), phase 2 with a net (other materials).',
    'Protocol: every country that launches satellites also cleans them up; who regulates it remains an open decision.',
    'Windows towards the Sun: when Mercury and Venus line up on the opposite side from Earth, behind the Sun (the team estimates every 1 and 7 months).',
    'Open data: a single JSON/CSV file with a source for each object (today: 116 objects, 85 references).',
    'Verification: a "seen from orbit" (LRO) badge and a "whereabouts unknown" mark instead of inventing positions.',
    'Two audiences, one fact: the same figure is explained for kids and for organizations.',
    'Collaboration: any agency or person can propose a row with its primary source.',
  ],
};

export const QUIZ = [
  { pregunta: "Where are the 96 bags of astronauts' waste?", opciones: ['On Mars', 'On the Moon', 'On the Space Station'], correcta: 1, explicacion: 'The six Apollo missions left them on the Moon to offset the weight of the rocks they brought back.', refs: [29] },
  { pregunta: 'How many large objects are tracked around Earth today?', opciones: ['About 470', 'About 4,700', 'About 47,000'], correcta: 2, explicacion: 'About 47,000 tracked, but there are more than 68,000 big ones: one in three is not on the map.', refs: [5] },
  { pregunta: 'Why were rockets crashed into the Moon on purpose?', opciones: ['To make pretty craters', 'To feel a moonquake with the seismometers', 'To get rid of them'], correcta: 1, explicacion: 'The Apollo seismometers measured the quake, and that is how we learned what the Moon is like inside.', refs: [4, 27] },
  { pregunta: 'How much does everything we left on the Moon weigh?', opciones: ['Like 3 elephants', 'Like 30 elephants', 'Like 300 elephants'], correcta: 1, explicacion: 'More than 187 tonnes: like 30 elephants.', refs: [10] },
  { pregunta: 'What has been working on the Moon since 1969?', opciones: ['A mirror that bounces back laser beams', 'A lunar buggy', 'A video camera'], correcta: 0, explicacion: 'The retroreflectors of Apollo 11, 14 and 15 still bounce back lasers fired from Earth.', refs: [11] },
  { pregunta: 'Has any human set foot on Mars?', opciones: ['Yes, in 1976', 'Yes, in 2021', 'No, only robots'], correcta: 2, explicacion: 'Never. The 7 tonnes we left there are robots, parachutes and heat shields.', refs: [37] },
];

export const PREGUNTAS_GENERALES = [
  { pregunta: 'Where does this data come from?', ninos: 'From the official lists of NASA and ESA. At the bottom of each card there is a "Source" button.', org: 'NSSDCA (Moon), Kilic 2022 / UNOOSA (Mars), ESA DISCOS and Space-Track (orbit). Full list in References.' },
  { pregunta: 'Why are some dots grey?', ninos: 'Because nobody knows whose they are or what they are. They are ownerless papers.', org: 'Objects with no identification (Space-Track UNKNOWN/TBA) or with unknown whereabouts (NSSDCA code "g").' },
  { pregunta: 'Is it dangerous?', ninos: 'Sometimes. Spacecraft have to dodge pieces, and once a chunk went through the roof of a house.', org: 'ISS: 41 manoeuvres since 1999; re-entries with damage (Naples 2024, Kosmos 954); avoiding what is tracked covers < 1% of the risk of losing a mission.' },
];
