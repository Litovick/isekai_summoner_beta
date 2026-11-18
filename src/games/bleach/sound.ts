export type SlashMood = "neutral" | "good" | "bad";

export const BLEACH_SLICE_AUDIO_SRC = "/bleach/sounds/slice.mp3";

let sharedAudioCtx: AudioContext | null = null;
let sliceAudio: HTMLAudioElement | null = null;
let sliceAudioFailed = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx = window.AudioContext;
  if (!Ctx) return null;
  sharedAudioCtx ??= new Ctx();
  if (sharedAudioCtx.state === "suspended") {
    void sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

function getSliceAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined" || typeof Audio === "undefined") {
    return null;
  }
  if (!sliceAudio && !sliceAudioFailed) {
    try {
      const audio = new Audio(BLEACH_SLICE_AUDIO_SRC);
      audio.preload = "auto";
      audio.volume = 0.88;
      audio.addEventListener("error", () => {
        sliceAudioFailed = true;
      });
      sliceAudio = audio;
    } catch {
      sliceAudioFailed = true;
      return null;
    }
  }
  return sliceAudioFailed ? null : sliceAudio;
}

export function preloadBleachAudio() {
  const audio = getSliceAudio();
  if (!audio) return;
  try {
    if (audio.readyState === 0) {
      audio.load();
    }
  } catch {
    // Ignore preload errors so gameplay never stalls
  }
}

export function syncBleachAudioMute(muted: boolean) {
  if (!sliceAudio) return;
  try {
    sliceAudio.muted = muted;
    if (muted && !sliceAudio.paused) {
      sliceAudio.pause();
      sliceAudio.currentTime = 0;
    }
  } catch {
    // Ignore audio control errors
  }
}

/**
 * Fallback Web Audio API sharp metallic Zanpakuto slash ("스릉- 챙!").
 */
function playWebAudioZanpakutoSlash(mood: SlashMood, choiceIndex = 0) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const schedule = () => {
      const now = ctx.currentTime + 0.003;
      const pitchShift = 1 + ((choiceIndex % 3) - 1) * 0.04;
      const duration = mood === "bad" ? 0.22 : 0.19;

      // 1. High-speed air cleavage noise sweep ("스릉-")
      const len = Math.floor(ctx.sampleRate * duration);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const ch = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        const t = i / len;
        const env = t < 0.05 ? t / 0.05 : Math.pow(1 - (t - 0.05) / 0.95, 1.75);
        ch[i] = (Math.random() * 2 - 1) * env;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buf;

      const sweep = ctx.createBiquadFilter();
      sweep.type = "bandpass";
      sweep.Q.setValueAtTime(2.3, now);
      sweep.frequency.setValueAtTime((mood === "good" ? 7800 : 6200) * pitchShift, now);
      sweep.frequency.exponentialRampToValueAtTime(
        (mood === "bad" ? 900 : 1450) * pitchShift,
        now + duration * 0.8,
      );

      const sweepGain = ctx.createGain();
      sweepGain.gain.setValueAtTime(0.24, now);
      sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noise.connect(sweep);
      sweep.connect(sweepGain);
      sweepGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + duration);

      // 2. Crisp Zanpakuto steel resonance ("챙!")
      const ringAt = now + 0.015;
      const partials =
        mood === "good"
          ? [2960 * pitchShift, 4680 * pitchShift, 6820 * pitchShift]
          : mood === "bad"
          ? [1940 * pitchShift, 3180 * pitchShift, 4840 * pitchShift]
          : [2520 * pitchShift, 4120 * pitchShift, 6100 * pitchShift];

      partials.forEach((hz, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = idx === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(hz, ringAt);
        osc.frequency.exponentialRampToValueAtTime(hz * 0.985, ringAt + 0.16);
        g.gain.setValueAtTime(0.0001, ringAt);
        g.gain.linearRampToValueAtTime(0.048 / (idx + 1), ringAt + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, ringAt + 0.17);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(ringAt);
        osc.stop(ringAt + 0.175);
      });

      // 3. Reiatsu burst low thump synced to Getsuga flash
      const thumpAt = now + 0.02;
      const thump = ctx.createOscillator();
      const thumpGain = ctx.createGain();
      thump.type = "sine";
      thump.frequency.setValueAtTime(mood === "good" ? 190 : 155, thumpAt);
      thump.frequency.exponentialRampToValueAtTime(48, thumpAt + 0.065);
      thumpGain.gain.setValueAtTime(0.085, thumpAt);
      thumpGain.gain.exponentialRampToValueAtTime(0.0001, thumpAt + 0.07);
      thump.connect(thumpGain);
      thumpGain.connect(ctx.destination);
      thump.start(thumpAt);
      thump.stop(thumpAt + 0.075);
    };

    if (ctx.state === "suspended") {
      void ctx.resume().then(schedule);
    } else {
      schedule();
    }
  } catch {
    // Web Audio fallback is optional
  }
}

export function playTone(kind: "click" | "start", muted: boolean) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const run = () => {
      const now = ctx.currentTime + 0.002;
      if (kind === "start") {
        [620, 930, 1240].forEach((hz, idx) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(hz, now + idx * 0.04);
          g.gain.setValueAtTime(0.055, now + idx * 0.04);
          g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.13);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start(now + idx * 0.04);
          osc.stop(now + idx * 0.04 + 0.14);
        });
        return;
      }

      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(840, now);
      osc.frequency.exponentialRampToValueAtTime(460, now + 0.032);
      g.gain.setValueAtTime(0.04, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.036);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    };

    if (ctx.state === "suspended") {
      void ctx.resume().then(run);
    } else {
      run();
    }
  } catch {
    // Web Audio is optional
  }
}

/**
 * Plays /bleach/sounds/slice.mp3 on choice click with currentTime=0 reset
 * and Web Audio metallic Zanpakuto slash fallback if loading or playback fails.
 */
export function playZanpakutoSlashSound(
  mood: SlashMood,
  muted: boolean,
  choiceIndex = 0,
) {
  if (muted) {
    syncBleachAudioMute(true);
    return;
  }

  const audio = getSliceAudio();
  if (!audio) {
    playWebAudioZanpakutoSlash(mood, choiceIndex);
    return;
  }

  try {
    audio.muted = false;
    audio.volume = 0.88;
    try {
      audio.currentTime = 0;
    } catch {
      // Ignore InvalidStateError before metadata load
    }

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        playWebAudioZanpakutoSlash(mood, choiceIndex);
      });
    }
  } catch {
    playWebAudioZanpakutoSlash(mood, choiceIndex);
  }
}
