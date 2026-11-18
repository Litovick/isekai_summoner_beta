export type ImpactMood = "neutral" | "good" | "bad";

export function playTone(kind: "click" | "good" | "bad" | "slash", muted: boolean) {
  if (muted) return;
  try {
    const Ctx = window.AudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = kind === "bad" ? "sawtooth" : kind === "slash" ? "triangle" : "sine";
    osc.frequency.value =
      kind === "good"
        ? 740
        : kind === "bad"
        ? 185
        : kind === "slash"
        ? 520
        : 440;
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
    osc.onended = () => {
      void ctx.close();
    };
  } catch {
    // Audio feedback is optional
  }
}

/**
 * Plays a layered Nichirin blade slash + low impact thud + outcome resonance
 * when the player commits to a combat/story choice.
 */
export function playChoiceImpactSound(mood: ImpactMood, muted: boolean) {
  if (muted) return;
  try {
    const Ctx = window.AudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;

    // 1. Metallic blade whoosh (bandpass-filtered white noise sweep)
    const bufferSize = Math.floor(ctx.sampleRate * 0.18);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const channelData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.setValueAtTime(2.6, now);
    filter.frequency.setValueAtTime(2800, now);
    filter.frequency.exponentialRampToValueAtTime(620, now + 0.16);

    const slashGain = ctx.createGain();
    slashGain.gain.setValueAtTime(0.11, now);
    slashGain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);

    noise.connect(filter);
    filter.connect(slashGain);
    slashGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.18);

    // 2. Heavy body impact thud (low-frequency pitch drop)
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = "sine";
    thudOsc.frequency.setValueAtTime(155, now);
    thudOsc.frequency.exponentialRampToValueAtTime(42, now + 0.18);

    thudGain.gain.setValueAtTime(0.14, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);

    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    thudOsc.start(now);
    thudOsc.stop(now + 0.2);

    // 3. Nichirin steel & outcome accent ring
    const accentOsc = ctx.createOscillator();
    const accentGain = ctx.createGain();
    accentOsc.type = mood === "bad" ? "sawtooth" : "triangle";

    if (mood === "good") {
      accentOsc.frequency.setValueAtTime(587.33, now + 0.03);
      accentOsc.frequency.exponentialRampToValueAtTime(880, now + 0.24);
    } else if (mood === "bad") {
      accentOsc.frequency.setValueAtTime(210, now + 0.03);
      accentOsc.frequency.exponentialRampToValueAtTime(118, now + 0.26);
    } else {
      accentOsc.frequency.setValueAtTime(493.88, now + 0.03);
      accentOsc.frequency.exponentialRampToValueAtTime(392, now + 0.22);
    }

    accentGain.gain.setValueAtTime(0.001, now);
    accentGain.gain.linearRampToValueAtTime(0.045, now + 0.045);
    accentGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    accentOsc.connect(accentGain);
    accentGain.connect(ctx.destination);
    accentOsc.start(now + 0.02);
    accentOsc.stop(now + 0.29);

    accentOsc.onended = () => {
      void ctx.close();
    };
  } catch {
    // Audio feedback is optional
  }
}
