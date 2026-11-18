import { Flame, Home, RotateCcw, Shield, Swords, Volume2, VolumeX } from "lucide-react";
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
    key: "reiatsu",
    label: "영압 제어",
    icon: Swords,
    colorClass: "bl-meter-fill--reiatsu",
  },
  {
    key: "bond",
    label: "동료의 유대",
    icon: Shield,
    colorClass: "bl-meter-fill--bond",
  },
  {
    key: "resolve",
    label: "수호의 각오",
    icon: Flame,
    colorClass: "bl-meter-fill--resolve",
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
    <header className="bl-hud">
      <div className="bl-hud-top">
        <div className="bl-hud-ep">
          <span className="bl-hud-code">{episodeLabel}</span>
          <strong className="bl-hud-title">{episodeTitle}</strong>
          <span className="bl-hud-loc">{location}</span>
        </div>

        <div className="bl-hud-controls">
          <button
            type="button"
            onClick={onToggleMute}
            className="bl-icon-btn"
            aria-label={muted ? "효과음 켜기" : "효과음 끄기"}
            title={muted ? "효과음 켜기" : "효과음 끄기"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="bl-icon-btn"
            aria-label="처음부터 다시 플레이"
            title="다시 플레이하기"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={onGoTitle}
            className="bl-icon-btn"
            aria-label="타이틀 화면으로"
            title="게임 타이틀로"
          >
            <Home size={16} />
          </button>
        </div>
      </div>

      <div className="bl-stats-row">
        {STAT_META.map(({ key, label, icon: Icon, colorClass }) => {
          const val = stats[key];
          const delta = lastDelta?.[key];
          return (
            <div className="bl-stat-card" key={key}>
              <div className="bl-stat-head">
                <span className="bl-stat-label">
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </span>
                <div className="bl-stat-nums">
                  {delta !== undefined && delta !== 0 && (
                    <span
                      className={`bl-stat-delta ${
                        delta > 0 ? "bl-stat-delta--up" : "bl-stat-delta--down"
                      }`}
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </span>
                  )}
                  <b className="bl-stat-val">{val}</b>
                </div>
              </div>
              <div
                className="bl-meter"
                role="progressbar"
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={val}
              >
                <i
                  className={`bl-meter-fill ${colorClass}`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bl-progress-track" aria-hidden="true">
        <div
          className="bl-progress-fill"
          style={{ width: `${Math.round(progressRatio * 100)}%` }}
        />
      </div>
    </header>
  );
}
