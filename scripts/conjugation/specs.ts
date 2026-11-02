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
];

/** Modelos de la tabla rápida de la página central (no tienen página propia en este lote). */
export const MODEL_SPECS: VerbSpec[] = [{ infinitive: 'hablar' }, { infinitive: 'comer' }, { infinitive: 'vivir' }];
