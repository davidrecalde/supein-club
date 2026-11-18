// Selecciones de los hubs /travel/ y /culture/ que salen de GA4 (propiedad 539731698) y se
// actualizan a mano cada pocos meses. Ids de la colección `articles`, sin extensión.

/** 「よく読まれている記事」 de /travel/: vistas de los 90 días hasta el 17 de noviembre de 2026. */
export const TRAVEL_TOP = {
  updated: '2026-11-17',
  ids: [
    'travel/souvenirs/souvenirs',
    'travel/barcelona/sagrada-familia-guide',
    'travel/spain-tours/budget-spain-tours',
    'travel/barcelona/sagrada-familia-facades-towers',
    'travel/barcelona/barcelona',
  ],
};

/** 「いちばん長く読まれている記事」 de /culture/: más tiempo de lectura por usuario en los mismos 90 días. */
export const CULTURE_PICK = 'culture/zarzuela/zarzuela';
