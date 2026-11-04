// Utilidades de audio para scripts/tts/generate.mjs: cabecera WAV y corte por silencios.

export function wav(pcm, rate) {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + pcm.length, 4); h.write('WAVE', 8);
  h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(rate, 24); h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write('data', 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}
// Corta en las (n − 1) pausas más largas. Devuelve null si no hay pausas suficientes.
export function splitBySilence(pcm, rate, n) {
  if (n === 1) return [pcm];
  const frame = Math.round(rate / 100); // 10 ms
  const frames = Math.floor(pcm.length / 2 / frame);
  const level = new Float64Array(frames);
  for (let f = 0; f < frames; f++) {
    let sum = 0;
    for (let i = 0; i < frame; i++) sum += Math.abs(pcm.readInt16LE((f * frame + i) * 2));
    level[f] = sum / frame;
  }
  const peak = Math.max(...level);
  const threshold = Math.max(peak * 0.03, 60);
  const gaps = [];
  let start = -1;
  for (let f = 0; f <= frames; f++) {
    const silent = f < frames && level[f] < threshold;
    if (silent && start < 0) start = f;
    if (!silent && start >= 0) {
      if (start > 0 && f < frames && f - start >= 25) gaps.push({ start, end: f, len: f - start });
      start = -1;
    }
  }
  if (gaps.length < n - 1) return null;
  const cuts = gaps.sort((a, b) => b.len - a.len).slice(0, n - 1).sort((a, b) => a.start - b.start);
  const pad = 8; // 80 ms de margen
  // Sin el silencio del principio y del final del lote.
  let first = 0;
  while (first < frames && level[first] < threshold) first++;
  let last = frames - 1;
  while (last > first && level[last] < threshold) last--;
  const bounds = [Math.max(0, first - pad), ...cuts.flatMap((g) => [g.start + pad, g.end - pad]), Math.min(frames, last + 1 + pad)];
  const pieces = [];
  for (let i = 0; i < bounds.length; i += 2) pieces.push(pcm.subarray(bounds[i] * frame * 2, bounds[i + 1] * frame * 2));
  return pieces;
}
