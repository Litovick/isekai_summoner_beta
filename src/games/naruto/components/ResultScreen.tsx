import { ArrowLeft, Award, Flame, RotateCcw, Sparkles, Users } from "lucide-react";
import { EndingShareAndReward } from "../../../components/EndingShareAndReward";
import { CHARACTERS } from "../data/characters";
import { NARUTO_BACKGROUNDS, toNarutoBgUrl } from "../data/backgrounds";
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
      className={`nr-ending-member ${isCenter ? "nr-ending-member--lead" : ""} nr-ending-member--d${dist}`}
      style={{ "--char-accent": meta.accentColor } as React.CSSProperties}
    >
      <img
        src={meta.image}
        alt={meta.name}
        className="nr-ending-member-img"
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
    <section className="nr-result-screen" aria-label="최종 결과 및 캐릭터 평가">
      <div
        className={`nr-ending-hero ${
          isHiddenEnding
            ? "nr-ending-hero--hidden"
            : isSadEnding
            ? "nr-ending-hero--sad"
            : ""
        }`}
      >
        <div className="nr-ending-badge-row">
          <span className="nr-ending-kicker">SHINOBI RECORD · 나뭇잎 임무 최종 보고</span>
          <div className="nr-ending-badge-group">
            {isHiddenEnding && (
              <span className="nr-ending-hidden-badge">👑 히든 엔딩</span>
            )}
            <span className="nr-ending-cond">{ending.conditionLabel}</span>
          </div>
        </div>

        <h1 className="nr-ending-title">{ending.title}</h1>
        <p className="nr-ending-subtitle">{ending.subtitle}</p>

        {/* Original Anime Ending Backdrop + Layered Character PNG Ensemble */}
        <div className={`nr-ending-visual nr-ending-theme--${ending.theme}`}>
          <div
            className="nr-bg-photo"
            style={{ backgroundImage: toNarutoBgUrl(NARUTO_BACKGROUNDS.endingSunset) }}
            data-bg-src={NARUTO_BACKGROUNDS.endingSunset}
            aria-hidden="true"
          />
          <div className="nr-bg-readability" aria-hidden="true" />
          <div className="nr-ending-beams" aria-hidden="true" />

          <div className="nr-ending-ensemble" aria-label="엔딩 주요 인물">
            {ending.showcaseCast.map((charId, idx) => (
              <EndingShowcaseMember
                key={charId}
                id={charId}
                slotIndex={idx}
                total={ending.showcaseCast.length}
              />
            ))}
          </div>

          <div className="nr-ending-scrim" aria-hidden="true" />
          <div className="nr-ending-banner-mark" aria-hidden="true">
            <span>{isHiddenEnding ? "👑 HIDDEN ENDING" : `ENDING 0${ending.priority}`}</span>
            <strong>{ending.title}</strong>
          </div>
        </div>

        <p className="nr-ending-desc">{ending.description}</p>

        {/* Key Character Quote with transparent PNG */}
        <div
          className={`nr-ending-quote-box ${
            isHiddenEnding
              ? "nr-ending-quote-box--hidden"
              : isSadEnding
              ? "nr-ending-quote-box--sad"
              : ""
          }`}
        >
          <div className="nr-ending-quote-portrait">
            <img src={speakerMeta.image} alt={speakerMeta.name} />
          </div>
          <div className="nr-ending-quote-copy">
            <div className="nr-ending-quote-speaker">
              <strong>{speakerMeta.name}</strong>
              <span>{speakerMeta.title}</span>
            </div>
            <blockquote>“{ending.quote}”</blockquote>
          </div>
        </div>

        {ending.companionQuote && companionMeta && (
          <div
            className={`nr-ending-quote-box nr-ending-companion-quote ${
              isHiddenEnding
                ? "nr-ending-quote-box--hidden"
                : isSadEnding
                ? "nr-ending-quote-box--sad"
                : ""
            }`}
          >
            <div className="nr-ending-quote-portrait">
              <img src={companionMeta.image} alt={companionMeta.name} />
            </div>
            <div className="nr-ending-quote-copy">
              <div className="nr-ending-quote-speaker">
                <strong>{companionMeta.name}</strong>
                <span>{companionMeta.title}</span>
              </div>
              <blockquote>“{ending.companionQuote.text}”</blockquote>
            </div>
          </div>
        )}

        {/* Final 3 Stats */}
        <div className="nr-final-stats">
          <div className="nr-final-stat">
            <Sparkles size={18} aria-hidden="true" />
            <span>인술 숙련도</span>
            <b>{stats.ninjutsu}</b>
          </div>
          <div className="nr-final-stat">
            <Users size={18} aria-hidden="true" />
            <span>동료의 유대</span>
            <b>{stats.bond}</b>
          </div>
          <div className="nr-final-stat">
            <Flame size={18} aria-hidden="true" />
            <span>불의 의지</span>
            <b>{stats.willOfFire}</b>
          </div>
        </div>
      </div>

      {/* All 6 Shinobi Characters Evaluation Grid */}
      <div className="nr-eval-section">
        <div className="nr-eval-header">
          <span className="nr-eval-kicker">SHINOBI EVALUATION · 6인의 평가</span>
          <h2>제7반과 선배 닌자들의 개별 평가</h2>
          <p>
            일곱 번의 임무에서 당신이 증명한 시노비의 길을 나루토와 동료들, 그리고 카카시·지라이야·이타치가 평가했습니다.
          </p>
        </div>

        <div className="nr-eval-grid">
          {evaluations.map((ev) => (
            <article
              key={ev.id}
              className="nr-eval-card"
              style={{ "--eval-accent": ev.accentColor } as React.CSSProperties}
            >
              <div className="nr-eval-stage">
                <img
                  src={ev.image}
                  alt={ev.name}
                  className="nr-eval-portrait"
                />
              </div>

              <div className="nr-eval-body">
                <div className="nr-eval-top">
                  <div>
                    <h3 className="nr-eval-name">{ev.name}</h3>
                    <span className="nr-eval-rank">
                      {ev.title} · {ev.specialty}
                    </span>
                  </div>
                  <span className={`nr-grade-badge nr-grade-${ev.grade}`}>
                    {ev.grade}등급
                  </span>
                </div>

                <div className="nr-eval-score-row">
                  <span className="nr-eval-focus">{ev.focus}</span>
                  <b className="nr-eval-score">{ev.score} / 100</b>
                </div>

                <div
                  className="nr-eval-bar"
                  role="progressbar"
                  aria-label={`${ev.name} 평가 점수`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={ev.score}
                >
                  <i style={{ width: `${ev.score}%` }} />
                </div>

                <p className="nr-eval-comment">“{ev.comment}”</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Ending Archive Status */}
      <div className="nr-archive-strip" aria-label="엔딩 달성 현황">
        <div className="nr-archive-head">
          <Award size={18} aria-hidden="true" />
          <strong>엔딩 도감 ({unlockedEndings.length} / {ENDING_ORDER.length} 해금)</strong>
        </div>
        <div className="nr-archive-list">
          {ENDING_ORDER.map((eid) => {
            const info = ENDINGS[eid];
            const unlocked = unlockedEndings.includes(eid);
            const active = eid === ending.id;
            const isHiddenItem = eid === "ending-hidden";
            return (
              <div
                key={eid}
                className={`nr-archive-item ${unlocked ? "unlocked" : "locked"} ${
                  active ? "current" : ""
                } ${isHiddenItem ? "nr-archive-item--hidden" : ""}`}
              >
                <span className="nr-archive-num">
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
      <div className="nr-result-actions">
        <button type="button" onClick={onRestart} className="nr-btn-primary">
          <RotateCcw size={18} />
          다시 플레이하기
        </button>
        <button
          type="button"
          onClick={onReturnWorldSelect}
          className="nr-btn-secondary"
        >
          <ArrowLeft size={18} />
          작품 선택으로 돌아가기
        </button>
      </div>

      <EndingShareAndReward
        gameId="naruto"
        animeTitle="나루토"
        endingTitle={ending.title}
      />
    </section>
  );
}
