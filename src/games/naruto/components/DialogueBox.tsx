import { ChevronRight } from "lucide-react";
import { CHARACTERS } from "../data/characters";
import type { CharacterId, EpisodeChoice, Stats } from "../types";

interface DialogueBoxProps {
  phase: "story" | "choice" | "reaction";
  speaker: CharacterId | "narrator";
  text: string;
  shownLength: number;
  isComplete: boolean;
  prompt: string;
  choices: [EpisodeChoice, EpisodeChoice, EpisodeChoice];
  lastDelta: Stats | null;
  isFinalStep: boolean;
  onAdvance: () => void;
  onChoose: (index: number) => void;
}

export function DialogueBox({
  phase,
  speaker,
  text,
  shownLength,
  isComplete,
  prompt,
  choices,
  lastDelta,
  isFinalStep,
  onAdvance,
  onChoose,
}: DialogueBoxProps) {
  const speakerMeta = speaker === "narrator" ? null : CHARACTERS[speaker];

  if (phase === "choice") {
    return (
      <section className="nr-bottom-panel" aria-label="닌자도의 선택">
        <div className="nr-choice-box">
          <div className="nr-choice-header">
            <span className="nr-choice-kicker">SHINOBI DECISION · 인법의 선택</span>
            <h2 className="nr-choice-prompt">{prompt}</h2>
          </div>
          <div className="nr-choices-grid">
            {choices.map((choice, idx) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => onChoose(idx)}
                className="nr-choice-btn"
              >
                <span className="nr-choice-badge">{choice.id}</span>
                <span className="nr-choice-label">{choice.label}</span>
                <ChevronRight size={18} className="nr-choice-arrow" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="nr-bottom-panel">
      <button
        type="button"
        onClick={onAdvance}
        className="nr-dialogue-card"
        aria-label={isComplete ? "다음 대사로 진행" : "대사 전체 출력"}
      >
        <div
          className="nr-speaker-plate"
          style={
            speakerMeta
              ? ({ "--plate-accent": speakerMeta.accentColor } as React.CSSProperties)
              : undefined
          }
        >
          <span className="nr-speaker-name">
            {speakerMeta ? speakerMeta.name : "해설"}
          </span>
          {speakerMeta && (
            <span className="nr-speaker-title">{speakerMeta.title}</span>
          )}
        </div>

        <p className="nr-dialogue-text">
          {text.slice(0, shownLength)}
          {!isComplete && <span className="nr-caret" aria-hidden="true">▌</span>}
        </p>

        <div className="nr-dialogue-footer">
          {phase === "reaction" && lastDelta ? (
            <div className="nr-reaction-deltas" aria-label="능력치 변화">
              <span>
                인술 숙련도{" "}
                {lastDelta.ninjutsu >= 0
                  ? `+${lastDelta.ninjutsu}`
                  : lastDelta.ninjutsu}
              </span>
              <span>
                동료의 유대{" "}
                {lastDelta.bond >= 0 ? `+${lastDelta.bond}` : lastDelta.bond}
              </span>
              <span>
                불의 의지{" "}
                {lastDelta.willOfFire >= 0
                  ? `+${lastDelta.willOfFire}`
                  : lastDelta.willOfFire}
              </span>
            </div>
          ) : (
            <span />
          )}

          <span className="nr-dialogue-next">
            {!isComplete
              ? "클릭하여 스킵"
              : phase === "reaction" && isFinalStep
              ? "최종 결과 확인"
              : "계속 진행"}{" "}
            <ChevronRight size={15} aria-hidden="true" />
          </span>
        </div>
      </button>
    </section>
  );
}
