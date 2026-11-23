import {
  playSoundEffect,
  preloadSoundBuffer,
  runWithUnlockedAudioContext,
  stopSoundEffect,
} from "../../utils/mobileAudio";

export type HakiMood = "neutral" | "good" | "bad";

export const HAKI_AUDIO_SRC = "/onepiece/sounds/haki.mp3";

const SOUND_KEY = "onepiece:haki";

export function preloadOnePieceAudio() {
  void preloadSoundBuffer(HAKI_AUDIO_SRC, SOUND_KEY);
}

export function syncOnePieceAudioMute(muted: boolean) {
  if (muted) {
    stopSoundEffect(SOUND_KEY);
  }
}

/**
 * Fallback Web Audio API high-frequency Observation Haki wave pulse ("위이잉- 팟!")
 * when /onepiece/sounds/haki.mp3 cannot be loaded or played.
 */
function playWebAudioHakiPulse(mood: HakiMood, choiceIndex = 0) {
  runWithUnlockedAudioContext((ctx) => {
    const now = ctx.currentTime + 0.003;
    const pitchShift = 1 + ((choiceIndex % 3) - 1) * 0.04;
    const duration = mood === "bad" ? 0.34 : 0.3;

    // 1. High-frequency Observation Haki precognition shimmer
    const baseHz = (mood === "good" ? 1320 : mood === "bad" ? 980 : 1160) * pitchShift;
    [baseHz, baseHz * 1.498].forEach((hz, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = idx === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(hz * 0.82, now);
      osc.frequency.exponentialRampToValueAtTime(hz * 1.38, now + duration * 0.6);
      osc.frequency.exponentialRampToValueAtTime(hz * 0.95, now + duration);

      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(idx === 0 ? 0.08 : 0.04, now + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.01);
    });

    // 2. Crisp flash burst ("팟!")
    const thumpAt = now + 0.04;
    const thump = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thump.type = "sine";
    thump.frequency.setValueAtTime(175, thumpAt);
    thump.frequency.exponentialRampToValueAtTime(42, thumpAt + 0.14);
    thumpGain.gain.setValueAtTime(0.11, thumpAt);
    thumpGain.gain.exponentialRampToValueAtTime(0.0001, thumpAt + 0.16);
    thump.connect(thumpGain);
    thumpGain.connect(ctx.destination);
    thump.start(thumpAt);
    thump.stop(thumpAt + 0.17);
  });
}

export function playTone(kind: "click" | "start", muted: boolean) {
  if (muted) return;
  runWithUnlockedAudioContext((ctx) => {
    const now = ctx.currentTime + 0.002;
    if (kind === "start") {
      [440, 660, 880].forEach((hz, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(hz, now + idx * 0.045);
        g.gain.setValueAtTime(0.055, now + idx * 0.045);
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
    osc.frequency.setValueAtTime(740, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.032);
    g.gain.setValueAtTime(0.04, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.036);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  });
}

/**
 * Plays /onepiece/sounds/haki.mp3 via mobile-safe Web Audio AudioBuffer with
 * HTMLAudio and Web Audio high-frequency Observation Haki pulse fallbacks.
 */
export function playHakiPulseSound(
  mood: HakiMood,
  muted: boolean,
  choiceIndex = 0,
) {
  playSoundEffect({
    key: SOUND_KEY,
    urls: HAKI_AUDIO_SRC,
    volume: 0.88,
    muted,
    onFallback: () => playWebAudioHakiPulse(mood, choiceIndex),
  });
}
