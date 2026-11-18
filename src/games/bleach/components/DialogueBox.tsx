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
      <section className="bl-bottom-panel" aria-label="사신 대행의 선택">
        <div className="bl-choice-box">
          <div className="bl-choice-header">
            <span className="bl-choice-kicker">ZANPAKUTO DECISION · 영압의 선택</span>
            <h2 className="bl-choice-prompt">{prompt}</h2>
          </div>
          <div className="bl-choices-grid">
            {choices.map((choice, idx) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => onChoose(idx)}
                className="bl-choice-btn"
              >
                <span className="bl-choice-badge">{choice.id}</span>
                <div className="bl-choice-copy">
                  <span className="bl-choice-stance">{choice.stance}</span>
                  <span className="bl-choice-label">{choice.label}</span>
                </div>
                <ChevronRight size={18} className="bl-choice-arrow" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bl-bottom-panel">
      <button
        type="button"
        onClick={onAdvance}
        className="bl-dialogue-card"
        aria-label={isComplete ? "다음 대사로 진행" : "대사 전체 출력"}
      >
        <div
          className="bl-speaker-plate"
          style={
            speakerMeta
              ? ({ "--plate-accent": speakerMeta.accentColor } as React.CSSProperties)
              : undefined
          }
        >
          <span className="bl-speaker-name">
            {speakerMeta ? speakerMeta.name : "해설"}
          </span>
          {speakerMeta && (
            <span className="bl-speaker-title">{speakerMeta.title}</span>
          )}
        </div>

        <p className="bl-dialogue-text">
          {text.slice(0, shownLength)}
          {!isComplete && <span className="bl-caret" aria-hidden="true">▌</span>}
        </p>

        <div className="bl-dialogue-footer">
          {phase === "reaction" && lastDelta ? (
            <div className="bl-reaction-deltas" aria-label="능력치 변화">
              <span>
                영압 제어{" "}
                {lastDelta.reiatsu >= 0
                  ? `+${lastDelta.reiatsu}`
                  : lastDelta.reiatsu}
              </span>
              <span>
                동료의 유대{" "}
                {lastDelta.bond >= 0 ? `+${lastDelta.bond}` : lastDelta.bond}
              </span>
              <span>
                수호의 각오{" "}
                {lastDelta.resolve >= 0
                  ? `+${lastDelta.resolve}`
                  : lastDelta.resolve}
              </span>
            </div>
          ) : (
            <span />
          )}

          <span className="bl-dialogue-next">
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
