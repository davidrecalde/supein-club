# Estrategia de contenidos スペイン語 — supein.club/language + YouTube

Nov 1, 2026 · @David

## Objetivos y métricas

La estrategia tiene un objetivo: que /language/ y el canal de YouTube sean la ruta de referencia en japonés para aprender español de A1 a C2, y que esa audiencia acabe en LINE @spainclub. Para lograrlo, la web y el canal funcionan como un solo sistema: la web enseña y hace practicar; YouTube explica y atrae.

| Objetivo | Indicador | Fuente | Meta a 6 meses (mayo 2027) |
| --- | --- | --- | --- |
| Captar búsquedas de aprendizaje en japonés | Clics orgánicos a /language/ | Search Console | 1.300 al mes (431 en octubre de 2026) |
| Que el alumno practique, no solo lea | Quizzes completados por sesión | Analytics (evento) | ≥ 0,4 por sesión en páginas STEP |
| Convertir lectores en comunidad | Altas en LINE desde /language/ | LINE + UTM | 300 al mes |
| Abrir una segunda puerta de entrada | Suscriptores del canal | YouTube Studio | 2.000 |
| Cerrar el círculo web ↔ vídeo | Clics del vídeo a la web | YouTube (pantallas finales, descripción) | ≥ 3 % de las vistas de cada episodio largo |

Las metas son una propuesta de partida y se ajustan cuando tengamos 8 semanas de datos del sistema nuevo.

## Público y posicionamiento

Nuestro público es el japonés que aprende español; ninguno de los tres referentes analizados le habla en su idioma. ProfedeELE, DELE Ahora y todoELE escriben en español para profesores y alumnos de todo el mundo. La promesa de supein.club: «la ruta de A1 a C2 pensada para japoneses, explicada desde el japonés y con los errores que cometen los japoneses».

| Segmento | Qué busca | Puerta de entrada | Qué le damos |
| --- | --- | --- | --- |
| Principiante autodidacta (20-40 años) | Empezar sin academia | Google: 「スペイン語 独学」「A1」 · Shorts | STEP 1-8, test de nivel, plan de 3 meses |
| Candidato DELE / 西検 | Aprobar un examen con fecha | Google: 「DELE B1 対策」 · vídeos DELE | Guías DELE, simulacros por tarea, fechas Tokio/Osaka |
| Viajero o fan de la cultura (fútbol, cocina, viajes) | Frases útiles y motivación | Secciones /travel, /food, /football · Shorts | Frases por situación, «aprende con la Liga» |
| Profesional o estudiante que va a España | Vivir y trabajar en español | /living · LinkedIn | B1-B2, entrevistas, registro formal |
| Alumno de academia (Tokio, Osaka, Kioto…) | Reforzar lo que ve en clase | Ranking de escuelas · vídeos de gramática | Explicaciones en japonés y práctica extra |

Tres rasgos nos diferencian y deben estar en cada pieza:

- **Contraste japonés-español:** cada explicación parte de lo que el japonés no tiene (género, ser/estar, subjuntivo) y del error típico.
- **Ruta lineal:** STEP 1/36 da orden; los referentes son catálogos sin itinerario.
- **Cultura como contexto:** fútbol, cocina y viajes ya están en el sitio y dan temas propios para los ejemplos, algo que un portal ELE genérico no tiene.

## Pilares temáticos y arquitectura

/language/ se organiza en seis pilares. Los 36 STEP siguen siendo la columna vertebral, y los pilares nuevos añaden práctica, herramientas y examen alrededor de la ruta.

| Pilar | Qué cubre | Ya existe | Hay que crear |
| --- | --- | --- | --- |
| ルート (ruta A1-C2) | Niveles, planes de estudio, test de nivel | Hub, 6 hubs de nivel, 6 planes, test A1-B2 | Test hasta C2; «できること» (can-do) por nivel |
| 文法・活用 (gramática y conjugación) | Gramática por nivel, tiempos, subjuntivo | 6 páginas de gramática, 4 de subjuntivo, tabla de conjugación | Conjugador interactivo, páginas por verbo (top 50), 点過去 vs 線過去 |
| 語彙・表現 (vocabulario) | Listas por nivel y por tema | 6 listas de nivel, frases de viaje | Listas por frecuencia (método Zipf), vocabulario de fútbol, cocina y viaje enlazado a esas secciones |
| 発音・聴解 (pronunciación y escucha) | Sonidos difíciles, escucha, shadowing | 6 páginas de pronunciación, consejos de escucha | Audio real en todas las fichas, dictados, diálogos graduados |
| 試験 (DELE y 西検) | Guías, dificultad, fechas, simulacros | 10 páginas DELE, DELE frente a 西検 | Simulacros por tarea y nivel, guía de modelos oficiales (過去問), página de niveles de 西検 |
| 学び方 (cómo aprender) | Métodos, apps, series, escuelas, recursos | Apps, películas, lectura, escuelas por ciudad | Directorio curado de recursos para japoneses |

Cada pieza se etiqueta en cinco ejes. Así el hub puede filtrar como ProfedeELE y DELE Ahora, y cada vídeo hereda las mismas etiquetas:

| Eje | Valores |
| --- | --- |
| レベル | 入門前, A1, A2, B1, B2, C1, C2 |
| スキル | 文法, 語彙, 発音, 聴解, 読解, 作文, 会話 |
| 形式 | 解説, 練習, ディクテーション, 模擬試験, ツール, 動画 |
| テーマ | 日常, 旅行, 料理, サッカー, 文化, 仕事 |
| 目的 | 独学, DELE, 西検, 旅行, 留学・仕事 |

URLs nuevas, sin tocar las que ya posicionan:

- Práctica: `/language/practice/<tema>/` (dictados, diálogos, ejercicios sueltos).
- Herramientas: el conjugador se integra en la página actual de conjugación, que ya posiciona, y las páginas por verbo cuelgan de ella (`/language/learn-spanish/verb-conjugation/<verbo>/`).
- Simulacros: son la unidad de cierre de cada nivel (12, 24, 36, 48, 56 y 62), en su URL de la colección `units` (p. ej. `/language/learn-spanish/a1/review-dele-a1/`). No hay URL `/mock/` aparte (decisión del 2 de noviembre de 2026, ver curso-paso-a-paso.md).
- Recursos: `/language/resources/`.

El diseño unidad por unidad del curso está en la pestaña Curso paso a paso.

En Astro, los cinco ejes van al esquema de la colección (`level`, `skills`, `format`, `theme`, `goal`), junto con `canDo`, `duration`, `tasks`, `youtubeId` y `updated`.

## Mapa de demanda

/language/ pasó de 50 clics en agosto a 225 en septiembre y 431 en octubre (de 1.313 a 22.716 impresiones al mes), con posición media de 7,5 y CTR del 1,9 % en octubre. Google ya nos muestra, pero en la mitad baja de la primera página: la estrategia tiene que subir posiciones y convertir más impresiones en clics.

| Tema y página | Impresiones | Clics | Posición | CTR | Qué nos dice |
| --- | --- | --- | --- | --- | --- |
| Conjugación — [verb-conjugation](https://supein.club/language/learn-spanish/verb-conjugation/) | 4.889 | 126 | 6,9 | 2,6 % | El mayor imán: 「活用 一覧」「覚え方」「点過去 活用」. Tiene un duplicado en /spanish-grammar/verb-conjugation/ (570 impr.) |
| Ruta A1-C2 — [learn-spanish](https://supein.club/language/learn-spanish/) | 1.418 | 115 | 7,0 | 8,1 % | El pilar funciona: 「スペイン語学習 ロードマップ」 en posición 2,2 |
| Subjuntivo B1 + B2 | 1.776 | 28 | ≈ 8 | 1,6 % | Mucha demanda y snippet débil; 「接続法」 en posición 16,5 |
| Dificultad DELE — [dele-difficulty-guide](https://supein.club/language/learn-spanish/dele-difficulty-guide/) | 1.170 | 28 | 6,3 | 2,4 % | Búsquedas de 難易度, 合格率 y レベル por nivel |
| Hub DELE — [dele](https://supein.club/language/learn-spanish/dele/) | 950 | 3 | 11,1 | 0,3 % | La peor conversión del sitio; además piden 過去問 (≈ 140 impr.) |
| Vocabulario A1 | 889 | 25 | 8,1 | 2,8 % | Listas de palabras; el audio prometido no está |
| Test de nivel | 860 | 39 | 7,0 | 4,5 % | 「DELE レベルチェック」「スペイン語 テスト」: piden medirse |
| Películas y series | 708 | 26 | 8,9 | 3,7 % | Aprender con ocio; puente natural a vídeo |
| Español frente a japonés | 705 | 9 | 7,3 | 1,3 % | Nuestro ángulo diferencial, mal titulado |
| Frases de viaje | 583 | 15 | 11,1 | 2,6 % | Puente con /travel/ |
| Pronunciación para japoneses | 514 | 5 | 10,0 | 1,0 % | Sin audio no compite; es el mejor tema para vídeo |
| Escuelas en Tokio | 435 | 15 | 12,3 | 3,4 % | Canibalizada por /lessons-tokyo/tokyo-spanish-schools/ (238 impr.) |

Tres conclusiones guían el resto del documento:

- **Conjugación y DELE concentran la demanda.** Una de cada cinco impresiones de /language/ es de conjugación, y DELE suma búsquedas de examen (過去問, 合格率, 難易度). Son las dos primeras líneas de producto: herramienta de conjugación y simulacros.
- **El problema es el clic, no la indexación.** Diez páginas con más de 500 impresiones tienen CTR por debajo del 3 %. Títulos, datos estructurados y vídeo incrustado (resultados de vídeo en Google) son la palanca.
- **Hay dos duplicados que corregir antes de producir:** conjugación y escuelas de Tokio. Hay que redirigir con 301 a una sola URL.

Fuente: Google Search Console, propiedad sc-domain:supein.club, del 1 de agosto al 30 de octubre de 2026.

## Sistema web ↔ YouTube ↔ LINE

La unidad de contenido no es un artículo ni un vídeo, sino un paquete: una página, un vídeo largo, al menos dos shorts y una oferta de LINE. Se planifica, se publica y se mide junto.

&#91;embedded content: sistema web, YouTube y LINE · 6 piezas, 7 recorridos\]

Google y los shorts traen al alumno; la página lo hace practicar; LINE lo recoge al terminar y lo devuelve con cada episodio nuevo.

## Líneas editoriales del canal

El canal tiene cinco líneas. Cada una nace de un pilar de la web y lleva a él, y ninguna se produce sin su página de destino publicada.

| Línea | Formato | Duración | Ritmo | Sale de | Para qué |
| --- | --- | --- | --- | --- | --- |
| A. スペイン語36ステップ | Explicativo horizontal | 8-12 min | 1 por semana | Un STEP por episodio (36) | Profundidad, retención y suscripción |
| B. 日本人がよく間違えるスペイン語 | Short vertical | 30-45 s | 3 por semana | Los recuadros de errores típicos | Alcance y descubrimiento |
| C. 活用マスター | Short o vídeo corto | 60-90 s | 2 por semana | Conjugador y páginas por verbo (top 50) | La mayor demanda de búsqueda |
| D. DELE対策 | Explicativo horizontal | 10-15 min | 2 al mes, más antes de cada convocatoria | Guías y simulacros DELE | Captar candidatos y llevarlos a LINE |
| E. 聞き取りチャレンジ | Dictado o diálogo con pausas | 3-6 min | 1 por semana desde el mes 3 | Fichas de práctica con audio | Cubrir la escucha, que la web no tiene |

Reglas comunes a las cinco líneas:

- **Idioma:** narración en japonés y ejemplos en español peninsular, siempre con voz nativa. Subtítulos japoneses incrustados y subtítulos en español en CC.
- **Título:** la palabra clave de Search Console en japonés, al principio. Por ejemplo, 「スペイン語 動詞の活用 覚え方」 antes que un título creativo.
- **Cierre:** cada vídeo termina con una sola llamada a la acción, el quiz de su página (enlace en la descripción y en la pantalla final). LINE aparece en la descripción, no en el cierre.
- **Derivados:** cada episodio largo da al menos dos shorts (líneas B o C), sin producir material nuevo.
- **Fuera de alcance por ahora:** directos, pódcast y la línea «aprende con fútbol y cocina». Se valoran en el mes 6 con datos.

El listado completo de páginas y vídeos del curso está en la pestaña Curso A1-C2 y vídeos, calculado todavía sobre los 36 STEP: hay que recalcularlo sobre las 62 unidades y renombrar la línea A antes del 5 de enero de 2027.

## Priorización y backlog

Primero se arregla lo que ya recibe impresiones y después se construye. Se ordena por demanda medida en Search Console y por lo que desbloquea a otras piezas.

| # | Pieza | Pilar | Dato que la justifica | Prioridad |
| --- | --- | --- | --- | --- |
| 1 | Redirigir con 301 los duplicados de conjugación y de escuelas de Tokio | Técnico | 570 y 238 impresiones repartidas en URLs duplicadas | Ahora |
| 2 | Corregir el párrafo sin traducir, los marcadores de audio, el orden DELE y ocultar las respuestas de las ミニ練習 | Calidad | Errores visibles en páginas que ya posicionan | Ahora |
| 3 | Reescribir título y descripción de las 10 páginas con CTR inferior al 3 % | Todos | Posición 6-11 con CTR de 0,3 a 2,8 % | Ahora |
| 4 | Plantilla de ficha nueva: できること, スキル, tiempo, tareas, audio, ejercicios variados, test final | Todos | Base de todas las piezas de práctica | Ahora |
| 5 | Conjugador interactivo y 50 páginas por verbo | 文法・活用 | 4.889 impresiones en la tabla de conjugación | Siguiente |
| 6 | Página 点過去 vs 線過去 y 過去形 (unidades 14, 15 y 16 del curso) | 文法・活用 | 「点過去 活用」 144 y 「過去形」 135 impresiones sin página propia | Siguiente |
| 7 | Audio nativo en vocabulario y pronunciación A1-A2 | 発音・聴解 | Vocabulario A1 con 889 impresiones y audio prometido | Siguiente |
| 8 | Simulacros DELE A1, A2 y B1 por tarea, con PDF a cambio de alta en LINE | 試験 | Hub DELE con 950 impresiones y CTR 0,3 %; búsquedas de 過去問 | Siguiente |
| 9 | Hub /language/ con filtros por los cinco ejes | ルート | El hub está en posición 21 | Siguiente |
| 10 | Episodio piloto de la línea A y 3 shorts derivados | YouTube | Valida voz, estilo y coste antes de la serie | Siguiente |
| 11 | Test de nivel ampliado a C1-C2 | ルート | 「DELE レベルチェック」 252 impresiones | Después |
| 12 | Página de niveles de 西検 | 試験 | 「西検 レベル」 38 impresiones, posición 8 | Después |
| 13 | Directorio curado de recursos | 学び方 | Autoridad temática y enlaces, como todoELE | Después |
| 14 | Vocabulario de fútbol, cocina y viaje enlazado a esas secciones | 語彙・表現 | Tráfico propio de /football/, /food/ y /travel/ | Después |

## Calendario de 12 semanas

El canal arranca el 5 de enero de 2027. Antes, la web se corrige y gana su plantilla nueva, y el piloto valida voz, estilo y coste. Así el primer episodio ya enlaza a páginas con audio y práctica.

&#91;embedded content: plan de 12 semanas · web, canal y LINE\]

Desde la semana 3 la web publica dos fichas por semana. La pausa de 年末年始 (26 de diciembre a 4 de enero) se usa para dejar programados los primeros episodios.

## Enlazado interno y conversión a LINE

> **4 de noviembre de 2026:** el plan detallado del hub como embudo (curso como centro, mapa de intenciones, LINE en puntos intermedios y email como meta final) está en [`plan-hub-embudo.md`](plan-hub-embudo.md). Donde difiera de esta sección, manda ese plan.

Cada página ofrece un único siguiente paso según el momento del alumno: leer, practicar, medirse y unirse a LINE. Los enlaces sostienen la ruta, y LINE se ofrece cuando el alumno acaba de conseguir algo, no antes.

Reglas de enlazado:

- **Vertical (ya existe):** hub de nivel ↔ sus cuatro fichas ↔ STEP anterior y siguiente. Se mantiene.
- **Gramática → herramienta:** cada verbo que aparece en una ficha de gramática enlaza a su página del conjugador.
- **Nivel ↔ examen:** cada hub de nivel enlaza a su guía DELE y a su simulacro, y viceversa.
- **Entre secciones:** /travel/ enlaza a frases de viaje, /food/ a vocabulario de cocina y /football/ a vocabulario de fútbol. Así el tráfico de cultura entra en la ruta de idioma.
- **Vídeo ↔ página:** el vídeo va incrustado sobre el quiz, con datos estructurados VideoObject, y la descripción de YouTube enlaza a esa misma página.
- **El hub /language/** enlaza a las piezas con más demanda (conjugación, ruta, DELE), no a todas por igual.

| Momento | Oferta en LINE | Dónde aparece |
| --- | --- | --- |
| Acaba un quiz | Plan de estudio para su resultado | Pantalla de resultado del quiz |
| Termina el test de nivel | Plan semanal de su nivel | Pantalla de resultado del test |
| Abre un simulacro DELE | PDF del simulacro con soluciones | Botón de descarga del simulacro |
| Consulta el conjugador | 今週の動詞, un verbo por semana | Bajo el resultado de la búsqueda |
| Lee una lista de vocabulario | 毎日1フレーズ, una frase al día | Bloque al final de la lista |

La newsletter se mantiene en /language/. Las ofertas de LINE de la tabla se añaden en su momento, sin sustituirla. Cada ubicación se mide por separado (evento en Analytics y un origen distinto en el panel de LINE) para saber cuál convierte.

## SEO, GEO y AIO

Las tres se trabajan en cada pieza y comparten la misma base: contenido útil, rastreable y bien estructurado. Lo que cambia es dónde aparece supein.club y cómo se mide.

|  | Dónde aparece | Qué lo decide | Cómo se mide |
| --- | --- | --- | --- |
| SEO | Resultados de Google y Bing en japonés | Relevancia, enlaces, CTR y salud técnica | Search Console y Bing Webmaster Tools |
| AIO | AI Overviews y AI Mode de Google | Los mismos sistemas que el buscador; no hacen falta archivos ni marcado especiales ([Google, junio 2026](https://www.seroundtable.com/google-llms-txt-files-hurt-help-41512.html)) | Search Console y prueba manual mensual |
| GEO | ChatGPT, Perplexity, Gemini y Claude | Rastreo propio de cada motor, contenido citable y menciones externas (YouTube, medios) | Prueba manual mensual de 15 consultas |

Lista de comprobación de cada pieza antes de publicar:

- **Título y descripción:** palabra clave japonesa al inicio del título (60 caracteres como máximo) y la respuesta en la descripción.
- **Respuesta directa:** cada sección abre con una o dos frases que se entienden solas. Es lo que citan los motores de IA.
- **Aporte propio:** error típico de japoneses, contraste con el japonés, frecuencia de uso (método Zipf). Lo que un LLM no puede generar solo.
- **Entidad coherente:** el mismo nombre (スペイン倶楽部 / Club Español en Japón), autor con biografía y los mismos sameAs en schema, perfil y redes.
- **Datos estructurados desde el frontmatter:** LearningResource, Quiz, ItemList, BreadcrumbList y VideoObject cuando haya vídeo. Solo lo que se ve en la página.
- **Frescura real:** fecha `updated` visible, y que cambie el contenido, no solo la fecha.
- **Fuentes citadas:** PCIC, MCER, Instituto Cervantes.
- **Texto en el HTML inicial:** audio y quizzes suman, pero la página se entiende sin JavaScript.
- **Vídeo:** subtítulos en japonés y español y descripción con resumen y enlace. La transcripción es otra vía de citación.

Rastreadores y archivos para IA:

- **llms.txt:** se genera en el build, pero no es una palanca: Google Search lo ignora.
- **Google-Extended:** hay que permitirlo para aparecer en Gemini. Google indica que solo los sitios que lo permiten pueden salir en respuestas y recibir clics vía grounding en Gemini Apps ([Google, octubre 2026](https://www.seroundtable.com/google-ai-training-control-42430.html)). Desde principios de 2027 habrá además un token común para el entrenamiento (`__usage_ai-training`).
- **Bots de búsqueda de IA:** siempre permitidos (OAI-SearchBot, PerplexityBot, Claude-SearchBot). Los de entrenamiento (GPTBot, ClaudeBot) son una decisión aparte.

Línea base de citación: las mismas 15 consultas cada mes en ChatGPT, Perplexity, Gemini, Claude y AI Mode, en sesión nueva. Se anota si se cita supein.club, qué URL y si la información es correcta. Meta propuesta a 6 meses: aparecer en al menos 5 de las 15 en dos motores o más.

| Consulta | Página que debería aparecer |
| --- | --- |
| スペイン語 勉強法 独学 | [learn-spanish](https://supein.club/language/learn-spanish/) |
| スペイン語 学習 ロードマップ | [learn-spanish](https://supein.club/language/learn-spanish/) |
| スペイン語 レベルチェック | [level-test](https://supein.club/language/learn-spanish/level-test/) |
| スペイン語 動詞 活用 覚え方 | [verb-conjugation](https://supein.club/language/learn-spanish/verb-conjugation/) |
| ser estar 違い | [A1 文法](https://supein.club/language/learn-spanish/a1/grammar/) (unidad 3 cuando se publique) |
| スペイン語 接続法 | [B1 接続法](https://supein.club/language/learn-spanish/b1/subjunctive/) |
| 点過去 線過去 違い | Unidad 16 (/a2/indefinido-vs-imperfecto/) |
| DELE 難易度 | [dele-difficulty-guide](https://supein.club/language/learn-spanish/dele-difficulty-guide/) |
| DELE B1 対策 | [DELE B1](https://supein.club/language/learn-spanish/dele/b1/) |
| DELE 西検 違い | [dele-vs-seiken](https://supein.club/language/learn-spanish/dele-vs-seiken/) |
| DELE 過去問 | [dele-self-study](https://supein.club/language/learn-spanish/dele-self-study/) |
| スペイン語 発音 日本人 | [pronunciation-for-japanese](https://supein.club/language/learn-spanish/pronunciation-for-japanese/) |
| 東京 スペイン語 教室 おすすめ | [tokyo-spanish-schools](https://supein.club/language/tokyo-spanish-schools/) |
| スペイン語 アプリ おすすめ | [spanish-apps](https://supein.club/language/spanish-apps/) |
| 中南米 スペイン語 違い | [spanish-in-latin-america](https://supein.club/language/learn-spanish/spanish-in-latin-america/) |

- [ ] Medir la línea base de las 15 consultas antes del Nov 9, 2026, antes de cualquier cambio.
- [x] Hecho el 2 de noviembre (PR #595): schema LearningResource, Quiz e ItemList, llms.txt generado en el build y robots.txt con reglas explícitas.
- [ ] Verificar supein.club en Bing Webmaster Tools y enviar el sitemap, si no está hecho.
- [ ] Decidir si se permite el entrenamiento (GPTBot, ClaudeBot).

## Flujo de producción y calidad

Cada pieza pasa por el mismo flujo, y el vídeo se escribe a partir de la página publicada, nunca desde cero. Así la web y el canal no se contradicen y el guion sale casi hecho.

1. **Selección:** se toma la siguiente pieza del backlog, con su dato de Search Console.
2. **Brief:** palabra clave en japonés, nivel, los cinco ejes, できること y destino (página, vídeo o ambos).
3. **Redacción en japonés** con el pipeline de cuatro agentes que ya se usa para artículos, adaptado a la plantilla de ficha nueva.
4. **Revisión doble:** el español lo revisa un nativo español y el japonés un nativo japonés. No se publica con una sola revisión.
5. **Audio:** voz nativa grabada o voz sintética revisada frase a frase. Ningún marcador de audio sin audio detrás.
6. **Publicación** con el frontmatter completo, la lista SEO/GEO/AIO superada y la fecha `updated` visible.
7. **Guion de vídeo:** se deriva de la página (secciones, ejemplos, error típico, quiz) y se marcan los fragmentos para shorts.
8. **Producción, revisión y publicación del vídeo;** después se incrusta en su página.
9. **Medición** a las 4 y a las 8 semanas: impresiones, CTR, quizzes completados y altas en LINE.

Reglas de calidad:

- Botón 「間違いを報告」 en cada ficha. Los avisos se corrigen en menos de 7 días, como hace ProfedeELE con sus comentarios.
- Revisión trimestral de las 20 páginas con más impresiones: datos, fechas DELE y enlaces.
- Fuentes siempre citadas (PCIC, MCER, Instituto Cervantes). Nada de cifras no oficiales: los 合格率 de DELE no se publican, y se dice así.
- Español peninsular como norma, con notas sobre el de América cuando cambie el uso.

## Decisiones pendientes

Siete decisiones fijan el ritmo y el coste real del plan. Las cuatro primeras hay que tomarlas antes de la semana 3.

- [ ] **Capacidad semanal:** horas disponibles para web y vídeo. Los ritmos de las líneas A-E suponen dos fichas web y seis piezas de vídeo por semana; si no hay horas, se recortan B y C antes que A.
- [ ] **Voz del canal:** voz propia clonada para el español y una voz japonesa. Falta decidir quién revisa la narración japonesa.
- [ ] **Línea base del canal:** suscriptores, vídeos publicados y vistas actuales, para fijar bien la meta de 2.000 suscriptores.
- [x] **Conjugador:** decidido el 2 de noviembre de 2026: desarrollo propio (motor de reglas y tabla manual de irregulares, revisado por un nativo contra el DLE).
- [ ] **Monetización:** todo gratis a cambio de LINE, o además cuadernos PDF de pago por nivel, como el cuadernillo de 2,99 € de DELE Ahora o los packs de ProfedeELE.
- [ ] **Presupuesto de créditos de Higgsfield:** se fija tras medir el coste real del episodio piloto.
- [ ] **Medición en LINE:** cómo distinguir el origen de cada alta en el panel de LINE Official Account.

## Fuentes

- Google Search Console, propiedad sc-domain:supein.club, del 1 de agosto al 30 de octubre de 2026.
- [supein.club/language](https://supein.club/language/), [A1 文法](https://supein.club/language/learn-spanish/a1/grammar/) y [A1 語彙](https://supein.club/language/learn-spanish/a1/vocabulary/), revisadas el 1 de noviembre de 2026.
- [ProfedeELE](https://www.profedeele.es/) y su actividad [Preposiciones A / DE / EN](https://www.profedeele.es/actividad/preposiciones-a-de-en/).
- [DELE Ahora, exámenes](https://deleahora.com/actividades/examenes) y su [examen de verbos A2](https://deleahora.com/actividades/examenes/examen-de-verbos-nivel-a2).
- [todoELE, evaluación](https://todoele.net/evaluacion).
