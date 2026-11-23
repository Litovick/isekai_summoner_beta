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
      <section className="ds-bottom-panel" aria-label="행동 선택">
        <div className="ds-choice-box">
          <div className="ds-choice-header">
            <span className="ds-choice-kicker">DECISION · 칼날의 선택</span>
            <h2 className="ds-choice-prompt">{prompt}</h2>
          </div>
          <div className="ds-choices-grid">
            {choices.map((choice, idx) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => onChoose(idx)}
                className="ds-choice-btn"
              >
                <span className="ds-choice-badge">{choice.id}</span>
                <span className="ds-choice-label">{choice.label}</span>
                <ChevronRight size={18} className="ds-choice-arrow" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ds-bottom-panel">
      <button
        type="button"
        onClick={onAdvance}
        className="ds-dialogue-card"
        aria-label={
          isComplete ? "다음 대사로 진행" : "대사 전체 출력"
        }
      >
        <div
          className="ds-speaker-plate"
          style={
            speakerMeta
              ? ({ "--plate-accent": speakerMeta.accentColor } as React.CSSProperties)
              : undefined
          }
        >
          <span className="ds-speaker-name">
            {speakerMeta ? speakerMeta.name : "해설"}
          </span>
          {speakerMeta && (
            <span className="ds-speaker-title">{speakerMeta.title}</span>
          )}
        </div>

        <p className="ds-dialogue-text">
          {text.slice(0, shownLength)}
          {!isComplete && <span className="ds-caret" aria-hidden="true">▌</span>}
        </p>

        <div className="ds-dialogue-footer">
          {phase === "reaction" && lastDelta ? (
            <div className="ds-reaction-deltas" aria-label="능력치 변화">
              <span>
                전집중 호흡 {lastDelta.breathing >= 0 ? `+${lastDelta.breathing}` : lastDelta.breathing}
              </span>
              <span>
                신뢰도 {lastDelta.trust >= 0 ? `+${lastDelta.trust}` : lastDelta.trust}
              </span>
              <span>
                결의 {lastDelta.resolve >= 0 ? `+${lastDelta.resolve}` : lastDelta.resolve}
              </span>
            </div>
          ) : (
            <span />
          )}

          <span className="ds-dialogue-next">
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
