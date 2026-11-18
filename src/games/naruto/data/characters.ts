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
  "minato",
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
  minato: {
    id: "minato",
    name: "나미카제 미나토",
    title: "4대 호카게 · 금빛 섬광",
    specialty: "비뢰신술 · 나선환 창시자",
    image: "/naruto/characters/minato.png",
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
      C: "잠깐 주춤하긴 했지만 아직 끝난 게 아니야! 한 번 내뱉은 말은 굽히지 않는 게 내 닌자도라구!",
      D: "어이, 혼자서 다 해결하려 하지 마! 동료들을 믿지 못하면 진정한 닌자가 될 수 없다니깐!",
    },
  },
  sasuke: {
    id: "sasuke",
    focus: "실력 증명과 결단력",
    comments: {
      S: "흥… 네 움직임에는 망설임이 없더군. 적어도 내 등을 맡겨도 뒤처질 녀석은 아니야. 인정하지.",
      A: "전장의 흐름을 읽는 눈이 나쁘지 않아. 감정에 휩쓸리지 않고 끝까지 검을 휘두른 점은 높이 사주마.",
      B: "기초는 갖췄군. 하지만 그 정도 각오로 더 강한 적과 맞서려면 아직 한참 부족해.",
      C: "결정적인 순간에 머뭇거리는 게 눈에 띄더군. 쓸데없는 망설임은 전장에서 목숨을 앗아간다.",
      D: "어설픈 타협만 반복하는군. 그 정도 실력과 각오라면 나뭇잎의 닌자라 부르기도 민망하다.",
    },
  },
  sakura: {
    id: "sakura",
    focus: "동료 보호와 세밀한 판단",
    comments: {
      S: "당신이 있어서 제7반 모두가 끝까지 버틸 수 있었어요! 차크라 흐름도 전장 상황도 완벽하게 읽어냈네요. 정말 자랑스러워요!",
      A: "위험할 때마다 동료를 먼저 살피는 모습이 정말 든든했어요. 나루토도 사스케 군도 당신을 깊이 신뢰하고 있어요!",
      B: "조금 무모한 순간도 있었지만 제 몫은 확실히 해냈어요. 다음에는 조금 더 호흡을 맞춰 보자구요, 샨나로!",
      C: "마음만 앞서서 자칫 큰 부상을 입을 뻔했잖아요! 다음부터는 뒤에서 동료들이 보내는 신호도 꼭 확인해요.",
      D: "동료들을 남겨두고 혼자 날뛰면 어떻게 해요! 의료 닌자로서도 팀원으로서도 도저히 그냥 넘어갈 수 없어요!",
    },
  },
  kakashi: {
    id: "kakashi",
    focus: "팀워크와 전략적 통찰",
    comments: {
      S: "흠, 합격점 이상이군. 규칙을 지키면서도 동료를 버리지 않는 진짜 닌자의 답을 너 스스로 찾아냈어. 훌륭하다.",
      A: "상황 판단과 팀워크의 균형이 꽤 좋았어. 임무의 본질을 꿰뚫어 볼 줄 아는 녀석이 제7반에 들어와 줘서 다행이야.",
      B: "나쁘지 않은 수행이었어. 다만 적의 함정과 동료의 동선을 한 수 앞까지 읽는 연습을 조금 더 해두자고.",
      C: "요령은 늘었지만 아직 시야가 좁아. 닌자의 세계에서 규칙을 깨는 녀석보다 동료를 버리는 녀석이 더 못난 놈이라는 걸 잊지 마.",
      D: "팀워크가 무너지면 아무리 뛰어난 인술도 소용없어. 방울 뺏기 시험의 의미를 처음부터 다시 되새겨야겠군.",
    },
  },
  minato: {
    id: "minato",
    focus: "희생정신과 불의 의지",
    comments: {
      S: "눈부실 정도로 따뜻한 불의 의지였어요. 동료를 지키고자 하는 그 진심이 차크라를 빛나게 했군요. 나뭇잎의 미래는 든든합니다.",
      A: "자신을 돌보지 않고 마을과 동료를 지키는 모습에서 과거의 우리들이 보였습니다. 정말 훌륭한 시노비로 성장했네요.",
      B: "선한 의지와 용기가 느껴졌습니다. 그 마음을 잃지 않고 수련을 이어간다면 머지않아 모두를 이끄는 빛이 될 겁니다.",
      C: "힘을 기르는 것도 중요하지만, 그 힘을 누구를 위해 쓰느냐가 시노비의 가치를 정한답니다. 한 번 더 가슴에 손을 얹어 보세요.",
      D: "조급함과 불신이 불의 의지를 가리고 있어요. 진정한 강함은 동료를 지키는 마음에서 시작된다는 걸 잊지 말아 주세요.",
    },
  },
  itachi: {
    id: "itachi",
    focus: "냉철한 통찰과 본질 파악",
    comments: {
      S: "감정이나 표면적인 현혹에 흔들리지 않고 진실의 본질을 꿰뚫었군. 스스로의 한계를 알고 동료를 믿을 줄 아는 자… 실로 진정한 닌자다.",
      A: "찰나의 환술 속에서도 꺾이지 않는 시선을 지녔구나. 어둠을 직시하면서도 빛을 버리지 않는 균형 감각이 뛰어나다.",
      B: "나쁘지 않은 판단이다. 하지만 아직 눈에 보이는 힘만으로 승부를 가늠하려 하는군. 본질을 보는 눈을 더 길러라.",
      C: "눈앞의 위기에 쉽게 동요하고 있다. 진정한 힘은 적을 꺾는 것이 아니라, 상황을 지배하는 냉정함에서 나온다.",
      D: "힘에 집착하다 스스로를 고립시키는 어리석은 길로 걷고 있구나. 혼자서 모든 것을 짊어지려 한 자의 말로를 기억해라.",
    },
  },
};
