import { useEffect, useState } from "react";
import { CHARACTERS } from "../data/characters";
import {
  getDemonSlayerStageBackground,
  toDemonSlayerBgUrl,
} from "../data/backgrounds";
import type { CharacterId, EpisodeStageTheme } from "../types";

interface SceneStageProps {
  stageTheme: EpisodeStageTheme;
  location: string;
  cast: CharacterId[];
  activeSpeaker: CharacterId | "narrator";
  mood?: "neutral" | "good" | "bad";
  isChoicePhase?: boolean;
  isImpacting?: boolean;
  impactTick?: number;
}

const PARTICLE_SEEDS = [
  { x: "7%", y: "18%", delay: "0s", dur: "6.4s", size: "11px", rot: "18deg" },
  { x: "16%", y: "62%", delay: "-1.3s", dur: "5.8s", size: "9px", rot: "-24deg" },
  { x: "24%", y: "34%", delay: "-2.7s", dur: "7.2s", size: "13px", rot: "42deg" },
  { x: "35%", y: "76%", delay: "-0.8s", dur: "5.2s", size: "10px", rot: "-15deg" },
  { x: "45%", y: "22%", delay: "-3.4s", dur: "6.8s", size: "12px", rot: "30deg" },
  { x: "56%", y: "68%", delay: "-1.9s", dur: "5.6s", size: "9px", rot: "-38deg" },
  { x: "66%", y: "28%", delay: "-4.1s", dur: "7.0s", size: "14px", rot: "25deg" },
  { x: "75%", y: "74%", delay: "-2.2s", dur: "5.4s", size: "10px", rot: "-12deg" },
  { x: "84%", y: "40%", delay: "-0.5s", dur: "6.3s", size: "12px", rot: "48deg" },
  { x: "92%", y: "58%", delay: "-3.0s", dur: "5.9s", size: "9px", rot: "-30deg" },
  { x: "51%", y: "86%", delay: "-1.1s", dur: "6.1s", size: "11px", rot: "12deg" },
  { x: "12%", y: "84%", delay: "-2.6s", dur: "6.6s", size: "10px", rot: "-42deg" },
];

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
            decoding="async"
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
  stageTheme,
  location,
  cast,
  activeSpeaker,
  mood = "neutral",
  isChoicePhase = false,
  isImpacting = false,
  impactTick = 0,
}: SceneStageProps) {
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

  const backgroundPath = getDemonSlayerStageBackground(stageTheme);

  return (
    <div
      className={`ds-stage ${isChoicePhase ? "ds-stage--choice" : ""} ${
        isImpacting ? "ds-stage--shake" : ""
      }`}
      data-stage-theme={stageTheme}
      data-impacting={isImpacting ? "true" : "false"}
      data-impact-tick={impactTick}
    >
      {/* Original Anime Stage Background Photo + Atmospheric Particles */}
      <div
        className={`ds-backdrop ds-env ds-env--${stageTheme} ds-backdrop--photo`}
        role="region"
        aria-label={location}
      >
        <div
          className="ds-bg-photo"
          style={{ backgroundImage: toDemonSlayerBgUrl(backgroundPath) }}
          data-bg-src={backgroundPath}
          aria-hidden="true"
        />
        <div className="ds-env-mist" aria-hidden="true" />

        <div className="ds-env-particles" aria-hidden="true">
          {PARTICLE_SEEDS.map((p, idx) => (
            <span
              key={idx}
              className={`ds-particle ${idx % 2 === 0 ? "ds-particle--a" : "ds-particle--b"}`}
              style={
                {
                  "--p-x": p.x,
                  "--p-y": p.y,
                  "--p-delay": p.delay,
                  "--p-dur": p.dur,
                  "--p-size": p.size,
                  "--p-rot": p.rot,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="ds-backdrop-vignette" aria-hidden="true" />
      </div>

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
          className={`ds-impact-fx ds-impact-fx--${mood} ${
            impactTick % 2 === 0 ? "ds-impact-fx--reverse" : ""
          }`}
          aria-hidden="true"
        >
          <div className="ds-impact-flash" />
          <svg viewBox="0 0 600 300" className="ds-impact-slash" preserveAspectRatio="none">
            <path
              className="ds-slash-trail"
              d="M40 250 Q300 130 565 45"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              className="ds-slash-core"
              d="M62 256 Q306 140 554 62"
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
