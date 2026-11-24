import { ArrowLeft, Award, Flame, RotateCcw, Shield, Swords } from "lucide-react";
import { EndingShareAndReward } from "../../../components/EndingShareAndReward";
import { CHARACTERS } from "../data/characters";
import { BLEACH_BACKGROUNDS, toBleachBgUrl } from "../data/backgrounds";
import { ENDINGS, ENDING_ORDER } from "../data/endings";
import type {
  CharacterEvaluation,
  CharacterId,
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

function EndingShowcaseMember({
  id,
  slotIndex,
  total,
}: {
  id: CharacterId;
  slotIndex: number;
  total: number;
}) {
  const meta = CHARACTERS[id];
  const centerIdx = Math.floor(total / 2);
  const dist = Math.abs(slotIndex - centerIdx);
  const isCenter = dist === 0;

  return (
    <div
      className={`bl-ending-member ${isCenter ? "bl-ending-member--lead" : ""} bl-ending-member--d${dist}`}
      style={{ "--char-accent": meta.accentColor } as React.CSSProperties}
    >
      <img
        src={meta.image}
        alt={meta.name}
        className="bl-ending-member-img"
      />
    </div>
  );
}

export function ResultScreen({
  ending,
  stats,
  evaluations,
  unlockedEndings,
  onRestart,
  onReturnWorldSelect,
}: ResultScreenProps) {
  const speakerMeta = CHARACTERS[ending.speaker];
  const companionMeta = ending.companionQuote
    ? CHARACTERS[ending.companionQuote.speaker]
    : null;
  const isSadEnding = ending.id === "ending-04";
  const isHiddenEnding = ending.id === "ending-hidden";

  return (
    <section className="bl-result-screen" aria-label="최종 결과 및 캐릭터 평가">
      <div
        className={`bl-ending-hero ${
          isHiddenEnding
            ? "bl-ending-hero--hidden"
            : isSadEnding
            ? "bl-ending-hero--sad"
            : ""
        }`}
      >
        <div className="bl-ending-badge-row">
          <span className="bl-ending-kicker">SUBSTITUTE SHINIGAMI RECORD · 최종 임무 보고</span>
          <div className="bl-ending-badge-group">
            {isHiddenEnding && (
              <span className="bl-ending-hidden-badge">👑 히든 엔딩</span>
            )}
            <span className="bl-ending-cond">{ending.conditionLabel}</span>
          </div>
        </div>

        <h1 className="bl-ending-title">{ending.title}</h1>
        <p className="bl-ending-subtitle">{ending.subtitle}</p>

        {/* Original Anime Ending Backdrop + Layered Character PNG Ensemble */}
        <div className={`bl-ending-visual bl-ending-theme--${ending.theme}`}>
          <div
            className="bl-bg-photo"
            style={{ backgroundImage: toBleachBgUrl(BLEACH_BACKGROUNDS.endingRiver) }}
            data-bg-src={BLEACH_BACKGROUNDS.endingRiver}
            aria-hidden="true"
          />
          <div className="bl-bg-readability" aria-hidden="true" />
          <div className="bl-ending-beams" aria-hidden="true" />

          <div className="bl-ending-ensemble" aria-label="엔딩 주요 인물">
            {ending.showcaseCast.map((charId, idx) => (
              <EndingShowcaseMember
                key={charId}
                id={charId}
                slotIndex={idx}
                total={ending.showcaseCast.length}
              />
            ))}
          </div>

          <div className="bl-ending-scrim" aria-hidden="true" />
          <div className="bl-ending-banner-mark" aria-hidden="true">
            <span>{isHiddenEnding ? "👑 HIDDEN ENDING" : `ENDING 0${ending.priority}`}</span>
            <strong>{ending.title}</strong>
          </div>
        </div>

        <p className="bl-ending-desc">{ending.description}</p>

        {/* Key Character Quote with transparent PNG */}
        <div
          className={`bl-ending-quote-box ${
            isHiddenEnding
              ? "bl-ending-quote-box--hidden"
              : isSadEnding
              ? "bl-ending-quote-box--sad"
              : ""
          }`}
        >
          <div className="bl-ending-quote-portrait">
            <img src={speakerMeta.image} alt={speakerMeta.name} />
          </div>
          <div className="bl-ending-quote-copy">
            <div className="bl-ending-quote-speaker">
              <strong>{speakerMeta.name}</strong>
              <span>{speakerMeta.title}</span>
            </div>
            <blockquote>“{ending.quote}”</blockquote>
          </div>
        </div>

        {ending.companionQuote && companionMeta && (
          <div
            className={`bl-ending-quote-box bl-ending-companion-quote ${
              isHiddenEnding
                ? "bl-ending-quote-box--hidden"
                : isSadEnding
                ? "bl-ending-quote-box--sad"
                : ""
            }`}
          >
            <div className="bl-ending-quote-portrait">
              <img src={companionMeta.image} alt={companionMeta.name} />
            </div>
            <div className="bl-ending-quote-copy">
              <div className="bl-ending-quote-speaker">
                <strong>{companionMeta.name}</strong>
                <span>{companionMeta.title}</span>
              </div>
              <blockquote>“{ending.companionQuote.text}”</blockquote>
            </div>
          </div>
        )}

        {/* Final 3 Stats */}
        <div className="bl-final-stats">
          <div className="bl-final-stat">
            <Swords size={18} aria-hidden="true" />
            <span>영압 제어</span>
            <b>{stats.reiatsu}</b>
          </div>
          <div className="bl-final-stat">
            <Shield size={18} aria-hidden="true" />
            <span>동료의 유대</span>
            <b>{stats.bond}</b>
          </div>
          <div className="bl-final-stat">
            <Flame size={18} aria-hidden="true" />
            <span>수호의 각오</span>
            <b>{stats.resolve}</b>
          </div>
        </div>
      </div>

      {/* All 7 Bleach Characters Evaluation Grid */}
      <div className="bl-eval-section">
        <div className="bl-eval-header">
          <span className="bl-eval-kicker">SOUL EVALUATION · 7인의 평가</span>
          <h2>이치고 일행과 우라하라·콘의 개별 평가</h2>
          <p>
            일곱 번의 전투에서 당신이 증명한 영압과 신의를 사신·퀸시·인간 동료 7명이 각자의 시선으로 평가했습니다.
          </p>
        </div>

        <div className="bl-eval-grid">
          {evaluations.map((ev) => (
            <article
              key={ev.id}
              className="bl-eval-card"
              style={{ "--eval-accent": ev.accentColor } as React.CSSProperties}
            >
              <div className="bl-eval-stage">
                <img
                  src={ev.image}
                  alt={ev.name}
                  className="bl-eval-portrait"
                />
              </div>

              <div className="bl-eval-body">
                <div className="bl-eval-top">
                  <div>
                    <h3 className="bl-eval-name">{ev.name}</h3>
                    <span className="bl-eval-rank">
                      {ev.title} · {ev.specialty}
                    </span>
                  </div>
                  <span className={`bl-grade-badge bl-grade-${ev.grade}`}>
                    {ev.grade}등급
                  </span>
                </div>

                <div className="bl-eval-score-row">
                  <span className="bl-eval-focus">{ev.focus}</span>
                  <b className="bl-eval-score">{ev.score} / 100</b>
                </div>

                <div
                  className="bl-eval-bar"
                  role="progressbar"
                  aria-label={`${ev.name} 평가 점수`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={ev.score}
                >
                  <i style={{ width: `${ev.score}%` }} />
                </div>

                <p className="bl-eval-comment">“{ev.comment}”</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Ending Archive Status */}
      <div className="bl-archive-strip" aria-label="엔딩 달성 현황">
        <div className="bl-archive-head">
          <Award size={18} aria-hidden="true" />
          <strong>엔딩 도감 ({unlockedEndings.length} / {ENDING_ORDER.length} 해금)</strong>
        </div>
        <div className="bl-archive-list">
          {ENDING_ORDER.map((eid) => {
            const info = ENDINGS[eid];
            const unlocked = unlockedEndings.includes(eid);
            const active = eid === ending.id;
            const isHiddenItem = eid === "ending-hidden";
            return (
              <div
                key={eid}
                className={`bl-archive-item ${unlocked ? "unlocked" : "locked"} ${
                  active ? "current" : ""
                } ${isHiddenItem ? "bl-archive-item--hidden" : ""}`}
              >
                <span className="bl-archive-num">
                  {isHiddenItem ? "👑 HIDDEN ENDING" : `ENDING 0${info.priority}`}
                </span>
                <strong>
                  {unlocked
                    ? info.title
                    : isHiddenItem
                    ? "??? 히든 엔딩"
                    : "??? 미해금 엔딩"}
                </strong>
                <small>
                  {unlocked
                    ? info.conditionLabel
                    : isHiddenItem
                    ? "비밀 3분기 + 능력치 80↑"
                    : "다른 선택으로 해금"}
                </small>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action CTAs */}
      <div className="bl-result-actions">
        <button type="button" onClick={onRestart} className="bl-btn-primary">
          <RotateCcw size={18} />
          다시 플레이하기
        </button>
        <button
          type="button"
          onClick={onReturnWorldSelect}
          className="bl-btn-secondary"
        >
          <ArrowLeft size={18} />
          작품 선택으로 돌아가기
        </button>
      </div>

      <EndingShareAndReward
        gameId="bleach"
        animeTitle="블리치"
        endingTitle={ending.title}
      />
    </section>
  );
}
