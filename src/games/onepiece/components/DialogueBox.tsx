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
      <section className="op-bottom-panel" aria-label="항해의 선택">
        <div className="op-choice-box">
          <div className="op-choice-header">
            <span className="op-choice-kicker">GRAND LINE DECISION · 운명의 항로 선택</span>
            <h2 className="op-choice-prompt">{prompt}</h2>
          </div>
          <div className="op-choices-grid">
            {choices.map((choice, idx) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => onChoose(idx)}
                className="op-choice-btn"
              >
                <span className="op-choice-badge">{choice.id}</span>
                <span className="op-choice-label">{choice.label}</span>
                <ChevronRight size={18} className="op-choice-arrow" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="op-bottom-panel">
      <button
        type="button"
        onClick={onAdvance}
        className="op-dialogue-card"
        aria-label={isComplete ? "다음 대사로 진행" : "대사 전체 출력"}
      >
        <div
          className="op-speaker-plate"
          style={
            speakerMeta
              ? ({ "--plate-accent": speakerMeta.accentColor } as React.CSSProperties)
              : undefined
          }
        >
          <span className="op-speaker-name">
            {speakerMeta ? speakerMeta.name : "해설"}
          </span>
          {speakerMeta && (
            <span className="op-speaker-title">{speakerMeta.title}</span>
          )}
        </div>

        <p className="op-dialogue-text">
          {text.slice(0, shownLength)}
          {!isComplete && <span className="op-caret" aria-hidden="true">▌</span>}
        </p>

        <div className="op-dialogue-footer">
          {phase === "reaction" && lastDelta ? (
            <div className="op-reaction-deltas" aria-label="능력치 변화">
              <span>
                패기와 전투력{" "}
                {lastDelta.haki >= 0 ? `+${lastDelta.haki}` : lastDelta.haki}
              </span>
              <span>
                동료의 신뢰{" "}
                {lastDelta.trust >= 0 ? `+${lastDelta.trust}` : lastDelta.trust}
              </span>
              <span>
                항해와 모험심{" "}
                {lastDelta.adventure >= 0
                  ? `+${lastDelta.adventure}`
                  : lastDelta.adventure}
              </span>
            </div>
          ) : (
            <span />
          )}

          <span className="op-dialogue-next">
            {!isComplete
              ? "클릭하여 스킵"
              : phase === "reaction" && isFinalStep
              ? "최종 항해 결과 확인"
              : "계속 진행"}{" "}
            <ChevronRight size={15} aria-hidden="true" />
          </span>
        </div>
      </button>
    </section>
  );
}
