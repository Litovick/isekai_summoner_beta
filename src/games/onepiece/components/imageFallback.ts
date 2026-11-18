import type { SyntheticEvent } from "react";

export function applyImageFallback(
  e: SyntheticEvent<HTMLImageElement>,
  fallbackSrc?: string,
) {
  if (!fallbackSrc) return;
  const img = e.currentTarget;
  if (img.dataset.fallbackUsed === "1") return;
  img.dataset.fallbackUsed = "1";
  img.src = fallbackSrc;
}
