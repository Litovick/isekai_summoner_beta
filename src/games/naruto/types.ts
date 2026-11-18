export type CharacterId =
  | "naruto"
  | "sasuke"
  | "sakura"
  | "kakashi"
  | "minato"
  | "itachi";

export type StatId = "ninjutsu" | "bond" | "willOfFire";

export type Stats = Record<StatId, number>;

export type Affinities = Record<CharacterId, number>;

export type Grade = "S" | "A" | "B" | "C" | "D";

export interface CharacterMeta {
  id: CharacterId;
  name: string;
  title: string;
  specialty: string;
  image: string;
  accentColor: string;
  isShadow?: boolean;
}

export interface CharacterEvaluationProfile {
  id: CharacterId;
  focus: string;
  comments: Record<Grade, string>;
}

export interface DialogueLine {
  speaker: CharacterId | "narrator";
  text: string;
}

export interface EpisodeChoice {
  id: "A" | "B" | "C";
  label: string;
  stance: string;
  effects: Stats;
  affinityEffects: Partial<Record<CharacterId, number>>;
  reactions: DialogueLine[];
}

export type EpisodeStageTheme =
  | "training-ground"
  | "wave-bridge"
  | "forest-of-death"
  | "akatsuki-moon"
  | "final-valley"
  | "twilight-medical"
  | "fourth-hokage-will";

export type EndingThemeId =
  | "hokage-legacy"
  | "team7-bond"
  | "solitary-anbu"
  | "leaf-training";

export interface Episode {
  id: number;
  code: string;
  title: string;
  location: string;
  stageTheme: EpisodeStageTheme;
  featuredCast: CharacterId[];
  lines: DialogueLine[];
  prompt: string;
  choices: [EpisodeChoice, EpisodeChoice, EpisodeChoice];
}

export type EndingId = "ending-01" | "ending-02" | "ending-03" | "ending-04";

export interface EndingInfo {
  id: EndingId;
  priority: number;
  title: string;
  subtitle: string;
  conditionLabel: string;
  theme: EndingThemeId;
  showcaseCast: CharacterId[];
  description: string;
  speaker: CharacterId;
  quote: string;
}

export interface CharacterEvaluation {
  id: CharacterId;
  name: string;
  title: string;
  specialty: string;
  image: string;
  accentColor: string;
  score: number;
  grade: Grade;
  focus: string;
  comment: string;
}

export type GamePhase =
  | "title"
  | "prologue"
  | "story"
  | "choice"
  | "reaction"
  | "result";

export interface GameState {
  phase: GamePhase;
  episodeIndex: number;
  lineIndex: number;
  stats: Stats;
  lastDelta: Stats | null;
  chosenIndex: number | null;
  answers: number[];
  affinities: Affinities;
  unlockedEndings: EndingId[];
}
