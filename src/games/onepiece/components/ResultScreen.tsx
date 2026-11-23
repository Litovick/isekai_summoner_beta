import { ArrowLeft, Award, Compass, RotateCcw, Shield, Swords } from "lucide-react";
import { EndingShareAndReward } from "../../../components/EndingShareAndReward";
import { CHARACTERS } from "../data/characters";
import { ONEPIECE_BACKGROUNDS, toOnePieceBgUrl } from "../data/backgrounds";
import { ENDINGS, ENDING_ORDER } from "../data/endings";
import type {
  CharacterEvaluation,
  CharacterId,
  EndingId,
  EndingInfo,
  Stats,
} from "../types";
import { applyImageFallback } from "./imageFallback";

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
      className={`op-ending-member ${isCenter ? "op-ending-member--lead" : ""} op-ending-member--d${dist}`}
      style={{ "--char-accent": meta.accentColor } as React.CSSProperties}
    >
      <img
        src={meta.image}
        alt={meta.name}
        className="op-ending-member-img"
        onError={(e) => applyImageFallback(e, meta.fallbackImage)}
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

  return (
    <section className="op-result-screen" aria-label="최종 항해 결과 및 동료 평가">
      <div className={`op-ending-hero ${isSadEnding ? "op-ending-hero--sad" : ""}`}>
        <div className="op-ending-badge-row">
          <span className="op-ending-kicker">GRAND LINE VOYAGE RECORD · 최종 항해 보고</span>
          <span className="op-ending-cond">{ending.conditionLabel}</span>
        </div>

        <h1 className="op-ending-title">{ending.title}</h1>
        <p className="op-ending-subtitle">{ending.subtitle}</p>

        {/* Original Anime Ending Backdrop + Layered Character PNG Ensemble */}
        <div className={`op-ending-visual op-ending-theme--${ending.theme}`}>
          <div
            className="op-bg-photo"
            style={{ backgroundImage: toOnePieceBgUrl(ONEPIECE_BACKGROUNDS.endingSunset) }}
            data-bg-src={ONEPIECE_BACKGROUNDS.endingSunset}
            aria-hidden="true"
          />
          <div className="op-bg-readability" aria-hidden="true" />
          <div className="op-ending-beams" aria-hidden="true" />

          <div className="op-ending-ensemble" aria-label="엔딩 주요 인물">
            {ending.showcaseCast.map((charId, idx) => (
              <EndingShowcaseMember
                key={charId}
                id={charId}
                slotIndex={idx}
                total={ending.showcaseCast.length}
              />
            ))}
          </div>

          <div className="op-ending-scrim" aria-hidden="true" />
          <div className="op-ending-banner-mark" aria-hidden="true">
            <span>ENDING 0{ending.priority}</span>
            <strong>{ending.title}</strong>
          </div>
        </div>

        <p className="op-ending-desc">{ending.description}</p>

        {/* Primary Character Ending Quote */}
        <div className={`op-ending-quote-box ${isSadEnding ? "op-ending-quote-box--sad" : ""}`}>
          <div className="op-ending-quote-portrait">
            <img
              src={speakerMeta.image}
              alt={speakerMeta.name}
              onError={(e) => applyImageFallback(e, speakerMeta.fallbackImage)}
            />
          </div>
          <div className="op-ending-quote-copy">
            <div className="op-ending-quote-speaker">
              <strong>{speakerMeta.name}</strong>
              <span>{speakerMeta.title}</span>
            </div>
            <blockquote>“{ending.quote}”</blockquote>
          </div>
        </div>

        {ending.companionQuote && companionMeta && (
          <div
            className={`op-ending-quote-box op-ending-companion-quote ${
              isSadEnding ? "op-ending-quote-box--sad" : ""
            }`}
          >
            <div className="op-ending-quote-portrait">
              <img
                src={companionMeta.image}
                alt={companionMeta.name}
                onError={(e) => applyImageFallback(e, companionMeta.fallbackImage)}
              />
            </div>
            <div className="op-ending-quote-copy">
              <div className="op-ending-quote-speaker">
                <strong>{companionMeta.name}</strong>
                <span>{companionMeta.title}</span>
              </div>
              <blockquote>“{ending.companionQuote.text}”</blockquote>
            </div>
          </div>
        )}

        {/* Final 3 Stats */}
        <div className="op-final-stats">
          <div className="op-final-stat">
            <Swords size={18} aria-hidden="true" />
            <span>패기와 전투력</span>
            <b>{stats.haki}</b>
          </div>
          <div className="op-final-stat">
            <Shield size={18} aria-hidden="true" />
            <span>동료의 신뢰</span>
            <b>{stats.trust}</b>
          </div>
          <div className="op-final-stat">
            <Compass size={18} aria-hidden="true" />
            <span>항해와 모험심</span>
            <b>{stats.adventure}</b>
          </div>
        </div>
      </div>

      {/* All 7 One Piece Characters Evaluation Grid */}
      <div className="op-eval-section">
        <div className="op-eval-header">
          <span className="op-eval-kicker">PIRATE CREW EVALUATION · 7인의 동료 평가</span>
          <h2>밀짚모자 일당과 에이스·샹크스의 개별 평가</h2>
          <p>
            일곱 바다의 모험에서 당신이 보여 준 패기와 신뢰를 7명의 원작 인물이 각자의 시선으로 평가했습니다.
          </p>
        </div>

        <div className="op-eval-grid">
          {evaluations.map((ev) => (
            <article
              key={ev.id}
              className="op-eval-card"
              style={{ "--eval-accent": ev.accentColor } as React.CSSProperties}
            >
              <div className="op-eval-stage">
                <img
                  src={ev.image}
                  alt={ev.name}
                  className="op-eval-portrait"
                  onError={(e) => applyImageFallback(e, ev.fallbackImage)}
                />
              </div>

              <div className="op-eval-body">
                <div className="op-eval-top">
                  <div>
                    <h3 className="op-eval-name">{ev.name}</h3>
                    <span className="op-eval-rank">
                      {ev.title} · {ev.specialty}
                    </span>
                  </div>
                  <span className={`op-grade-badge op-grade-${ev.grade}`}>
                    {ev.grade}등급
                  </span>
                </div>

                <div className="op-eval-score-row">
                  <span className="op-eval-focus">{ev.focus}</span>
                  <b className="op-eval-score">{ev.score} / 100</b>
                </div>

                <div
                  className="op-eval-bar"
                  role="progressbar"
                  aria-label={`${ev.name} 평가 점수`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={ev.score}
                >
                  <i style={{ width: `${ev.score}%` }} />
                </div>

                <p className="op-eval-comment">“{ev.comment}”</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Ending Archive Status */}
      <div className="op-archive-strip" aria-label="엔딩 달성 현황">
        <div className="op-archive-head">
          <Award size={18} aria-hidden="true" />
          <strong>항해 일지 엔딩 도감 ({unlockedEndings.length} / 4 해금)</strong>
        </div>
        <div className="op-archive-list">
          {ENDING_ORDER.map((eid) => {
            const info = ENDINGS[eid];
            const unlocked = unlockedEndings.includes(eid);
            const active = eid === ending.id;
            return (
              <div
                key={eid}
                className={`op-archive-item ${unlocked ? "unlocked" : "locked"} ${
                  active ? "current" : ""
                }`}
              >
                <span className="op-archive-num">ENDING 0{info.priority}</span>
                <strong>{unlocked ? info.title : "??? 미해금 엔딩"}</strong>
                <small>{unlocked ? info.conditionLabel : "다른 항로로 해금"}</small>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action CTAs */}
      <div className="op-result-actions">
        <button type="button" onClick={onRestart} className="op-btn-primary">
          <RotateCcw size={18} />
          다시 출항하기
        </button>
        <button
          type="button"
          onClick={onReturnWorldSelect}
          className="op-btn-secondary"
        >
          <ArrowLeft size={18} />
          작품 선택으로 돌아가기
        </button>
      </div>

      <EndingShareAndReward
        gameId="onepiece"
        animeTitle="원피스"
        endingTitle={ending.title}
      />
    </section>
  );
}
