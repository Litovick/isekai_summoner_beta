import { Flame, Shield, Sword, Volume2, VolumeX, RotateCcw, Home } from "lucide-react";
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
  icon: typeof Sword;
  colorClass: string;
}> = [
  {
    key: "breathing",
    label: "전집중 호흡",
    icon: Sword,
    colorClass: "ds-meter-fill--breathing",
  },
  {
    key: "trust",
    label: "귀살대 신뢰도",
    icon: Shield,
    colorClass: "ds-meter-fill--trust",
  },
  {
    key: "resolve",
    label: "불굴의 결의",
    icon: Flame,
    colorClass: "ds-meter-fill--resolve",
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
    <header className="ds-hud">
      <div className="ds-hud-top">
        <div className="ds-hud-ep">
          <span className="ds-hud-code">{episodeLabel}</span>
          <strong className="ds-hud-title">{episodeTitle}</strong>
          <span className="ds-hud-loc">{location}</span>
        </div>

        <div className="ds-hud-controls">
          <button
            type="button"
            onClick={onToggleMute}
            className="ds-icon-btn"
            aria-label={muted ? "효과음 켜기" : "효과음 끄기"}
            title={muted ? "효과음 켜기" : "효과음 끄기"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="ds-icon-btn"
            aria-label="처음부터 다시 플레이"
            title="다시 플레이하기"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={onGoTitle}
            className="ds-icon-btn"
            aria-label="타이틀 화면으로"
            title="게임 타이틀로"
          >
            <Home size={16} />
          </button>
        </div>
      </div>

      <div className="ds-stats-row">
        {STAT_META.map(({ key, label, icon: Icon, colorClass }) => {
          const val = stats[key];
          const delta = lastDelta?.[key];
          return (
            <div className="ds-stat-card" key={key}>
              <div className="ds-stat-head">
                <span className="ds-stat-label">
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </span>
                <div className="ds-stat-nums">
                  {delta !== undefined && delta !== 0 && (
                    <span
                      className={`ds-stat-delta ${
                        delta > 0 ? "ds-stat-delta--up" : "ds-stat-delta--down"
                      }`}
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </span>
                  )}
                  <b className="ds-stat-val">{val}</b>
                </div>
              </div>
              <div
                className="ds-meter"
                role="progressbar"
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={val}
              >
                <i
                  className={`ds-meter-fill ${colorClass}`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="ds-progress-track" aria-hidden="true">
        <div
          className="ds-progress-fill"
          style={{ width: `${Math.round(progressRatio * 100)}%` }}
        />
      </div>
    </header>
  );
}
