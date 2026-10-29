export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.searchParams.has('amp')) {
    url.searchParams.delete('amp');
    return Response.redirect(url.toString(), 301);
  }

  // URLs antiguas /food/spain-map-{provincia}/{articulo}/ (con guion) de antes
  // de anidar las subpáginas de ranking bajo /food/spain-map/{provincia}/.
  // Antes esto vivía como 156 reglas estáticas en public/_redirects (52
  // provincias x 3 subpáginas), pero Cloudflare Pages solo honraba las
  // primeras ~105 reglas de ese archivo en este proyecto — muy por debajo
  // del límite documentado — así que la mayoría de provincias devolvían 404.
  // Resuelto aquí con una única regex, sin límite de reglas.
  const spainMapMatch = url.pathname.match(/^\/food\/spain-map-([a-z-]+)\/([a-z-]+)\/?$/);
  if (spainMapMatch) {
    const [, province, article] = spainMapMatch;
    return Response.redirect(`${url.origin}/food/spain-map/${province}/${article}/`, 301);
  }

  return context.next();
}
