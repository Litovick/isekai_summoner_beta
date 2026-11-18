import { useEffect, useState } from "react";
import { CHARACTERS } from "../data/characters";
import type { CharacterId } from "../types";

interface SceneStageProps {
  background: string;
  location: string;
  sceneDescription: string;
  cast: CharacterId[];
  activeSpeaker: CharacterId | "narrator";
  mood?: "neutral" | "good" | "bad";
  isChoicePhase?: boolean;
  isImpacting?: boolean;
  impactTick?: number;
}

function CharacterStandee({
  id,
  active,
}: {
  id: CharacterId;
  active: boolean;
}) {
  const meta = CHARACTERS[id];
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [meta.image]);

  return (
    <div
      className={`ds-character ${active ? "ds-character--active" : "ds-character--idle"} ${
        meta.isEnemy ? "ds-character--enemy" : ""
      }`}
      style={{ "--char-accent": meta.accentColor } as React.CSSProperties}
      data-character={id}
      data-active={active ? "true" : "false"}
    >
      <div className="ds-character-figure">
        {!imgError ? (
          <img
            src={meta.image}
            alt={meta.name}
            className="ds-character-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="ds-character-fallback" aria-label={meta.name}>
            <div className="ds-character-tanzaku">
              <span className="ds-tanzaku-rank">{meta.title}</span>
              <strong className="ds-tanzaku-name">{meta.name}</strong>
              <span className="ds-tanzaku-breath">{meta.breathing}</span>
            </div>
          </div>
        )}
      </div>
      <div className="ds-character-plate">
        <span className="ds-character-name">{meta.name}</span>
      </div>
    </div>
  );
}

export function SceneStage({
  background,
  location,
  sceneDescription,
  cast,
  activeSpeaker,
  mood = "neutral",
  isChoicePhase = false,
  isImpacting = false,
  impactTick = 0,
}: SceneStageProps) {
  const [bgError, setBgError] = useState(false);

  useEffect(() => {
    setBgError(false);
  }, [background]);

  // Guarantee the active speaking character is always visible on stage
  const visibleCast: CharacterId[] = (() => {
    const base = [...cast];
    if (activeSpeaker !== "narrator" && !base.includes(activeSpeaker)) {
      if (base.length >= 4) {
        base[base.length - 1] = activeSpeaker;
      } else {
        base.push(activeSpeaker);
      }
    }
    return base.slice(0, 4);
  })();

  const shouldShake = isImpacting;

  return (
    <div
      className={`ds-stage ${isChoicePhase ? "ds-stage--choice" : ""} ${
        shouldShake ? "ds-stage--shake" : ""
      }`}
      data-impacting={isImpacting ? "true" : "false"}
      data-impact-tick={impactTick}
    >
      {/* Background layer with safe fallback */}
      <div className="ds-backdrop">
        {!bgError ? (
          <img
            src={background}
            alt={location}
            className="ds-backdrop-img"
            onError={() => setBgError(true)}
          />
        ) : (
          <div className="ds-backdrop-fallback" role="region" aria-label="장면 묘사">
            <div className="ds-fallback-pattern" aria-hidden="true" />
            <div className="ds-fallback-card">
              <span className="ds-fallback-kicker">SCENE ARCHIVE · {location}</span>
              <p className="ds-fallback-desc">{sceneDescription}</p>
            </div>
          </div>
        )}
        <div className="ds-backdrop-vignette" aria-hidden="true" />
      </div>

      {/* Subtle wisteria & nichirin ember atmosphere */}
      <div className="ds-wisteria-mist" aria-hidden="true" />

      {/* Transparent PNG Character Stage */}
      <div className="ds-cast" aria-label="등장인물 무대">
        {visibleCast.map((charId) => (
          <CharacterStandee
            key={charId}
            id={charId}
            active={activeSpeaker === charId}
          />
        ))}
      </div>

      {/* Choice Strike Impact & Nichirin Slash Overlay */}
      {isImpacting && impactTick > 0 && (
        <div
          key={impactTick}
          className={`ds-impact-fx ds-impact-fx--${mood}`}
          aria-hidden="true"
        >
          <div className="ds-impact-flash" />
          <svg viewBox="0 0 600 300" className="ds-impact-slash" preserveAspectRatio="none">
            <path
              d="M40 250 Q300 130 565 45"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M70 265 Q310 150 545 75"
              fill="none"
              stroke="#fff8ee"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="ds-impact-ring" />
        </div>
      )}
    </div>
  );
}
