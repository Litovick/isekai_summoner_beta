import { CHARACTERS } from "../data/characters";
import { getOnePieceStageBackground, toOnePieceBgUrl } from "../data/backgrounds";
import type { CharacterId, EpisodeStageTheme } from "../types";
import { applyImageFallback } from "./imageFallback";

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
  { x: "7%", y: "18%", delay: "0s", dur: "6.4s", size: "12px", rot: "18deg" },
  { x: "15%", y: "62%", delay: "-1.3s", dur: "5.8s", size: "10px", rot: "-24deg" },
  { x: "23%", y: "32%", delay: "-2.7s", dur: "7.2s", size: "13px", rot: "42deg" },
  { x: "34%", y: "74%", delay: "-0.8s", dur: "5.2s", size: "11px", rot: "-15deg" },
  { x: "45%", y: "22%", delay: "-3.4s", dur: "6.8s", size: "12px", rot: "30deg" },
  { x: "55%", y: "66%", delay: "-1.9s", dur: "5.6s", size: "10px", rot: "-38deg" },
  { x: "66%", y: "26%", delay: "-4.1s", dur: "7.0s", size: "14px", rot: "25deg" },
  { x: "75%", y: "72%", delay: "-2.2s", dur: "5.4s", size: "10px", rot: "-12deg" },
  { x: "84%", y: "38%", delay: "-0.5s", dur: "6.3s", size: "12px", rot: "48deg" },
  { x: "92%", y: "56%", delay: "-3.0s", dur: "5.9s", size: "10px", rot: "-30deg" },
  { x: "51%", y: "84%", delay: "-1.1s", dur: "6.1s", size: "11px", rot: "12deg" },
  { x: "11%", y: "82%", delay: "-2.6s", dur: "6.6s", size: "11px", rot: "-42deg" },
];

const HAKI_SPARK_RAYS = [
  { angle: "-28deg", tone: "crimson", delay: "0ms" },
  { angle: "18deg", tone: "violet", delay: "22ms" },
  { angle: "152deg", tone: "crimson", delay: "12ms" },
  { angle: "-148deg", tone: "gold", delay: "28ms" },
  { angle: "64deg", tone: "violet", delay: "16ms" },
  { angle: "-114deg", tone: "gold", delay: "18ms" },
  { angle: "108deg", tone: "crimson", delay: "8ms" },
  { angle: "-72deg", tone: "violet", delay: "26ms" },
];

function CharacterStandee({
  id,
  active,
}: {
  id: CharacterId;
  active: boolean;
}) {
  const meta = CHARACTERS[id];

  return (
    <div
      className={`op-character ${active ? "op-character--active" : "op-character--idle"} ${
        meta.isEmperor ? "op-character--emperor" : ""
      }`}
      style={{ "--char-accent": meta.accentColor } as React.CSSProperties}
      data-character={id}
      data-active={active ? "true" : "false"}
    >
      <div className="op-character-figure">
        <img
          src={meta.image}
          alt={meta.name}
          decoding="async"
          className="op-character-img"
          onError={(e) => applyImageFallback(e, meta.fallbackImage)}
        />
      </div>
      <div className="op-character-plate">
        <span className="op-character-name">{meta.name}</span>
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
  const visibleCast: CharacterId[] = (() => {
    const base = [...cast];
    if (activeSpeaker !== "narrator" && !base.includes(activeSpeaker)) {
      base.push(activeSpeaker);
    }
    return base.slice(0, 8);
  })();

  const isEnsemble = visibleCast.length >= 5;
  const backgroundPath = getOnePieceStageBackground(stageTheme);

  return (
    <div
      className={`op-stage ${isChoicePhase ? "op-stage--choice" : ""} ${
        isImpacting ? "op-stage--shake" : ""
      }`}
      data-stage-theme={stageTheme}
      data-impacting={isImpacting ? "true" : "false"}
      data-impact-tick={impactTick}
    >
      {/* Original Anime Stage Background Photo + Atmospheric Particles */}
      <div
        className={`op-backdrop op-env op-env--${stageTheme} op-backdrop--photo`}
        role="region"
        aria-label={location}
      >
        <div
          className="op-bg-photo"
          style={{ backgroundImage: toOnePieceBgUrl(backgroundPath) }}
          data-bg-src={backgroundPath}
          aria-hidden="true"
        />
        <div className="op-env-aura" aria-hidden="true" />

        <div className="op-env-particles" aria-hidden="true">
          {PARTICLE_SEEDS.map((p, idx) => (
            <span
              key={idx}
              className={`op-particle ${idx % 2 === 0 ? "op-particle--a" : "op-particle--b"}`}
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

        <div className="op-backdrop-vignette" aria-hidden="true" />
      </div>

      {/* Full-body Transparent PNG Character Standees */}
      <div
        className={`op-cast ${isEnsemble ? "op-cast--ensemble" : ""}`}
        aria-label="등장인물 무대"
      >
        {visibleCast.map((charId) => (
          <CharacterStandee
            key={charId}
            id={charId}
            active={activeSpeaker === charId}
          />
        ))}
      </div>

      {/* Observation Haki Precognition Pulse Overlay */}
      {isImpacting && impactTick > 0 && (
        <div
          key={impactTick}
          className={`op-haki-fx op-haki-fx--${mood} ${
            impactTick % 2 === 0 ? "op-haki-fx--flip" : ""
          }`}
          aria-hidden="true"
        >
          <div className="op-haki-flash" />
          <div className="op-haki-ring op-haki-ring--outer" />
          <div className="op-haki-ring op-haki-ring--inner" />
          <div className="op-haki-core" />
          <div className="op-haki-rays">
            {HAKI_SPARK_RAYS.map((ray, idx) => (
              <span
                key={idx}
                className={`op-haki-ray op-haki-ray--${ray.tone}`}
                style={
                  {
                    "--h-angle": ray.angle,
                    "--h-delay": ray.delay,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <svg
            className="op-haki-arcs"
            viewBox="0 0 800 420"
            preserveAspectRatio="none"
          >
            <path
              className="op-haki-arc-glow"
              d="M 80 280 Q 250 110 400 206 T 720 128"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              className="op-haki-arc-bolt"
              d="M 80 280 Q 250 110 400 206 T 720 128"
              fill="none"
              stroke="#fef08a"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
