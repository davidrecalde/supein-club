// Los 50 verbos básicos del conjugador (selección de David Recalde, 2026-11-02),
// con su puesto real en el diccionario de frecuencias del CORPES XXI (RAE):
//   rank      = puesto entre los verbos (categoría V), por frecuencia absoluta
//   lemmaRank = columna «Rango frec.» (puesto entre todos los lemas)
// Ordenados por rank. La selección no es el top 50 del CORPES: ese top incluye
// verbos de prensa (realizar, señalar, considerar…) que no son prioritarios
// para empezar. Calculado del TSV local (src/data/diccionario_frecuencias_corpes_alfa.tsv).
export const FREQUENCY_SOURCE = {
  label: 'Real Academia Española『CORPES XXI 頻度辞典』（Diccionario de frecuencias del CORPES XXI、CC BY-SA 4.0）',
  url: 'https://www.rae.es/banco-de-datos/corpes-xxi',
};

export const VERB_RANKING: Array<{ rank: number; lemmaRank: number; infinitive: string; meaning: string }> = [
  { rank: 1, lemmaRank: 8, infinitive: 'ser', meaning: '〜である' },
  { rank: 2, lemmaRank: 18, infinitive: 'tener', meaning: '持つ' },
  { rank: 3, lemmaRank: 19, infinitive: 'estar', meaning: '〜にいる・〜の状態である' },
  { rank: 4, lemmaRank: 21, infinitive: 'poder', meaning: '〜できる' },
  { rank: 5, lemmaRank: 23, infinitive: 'hacer', meaning: 'する・作る' },
  { rank: 6, lemmaRank: 31, infinitive: 'haber', meaning: '（完了形の助動詞）／ある（hay）' },
  { rank: 7, lemmaRank: 33, infinitive: 'decir', meaning: '言う' },
  { rank: 8, lemmaRank: 44, infinitive: 'dar', meaning: '与える' },
  { rank: 9, lemmaRank: 46, infinitive: 'ir', meaning: '行く' },
  { rank: 10, lemmaRank: 49, infinitive: 'deber', meaning: '〜しなければならない' },
  { rank: 11, lemmaRank: 61, infinitive: 'ver', meaning: '見る・会う' },
  { rank: 12, lemmaRank: 68, infinitive: 'llegar', meaning: '着く' },
  { rank: 13, lemmaRank: 70, infinitive: 'pasar', meaning: '過ごす・起こる・通る' },
  { rank: 14, lemmaRank: 81, infinitive: 'querer', meaning: '欲しい・愛する' },
  { rank: 15, lemmaRank: 83, infinitive: 'encontrar', meaning: '見つける' },
  { rank: 16, lemmaRank: 84, infinitive: 'seguir', meaning: '続ける・従う' },
  { rank: 17, lemmaRank: 88, infinitive: 'llevar', meaning: '持っていく・身につける' },
  { rank: 19, lemmaRank: 100, infinitive: 'saber', meaning: '知っている' },
  { rank: 20, lemmaRank: 104, infinitive: 'dejar', meaning: '置いていく・〜させる' },
  { rank: 22, lemmaRank: 120, infinitive: 'contar', meaning: '数える・話す' },
  { rank: 23, lemmaRank: 123, infinitive: 'tratar', meaning: '扱う・〜しようとする' },
  { rank: 25, lemmaRank: 125, infinitive: 'poner', meaning: '置く' },
  { rank: 26, lemmaRank: 130, infinitive: 'conocer', meaning: '（人・場所を）知っている' },
  { rank: 27, lemmaRank: 131, infinitive: 'quedar', meaning: '残る・待ち合わせる' },
  { rank: 29, lemmaRank: 153, infinitive: 'tomar', meaning: '取る・飲む' },
  { rank: 31, lemmaRank: 159, infinitive: 'trabajar', meaning: '働く' },
  { rank: 32, lemmaRank: 161, infinitive: 'creer', meaning: '信じる・思う' },
  { rank: 33, lemmaRank: 162, infinitive: 'hablar', meaning: '話す' },
  { rank: 35, lemmaRank: 168, infinitive: 'parecer', meaning: '〜のように見える' },
  { rank: 37, lemmaRank: 176, infinitive: 'existir', meaning: '存在する' },
  { rank: 38, lemmaRank: 178, infinitive: 'recibir', meaning: '受け取る' },
  { rank: 39, lemmaRank: 179, infinitive: 'buscar', meaning: '探す' },
  { rank: 41, lemmaRank: 188, infinitive: 'vivir', meaning: '住む・生きる' },
  { rank: 43, lemmaRank: 190, infinitive: 'esperar', meaning: '待つ・期待する' },
  { rank: 44, lemmaRank: 192, infinitive: 'llamar', meaning: '呼ぶ・電話する' },
  { rank: 45, lemmaRank: 199, infinitive: 'salir', meaning: '出る・出かける' },
  { rank: 46, lemmaRank: 204, infinitive: 'volver', meaning: '戻る' },
  { rank: 48, lemmaRank: 213, infinitive: 'pensar', meaning: '考える' },
  { rank: 51, lemmaRank: 224, infinitive: 'venir', meaning: '来る' },
  { rank: 52, lemmaRank: 229, infinitive: 'producir', meaning: '生産する・引き起こす' },
  { rank: 61, lemmaRank: 266, infinitive: 'perder', meaning: '失う・負ける' },
  { rank: 62, lemmaRank: 270, infinitive: 'recordar', meaning: '覚えている・思い出す' },
  { rank: 63, lemmaRank: 275, infinitive: 'sentir', meaning: '感じる' },
  { rank: 64, lemmaRank: 282, infinitive: 'empezar', meaning: '始める・始まる' },
  { rank: 65, lemmaRank: 286, infinitive: 'pedir', meaning: '頼む・注文する' },
  { rank: 67, lemmaRank: 305, infinitive: 'escribir', meaning: '書く' },
  { rank: 85, lemmaRank: 375, infinitive: 'ocurrir', meaning: '起こる' },
  { rank: 92, lemmaRank: 396, infinitive: 'entender', meaning: '理解する' },
  { rank: 95, lemmaRank: 405, infinitive: 'entrar', meaning: '入る' },
  { rank: 189, lemmaRank: 849, infinitive: 'mirar', meaning: '見る・眺める' },
];

// Verbos del campo `verbs` de las unidades que no están entre los 50 (decisión de David,
// 10 de noviembre de 2026): tienen página propia y se citan aparte, debajo de la lista de 50.
// Mismo cálculo de puestos con el TSV del CORPES XXI.
export const COURSE_EXTRA_VERBS: Array<{ rank: number; lemmaRank: number; infinitive: string; meaning: string }> = [
  { rank: 102, lemmaRank: 455, infinitive: 'acabar', meaning: '終える・終わる' },
  { rank: 113, lemmaRank: 519, infinitive: 'gustar', meaning: '好きである（〜が気に入る）' },
  { rank: 216, lemmaRank: 1015, infinitive: 'comer', meaning: '食べる' },
];

export const RANK_BY_VERB = new Map([...VERB_RANKING, ...COURSE_EXTRA_VERBS].map((v) => [v.infinitive, v]));
