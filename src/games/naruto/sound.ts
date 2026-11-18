export type ChakraMood = "neutral" | "good" | "bad";

export const CHAKRA_AUDIO_SRC = "/naruto/sounds/chakra.mp3";

let sharedAudioCtx: AudioContext | null = null;
let chakraAudio: HTMLAudioElement | null = null;

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

function getChakraAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined" || typeof Audio === "undefined") {
    return null;
  }
  if (!chakraAudio) {
    try {
      const audio = new Audio(CHAKRA_AUDIO_SRC);
      audio.preload = "auto";
      audio.volume = 0.88;
      chakraAudio = audio;
    } catch {
      return null;
    }
  }
  return chakraAudio;
}

export function preloadNarutoAudio() {
  const audio = getChakraAudio();
  if (!audio) return;
  try {
    if (audio.readyState === 0) {
      audio.load();
    }
  } catch {
    // Ignore preload errors so gameplay never stalls
  }
}

export function syncNarutoAudioMute(muted: boolean) {
  if (!chakraAudio) return;
  try {
    chakraAudio.muted = muted;
    if (muted && !chakraAudio.paused) {
      chakraAudio.pause();
      chakraAudio.currentTime = 0;
    }
  } catch {
    // Ignore audio control errors
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

export function playChakraBurstSound(
  _mood: ChakraMood,
  muted: boolean,
  _choiceIndex = 0,
) {
  if (muted) {
    syncNarutoAudioMute(true);
    return;
  }

  const audio = getChakraAudio();
  if (!audio) return;

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
        // Prevent unhandled rejection / game stall if file load or autoplay fails
      });
    }
  } catch {
    // Never allow audio errors to interrupt choice selection
  }
}

