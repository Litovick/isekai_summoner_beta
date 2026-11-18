import { Flame, Home, RotateCcw, Sparkles, Users, Volume2, VolumeX } from "lucide-react";
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
  icon: typeof Sparkles;
  colorClass: string;
}> = [
  {
    key: "ninjutsu",
    label: "인술 숙련도",
    icon: Sparkles,
    colorClass: "nr-meter-fill--ninjutsu",
  },
  {
    key: "bond",
    label: "동료의 유대",
    icon: Users,
    colorClass: "nr-meter-fill--bond",
  },
  {
    key: "willOfFire",
    label: "불의 의지",
    icon: Flame,
    colorClass: "nr-meter-fill--will",
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
    <header className="nr-hud">
      <div className="nr-hud-top">
        <div className="nr-hud-ep">
          <span className="nr-hud-code">{episodeLabel}</span>
          <strong className="nr-hud-title">{episodeTitle}</strong>
          <span className="nr-hud-loc">{location}</span>
        </div>

        <div className="nr-hud-controls">
          <button
            type="button"
            onClick={onToggleMute}
            className="nr-icon-btn"
            aria-label={muted ? "효과음 켜기" : "효과음 끄기"}
            title={muted ? "효과음 켜기" : "효과음 끄기"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="nr-icon-btn"
            aria-label="처음부터 다시 플레이"
            title="다시 플레이하기"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={onGoTitle}
            className="nr-icon-btn"
            aria-label="타이틀 화면으로"
            title="게임 타이틀로"
          >
            <Home size={16} />
          </button>
        </div>
      </div>

      <div className="nr-stats-row">
        {STAT_META.map(({ key, label, icon: Icon, colorClass }) => {
          const val = stats[key];
          const delta = lastDelta?.[key];
          return (
            <div className="nr-stat-card" key={key}>
              <div className="nr-stat-head">
                <span className="nr-stat-label">
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </span>
                <div className="nr-stat-nums">
                  {delta !== undefined && delta !== 0 && (
                    <span
                      className={`nr-stat-delta ${
                        delta > 0 ? "nr-stat-delta--up" : "nr-stat-delta--down"
                      }`}
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </span>
                  )}
                  <b className="nr-stat-val">{val}</b>
                </div>
              </div>
              <div
                className="nr-meter"
                role="progressbar"
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={val}
              >
                <i
                  className={`nr-meter-fill ${colorClass}`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="nr-progress-track" aria-hidden="true">
        <div
          className="nr-progress-fill"
          style={{ width: `${Math.round(progressRatio * 100)}%` }}
        />
      </div>
    </header>
  );
}
