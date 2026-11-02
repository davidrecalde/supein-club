// node --test scripts/conjugation/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { conjugate, regularOf, syllables, PERSONS, type Conjugation, type TenseId, type VerbSpec } from './engine.ts';
import { MODEL_SPECS, VERB_SPECS } from './specs.ts';

const byInf = new Map<string, Conjugation>([...VERB_SPECS, ...MODEL_SPECS].map((s) => [s.infinitive, conjugate(s)]));
const v = (inf: string) => byInf.get(inf) ?? conjugate({ infinitive: inf });
const forms = (inf: string, tense: TenseId) => v(inf).tenses[tense];

test('modelos regulares -ar/-er/-ir', () => {
  assert.deepEqual(forms('hablar', 'presente'), ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan']);
  assert.deepEqual(forms('comer', 'presente'), ['como', 'comes', 'come', 'comemos', 'coméis', 'comen']);
  assert.deepEqual(forms('vivir', 'presente'), ['vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven']);
  assert.deepEqual(forms('hablar', 'preterito-indefinido'), ['hablé', 'hablaste', 'habló', 'hablamos', 'hablasteis', 'hablaron']);
  assert.deepEqual(forms('comer', 'preterito-indefinido'), ['comí', 'comiste', 'comió', 'comimos', 'comisteis', 'comieron']);
  assert.deepEqual(forms('hablar', 'preterito-imperfecto'), ['hablaba', 'hablabas', 'hablaba', 'hablábamos', 'hablabais', 'hablaban']);
  assert.deepEqual(forms('vivir', 'preterito-imperfecto'), ['vivía', 'vivías', 'vivía', 'vivíamos', 'vivíais', 'vivían']);
  assert.deepEqual(forms('comer', 'futuro'), ['comeré', 'comerás', 'comerá', 'comeremos', 'comeréis', 'comerán']);
  assert.deepEqual(forms('vivir', 'condicional'), ['viviría', 'vivirías', 'viviría', 'viviríamos', 'viviríais', 'vivirían']);
  assert.deepEqual(forms('hablar', 'subjuntivo-presente'), ['hable', 'hables', 'hable', 'hablemos', 'habléis', 'hablen']);
  assert.deepEqual(forms('comer', 'subjuntivo-imperfecto-ra'), ['comiera', 'comieras', 'comiera', 'comiéramos', 'comierais', 'comieran']);
  assert.deepEqual(forms('hablar', 'subjuntivo-imperfecto-se'), ['hablase', 'hablases', 'hablase', 'hablásemos', 'hablaseis', 'hablasen']);
  assert.deepEqual(forms('hablar', 'imperativo-afirmativo'), [null, 'habla', 'hable', 'hablemos', 'hablad', 'hablen']);
  assert.deepEqual(forms('comer', 'imperativo-negativo'), [null, 'no comas', 'no coma', 'no comamos', 'no comáis', 'no coman']);
  assert.equal(v('vivir').gerund, 'viviendo');
  assert.equal(v('comer').participle, 'comido');
});

test('tiempos compuestos con haber', () => {
  assert.deepEqual(forms('hablar', 'preterito-perfecto'), ['he hablado', 'has hablado', 'ha hablado', 'hemos hablado', 'habéis hablado', 'han hablado']);
  assert.equal(forms('hacer', 'pluscuamperfecto')[0], 'había hecho');
  assert.equal(forms('decir', 'futuro-perfecto')[2], 'habrá dicho');
  assert.equal(forms('ver', 'condicional-perfecto')[3], 'habríamos visto');
  assert.equal(forms('ser', 'subjuntivo-perfecto')[0], 'haya sido');
  assert.equal(forms('tener', 'subjuntivo-pluscuamperfecto')[5], 'hubieran tenido');
});

test('los 10 primeros verbos: formas clave', () => {
  assert.deepEqual(forms('ser', 'presente'), ['soy', 'eres', 'es', 'somos', 'sois', 'son']);
  assert.deepEqual(forms('ser', 'preterito-indefinido'), forms('ir', 'preterito-indefinido'));
  assert.equal(forms('ser', 'imperativo-afirmativo')[1], 'sé');
  assert.deepEqual(forms('haber', 'presente'), ['he', 'has', 'ha', 'hemos', 'habéis', 'han']);
  assert.deepEqual(forms('haber', 'preterito-indefinido'), ['hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron']);
  assert.deepEqual(forms('estar', 'preterito-indefinido'), ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron']);
  assert.deepEqual(forms('tener', 'presente'), ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen']);
  assert.deepEqual(forms('tener', 'subjuntivo-presente'), ['tenga', 'tengas', 'tenga', 'tengamos', 'tengáis', 'tengan']);
  assert.deepEqual(forms('tener', 'futuro'), ['tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán']);
  assert.deepEqual(forms('hacer', 'preterito-indefinido'), ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron']);
  assert.deepEqual(forms('poder', 'presente'), ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden']);
  assert.deepEqual(forms('poder', 'subjuntivo-presente'), ['pueda', 'puedas', 'pueda', 'podamos', 'podáis', 'puedan']);
  assert.deepEqual(forms('decir', 'presente'), ['digo', 'dices', 'dice', 'decimos', 'decís', 'dicen']);
  assert.deepEqual(forms('decir', 'preterito-indefinido'), ['dije', 'dijiste', 'dijo', 'dijimos', 'dijisteis', 'dijeron']);
  assert.equal(v('decir').gerund, 'diciendo');
  assert.deepEqual(forms('ir', 'imperativo-afirmativo'), [null, 've', 'vaya', 'vamos', 'id', 'vayan']);
  assert.deepEqual(forms('ver', 'presente'), ['veo', 'ves', 've', 'vemos', 'veis', 'ven']);
  assert.deepEqual(forms('ver', 'subjuntivo-presente'), ['vea', 'veas', 'vea', 'veamos', 'veáis', 'vean']);
  assert.deepEqual(forms('dar', 'presente'), ['doy', 'das', 'da', 'damos', 'dais', 'dan']);
  assert.deepEqual(forms('dar', 'subjuntivo-imperfecto-ra'), ['diera', 'dieras', 'diera', 'diéramos', 'dierais', 'dieran']);
  assert.deepEqual(forms('dar', 'imperativo-afirmativo'), [null, 'da', 'dé', 'demos', 'dad', 'den']);
  const imperativeTu = Object.fromEntries(['tener', 'hacer', 'decir', 'ir', 'ser', 'estar'].map((i) => [i, forms(i, 'imperativo-afirmativo')[1]]));
  assert.deepEqual(imperativeTu, { tener: 'ten', hacer: 'haz', decir: 'di', ir: 've', ser: 'sé', estar: 'está' });
  assert.deepEqual([v('hacer').participle, v('decir').participle, v('ver').participle, v('ir').gerund, v('poder').gerund], ['hecho', 'dicho', 'visto', 'yendo', 'pudiendo']);
});

test('tildes: monosílabos sin tilde, salvo las diacríticas', () => {
  for (const [inf, tense, i, expected] of [
    ['dar', 'preterito-indefinido', 0, 'di'], ['dar', 'preterito-indefinido', 2, 'dio'],
    ['ver', 'preterito-indefinido', 0, 'vi'], ['ver', 'preterito-indefinido', 2, 'vio'],
    ['ser', 'preterito-indefinido', 2, 'fue'], ['dar', 'presente', 4, 'dais'], ['ir', 'presente', 4, 'vais'],
    ['dar', 'subjuntivo-presente', 0, 'dé'], ['dar', 'subjuntivo-presente', 4, 'deis'],
  ] as const) {
    assert.equal(forms(inf, tense)[i], expected, `${inf} ${tense} ${i}`);
  }
  // Pretéritos fuertes: sin tilde en yo y él.
  for (const inf of ['tener', 'estar', 'poder', 'hacer', 'decir', 'haber']) {
    const p = forms(inf, 'preterito-indefinido');
    assert.ok(!/[áéíóú]/.test(p[0]! + p[2]!), `${inf}: ${p[0]}, ${p[2]}`);
  }
  assert.equal(syllables('veis'), 1);
  assert.equal(syllables('leí'), 2);
  assert.equal(syllables('sigue'), 2);
});

test('reglas generales (verbos del segundo lote)', () => {
  const c = (spec: VerbSpec) => conjugate(spec);
  assert.deepEqual(c({ infinitive: 'buscar' }).tenses['preterito-indefinido'].slice(0, 3), ['busqué', 'buscaste', 'buscó']);
  assert.equal(c({ infinitive: 'llegar' }).tenses['subjuntivo-presente'][0], 'llegue');
  const empezar = c({ infinitive: 'empezar', stemChange: 'e>ie' });
  assert.deepEqual([empezar.tenses.presente[0], empezar.tenses['preterito-indefinido'][0], empezar.tenses['subjuntivo-presente'][0], empezar.tenses['subjuntivo-presente'][3]], ['empiezo', 'empecé', 'empiece', 'empecemos']);
  const pensar = c({ infinitive: 'pensar', stemChange: 'e>ie' });
  assert.deepEqual(pensar.tenses.presente, ['pienso', 'piensas', 'piensa', 'pensamos', 'pensáis', 'piensan']);
  const pedir = c({ infinitive: 'pedir', stemChange: 'e>i' });
  assert.deepEqual([pedir.tenses['preterito-indefinido'][2], pedir.tenses['subjuntivo-presente'][3], pedir.gerund], ['pidió', 'pidamos', 'pidiendo']);
  const sentir = c({ infinitive: 'sentir', stemChange: 'e>ie' });
  assert.deepEqual([sentir.tenses.presente[0], sentir.tenses['preterito-indefinido'][5], sentir.tenses['subjuntivo-presente'][3]], ['siento', 'sintieron', 'sintamos']);
  const seguir = c({ infinitive: 'seguir', stemChange: 'e>i' });
  assert.deepEqual([seguir.tenses.presente[0], seguir.tenses.presente[1], seguir.tenses['subjuntivo-presente'][0], seguir.tenses['subjuntivo-presente'][3], seguir.gerund], ['sigo', 'sigues', 'siga', 'sigamos', 'siguiendo']);
  const leer = c({ infinitive: 'leer' });
  assert.deepEqual([...leer.tenses['preterito-indefinido'], leer.gerund, leer.participle], ['leí', 'leíste', 'leyó', 'leímos', 'leísteis', 'leyeron', 'leyendo', 'leído']);
  const conocer = c({ infinitive: 'conocer', yo: 'conozco' });
  assert.deepEqual([conocer.tenses.presente[0], conocer.tenses['subjuntivo-presente'][3]], ['conozco', 'conozcamos']);
});

test('todas las formas generadas: solo letras del español y como mucho una tilde por palabra', () => {
  for (const conj of byInf.values()) {
    for (const [tense, list] of Object.entries(conj.tenses)) {
      assert.equal(list.length, PERSONS.length, `${conj.infinitive} ${tense}`);
      for (const form of list) {
        if (form === null) continue;
        for (const word of form.split(' ')) {
          assert.match(word, /^[a-záéíóúüñ]+$/, `${conj.infinitive} ${tense}: ${form}`);
          assert.ok((word.match(/[áéíóú]/g) ?? []).length <= 1, `${conj.infinitive} ${tense}: ${form}`);
        }
      }
    }
  }
});

test('regularOf marca como irregular lo que se aparta de la regla', () => {
  const reg = regularOf('tener');
  assert.notEqual(reg.tenses.presente[0], 'tengo');
  assert.equal(reg.tenses.presente[3], 'tenemos');
});
