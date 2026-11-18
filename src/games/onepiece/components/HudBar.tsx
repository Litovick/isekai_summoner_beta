import { Compass, Home, RotateCcw, Shield, Swords, Volume2, VolumeX } from "lucide-react";
import type { Stats } from "../types";

interface HudBarProps {
  episodeLabel: string;
  episodeTitle: string;
  location: string;
  progressRatio: number;
  stats: Stats;
  lastDelta: Stats | null;
  muted: boolean;
  onToggleMute: () => void;
  onGoTitle: () => void;
  onRestart: () => void;
}

const STAT_META: Array<{
  key: keyof Stats;
  label: string;
  icon: typeof Swords;
  colorClass: string;
}> = [
  {
    key: "haki",
    label: "패기와 전투력",
    icon: Swords,
    colorClass: "op-meter-fill--haki",
  },
  {
    key: "trust",
    label: "동료의 신뢰",
    icon: Shield,
    colorClass: "op-meter-fill--trust",
  },
  {
    key: "adventure",
    label: "항해와 모험심",
    icon: Compass,
    colorClass: "op-meter-fill--adventure",
  },
];

export function HudBar({
  episodeLabel,
  episodeTitle,
  location,
  progressRatio,
  stats,
  lastDelta,
  muted,
  onToggleMute,
  onGoTitle,
  onRestart,
}: HudBarProps) {
  return (
    <header className="op-hud">
      <div className="op-hud-top">
        <div className="op-hud-ep">
          <span className="op-hud-code">{episodeLabel}</span>
          <strong className="op-hud-title">{episodeTitle}</strong>
          <span className="op-hud-loc">{location}</span>
        </div>

        <div className="op-hud-controls">
          <button
            type="button"
            onClick={onToggleMute}
            className="op-icon-btn"
            aria-label={muted ? "효과음 켜기" : "효과음 끄기"}
            title={muted ? "효과음 켜기" : "효과음 끄기"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="op-icon-btn"
            aria-label="처음부터 다시 항해"
            title="다시 플레이하기"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={onGoTitle}
            className="op-icon-btn"
            aria-label="타이틀 화면으로"
            title="게임 타이틀로"
          >
            <Home size={16} />
          </button>
        </div>
      </div>

      <div className="op-stats-row">
        {STAT_META.map(({ key, label, icon: Icon, colorClass }) => {
          const val = stats[key];
          const delta = lastDelta?.[key];
          return (
            <div className="op-stat-card" key={key}>
              <div className="op-stat-head">
                <span className="op-stat-label">
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </span>
                <div className="op-stat-nums">
                  {delta !== undefined && delta !== 0 && (
                    <span
                      className={`op-stat-delta ${
                        delta > 0 ? "op-stat-delta--up" : "op-stat-delta--down"
                      }`}
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </span>
                  )}
                  <b className="op-stat-val">{val}</b>
                </div>
              </div>
              <div
                className="op-meter"
                role="progressbar"
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={val}
              >
                <i
                  className={`op-meter-fill ${colorClass}`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="op-progress-track" aria-hidden="true">
        <div
          className="op-progress-fill"
          style={{ width: `${Math.round(progressRatio * 100)}%` }}
        />
      </div>
    </header>
  );
}
