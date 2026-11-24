import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Gift, Play, Share2, Sparkles, X } from "lucide-react";
import {
  buildEndingShareMessage,
  buildGameDirectShareUrl,
  claimOrGetFirstClearCoupon,
  type CouponClaimResult,
  type PlayableGameId,
} from "../utils/endingRewardLogic";

export interface EndingShareAndRewardProps {
  gameId: PlayableGameId;
  animeTitle: string;
  endingTitle: string;
}

function copyTextToClipboard(text: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(() => {
      fallbackCopyText(text);
    });
  }
  fallbackCopyText(text);
  return Promise.resolve();
}

function fallbackCopyText(text: string) {
  if (typeof document === "undefined") return;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
  } catch {
    // ignore fallback copy errors
  } finally {
    document.body.removeChild(textarea);
  }
}

export function EndingShareAndReward({
  gameId,
  animeTitle,
  endingTitle,
}: EndingShareAndRewardProps) {
  const [showLaftelModal, setShowLaftelModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);
  const [couponClaim, setCouponClaim] = useState<CouponClaimResult | null>(null);

  const shareTimerRef = useRef<number | null>(null);
  const couponTimerRef = useRef<number | null>(null);
  const hasClaimedThisMountRef = useRef(false);

  useEffect(() => {
    if (hasClaimedThisMountRef.current) return;
    hasClaimedThisMountRef.current = true;
    if (typeof window !== "undefined" && window.localStorage) {
      setCouponClaim(claimOrGetFirstClearCoupon(window.localStorage));
    }
  }, []);

  useEffect(() => {
    return () => {
      if (shareTimerRef.current !== null) {
        window.clearTimeout(shareTimerRef.current);
      }
      if (couponTimerRef.current !== null) {
        window.clearTimeout(couponTimerRef.current);
      }
    };
  }, []);

  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "http://localhost:3000";

  const shareUrl = useMemo(
    () => buildGameDirectShareUrl(origin, gameId),
    [origin, gameId],
  );

  const shareMessage = useMemo(
    () => buildEndingShareMessage(endingTitle, shareUrl),
    [endingTitle, shareUrl],
  );

  const handleCopyShare = useCallback(() => {
    void copyTextToClipboard(shareMessage).then(() => {
      setShareCopied(true);
      if (shareTimerRef.current !== null) {
        window.clearTimeout(shareTimerRef.current);
      }
      shareTimerRef.current = window.setTimeout(() => {
        setShareCopied(false);
        shareTimerRef.current = null;
      }, 2000);
    });
  }, [shareMessage]);

  const handleCopyCoupon = useCallback(() => {
    if (!couponClaim) return;
    void copyTextToClipboard(couponClaim.code).then(() => {
      setCouponCopied(true);
      if (couponTimerRef.current !== null) {
        window.clearTimeout(couponTimerRef.current);
      }
      couponTimerRef.current = window.setTimeout(() => {
        setCouponCopied(false);
        couponTimerRef.current = null;
      }, 2000);
    });
  }, [couponClaim]);

  return (
    <section
      className="mx-auto mt-7 w-full max-w-[1008px] text-left font-sans text-white"
      aria-label={`${animeTitle} 라프텔 연계 및 엔딩 공유`}
      data-ending-share-reward={gameId}
    >
      {/* 1. Laftel Episode 1 Watch CTA Banner */}
      <div className="rounded-2xl border border-[#816bff]/55 bg-gradient-to-r from-[#171230] via-[#22194a] to-[#171230] p-[clamp(0.95rem,3.6vw,1.25rem)] shadow-[0_14px_38px_rgba(129,107,255,0.22)]">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#816bff]/25 px-3 py-1 text-[clamp(0.68rem,2.6vw,0.75rem)] font-extrabold tracking-wider text-[#cfc6ff]">
              <Sparkles size={13} aria-hidden="true" />
              LAFTEL OTT STREAMING
            </span>
            <h3 className="mt-2 text-[clamp(1rem,4.2vw,1.25rem)] font-extrabold leading-snug text-white">
              {animeTitle} 원작 애니메이션의 감동을 지금 바로 만나보세요
            </h3>
            <p className="mt-1 text-[clamp(0.75rem,3vw,0.875rem)] leading-relaxed text-slate-300">
              게임 속 명장면과 이야기를 라프텔 고화질 스트리밍으로 즉시 감상할 수 있습니다.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowLaftelModal(true)}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#816bff] px-5 py-3.5 text-[clamp(0.82rem,3.3vw,0.875rem)] font-extrabold text-white shadow-[0_8px_24px_rgba(129,107,255,0.45)] transition hover:-translate-y-0.5 hover:bg-[#917eff] active:translate-y-0 sm:w-auto"
          >
            <span>▶ 라프텔에서 원작 1화 바로보기</span>
          </button>
        </div>
      </div>

      {/* 2. First-Clear Laftel Membership Discount Coupon Banner */}
      {couponClaim && (
        <div
          className="mt-4 rounded-2xl border border-[#816bff]/60 bg-[#141029]/95 p-[clamp(0.95rem,3.6vw,1.25rem)] shadow-xl"
          aria-label="이세계 소환사 × 라프텔 멤버십 첫 달 할인 쿠폰"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[clamp(0.7rem,2.7vw,0.75rem)] font-extrabold tracking-wider text-[#a898ff]">
              <Gift size={15} aria-hidden="true" />
              이세계 소환사 × 라프텔 멤버십 첫 달 할인 쿠폰
            </span>
            <span
              className={`rounded-full px-3 py-0.5 text-[clamp(0.68rem,2.6vw,0.75rem)] font-extrabold ${
                couponClaim.isFirstClaim
                  ? "bg-[#816bff] text-white"
                  : "border border-[#816bff]/50 bg-[#816bff]/20 text-[#d4ccff]"
              }`}
            >
              {couponClaim.isFirstClaim ? "NEW 최초 엔딩 달성 발급" : "발급 완료 쿠폰"}
            </span>
          </div>

          <p className="mt-2.5 text-[clamp(0.875rem,3.6vw,1rem)] font-bold leading-snug text-white">
            {couponClaim.isFirstClaim
              ? "축하합니다! 최초 엔딩 달성 기념 라프텔 구독료 할인 쿠폰이 발급되었습니다"
              : "이미 최초 클리어 할인 쿠폰을 발급받으셨습니다"}
          </p>
          <p className="mt-1 text-[clamp(0.74rem,3vw,0.82rem)] leading-relaxed text-slate-300">
            {couponClaim.isFirstClaim
              ? "아래 고유 쿠폰 번호를 복사해 라프텔 멤버십 구독 시 등록해 보세요."
              : "기존에 발급받은 본인 전용 할인 쿠폰 번호를 언제든 다시 확인하고 복사할 수 있습니다."}
          </p>

          <div className="mt-3.5 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
            <div
              className="flex flex-1 flex-wrap items-center justify-between gap-2 rounded-xl border border-[#816bff]/45 bg-[#0c091a] px-3.5 py-2.5 font-mono text-[clamp(0.85rem,3.6vw,1rem)] font-extrabold tracking-widest text-[#e2ddff]"
              data-testid="laftel-coupon-code"
            >
              <span className="break-all">{couponClaim.code}</span>
              <span className="text-[11px] font-semibold tracking-normal text-[#a594ff]">
                멤버십 첫 달 50% OFF
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCoupon}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#816bff] bg-[#816bff]/25 px-4 py-2.5 text-[clamp(0.8rem,3.2vw,0.875rem)] font-extrabold text-white transition hover:bg-[#816bff]/40"
            >
              {couponCopied ? (
                <>
                  <Check size={16} aria-hidden="true" />
                  쿠폰 코드 복사 완료!
                </>
              ) : (
                <>
                  <Copy size={16} aria-hidden="true" />
                  쿠폰 코드 복사
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 3. Share My Ending & Direct Game Link Card */}
      <div
        className="mt-4 rounded-2xl border border-slate-700/80 bg-[#0f1424]/95 p-[clamp(0.95rem,3.6vw,1.25rem)] shadow-xl"
        aria-label="친구에게 내 엔딩 공유하기"
      >
        <div className="flex items-center gap-2 text-[clamp(0.84rem,3.4vw,0.92rem)] font-extrabold text-[#c4b5fd]">
          <Share2 size={16} aria-hidden="true" />
          <span>친구에게 내 엔딩 공유하기</span>
        </div>
        <p className="mt-1 text-[clamp(0.74rem,3vw,0.82rem)] leading-relaxed text-slate-300">
          직행 링크를 받은 친구는 메인 화면을 거치지 않고 곧바로{" "}
          <strong className="text-white">{animeTitle}</strong> 게임 시작 화면으로 진입합니다.
        </p>

        <div
          className="mt-3 break-words rounded-xl border border-slate-700 bg-[#090d18] p-3.5 text-[clamp(0.75rem,3.1vw,0.875rem)] leading-relaxed text-slate-100"
          data-testid="ending-share-preview"
        >
          {shareMessage}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span className="min-w-0 break-all text-xs text-slate-400">
            직행 링크: <code className="break-all text-[#b8abff]">{shareUrl}</code>
          </span>

          <button
            type="button"
            onClick={handleCopyShare}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#816bff] px-4 py-2.5 text-[clamp(0.8rem,3.2vw,0.875rem)] font-extrabold text-white shadow-[0_6px_18px_rgba(129,107,255,0.35)] transition hover:bg-[#917eff] sm:w-auto"
          >
            {shareCopied ? (
              <>
                <Check size={16} aria-hidden="true" />
                복사 완료! 친구에게 붙여넣기 하세요
              </>
            ) : (
              <>
                <Copy size={16} aria-hidden="true" />
                공유 문구 및 직행 링크 복사
              </>
            )}
          </button>
        </div>
      </div>

      {/* Laftel Streaming Demo Modal */}
      {showLaftelModal && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/85 p-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] md:bg-black/80 md:backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="라프텔 원작 1화 바로보기 안내"
        >
          <div className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl border border-[#816bff]/60 bg-[#181234] p-[clamp(1.25rem,5vw,1.5rem)] text-center text-white shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
            <button
              type="button"
              onClick={() => setShowLaftelModal(false)}
              aria-label="안내창 닫기"
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#816bff]/25 text-[#a796ff] ring-2 ring-[#816bff]/60">
              <Play size={24} fill="currentColor" aria-hidden="true" />
            </div>

            <span className="mt-3 inline-block rounded-full bg-[#816bff]/25 px-3 py-0.5 text-[11px] font-extrabold tracking-widest text-[#d4ccff]">
              LAFTEL × 이세계 소환사
            </span>

            <h3 className="mt-2 text-xl font-extrabold text-white">
              {animeTitle} 1화 스트리밍 연계
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              라프텔(Laftel) OTT 스트리밍 연계 기능입니다. 실제 서비스에서는 해당 작품의 1화 스트리밍 플레이어로 즉시 연결됩니다.
            </p>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowLaftelModal(false)}
                className="w-full rounded-xl bg-[#816bff] px-6 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(129,107,255,0.4)] transition hover:bg-[#917eff]"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
