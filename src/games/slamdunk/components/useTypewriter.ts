import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed = 28) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 1)), speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { shown: text.slice(0, n), done: n >= text.length, finish: () => setN(text.length) };
}

let ctx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return ctx;
}

export function beep(kind: "click" | "good" | "bad", muted: boolean) {
  if (muted || typeof window === "undefined") return;
  try {
    const audio = getAudioContext();
    if (!audio) return;
    const o = audio.createOscillator();
    const g = audio.createGain();
    const f: [number, number] = kind === "good" ? [660, 990] : kind === "bad" ? [220, 140] : [520, 520];
    o.type = kind === "bad" ? "sawtooth" : "square";
    o.frequency.setValueAtTime(f[0], audio.currentTime);
    o.frequency.linearRampToValueAtTime(f[1], audio.currentTime + 0.15);
    g.gain.setValueAtTime(0.05, audio.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.2);
    o.connect(g).connect(audio.destination);
    o.start();
    o.stop(audio.currentTime + 0.2);
  } catch {
    /* audio unavailable */
  }
}

/**
 * Plays realistic synthesized basketball stadium SFX:
 * sneaker court squeak + hardwood ball bounce + net swish (or referee whistle on bad play).
 */
export function playBasketballSfx(good: boolean, choiceIndex: number, muted: boolean) {
  if (muted || typeof window === "undefined") return;
  try {
    const audio = getAudioContext();
    if (!audio) return;
    const now = audio.currentTime;

    // 1. Sneaker squeak on hardwood court (quick pitch chirp)
    const sqOsc = audio.createOscillator();
    const sqFilter = audio.createBiquadFilter();
    const sqGain = audio.createGain();
    sqOsc.type = "triangle";
    const baseSq = 1820 + (choiceIndex % 3) * 140;
    sqOsc.frequency.setValueAtTime(baseSq, now);
    sqOsc.frequency.exponentialRampToValueAtTime(baseSq + 780, now + 0.032);
    sqOsc.frequency.exponentialRampToValueAtTime(baseSq - 320, now + 0.075);

    sqFilter.type = "bandpass";
    sqFilter.frequency.setValueAtTime(2200, now);
    sqFilter.Q.setValueAtTime(4.2, now);

    sqGain.gain.setValueAtTime(0.001, now);
    sqGain.gain.linearRampToValueAtTime(0.055, now + 0.012);
    sqGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    sqOsc.connect(sqFilter).connect(sqGain).connect(audio.destination);
    sqOsc.start(now);
    sqOsc.stop(now + 0.085);

    // 2. Basketball bounce thump (resonant low-end punch)
    const bounceAt = now + 0.055;
    const bounceOsc = audio.createOscillator();
    const bounceGain = audio.createGain();
    bounceOsc.type = "sine";
    bounceOsc.frequency.setValueAtTime(220, bounceAt);
    bounceOsc.frequency.exponentialRampToValueAtTime(68, bounceAt + 0.11);

    bounceGain.gain.setValueAtTime(0.16, bounceAt);
    bounceGain.gain.exponentialRampToValueAtTime(0.0001, bounceAt + 0.13);

    bounceOsc.connect(bounceGain).connect(audio.destination);
    bounceOsc.start(bounceAt);
    bounceOsc.stop(bounceAt + 0.14);

    if (good) {
      // 3a. Net swish (high-pass filtered white noise burst) + stadium chime
      const swishAt = now + 0.13;
      const len = Math.floor(audio.sampleRate * 0.17);
      const buf = audio.createBuffer(1, len, audio.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / len);
      }

      const noise = audio.createBufferSource();
      noise.buffer = buf;

      const hp = audio.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.setValueAtTime(2400, swishAt);

      const swishGain = audio.createGain();
      swishGain.gain.setValueAtTime(0.09, swishAt);
      swishGain.gain.exponentialRampToValueAtTime(0.0001, swishAt + 0.16);

      noise.connect(hp).connect(swishGain).connect(audio.destination);
      noise.start(swishAt);
      noise.stop(swishAt + 0.17);

      // Uplifting scoreboard chime
      [587.33, 880].forEach((freq, idx) => {
        const chimeOsc = audio.createOscillator();
        const chimeGain = audio.createGain();
        chimeOsc.type = "triangle";
        chimeOsc.frequency.setValueAtTime(freq, swishAt + idx * 0.045);
        chimeGain.gain.setValueAtTime(0.045, swishAt + idx * 0.045);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, swishAt + 0.24 + idx * 0.045);
        chimeOsc.connect(chimeGain).connect(audio.destination);
        chimeOsc.start(swishAt + idx * 0.045);
        chimeOsc.stop(swishAt + 0.25 + idx * 0.045);
      });
    } else {
      // 3b. Referee whistle trill (dual-frequency pea whistle)
      const whistleAt = now + 0.12;
      const w1 = audio.createOscillator();
      const w2 = audio.createOscillator();
      const lfo = audio.createOscillator();
      const lfoGain = audio.createGain();
      const wGain = audio.createGain();

      w1.type = "sine";
      w2.type = "sine";
      w1.frequency.setValueAtTime(2580, whistleAt);
      w2.frequency.setValueAtTime(2740, whistleAt);

      lfo.type = "sine";
      lfo.frequency.setValueAtTime(32, whistleAt);
      lfoGain.gain.setValueAtTime(110, whistleAt);
      lfo.connect(lfoGain);
      lfoGain.connect(w1.frequency);
      lfoGain.connect(w2.frequency);

      wGain.gain.setValueAtTime(0.001, whistleAt);
      wGain.gain.linearRampToValueAtTime(0.038, whistleAt + 0.02);
      wGain.gain.exponentialRampToValueAtTime(0.0001, whistleAt + 0.24);

      w1.connect(wGain);
      w2.connect(wGain);
      wGain.connect(audio.destination);

      w1.start(whistleAt);
      w2.start(whistleAt);
      lfo.start(whistleAt);
      w1.stop(whistleAt + 0.25);
      w2.stop(whistleAt + 0.25);
      lfo.stop(whistleAt + 0.25);
    }
  } catch {
    /* audio unavailable */
  }
}
