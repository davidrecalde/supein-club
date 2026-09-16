# Arquitectura SEO — supein.club

> Snapshot: 2026-09-16 (pillars food, football y culture actualizados;
> travel/living recibieron solo un fix de rutas compartido, sin cambio
> de contenido; language conserva el snapshot 2026-09-09 original — ver
> notas de cada sección). Los volúmenes de búsqueda son rangos redondeados
> del Keyword Planner de Google Ads. Tres fuentes, ninguna trackeada en
> git (viven sueltas en la raíz del repo):
> - `SupeinClub_Arquitectura_SEO.xlsx` — árbol maestro Nivel 1/2/3 por
>   keyword, fuente principal de este documento.
> - `supeinclub_50_articulos_SEO.docx` — plan editorial de 50 artículos
>   "basado en" el xlsx anterior; usado como confirmación secundaria.
> - `Keywords_Fútbol.csv` — único research dedicado al pillar football,
>   no cubierto por el xlsx maestro.
>
> No son cifras exactas ni en tiempo real — revisar periódicamente. Donde
> no existe research documentado, la celda dice explícitamente **N/D**,
> nunca una cifra inventada.
>
> Este inventario es el estado REAL construido (rutas verificadas contra
> `src/pages/` y las colecciones `articles`/`spain-map`), no el plan. Las
> tres fuentes usan **tres esquemas de slugs distintos entre sí y
> distintos del sitio real** (p. ej. el xlsx llama al pillar language
> `/spanish-language/`, el docx lo llama `/language/lessons/...`, el
> sitio real lo sirve en `/language/`). El cruce entre fuentes y URLs
> reales se hizo por **coincidencia de keyword/intención**, no de ruta.
> Donde hay divergencia relevante, se anota bajo la tabla del pillar.

## Por pillar: URLs reales vs. planificadas

### travel

| URL real | Estado | Keyword principal | Volumen (bucket) | Fuente del volumen |
|---|---|---|---|---|
| `/travel/` | publicado (hub) | スペイン 旅行 | 5k | xlsx (HOME) |
| `/travel/barcelona/` | publicado (listado de clúster, no artículo dedicado) | バルセロナ 観光 | 5k (nodo Nivel3 `/barcelona/`: 15k) | xlsx |
| `/travel/barcelona/barcelona-travel-guide/` | publicado (artículo) | — | N/D | N/D |
| `/travel/barcelona/sagrada-familia-guide/` | publicado (artículo) | — | N/D | N/D |
| `/travel/barcelona/sagrada-familia-jesus-tower-completed/` | publicado (artículo) | — | N/D | N/D |
| `/travel/madrid/` | publicado (listado de clúster, no artículo dedicado) | マドリード 観光 | 5k (nodo Nivel3 `/madrid/`: 15k) | xlsx |
| `/travel/madrid/madrid-travel-guide/` | publicado (artículo) | — | N/D | N/D |
| `/travel/spain-tours/` | publicado (listado de clúster, no artículo dedicado) | スペイン ツアー | **500k** (nodo `/tours/` ★: 515k) | xlsx + docx (ambos coinciden) — pilar obligatorio del plan, nunca se escribió como artículo dedicado |
| `/travel/spain-tours/budget-spain-tours/` | publicado (artículo) | — | N/D | N/D |
| `/travel/spain-tours/spain-tour-1week/` | publicado (artículo, con CRE Rankings) | — | N/D | N/D |
| `/travel/travel-cost/` | publicado (listado de clúster, no artículo dedicado) | スペイン 旅行 費用 | 5k (nodo Nivel3 `/travel-cost/`: 15k) | xlsx |
| `/travel/travel-cost/spain-budget-solo/` | publicado (artículo) | — | N/D | N/D |
| `/travel/andalusia/` | stub, sin contenido | アンダルシア 観光 | 5k (nodo Nivel3 `/andalusia/`: 15k) | xlsx |
| `/travel/best-season/` | stub, sin contenido | スペイン 旅行 ベストシーズン | 5k (nodo Nivel3 `/best-time-to-visit/`: 10k) | xlsx |
| `/travel/canarias/` | stub, sin contenido | — | N/D | N/D — no aparece en ninguna de las 3 fuentes |
| `/travel/ibiza/` | stub, sin contenido | スペイン イビサ 島 ★NEW | 500 (nodo Nivel3 `/ibiza/`: 1.5k) | xlsx |
| `/travel/itineraries/` | stub, sin contenido | スペイン 旅行 日程 | 5k (nodo Nivel3 `/itineraries/`: 15k) | xlsx |
| `/travel/spain-flights/` | stub, sin contenido | スペイン 航空券 | 5k (nodo Nivel3 `/flights/`: 15k) | xlsx |
| `/travel/spain-hotels/` | stub, sin contenido | スペイン ホテル | 5k (nodo Nivel3 `/hotels/`: 15k) | xlsx |
| `/travel/souvenirs/` | publicado (artículo, insignia) — 2026-09-16 | スペイン お土産 | 5k (nodo Nivel2 `/spanish-food/souvenirs/` ★NUEVA: 20k, originalmente planificado bajo food) | xlsx (reubicado) — artesanía y marcas por región (Lladró/Valencia, damasquinado/Toledo, abanicos/Sevilla, Loewe, Camper y Carmina/Mallorca, El Caganer/Cataluña) a partir del análisis de una revista escaneada. Sin `region` (multi-regional); `relatedFood` en Toledo, Sevilla, Valencia, Islas Baleares, Barcelona y Guipúzcoa. Sustituye y elimina el antiguo stub `/food/souvenirs/` — ver nota en la tabla food |

**Nota travel:** el nodo `/travel-spain/booking/` (★PRIORITARIA en el xlsx, 515k agregado) agrupa tours+vuelos+hoteles como intención transaccional — hoy repartido en 3 stubs vacíos (`spain-flights`, `spain-hotels`) más el clúster `spain-tours` con 2 artículos reales. Los 4 "pilares obligatorios" que el plan quería como artículos dedicados en `/travel/barcelona/`, `/travel/madrid/`, `/travel/spain-tours/`, `/travel/andalusia/` nunca se escribieron así — 3 de esas URLs sirven listados automáticos de clúster, y `andalusia` sigue vacío.

### food

| URL real | Estado | Keyword principal | Volumen (bucket) | Fuente del volumen |
|---|---|---|---|---|
| `/food/` | publicado (hub) | スペイン 料理 | 5k | xlsx (HOME) + docx — categorías reorganizadas 2026-09-16: 地方グルメルート (food-routes), 名物料理・食材ガイド (paella, jamon-iberico), スペインワイン (spanish-wine), バル・レストラン文化 (tapas, spain-bar-restaurant, spain-dining-times), グルメ語彙 (spanish-vocabulary). Antes solo existía 1 categoría y 13 de los 14 artículos caían en un cajón "その他"; ahora el cajón queda vacío. Al añadir un cluster nuevo, decidir si encaja en una categoría existente o necesita una nueva |
| `/food/food-routes/{7 rutas}/` | publicado (7 artículos) | — | N/D | N/D — keywords propios de esta sesión (combos región+plato), sin research de Keyword Planner. Enriquecidos 2026-09-16 con menciones a rabo de toro/Córdoba (`sur-fritos-flamenco`) y butifarra/zarzuela (`este-paella-tapas`), huecos detectados al analizar el informe de bar/restaurante |
| `/food/jamon-iberico/` | publicado (artículo, insignia) | ハモン・イベリコ | N/D | N/D — creado 2026-09-14 a partir de material promocional de ASICI (evento sectorial en Tokio); no aparece en xlsx/docx. `region: "extremadura"` en frontmatter → aparece en `/regions/extremadura/`; `relatedFood` en Cáceres y Badajoz → tarjeta relacionada en ambas páginas de provincia |
| `/food/paella/` | publicado (artículo, insignia) | パエリア | 5k (nodo Nivel3 `/paella/`: 15k) | xlsx — coincide con el nodo planificado, pero el ángulo real cubre historia+格付け+técnica+レシピ, más una sección de E-E-A-T sobre el jurado del concurso nacional de paella de Japón (no solo "レシピ" como decía el título del stub original). `region: "comunidad-valenciana"` → `/regions/comunidad-valenciana/`; `relatedFood` en Valencia |
| `/food/spanish-wine/` | publicado (artículo, insignia) | スペインワイン | 5k (nodo Nivel3 `/wine/`: 15k) | xlsx — historia, clasificación DO/DOCa/crianza, 11 regiones, turismo enológico. Sin `region` (multi-regional por naturaleza, ninguna de las 8 regiones de `/regions/` domina); `relatedFood` en La Rioja, Barcelona y Cádiz (sedes del turismo enológico cubierto) |
| `/food/tapas/` | publicado (artículo, insignia) | タパス とは（文化・使い方） | 5k (nodo Nivel3 `/tapas/`: 15k) | xlsx — **divergencia de ángulo**: el nodo planificado era "タパス レシピ" (recetas); el artículo real cubre cultura del tapeo, tapa/ración/pincho y una selección curada de 10 tapas, para no competir con el glosario exhaustivo de `spanish-vocabulary` |
| `/food/spain-bar-restaurant/` | publicado (artículo, insignia) | スペイン バル レストラン マナー | N/D | N/D — cluster nuevo, no existe en xlsx/docx/csv; nace del análisis de una revista escaneada (bar/restaurante, etiqueta). **No confundir con el hueco `spanish-bars` de la nota food de abajo** — ese es バル東京 (bares españoles EN Japón, intención local); este es la etiqueta de bares EN España (intención de viajero), sin solapamiento |
| `/food/spain-dining-times/` | publicado (artículo, insignia) | — | N/D | N/D |
| `/food/spanish-vocabulary/` | publicado (artículo, insignia) | — | N/D | N/D — ampliado 2026-09-16 de ~180 a ~200 términos (café, sumiller, mosto, calimocho, butifarra, zarzuela, etc.) |
| `/food/spain-map/` | publicado (hub bespoke, no colección `articles`) | スペイン 地図 / 県別レストラン (concepto interno de esta sesión) | N/D | N/D — sin Keyword Planner |
| `/food/spain-map/{53 provincias}/` | publicado (colección `spain-map`, 53 páginas) | ver caso especial abajo | N/D | N/D |
| `/food/spain-map/[province]/[article]/` | ruta preparada, **0 páginas generadas hoy** | — | — | — |
| `/food/japan-map/` | publicado (hub bespoke, no colección `articles`) | — | N/D | N/D |
| `/food/olive-oil/` | stub, sin contenido | スペイン オリーブオイル | 5k (nodo Nivel3 `/olive-oil/`: 10k) | xlsx |
| `/food/restaurants-osaka/` | stub, sin contenido | スペイン レストラン 大阪 | 5k (nodo Nivel3 `/osaka/`: 10k) | xlsx |
| `/food/restaurants-tokyo/` | stub, sin contenido | スペイン レストラン 東京 | 5k (nodo Nivel3 `/tokyo/`: 15k, incluye バル東京) | xlsx |
| `/food/souvenirs/` | **eliminado 2026-09-16** — ver `/travel/souvenirs/` | — | — | El xlsx lo situaba bajo food, pero David decidió que el contenido de souvenirs encaja mejor en travel (intención de compra/viaje, no gastronómica). El stub (sin contenido, noindex) se borró en vez de dejarlo huérfano; no había nada indexado que redirigir |

**Nota food:** el nodo `/restaurants-in-japan/` del xlsx incluye スペイン バル 東京 (5k) dentro del mismo total que レストラン東京 — el plan docx lo separaba en un satélite propio (`spanish-bars`) que nunca se construyó como stub independiente.

**Interlinking hub-and-spoke (food, 2026-09-16):** los artículos insignia recientes (`jamon-iberico`, `paella`, `spanish-wine`, `spain-bar-restaurant`, `tapas`) están enlazados entre sí y con los 7 `food-routes` en ambas direcciones, evitando duplicar contenido: cada insignia cubre el ángulo profundo/técnico de su tema, mientras que los `food-routes` mantienen su ángulo regional/de maridaje y enlazan de vuelta al insignia correspondiente para quien quiera profundizar. `spanish-vocabulary` funciona como glosario exhaustivo al que todos enlazan en vez de repetir listas de vocabulario.

**Asociación a provincia y a `/regions/` (mecanismo, no solo food):** dos piezas de datos independientes conectan un artículo con la geografía:
1. `region: "<slug>"` en el frontmatter del artículo (slugs en `src/config/regions.ts`) → el artículo aparece automáticamente en el bloque "料理" de `/regions/{slug}/`. Solo se define si el artículo tiene una región dominante clara (paella→comunidad-valenciana, jamón ibérico→extremadura); se deja sin definir si es multi-regional (spanish-wine).
2. `relatedFood: ["/food/..."]` en el frontmatter de una entrada de la colección `spain-map` → hace aparecer una tarjeta con título/descripción reales en `/food/spain-map/{provincia}/`, resuelta dinámicamente contra la colección `articles` en `ProvinceRelated.astro`. **Este mecanismo llevaba tiempo roto** (el prop se recibía pero nunca se renderizaba, por colisión entre el icono `Map` de lucide-astro y el `Map` nativo de JS) — corregido 2026-09-15.
Desde el 2026-09-15, toda creación de artículo de food pregunta explícitamente si debe vincularse a alguna provincia/región concreta (ver memoria de sesión `feedback_ask_province_linking`).

### language

| URL real | Estado | Keyword principal | Volumen (bucket) | Fuente del volumen |
|---|---|---|---|---|
| `/language/` | publicado (hub) | スペイン語 | 5k | xlsx (HOME) |
| `/language/learn-spanish/` | publicado (artículo, insignia) | スペイン語 勉強 | 5k (nodo Nivel2 `/learn-spanish/`: 25k) | xlsx + docx (única coincidencia exacta de ruta plan↔real entre las 3 fuentes) |
| `/language/learn-spanish/{A1–C2, DELE, guías}/` (52 páginas) | publicado (artículos) | — | **N/D — construido desde PCIC, no desde keyword research** | — |
| `/language/learn-spanish/dele-vs-seiken/` | publicado (artículo) | DELE 西検 違い / どちら | N/D | N/D — ver nota DELE abajo |
| `/language/learn-spanish/dele-oral-interview-guide/` | publicado (artículo) | DELE面接 / 口頭試験対策 | N/D | N/D — ver nota DELE abajo |
| `/language/learn-spanish/spanish-interview-questions-self-pr/` | publicado (artículo) | スペイン語面接 質問 / 自己PR | N/D | N/D — ver nota DELE abajo |
| `/language/learn-spanish/spanish-interview-practice/` | publicado (artículo) | スペイン語 模擬面接 | N/D | N/D — ver nota DELE abajo |
| `/language/learn-spanish/dele-difficulty-guide/` | publicado (artículo) | DELE 難易度 | N/D | N/D — ver nota DELE abajo |
| `/language/tokyo-spanish-schools/` | publicado (artículo, insignia) | スペイン語 教室 東京 | 5k (nodo Nivel3 `/schools-in-japan/`: 15k) | xlsx |
| `/language/osaka-spanish-schools/` | publicado (artículo) | 大阪 スペイン語 教室 | N/D | N/D — ranking CRE, no keyword research |
| `/language/yokohama-spanish-schools/` | publicado (artículo) | 横浜 スペイン語 教室 | N/D | N/D — ranking CRE, no keyword research |
| `/language/kyoto-spanish-schools/` | publicado (artículo) | 京都 スペイン語 教室 | N/D | N/D — ranking CRE, no keyword research |
| `/language/lesson-price/` | stub, sin contenido | スペイン語 レッスン 料金 | 5k (nodo Nivel3 `/pricing/`: 15k) | xlsx |
| `/language/online-lessons/` | stub, sin contenido | スペイン語 オンライン レッスン | 5k (nodo Nivel3 `/online-lessons/`: 15k) | xlsx |
| `/language/pronunciation/` | stub, sin contenido | スペイン語 発音 | 5k (nodo Nivel3 `/pronunciation/`: 15k) | xlsx (ruta exacta) |
| `/language/self-study/` | stub, sin contenido | スペイン語 独学 | 5k (nodo Nivel3 `/self-study/`: 15k) | xlsx |
| `/language/spanish-apps/` | stub, sin contenido | スペイン語 アプリ | 5k (nodo Nivel3 `/apps/`: 15k) | xlsx |
| `/language/spanish-books/` | stub, sin contenido | スペイン語 本 | 5k (nodo Nivel3 `/books/`: 15k) | xlsx |
| `/language/spanish-phrases/` | stub, sin contenido | スペイン語 フレーズ | 5k (nodo Nivel3 `/phrases/`: 15k, incluye 挨拶+旅行フレーズ) | xlsx |

**Nota DELE (silo面接/難易度, 2026-09-09):** `dele-vs-seiken`, `dele-oral-interview-guide`, `spanish-interview-questions-self-pr`, `spanish-interview-practice` y `dele-difficulty-guide` no vienen de ninguna de las 3 fuentes de este documento (xlsx/docx/csv) ni de PCIC — nacen de un análisis competitivo ad-hoc sobre Instituto Cervantes Tokio y de un listado de preguntas japonesas frecuentes en buscadores, ambos aportados fuera del flujo de Keyword Planner. Se enlazan entre sí y con `dele/index` para formar un silo interno sin solapar intención (examen DELE vs. entrevista de trabajo general vs. dónde practicar vs. dificultad por nivel). **`dele-difficulty-guide` reemplaza la idea original de un "hub de tasas de aprobación"**: se descartó tras verificar que ni el Instituto Cervantes ni el organismo del 西検 (公益財団法人日本スペイン協会) publican 合格率 oficiales por nivel — el artículo lo declara explícitamente en vez de estimar cifras. Por el mismo motivo, `dele-vs-seiken` tuvo sus cifras de precio (ya publicadas, no verificables) retiradas y sustituidas por enlaces a las webs oficiales.

### living

| URL real | Estado | Keyword principal | Volumen (bucket) | Fuente del volumen |
|---|---|---|---|---|
| `/living/` | publicado (hub) | スペイン 生活 | 5k | xlsx (HOME) |
| `/living/cervantes-webinar-experiencias-espana/` | publicado (artículo, insignia) | — | N/D | N/D |
| `/living/i-need-spain/{8 episodios}/` | publicado (artículos) | — | N/D | N/D — serie de entrevistas, no formaba parte de ningún plan de keywords |
| `/living/language-school/` | stub, sin contenido | スペイン 語学学校 | 5k (nodo Nivel3 `/language-schools/`: 15k) | xlsx |
| `/living/spain-visa/` | stub, sin contenido | スペイン ビザ | 5k (nodo Nivel2 `/visa/`: 15k) | xlsx |
| `/living/student-visa/` | stub, sin contenido | スペイン 学生ビザ | 5k (nodo Nivel3 `/student-visa/`: 15k) | xlsx |
| `/living/study-cost/` | stub, sin contenido | スペイン 留学 費用 | 5k (nodo Nivel3 `/cost/`: 15k) | xlsx |
| `/living/study-spain/` | stub, sin contenido | スペイン 留学 | 5k (nodo Nivel2 `/study/`: 20k) | xlsx |
| `/living/university/` | stub, sin contenido | スペイン 大学 | 5k (nodo Nivel3 `/universities/`: 15k) | xlsx |
| `/living/work-in-spain/` | stub, sin contenido | スペイン 就職 | 5k (nodo Nivel3 `/jobs/`: 15k) | xlsx |
| `/living/work-visa/` | stub, sin contenido | スペイン 就労ビザ | 5k (nodo Nivel3 `/work-visa/`: 15k) | xlsx |
| `/living/working-holiday/` | stub, sin contenido | スペイン ワーホリ | 5k (nodo Nivel3 `/working-holiday/`: 15k) | xlsx |

### culture

| URL real | Estado | Keyword principal | Volumen (bucket) | Fuente del volumen |
|---|---|---|---|---|
| `/culture/` | publicado (hub) | スペイン 文化 | 500 | xlsx (HOME) |
| `/culture/facts/` | stub, sin contenido | スペイン 基本情報 | 500 (nodo Nivel2 `/about-spain/facts/`: 1.5k) | xlsx |
| `/culture/flamenco/` | publicado (artículo, insignia) — 2026-09-16 | フラメンコ | 500 (dentro del nodo `/about-spain/culture/`: 1.5k) | xlsx — coincide con el nodo planificado, pero **el ángulo real es distinto al título SEO original del shell**: el shell prometía "東京で見られる公演情報・教室情報" (dónde verlo/aprenderlo en Tokio); el artículo real se centra en España (historia, 3 pilares cante/guitarra/baile, tablao vs. teatro, etiqueta de observación), por no disponer de fuente fiable sobre la oferta en Tokio — título/descripción del shell ajustados para no prometer ese ángulo. `region: "andalucia"`; `relatedFood` en Sevilla, Granada y Cádiz |
| `/culture/history/` | stub, sin contenido | スペイン 歴史 | 500 (nodo Nivel2 `/about-spain/history/`: 1k) | xlsx + docx |
| `/culture/traditions/` | publicado (artículo, insignia) — 2026-09-16 | スペインの祭り | 500 (nodo Nivel2 `/about-spain/traditions/`: 1.5k, incluye お祭り+トマティーナ) | xlsx — coincide con el nodo planificado. Calendario de 18 fiestas (Fallas, San Fermín, La Tomatina, etc.) a partir del análisis de una revista escaneada. Sin `region` (multi-regional); `relatedFood` en las 17 provincias directamente implicadas (guipuzcoa, cadiz, santa-cruz-de-tenerife, valencia, alicante, cordoba, madrid, toledo, granada, navarra, la-coruna, malaga, la-rioja, barcelona, zaragoza, sevilla, cuenca) |

**Culture pasa de 0 a 2 páginas publicadas (2026-09-16)** — `/culture/traditions/` y `/culture/flamenco/` son los dos primeros artículos reales del pillar; `facts` e `history` siguen siendo stubs. Es también el pillar de menor volumen agregado de las 3 fuentes (~3k total vs. 500k+ de travel/football) — coherente con ser contenido de refuerzo de marca, no de captación.

**Guardrail a futuro (`/culture/history/`):** `traditions.mdx` menciona de pasada una recreación histórica (Moros y Cristianos) y `flamenco.mdx` cubre su propia historia (origen s. XV, cafés cantantes, etc.) sin invadir el terreno de una futura guía general de historia de España. Cuando `/culture/history/` se desarrolle, mantener esas menciones existentes breves y enlazar hacia él en vez de profundizar ahí.

**Estudio de canibalización previo a `flamenco.mdx` (2026-09-16):** de las 13 menciones de "flamenco" en el sitio, ninguna era un desarrollo real — factor de precio/reserva en 4 artículos de `travel` (madrid-travel-guide, spain-tour-1week, budget-spain-tours, spain-budget-solo), FAQ práctica de `spain-map/sevilla`, ejemplo cultural suelto en 2 artículos de `language`, y color de entrevista en 3 artículos de `living` (incluida una sección propia en `chizuyo-in-sevilla.mdx` sobre japonesas que aprenden flamenco en Sevilla — angle de comunidad, no informativo). Se añadieron enlaces recíprocos hacia `flamenco.mdx` en todos esos puntos en vez de expandirlos ahí.

**Estudio de canibalización previo a `traditions.mdx` (2026-09-16):** de las 18 fiestas, 6 ya tenían alguna mención en el sitio (Fallas en `spain-map/valencia` FAQ + `budget-spain-tours` + una entrevista de `living`; Feria de Abril en `spain-map/sevilla` FAQ + `spain-tour-1week`; San Fermín y Semana Santa en `budget-spain-tours`/`spain-tour-1week`/`spanish-vocabulary`). Ninguna era un desarrollo real — todas eran factor de precio, aviso logístico, anécdota personal o contexto de vocabulario. Se añadieron enlaces recíprocos hacia `traditions.mdx` en esos puntos en vez de expandirlos ahí, dejando a `traditions.mdx` como único dueño de la intención informativa "qué es / cuándo es / qué pasa" para cada fiesta.

**Bug de rutas corregido en el mismo cambio:** los catch-all `[cluster]/[article]` de `culture`, `living` y `travel` no excluían los artículos insignia (slug === cluster) — el mismo bug ya corregido antes en `food` y `language`. En `culture` y `travel` era latente (sin insignia activo aún); en `living` **era un duplicado real en producción** (`/living/cervantes-webinar-experiencias-espana/cervantes-webinar-experiencias-espana/`), aunque ya mitigado con una lista hardcodeada — se generalizó al mismo patrón genérico `article !== cluster` que usan food/language.

**`ProvinceRelated.astro` generalizado:** el campo `relatedFood` resolvía solo contra artículos del pillar `food`; ahora resuelve contra toda la colección `articles` (cualquier pillar), con icono por pillar (`food`→UtensilsCrossed, `culture`→PartyPopper, resto→BookOpen) — necesario para que las tarjetas de provincia puedan enlazar a `/culture/traditions/`.

### football

| URL real | Estado | Keyword principal | Volumen (bucket) | Fuente del volumen |
|---|---|---|---|---|
| `/football/` | publicado (hub) | スペイン サッカー | 50k (150k agregando 2 KW secundarias) | `Keywords_Fútbol.csv` |
| `/football/el-clasico/` | publicado (artículo, insignia) | レアル マドリード バルセロナ | 5k (nodo: 22k) | `Keywords_Fútbol.csv` |
| `/football/fcbarcelona/` | publicado (artículo, insignia) | fc バルセロナ | 500k (nodo: 566k) | `Keywords_Fútbol.csv` |
| `/football/real-madrid/` | publicado (artículo, insignia) | レアル マドリード リーグ | 5k (nodo: 15k) | `Keywords_Fútbol.csv` |
| `/football/la-liga/` | publicado (artículo, insignia) | ラ リーガ | 500k (nodo: 505.5k) | `Keywords_Fútbol.csv` |
| `/football/spain-national-team/` | publicado (artículo, insignia) | スペイン 代表 | 500k (nodo: 555.5k) | `Keywords_Fútbol.csv` |
| `/football/japan-vs-spain/` | publicado (artículo, insignia) ★prioritaria en el plan | スペイン 日本 サッカー | 5k (nodo: 6k) | `Keywords_Fútbol.csv` |
| `/football/laliga-master/` | publicado (artículo, insignia) | サッカー 大学 | 5k (nodo: 10k) | `Keywords_Fútbol.csv` |
| `/football/spanish-vocabulary/` | publicado (artículo, insignia) | スペイン 語 サッカー 用語 | 500 (nodo: 2k) | `Keywords_Fútbol.csv` (bajo el nombre plan `spanish-football-terms`) |
| `/football/ferran-torres/` | publicado (artículo, insignia) | — | N/D | N/D — no aparece en `Keywords_Fútbol.csv` |
| `/football/japanese-players-laliga/` | publicado (artículo, insignia) | — | N/D | N/D |
| `/football/liga-f-women/` | publicado (artículo, insignia) | — | N/D | N/D |
| `/football/valencia-cf/` | publicado (artículo, insignia) | — | N/D | N/D |
| `/football/world-cup-2026/` | publicado (artículo, insignia) | — | N/D | N/D |
| `/football/football-coach-license/` | publicado (artículo, insignia) | — | N/D | N/D |
| `/football/lamine-yamal/` | publicado (artículo, insignia) | — | N/D | N/D |

**Football es el único pillar sin stubs** — los 15 clústeres tienen artículo publicado. También es el único pillar **ausente por completo del xlsx maestro** (que solo cubre language/travel/living/food/culture) — su research vive aparte en `Keywords_Fútbol.csv`, y solo cubre 9 de los 15 artículos reales; el resto se creó sin research documentado.

**Ampliación 2026-09-16 — sección "現地観戦ガイド" de `/football/la-liga/`:** a partir del análisis de una guía turística escaneada (`Escaneo/informe_completo_LaLiga.md`), se amplió esta sección (antes 3 párrafos breves) con: cómo comprar entrada (web oficial/taquilla/agencia-hotel), compra de merchandising antes del día del partido, logística del día (llegar con tiempo, comida limitada dentro del estadio, equipaje mínimo, ropa según clima) y etiqueta/seguridad (evitar colores del rival, respetar a la afición local). **Datos del informe descartados por obsoletos y NO usados**: lista de 20 clubes de temporada 2023-24 (el artículo ya tenía la lista real 2026-27), aforos de Bernabéu/Camp Nou (~75k/~98k en el informe vs. ~83.186 actual y ~62.600→105.000 en obras, ya documentados correctamente en `real-madrid.mdx` y `fcbarcelona.mdx`), y el rango de precios €20-170. Ningún artículo nuevo — el hueco era de profundidad dentro de una sección ya existente con la misma intención de búsqueda, no de cobertura ausente.

### Páginas de conversión planificadas — nunca construidas

El xlsx maestro define un nodo `/services/` explícitamente marcado "SEO対象外" (no compite por keywords propias, recibe tráfico desde los clusters informativos): `/services/spanish-lessons/`, `/services/travel-consulting/`, `/services/study-abroad-support/`. **Ninguna de las tres existe en el sitio real** — no hay ningún `src/pages/services/` hoy. Anotado aquí para que no se pierda de vista si se retoma esa capa de conversión.

## Casos especiales a documentar explícitamente

**`/food/spain-map/[province]/` — colección aparte, no artículos.** Vive en la colección `spain-map` (`src/content/spain-map/`, schema propio en `content/config.ts`), no en `articles`. 53 páginas. Confirmado archivo por archivo (ver `barcelona.mdx` como referencia completa): **no contienen nombres de restaurantes ni negocios concretos** — es overview editorial genérico (platos típicos, barrios, FAQ) más un botón de salida (`ProvinceMapEmbed.astro`, `<a href={mapUrl} target="_blank">`, **no es un iframe embebido**) hacia un mapa de Google Maps que el copy del propio sitio describe como "curado por スペイン倶楽部" — 5 de las 53 provincias (madrid, barcelona, sevilla, valencia, pais-vasco) son guías editoriales completas creadas el 2026-05-24 en una sesión anterior con Claude; las otras 48 son entradas ligeras creadas el 2026-09-07 en esta sesión. **Diferénciar claramente esta página de cualquier futura página de rankings de restaurantes reales** (el artefacto CRE — `<CRECard>`, ver sección CRECard de `CLAUDE.md` — sí muestra negocios con nombre, rating y reseñas; `spain-map` no).

**`/travel/barcelona/` vs `/food/spain-map/barcelona/`** (y el mismo patrón para cualquier otra ciudad): mismo nombre de ciudad, dos pillars distintos con intención distinta — `travel` = turismo/qué visitar/sitios; `food` = dónde comer. **Nunca fusionar ni compartir keyword principal entre ambos.**

**Deuda técnica conocida:** `author: supeinclub-henshubu` en las 53 entradas de `spain-map` referencia un autor que **no existe** en `src/content/authors/` (verificado: no hay ningún archivo con ese slug). Inofensivo hoy porque `ProvinceGuideLayout.astro` nunca llama a `entry.data.author` para renderizarlo — pero pendiente de limpiar (apuntar a `david-recalde`, el autor real usado en el resto del pillar food) la próxima vez que se toque `spain-map`.

## Mantenimiento

Este archivo se actualiza en el mismo commit que crea o mueve contenido
real — no es un plan aparte que se pueda desincronizar. Antes de crear
cualquier URL nueva, consúltalo primero para evitar duplicar intención de
búsqueda con algo que ya existe.
