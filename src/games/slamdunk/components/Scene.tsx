import { useEffect, useState } from "react";
import type { Character, Theme } from "../game/types";

export function useCharacterImageSrc(c?: Character) {
  const [failedPrimary, setFailedPrimary] = useState(false);
  const [failedFallback, setFailedFallback] = useState(false);

  useEffect(() => {
    setFailedPrimary(false);
    setFailedFallback(false);
  }, [c?.id, c?.image, c?.fallbackImage]);

  const src = !c
    ? undefined
    : !failedPrimary && c.image
      ? c.image
      : !failedFallback && c.fallbackImage
        ? c.fallbackImage
        : undefined;

  const handleError = () => {
    if (!failedPrimary && c?.image) {
      setFailedPrimary(true);
    } else {
      setFailedFallback(true);
    }
  };

  return { src, handleError };
}

export function Portrait({
  c,
  mood,
  active,
}: {
  c: Character;
  mood: "neutral" | "good" | "bad";
  active: boolean;
  compact?: boolean;
}) {
  const { src, handleError } = useCharacterImageSrc(c);

  return (
    <div
      className={`sd-character ${active ? "sd-character--active" : "sd-character--idle"} ${
        mood === "bad" && active ? "sd-character--bad" : ""
      }`}
      data-character={c.id}
      data-active={active ? "true" : "false"}
    >
      <div className="sd-character-figure">
        {src ? (
          <img
            src={src}
            alt={c.name}
            decoding="async"
            onError={handleError}
            className="sd-character-img"
          />
        ) : (
          <div className="sd-character-fallback" aria-label={c.name}>
            <div className="sd-character-jersey">
              <small>SHOHOKU</small>
              <strong>{c.number ?? "M"}</strong>
            </div>
          </div>
        )}
      </div>
      <div className="sd-character-plate">
        <span>{c.name}</span>
      </div>
    </div>
  );
}

export function CharacterReviewImage({ c }: { c?: Character }) {
  const { src, handleError } = useCharacterImageSrc(c);

  if (src) {
    return (
      <div className="sd-eval-stage">
        <img
          src={src}
          alt={c?.name ?? ""}
          decoding="async"
          onError={handleError}
          className="sd-eval-portrait"
        />
      </div>
    );
  }

  return (
    <div className="sd-eval-stage">
      <div className="sd-character-jersey" style={{ width: 68, height: 86 }}>
        <small>SHOHOKU</small>
        <strong style={{ fontSize: 24 }}>{c?.number ?? c?.name?.slice(0, 1) ?? "?"}</strong>
      </div>
    </div>
  );
}

export function EndingPortraitImg({
  c,
  className,
}: {
  c: Character;
  className?: string;
}) {
  const { src, handleError } = useCharacterImageSrc(c);
  if (!src) return null;
  return (
    <img
      src={src}
      alt={c.name}
      decoding="async"
      onError={handleError}
      className={className}
    />
  );
}

export function Backdrop({
  theme,
  bg,
  children,
}: {
  theme: Theme;
  bg: string;
  children?: React.ReactNode;
}) {
  const b = theme.backgrounds[bg] ?? theme.backgrounds["gym"];
  const bgUrl = b?.image ? `url('${encodeURI(b.image)}')` : undefined;

  return (
    <div className="sd-backdrop" role="region" aria-label={b?.label ?? "북산고 체육관"}>
      {bgUrl && (
        <div
          key={bg}
          className="sd-bg-photo"
          style={{ backgroundImage: bgUrl }}
          data-bg-src={b?.image}
          aria-hidden="true"
        />
      )}
      <div className="sd-backdrop-vignette" aria-hidden="true" />
      {children}
    </div>
  );
}

export function SceneStage({
  theme,
  bg,
  cast,
  activeSpeakerId,
  mood,
  isChoicePhase,
  isImpacting,
  impactTick,
  fx,
}: {
  theme: Theme;
  bg: string;
  cast: string[];
  activeSpeakerId?: string;
  mood: "neutral" | "good" | "bad";
  isChoicePhase: boolean;
  isImpacting: boolean;
  impactTick: number;
  fx: "good" | "bad" | null;
}) {
  const b = theme.backgrounds[bg] ?? theme.backgrounds["gym"];
  const baseCast = cast.filter((id) => theme.characters[id]);
  const top = baseCast.slice(0, 4);
  const visibleCast =
    activeSpeakerId &&
    activeSpeakerId !== "me" &&
    theme.characters[activeSpeakerId] &&
    !top.includes(activeSpeakerId)
      ? [...top.slice(0, 3), activeSpeakerId]
      : top;

  return (
    <div
      className={`sd-stage ${isChoicePhase ? "sd-stage--choice" : ""} ${
        isImpacting ? "sd-stage--shake" : ""
      }`}
      data-impacting={isImpacting ? "true" : "false"}
      data-impact-tick={impactTick}
    >
      <Backdrop theme={theme} bg={bg} />

      {b?.label && <div className="sd-stage-badge">{b.label}</div>}

      <div className="sd-cast" aria-label="등장인물 무대">
        {visibleCast.map((id) => (
          <Portrait
            key={id}
            c={theme.characters[id]!}
            mood={activeSpeakerId === id ? mood : "neutral"}
            active={activeSpeakerId === id}
          />
        ))}
      </div>

      {isImpacting && impactTick > 0 && (
        <div key={impactTick} aria-hidden="true">
          <div className={`sd-court-flash ${fx === "bad" ? "sd-court-flash--bad" : ""}`} />
          <div className={`sd-rim-burst ${fx === "bad" ? "sd-rim-burst--bad" : ""}`} />
        </div>
      )}
    </div>
  );
}
