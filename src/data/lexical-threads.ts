// src/data/lexical-threads.ts
// Fuente de verificación de frecuencia: Davies, M. — A Frequency Dictionary of
// Spanish: Core Vocabulary for Learners (Routledge), basado en el Corpus del
// Español (20M palabras, oral+escrito, España e Hispanoamérica).
// Nota: "coger" se descartó a propósito por su connotación vulgar en varios
// países de Hispanoamérica — se usa "tomar" en su lugar, y esa distinción
// regional puede mencionarse como nota útil dentro del propio hilo.
export const lexicalThreads = {
  poner: {
    a1: { use: "objeto físico", example: "Pongo el libro en la mesa.", link: "/language/learn-spanish/a1/vocabulary/#poner" },
    b1: { use: "cambio de estado", example: "Se puso nervioso.", link: "/language/learn-spanish/b1/vocabulary/#poner" },
    b2: { use: "argumentativo", example: "Pongo en duda ese dato.", link: "/language/learn-spanish/b2/vocabulary/#poner" },
    c1: { use: "culto/formal", example: "Puso de manifiesto sus intenciones.", link: "/language/learn-spanish/c1/vocabulary/#poner" },
  },
  tener: {
    a1: { use: "posesión", example: "Tengo un libro.", link: "/language/learn-spanish/a1/vocabulary/#tener" },
    b1: { use: "obligación", example: "Tengo que estudiar.", link: "/language/learn-spanish/b1/vocabulary/#tener" },
    b2: { use: "expresión fija argumentativa", example: "Hay que tener en cuenta el contexto.", link: "/language/learn-spanish/b2/vocabulary/#tener" },
    c1: { use: "culto/formal", example: "El comité tuvo a bien aceptar la propuesta.", link: "/language/learn-spanish/c1/vocabulary/#tener" },
  },
  dar: {
    a1: { use: "objeto físico", example: "Te doy el libro.", link: "/language/learn-spanish/a1/vocabulary/#dar" },
    b1: { use: "expresión fija cotidiana", example: "Dimos un paseo por el parque.", link: "/language/learn-spanish/b1/vocabulary/#dar" },
    b2: { use: "reflexivo/idiomático", example: "Me di cuenta del error.", link: "/language/learn-spanish/b2/vocabulary/#dar" },
    c1: { use: "culto/formal", example: "Damos por sentado que asistirá.", link: "/language/learn-spanish/c1/vocabulary/#dar" },
  },
  hacer: {
    a1: { use: "acción cotidiana", example: "Hago la cama.", link: "/language/learn-spanish/a1/vocabulary/#hacer" },
    b1: { use: "expresión temporal", example: "Hace dos años que vivo aquí.", link: "/language/learn-spanish/b1/vocabulary/#hacer" },
    b2: { use: "expresión fija argumentativa", example: "No le hagas caso.", link: "/language/learn-spanish/b2/vocabulary/#hacer" },
    c1: { use: "culto/formal", example: "El informe hace hincapié en los riesgos.", link: "/language/learn-spanish/c1/vocabulary/#hacer" },
  },
  quedar: {
    a1: { use: "quedar con alguien (cita)", example: "Quedamos a las cinco.", link: "/language/learn-spanish/a1/vocabulary/#quedar" },
    b1: { use: "resultado de un cambio", example: "Se quedó sorprendido.", link: "/language/learn-spanish/b1/vocabulary/#quedar" },
    b2: { use: "impresión social", example: "Quedó muy bien con los invitados.", link: "/language/learn-spanish/b2/vocabulary/#quedar" },
    c1: { use: "culto/formal", example: "Su intención quedó patente desde el principio.", link: "/language/learn-spanish/c1/vocabulary/#quedar" },
  },
  echar: {
    a1: { use: "objeto físico (verter)", example: "Echa la sal en la sopa.", link: "/language/learn-spanish/a1/vocabulary/#echar" },
    b1: { use: "expresión fija emocional", example: "La echo de menos.", link: "/language/learn-spanish/b1/vocabulary/#echar" },
    b2: { use: "expresión fija idiomática", example: "Le echaron la culpa a él.", link: "/language/learn-spanish/b2/vocabulary/#echar" },
    c1: { use: "culto/formal", example: "La crisis echó por tierra sus planes.", link: "/language/learn-spanish/c1/vocabulary/#echar" },
  },
  tomar: {
    a1: { use: "transporte", example: "Tomo el autobús.", link: "/language/learn-spanish/a1/vocabulary/#tomar" },
    b1: { use: "rutina cotidiana", example: "Tomo un café por la mañana.", link: "/language/learn-spanish/b1/vocabulary/#tomar" },
    b2: { use: "expresión fija formal", example: "Tomó la palabra en la reunión.", link: "/language/learn-spanish/b2/vocabulary/#tomar" },
    c1: { use: "culto/formal (registro institucional)", example: "El gobierno tomó cartas en el asunto.", link: "/language/learn-spanish/c1/vocabulary/#tomar" },
  },
  llevar: {
    a1: { use: "vestimenta", example: "Llevo una chaqueta azul.", link: "/language/learn-spanish/a1/vocabulary/#llevar" },
    b1: { use: "expresión temporal", example: "Llevo dos años en Japón.", link: "/language/learn-spanish/b1/vocabulary/#llevar" },
    b2: { use: "expresión fija de gestión", example: "El proyecto se llevó a cabo sin problemas.", link: "/language/learn-spanish/b2/vocabulary/#llevar" },
    c1: { use: "culto/formal (figurado)", example: "La empresa lleva la delantera en el sector.", link: "/language/learn-spanish/c1/vocabulary/#llevar" },
  },
  pasar: {
    a1: { use: "suceso general", example: "¿Qué pasa?", link: "/language/learn-spanish/a1/vocabulary/#pasar" },
    b1: { use: "expresión fija cotidiana", example: "Lo pasamos muy bien en la fiesta.", link: "/language/learn-spanish/b1/vocabulary/#pasar" },
    b2: { use: "expresión fija argumentativa", example: "Prefiero pasar por alto ese comentario.", link: "/language/learn-spanish/b2/vocabulary/#pasar" },
    c1: { use: "culto/formal (figurado)", example: "Los años de estrés acabaron pasando factura.", link: "/language/learn-spanish/c1/vocabulary/#pasar" },
  },
  dejar: {
    a1: { use: "objeto físico", example: "Dejo el libro aquí.", link: "/language/learn-spanish/a1/vocabulary/#dejar" },
    b1: { use: "cese de una acción", example: "Dejé de fumar el año pasado.", link: "/language/learn-spanish/b1/vocabulary/#dejar" },
    b2: { use: "expresión fija argumentativa", example: "El director dejó claro su postura.", link: "/language/learn-spanish/b2/vocabulary/#dejar" },
    c1: { use: "culto/formal (registro notarial)", example: "El notario dejó constancia del acuerdo.", link: "/language/learn-spanish/c1/vocabulary/#dejar" },
  },
  aunque: {
    a2: { use: "concesión de un hecho real (+ indicativo)", example: "Aunque llueve, voy a salir.", link: "/language/learn-spanish/a2/grammar/#aunque" },
    b1: { use: "concesión de una hipótesis (+ subjuntivo)", example: "Aunque llueva, voy a salir.", link: "/language/learn-spanish/b1/grammar/#aunque" },
    b2: { use: "registro formal equivalente", example: "Pese a que llueva, saldré.", link: "/language/learn-spanish/b2/grammar/#aunque" },
    c1: { use: "matiz culto avanzado", example: "Si bien es cierto que llueve, no dejaré de salir.", link: "/language/learn-spanish/c1/grammar/#aunque" },
  },
};
