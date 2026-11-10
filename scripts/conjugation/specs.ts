// Especificación de cada verbo para el motor (engine.ts). Lo que el motor
// resuelve por reglas no se repite aquí; los overrides son la "tabla manual
// de irregulares" que revisa un nativo contra el DLE.
import { HABER_SPEC, type VerbSpec } from './engine.ts';

/** Verbos con página propia en /language/learn-spanish/verb-conjugation/<verbo>/ (primer lote: los 10 más frecuentes). */
export const VERB_SPECS: VerbSpec[] = [
  {
    infinitive: 'ser',
    imperativeTu: 'sé',
    overrides: {
      presente: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
      'preterito-indefinido': ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
      'preterito-imperfecto': ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
      'subjuntivo-presente': ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean'],
    },
  },
  HABER_SPEC,
  {
    infinitive: 'estar',
    preteriteStem: 'estuv',
    imperativeTu: 'está',
    overrides: {
      presente: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
      'subjuntivo-presente': ['esté', 'estés', 'esté', 'estemos', 'estéis', 'estén'],
    },
  },
  { infinitive: 'tener', yo: 'tengo', stemChange: 'e>ie', preteriteStem: 'tuv', futureStem: 'tendr', imperativeTu: 'ten' },
  { infinitive: 'hacer', yo: 'hago', preteriteStem: 'hic', futureStem: 'har', participle: 'hecho', imperativeTu: 'haz' },
  { infinitive: 'poder', stemChange: 'o>ue', preteriteStem: 'pud', futureStem: 'podr', gerund: 'pudiendo' },
  { infinitive: 'decir', yo: 'digo', stemChange: 'e>i', preteriteStem: 'dij', futureStem: 'dir', participle: 'dicho', imperativeTu: 'di' },
  {
    infinitive: 'ir',
    imperativeTu: 've',
    gerund: 'yendo',
    overrides: {
      presente: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
      'preterito-indefinido': ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
      'preterito-imperfecto': ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
      'subjuntivo-presente': ['vaya', 'vayas', 'vaya', 'vayamos', 'vayáis', 'vayan'],
      // Afirmativo de nosotros: «vamos» (la RAE admite también «vayamos», menos usado).
      'imperativo-afirmativo': [undefined, undefined, undefined, 'vamos', undefined, undefined],
    },
  },
  {
    infinitive: 'ver',
    participle: 'visto',
    overrides: {
      presente: ['veo', undefined, undefined, undefined, 'veis', undefined],
      'preterito-indefinido': ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
      'preterito-imperfecto': ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'],
    },
  },
  {
    infinitive: 'dar',
    overrides: {
      presente: ['doy', undefined, undefined, undefined, undefined, undefined],
      'preterito-indefinido': ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
      'subjuntivo-presente': ['dé', 'des', 'dé', 'demos', 'deis', 'den'],
    },
  },
  // Segundo lote (40 verbos, 10 de noviembre de 2026). Revisado por David el mismo día (CSV de irregulares sin pendientes).
  { infinitive: 'deber' },
  { infinitive: 'llegar' },
  { infinitive: 'pasar' },
  { infinitive: 'querer', stemChange: 'e>ie', preteriteStem: 'quis', futureStem: 'querr' },
  { infinitive: 'encontrar', stemChange: 'o>ue' },
  { infinitive: 'seguir', stemChange: 'e>i' },
  { infinitive: 'llevar' },
  {
    infinitive: 'saber',
    yo: 'sé',
    preteriteStem: 'sup',
    futureStem: 'sabr',
    overrides: { 'subjuntivo-presente': ['sepa', 'sepas', 'sepa', 'sepamos', 'sepáis', 'sepan'] },
  },
  { infinitive: 'dejar' },
  { infinitive: 'contar', stemChange: 'o>ue' },
  { infinitive: 'tratar' },
  { infinitive: 'poner', yo: 'pongo', preteriteStem: 'pus', futureStem: 'pondr', participle: 'puesto', imperativeTu: 'pon' },
  { infinitive: 'conocer', yo: 'conozco' },
  { infinitive: 'quedar' },
  { infinitive: 'tomar' },
  { infinitive: 'trabajar' },
  { infinitive: 'creer' },
  { infinitive: 'hablar' },
  { infinitive: 'parecer', yo: 'parezco' },
  { infinitive: 'existir' },
  { infinitive: 'recibir' },
  { infinitive: 'buscar' },
  { infinitive: 'vivir' },
  { infinitive: 'esperar' },
  { infinitive: 'llamar' },
  { infinitive: 'salir', yo: 'salgo', futureStem: 'saldr', imperativeTu: 'sal' },
  { infinitive: 'volver', stemChange: 'o>ue', participle: 'vuelto' },
  { infinitive: 'pensar', stemChange: 'e>ie' },
  { infinitive: 'venir', yo: 'vengo', stemChange: 'e>ie', preteriteStem: 'vin', futureStem: 'vendr', imperativeTu: 'ven' },
  { infinitive: 'producir', yo: 'produzco', preteriteStem: 'produj' },
  { infinitive: 'perder', stemChange: 'e>ie' },
  { infinitive: 'recordar', stemChange: 'o>ue' },
  { infinitive: 'sentir', stemChange: 'e>ie' },
  { infinitive: 'empezar', stemChange: 'e>ie' },
  { infinitive: 'pedir', stemChange: 'e>i' },
  { infinitive: 'escribir', participle: 'escrito' },
  { infinitive: 'ocurrir' },
  { infinitive: 'entender', stemChange: 'e>ie' },
  { infinitive: 'entrar' },
  { infinitive: 'mirar' },
  // Verbos de las unidades fuera de los 50 (decisión de David, 10 de noviembre de 2026).
  { infinitive: 'acabar' },
  { infinitive: 'gustar' },
  { infinitive: 'comer' },
];

/** Modelos de la tabla rápida de la página central (no tienen página propia en este lote). */
export const MODEL_SPECS: VerbSpec[] = [{ infinitive: 'hablar' }, { infinitive: 'comer' }, { infinitive: 'vivir' }];
