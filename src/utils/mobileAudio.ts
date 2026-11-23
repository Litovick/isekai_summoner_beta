/**
 * Mobile-safe audio engine for iOS Safari, Android Chrome, and Desktop browsers.
 *
 * Why mobile SFX often fails:
 * 1. iOS Safari / Mobile Chrome keep AudioContext "suspended" until resumed
 *    synchronously inside a direct user gesture (touchstart / pointerdown / click).
 * 2. Creating a new AudioContext per click hits iOS Safari's hardware context limit
 *    and starts each context suspended.
 * 3. HTMLAudioElement.play() frequently stalls or ignores preload on mobile Safari,
 *    and resetting currentTime = 0 before readyState >= 1 can throw or drop sound.
 *
 * This module solves all three by:
 * - Sharing one singleton AudioContext (with webkitAudioContext fallback).
 * - Unlocking audio on the very first user gesture with a 1-sample silent buffer.
 * - Decoding MP3 SFX into cached Web Audio AudioBuffers for 0ms mobile playback,
 *   with HTMLAudioElement + Web Audio synth fallbacks so SFX never silently fails.
 */

interface WebkitAudioWindow extends Window {
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
}

export interface MinimalAudioContext {
  state: AudioContextState;
  resume(): Promise<void>;
}

export interface PlaySoundEffectOptions {
  key: string;
  urls: string | string[];
  volume?: number;
  muted: boolean;
  onFallback?: () => void;
}

export const GLOBAL_MUTE_STORAGE_KEY = "isekai:global:muted";
export const LEGACY_MUTE_STORAGE_KEYS = [
  "game:muted",
  "aot:muted",
  "isekai:demonslayer:muted",
  "isekai:naruto:muted",
  "isekai:bleach:muted",
  "isekai:onepiece:muted",
  "isekai:yumeiro:muted",
] as const;

let sharedAudioCtx: AudioContext | null = null;
let silentBufferPlayed = false;
let globalAudioMuted: boolean | null = null;
const globalMuteListeners = new Set<(muted: boolean) => void>();

const decodedBufferCache = new Map<string, AudioBuffer>();
const pendingDecodeCache = new Map<string, Promise<AudioBuffer | null>>();
const activeBufferSources = new Map<string, AudioBufferSourceNode>();
const htmlAudioCache = new Map<string, HTMLAudioElement>();
const resolvedUrlCache = new Map<string, string>();
const failedKeys = new Set<string>();

function readInitialGlobalMute(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(GLOBAL_MUTE_STORAGE_KEY);
    if (raw === "1" || raw === "0") {
      return raw === "1";
    }
    for (const key of LEGACY_MUTE_STORAGE_KEYS) {
      const legacy = window.localStorage.getItem(key);
      if (legacy === "1" || legacy === "0") {
        return legacy === "1";
      }
    }
  } catch {
    // Ignore storage access errors
  }
  return false;
}

export function getGlobalAudioMuted(): boolean {
  if (globalAudioMuted === null) {
    globalAudioMuted = readInitialGlobalMute();
  }
  return globalAudioMuted;
}

export function subscribeGlobalAudioMuted(
  listener: (muted: boolean) => void,
): () => void {
  globalMuteListeners.add(listener);
  return () => {
    globalMuteListeners.delete(listener);
  };
}

/**
 * Normalizes a single URL or candidate URL list into a deduplicated, non-empty array.
 */
export function resolveAudioCandidateUrls(urls: string | string[]): string[] {
  const list = Array.isArray(urls) ? urls : [urls];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of list) {
    const trimmed = raw.trim();
    if (trimmed && !seen.has(trimmed)) {
      seen.add(trimmed);
      result.push(trimmed);
    }
  }
  return result;
}

/**
 * Detects SPA HTML fallback responses (HTTP 200 returning index.html for a missing asset).
 */
export function isLikelyHtmlResponse(contentType: string | null | undefined): boolean {
  if (!contentType) return false;
  return contentType.toLowerCase().includes("text/html");
}

/**
 * Pure helper to schedule an audio synthesis callback safely whether the
 * AudioContext is already running or needs an async resume() first.
 */
export function scheduleOnAudioContext<T extends MinimalAudioContext>(
  ctx: T | null,
  fn: (audioCtx: T) => void,
): boolean {
  if (!ctx) return false;
  if (ctx.state === "running") {
    try {
      fn(ctx);
      return true;
    } catch {
      return false;
    }
  }
  if (ctx.state === "suspended") {
    try {
      const promise = ctx.resume();
      if (promise && typeof promise.then === "function") {
        void promise
          .then(() => {
            try {
              fn(ctx);
            } catch {
              // Ignore synthesis errors after resume
            }
          })
          .catch(() => {
            // Browser blocked audio playback
          });
      }
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

function getAudioContextConstructor(): typeof AudioContext | null {
  if (typeof window === "undefined") return null;
  const w = window as WebkitAudioWindow;
  return w.AudioContext ?? w.webkitAudioContext ?? null;
}

export function getSharedAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx = getAudioContextConstructor();
  if (!Ctx) return null;

  if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
    try {
      sharedAudioCtx = new Ctx();
      silentBufferPlayed = false;
    } catch {
      return null;
    }
  }
  return sharedAudioCtx;
}

/**
 * Must be called synchronously inside a user gesture handler (touchstart/pointerdown/click)
 * to unlock iOS Safari & Android Chrome Web Audio playback.
 */
export function unlockMobileAudio(): AudioContext | null {
  const ctx = getSharedAudioContext();
  if (!ctx) return null;

  try {
    if (ctx.state === "suspended") {
      void ctx.resume().catch(() => {
        // Ignore if called outside user gesture
      });
    }

    if (!silentBufferPlayed) {
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      silentBufferPlayed = true;
    }
  } catch {
    // Never allow unlock attempt to break UI interaction
  }

  return ctx;
}

/**
 * Installs global capture-phase gesture listeners so audio unlocks on the user's
 * very first tap anywhere in the app (including TitleScreen / WorldSelectScreen).
 */
export function installMobileAudioUnlock(): () => void {
  if (typeof window === "undefined") return () => {};

  const handleGesture = () => {
    const ctx = unlockMobileAudio();
    if (ctx && ctx.state === "running" && silentBufferPlayed) {
      // Keep listeners attached lightly only if context gets suspended later
      // (iOS Safari suspends AudioContext when backgrounded).
    }
  };

  const handleVisibility = () => {
    if (typeof document !== "undefined" && document.visibilityState === "visible") {
      if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
        silentBufferPlayed = false;
      }
    }
  };

  const events: Array<keyof WindowEventMap> = [
    "touchstart",
    "pointerdown",
    "click",
    "keydown",
  ];
  events.forEach((evt) => {
    window.addEventListener(evt, handleGesture, { capture: true, passive: true });
  });
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", handleVisibility);
  }

  return () => {
    events.forEach((evt) => {
      window.removeEventListener(evt, handleGesture, { capture: true });
    });
    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", handleVisibility);
    }
  };
}

/**
 * Runs Web Audio synthesis safely on the shared unlocked AudioContext.
 * Automatically respects global mute state.
 */
export function runWithUnlockedAudioContext(
  fn: (ctx: AudioContext) => void,
): void {
  if (getGlobalAudioMuted()) return;
  const ctx = unlockMobileAudio();
  scheduleOnAudioContext(ctx, fn);
}

/**
 * Safari-compatible decodeAudioData wrapper supporting both Promise and callback forms.
 */
function decodeAudioDataCompat(
  ctx: AudioContext,
  arrayBuffer: ArrayBuffer,
): Promise<AudioBuffer> {
  return new Promise((resolve, reject) => {
    try {
      const maybePromise = ctx.decodeAudioData(
        arrayBuffer,
        (decoded) => resolve(decoded),
        (err) => reject(err),
      );
      if (maybePromise && typeof maybePromise.then === "function") {
        maybePromise.then(resolve, reject);
      }
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Fetches and decodes the first reachable audio URL into a Web Audio AudioBuffer.
 * Cached by key so subsequent plays are instant (0ms latency on mobile).
 */
export function preloadSoundBuffer(
  urls: string | string[],
  cacheKey?: string,
): Promise<AudioBuffer | null> {
  const candidates = resolveAudioCandidateUrls(urls);
  if (candidates.length === 0 || typeof window === "undefined" || typeof fetch === "undefined") {
    return Promise.resolve(null);
  }

  const key = cacheKey ?? candidates[0]!;
  const cached = decodedBufferCache.get(key);
  if (cached) return Promise.resolve(cached);

  const pending = pendingDecodeCache.get(key);
  if (pending) return pending;

  const task = (async () => {
    const ctx = getSharedAudioContext();
    for (const url of candidates) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        if (isLikelyHtmlResponse(res.headers.get("content-type"))) continue;

        const bytes = await res.arrayBuffer();
        if (!bytes || bytes.byteLength === 0) continue;

        resolvedUrlCache.set(key, url);
        if (!ctx) {
          failedKeys.delete(key);
          return null;
        }

        // Slice creates an independent copy in case Safari detaches the buffer
        const decoded = await decodeAudioDataCompat(ctx, bytes.slice(0));
        decodedBufferCache.set(key, decoded);
        failedKeys.delete(key);
        return decoded;
      } catch {
        // Try next candidate URL
      }
    }

    failedKeys.add(key);
    return null;
  })().finally(() => {
    pendingDecodeCache.delete(key);
  });

  pendingDecodeCache.set(key, task);
  return task;
}

function getOrCreateHtmlAudio(key: string, url: string, volume: number): HTMLAudioElement | null {
  if (typeof window === "undefined" || typeof Audio === "undefined") return null;

  let audio = htmlAudioCache.get(key);
  if (!audio) {
    try {
      audio = new Audio(url);
      audio.preload = "auto";
      audio.volume = volume;
      audio.setAttribute("playsinline", "");
      audio.setAttribute("webkit-playsinline", "");
      htmlAudioCache.set(key, audio);
    } catch {
      return null;
    }
  }
  return audio;
}

export function stopSoundEffect(key: string): void {
  const activeSource = activeBufferSources.get(key);
  if (activeSource) {
    try {
      activeSource.stop();
    } catch {
      // Already stopped
    }
    activeBufferSources.delete(key);
  }

  const htmlAudio = htmlAudioCache.get(key);
  if (htmlAudio) {
    try {
      htmlAudio.muted = true;
      if (!htmlAudio.paused) {
        htmlAudio.pause();
      }
      if (htmlAudio.readyState >= 1) {
        htmlAudio.currentTime = 0;
      }
    } catch {
      // Ignore media control errors
    }
  }
}

export function stopAllSoundEffects(): void {
  const keys = new Set<string>([
    ...activeBufferSources.keys(),
    ...htmlAudioCache.keys(),
  ]);
  for (const key of keys) {
    stopSoundEffect(key);
  }
}

export function setGlobalAudioMuted(nextMuted: boolean): boolean {
  const normalized = Boolean(nextMuted);
  globalAudioMuted = normalized;

  if (normalized) {
    stopAllSoundEffects();
  }

  if (typeof window !== "undefined") {
    try {
      const val = normalized ? "1" : "0";
      window.localStorage.setItem(GLOBAL_MUTE_STORAGE_KEY, val);
      for (const key of LEGACY_MUTE_STORAGE_KEYS) {
        window.localStorage.setItem(key, val);
      }
    } catch {
      // Ignore storage write errors
    }
  }

  for (const listener of globalMuteListeners) {
    try {
      listener(normalized);
    } catch {
      // Ignore listener errors
    }
  }

  return normalized;
}

export function toggleGlobalAudioMuted(): boolean {
  return setGlobalAudioMuted(!getGlobalAudioMuted());
}

function playDecodedBuffer(
  key: string,
  buffer: AudioBuffer,
  volume: number,
  onFallback?: () => void,
): void {
  runWithUnlockedAudioContext((ctx) => {
    const prev = activeBufferSources.get(key);
    if (prev) {
      try {
        prev.stop();
      } catch {
        // Ignore already-stopped source
      }
      activeBufferSources.delete(key);
    }

    try {
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume, ctx.currentTime);

      source.connect(gain);
      gain.connect(ctx.destination);

      source.onended = () => {
        if (activeBufferSources.get(key) === source) {
          activeBufferSources.delete(key);
        }
      };

      activeBufferSources.set(key, source);
      source.start(0);
    } catch {
      onFallback?.();
    }
  });
}

/**
 * Plays a sound effect reliably across iOS Safari, Android Chrome, and Desktop:
 * 1. Primary: Decoded Web Audio AudioBuffer via unlocked singleton AudioContext.
 * 2. Secondary: HTMLAudioElement (with playsinline & safe currentTime reset) while decoding.
 * 3. Fallback: Optional Web Audio synthesizer callback so mobile users always get SFX feedback.
 */
export function playSoundEffect(options: PlaySoundEffectOptions): void {
  const { key, urls, volume = 0.88, muted, onFallback } = options;

  if (muted || getGlobalAudioMuted()) {
    stopSoundEffect(key);
    return;
  }

  const candidates = resolveAudioCandidateUrls(urls);
  if (candidates.length === 0) {
    onFallback?.();
    return;
  }

  // Synchronously unlock Web Audio inside the user gesture
  unlockMobileAudio();

  // 1. Instant Web Audio AudioBuffer playback (0ms latency, immune to iOS HTMLAudio issues)
  const decoded = decodedBufferCache.get(key);
  if (decoded) {
    playDecodedBuffer(key, decoded, volume, onFallback);
    return;
  }

  // Start decoding in background for subsequent clicks
  if (!failedKeys.has(key)) {
    void preloadSoundBuffer(candidates, key);
  }

  // 2. If all URLs already failed to fetch, go straight to synth fallback
  if (failedKeys.has(key)) {
    onFallback?.();
    return;
  }

  // 3. Try HTMLAudioElement while AudioBuffer finishes decoding
  const chosenUrl = resolvedUrlCache.get(key) ?? candidates[0]!;
  const htmlAudio = getOrCreateHtmlAudio(key, chosenUrl, volume);
  if (!htmlAudio) {
    onFallback?.();
    return;
  }

  try {
    htmlAudio.muted = false;
    htmlAudio.volume = volume;
    if (htmlAudio.readyState >= 1) {
      try {
        htmlAudio.pause();
        htmlAudio.currentTime = 0;
      } catch {
        // Ignore InvalidStateError
      }
    }

    const playPromise = htmlAudio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // If HTMLAudio fails on mobile (autoplay or missing primary URL), try fallback URL or synth
        const resolved = resolvedUrlCache.get(key);
        if (resolved && resolved !== chosenUrl) {
          htmlAudioCache.delete(key);
        }
        onFallback?.();
      });
    }
  } catch {
    onFallback?.();
  }
}
