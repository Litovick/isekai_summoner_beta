export type CharacterId =
  | "tanjiro"
  | "nezuko"
  | "zenitsu"
  | "inosuke"
  | "giyu"
  | "shinobu"
  | "rengoku"
  | "tengen"
  | "muichiro"
  | "mitsuri"
  | "obanai"
  | "sanemi"
  | "gyomei"
  | "muzan";

export type CorpsCharacterId = Exclude<CharacterId, "muzan">;

export type StatId = "breathing" | "trust" | "resolve";

export type Stats = Record<StatId, number>;

export type Affinities = Record<CorpsCharacterId, number>;

export type Grade = "S" | "A" | "B" | "C" | "D";

export type HaoriPattern =
  | "ichimatsu"
  | "asanoha"
  | "uroko"
  | "seigaiha"
  | "kikko"
  | "flame"
  | "mist"
  | "stripes"
  | "wisteria";

export interface CharacterMeta {
  id: CharacterId;
  name: string;
  title: string;
  breathing: string;
  image: string;
  accentColor: string;
  pattern: HaoriPattern;
  isEnemy?: boolean;
}

export interface CorpsEvaluationProfile {
  id: CorpsCharacterId;
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
  affinityEffects: Partial<Record<CorpsCharacterId, number>>;
  reactions: DialogueLine[];
}

export type EpisodeStageTheme =
  | "wisteria-mountain"
  | "butterfly-mansion"
  | "mugen-train"
  | "entertainment-district"
  | "swordsmith-village"
  | "hashira-training"
  | "muzan-ambush"
  | "infinity-castle";

export type EndingThemeId =
  | "dawn-hashira"
  | "crimson-bonds"
  | "solitary-blade"
  | "crimson-abyss";

export interface Episode {
  id: number;
  code: string;
  title: string;
  location: string;
  stageTheme: EpisodeStageTheme;
  sceneDescription: string;
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
  speaker: CorpsCharacterId;
  quote: string;
  companionQuote?: {
    speaker: CorpsCharacterId;
    text: string;
  };
}

export interface CharacterEvaluation {
  id: CorpsCharacterId;
  name: string;
  title: string;
  breathing: string;
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
