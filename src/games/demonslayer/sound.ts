export type ImpactMood = "neutral" | "good" | "bad";

export const SLICE_AUDIO_SRC = "/demonslayer/sounds/slice.mp3";

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
      const audio = new Audio(SLICE_AUDIO_SRC);
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

export function preloadDemonSlayerAudio() {
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

export function syncDemonSlayerAudioMute(muted: boolean) {
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

function triggerKatanaSlash(
  ctx: AudioContext,
  options: {
    duration: number;
    startFreq: number;
    endFreq: number;
    edgeFreq: number;
    steelFreqs: number[];
    slashGain: number;
    ringGain: number;
    snapStart: number;
    snapGain: number;
    doubleClash?: boolean;
  },
) {
  const schedule = () => {
    const now = ctx.currentTime + 0.004;

    const len = Math.floor(ctx.sampleRate * options.duration);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      const env = t < 0.06 ? t / 0.06 : Math.pow(1 - (t - 0.06) / 0.94, 1.8);
      data[i] = (Math.random() * 2 - 1) * env;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const sweepFilter = ctx.createBiquadFilter();
    sweepFilter.type = "bandpass";
    sweepFilter.Q.setValueAtTime(2.1, now);
    sweepFilter.frequency.setValueAtTime(options.startFreq, now);
    sweepFilter.frequency.exponentialRampToValueAtTime(
      options.endFreq,
      now + options.duration * 0.82,
    );

    const sweepGain = ctx.createGain();
    sweepGain.gain.setValueAtTime(options.slashGain, now);
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + options.duration);

    noise.connect(sweepFilter);
    sweepFilter.connect(sweepGain);
    sweepGain.connect(ctx.destination);

    const edgeFilter = ctx.createBiquadFilter();
    edgeFilter.type = "highpass";
    edgeFilter.frequency.setValueAtTime(options.edgeFreq, now);

    const edgeGain = ctx.createGain();
    edgeGain.gain.setValueAtTime(options.slashGain * 0.72, now);
    edgeGain.gain.exponentialRampToValueAtTime(0.0001, now + options.duration * 0.68);

    noise.connect(edgeFilter);
    edgeFilter.connect(edgeGain);
    edgeGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + options.duration);

    const ringAt = now + 0.014;
    options.steelFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = idx === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, ringAt);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.985, ringAt + 0.145);

      const partialVol = options.ringGain / (idx + 1);
      g.gain.setValueAtTime(0.0001, ringAt);
      g.gain.linearRampToValueAtTime(partialVol, ringAt + 0.009);
      g.gain.exponentialRampToValueAtTime(0.0001, ringAt + 0.155);

      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(ringAt);
      osc.stop(ringAt + 0.16);
    });

    if (options.doubleClash) {
      const clashAt = now + 0.068;
      const cOsc = ctx.createOscillator();
      const cGain = ctx.createGain();
      cOsc.type = "triangle";
      cOsc.frequency.setValueAtTime(3120, clashAt);
      cOsc.frequency.exponentialRampToValueAtTime(2460, clashAt + 0.09);
      cGain.gain.setValueAtTime(0.028, clashAt);
      cGain.gain.exponentialRampToValueAtTime(0.0001, clashAt + 0.1);
      cOsc.connect(cGain);
      cGain.connect(ctx.destination);
      cOsc.start(clashAt);
      cOsc.stop(clashAt + 0.105);
    }

    if (options.snapGain > 0) {
      const snapAt = now + 0.022;
      const snap = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snap.type = "sine";
      snap.frequency.setValueAtTime(options.snapStart, snapAt);
      snap.frequency.exponentialRampToValueAtTime(52, snapAt + 0.055);

      snapGain.gain.setValueAtTime(options.snapGain, snapAt);
      snapGain.gain.exponentialRampToValueAtTime(0.0001, snapAt + 0.065);

      snap.connect(snapGain);
      snapGain.connect(ctx.destination);
      snap.start(snapAt);
      snap.stop(snapAt + 0.07);
    }
  };

  if (ctx.state === "suspended") {
    void ctx.resume().then(schedule);
  } else {
    schedule();
  }
}

function playWebAudioKatanaSlash(mood: ImpactMood, choiceIndex = 0) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const pitchFactor = 1 + ((choiceIndex % 3) - 1) * 0.04;

    if (mood === "good") {
      triggerKatanaSlash(ctx, {
        duration: 0.18,
        startFreq: 7400 * pitchFactor,
        endFreq: 1320 * pitchFactor,
        edgeFreq: 4000,
        steelFreqs: [2880 * pitchFactor, 4520 * pitchFactor, 6540 * pitchFactor],
        slashGain: 0.24,
        ringGain: 0.046,
        snapStart: 185,
        snapGain: 0.085,
      });
    } else if (mood === "bad") {
      triggerKatanaSlash(ctx, {
        duration: 0.2,
        startFreq: 5200 * pitchFactor,
        endFreq: 860 * pitchFactor,
        edgeFreq: 3100,
        steelFreqs: [1980 * pitchFactor, 3260 * pitchFactor, 4920 * pitchFactor],
        slashGain: 0.22,
        ringGain: 0.042,
        snapStart: 155,
        snapGain: 0.1,
        doubleClash: true,
      });
    } else {
      triggerKatanaSlash(ctx, {
        duration: 0.17,
        startFreq: 6500 * pitchFactor,
        endFreq: 1180 * pitchFactor,
        edgeFreq: 3700,
        steelFreqs: [2560 * pitchFactor, 4040 * pitchFactor, 5880 * pitchFactor],
        slashGain: 0.22,
        ringGain: 0.042,
        snapStart: 170,
        snapGain: 0.08,
      });
    }
  } catch {
    // Audio feedback is optional
  }
}

export function playTone(kind: "click" | "good" | "bad" | "slash", muted: boolean) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (kind === "slash") {
      triggerKatanaSlash(ctx, {
        duration: 0.16,
        startFreq: 6400,
        endFreq: 1250,
        edgeFreq: 3800,
        steelFreqs: [2640, 4180, 6120],
        slashGain: 0.15,
        ringGain: 0.036,
        snapStart: 165,
        snapGain: 0.055,
      });
      return;
    }

    if (kind === "good") {
      playChoiceImpactSound("good", false, 0);
      return;
    }

    if (kind === "bad") {
      playChoiceImpactSound("bad", false, 1);
      return;
    }

    const now = ctx.currentTime;
    const len = Math.floor(ctx.sampleRate * 0.028);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const hp = ctx.createBiquadFilter();
    hp.type = "bandpass";
    hp.frequency.setValueAtTime(2200, now);
    hp.Q.setValueAtTime(3.2, now);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.042, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.026);

    noise.connect(hp);
    hp.connect(g);
    g.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.028);
  } catch {
    // Audio feedback is optional
  }
}

/**
 * Plays /demonslayer/sounds/slice.mp3 on choice click with rapid-click reset
 * and Web Audio katana slash fallback if the file cannot be loaded or played.
 */
export function playChoiceImpactSound(
  mood: ImpactMood,
  muted: boolean,
  choiceIndex = 0,
) {
  if (muted) {
    syncDemonSlayerAudioMute(true);
    return;
  }

  const audio = getSliceAudio();
  if (!audio) {
    playWebAudioKatanaSlash(mood, choiceIndex);
    return;
  }

  try {
    audio.muted = false;
    audio.volume = 0.88;
    try {
      audio.currentTime = 0;
    } catch {
      // Ignore InvalidStateError if metadata is not yet loaded
    }

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        playWebAudioKatanaSlash(mood, choiceIndex);
      });
    }
  } catch {
    playWebAudioKatanaSlash(mood, choiceIndex);
  }
}
