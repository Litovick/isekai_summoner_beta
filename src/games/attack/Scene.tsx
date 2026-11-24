import { useEffect, useState } from "react";
import {
  backgroundFallbacks,
  endingBackground,
  missionBackgrounds,
  portraits,
} from "./game/attack-images";
import { playAttackSound, type AttackSoundKind } from "./game/attack-sound";

export const AOT_PEOPLE: Record<
  string,
  { name: string; role: string; initial: string; color: string }
> = {
  엘빈: { name: "엘빈 스미스", role: "조사병단 13대 단장", initial: "E", color: "#b9a27b" },
  리바이: { name: "리바이 아커만", role: "조사병단 병장", initial: "L", color: "#86b394" },
  미카사: { name: "미카사 아커만", role: "정예 조사병단원", initial: "M", color: "#dc2626" },
  아르민: { name: "아르민 알레르토", role: "작전 참모", initial: "A", color: "#d4c6a4" },
  한지: { name: "한지 조에", role: "분대장 · 거인 연구관", initial: "H", color: "#9d8d72" },
};

export function useTypewriter(text: string, speed = 22) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    if (!text) return;
    const id = window.setInterval(() => {
      setN((v) => Math.min(text.length, v + 2));
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return {
    shown: text.slice(0, n),
    done: n >= text.length,
    finish: () => setN(text.length),
  };
}

export function beep(type: AttackSoundKind, muted: boolean) {
  playAttackSound(type, muted);
}

export function Scene({
  index,
  speaker,
  location,
  mood = "neutral",
  mode = "story",
  isImpacting = false,
  impactTick = 0,
}: {
  index: number;
  speaker: string;
  location?: string;
  children?: React.ReactNode;
  mood?: "neutral" | "good" | "bad";
  mode?: "story" | "choice" | "reaction" | "ending";
  isImpacting?: boolean;
  impactTick?: number;
}) {
  const primaryUrl: string =
    mode === "ending" ? endingBackground : (missionBackgrounds[index] ?? missionBackgrounds[0]!);
  const [bgSrc, setBgSrc] = useState<string>(primaryUrl);
  const [broken, setBroken] = useState(false);
  const [portraitBroken, setPortraitBroken] = useState(false);

  useEffect(() => {
    setBgSrc(primaryUrl);
    setBroken(false);
  }, [primaryUrl]);

  useEffect(() => {
    setPortraitBroken(false);
  }, [speaker]);

  const handleBgError = () => {
    const fb = backgroundFallbacks[bgSrc];
    if (fb && fb !== bgSrc) {
      setBgSrc(fb);
      return;
    }
    setBroken(true);
  };

  const personMeta = AOT_PEOPLE[speaker] ?? AOT_PEOPLE["엘빈"]!;
  const portraitSrc = portraits[speaker] ?? portraits["엘빈"];

  return (
    <div
      className={`aot-stage aot-stage--${mode} ${isImpacting ? "aot-stage--shake" : ""}`}
      data-impacting={isImpacting ? "true" : "false"}
      data-impact-tick={impactTick}
    >
      <div className="aot-backdrop" role="region" aria-label={location ?? "조사병단 작전 구역"}>
        {!broken && (
          <div
            className="aot-bg-photo"
            style={{ backgroundImage: `url("${encodeURI(bgSrc)}")` }}
            data-bg-src={bgSrc}
            aria-hidden="true"
          >
            <img src={bgSrc} alt="" decoding="async" onError={handleBgError} />
          </div>
        )}
        <div className="aot-backdrop-vignette" aria-hidden="true" />
      </div>

      <div className="aot-stage-badge">
        {location ?? `EXPEDITION ${String(index + 1).padStart(2, "0")}`}
      </div>

      <div className="aot-cast" aria-label={`${personMeta.name} 등장 무대`}>
        <div
          key={speaker}
          className={`aot-character aot-character--active ${
            mood === "bad" ? "aot-character--bad" : ""
          }`}
          data-character={speaker}
          data-active="true"
        >
          <div className="aot-character-figure">
            {portraitSrc && !portraitBroken ? (
              <img
                src={portraitSrc}
                alt={personMeta.name}
                decoding="async"
                className="aot-character-img"
                onError={() => setPortraitBroken(true)}
              />
            ) : (
              <div className="aot-character-fallback" aria-label={personMeta.name}>
                <strong>{personMeta.initial}</strong>
              </div>
            )}
          </div>
          <div className="aot-character-plate">
            <span>{personMeta.name}</span>
          </div>
        </div>
      </div>

      {isImpacting && impactTick > 0 && (
        <div
          key={impactTick}
          className={`aot-slash-fx ${mood === "bad" ? "aot-slash-fx--bad" : ""}`}
          aria-hidden="true"
        >
          <div className="aot-slash-flash" />
          <svg
            className="aot-slash-arc"
            viewBox="0 0 800 420"
            preserveAspectRatio="none"
          >
            <path
              d="M 110 340 Q 410 175 710 64"
              fill="none"
              stroke={mood === "bad" ? "rgba(239, 68, 68, 0.72)" : "rgba(134, 179, 148, 0.72)"}
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 110 340 Q 410 175 710 64"
              fill="none"
              stroke="#fdf8ee"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
