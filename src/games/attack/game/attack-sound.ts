import {
  playSoundEffect,
  preloadSoundBuffer,
  runWithUnlockedAudioContext,
  stopSoundEffect,
} from "../../../utils/mobileAudio";

export type AttackSoundKind = "click" | "good" | "bad" | "slash";

export const ATTACK_SLICE_AUDIO_SRC = "/demonslayer/characters/sounds/slice.mp3";
export const ATTACK_SLICE_AUDIO_CANDIDATES = [
  ATTACK_SLICE_AUDIO_SRC,
  "/demonslayer/sounds/slice.mp3",
] as const;

export const ATTACK_SLICE_SOUND_KEY = "demonslayer:slice";

export function shouldUseSliceMp3(kind: AttackSoundKind): boolean {
  return kind === "good" || kind === "bad" || kind === "slash";
}

export function preloadAttackAudio(): void {
  void preloadSoundBuffer([...ATTACK_SLICE_AUDIO_CANDIDATES], ATTACK_SLICE_SOUND_KEY);
}

export function syncAttackAudioMute(muted: boolean): void {
  if (muted) {
    stopSoundEffect(ATTACK_SLICE_SOUND_KEY);
  }
}

export function playAttackSynthFallback(
  kind: AttackSoundKind,
  muted: boolean,
): void {
  if (muted) return;
  runWithUnlockedAudioContext((ctx) => {
    const now = ctx.currentTime + 0.002;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = kind === "bad" ? "sawtooth" : "triangle";
    osc.frequency.setValueAtTime(
      kind === "good" || kind === "slash" ? 700 : kind === "bad" ? 170 : 460,
      now,
    );
    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  });
}

/**
 * Plays the same slice.mp3 effect used in Demon Slayer for choice/slash actions
 * via the shared mobile-safe audio engine (Web Audio AudioBuffer + HTMLAudio + synth fallback).
 */
export function playAttackSound(kind: AttackSoundKind, muted: boolean): void {
  if (muted) {
    stopSoundEffect(ATTACK_SLICE_SOUND_KEY);
    return;
  }

  if (shouldUseSliceMp3(kind)) {
    playSoundEffect({
      key: ATTACK_SLICE_SOUND_KEY,
      urls: [...ATTACK_SLICE_AUDIO_CANDIDATES],
      volume: 0.88,
      muted,
      onFallback: () => playAttackSynthFallback(kind, muted),
    });
    return;
  }

  playAttackSynthFallback("click", muted);
}
