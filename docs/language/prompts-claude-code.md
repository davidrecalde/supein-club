# Prompts para Claude Code

Nueve prompts, en orden. El bloque 0 se pega una sola vez en el CLAUDE.md del repositorio; los demás se dan de uno en uno, y no se empieza el siguiente hasta que el anterior está revisado y fusionado. Todos piden plan y diff antes de implementar, y ninguno autoriza a inventar contenido pedagógico. Antes del prompt 1, copia en el repositorio cuatro archivos: las dos especificaciones exportadas en Markdown (`docs/language/estrategia.md` y `docs/language/curso-paso-a-paso.md`), la semilla de unidades (`docs/language/units.json`) y la unidad modelo (`docs/language/examples/14-preterito-indefinido.md`).

## 0. Reglas del proyecto (CLAUDE.md)

```
## Reglas de /language/ (curso de español para japoneses)

- Fuente de verdad: docs/language/curso-paso-a-paso.md y docs/language/estrategia.md.
  Si una petición contradice esos documentos, pregunta antes de implementar.
- La web está en japonés. Nada de texto en español sin traducir, salvo los ejemplos
  lingüísticos. Nomenclatura del Instituto Cervantes: A1 Acceso, A2 Plataforma,
  B1 Umbral, B2 Avanzado, C1 Dominio operativo eficaz, C2 Maestría; secciones según el PCIC.
- Español peninsular como norma. Vosotros no se marca (sustituido el 10-11-2026: antes se marcaba 「スペインのみ」).
- URLs estables: nunca cambies una URL existente sin 301. El número de unidad va en el
  frontmatter, nunca en la URL.
- Una intención de búsqueda, una página. Antes de crear una página, comprueba la sección
  «Anti-canibalización» de curso-paso-a-paso.md. Si ya existe canónica, amplíala o redirige.
- Todo el contenido visible va en el HTML inicial. JavaScript solo mejora: quizzes,
  buscador, progreso.
- Schema JSON-LD generado desde el frontmatter y solo con lo que se ve en la página.
  Sin precios. Sin Course/Offer con datos que no existan.
- Cada página: título de 60 caracteres como máximo con la palabra clave japonesa al inicio,
  description que responda a la búsqueda, campo `updated` visible, migas de pan y al menos
  5 enlaces internos entrantes.
- Audio: nunca muestres un control de audio sin archivo detrás. El campo `audio` del
  frontmatter queda pendiente hasta la fase de TTS.
- Imágenes con alt en japonés, sin saltos de maquetación, Lighthouse móvil ≥ 90.
- Entrega siempre: plan, diff, PR. Nunca merge directo a main. Si falta texto pedagógico,
  deja un marcador TODO:contenido y lista los huecos al final.
```

## 1. Redirecciones, correcciones y títulos

```
# TAREA: Redirecciones 301, correcciones de calidad y títulos en /language/

Lee docs/language/curso-paso-a-paso.md (sección Anti-canibalización) y docs/language/estrategia.md
(sección Mapa de demanda) antes de tocar nada.

1. Redirecciones 301 con el mecanismo que ya use el proyecto (p. ej. _redirects de Cloudflare
   Pages). Comprueba antes qué responde cada URL:
   - /language/spanish-grammar/verb-conjugation/ → /language/learn-spanish/verb-conjugation/
   - /language/lessons-tokyo/tokyo-spanish-schools/ → /language/tokyo-spanish-schools/
   - /language/lessons-tokyo/ → /language/tokyo-spanish-schools/
   - /language/learn-spanish/learn-spanish/ → /language/learn-spanish/
   - /language/learn-spanish/dele-b1-tips/ → /language/learn-spanish/dele/b1/ (antes, mueve su
     contenido útil a una sección 「合格のコツ」 de /dele/b1/)
   - /language/spanish-grammar/ y /language/learn-spanish/spanish-for-beginners/: dime qué son
     antes de redirigirlas.
   Actualiza enlaces internos y sitemap; nada debe apuntar a las URLs antiguas.

2. A1 語彙: sustituye el párrafo en español «Las palabras de esta página no están elegidas al
   azar…» por:
   「このページの単語は無作為に選んだものではありません。Corpus del Español（スペイン語コーパス）に基づき、
   実際に使われる頻度に沿って選んでいます。よく使われる単語ほど、早く必要になります。」
   Busca el mismo texto o componente sin traducir en otras páginas.

3. Audio: elimina los marcadores 「[🔊 音声]」 sin archivo y quita 「音声」 de title, description y
   textos donde no haya audio real. Deja el componente preparado para cuando haya archivos.

4. ミニ練習: envuelve las respuestas en <details><summary>答えを見る</summary>…</details> sin
   cambiar el texto.

5. Hub /language/: ordena la sección DELE por su número (1/10 a 10/10). La newsletter se
   mantiene tal cual.

6. Muestra 「最終更新日」 en cada ficha desde el mismo campo que alimenta dateModified.

7. Títulos y descriptions. Muestra primero el actual y el nuevo de cada página, en una tabla,
   para revisión nativa antes del merge. Propuestas:
   - verb-conjugation: 「スペイン語 動詞の活用一覧と覚え方｜現在・点過去・接続法まで」
     「スペイン語の動詞活用を一覧表で確認。規則動詞-ar/-er/-irのモデル、不規則動詞のグループ、覚え方のコツを日本人向けに解説。」
   - dele-difficulty-guide: 「DELEの難易度と合格率の目安｜A1〜C2をレベル別に比較」
   - a1/vocabulary: 「スペイン語 A1 単語一覧｜頻度順に覚える最重要語」
   - b2/subjunctive: 「スペイン語 接続法過去（-ra/-se）の活用と使い方｜hubieraの仕組み」
   - travel-phrases-spanish: 「旅行で使えるスペイン語フレーズ集｜場面別・読み方付き」
   - b1/subjunctive: 「スペイン語 接続法現在の活用と使い方｜B1で押さえる5つのルール」
   - dele-vs-seiken: 「DELEと西検の違いを比較｜レベル対応表とどちらを受けるべきか」
   - spanish-vs-japanese: 「スペイン語と日本語の7つの違い｜学ぶ前に知っておきたいこと」
   - dele/ (hub): 「DELEとは？スペイン語検定DELEの読み方・レベル・試験内容を解説」
   - pronunciation-for-japanese: 「日本人のためのスペイン語発音｜苦手な音7つと練習法」
   - Hubs de nivel /a1/ … /c2/: quita «DELE» del título. Patrón:
     「スペイン語 A1（Acceso）とは｜できること・学習時間・学び方」
   - Páginas /dele/<nivel>/: patrón 「DELE B1 対策｜試験の構成・タスク・勉強法」. Quita de ellas
     las secciones sobre 難易度 y enlázalas a la guía de dificultad.
   - zipf-law-methodology: retitula hacia 「スペイン語の単語を頻度順に学ぶ理由｜ジップの法則」.

Entrega: tabla de redirecciones comprobadas, tabla de títulos actual/nuevo y diff.
```

## 2. Colección `units`, plantilla de unidad y páginas de nivel

```
# TAREA: Infraestructura del curso de 62 unidades (sin contenido todavía)

Lee docs/language/curso-paso-a-paso.md entero. Es la especificación.

1. Content collection `units` (Astro 5) con este esquema: unit (1-62), level (A1-C2),
   levelName (Acceso…Maestría), slug, title, titleEs, grammar[], tenses[], functions[],
   canDo[] (2-3), vocabulary[] ({es, ja, rank}), verbs[] (slugs del conjugador), duration
   (minutos), prev, next, related[] (3), audio[] (vacío por ahora), youtubeId, draft,
   updated. Validación con zod; el build falla si falta un campo obligatorio.

2. Genera los 62 archivos de unidad a partir de docs/language/units.json (semilla con el frontmatter:
   nivel, slug, URL, título, gramática, verbos, prev, next, related), tomando como modelo de
   estructura docs/language/examples/14-preterito-indefinido.md, con el
   frontmatter completo (título japonés, término español, nivel, gramática) y el cuerpo con las
   once secciones vacías marcadas TODO:contenido. Todas con draft: true. Las cinco unidades
   que reutilizan páginas existentes (1, 25, 37, 49, 57) conservan su URL actual: resuelve la
   ruta desde el frontmatter, no muevas el archivo si eso cambia la URL.

3. Plantilla de unidad con las once secciones de la especificación y estos componentes:
   UnitHeader (「ユニット 14 / 62 · A2 Plataforma」, できること, 所要時間, casilla 完了),
   GrammarTable (etiquetas japonesas, irregulares resaltados), VocabList, Exercise (respuesta
   oculta con <details>), MiniQuiz (10 preguntas, puntuación, explicación por respuesta, marca la
   unidad como completada al aprobar), UnitNav (anterior, siguiente, 3 relacionadas), CultureNote,
   ReportError (formulario 「間違いを報告」). Todo el texto en HTML inicial; los componentes
   interactivos son islas.

4. Progreso sin cuenta: localStorage bajo la clave supein.course.v1 con unidades completadas,
   puntuaciones y fechas. La página de nivel lista sus unidades con estado 完了 y botón
   「続きから」; el hub /language/ muestra los seis niveles con porcentaje y unidad siguiente.

5. Páginas de nivel y resumen: /<nivel>/ pasa a listar las unidades; /<nivel>/grammar/ se
   convierte en índice (un párrafo y enlace por unidad, sin explicar). No cambies URLs.

6. Migas de pan en todas las páginas de /language/: /language/ › コース › nivel › unidad.

7. Schema desde el frontmatter: LearningResource por unidad (ya existe el patrón),
   ItemList por nivel, y en el hub un Course con isAccessibleForFree: true y hasPart hacia los
   niveles. Sin Offer. Valida con el Schema Markup Validator.

8. Comprobación en el build: ninguna unidad publicada con menos de 5 enlaces internos
   entrantes ni con marcadores TODO:contenido.

Entrega: plan de componentes, esquema zod, un ejemplo de unidad renderizada con contenido de
prueba claramente marcado y diff. No publiques ninguna unidad (draft: true).
```

## 3. Conjugador: página central, datos y 50 verbos

```
# TAREA: Conjugador en /language/learn-spanish/verb-conjugation/

Lee la sección «Anti-canibalización» de docs/language/curso-paso-a-paso.md. Las unidades de
tiempo son las páginas canónicas de cada tiempo; aquí no se crean páginas de tiempo.

1. Datos: src/data/conjugation/<verbo>.json para 50 verbos, generados por un motor de reglas
   (regulares, cambios vocálicos, verbos en -go, pretéritos fuertes, participios irregulares)
   más una tabla manual de irregulares. Cubre: indicativo (presente, pretérito indefinido,
   pretérito imperfecto, futuro, condicional), compuestos (pretérito perfecto, pluscuamperfecto,
   futuro perfecto, condicional perfecto), subjuntivo (presente, imperfecto -ra y -se, perfecto,
   pluscuamperfecto), imperativo afirmativo y negativo, gerundio y participio.
   Tests automáticos de acentos y terminaciones. Exporta un CSV con todas las formas marcadas
   como irregulares para que las revise un nativo contra el DLE de la RAE antes del merge.
   Empieza por ser, haber, estar, tener, hacer, poder, decir, ir, ver y dar.

2. Página central (misma URL): buscador arriba, que acepta infinitivo o forma conjugada y
   responde 「fui = ir / ser の点過去、1人称単数」 con enlace al verbo; dos frases de respuesta
   directa; tabla rápida de hablar, comer y vivir (presente, 点過去, 線過去, futuro); sección
   「覚え方」; mapa de tiempos ordenado por dificultad con nivel y enlace a su unidad; sección
   「過去形は2つある」 que enlaza a las unidades 14, 15 y 16; lista de los 50 verbos por frecuencia;
   quiz de 5 preguntas. Todo el texto en HTML inicial; el buscador es una isla.

3. Páginas de verbo en /language/learn-spanish/verb-conjugation/<verbo>/: título
   「tener の活用｜スペイン語動詞活用表（全時制）」; cabecera con significado, tipo, puesto de
   frecuencia y nivel; tabla completa con irregulares resaltados; vosotros sin marca
   (antes 「スペインのみ」; sustituido el 10-11-2026); 3-5 ejemplos con traducción (sin audio);
   un error típico de japoneses; bloque 「この動詞を学ぶユニット」 con enlaces a las unidades de sus
   tiempos; verbos que se conjugan igual; quiz de 5 preguntas; hueco para el short de YouTube.
   Schema LearningResource y BreadcrumbList.

4. Enlaces: cada unidad enlaza a los verbos de su campo verbs[]; cada verbo enlaza a sus
   unidades; la página central enlaza a todo.

Entrega: motor de reglas con tests, CSV de irregulares para revisión, los 10 primeros verbos
y la página central en diff. Los 40 restantes en un segundo PR tras la revisión.
```

## 4. Producción de una unidad (plantilla, se repite 62 veces)

```
# TAREA: Producir la unidad {N} 「{título}」 ({nivel} {nombre}, {término español})

Lee en docs/language/curso-paso-a-paso.md la fila de la unidad y la sección «Anatomía de
una unidad». Fuente lingüística: el inventario de Gramática del PCIC para {nivel} y la
Nueva gramática de la RAE para las formas. No copies texto de ninguna fuente.
Modelo de referencia: docs/language/examples/14-preterito-indefinido.md. Sigue su estructura,
tono, extensión y nivel de detalle; el frontmatter ya está en docs/language/units.json.
Personaje: escribe los ejemplos y diálogos desde la situación del personaje indicado en cast[]
(ficha en docs/language/cast.json). Usa sus arcs[] para elegir el contexto; mantén su edad, su
ciudad y su motivo para aprender. Los ejemplos de contraste y las alternativas regionales las
introduce Daniel.

Escribe el archivo de la unidad en japonés, con las once secciones:
1. Cabecera desde el frontmatter: 2-3 できること redactados como descriptores del PCIC.
2. Introducción: dos frases que respondan solas a 「{pregunta de la unidad}」.
3. 文法: explicación con términos en español entre paréntesis, tablas con etiquetas japonesas,
   irregulares resaltados. Ejemplos en español peninsular con traducción natural.
4. 活用: uno o dos verbos del campo verbs[] con enlace a su página.
5. 語彙: 10-15 palabras ordenadas por frecuencia (rank), con traducción.
6. 発音・正書法: un solo punto. Marca las frases que llevarán audio en audio[] del frontmatter.
7. 日本人がよく間違える: 2-3 errores de contraste japonés-español, con la forma correcta.
8. 文化メモ: un párrafo que enlace a un artículo real de /food/, /football/ o /travel/.
9. 練習: tres ejercicios (reconocer, rellenar, producir), respuestas ocultas.
10. ミニテスト: 10 preguntas de opción múltiple con explicación de la correcta y de los errores.
11. Cierre: resumen de tres líneas; prev, next y related ya vienen del frontmatter.

Extensión: 1.800-2.500 caracteres japoneses sin contar tablas y quiz. Título de 60 caracteres
como máximo con la palabra clave al inicio; description con la respuesta. draft: true hasta
la revisión nativa (español y japonés). Si la unidad reutiliza una página existente, parte de
su contenido y conserva lo que ya posiciona.

Entrega: el archivo, la lista de enlaces internos que has puesto y las dudas lingüísticas.
```

## 5. Retención y recomendación

```
# TAREA: Mecánicas de retención y recomendación del curso

Lee la sección «Retención y recomendación» de docs/language/curso-paso-a-paso.md.
Todo funciona sin cuenta de usuario y a partir del progreso en localStorage de la fase 2.

1. 「今日の復習」 en el hub: propone un test corto con preguntas de las unidades completadas
   hace 1, 7 y 30 días.
2. 連続学習日数 (racha) en el hub, sin mensajes negativos al perderla.
3. Plan semanal: tras el test de nivel, elección de ritmo (2, 3 o 5 unidades por semana) y
   calendario de unidades con fechas; enlace a LINE y a la newsletter para avisos.
4. Certificado de nivel: al aprobar la unidad de cierre, imagen 「{nivel} {nombre} 修了」 con
   nombre introducido por el alumno y fecha, generada en el cliente y descargable; botones
   para X, LINE e Instagram.
5. Resultado compartible de cada ミニテスト: imagen con puntuación y enlace a la unidad.
6. Imágenes Open Graph generadas en el build para cada unidad y verbo (título japonés, nivel,
   número de unidad), para que el enlace se entienda al pegarlo en LINE.
7. Eventos de analítica: unit_completed, quiz_completed (con puntuación), review_started,
   certificate_downloaded, share_clicked, line_clicked, newsletter_clicked.

Entrega: plan, componentes y diff. Nada de lo anterior bloquea el contenido para quien tenga
JavaScript desactivado.
```

## 6. Test de nivel hasta C2 y modo examen

```
# TAREA: Test de nivel A1-C2 y componente de simulacro DELE

Lee la sección «Pruebas de nivel y DELE» de docs/language/curso-paso-a-paso.md.
Las preguntas son nuestras; no reproduzcas ítems del Instituto Cervantes.

1. Test de nivel /language/learn-spanish/level-test/: amplíalo a C1 y C2 con bloques por
   nivel basados en descriptores del PCIC; resultado por nivel y recomendación de la unidad por
   la que empezar, con enlace y botón para fijar el plan semanal. Deja marcadores TODO:contenido
   donde falten preguntas.
2. Componente ExamMode para las unidades 12, 24, 36, 48, 56 y 62: tareas numeradas, botón
   「開始」, cronómetro opcional, puntuación por prueba (lectura, auditiva, escrita, oral),
   「やり直す」 y 「解答を見る」. Las pruebas auditivas se muestran como 「音声準備中」 hasta la fase
   de TTS; las orales enlazan a /dele-oral-interview-guide/.
3. Descarga del simulacro en PDF generado en el build, ofrecida con la llamada a LINE prevista
   en docs/language/estrategia.md (sección Enlazado interno y conversión a LINE).

Entrega: plan, componentes y diff.
```

## 7. Audio con Gemini TTS (cuando el nivel esté completo)

```
# TAREA: Generación y publicación del audio de un nivel

Lee la sección «Audio» de docs/language/curso-paso-a-paso.md.

1. Script scripts/tts/generate.ts que lee el campo audio[] de todas las unidades de un nivel,
   llama a la API de Gemini TTS (modelo gemini-3.1-flash-tts-preview) con voz peninsular, genera
   cada frase en dos velocidades (lenta y natural), guarda los archivos y escribe un manifiesto
   con duración y hash. La clave de API va en variable de entorno, nunca en el repositorio.
2. Componente AudioPlayer que solo se muestra si el manifiesto tiene el archivo; botón de
   velocidad y transcripción visible.
3. Activa los dictados y las pruebas auditivas de los simulacros del nivel.
4. Informe de revisión: lista de archivos para que un nativo los escuche antes de publicar.

Entrega: script, componente, manifiesto de ejemplo con tres frases y diff.
```

## 8. Sitemap, llms.txt y seguimiento

```
# TAREA: Visibilidad del curso para buscadores y agentes

1. Sitemap con las unidades y los verbos publicados (draft: false) y sus fechas `updated`.
2. /llms.txt: añade la sección «Curso A1-C2» con las 62 unidades por nivel y los 50 verbos,
   generada en el build desde la colección.
3. robots.txt: sin cambios salvo que yo lo pida.
4. Script scripts/seo/report.ts que, con la API de Search Console, saque cada mes clics,
   impresiones, CTR y posición de /language/ por página, detecte consultas con dos o más
   páginas en los diez primeros puestos (canibalización) y escriba el resultado en
   docs/language/reports/YYYY-MM.md.

Entrega: plan y diff.
```

## 9. Reparto, preferencias y transparencia

Se aplica después del prompt 2 y antes de producir unidades con el prompt 4.

```
# TAREA: Reparto del curso, pantalla de preferencias y página sobre la IA

Lee la sección «Reparto, preferencias y transparencia» de docs/language/curso-paso-a-paso.md.
Los datos del reparto están en docs/language/cast.json y cada unidad ya trae su campo cast[]
en docs/language/units.json.

1. Colección `cast` (Astro 5) desde docs/language/cast.json: id, name, nameEs, age, from, role,
   bio, levels[], arcs[], voice{gender, age, accent}. Valida con zod.
   Añade `cast: string[]` al esquema de `units` y propágalo a los 62 archivos desde units.json.

2. Componente CastBadge en la cabecera de cada unidad: retrato, nombre japonés y una línea de
   situación («ミナ・初めてのスペイン旅行»). Enlaza a /language/cast/.
   Página /language/cast/ con los cinco personajes, su biografía y las unidades donde aparecen
   (generada desde levels[]). Schema: ItemList; los personajes NO se marcan como Person, porque
   son ficticios.
   Retratos: usa ilustraciones, nunca fotografías ni imágenes fotorrealistas de personas.
   Si no hay ilustración todavía, deja un marcador de posición neutro, no una foto.

3. Pantalla de preferencias en /language/learn-spanish/welcome/ (nueva URL, enlazada desde el hub
   y desde el resultado del test de nivel, y accesible siempre desde el menú):
   - variedad: 'es' (España) | 'la' (Latinoamérica)
   - ritmo: 2 | 3 | 5 unidades por semana
   - ejemplos por punto: 1 | 2 | 3
   - audio: 'natural' | 'pausado' y duración de pausa (0,5 s / 1 s / 1,5 s)
   Se guardan en localStorage bajo supein.prefs.v1, junto al progreso de la fase 2.
   Efecto inmediato en todas las unidades: con variedad 'la', vosotros se muestra plegado
   (sin marca desde el 10-11-2026) y el vocabulario regional se reordena; con 'es', al revés. El número de
   ejemplos visibles cambia según la preferencia. Las preferencias de audio se guardan ya aunque
   el reproductor aún no exista.
   Sin JavaScript, la página se ve con los valores por defecto (es, 3, 2, natural) y el contenido
   completo sigue en el HTML.

4. Página /language/about-this-course/ (título japonés 「このコースの作り方」):
   quién decide el contenido (David Recalde), fuentes (Plan curricular del Instituto Cervantes,
   Nueva gramática de la RAE), en qué pasos interviene la IA (redacción asistida, voces generadas
   con Gemini TTS), qué revisa una persona nativa antes de publicar y cómo reportar un error.
   Enlázala desde el pie de /language/ y desde cada unidad junto al botón 「間違いを報告」.
   Schema: Article con author Person (David Recalde) y publisher Organization.

5. Marca de audio generado: cuando una unidad tenga audio, el reproductor muestra
   「AI音声（ネイティブ監修済み）」 con enlace a /language/about-this-course/. Prepara el
   componente aunque todavía no haya archivos.

6. Actualiza el prompt de producción de unidades (docs/language/prompts-claude-code.md, prompt 4)
   para que los ejemplos y diálogos se escriban desde la situación del personaje de cast[].

No escribas contenido de unidades en esta tarea. Entrega: plan, componentes, diff y una unidad de
muestra con CastBadge y preferencias aplicadas.
```
