// Sesión de Gemini TTS compartida por los scripts de pistas sueltas (simulacros, test de nivel):
// cuota diaria, ritmo de peticiones y cuenta de gasto en audio-src/manifest.json, como el curso.
// La clave se lee de GEMINI_API_KEY y nunca se imprime.
//
// Una pista es { speakers: { Nombre: claveDeVoz }, direction, lines: [[Nombre, texto], …] }
// (dos voces como máximo, con las voces fijas de docs/language/tts-voices.json).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createPacer, estimateTokens, isBillingError, overBudget, recordSpend, spentJpy, usageOf, yen } from './billing.mjs';

const MANIFEST = 'audio-src/manifest.json';

export const loadVoices = () => JSON.parse(readFileSync('docs/language/tts-voices.json', 'utf8'));

/** Problemas de una pista: voces sin asignar, claves inexistentes o más de dos voces. */
export function trackProblems(t, config) {
  const problems = [];
  for (const [who] of t.lines) if (!t.speakers[who]) problems.push(`${t.id}: «${who}» no tiene voz asignada.`);
  for (const key of Object.values(t.speakers)) if (!config.speakers[key]?.voice) problems.push(`${t.id}: la clave de voz «${key}» no existe.`);
  if (Object.keys(t.speakers).length > 2) problems.push(`${t.id}: más de dos voces en una pista.`);
  return problems;
}

export function createSession(config) {
  const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : { days: {}, items: {} };
  const saveManifest = () => writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  const quotaDay = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date());
  const usedToday = () => manifest.days[quotaDay()] ?? 0;
  const limit = config.quota.maxRequestsPerDay - config.quota.reservePerDay;
  const spentAtStart = spentJpy(manifest);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let pacer;

  const status = () => `cuota: ${usedToday()} de ${limit} (día del Pacífico ${quotaDay()}) · gasto estimado: ${yen(spentJpy(manifest))} de ${yen(config.billing.maxSpendJpy)}`;
  const describe = (t) => Object.entries(t.speakers).map(([n, k]) => `${n} (${config.speakers[k].voice})`).join(' + ');

  /** Motivo para no lanzar otra petición (cuota del día o tope de gasto), o null. */
  function stopReason() {
    if (usedToday() >= limit) return 'Cuota de hoy agotada: se sigue en la próxima ejecución.';
    if (overBudget(manifest, config.billing)) return `Tope de gasto: ${yen(spentJpy(manifest))} estimados. El proceso se detiene.`;
    return null;
  }

  async function synthesize(t) {
    const KEY = process.env.GEMINI_API_KEY;
    if (!KEY) throw Object.assign(new Error('Falta la variable de entorno GEMINI_API_KEY.'), { quota: true });
    pacer ??= createPacer(config.quota);
    const names = Object.keys(t.speakers);
    const profile = names.map((n) => `${n}: ${config.speakers[t.speakers[n]].profile}`).join('\n') + `\nDirección de esta escena: ${t.direction}`;
    const transcript = names.length > 1 ? t.lines.map(([s, l]) => `${s}: ${l}`).join('\n') : t.lines.map(([, l]) => l).join('\n\n');
    const text = config.promptTemplate.text.replace('{profile}', profile).replace('{transcript}', transcript);
    const voice = (n) => ({ prebuiltVoiceConfig: { voiceName: config.speakers[t.speakers[n]].voice } });
    const speechConfig = names.length > 1
      ? { multiSpeakerVoiceConfig: { speakerVoiceConfigs: names.map((n) => ({ speaker: n, voiceConfig: voice(n) })) } }
      : { voiceConfig: voice(names[0]) };
    const body = { contents: [{ role: 'user', parts: [{ text }] }], generationConfig: { temperature: config.temperature, responseModalities: ['AUDIO'], speechConfig } };
    for (let attempt = 1; attempt <= 4; attempt++) {
      await pacer.wait(estimateTokens(text));
      manifest.days[quotaDay()] = usedToday() + 1;
      saveManifest();
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': KEY }, body: JSON.stringify(body) });
      if (res.ok) {
        const data = await res.json();
        const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
        if (!part) {
          if (attempt < 4) { console.log(`  sin audio (finishReason: ${data.candidates?.[0]?.finishReason ?? '—'}): reintento ${attempt} de 3`); continue; }
          throw new Error('La respuesta no trae audio.');
        }
        const rate = Number(part.inlineData.mimeType.match(/rate=(\d+)/)?.[1] ?? 24000);
        const pcm = Buffer.from(part.inlineData.data, 'base64');
        const usage = usageOf(data, pcm.length / 2 / rate, config.billing);
        pacer.record(usage.input);
        recordSpend(manifest, config.billing, quotaDay(), usage);
        saveManifest();
        return { pcm, rate };
      }
      const detail = await res.text();
      if (res.status === 429) throw Object.assign(new Error('Aviso de cuota (429): el proceso se detiene.'), { quota: true });
      if (isBillingError(res.status, detail)) throw Object.assign(new Error(`Aviso de facturación (${res.status}): el proceso se detiene. Revisa el saldo de prepago en AI Studio.`), { quota: true });
      if (res.status >= 500) { console.log(`  ${res.status}: reintento ${attempt} de 3`); await sleep(attempt * 30_000); continue; }
      throw new Error(`Error ${res.status}: ${detail.slice(0, 300)}`);
    }
    throw new Error('Demasiados reintentos.');
  }

  const summary = () => `Gasto estimado: ${yen(spentJpy(manifest) - spentAtStart)} en esta ejecución · ${yen(spentJpy(manifest))} acumulados de ${yen(config.billing.maxSpendJpy)}.`;

  return { status, describe, stopReason, synthesize, summary };
}
