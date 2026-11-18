import type { EndingThemeId, EpisodeStageTheme } from "../types";

export function EpisodeBackdropArt({
  stageTheme,
}: {
  stageTheme: EpisodeStageTheme;
}) {
  switch (stageTheme) {
    case "wisteria-mountain":
      return (
        <svg
          className="ds-scene-svg"
          viewBox="0 0 1200 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="wm-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#090d24" />
              <stop offset="55%" stopColor="#1c1540" />
              <stop offset="100%" stopColor="#120c22" />
            </linearGradient>
            <radialGradient id="wm-moon" cx="50%" cy="22%" r="24%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.95" />
              <stop offset="28%" stopColor="#ddd6fe" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="wm-wisteria" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3e8ff" />
              <stop offset="45%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#6b21a8" />
            </linearGradient>
          </defs>

          <rect width="1200" height="560" fill="url(#wm-sky)" />
          <circle cx="600" cy="118" r="170" fill="url(#wm-moon)" />
          <circle cx="600" cy="118" r="52" fill="#f1f5f9" opacity="0.92" />

          {/* Distant mountain silhouettes */}
          <path
            d="M0 390 L180 265 L340 335 L520 230 L720 320 L910 215 L1080 295 L1200 245 L1200 560 L0 560 Z"
            fill="#14112c"
          />
          <path
            d="M0 440 L140 365 L310 415 L490 340 L670 405 L880 330 L1060 390 L1200 350 L1200 560 L0 560 Z"
            fill="#0d0b1d"
          />

          {/* Mountain path & stone stairs */}
          <path
            d="M460 560 Q545 450 585 380 L635 380 Q675 455 760 560 Z"
            fill="#1c1630"
          />
          <g stroke="#4c3d75" strokeWidth="2" opacity="0.55">
            <line x1="560" y1="415" x2="660" y2="415" />
            <line x1="538" y1="450" x2="684" y2="450" />
            <line x1="510" y1="490" x2="712" y2="490" />
            <line x1="482" y1="532" x2="738" y2="532" />
          </g>

          {/* Traditional Torii Gate on mountain trail */}
          <g fill="#2d172c" stroke="#6b21a8" strokeOpacity="0.45" strokeWidth="1.5">
            <path d="M495 255 Q600 268 705 255 L712 243 Q600 256 488 243 Z" />
            <rect x="515" y="272" width="170" height="10" rx="2" />
            <rect x="530" y="255" width="14" height="145" />
            <rect x="656" y="255" width="14" height="145" />
          </g>

          {/* Glowing stone lanterns */}
          {[
            [430, 410],
            [770, 410],
          ].map(([lx, ly], idx) => (
            <g key={idx} transform={`translate(${lx}, ${ly})`}>
              <rect x="-12" y="28" width="24" height="65" fill="#1b182c" />
              <rect x="-18" y="18" width="36" height="10" fill="#27223d" />
              <rect x="-10" y="0" width="20" height="18" fill="#fde68a" opacity="0.88" />
              <polygon points="-24,0 0,-16 24,0" fill="#2c2645" />
              <circle cx="0" cy="9" r="34" fill="#fbbf24" opacity="0.18" />
            </g>
          ))}

          {/* Gnarled wisteria branches & cascading purple blossom clusters */}
          <path
            d="M-20 45 Q180 15 380 70 Q240 60 80 110 Z"
            fill="#120c1f"
          />
          <path
            d="M1220 45 Q1020 15 820 70 Q960 60 1120 110 Z"
            fill="#120c1f"
          />
          {[
            [45, 50, 95],
            [95, 56, 125],
            [150, 48, 108],
            [215, 62, 132],
            [275, 55, 88],
            [335, 68, 72],
            [865, 68, 76],
            [925, 56, 98],
            [990, 60, 132],
            [1055, 48, 114],
            [1110, 56, 126],
            [1160, 46, 92],
          ].map(([x, y, h], i) => (
            <g key={i} opacity={0.86}>
              <ellipse cx={x} cy={y + h * 0.25} rx="18" ry={h * 0.34} fill="url(#wm-wisteria)" />
              <ellipse cx={x - 7} cy={y + h * 0.55} rx="13" ry={h * 0.28} fill="#a855f7" />
              <ellipse cx={x + 6} cy={y + h * 0.78} rx="9" ry={h * 0.22} fill="#e9d5ff" opacity="0.82" />
            </g>
          ))}
        </svg>
      );

    case "butterfly-mansion":
      return (
        <svg
          className="ds-scene-svg"
          viewBox="0 0 1200 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="bm-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1b1332" />
              <stop offset="55%" stopColor="#352047" />
              <stop offset="100%" stopColor="#1c1129" />
            </linearGradient>
            <linearGradient id="bm-shoji" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.52" />
            </linearGradient>
            <linearGradient id="bm-wood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b231b" />
              <stop offset="100%" stopColor="#21120e" />
            </linearGradient>
          </defs>

          <rect width="1200" height="560" fill="url(#bm-sky)" />
          {/* Evening sun / twilight moon behind garden */}
          <circle cx="600" cy="190" r="145" fill="#fbbf24" opacity="0.12" />
          <circle cx="600" cy="185" r="56" fill="#fef3c7" opacity="0.28" />

          {/* Garden shrubs & courtyard pond reflection */}
          <path
            d="M0 365 Q190 315 370 355 Q560 325 760 355 Q980 310 1200 365 L1200 440 L0 440 Z"
            fill="#1e1836"
          />
          <ellipse cx="600" cy="402" rx="220" ry="26" fill="#312e81" opacity="0.45" />

          {/* Left & Right Mansion Wings with warm Shoji lattice screens */}
          <g>
            {/* Left wing */}
            <rect x="0" y="75" width="320" height="315" fill="#231412" />
            <rect x="28" y="105" width="245" height="240" fill="url(#bm-shoji)" opacity="0.84" />
            <g stroke="#3d241b" strokeWidth="5">
              <line x1="90" y1="105" x2="90" y2="345" />
              <line x1="152" y1="105" x2="152" y2="345" />
              <line x1="214" y1="105" x2="214" y2="345" />
              <line x1="28" y1="165" x2="273" y2="165" />
              <line x1="28" y1="225" x2="273" y2="225" />
              <line x1="28" y1="285" x2="273" y2="285" />
            </g>

            {/* Right wing */}
            <rect x="880" y="75" width="320" height="315" fill="#231412" />
            <rect x="927" y="105" width="245" height="240" fill="url(#bm-shoji)" opacity="0.84" />
            <g stroke="#3d241b" strokeWidth="5">
              <line x1="988" y1="105" x2="988" y2="345" />
              <line x1="1050" y1="105" x2="1050" y2="345" />
              <line x1="1112" y1="105" x2="1112" y2="345" />
              <line x1="927" y1="165" x2="1172" y2="165" />
              <line x1="927" y1="225" x2="1172" y2="225" />
              <line x1="927" y1="285" x2="1172" y2="285" />
            </g>
          </g>

          {/* Traditional Wooden Roof Eaves across top */}
          <path d="M0 0 L1200 0 L1200 88 L880 88 L850 58 L350 58 L320 88 L0 88 Z" fill="#170e14" />
          <rect x="330" y="58" width="18" height="370" fill="#2a1914" />
          <rect x="852" y="58" width="18" height="370" fill="#2a1914" />

          {/* Hanging paper lanterns (Chochin) */}
          {[
            [365, 118],
            [835, 118],
          ].map(([cx, cy], idx) => (
            <g key={idx} transform={`translate(${cx}, ${cy})`}>
              <line x1="0" y1="-60" x2="0" y2="0" stroke="#451a03" strokeWidth="2" />
              <ellipse cx="0" cy="24" rx="18" ry="26" fill="#fef3c7" opacity="0.92" />
              <ellipse cx="0" cy="24" rx="46" ry="46" fill="#fbbf24" opacity="0.16" />
              <rect x="-12" y="-2" width="24" height="6" fill="#1f1210" />
              <rect x="-12" y="46" width="24" height="6" fill="#1f1210" />
            </g>
          ))}

          {/* Wooden Engawa Porch Floor */}
          <polygon points="0,425 1200,425 1200,560 0,560" fill="url(#bm-wood)" />
          <g stroke="#140a07" strokeWidth="2" opacity="0.6">
            <line x1="0" y1="452" x2="1200" y2="452" />
            <line x1="0" y1="485" x2="1200" y2="485" />
            <line x1="0" y1="522" x2="1200" y2="522" />
          </g>

          {/* Courtyard wisteria / butterfly garden accents */}
          <g opacity="0.72">
            <circle cx="430" cy="310" r="45" fill="#9333ea" opacity="0.22" />
            <circle cx="770" cy="300" r="48" fill="#c084fc" opacity="0.2" />
          </g>
        </svg>
      );

    case "mugen-train":
      return (
        <svg
          className="ds-scene-svg"
          viewBox="0 0 1200 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mt-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#05060c" />
              <stop offset="55%" stopColor="#140b15" />
              <stop offset="100%" stopColor="#2c0d09" />
            </linearGradient>
            <linearGradient id="mt-fire" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.7" />
              <stop offset="55%" stopColor="#dc2626" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="1200" height="560" fill="url(#mt-sky)" />
          <rect x="0" y="250" width="1200" height="310" fill="url(#mt-fire)" />

          {/* Night landscape speed blur & distant ridge */}
          <path d="M0 360 L260 325 L520 350 L820 320 L1200 355 L1200 560 L0 560 Z" fill="#0d080c" />

          {/* Speeding Taisho Steam Locomotive & Train Carriages along tracks */}
          <g transform="translate(80, 215)">
            {/* Billowing dark steam */}
            <ellipse cx="260" cy="-25" rx="180" ry="38" fill="#1e1b2e" opacity="0.7" />
            <ellipse cx="480" cy="-42" rx="220" ry="44" fill="#1a1426" opacity="0.55" />
            {/* Passenger cars */}
            <rect x="275" y="45" width="760" height="128" rx="8" fill="#161118" stroke="#3f2b22" strokeWidth="3" />
            {[310, 385, 460, 535, 610, 685, 760, 835, 910, 975].map((wx, i) => (
              <rect
                key={i}
                x={wx}
                y="72"
                width="48"
                height="56"
                rx="4"
                fill="#fbbf24"
                opacity={i % 3 === 0 ? 0.85 : 0.68}
              />
            ))}
            {/* Steam Engine Head */}
            <rect x="55" y="38" width="215" height="135" rx="12" fill="#110e14" stroke="#4b352a" strokeWidth="3" />
            <rect x="95" y="0" width="36" height="44" fill="#151118" />
            <circle cx="52" cy="110" r="24" fill="#fde68a" opacity="0.9" />
            <circle cx="52" cy="110" r="92" fill="#f59e0b" opacity="0.16" />
          </g>

          {/* Railway embankment & steel rails in perspective */}
          <polygon points="0,415 1200,395 1200,560 0,560" fill="#170d0b" />
          <g stroke="#78716c" strokeWidth="4" opacity="0.72">
            <line x1="0" y1="440" x2="1200" y2="418" />
            <line x1="0" y1="485" x2="1200" y2="452" />
          </g>
          <g stroke="#44403c" strokeWidth="6" opacity="0.65">
            {[40, 140, 240, 340, 440, 540, 640, 740, 840, 940, 1040, 1140].map((tx) => (
              <line key={tx} x1={tx} y1="436" x2={tx - 38} y2="492" />
            ))}
          </g>

          {/* Flame Hashira blazing arc motif */}
          <path
            d="M0 540 Q320 450 640 505 Q920 550 1200 455"
            fill="none"
            stroke="#fb923c"
            strokeWidth="5"
            opacity="0.55"
          />
        </svg>
      );

    case "entertainment-district":
      return (
        <svg
          className="ds-scene-svg"
          viewBox="0 0 1200 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ed-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14081d" />
              <stop offset="55%" stopColor="#2a0d2b" />
              <stop offset="100%" stopColor="#160711" />
            </linearGradient>
            <linearGradient id="ed-street" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e0b1a" />
              <stop offset="100%" stopColor="#0e050b" />
            </linearGradient>
          </defs>

          <rect width="1200" height="560" fill="url(#ed-sky)" />
          {/* Crescent Moon */}
          <path d="M585 65 A45 45 0 1 0 642 122 A36 36 0 1 1 585 65 Z" fill="#fef3c7" opacity="0.82" />

          {/* Multi-story Yoshiwara wooden buildings (Left & Right perspective) */}
          <g fill="#190914" stroke="#f59e0b" strokeOpacity="0.25" strokeWidth="1.5">
            <polygon points="0,70 360,155 360,440 0,490" />
            <polygon points="1200,70 840,155 840,440 1200,490" />
            <rect x="355" y="210" width="490" height="215" fill="#130710" />
          </g>

          {/* Lit paper lattice windows & balconies */}
          {[
            [40, 145, 95, 70],
            [165, 175, 85, 62],
            [270, 200, 68, 55],
            [40, 275, 95, 82],
            [165, 290, 85, 72],
            [1065, 145, 95, 70],
            [950, 175, 85, 62],
            [862, 200, 68, 55],
            [1065, 275, 95, 82],
            [950, 290, 85, 72],
          ].map(([x, y, w, h], idx) => (
            <g key={idx}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill={idx % 2 === 0 ? "#fbbf24" : "#f472b6"}
                opacity="0.58"
              />
              <rect x={x} y={y + h / 2} width={w} height="3" fill="#2b0d1e" />
              <rect x={x + w / 2} y={y} width="3" height={h} fill="#2b0d1e" />
            </g>
          ))}

          {/* Tiled Roof Overhangs */}
          <path d="M0 120 L385 192 L370 206 L0 138 Z" fill="#0d0409" />
          <path d="M1200 120 L815 192 L830 206 L1200 138 Z" fill="#0d0409" />

          {/* Overhead Festive Red & Gold Lantern Strings */}
          <path d="M120 140 Q600 225 1080 140" fill="none" stroke="#4a1628" strokeWidth="2.5" />
          {[190, 290, 400, 520, 680, 800, 910, 1010].map((lx, idx) => {
            const norm = (lx - 600) / 480;
            const ly = 185 - norm * norm * 45;
            return (
              <g key={idx} transform={`translate(${lx}, ${ly})`}>
                <ellipse
                  cx="0"
                  cy="16"
                  rx="13"
                  ry="19"
                  fill={idx % 2 === 0 ? "#ef4444" : "#f59e0b"}
                  opacity="0.92"
                />
                <circle cx="0" cy="16" r="32" fill={idx % 2 === 0 ? "#ef4444" : "#fbbf24"} opacity="0.16" />
              </g>
            );
          })}

          {/* Wet cobblestone street reflection */}
          <polygon points="0,460 360,420 840,420 1200,460 1200,560 0,560" fill="url(#ed-street)" />
          <ellipse cx="600" cy="495" rx="280" ry="38" fill="#ec4899" opacity="0.15" />
          <ellipse cx="600" cy="495" rx="170" ry="24" fill="#fbbf24" opacity="0.16" />
        </svg>
      );

    case "swordsmith-village":
      return (
        <svg
          className="ds-scene-svg"
          viewBox="0 0 1200 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sv-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b1f27" />
              <stop offset="55%" stopColor="#172c38" />
              <stop offset="100%" stopColor="#1b1420" />
            </linearGradient>
            <linearGradient id="sv-mist" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5eead4" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#99f6e4" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="1200" height="560" fill="url(#sv-sky)" />
          {/* Misty mountain peaks */}
          <path d="M0 340 L210 185 L430 300 L640 165 L890 290 L1080 190 L1200 265 L1200 560 L0 560 Z" fill="#10252d" />
          <path d="M0 390 L180 285 L390 365 L610 260 L820 355 L1030 270 L1200 335 L1200 560 L0 560 Z" fill="#0b181f" />

          {/* Cedar silhouettes */}
          {[70, 145, 230, 960, 1045, 1130].map((tx, idx) => (
            <polygon
              key={idx}
              points={`${tx},190 ${tx - 38},410 ${tx + 38},410`}
              fill="#071217"
            />
          ))}

          {/* Swordsmith Forge Hut on left/right */}
          <g transform="translate(80, 295)">
            <polygon points="-20,50 130,-10 280,50" fill="#1f1615" stroke="#44403c" strokeWidth="2" />
            <rect x="10" y="50" width="240" height="145" fill="#171110" />
            {/* Glowing furnace doorway */}
            <rect x="92" y="95" width="76" height="100" fill="#ea580c" opacity="0.85" />
            <ellipse cx="130" cy="145" rx="68" ry="52" fill="#f97316" opacity="0.32" />
            {/* Chimney smoke */}
            <rect x="200" y="-22" width="18" height="45" fill="#1c1917" />
          </g>

          {/* Traditional village roof on right */}
          <g transform="translate(860, 315)">
            <polygon points="-15,45 125,-12 265,45" fill="#1e1722" />
            <rect x="10" y="45" width="230" height="130" fill="#14101a" />
            <rect x="45" y="75" width="60" height="52" fill="#f9a8d4" opacity="0.45" />
            <rect x="145" y="75" width="60" height="52" fill="#fde68a" opacity="0.45" />
          </g>

          {/* Rolling Tokito Mist Layer */}
          <path
            d="M0 395 Q300 355 600 395 T1200 385 L1200 560 L0 560 Z"
            fill="url(#sv-mist)"
          />
          <rect y="445" width="1200" height="115" fill="#0d151b" opacity="0.85" />
        </svg>
      );

    case "hashira-training":
      return (
        <svg
          className="ds-scene-svg"
          viewBox="0 0 1200 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ht-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#181815" />
              <stop offset="55%" stopColor="#28231c" />
              <stop offset="100%" stopColor="#12100d" />
            </linearGradient>
            <linearGradient id="ht-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.82" />
              <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.72" />
            </linearGradient>
          </defs>

          <rect width="1200" height="560" fill="url(#ht-sky)" />

          {/* Rugged Cliffs */}
          <path d="M0 150 L290 120 L380 390 L0 410 Z" fill="#1c1917" />
          <path d="M1200 135 L880 110 L810 395 L1200 410 Z" fill="#1c1917" />
          <rect x="330" y="95" width="520" height="320" fill="#231f1b" />

          {/* Towering Waterfall */}
          <rect x="515" y="105" width="170" height="320" fill="url(#ht-water)" />
          <g stroke="#e0f2fe" strokeWidth="3" opacity="0.65">
            <line x1="540" y1="115" x2="540" y2="415" />
            <line x1="575" y1="125" x2="575" y2="420" />
            <line x1="615" y1="110" x2="615" y2="418" />
            <line x1="655" y1="120" x2="655" y2="415" />
          </g>
          {/* Waterfall spray cloud */}
          <ellipse cx="600" cy="422" rx="170" ry="30" fill="#e0f2fe" opacity="0.38" />

          {/* Massive Gyomei training boulders with Shimenawa ropes */}
          <g>
            <ellipse cx="220" cy="445" rx="95" ry="68" fill="#292524" stroke="#57534e" strokeWidth="3" />
            <path d="M135 435 Q220 455 305 432" fill="none" stroke="#d6d3d1" strokeWidth="6" strokeDasharray="10 5" />
            <ellipse cx="990" cy="450" rx="108" ry="74" fill="#292524" stroke="#57534e" strokeWidth="3" />
            <path d="M890 438 Q990 462 1090 436" fill="none" stroke="#d6d3d1" strokeWidth="6" strokeDasharray="10 5" />
          </g>

          {/* Earthy training ground */}
          <rect y="455" width="1200" height="105" fill="#171412" opacity="0.9" />
          {/* Wooden training posts */}
          <rect x="380" y="340" width="16" height="125" fill="#451a03" />
          <rect x="805" y="340" width="16" height="125" fill="#451a03" />
        </svg>
      );

    case "muzan-ambush":
      return (
        <svg
          className="ds-scene-svg"
          viewBox="0 0 1200 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ma-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#050204" />
              <stop offset="55%" stopColor="#1a0409" />
              <stop offset="100%" stopColor="#0a0204" />
            </linearGradient>
            <radialGradient id="ma-crimson" cx="50%" cy="46%" r="52%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1200" height="560" fill="url(#ma-sky)" />
          <rect width="1200" height="560" fill="url(#ma-crimson)" />
          <circle cx="600" cy="145" r="58" fill="#991b1b" opacity="0.55" />

          {/* Burning shattered Ubuyashiki Estate Pillars & Eaves */}
          <path d="M0 110 L420 185 L405 205 L0 140 Z" fill="#140709" />
          <path d="M1200 110 L780 185 L795 205 L1200 140 Z" fill="#140709" />
          <rect x="135" y="135" width="24" height="310" fill="#1c090b" />
          <rect x="330" y="175" width="20" height="260" fill="#1c090b" />
          <rect x="850" y="175" width="20" height="260" fill="#1c090b" />
          <rect x="1040" y="135" width="24" height="310" fill="#1c090b" />

          {/* Roaring fire tongues in background */}
          {[
            [110, 440, 145],
            [230, 440, 185],
            [365, 440, 130],
            [835, 440, 135],
            [960, 440, 190],
            [1090, 440, 150],
          ].map(([fx, fy, fh], idx) => (
            <path
              key={idx}
              d={`M${fx - 45},${fy} Q${fx - 15},${fy - fh * 0.65} ${fx},${fy - fh} Q${fx + 22},${fy - fh * 0.55} ${fx + 45},${fy} Z`}
              fill={idx % 2 === 0 ? "#dc2626" : "#ea580c"}
              opacity="0.6"
            />
          ))}

          {/* Cracked Courtyard Stone Floor */}
          <polygon points="0,430 1200,430 1200,560 0,560" fill="#0d0407" />
          <g stroke="#7f1d1d" strokeWidth="2" opacity="0.48">
            <path d="M180 460 L340 495 L420 550" fill="none" />
            <path d="M980 455 L820 498 L750 555" fill="none" />
            <line x1="0" y1="472" x2="1200" y2="472" />
          </g>
        </svg>
      );

    case "infinity-castle":
      return (
        <svg
          className="ds-scene-svg"
          viewBox="0 0 1200 560"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ic-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#140709" />
              <stop offset="50%" stopColor="#27100c" />
              <stop offset="100%" stopColor="#0d0406" />
            </linearGradient>
            <linearGradient id="ic-shoji" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.38" />
            </linearGradient>
          </defs>

          <rect width="1200" height="560" fill="url(#ic-bg)" />

          {/* Deep central glowing Infinity Castle abyss */}
          <circle cx="600" cy="270" r="240" fill="#d97706" opacity="0.18" />
          <circle cx="600" cy="270" r="140" fill="#dc2626" opacity="0.2" />

          {/* Floating & tilted wooden shoji rooms & corridors */}
          <g stroke="#d4af37" strokeOpacity="0.45" strokeWidth="2">
            {/* Upper upside-down corridor */}
            <g transform="translate(360, -10)">
              <rect x="0" y="0" width="480" height="120" fill="#1e0c0d" />
              <rect x="35" y="16" width="110" height="86" fill="url(#ic-shoji)" />
              <rect x="185" y="16" width="110" height="86" fill="url(#ic-shoji)" />
              <rect x="335" y="16" width="110" height="86" fill="url(#ic-shoji)" />
            </g>

            {/* Left vertical/angled wooden pavilion */}
            <g transform="translate(-20, 75) rotate(-10)">
              <rect x="0" y="0" width="275" height="395" fill="#1a090a" />
              <rect x="30" y="35" width="210" height="145" fill="url(#ic-shoji)" opacity="0.82" />
              <rect x="30" y="210" width="210" height="145" fill="url(#ic-shoji)" opacity="0.68" />
              <line x1="100" y1="35" x2="100" y2="355" stroke="#2c110f" strokeWidth="5" />
              <line x1="170" y1="35" x2="170" y2="355" stroke="#2c110f" strokeWidth="5" />
            </g>

            {/* Right vertical/angled wooden pavilion */}
            <g transform="translate(945, 30) rotate(10)">
              <rect x="0" y="0" width="275" height="395" fill="#1a090a" />
              <rect x="35" y="35" width="210" height="145" fill="url(#ic-shoji)" opacity="0.82" />
              <rect x="35" y="210" width="210" height="145" fill="url(#ic-shoji)" opacity="0.68" />
              <line x1="105" y1="35" x2="105" y2="355" stroke="#2c110f" strokeWidth="5" />
              <line x1="175" y1="35" x2="175" y2="355" stroke="#2c110f" strokeWidth="5" />
            </g>

            {/* Diagonal staircases & beams */}
            <polygon points="220,390 470,220 495,245 245,415" fill="#2d130f" />
            <polygon points="980,390 730,220 705,245 955,415" fill="#2d130f" />
            <rect x="440" y="205" width="320" height="15" fill="#3a1811" />
          </g>

          {/* Lower tatami & timber platform */}
          <polygon points="0,445 1200,445 1200,560 0,560" fill="#1a0b0b" stroke="#d4af37" strokeOpacity="0.45" strokeWidth="2" />
          <g stroke="#3d1b15" strokeWidth="2">
            <line x1="200" y1="445" x2="120" y2="560" />
            <line x1="400" y1="445" x2="360" y2="560" />
            <line x1="600" y1="445" x2="600" y2="560" />
            <line x1="800" y1="445" x2="840" y2="560" />
            <line x1="1000" y1="445" x2="1080" y2="560" />
          </g>
        </svg>
      );
  }
}

export function EndingBackdropArt({ theme }: { theme: EndingThemeId }) {
  switch (theme) {
    case "dawn-hashira":
      return (
        <svg
          className="ds-ending-svg"
          viewBox="0 0 1200 440"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ed1-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e163c" />
              <stop offset="48%" stopColor="#6b2740" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <radialGradient id="ed1-sun" cx="50%" cy="76%" r="48%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1200" height="440" fill="url(#ed1-sky)" />
          <circle cx="600" cy="325" r="270" fill="url(#ed1-sun)" />
          <circle cx="600" cy="315" r="78" fill="#fef9c3" opacity="0.9" />

          {/* Sunbeams */}
          <g fill="#fef3c7" opacity="0.12">
            <polygon points="600,315 120,0 260,0" />
            <polygon points="600,315 410,0 530,0" />
            <polygon points="600,315 670,0 790,0" />
            <polygon points="600,315 940,0 1080,0" />
          </g>

          {/* Dawn mountain ridges */}
          <path d="M0 325 L230 230 L420 295 L610 215 L830 290 L1030 220 L1200 280 L1200 440 L0 440 Z" fill="#2c1423" />
          <path d="M0 365 L180 310 L380 355 L600 305 L820 355 L1020 308 L1200 350 L1200 440 L0 440 Z" fill="#170c16" />

          {/* Wisteria & pine cliffside framing */}
          <path d="M0 0 L240 0 Q140 85 0 110 Z" fill="#160d1c" />
          <path d="M1200 0 L960 0 Q1060 85 1200 110 Z" fill="#160d1c" />
        </svg>
      );

    case "crimson-bonds":
      return (
        <svg
          className="ds-ending-svg"
          viewBox="0 0 1200 440"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ed2-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e1836" />
              <stop offset="52%" stopColor="#5e243c" />
              <stop offset="100%" stopColor="#381822" />
            </linearGradient>
            <linearGradient id="ed2-shoji" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <rect width="1200" height="440" fill="url(#ed2-sky)" />
          <circle cx="600" cy="180" r="220" fill="#fb923c" opacity="0.24" />
          <circle cx="600" cy="180" r="85" fill="#fef3c7" opacity="0.34" />

          {/* Warm Butterfly Estate Garden + Shoji Screens */}
          <rect x="0" y="55" width="235" height="285" fill="#23121b" />
          <rect x="28" y="85" width="180" height="215" fill="url(#ed2-shoji)" />
          <g stroke="#3d1e24" strokeWidth="4">
            <line x1="88" y1="85" x2="88" y2="300" />
            <line x1="148" y1="85" x2="148" y2="300" />
            <line x1="28" y1="155" x2="208" y2="155" />
            <line x1="28" y1="225" x2="208" y2="225" />
          </g>

          <rect x="965" y="55" width="235" height="285" fill="#23121b" />
          <rect x="992" y="85" width="180" height="215" fill="url(#ed2-shoji)" />
          <g stroke="#3d1e24" strokeWidth="4">
            <line x1="1052" y1="85" x2="1052" y2="300" />
            <line x1="1112" y1="85" x2="1112" y2="300" />
            <line x1="992" y1="155" x2="1172" y2="155" />
            <line x1="992" y1="225" x2="1172" y2="225" />
          </g>

          {/* Overhead veranda beam & blossoming sakura branches */}
          <rect x="0" y="0" width="1200" height="58" fill="#1b0e14" />
          <path d="M180 54 Q260 66 355 56" fill="none" stroke="#2d171c" strokeWidth="6" />
          <path d="M1020 54 Q940 66 845 56" fill="none" stroke="#2d171c" strokeWidth="6" />
          {[
            [260, 62, 22],
            [292, 74, 18],
            [328, 60, 20],
            [360, 72, 15],
            [840, 70, 16],
            [875, 58, 22],
            [912, 72, 19],
            [948, 62, 21],
          ].map(([bx, by, br], idx) => (
            <circle
              key={idx}
              cx={bx}
              cy={by}
              r={br}
              fill={idx % 2 === 0 ? "#f472b6" : "#fbcfe8"}
              opacity="0.38"
            />
          ))}
          <ellipse cx="600" cy="275" rx="190" ry="95" fill="#f9a8d4" opacity="0.14" />

          {/* Sunlit Wooden Engawa Porch */}
          <rect y="335" width="1200" height="105" fill="#2b1714" />
          <g stroke="#170b0a" strokeWidth="2" opacity="0.6">
            <line x1="0" y1="365" x2="1200" y2="365" />
            <line x1="0" y1="400" x2="1200" y2="400" />
          </g>
        </svg>
      );

    case "solitary-blade":
      return (
        <svg
          className="ds-ending-svg"
          viewBox="0 0 1200 440"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ed3-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#070d1b" />
              <stop offset="60%" stopColor="#121e38" />
              <stop offset="100%" stopColor="#090c16" />
            </linearGradient>
          </defs>

          <rect width="1200" height="440" fill="url(#ed3-sky)" />
          <circle cx="600" cy="115" r="145" fill="#93c5fd" opacity="0.18" />
          <circle cx="600" cy="115" r="56" fill="#eff6ff" opacity="0.88" />

          {/* Bamboo Forest Silhouettes */}
          <g stroke="#081020" strokeWidth="14" opacity="0.85">
            <line x1="90" y1="0" x2="115" y2="440" />
            <line x1="165" y1="0" x2="150" y2="440" />
            <line x1="255" y1="0" x2="275" y2="440" />
            <line x1="925" y1="0" x2="905" y2="440" />
            <line x1="1030" y1="0" x2="1048" y2="440" />
            <line x1="1115" y1="0" x2="1095" y2="440" />
          </g>

          {/* Moonlit mist & stone steps */}
          <ellipse cx="600" cy="340" rx="480" ry="52" fill="#60a5fa" opacity="0.14" />
          <polygon points="0,350 1200,350 1200,440 0,440" fill="#070b14" />
          <polygon points="440,350 760,350 860,440 340,440" fill="#0f172a" />
        </svg>
      );

    case "crimson-abyss":
      return (
        <svg
          className="ds-scene-svg ds-ending-svg"
          viewBox="0 0 1200 440"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ed4-abyss" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#070305" />
              <stop offset="52%" stopColor="#1b0609" />
              <stop offset="100%" stopColor="#090304" />
            </linearGradient>
            <radialGradient id="ed4-bloodmoon" cx="50%" cy="32%" r="42%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.62" />
              <stop offset="48%" stopColor="#7f1d1d" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#090304" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1200" height="440" fill="url(#ed4-abyss)" />
          <rect width="1200" height="440" fill="url(#ed4-bloodmoon)" />

          {/* Cracked Crimson Blood Moon */}
          <circle cx="600" cy="138" r="76" fill="#991b1b" opacity="0.72" />
          <path d="M565 82 L598 136 L584 188 M622 92 L602 140 L630 198" fill="none" stroke="#160406" strokeWidth="4" />

          {/* Tilted collapsing Infinity Castle shoji rooms */}
          <g fill="#110608" stroke="#7f1d1d" strokeOpacity="0.45" strokeWidth="2">
            <g transform="translate(-20, 40) rotate(-12)">
              <rect x="0" y="0" width="250" height="310" />
              <rect x="30" y="34" width="180" height="105" fill="#450a0a" opacity="0.7" />
              <rect x="30" y="162" width="180" height="105" fill="#2b0607" opacity="0.65" />
            </g>
            <g transform="translate(970, 15) rotate(13)">
              <rect x="0" y="0" width="250" height="310" />
              <rect x="35" y="34" width="180" height="105" fill="#450a0a" opacity="0.7" />
              <rect x="35" y="162" width="180" height="105" fill="#2b0607" opacity="0.65" />
            </g>
          </g>

          {/* Shattered wooden beams & embers */}
          <polygon points="0,335 1200,335 1200,440 0,440" fill="#090406" />
          <polygon points="340,335 600,295 860,335 940,440 260,440" fill="#140709" />
          <g stroke="#dc2626" strokeWidth="2" opacity="0.42">
            <line x1="210" y1="362" x2="430" y2="395" />
            <line x1="990" y1="360" x2="770" y2="398" />
          </g>

          {/* Broken Nichirin Blade planted into ash */}
          <g transform="translate(600, 342) rotate(-14)">
            <rect x="-5" y="-58" width="10" height="58" fill="#44403c" />
            <polygon points="-5,-58 5,-70 5,-58" fill="#78716c" />
            <rect x="-15" y="-2" width="30" height="6" rx="2" fill="#7f1d1d" />
            <rect x="-4" y="4" width="8" height="24" fill="#1c1917" />
          </g>
        </svg>
      );
  }
}
