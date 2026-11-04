# Personajes del curso: fichas de persona, voz y aspecto

Borrador del 3 de noviembre de 2026, pendiente de aprobación de David. Amplía `docs/language/cast.json` (que sigue siendo la fuente de verdad de los datos que usa la web) con lo necesario para el audio (fase de TTS) y las ilustraciones.

Reglas que no cambian:

- Los cinco personajes son ficticios. Nunca schema `Person`, nunca fotos ni imágenes fotorrealistas: solo ilustraciones.
- No se inventan datos que contradigan las unidades ya escritas (ver «Hechos ya establecidos» en cada ficha). Tampoco apellidos ni familia más allá de lo que ya aparece.
- La pronunciación de todo el audio es español peninsular estándar, porque las frases son modelo para el alumno (pendiente de confirmar: ver «Decisiones pendientes»).

## Estilo visual (decisión de David, 3 de noviembre de 2026)

- **Estilo fijo para todas las ilustraciones del curso:** la «Variante A» de la prueba con Daniel: acuarela suelta (húmedo sobre húmedo) con líneas de tinta o lápiz muy ligeras, aguadas que se desvanecen hacia los bordes, papel crema y sombras con un tono azul marino. Imagen de referencia: `Imágenes/Prueba de estilo Daniel.jpg` (la columna izquierda).
- Como este estilo varía más entre generaciones, cada imagen nueva se genera con la referencia de estilo y, para los personajes, con su hoja de giro como referencia de personaje.
- Bloque de estilo que encabeza todos los prompts:

```
STYLE: loose wet-on-wet watercolor illustration with very light, sketchy ink and pencil
lines, soft translucent washes that bleed and fade out toward the edges (no hard borders),
visible cold-press paper texture, cream off-white background (#FAFAF8), cool navy-blue
(#002147) tints in shadows and dark hair, warm natural skin tones, limited palette with
small warm red (#C8102E) accents, gentle natural light, semi-realistic adult proportions,
calm and warm mood. NOT photorealistic, NOT 3D render, NOT anime, NOT chibi.
```

```
NEGATIVE: photorealistic, photograph, 3D render, CGI, anime, manga, chibi, caricature,
exaggerated or stereotyped ethnic features, text, letters, labels, watermark, logo,
brand names, extra fingers, distorted hands, cluttered background.
```

- **Imágenes de referencia (decisión de David, 3 de noviembre de 2026):** la carpeta `Imágenes/personajes/` es la referencia obligatoria para todas las imágenes del curso. Por personaje: `<Nombre>-retrato.jpg` (retrato oficial en Variante A: referencia de estilo y de cara) y `<Nombre>-hoja-de-giro.jpg` (hoja de giro: referencia de cuerpo, ropa y accesorios; más limpia, no se publica).
- **Cómo se genera cada imagen nueva:** se adjuntan el retrato (estilo y cara) y la hoja de giro (ropa) del personaje; si hay dos personajes, los cuatro archivos. Si la hoja y el retrato no coinciden en la cara, manda el retrato.
- **Detalles fijos:** Mina, flequillo recto, chaqueta azul marino con ribetes rojos, camisa de rayas, cámara compacta y bolsa de tela. Kenta, gafas de montura fina, chaqueta azul lisa sin ribetes, bolígrafo rojo en el bolsillo y maletín marrón. Yui, coleta alta sin flequillo, jersey verde oliva, mochila azul marino con chapas y café para llevar. Daniel, camisa de cuadros naranja tostado abierta sobre camiseta blanca, vaqueros oscuros y bandolera de lona. Carmen, media melena oscura con canas, gafas con cordón, pañuelo morado con florecitas rojas y chaqueta de punto crema.
- En la web: `alt` en japonés y la nota de imagen generada por IA; nada de logos ni obras de arte reales reconocibles; se descarta cualquier imagen con rasgos estereotipados.

## Mina (ミナ)

- **Ficha:** 28 años, de Tokio, diseñadora. A1-A2. Primer viaje a España, empieza casi sin hablar.
- **Personalidad:** curiosa, alegre, observadora (se fija en los colores, los carteles, la comida). No le da miedo equivocarse; pregunta mucho.
- **Cómo habla:** frases cortas y directas, muchas preguntas (¿Cuánto cuesta?, ¿Dónde está…?), exclamaciones de sorpresa (¡Qué bonito!). Usa tú con la gente de su edad y usted con desconocidos mayores.
- **Aspecto (para ilustrar):** pelo negro a la altura de los hombros, flequillo recto; ropa cómoda y con un toque de diseño (camisa de rayas, chaqueta corta), bolso de tela con un cuaderno de bocetos y una cámara pequeña. Color de acento: rojo `#C8203D`.
- **Voz:** joven, clara y animada. Candidatas de Gemini TTS: **Leda** (youthful), **Laomedeia** (upbeat), **Autonoe** (bright).
- **Perfil de audio (Audio Profile):** «Mujer de 28 años. Habla español de España con pronunciación peninsular estándar, clara y amable, con curiosidad y alegría. Ritmo lento y muy claro (A1-A2).»
- **Hechos ya establecidos:** es diseñadora de Tokio; le encantan las croquetas y los museos; compra un regalo para su madre; escribe un blog de viaje y un correo a Daniel; llega a Madrid y se mueve en metro.

## Kenta (ケンタ)

- **Ficha:** 42 años, de Osaka, ingeniero. A2-B1. Trabaja con una empresa de Valencia y viaja allí varias veces al año.
- **Personalidad:** educado, prudente y responsable; prepara bien las cosas. Tiene un humor discreto que aparece cuando gana confianza.
- **Cómo habla:** cortés y cuidadoso, prefiere usted y el condicional (¿Sería posible…?, Me gustaría…). Se corrige a sí mismo cuando duda.
- **Aspecto (para ilustrar):** pelo corto y peinado, gafas de montura fina; traje azul marino o americana sin corbata en las visitas; maletín o mochila de portátil. Color de acento: azul `#1F4E79`.
- **Voz:** adulta, tranquila y ordenada. Candidatas: **Iapetus** (clear), **Schedar** (even), **Sadaltager** (knowledgeable).
- **Perfil de audio:** «Hombre de 42 años. Habla español de España con pronunciación peninsular estándar, cortés y pausado, como en una reunión de trabajo. Ritmo lento y claro (A2), natural desde B1.»
- **Hechos ya establecidos:** lleva tres años estudiando español y antes no lo hablaba; tiene una compañera de trabajo en Valencia, Laura; escribe correos e informes de reuniones; Daniel le deja un mensaje de voz; compra un regalo para su jefe; elige hoteles céntricos por trabajo.

## Yui (ユイ)

- **Ficha:** 21 años, de Fukuoka, estudiante en la Universidad de Salamanca. B1-B2. Vive en un piso compartido.
- **Personalidad:** sociable, decidida y algo despistada con los plazos; se agobia antes de los exámenes, pero sale adelante. Muy observadora del habla de sus amigos.
- **Cómo habla:** en B1, español cuidado de estudiante; en B2 va incorporando lo coloquial que oye en Salamanca (vale, tía, en plan) y sabe cambiar de registro en correos formales.
- **Aspecto (para ilustrar):** pelo largo recogido en una coleta, sudadera o jersey y vaqueros, mochila con chapas, apuntes y un café para llevar. Color de acento: verde `#4A6B1F`.
- **Voz:** joven, natural y expresiva. Candidatas: **Aoede** (breezy), **Zephyr** (bright), **Callirrhoe** (easy-going).
- **Perfil de audio:** «Mujer de 21 años, estudiante universitaria. Habla español de España con pronunciación peninsular estándar, natural y cercana, a ritmo normal.»
- **Hechos ya establecidos:** estudia en la Universidad de Salamanca y está en el último curso; hace el TFG con una tutora; tiene una compañera de piso; hace intercambio de idiomas con Marcos; escribe en un blog de estudiantes; viaja a Segovia, al País Vasco y a La Rioja; le recomendaron Ibiza fuera de temporada; va a un partido de la Liga F; piensa en un máster en Madrid y en una beca; hace entrevistas de trabajo.

## Daniel (ダニエル)

- **Ficha:** 35 años, de Valencia, vive y trabaja en Tokio. Todos los niveles. Habla japonés.
- **Personalidad:** cercano, paciente y con sentido del humor; disfruta explicando por qué algo suena raro. Hace de puente entre las dos culturas.
- **Cómo habla:** natural y cálido, con ejemplos de la vida diaria; introduce las diferencias entre España y Latinoamérica y las alternativas más naturales.
- **Aspecto (para ilustrar):** pelo castaño oscuro algo ondulado, barba corta cuidada, sonrisa fácil; camisa de cuadros o camiseta con chaqueta, estilo informal. Color de acento: naranja tostado `#A4501A`.
- **Voz:** masculina adulta, cálida y clara. Candidatas: **Charon** (informative, ya probada sin errores), **Achird** (friendly), **Umbriel** (easy-going).
- **Perfil de audio:** «Hombre de 35 años, de Valencia. Habla español de España con pronunciación peninsular estándar, cálido y cercano, como un amigo que explica algo con paciencia.»
- **Hechos ya establecidos:** es de Valencia y vive en Tokio; no le gusta el café solo; conoce a Mina, Kenta y Yui; firma las notas 「ダニエル（バレンシア出身）のひとこと」.

## Carmen (カルメン先生)

- **Ficha:** 58 años, de Madrid, profesora de español. B2-C2.
- **Personalidad:** rigurosa, exigente y cálida a la vez; disfruta de la lengua, la prensa y la literatura. Corrige con humor y sin dramatismo.
- **Cómo habla:** preciso y articulado, registro culto; a sus alumnos les habla de tú y con vosotros en clase (スペインのみ). Expresiones de profesora: Fíjate en que…, Muy bien citado.
- **Aspecto (para ilustrar):** media melena con canas, gafas de lectura con cordón, pañuelo de color, chaqueta de punto; libros y periódicos a mano. Color de acento: morado `#5B3A8E`.
- **Voz:** femenina madura, segura y amable. Candidatas: **Gacrux** (mature), **Sulafat** (warm), **Vindemiatrix** (gentle).
- **Perfil de audio:** «Mujer de 58 años, profesora de Madrid. Habla español de España con pronunciación peninsular estándar, culta, segura y amable, articulando con claridad.»
- **Hechos ya establecidos:** enseña en Madrid; corrige textos y prepara a sus alumnos para el DELE; usa la prensa en clase (La Moncloa responde a Bruselas).

## Biografías e ilustraciones publicadas (4 de noviembre de 2026)

- La biografía de cada personaje (出身・住まい・仕事・学歴・趣味・性格・スペイン語との関わり・目標) está en el campo `profile` de `cast.json` y se muestra en /language/cast/ con su retrato. Es canon desde ahora: las unidades nuevas no pueden contradecirla.
- Cada unidad tiene su escena en `public/images/course/units/uNN.webp` (WebP de menos de 100 KB) y su `alt` japonés en el campo `image` del frontmatter. Para sustituir una escena: guardar el nuevo PNG en `Imágenes/personajes/<nivel>/` con el mismo prefijo `uNN` y ejecutar `npm run course:images`.
- **Revisión del 4 de noviembre:** la u62 se rehízo (los cinco personajes reconocibles). David decidió mantener u18, u40, u52 y u61 como están, porque las versiones nuevas cambiaban de estilo respecto al resto; se aceptan sus diferencias (la tutora de la u40 se parece a Carmen, Daniel sale con gafas en u52 y u61, camisa verde en u18).
- **Secundarios fijos del B1:** Marcos (23 años, pelo castaño corto y rizado, barba de pocos días, sudadera gris) y la compañera de piso de Yui (22 años, pelo castaño ondulado en un moño, gafas redondas, chaqueta de punto mostaza).

## Voces del audio (decisión de David, 4 de noviembre de 2026)

- **La fuente de verdad de las voces es `docs/language/tts-voices.json`** (voz, perfil y ajustes de cada hablante). Lo usa `npm run tts:generate`; las candidatas de esta página quedan como historial.
- **Mina, Kenta y Yui hablan con acento japonés**, cada vez más suave según su nivel: Mina → Laomedeia (acento suave), Kenta → Schedar (acento moderado), Yui → Zephyr (acento ligerísimo). Probadas y escuchadas por David en AI Studio (modo de una voz, temperature 1, solo Audio Profile).
- Las frases modelo sin hablante (274 de 335) las lee una narradora nativa; Daniel, Carmen y los secundarios hablan con pronunciación peninsular estándar.
- **Reparto definitivo (David, 4 de noviembre de 2026):**

| Hablante | Voz | Etiquetas de AI Studio | Acento |
| --- | --- | --- | --- |
| Mina | Laomedeia | Upbeat, Higher pitch | japonés suave |
| Kenta | Schedar | Even, Lower middle pitch | japonés moderado |
| Yui | Zephyr | Bright, Higher pitch | japonés ligerísimo |
| Daniel | Achird | Friendly, Lower middle pitch | peninsular estándar |
| Carmen | Vindemiatrix | Gentle, Middle pitch | peninsular estándar |
| Narradora | Gacrux | Mature, Middle pitch | peninsular estándar |

- **Narradora, punto abierto:** David eligió Gacrux al oírla con el perfil de Carmen. La combinación Gacrux + perfil de narradora no se ha generado nunca, así que el pipeline no la usa hasta que David escuche la muestra (`npm run tts:generate -- --sample narrator`) y la apruebe en `tts-voices.json` (`status: "aprobada"`). Gacrux (narradora) y Vindemiatrix (Carmen) no se intercambian.
- Los secundarios (camareros, empleados, compañeros…) tienen voces propuestas sin probar, distintas de las seis anteriores; se revisan al escuchar el primer lote.

## Voces secundarias

Para personajes de una sola escena (camareros, Laura, Marcos, Lucía y Pablo, presentadores de radio de los simulacros) se usan voces distintas de las cinco principales, elegidas por edad y sexo. Narradora de vocabulario y ejemplos sin personaje: **Kore** (firm). Los nombres y descripciones de las voces son los de la documentación de Google; hay que escucharlas antes de fijarlas.

## Plan de audio en el nivel gratuito (decisión de David del 3 de noviembre de 2026)

- Proyecto «Open Code» de Google AI Studio, clave en la variable de entorno `GEMINI_API_KEY` (nunca en el repositorio). Nivel gratuito: 3 peticiones por minuto, 10 al día. Las frases del curso son públicas, así que no importa que el nivel gratuito permita a Google usar el contenido.
- Para no gastar una petición por frase, cada petición genera todas las frases de una unidad seguidas, con pausas largas entre ellas; el script corta el audio por los silencios y comprueba que salen tantos archivos como frases. Dos peticiones por unidad (lenta y natural): unas 130 en total con las 62 unidades y las transcripciones de los simulacros, es decir, de dos a tres semanas a ritmo de 6-8 al día, dejando margen para repetir.
- Los diálogos de dos personas usan el modo de varios hablantes, con la voz fija de cada personaje.
- **Carpetas:** el audio sin comprimir se guarda en `audio-src/` (fuera de git, en `.gitignore`): `audio-src/pruebas-voces/` para el casting, con nombres `<personaje>-<voz>.wav` (p. ej. `daniel-charon.wav`), y `audio-src/unidades/<nivel>/<unidad>/` para el curso. El audio ya comprimido para la web irá en `public/audio/`.
- El WAV de Gemini ocupa unos 48 KB por segundo; se convierte a un formato comprimido con ffmpeg (David lo instalará) antes de publicarlo.
- David escucha cada audio antes de publicarlo; ningún reproductor aparece sin su archivo.

## Decisiones pendientes

1. Aprobar o corregir las fichas (personalidad, forma de hablar y aspecto).
2. Elegir una voz por personaje, escuchando las candidatas en AI Studio (cada prueba gasta una de las 10 peticiones diarias).
3. Confirmar que las frases de Mina, Kenta y Yui se graban con pronunciación peninsular estándar y no con acento de estudiante japonés (recomendado, porque son modelo de pronunciación).
4. Estilo de las ilustraciones (plano/editorial, anime o acuarela), con dos o tres pruebas de un solo personaje antes de hacer los cinco.
