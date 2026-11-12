// Ritmo y gasto de Gemini TTS en el Nivel 1 de pago (docs/language/tts-voices.json → quota y billing).
// Lo usan scripts/tts/generate.mjs (curso) y el script de los episodios de YouTube.
//
// El tope real es el saldo de prepago de AI Studio: cuando se acaba, Gemini deja de responder.
// Además, cada respuesta trae sus tokens (usageMetadata); con ellos se lleva una estimación
// prudente del gasto en audio-src/manifest.json → spend, y los scripts se detienen antes de
// llegar a billing.maxSpendJpy. La cifra exacta es la de AI Studio.

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Tokens de entrada estimados por lo alto: 1 token por cada 3 bytes UTF-8
// (en japonés, 1 por carácter; en español, 1 por cada 3 letras).
export const estimateTokens = (text) => Math.ceil(Buffer.byteLength(text, 'utf8') / 3);

// Respeta el intervalo mínimo entre peticiones y los tokens de entrada por minuto (ventana de 60 s, al 90 %).
export function createPacer(quota) {
  let last = 0;
  const window = []; // [instante, tokens de entrada]
  const limit = (quota.maxInputTokensPerMinute ?? Infinity) * 0.9;
  return {
    async wait(estimated) {
      for (;;) {
        const now = Date.now();
        while (window.length && now - window[0][0] >= 60_000) window.shift();
        const used = window.reduce((n, [, t]) => n + t, 0);
        const gap = last + quota.minIntervalSeconds * 1000 - now;
        const tokenWait = window.length && used + estimated > limit ? window[0][0] + 60_000 - now : 0;
        if (gap <= 0 && tokenWait <= 0) break;
        await sleep(Math.max(gap, tokenWait, 250));
      }
      last = Date.now();
      window.push([last, estimated]);
    },
    // Sustituye la estimación de la última petición por los tokens reales.
    record(tokens) {
      if (window.length && tokens) window[window.length - 1][1] = tokens;
    },
  };
}

// Tokens de una respuesta; si no trae los de salida, se calculan por la duración del audio.
export function usageOf(data, seconds, billing) {
  const u = data.usageMetadata ?? {};
  return { input: u.promptTokenCount ?? 0, output: u.candidatesTokenCount ?? Math.round(seconds * billing.audioTokensPerSecond) };
}

export const costJpy = (billing, { input, output }) =>
  ((input * billing.usdPerMillionInputTokens + output * billing.usdPerMillionOutputTokens) / 1e6) * billing.jpyPerUsd * (1 + billing.taxRate);

const blank = () => ({ requests: 0, inputTokens: 0, outputTokens: 0, jpy: 0 });

export function recordSpend(manifest, billing, day, usage) {
  const jpy = costJpy(billing, usage);
  manifest.spend ??= {
    _doc: 'Gasto estimado de Gemini TTS desde el paso al Nivel 1 de pago (12 de noviembre de 2026), con los tokens de cada respuesta. Estimación prudente; la cifra real está en AI Studio.',
    total: blank(),
    days: {},
  };
  for (const t of [manifest.spend.total, (manifest.spend.days[day] ??= blank())]) {
    t.requests += 1;
    t.inputTokens += usage.input;
    t.outputTokens += usage.output;
    t.jpy = Math.round((t.jpy + jpy) * 100) / 100;
  }
  return jpy;
}

export const spentJpy = (manifest) => manifest.spend?.total?.jpy ?? 0;
export const overBudget = (manifest, billing) => spentJpy(manifest) >= billing.maxSpendJpy - billing.stopMarginJpy;
export const yen = (n) => `${Math.round(n).toLocaleString('es-ES')} ¥`;

// Errores que no se arreglan reintentando: saldo agotado, facturación o permisos.
export const isBillingError = (status, detail) => status === 402 || status === 403 || /billing|credit|prepa|balance|payment/i.test(detail);
