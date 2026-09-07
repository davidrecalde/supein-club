# Arquitectura SEO — supein.club

> Snapshot: 2026-09-08. Los volúmenes de búsqueda son rangos redondeados
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

**Nota travel:** el nodo `/travel-spain/booking/` (★PRIORITARIA en el xlsx, 515k agregado) agrupa tours+vuelos+hoteles como intención transaccional — hoy repartido en 3 stubs vacíos (`spain-flights`, `spain-hotels`) más el clúster `spain-tours` con 2 artículos reales. Los 4 "pilares obligatorios" que el plan quería como artículos dedicados en `/travel/barcelona/`, `/travel/madrid/`, `/travel/spain-tours/`, `/travel/andalusia/` nunca se escribieron así — 3 de esas URLs sirven listados automáticos de clúster, y `andalusia` sigue vacío.

### food

| URL real | Estado | Keyword principal | Volumen (bucket) | Fuente del volumen |
|---|---|---|---|---|
| `/food/` | publicado (hub) | スペイン 料理 | 5k | xlsx (HOME) + docx |
| `/food/food-routes/{7 rutas}/` | publicado (7 artículos) | — | N/D | N/D — keywords propios de esta sesión (combos región+plato), sin research de Keyword Planner |
| `/food/spain-dining-times/` | publicado (artículo, insignia) | — | N/D | N/D |
| `/food/spanish-vocabulary/` | publicado (artículo, insignia) | — | N/D | N/D |
| `/food/spain-map/` | publicado (hub bespoke, no colección `articles`) | スペイン 地図 / 県別レストラン (concepto interno de esta sesión) | N/D | N/D — sin Keyword Planner |
| `/food/spain-map/{53 provincias}/` | publicado (colección `spain-map`, 53 páginas) | ver caso especial abajo | N/D | N/D |
| `/food/spain-map/[province]/[article]/` | ruta preparada, **0 páginas generadas hoy** | — | — | — |
| `/food/japan-map/` | publicado (hub bespoke, no colección `articles`) | — | N/D | N/D |
| `/food/olive-oil/` | stub, sin contenido | スペイン オリーブオイル | 5k (nodo Nivel3 `/olive-oil/`: 10k) | xlsx |
| `/food/paella/` | stub, sin contenido | パエリア レシピ | 5k (nodo Nivel3 `/paella/`: 15k) | xlsx |
| `/food/restaurants-osaka/` | stub, sin contenido | スペイン レストラン 大阪 | 5k (nodo Nivel3 `/osaka/`: 10k) | xlsx |
| `/food/restaurants-tokyo/` | stub, sin contenido | スペイン レストラン 東京 | 5k (nodo Nivel3 `/tokyo/`: 15k, incluye バル東京) | xlsx |
| `/food/souvenirs/` | stub, sin contenido | スペイン お土産 | 5k (nodo Nivel2 `/spanish-food/souvenirs/` ★NUEVA: 20k) | xlsx |
| `/food/spanish-wine/` | stub, sin contenido | スペイン ワイン | 5k (nodo Nivel3 `/wine/`: 15k) | xlsx |
| `/food/tapas/` | stub, sin contenido | タパス レシピ | 5k (nodo Nivel3 `/tapas/`: 15k) | xlsx |

**Nota food:** el nodo `/restaurants-in-japan/` del xlsx incluye スペイン バル 東京 (5k) dentro del mismo total que レストラン東京 — el plan docx lo separaba en un satélite propio (`spanish-bars`) que nunca se construyó como stub independiente.

### language

| URL real | Estado | Keyword principal | Volumen (bucket) | Fuente del volumen |
|---|---|---|---|---|
| `/language/` | publicado (hub) | スペイン語 | 5k | xlsx (HOME) |
| `/language/learn-spanish/` | publicado (artículo, insignia) | スペイン語 勉強 | 5k (nodo Nivel2 `/learn-spanish/`: 25k) | xlsx + docx (única coincidencia exacta de ruta plan↔real entre las 3 fuentes) |
| `/language/learn-spanish/{A1–C2, DELE, guías}/` (52 páginas restantes) | publicado (artículos) | — | **N/D — construido desde PCIC, no desde keyword research** | — |
| `/language/tokyo-spanish-schools/` | publicado (artículo, insignia) | スペイン語 教室 東京 | 5k (nodo Nivel3 `/schools-in-japan/`: 15k) | xlsx |
| `/language/lesson-price/` | stub, sin contenido | スペイン語 レッスン 料金 | 5k (nodo Nivel3 `/pricing/`: 15k) | xlsx |
| `/language/online-lessons/` | stub, sin contenido | スペイン語 オンライン レッスン | 5k (nodo Nivel3 `/online-lessons/`: 15k) | xlsx |
| `/language/pronunciation/` | stub, sin contenido | スペイン語 発音 | 5k (nodo Nivel3 `/pronunciation/`: 15k) | xlsx (ruta exacta) |
| `/language/self-study/` | stub, sin contenido | スペイン語 独学 | 5k (nodo Nivel3 `/self-study/`: 15k) | xlsx |
| `/language/spanish-apps/` | stub, sin contenido | スペイン語 アプリ | 5k (nodo Nivel3 `/apps/`: 15k) | xlsx |
| `/language/spanish-books/` | stub, sin contenido | スペイン語 本 | 5k (nodo Nivel3 `/books/`: 15k) | xlsx |
| `/language/spanish-phrases/` | stub, sin contenido | スペイン語 フレーズ | 5k (nodo Nivel3 `/phrases/`: 15k, incluye 挨拶+旅行フレーズ) | xlsx |

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
| `/culture/flamenco/` | stub, sin contenido | スペイン フラメンコ | 500 (dentro del nodo `/about-spain/culture/`: 1.5k) | xlsx — el keyword específico es "フラメンコ" genérico, no "フラメンコ 東京" (ese es un ángulo distinto, ver football/docx) |
| `/culture/history/` | stub, sin contenido | スペイン 歴史 | 500 (nodo Nivel2 `/about-spain/history/`: 1k) | xlsx + docx |
| `/culture/traditions/` | stub, sin contenido | スペイン 伝統 | 500 (nodo Nivel2 `/about-spain/traditions/`: 1.5k, incluye お祭り+トマティーナ) | xlsx |

**Culture es el único pillar con 0 páginas publicadas hoy** — los 4 stubs son toda su presencia actual. Es también el pillar de menor volumen agregado de las 3 fuentes (~3k total vs. 500k+ de travel/football) — coherente con ser contenido de refuerzo de marca, no de captación.

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
