/**
 * Lightweight browser image preloader for smooth scene & character transitions.
 * Deduplicates requests across renders and schedules non-critical assets during idle time.
 */

const preloadedUrls = new Set<string>();
const pendingImages = new Set<HTMLImageElement>();

type IdleWindow = Window & {
  requestIdleCallback?: (
    cb: () => void,
    options?: { timeout?: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

/**
 * Normalizes and deduplicates image URLs, filtering out empty values.
 * Encodes unencoded whitespace so cached requests match CSS `encodeURI(...)` URLs.
 */
export function collectUniqueImageUrls(
  urls: readonly (string | null | undefined)[],
): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of urls) {
    if (!raw) continue;
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const normalized = /\s/.test(trimmed) ? encodeURI(trimmed) : trimmed;
    if (!seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  }
  return result;
}

/**
 * Immediately starts preloading a single image via `new Image()`.
 * Returns true if a new fetch was triggered, false if already cached or unavailable.
 */
export function preloadImageNow(url: string): boolean {
  if (typeof Image === "undefined") return false;
  const normalized = /\s/.test(url) ? encodeURI(url.trim()) : url.trim();
  if (!normalized || preloadedUrls.has(normalized)) return false;

  preloadedUrls.add(normalized);
  const img = new Image();
  img.decoding = "async";
  pendingImages.add(img);
  const release = () => {
    pendingImages.delete(img);
  };
  img.onload = release;
  img.onerror = release;
  img.src = normalized;
  return true;
}

/**
 * Immediately preloads high-priority images (e.g., current and upcoming scene backgrounds & cast).
 */
export function preloadPriorityImages(
  urls: readonly (string | null | undefined)[],
): number {
  const unique = collectUniqueImageUrls(urls);
  let started = 0;
  for (const url of unique) {
    if (preloadImageNow(url)) started += 1;
  }
  return started;
}

/**
 * Preloads a list of game images in small idle-scheduled batches so initial paint stays responsive.
 * Returns a cancel function suitable for `useEffect` cleanup.
 */
export function preloadImagesInBackground(
  urls: readonly (string | null | undefined)[],
  batchSize = 4,
): () => void {
  const queue = collectUniqueImageUrls(urls).filter((u) => !preloadedUrls.has(u));
  if (queue.length === 0 || typeof Image === "undefined") {
    return () => {};
  }

  let cancelled = false;
  let cursor = 0;
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let idleId: number | null = null;
  const win = typeof window !== "undefined" ? (window as IdleWindow) : undefined;

  const scheduleNext = (fn: () => void) => {
    if (cancelled) return;
    if (win?.requestIdleCallback) {
      idleId = win.requestIdleCallback(fn, { timeout: 600 });
    } else {
      timerId = setTimeout(fn, 120);
    }
  };

  const processBatch = () => {
    if (cancelled) return;
    const end = Math.min(cursor + Math.max(1, batchSize), queue.length);
    for (; cursor < end; cursor += 1) {
      preloadImageNow(queue[cursor]!);
    }
    if (cursor < queue.length) {
      scheduleNext(processBatch);
    }
  };

  scheduleNext(processBatch);

  return () => {
    cancelled = true;
    if (timerId !== null) clearTimeout(timerId);
    if (idleId !== null && win?.cancelIdleCallback) {
      win.cancelIdleCallback(idleId);
    }
  };
}

/** Exposed for unit tests to reset module cache state. */
export function resetPreloaderCache(): void {
  preloadedUrls.clear();
  pendingImages.clear();
}
