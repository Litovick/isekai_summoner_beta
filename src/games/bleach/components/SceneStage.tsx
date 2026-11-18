import { CHARACTERS } from "../data/characters";
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

const REIATSU_SHARDS = [
  { angle: "-32deg", tone: "white", delay: "0ms" },
  { angle: "14deg", tone: "blue", delay: "25ms" },
  { angle: "148deg", tone: "white", delay: "10ms" },
  { angle: "-145deg", tone: "blue", delay: "30ms" },
  { angle: "62deg", tone: "blue", delay: "15ms" },
  { angle: "-112deg", tone: "white", delay: "20ms" },
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
      className={`bl-character ${active ? "bl-character--active" : "bl-character--idle"} ${
        meta.isSpirit ? "bl-character--spirit" : ""
      }`}
      style={{ "--char-accent": meta.accentColor } as React.CSSProperties}
      data-character={id}
      data-active={active ? "true" : "false"}
    >
      <div className="bl-character-figure">
        <img
          src={meta.image}
          alt={meta.name}
          className="bl-character-img"
        />
      </div>
      <div className="bl-character-plate">
        <span className="bl-character-name">{meta.name}</span>
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
  // Always ensure the speaking character is rendered on stage
  const visibleCast: CharacterId[] = (() => {
    const base = [...cast];
    if (activeSpeaker !== "narrator" && !base.includes(activeSpeaker)) {
      base.push(activeSpeaker);
    }
    return base.slice(0, 7);
  })();

  const isEnsemble = visibleCast.length >= 5;

  return (
    <div
      className={`bl-stage ${isChoicePhase ? "bl-stage--choice" : ""} ${
        isImpacting ? "bl-stage--shake" : ""
      }`}
      data-stage-theme={stageTheme}
      data-impacting={isImpacting ? "true" : "false"}
      data-impact-tick={impactTick}
    >
      {/* Pure CSS Layered Bleach Atmosphere */}
      <div
        className={`bl-backdrop bl-env bl-env--${stageTheme}`}
        role="region"
        aria-label={location}
      >
        <div className="bl-env-sky" aria-hidden="true" />
        <div className="bl-env-celestial" aria-hidden="true" />
        <div className="bl-env-silhouette" aria-hidden="true" />
        <div className="bl-env-aura" aria-hidden="true" />
        <div className="bl-env-mist" aria-hidden="true" />

        <div className="bl-env-particles" aria-hidden="true">
          {PARTICLE_SEEDS.map((p, idx) => (
            <span
              key={idx}
              className={`bl-particle ${idx % 2 === 0 ? "bl-particle--a" : "bl-particle--b"}`}
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

        <div className="bl-backdrop-vignette" aria-hidden="true" />
      </div>

      {/* Full-body Transparent PNG Character Standees */}
      <div
        className={`bl-cast ${isEnsemble ? "bl-cast--ensemble" : ""}`}
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

      {/* Diagonal White & Blue Getsuga Slash Line + Reiatsu Crash Overlay */}
      {isImpacting && impactTick > 0 && (
        <div
          key={impactTick}
          className={`bl-impact-fx bl-impact-fx--${mood} ${
            impactTick % 2 === 0 ? "bl-impact-fx--flip" : ""
          }`}
          aria-hidden="true"
        >
          <div className="bl-impact-flash" />
          <svg
            className="bl-slash-svg"
            viewBox="0 0 800 420"
            preserveAspectRatio="none"
          >
            <path
              className="bl-slash-trail"
              d="M -30 390 Q 380 200 830 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <path
              className="bl-slash-core"
              d="M -30 390 Q 380 200 830 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              className="bl-slash-sub"
              d="M 110 410 Q 430 250 760 88"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <div className="bl-reiatsu-shards">
            {REIATSU_SHARDS.map((shard, idx) => (
              <span
                key={idx}
                className={`bl-reiatsu-shard bl-reiatsu-shard--${shard.tone}`}
                style={
                  {
                    "--r-angle": shard.angle,
                    "--r-delay": shard.delay,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="bl-reiatsu-ring" />
          <div className="bl-reiatsu-crash" />
        </div>
      )}
    </div>
  );
}
