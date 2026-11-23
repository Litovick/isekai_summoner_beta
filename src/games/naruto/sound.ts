import {
  playSoundEffect,
  preloadSoundBuffer,
  runWithUnlockedAudioContext,
  stopSoundEffect,
} from "../../utils/mobileAudio";

export type ChakraMood = "neutral" | "good" | "bad";

export const CHAKRA_AUDIO_SRC = "/naruto/sounds/chakra.mp3";

const SOUND_KEY = "naruto:chakra";

export function preloadNarutoAudio() {
  void preloadSoundBuffer(CHAKRA_AUDIO_SRC, SOUND_KEY);
}

export function syncNarutoAudioMute(muted: boolean) {
  if (muted) {
    stopSoundEffect(SOUND_KEY);
  }
}

function playWebAudioChakraBurst(mood: ChakraMood, choiceIndex = 0) {
  runWithUnlockedAudioContext((ctx) => {
    const now = ctx.currentTime + 0.003;
    const pitchShift = 1 + ((choiceIndex % 3) - 1) * 0.04;
    const duration = 0.28;

    // 1. Swirl chakra condensation whoosh
    const len = Math.floor(ctx.sampleRate * duration);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      const env = t < 0.35 ? t / 0.35 : Math.pow(1 - (t - 0.35) / 0.65, 1.8);
      ch[i] = (Math.random() * 2 - 1) * env;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.setValueAtTime(2.6, now);
    filter.frequency.setValueAtTime(520 * pitchShift, now);
    filter.frequency.exponentialRampToValueAtTime(
      (mood === "bad" ? 1450 : 2850) * pitchShift,
      now + duration * 0.72,
    );

    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.18, now);
    nGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration);

    // 2. Chakra resonance pulse
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime((mood === "good" ? 360 : 260) * pitchShift, now);
    osc.frequency.exponentialRampToValueAtTime(
      (mood === "good" ? 880 : 180) * pitchShift,
      now + 0.16,
    );
    g.gain.setValueAtTime(0.08, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.23);
  });
}

export function playTone(kind: "click" | "start", muted: boolean) {
  if (muted) return;
  runWithUnlockedAudioContext((ctx) => {
    const now = ctx.currentTime + 0.002;
    if (kind === "start") {
      [520, 780, 1040].forEach((hz, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(hz, now + idx * 0.045);
        g.gain.setValueAtTime(0.06, now + idx * 0.045);
        g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.045 + 0.14);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + idx * 0.045);
        osc.stop(now + idx * 0.045 + 0.15);
      });
      return;
    }

    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(760, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.036);
    g.gain.setValueAtTime(0.045, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.042);
  });
}

export function playChakraBurstSound(
  mood: ChakraMood,
  muted: boolean,
  choiceIndex = 0,
) {
  playSoundEffect({
    key: SOUND_KEY,
    urls: CHAKRA_AUDIO_SRC,
    volume: 0.88,
    muted,
    onFallback: () => playWebAudioChakraBurst(mood, choiceIndex),
  });
}

