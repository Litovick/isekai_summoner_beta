import { useEffect, useState } from "react";
import { ArrowLeft, Award, Flame, RotateCcw, Shield, Sword } from "lucide-react";
import { CHARACTERS } from "../data/characters";
import { ENDINGS, ENDING_ORDER } from "../data/endings";
import type {
  CharacterEvaluation,
  EndingId,
  EndingInfo,
  Stats,
} from "../types";

interface ResultScreenProps {
  ending: EndingInfo;
  stats: Stats;
  evaluations: CharacterEvaluation[];
  unlockedEndings: EndingId[];
  onRestart: () => void;
  onReturnWorldSelect: () => void;
}

export function ResultScreen({
  ending,
  stats,
  evaluations,
  unlockedEndings,
  onRestart,
  onReturnWorldSelect,
}: ResultScreenProps) {
  const [endingImgError, setEndingImgError] = useState(false);
  const [quoteCharError, setQuoteCharError] = useState(false);

  useEffect(() => {
    setEndingImgError(false);
    setQuoteCharError(false);
  }, [ending.id]);

  const speakerMeta = CHARACTERS[ending.speaker];

  return (
    <section className="ds-result-screen" aria-label="최종 결과 및 캐릭터 평가">
      {/* Ending Hero Card */}
      <div className="ds-ending-hero">
        <div className="ds-ending-badge-row">
          <span className="ds-ending-kicker">FINAL VERDICT · 귀살대 최종 기록</span>
          <span className="ds-ending-cond">{ending.conditionLabel}</span>
        </div>

        <h1 className="ds-ending-title">{ending.title}</h1>
        <p className="ds-ending-subtitle">{ending.subtitle}</p>

        {/* Ending Artwork with safe text fallback */}
        <div className="ds-ending-visual">
          {!endingImgError ? (
            <img
              src={ending.image}
              alt={ending.title}
              className="ds-ending-img"
              onError={() => setEndingImgError(true)}
            />
          ) : (
            <div className="ds-ending-fallback">
              <div className="ds-fallback-pattern" aria-hidden="true" />
              <div className="ds-ending-fallback-inner">
                <span className="ds-fallback-kicker">
                  ENDING SCENE · {ending.id.toUpperCase()}
                </span>
                <p>{ending.fallbackDescription}</p>
              </div>
            </div>
          )}
        </div>

        <p className="ds-ending-desc">{ending.description}</p>

        {/* Key Character Quote with transparent PNG */}
        <div className="ds-ending-quote-box">
          <div className="ds-ending-quote-portrait">
            {!quoteCharError ? (
              <img
                src={speakerMeta.image}
                alt={speakerMeta.name}
                onError={() => setQuoteCharError(true)}
              />
            ) : (
              <div className="ds-quote-char-fallback">
                <span>{speakerMeta.title}</span>
                <strong>{speakerMeta.name}</strong>
              </div>
            )}
          </div>
          <div className="ds-ending-quote-copy">
            <div className="ds-ending-quote-speaker">
              <strong>{speakerMeta.name}</strong>
              <span>{speakerMeta.title}</span>
            </div>
            <blockquote>“{ending.quote}”</blockquote>
          </div>
        </div>

        {/* Final 3 Stats */}
        <div className="ds-final-stats">
          <div className="ds-final-stat">
            <Sword size={18} aria-hidden="true" />
            <span>전집중 호흡</span>
            <b>{stats.breathing}</b>
          </div>
          <div className="ds-final-stat">
            <Shield size={18} aria-hidden="true" />
            <span>귀살대 신뢰도</span>
            <b>{stats.trust}</b>
          </div>
          <div className="ds-final-stat">
            <Flame size={18} aria-hidden="true" />
            <span>불굴의 결의</span>
            <b>{stats.resolve}</b>
          </div>
        </div>
      </div>

      {/* 13 Corps Characters Evaluation Grid */}
      <div className="ds-eval-section">
        <div className="ds-eval-header">
          <span className="ds-eval-kicker">CORPS EVALUATION · 13인의 평가</span>
          <h2>동료 및 주(柱)들의 개별 평가</h2>
          <p>
            8개의 임무에서 당신이 내린 선택을 귀살대 동료와 9명의 주(柱)가 각자의 신념으로 평가했습니다.
          </p>
        </div>

        <div className="ds-eval-grid">
          {evaluations.map((ev) => (
            <EvaluationCard key={ev.id} evaluation={ev} />
          ))}
        </div>
      </div>

      {/* Ending Archive Status */}
      <div className="ds-archive-strip" aria-label="엔딩 달성 현황">
        <div className="ds-archive-head">
          <Award size={18} aria-hidden="true" />
          <strong>엔딩 도감 ({unlockedEndings.length} / 4 해금)</strong>
        </div>
        <div className="ds-archive-list">
          {ENDING_ORDER.map((eid) => {
            const info = ENDINGS[eid];
            const unlocked = unlockedEndings.includes(eid);
            const active = eid === ending.id;
            return (
              <div
                key={eid}
                className={`ds-archive-item ${unlocked ? "unlocked" : "locked"} ${
                  active ? "current" : ""
                }`}
              >
                <span className="ds-archive-num">
                  ENDING 0{info.priority}
                </span>
                <strong>{unlocked ? info.title : "??? 미해금 엔딩"}</strong>
                <small>{unlocked ? info.conditionLabel : "다른 선택으로 해금"}</small>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action CTAs */}
      <div className="ds-result-actions">
        <button type="button" onClick={onRestart} className="ds-btn-primary">
          <RotateCcw size={18} />
          다시 플레이하기
        </button>
        <button
          type="button"
          onClick={onReturnWorldSelect}
          className="ds-btn-secondary"
        >
          <ArrowLeft size={18} />
          작품 선택으로 돌아가기
        </button>
      </div>
    </section>
  );
}

function EvaluationCard({ evaluation }: { evaluation: CharacterEvaluation }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="ds-eval-card"
      style={{ "--eval-accent": evaluation.accentColor } as React.CSSProperties}
    >
      <div className="ds-eval-stage">
        {!imgError ? (
          <img
            src={evaluation.image}
            alt={evaluation.name}
            className="ds-eval-portrait"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="ds-eval-portrait-fallback">
            <span>{evaluation.title}</span>
            <strong>{evaluation.name}</strong>
          </div>
        )}
      </div>

      <div className="ds-eval-body">
        <div className="ds-eval-top">
          <div>
            <h3 className="ds-eval-name">{evaluation.name}</h3>
            <span className="ds-eval-rank">
              {evaluation.title} · {evaluation.breathing}
            </span>
          </div>
          <span className={`ds-grade-badge ds-grade-${evaluation.grade}`}>
            {evaluation.grade}등급
          </span>
        </div>

        <div className="ds-eval-score-row">
          <span className="ds-eval-focus">{evaluation.focus}</span>
          <b className="ds-eval-score">{evaluation.score} / 100</b>
        </div>

        <div
          className="ds-eval-bar"
          role="progressbar"
          aria-label={`${evaluation.name} 평가 점수`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={evaluation.score}
        >
          <i style={{ width: `${evaluation.score}%` }} />
        </div>

        <p className="ds-eval-comment">“{evaluation.comment}”</p>
      </div>
    </article>
  );
}
