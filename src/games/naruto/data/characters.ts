import type {
  CharacterEvaluationProfile,
  CharacterId,
  CharacterMeta,
} from "../types";

export const CHARACTER_IDS: CharacterId[] = [
  "naruto",
  "sasuke",
  "sakura",
  "kakashi",
  "jiraiya",
  "itachi",
];

export const CHARACTERS: Record<CharacterId, CharacterMeta> = {
  naruto: {
    id: "naruto",
    name: "우즈마키 나루토",
    title: "제7반 · 나뭇잎 하급 닌자",
    specialty: "나선환 · 다중 그림자 분신술",
    image: "/naruto/characters/naruto.png",
    accentColor: "#f97316",
  },
  sasuke: {
    id: "sasuke",
    name: "우치하 사스케",
    title: "제7반 · 우치하의 천재",
    specialty: "사륜안 · 치도리 / 화둔",
    image: "/naruto/characters/sasuke.png",
    accentColor: "#38bdf8",
  },
  sakura: {
    id: "sakura",
    name: "하루노 사쿠라",
    title: "제7반 · 의료 닌자",
    specialty: "차크라 정밀 제어 · 장천각",
    image: "/naruto/characters/sakura.png",
    accentColor: "#f472b6",
  },
  kakashi: {
    id: "kakashi",
    name: "하타케 카카시",
    title: "제7반 담당 상급 닌자",
    specialty: "카피 닌자 · 뇌절",
    image: "/naruto/characters/kakashi.png",
    accentColor: "#94a3b8",
  },
  jiraiya: {
    id: "jiraiya",
    name: "지라이야",
    title: "전설의 3닌자 · 묘목산 두꺼비 선인",
    specialty: "선술 · 나선환 · 두꺼비 소환",
    image: "/naruto/characters/jiraiya.png",
    accentColor: "#fbbf24",
  },
  itachi: {
    id: "itachi",
    name: "우치하 이타치",
    title: "아카츠키 · 어둠 속의 수호자",
    specialty: "만화경 사륜안 · 츠쿠요미",
    image: "/naruto/characters/itachi.png",
    accentColor: "#dc2626",
    isShadow: true,
  },
};

export const CHARACTER_EVALUATION_PROFILES: Record<
  CharacterId,
  CharacterEvaluationProfile
> = {
  naruto: {
    id: "naruto",
    focus: "근성과 동료애",
    comments: {
      S: "너랑 같이 싸우면 절대 질 것 같지가 않아니깐! 넌 내 최고의 동료이자 라이벌이야! 호카게가 될 때까지 나랑 끝까지 가는 거다!",
      A: "좋았어! 포기하지 않는 그 근성, 진짜 나뭇잎 닌자답다고! 다음 임무에서도 내 등을 맡길 테니까니깐!",
      B: "헤헤, 꽤 잘 버텼잖아? 조금만 더 서로를 믿고 돌격하면 우리 제7반을 막을 녀석은 아무도 없을 거야!",
      C: "대체 왜 자꾸 동료를 외면하는 거야! 그렇게 눈치 보고 뒷걸음질 치면 아무것도 못 지킨다니깐!",
      D: "실망했어! 동료들을 버리고 혼자 도망치거나 망설이는 녀석은 절대 나뭇잎 닌자라고 부를 수 없어!!",
    },
  },
  sasuke: {
    id: "sasuke",
    focus: "실력 증명과 결단력",
    comments: {
      S: "흥… 네 움직임에는 망설임이 없더군. 적어도 내 등을 맡겨도 뒤처질 녀석은 아니야. 인정하지.",
      A: "전장의 흐름을 읽는 눈이 나쁘지 않아. 감정에 휩쓸리지 않고 끝까지 검을 휘두른 점은 높이 사주마.",
      B: "기초는 갖췄군. 하지만 그 정도 각오로 더 강한 적과 맞서려면 아직 한참 부족해.",
      C: "결정적인 순간마다 판단이 엉망이더군. 쓸데없는 실수는 전장에서 동료 목숨까지 앗아간다.",
      D: "어설픈 변명만 늘어놓는군. 그 정도 무능한 실력이라면 당장 닌자 서클렛을 반납해라.",
    },
  },
  sakura: {
    id: "sakura",
    focus: "동료 보호와 세밀한 판단",
    comments: {
      S: "당신이 있어서 제7반 모두가 끝까지 버틸 수 있었어요! 차크라 흐름도 전장 상황도 완벽하게 읽어냈네요. 정말 자랑스러워요!",
      A: "위험할 때마다 동료를 먼저 살피는 모습이 정말 든든했어요. 나루토도 사스케 군도 당신을 깊이 신뢰하고 있어요!",
      B: "조금 무모한 순간도 있었지만 제 몫은 확실히 해냈어요. 다음에는 조금 더 호흡을 맞춰 보자구요, 샨나로!",
      C: "마음대로 움직여서 다친 동료들을 위험에 빠뜨렸잖아요! 팀워크의 기본부터 다시 배우세요.",
      D: "동료들을 버려두고 무책임하게 행동하는 건 절대 용서할 수 없어요! 제7반에 있을 자격이 없어요!",
    },
  },
  kakashi: {
    id: "kakashi",
    focus: "팀워크와 전략적 통찰",
    comments: {
      S: "흠, 합격점 이상이군. 규칙을 지키면서도 동료를 버리지 않는 진짜 닌자의 답을 너 스스로 찾아냈어. 훌륭하다.",
      A: "상황 판단과 팀워크의 균형이 꽤 좋았어. 임무의 본질을 꿰뚫어 볼 줄 아는 녀석이 제7반에 들어와 줘서 다행이야.",
      B: "나쁘지 않은 수행이었어. 다만 적의 함정과 동료의 동선을 한 수 앞까지 읽는 연습을 조금 더 해두자고.",
      C: "판단이 얕고 팀워크도 엉망이군. 동료를 버리는 녀석이 닌자 세계에서 어떤 취급을 받는지 잊었나?",
      D: "최악의 결과다. 전략도 신뢰도 전부 무너졌어. 아카데미부터 다시 시작해야겠군.",
    },
  },
  jiraiya: {
    id: "jiraiya",
    focus: "포기하지 않는 근성과 스승의 신념",
    comments: {
      S: "하하하! 두꺼비 선인의 눈은 못 속이지! 끝까지 포기하지 않는 그 근성과 호쾌한 배짱… 나뭇잎의 미래는 이제 안심하고 맡겨도 되겠구먼!",
      A: "호오, 꽤 쓸 만한 녀석이 나타났군! 동료를 지키려 몸을 던지는 그 신념, 나루토와 꼭 닮은 진짜 시노비의 기질이야!",
      B: "나쁘지 않아! 선한 의지와 용기는 충분하네. 포기하지 않는 근성만 더 갈고닦으면 머지않아 전설의 이름을 잇게 될 게야.",
      C: "어이, 신념 없이 흔들리는 판단은 결국 마을과 동료를 위기에 빠뜨린다네. 닌자란 무엇을 견디는 자인지 다시 새겨 보거라.",
      D: "끌끌… 안타깝구먼. 지금의 자네에게선 포기하지 않는 근성도, 동료를 지키려는 시노비의 각오도 전혀 보이지 않는구나.",
    },
  },
  itachi: {
    id: "itachi",
    focus: "냉철한 통찰과 본질 파악",
    comments: {
      S: "감정이나 표면적인 현혹에 흔들리지 않고 진실의 본질을 꿰뚫었군. 스스로의 한계를 알고 동료를 믿을 줄 아는 자… 실로 진정한 닌자다.",
      A: "찰나의 환술 속에서도 꺾이지 않는 시선을 지녔구나. 어둠을 직시하면서도 빛을 버리지 않는 균형 감각이 뛰어나다.",
      B: "나쁘지 않은 판단이다. 하지만 아직 눈에 보이는 힘만으로 승부를 가늠하려 하는군. 본질을 보는 눈을 더 길러라.",
      C: "경솔한 판단과 조급함이 시야를 가리고 있다. 현실을 보지 못하는 자는 첫 수에서 패배할 뿐이다.",
      D: "아무것도 지키지 못한 채 자멸하는 어리석은 길로 걷고 있구나. 그 무능함으로는 결국 모든 것을 잃게 된다.",
    },
  },
};
