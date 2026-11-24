import type {
  CharacterEvaluationProfile,
  CharacterId,
  CharacterMeta,
} from "../types";

export const CHARACTER_IDS: CharacterId[] = [
  "ichigo",
  "rukia",
  "ishida",
  "orihime",
  "sado",
  "urahara",
  "kon",
];

export const CHARACTERS: Record<CharacterId, CharacterMeta> = {
  ichigo: {
    id: "ichigo",
    name: "쿠로사키 이치고",
    title: "사신 대행 · 참월",
    specialty: "월아천충 · 호로화",
    image: "/bleach/characters/ichigo.png",
    accentColor: "#f97316",
  },
  rukia: {
    id: "rukia",
    name: "쿠치키 루키아",
    title: "13번대 사신 · 수백설",
    specialty: "빙설계 참백도 · 귀도",
    image: "/bleach/characters/rukia.png",
    accentColor: "#38bdf8",
  },
  ishida: {
    id: "ishida",
    name: "이시다 우류",
    title: "최후의 퀸시 · 영자 궁수",
    specialty: "하이리히 프파일 · 전술 저격",
    image: "/bleach/characters/ishida.png",
    accentColor: "#60a5fa",
  },
  orihime: {
    id: "orihime",
    name: "이노우에 오리히메",
    title: "순순육화 · 사상 거절",
    specialty: "쌍천귀순 · 삼천결순",
    image: "/bleach/characters/orihime.png",
    accentColor: "#fbbf24",
  },
  sado: {
    id: "sado",
    name: "사도 야스토라",
    title: "거인의 오른팔 · 악마의 왼팔",
    specialty: "엘 디렉토 · 라 무에르테",
    image: "/bleach/characters/sado.png",
    accentColor: "#ef4444",
  },
  urahara: {
    id: "urahara",
    name: "우라하라 키스케",
    title: "우라하라 상점 점주 · 홍희",
    specialty: "전술 통찰 · 전신 계략",
    image: "/bleach/characters/urahara.png",
    accentColor: "#10b981",
  },
  kon: {
    id: "kon",
    name: "콘",
    title: "개조 혼백 · 마스코트",
    specialty: "강렬한 각력 · 기민한 구원",
    image: "/bleach/characters/kon.png",
    accentColor: "#facc15",
    isSpirit: true,
  },
};

export const CHARACTER_EVALUATION_PROFILES: Record<
  CharacterId,
  CharacterEvaluationProfile
> = {
  ichigo: {
    id: "ichigo",
    focus: "단호한 수호 각오와 정면 돌파",
    comments: {
      S: "야, 꽤 하잖아! 네가 등을 맡아 준 덕분에 망설임 없이 참월을 휘두를 수 있었어. 넌 진짜 믿음직한 동료야!",
      A: "좋았어, 위기 때마다 물러서지 않고 정면으로 부딪혀 준 덕분에 버텨 냈어. 다음엔 더 멀리 갈 수 있겠는데?",
      B: "어느 정도 제 몫은 해냈군. 하지만 아직 중요한 순간에 주저하는 버릇이 남아 있어. 각오를 더 단단히 다져.",
      C: "검을 쥐고도 계속 흔들리면 옆에 있는 녀석들까지 위험해진다고! 싸울 생각이 있는 건지 다시 생각해 봐.",
      D: "꼴사납군! 지키겠다는 말뿐이고 영압도 각오도 바닥이잖아. 그따위 태도로는 카라쿠라 마을에서 아무것도 못 지켜!",
    },
  },
  rukia: {
    id: "rukia",
    focus: "사신다운 냉정한 판단과 책임감",
    comments: {
      S: "훌륭하다. 혼란스러운 전장에서도 영압의 흐름과 사신의 책무를 정확히 꿰뚫었구나. 네 판단에 수백설의 검을 맡겨도 손색이 없어.",
      A: "냉정함과 용기의 균형이 잘 잡혀 있었다. 사신 대행으로서 충분히 믿고 현세를 맡길 만한 실력이야.",
      B: "기본적인 역할은 해냈지만, 사신으로서의 결단력이 한 끗 부족했다. 다음 임무에서는 책임을 더 무겁게 지도록 해.",
      C: "무모함과 경솔함이 지나치구나! 영압 제어도 못 하면서 칼을 뽑는 건 자멸 행위와 다름없다.",
      D: "실망스럽군! 사신의 긍지도 동료에 대한 책임감도 찾아볼 수 없어. 당장 참백도를 내려놓고 처음부터 다시 배워라!",
    },
  },
  ishida: {
    id: "ishida",
    focus: "치밀한 전술과 퀸시식 정공법",
    comments: {
      S: "인정하기 싫지만… 네 전술안과 영자 제어는 내 계산을 뛰어넘었군. 무식하게 돌격만 하는 쿠로사키와는 차원이 달라.",
      A: "상대의 빈틈을 읽어 내고 합리적으로 움직였어. 나름대로 퀸시의 연계에 맞춰 줄 만한 실력은 갖췄더군.",
      B: "적당히 버텨 내긴 했지만, 전술적인 마무리가 투박했어. 조금 더 냉철하게 영압을 다듬을 필요가 있군.",
      C: "대체 무슨 생각으로 그런 무모한 수를 둔 거지? 작전도 거리 계산도 전부 엉망진창이었어!",
      D: "한심하군. 머리를 쓸 생각은 전혀 없고 영압만 낭비하는군. 이럴 거면 처음부터 내 작전에 끼어들지 말았어야지!",
    },
  },
  orihime: {
    id: "orihime",
    focus: "상처를 보듬는 배려와 동료 보호",
    comments: {
      S: "정말 고마워요! 모두가 다치지 않게 끝까지 마음을 써 준 덕분에 내 순순육화도 한 번도 흔들리지 않았어요!",
      A: "언제나 동료들을 먼저 생각해 주어서 마음이 놓였어요. 당신과 함께라면 어떤 밤도 무섭지 않아요!",
      B: "열심히 싸워 준 건 알지만, 조금만 더 서로의 상처를 돌아볼 여유가 있었으면 좋았을 텐데요.",
      C: "그렇게 혼자서 무리하거나 다른 사람을 내버려 두면… 결국 모두가 아파할 뿐이에요. 너무 속상해요…",
      D: "싫어요…! 지키겠다던 마음은 다 어디로 간 건가요? 동료를 외면하는 모습은 두 번 다시 보고 싶지 않아요!",
    },
  },
  sado: {
    id: "sado",
    focus: "말없이 등을 맡기는 묵직한 신의",
    comments: {
      S: "……믿고 있었어. 네가 곁에 서 있는 한, 내 오른팔이 흔들릴 일은 없다. 끝까지 함께 싸워 줘서 고맙다.",
      A: "묵묵히 약속을 지켰군. 네가 등을 맡겨 준 덕분에 나도 끝까지 주먹을 내지를 수 있었어.",
      B: "나쁘지 않은 싸움이었다. 다만 동료를 믿는 마음이 조금만 더 깊었다면 결과가 달랐을 거다.",
      C: "……말로만 동료를 부르지 마라. 결정적인 순간에 서로의 등을 저버리면 남는 건 패배뿐이다.",
      D: "실망했다. 신의도 버팀목도 없이 무너지는 자에게 내 등을 맡길 순 없어. 영혼부터 다시 단련하고 와라.",
    },
  },
  urahara: {
    id: "urahara",
    focus: "전장을 꿰뚫는 유연한 통찰력",
    comments: {
      S: "오호호~ 대단하시네요! 제가 깔아 둔 수련과 함정의 의도까지 전부 읽고 판을 뒤집으시다니, 소울 소사이어티도 놀라겠는걸요?",
      A: "꽤 예리하신데요? 불리한 국면에서도 침착하게 흐름을 읽는 눈이 아주 좋습니다. 훌륭해요!",
      B: "뭐, 기본 점수 이상은 하셨습니다만… 숨겨진 진짜 의도까지는 아직 못 보신 것 같네요. 아쉽습니다~",
      C: "어이쿠, 눈앞의 미끼만 물고 판 전체를 못 보시면 곤란하죠! 수련장에서부터 다시 굴러야겠는데요?",
      D: "이건 완전히 낙제점이네요. 영압도 전략도 엉망이면 결국 호로들의 좋은 먹잇감이 될 뿐입니다. 안타깝군요.",
    },
  },
  kon: {
    id: "kon",
    focus: "유쾌한 센스와 결정적 순간의 구원",
    comments: {
      S: "이야아아! 이 콘 님께서 인정하는 최고의 콤비다!! 네 덕분에 내가 멋지게 활약할 각이 완벽하게 섰다고!",
      A: "흥! 제법 쓸 만한 녀석이잖아? 위기 때 날 내버려 두지 않은 점만큼은 높이 쳐 주마!",
      B: "뭐, 나쁘진 않았어. 그래도 다음엔 이 개조 혼백님의 눈부신 각력도 좀 더 신뢰하라고!",
      C: "야! 너 왜 자꾸 위험한 판만 만들어서 나까지 휘말리게 하는 거야?! 센스가 영 꽝이잖아!",
      D: "최악이야! 이치고 녀석보다 더 답이 없잖아! 나까지 호로한테 잡아먹힐 뻔했다고! 당장 반성해!!",
    },
  },
};
