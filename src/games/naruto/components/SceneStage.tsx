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

const CHAKRA_STREAMS = [
  { angle: "0deg", tone: "blue", delay: "0ms" },
  { angle: "45deg", tone: "gold", delay: "20ms" },
  { angle: "90deg", tone: "blue", delay: "10ms" },
  { angle: "135deg", tone: "gold", delay: "30ms" },
  { angle: "180deg", tone: "blue", delay: "15ms" },
  { angle: "225deg", tone: "gold", delay: "25ms" },
  { angle: "270deg", tone: "blue", delay: "5ms" },
  { angle: "315deg", tone: "gold", delay: "35ms" },
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
      className={`nr-character ${active ? "nr-character--active" : "nr-character--idle"} ${
        meta.isShadow ? "nr-character--shadow" : ""
      }`}
      style={{ "--char-accent": meta.accentColor } as React.CSSProperties}
      data-character={id}
      data-active={active ? "true" : "false"}
    >
      <div className="nr-character-figure">
        <img
          src={meta.image}
          alt={meta.name}
          className="nr-character-img"
        />
      </div>
      <div className="nr-character-plate">
        <span className="nr-character-name">{meta.name}</span>
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
    return base.slice(0, 6);
  })();

  const isEnsemble = visibleCast.length >= 5;

  return (
    <div
      className={`nr-stage ${isChoicePhase ? "nr-stage--choice" : ""} ${
        isImpacting ? "nr-stage--shake" : ""
      }`}
      data-stage-theme={stageTheme}
      data-impacting={isImpacting ? "true" : "false"}
      data-impact-tick={impactTick}
    >
      {/* Pure CSS Layered Shinobi Environment */}
      <div
        className={`nr-backdrop nr-env nr-env--${stageTheme}`}
        role="region"
        aria-label={location}
      >
        <div className="nr-env-sky" aria-hidden="true" />
        <div className="nr-env-celestial" aria-hidden="true" />
        <div className="nr-env-silhouette" aria-hidden="true" />
        <div className="nr-env-aura" aria-hidden="true" />
        <div className="nr-env-mist" aria-hidden="true" />

        <div className="nr-env-particles" aria-hidden="true">
          {PARTICLE_SEEDS.map((p, idx) => (
            <span
              key={idx}
              className={`nr-particle ${idx % 2 === 0 ? "nr-particle--a" : "nr-particle--b"}`}
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

        <div className="nr-backdrop-vignette" aria-hidden="true" />
      </div>

      {/* Full-body Transparent PNG Character Standees */}
      <div
        className={`nr-cast ${isEnsemble ? "nr-cast--ensemble" : ""}`}
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

      {/* Two-Stage Chakra Condensation (0-0.35s) -> Release Burst (0.35-0.62s) Overlay */}
      {isImpacting && impactTick > 0 && (
        <div
          key={impactTick}
          className={`nr-chakra-fx nr-chakra-fx--${mood}`}
          aria-hidden="true"
        >
          <div className="nr-chakra-vignette" />
          <div className="nr-chakra-streams">
            {CHAKRA_STREAMS.map((stream, idx) => (
              <span
                key={idx}
                className={`nr-chakra-stream nr-chakra-stream--${stream.tone}`}
                style={
                  {
                    "--s-angle": stream.angle,
                    "--s-delay": stream.delay,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="nr-chakra-core" />
          <div className="nr-chakra-ring nr-chakra-ring--blue" />
          <div className="nr-chakra-ring nr-chakra-ring--gold" />
          <div className="nr-chakra-burst" />
        </div>
      )}
    </div>
  );
}
