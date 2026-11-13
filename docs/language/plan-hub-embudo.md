# Plan del hub スペイン語: el curso como centro y embudo hasta el email

Plan del 4 de noviembre de 2026, a partir del informe de Search Console de los últimos tres meses (`SEO/GSC/GSC_hub-language_y_vision-general_supein-club_3-meses.md`, del 4 de agosto al 2 de noviembre). Pendiente de aprobación de David.

## Decisiones de partida (David, 4 de noviembre de 2026)

- **El curso de 62 unidades es el centro del hub.** Todos los artículos de はじめに, DELE, 学習リソース y スペイン語学校 quedan supeditados a él y se pueden reescribir para no canibalizarlo.
- **El test de nivel crece:** A1-C2, resultado gratis y en pantalla, y recomendación de la unidad del curso por la que empezar. Debajo, una invitación pequeña y no intrusiva a LINE.
- **No perder el tráfico actual.** Ninguna URL que rankea cambia sin 301.
- **El curso aún no se publica:** faltan los audios de todas las unidades (generación gradual con el nivel gratuito de Gemini, unas dos o tres semanas).
- **Meta final del embudo: el email.** LINE se ofrece en puntos intermedios.

## Punto de partida (datos de los últimos 3 meses)

| Indicador | Valor |
| --- | --- |
| Clics del hub /language/ | 755 (19,7 % del sitio), CTR limpio 2,73 %, posición 8,1 |
| `/language/` (raíz) | 3 clics, 309 impresiones, posición **21,6** |
| `/language/learn-spanish/` | 129 clics, CTR 8,14 %; 「スペイン語学習 ロードマップ」 en posición 2,1 (CTR 47 %) |
| `/learn-spanish/verb-conjugation/` | 139 clics, la página más visitada del hub |
| `/learn-spanish/level-test/` | 44 clics, CTR 4,75 % (「dele レベルチェック」, 「スペイン語 テスト」) |
| Hub DELE `/learn-spanish/dele/` | 989 impresiones, CTR **0,3 %**, posición 11 |
| Páginas con ≤ 2 clics | 32 de 75 (pronunciación por nivel, C1-C2, páginas sueltas) |

## Reglas que se aplican a todo el plan

1. **URLs protegidas.** Estas páginas tienen 10 clics o más en tres meses y conservan su URL, aunque se reescriban: `/learn-spanish/`, `verb-conjugation`, `level-test`, `dele-difficulty-guide`, `a1/vocabulary`, `movies-series-spanish`, `dele/a2`, `a2/grammar`, `dele-self-study`, `b1/subjunctive`, `travel-phrases-spanish`, `b2/subjunctive`, `tokyo-spanish-schools`, `dele/b1`, `a1/study-plan`, `b1/study-plan`, `dele-vs-seiken`, `reading-tips`, `a2/study-plan`, `dele/a1` y `spanish-vs-japanese`.
2. **Una intención, una página** (tabla de abajo). Si dos páginas responden a lo mismo, una se reescribe con otro enfoque o se redirige con 301.
3. **Cada página ofrece un único siguiente paso** hacia el curso: el test de nivel, el hub de nivel o una unidad concreta. Ninguna página termina sin salida.
4. **Nada se bloquea.** Ningún contenido ni resultado se esconde detrás de un registro. LINE y email se ofrecen a cambio de algo extra.
5. **LINE nunca en ventana emergente:** una tarjeta pequeña en el flujo, como máximo una por página, que no vuelve a aparecer si el usuario la cierra.
6. **Antes del lanzamiento no se enlaza a unidades** (en producción todavía no existen). Los cambios previos enlazan solo a páginas que ya existen.
7. **Anclas.** Si se puede, se conservan los títulos H2 de las páginas protegidas: Google los muestra como enlaces 「ir a」, aunque solo aportaron 1 clic en tres meses.

## Mapa de intenciones (quién responde a qué)

| Intención de búsqueda | Página canónica | Papel en el embudo |
| --- | --- | --- |
| スペイン語 勉強法・独学・入門 サイト | `/language/` (reescrita como guía) | Entrada amplia → test de nivel |
| スペイン語学習 ロードマップ・無料 講座 | `/language/learn-spanish/` (hoja de ruta + curso) | Entrada → test o unidad 1 |
| スペイン語 レベルチェック・テスト | `/learn-spanish/level-test/` | Diagnóstico → unidad de inicio |
| スペイン語 A1 (… C2) | `/learn-spanish/a1/` … `/c2/` | Hub de nivel con sus 12 unidades |
| Un punto gramatical (点過去, ser estar…) | La unidad del curso | Activación |
| 接続法 (en general) | Unidad 25 `/b1/subjunctive/` | Las unidades 37, 49 y 57 enlazan a ella |
| スペイン語 A1 文法 まとめ | `/a1/grammar/` … (chuleta del nivel) | Tabla resumen → cada unidad |
| スペイン語 A1 単語 | `/a1/vocabulary/` … | Lista del nivel → unidades |
| スペイン語 A1 勉強 計画 | `/a1/study-plan/` … | Calendario de unidades por semanas |
| スペイン語 活用・動詞 一覧 | `verb-conjugation` y páginas de verbo | Herramienta → unidad del tiempo verbal |
| 発音 (日本人) | `pronunciation-for-japanese` | Unidad 1 para lo básico |
| DELE (qué es, niveles) | `/language/dele/` (hub DELE desde el 13 de noviembre de 2026, antes `/learn-spanish/dele/`, con 301) | DELE de cada nivel → simulacro |
| DELE A1 … C2 | `/dele/a1/` … | Información → unidad de cierre (simulacro) |
| DELE 難易度・独学・面接・西検 | Guías DELE actuales | → test de nivel y simulacros |
| Escuchar, leer, películas, frases de viaje | Artículos de 学習リソース | Práctica → unidades del nivel |
| スペイン語 学校 東京 (y otras ciudades) | Páginas de escuelas, con `spanish-schools-in-japan` como madre | Salida comercial del embudo |

## El embudo

```
1 ENTRADA    búsqueda → unidad, verbo, DELE, recurso, escuela o cultura (/food, /football, /travel)
2 DIAGNÓSTICO test de nivel → resultado gratis en pantalla + unidad de inicio
3 ACTIVACIÓN primera unidad → minitest aprobada (7/10)
4 HÁBITO     progreso por nivel, 「続きから」, 今日の復習, racha, audio, personajes
5 LINE       puntos intermedios (resultado del test, primera minitest, conjugador): tarjeta pequeña
6 EMAIL      momentos de mucho valor: guardar el progreso, certificado de nivel, simulacro en PDF
7 RETORNO    LINE semanal + email semanal (plan y repaso) → vuelta a la unidad siguiente
8 SALIDA     escuelas (conversación), simulacros DELE, eventos de スペイン倶楽部
```

| Momento | Oferta | Canal | Por qué ahí |
| --- | --- | --- | --- |
| Resultado del test de nivel | 「あなたのレベルに合わせた学習のヒントをLINEで」 | LINE | Acaba de recibir algo gratis; la petición es pequeña |
| Primera minitest aprobada | 「毎週1つ、使える表現をLINEで」 | LINE | Primer logro |
| Conjugador y páginas de verbo | 「今週の動詞」 | LINE | Consulta rápida y recurrente |
| 3 unidades completadas | 「学習記録を保存して、別のスマホやPCでも続ける」 | **Email** | El progreso solo vive en el navegador y ya tiene valor |
| Unidad de cierre aprobada (12, 24…) | Certificado del nivel con su nombre + plan del nivel siguiente | **Email** | Logro máximo |
| Simulacro DELE | PDF del simulacro con soluciones | **Email** | Recurso descargable de valor |
| Hub /language/ y pie de página | Newsletter actual | Email | Se mantiene |

## Plan numerado

### Fase A. Proteger y arreglar (ya, sin mostrar el curso) — hecha el 4 de noviembre de 2026

La entonación y la conexión entre palabras (A2 y B1) se añadieron a `pronunciation-for-japanese`, que las anunciaba sin tenerlas; el yeísmo y la s debilitada (B2), a `spanish-in-latin-america`. Las fichas de pronunciación salieron de la secuencia de STEP. Eventos de GA4: `line_clicked` (con `source`: `banner`, `floating`, `footer` u `other`), `newsletter_signup` y `level_test_completed`.

1. **301 de `/language/learn-spanish/spanish-for-beginners/`** (hoy da 404 y en septiembre tenía clics) hacia `/language/learn-spanish/a1/`.
2. **301 de las seis páginas antiguas con `noindex`:** `/language/self-study/` → `/language/`; `/language/pronunciation/` → `pronunciation-for-japanese`; `/language/spanish-phrases/` → `travel-phrases-spanish`; `/language/online-lessons/` y `/language/lesson-price/` → `spanish-schools-in-japan`; `/language/spanish-books/` → `/language/`. Se retiran de `noindexPaths.ts`, del sitemap y de las migas.
3. **301 de la pronunciación por nivel sin clics:** `a2` y `b1/pronunciation` → `pronunciation-for-japanese`; `b2` y `c1/pronunciation` (variación regional y registro) → `spanish-in-latin-america`. Antes, lo útil de cada una se lleva a la página de destino. `a1/pronunciation` no se toca: será la unidad 1.
4. **Hub DELE:** nuevo título y description orientados a 「DELEとは・レベル・難易度・日程」, tabla comparativa de los seis niveles con enlaces a cada guía y bloque 「DELEと西検の違い」 hacia `dele-vs-seiken`.
5. **Títulos y descriptions con CTR bajo:** `spanish-vs-japanese` (la búsqueda es 「難しい？」), `zipf-law-methodology` (título natural para un lector japonés: 「よく使う単語から覚える方法」), `pronunciation-for-japanese` (posición 10), `a2/vocabulary` y `b1/vocabulary`, y los hubs `a2` y `b2` (buena posición, poco clic).
6. **Escuelas:** `spanish-schools-in-japan` pasa a ser la página madre; cada ciudad enlaza a ella y a las otras ciudades.
7. **Medición previa:** eventos de Analytics que ya existen o hacen falta (`level_test_completed`, `line_clicked` con su origen, `newsletter_signup`) y vigilancia de que los duplicados antiguos (`spanish-grammar/verb-conjugation`, `lessons-tokyo`) desaparezcan de Search Console, porque ya tienen 301.

### Fase B. Preparar el lanzamiento mientras se generan los audios (en una rama, sin publicar)

> **Estado (10 de noviembre de 2026):** los puntos 9-15, 17, 18 y 19 están hechos en la rama `launch/curso-completo`, sin publicar. Diferencias con el texto del plan: en el punto 12, los resúmenes de gramática conservan sus tablas, ejemplos y miniejercicios (ya eran breves) y suman la tabla de unidades y un 「詳しくは」 por sección; en el punto 14, los planes de B2, C1 y C2 mantienen su enfoque de inmersión e indican las unidades de cada periodo. Pendiente: el punto 8 (audios) y la fase C.

8. **Audios:** generar en `audio-src/` las frases de las 57 unidades nuevas, las cinco existentes y las transcripciones de los seis simulacros (nivel gratuito, unas 130 peticiones). David los escucha, se comprimen con ffmpeg y se crea el reproductor (prompt 7).
9. **`/language/` reescrito como guía de 勉強法:** cómo empezar, comparación de formas de estudiar (curso gratis, escuela, app, estudiar en España), test de nivel arriba, 「続きから」 para quien ya tiene progreso, los seis niveles, herramientas, DELE, recursos y escuelas. Datos estructurados `CollectionPage` + `ItemList` + `BreadcrumbList`. Desaparecen las 36 STEP.
10. **`/language/learn-spanish/`:** hoja de ruta + curso. El título mantiene 「ロードマップ」 al principio y los H2 actuales; se añaden los seis niveles con sus 62 unidades y el progreso.
11. **Hubs de nivel (A1-C2):** qué sabrás hacer, sus 12 unidades con progreso, su guía DELE y su simulacro. Los de C1 y C2, hoy sin clics, ganan contenido con las unidades.
12. **Chuletas de gramática por nivel:** solo tablas resumen; cada punto enlaza a su unidad 「詳しくはユニットN」. Se quitan las explicaciones largas que repiten las unidades.
13. **Vocabulario por nivel:** se mantiene la lista; cada bloque enlaza a la unidad donde se practica.
14. **Planes de estudio por nivel:** se reescriben como calendario de unidades por semanas (A1: 12 unidades en 3 meses…) y enlazan a 学習設定.
15. **Subjuntivo:** unidad 25 = página canónica de 「接続法とは」; las 37, 49 y 57 llevan títulos claramente distintos (接続法過去, 高度な用法, 稀な形) y enlazan a la 25.
16. **Unidades existentes (1, 25, 37, 49 y 57):** se redactan a partir de su artículo, conservando lo que ya posiciona.
17. **Guías DELE:** cada guía de nivel enlaza a su hub de nivel y a su simulacro; `dele-self-study` presenta el curso como la ruta para preparar el DELE; la guía del oral enlaza a los seis simulacros.
18. **Recursos (学習リソース):** cada artículo se ancla a unidades concretas y termina con 「自分のレベルを確かめる」: `travel-phrases-spanish` → unidades A1 de Mina; `movies-series-spanish` → unidades por nivel; `listening-tips` → unidades con audio; `memorize-vocabulary` y `zipf` → el vocabulario por frecuencia del curso; `spanish-in-latin-america` → notas de Daniel; entrevistas → unidad 45 (registro formal).
19. **Test de nivel v2** (misma URL) — hecho el 9 de noviembre de 2026 en la rama `feat/level-test-v2` (`LevelTestCard.astro`). David decide publicarlo junto con el curso completo, en el PR de lanzamiento (aunque con el curso oculto el resultado ya enlazaría a la página del nivel y no a la unidad):
    - A1-C2 por bloques: el test se detiene cuando falla un nivel, para no alargarlo.
    - Partes de gramática, vocabulario y lectura; la de comprensión auditiva, cuando haya audio.
    - Resultado inmediato y gratis: nivel, puntos fuertes y débiles, y **「ユニットNから始めましょう」** con enlace a la unidad y a su hub de nivel.
    - Debajo, la tarjeta pequeña de LINE (punto 23) y, cuando exista, la opción de email (punto 26).
    - Se conservan el `pubDate`, el FAQ y los H2 que se puedan; el título deja de decir 「A1–B2」.
20. **Páginas de verbo y conjugador:** cada tiempo verbal enlaza a la unidad que lo enseña (ya preparado: bloque 「この動詞を学ぶユニット」).

### Fase C. Lanzamiento (un único PR, cuando estén los audios)

> **Estado (13 de noviembre de 2026):** audio completo (393 frases de las 62 unidades, aprobadas por David) y 8 pistas de 聴解 para los seis simulacros (ExamAudio, pendientes de su aprobación). En la rama `launch/curso-completo` (PR #629, con #631, #632, #641 y #642 integrados): las 62 unidades en `draft: false` (57 con `pubDate` del 13 de noviembre; las unidades 1, 25, 37, 49 y 57 conservan la fecha de su artículo) y retirados de `articles` sus cinco artículos (misma URL, ahora la sirve la unidad). Punto 22 hecho el 11 de noviembre. Punto 23: la tarjeta del test ya existía; se añaden `LineCard` en la primera ミニテスト aprobada (una sola vez) y en el conjugador y las páginas de verbo. Pendiente tras fusionar: punto 24 (inspección de URL y envío del sitemap en Search Console, David) y punto 25 (anuncio en redes).

> **Estado (11 de noviembre de 2026):** David confirma que el curso se publica cuando estén **todos** los audios. Hecha la revisión de anti-canibalización previa al lanzamiento (conjugador, resúmenes de gramática B1–C2 y enlaces cruzados; detalle en la sección «Anti-canibalización» de `curso-paso-a-paso.md`).
>
> **Qué desaparece del hub `/language/` al lanzar (sin borrar ninguna URL):** las seis rejillas por nivel (26 tarjetas) pasan a un único bloque 「スペイン語コース」 con los seis niveles y sus accesos (文法まとめ・単語・学習計画・DELE); las cuatro tarjetas de 接続法 pasan a ser las unidades 25, 37, 49 y 57 dentro de su nivel; las ocho tarjetas DELE pasan a la tarjeta del hub DELE y una lista; desaparecen las insignias STEP; los bloques de texto SEO del final se sustituyen por la comparativa de formas de estudiar y los cinco pasos. El hub pasa de unas 68 tarjetas a unas 20 más listas compactas.

21. Publicar las 62 unidades a la vez (`draft: false` con su `pubDate`), activar los bloques del curso y aplicar todo lo de la fase B.
22. Enlaces de anti-canibalización anotados en `curso-paso-a-paso.md` (conjugador → unidad 11, /c1/grammar/ → unidades 55 y 46…).
23. **Tarjeta de LINE** en tres sitios: resultado del test, primera minitest aprobada (una sola vez) y conjugador. Una por página, se cierra y no vuelve.
24. Sitemap actualizado, inspección de URL en Search Console de `/language/`, `/learn-spanish/`, `level-test` y un hub de nivel, y envío del sitemap.
25. Anuncio en Instagram, X y LINE (el curso no se anuncia antes, decisión de David).

### Fase D. Captura de email (justo después del lanzamiento)

26. **Ampliar `/api/subscribe` (Brevo ya integrado):** atributos `LEVEL`, `START_UNIT` y `SOURCE` (test, progreso, certificado, simulacro), doble confirmación (double opt-in) y casilla de consentimiento.
27. **Guardar el progreso con el email:** tras tres unidades completadas, 「学習記録を保存する」. El progreso se asocia al email y se recupera en otro dispositivo con un enlace de acceso enviado por correo (Cloudflare D1 o KV, sin contraseña).
28. **Certificado de nivel:** al aprobar la unidad de cierre, imagen 「A1 Acceso 修了」 con el nombre del alumno, descargable gratis; por email llega además el plan del nivel siguiente.
29. **Simulacros DELE en PDF** con soluciones, enviados por email.
30. **Secuencia de bienvenida en Brevo:** confirmación → informe del nivel con la unidad de inicio → cuatro semanas de plan semanal → recordatorios de repaso (1, 7 y 30 días) → avisos de contenido nuevo.
31. **Política de privacidad** actualizada (ley japonesa de protección de datos, APPI): qué se guarda (email, nivel, unidad, progreso), para qué y cómo darse de baja.

### Fase E. Retención: que vuelvan y se queden

32. **「続きから」** en `/language/`, `/learn-spanish/` y los hubs de nivel, a partir del progreso guardado.
33. **今日の復習:** test corto con preguntas de las unidades completadas hace 1, 7 y 30 días; **racha de estudio** sin mensajes negativos (prompt 5).
34. **Siguiente paso fijo** al final de cada unidad: siguiente unidad, repaso y, solo en momentos de logro, LINE o email.
35. **Puentes desde los pilares con más tráfico:** bloque 「この記事のスペイン語を学ぶ」 en los artículos de /football/, /food/ y /travel/ citados por las notas culturales de las unidades, y en `/football/spanish-vocabulary/` (41 clics). El fútbol trae el 46,6 % de los clics del sitio.
36. **Imagen de vista previa** de cada unidad al compartirla en LINE (ya hecho con las ilustraciones) y resultado de la minitest compartible.
37. **YouTube** (prompts del canal): el vídeo de cada unidad incrustado en ella y la descripción enlazando a la unidad.

### Fase F. Medición

38. **Referencia de partida:** 755 clics en tres meses; `/language/` en posición 21,6; CTR del hub DELE 0,3 %; `level-test` 44 clics.
39. **Indicadores del embudo:** tests completados, % que abre la unidad recomendada, minitests aprobadas por sesión, usuarios que vuelven en 7 días, altas en LINE por origen y altas de email por origen (meta final).
40. **Revisión mensual** con Search Console: posición de `/language/` y de los hubs de nivel, CTR del hub DELE, clics de las páginas protegidas y de las redirigidas.

## Lo que necesita a David

- Aprobar el mapa de intenciones y las redirecciones de los puntos 1-3.
- Escuchar y aprobar los audios (punto 8).
- Decidir cómo medir el origen de las altas en LINE (pendiente en `estrategia.md`).
- Aprobar las ofertas de email (progreso, certificado y simulacro en PDF) y el texto de la política de privacidad.
- Diseño de las plantillas de email en Brevo (o encargarlo).
