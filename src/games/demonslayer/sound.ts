export type ImpactMood = "neutral" | "good" | "bad";

let sharedAudioCtx: AudioContext | null = null;

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

    // 1. Brisk wind-cutting blade noise burst ("슈악- 촥!")
    const len = Math.floor(ctx.sampleRate * options.duration);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      // Snappy 6% attack ramp into brisk exponential decay
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

    // Parallel high-frequency razor edge cut
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

    // 2. Crisp tempered Nichirin steel ring ("팅- / 스릉!")
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

    // Optional secondary clash glint on heavy/bad clash
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

    // 3. Tight physical slash snap synchronized with the shake peak
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

    // Subtle sheath/tsuba tap for dialogue progression
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
 * Plays a brisk, crisp Nichirin sword-slashing sound (검격음)
 * timed cleanly with the ds-stage--shake recoil and slash arc animation.
 */
export function playChoiceImpactSound(
  mood: ImpactMood,
  muted: boolean,
  choiceIndex = 0,
) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const pitchFactor = 1 + ((choiceIndex % 3) - 1) * 0.04;

    if (mood === "good") {
      // Brisk, bright "일섬(一閃)" clean slash
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
      // Sharp blade-clash slash ("검격 교차")
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
      // Swift, crisp katana slash
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
