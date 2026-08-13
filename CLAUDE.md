# CLAUDE.md

Convenciones para trabajar en este repo con Claude Code.

## Disciplina de Pull Requests

- Antes de crear cualquier rama o PR nuevo, ejecuta `gh pr list --state open`
  y repórtalo. Si ya existe un PR abierto relacionado con la misma tarea o
  archivo, indícalo explícitamente antes de crear uno nuevo — no dupliques
  trabajo en una rama distinta.
- Un PR abierto sin actividad reciente (varios turnos de conversación sin
  mención) debe reportarse proactivamente al retomar el trabajo en este
  repo, no darse por sobreentendido como resuelto.
- Nunca asumas que un PR se fusionó porque el trabajo se completó — el
  merge es una confirmación explícita separada, y siempre la pide David
  antes de ejecutar `gh pr merge`.

## Integridad de datos al leer archivos

Cuando se necesite relayar contenido de un archivo (especialmente reseñas,
texto largo, o cualquier dato citado textualmente) a otra persona o proceso,
usa un volcado directo (`cat`, `head`, lectura literal) — nunca un resumen o
reformateo intermedio "legible". Un resumen intermedio puede perder
fragmentos de texto en medio de una cadena larga sin ningún aviso, incluso
cuando los campos numéricos llegan intactos. Si hay cualquier duda sobre si
un texto llegó completo, compararlo contra el archivo fuente antes de darlo
por bueno.

## Componente CRE Ranking (`<CRECard>`)

Para insertar un ranking CRE en un artículo, usar siempre `<CRECard>`
(`src/components/CRECard.astro`) — nunca una tabla markdown como sustituto.
Solo funciona en archivos `.mdx` (requiere `import CRECard from
'.../components/CRECard.astro'`, ajustando el nº de `../` a la profundidad
real del archivo respecto a `src/components/`).

Props / CREItem:

```typescript
interface CREItem {
  position: number; name: string; nameJa: string; url: string; mapsUrl: string;
  criScore: number; criLevel: string;  // observado: "高" — "中"/"低" sin confirmar
  rating: number; reviewCount: number; description: string;
  dimensions: { reputacion: number; volumen: number; sentimiento: number; perfil_gmb: number; visibilidad: number; };
  reviews: Array<{ rating: number; text: string; date: string }>;
}
interface Props {
  items: CREItem[]; title?: string; date?: string; location?: string; tocHeading?: boolean;
}
```

Mapeo desde un export CRE crudo: `dimensions.perfilGMB`/GMB → `perfil_gmb`
(snake_case, no camelCase); `userRatingCount` → `reviewCount`;
`googleMapsUri` → `mapsUrl`; `position` se genera al ordenar (1, 2, 3…);
`nameJa` se redacta (no viene en el export); `criLevel` se deriva de
`criScore` — verificar umbrales reales antes de asumir "高"/"中"/"低".

Datos siempre inline en `items` (sin archivo externo). Cada `<CRECard>`
inyecta su propio JSON-LD, fuera del `@graph` central del artículo. Un
artículo puede tener varias invocaciones (una por ciudad/sección). Ya en uso
en `spain-tour-1week.mdx` y `tokyo-spanish-schools.mdx` — consultarlos como
ejemplo real de invocación si hace falta.

## Verificar un despliegue después de fusionar

No asumir que un merge a `main` ya está en producción por cómo se ve la web
en el navegador inmediatamente después — la propagación de caché puede
tardar varios minutos y dar falsos negativos. Para confirmar un despliegue
real: (1) `git log --oneline -5 origin/main` para confirmar que el commit de
merge existe, (2) el dashboard de Cloudflare Pages (Deployments → producción)
para confirmar que ese commit específico está desplegado y con estado
Success. Ambos juntos, no uno solo.

## Confirmar la rama antes de commitear

Antes de cualquier `git commit` o `git push`, confirmar explícitamente con
`git branch --show-current` que se está en la rama esperada — especialmente
al terminar una tarea en una rama de feature y pasar a un cambio no
relacionado (como documentación o configuración). No dar por hecho que el
working tree está en la rama correcta solo porque la tarea anterior lo
dejó ahí.

## Flujo sin navegador (GitHub)

Todo el ciclo de push → PR → preview → merge se hace desde la terminal:
- Crear rama, commit y push: `git` normal.
- Abrir PR: `gh pr create`.
- Obtener el link de preview de Cloudflare: `gh pr view <n> --comments`
  (o `gh api`), nunca abriendo la página del PR en el navegador.
- David revisa el contenido abriendo directamente el link de preview
  (Cloudflare, no GitHub).
- Confirmación de merge: David lo aprueba en el chat/terminal, no en un
  botón de la web de GitHub.
- Fusionar: `gh pr merge`.

No es necesario abrir github.com en el navegador en ningún punto de este
flujo — solo el preview de Cloudflare, cuando corresponda revisar contenido.
