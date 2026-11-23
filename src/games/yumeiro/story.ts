export type Dessert = "strawberry" | "chocolate" | "creative";

export type YumeiroEndingId = "hidden" | "happy" | "normal" | "sad";

export type Choice = {
  text: string;
  skill: number;
  team: number;
  dessert: Dessert;
  response: string;
  speaker: string;
};

export type Stage = {
  title: string;
  location: string;
  speaker: string;
  dialogue: string;
  choices: [Choice, Choice, Choice];
};

const c = (
  text: string,
  skill: number,
  team: number,
  dessert: Dessert,
  speaker: string,
  response: string,
): Choice => ({ text, skill, team, dessert, speaker, response });

/**
 * 히든 엔딩 「황금빛 미라클 레시피」 핵심 창작 분기 인덱스
 * - EP 04 (index 3): A (0) — 바닐라의 영감을 믿고 허브 향 생크림 실험
 * - EP 06 (index 5): B (1) — 서로진의 설탕공예 기법을 응용한 입체 플레이팅
 * - EP 10 (index 9): C (2) — 요정의 영감과 팀원들의 기술을 녹인 미라클 신작
 */
export const HIDDEN_RECIPE_KEYS = {
  fairyExperimentStage: 3,
  fairyExperimentChoice: 0,
  platingStage: 5,
  platingChoice: 1,
  finaleStage: 9,
  finaleChoice: 2,
} as const;

export const stages: Stage[] = [
  {
    title: "첫 번째 실습",
    location: "세인트 마리 학원 · 실습실",
    speaker: "감딸기",
    dialogue:
      "드디어 우리 A그룹 첫 실습이야! 원가온은 벌써 눈빛부터 날카로운데… 어떤 전략으로 시작할까?",
    choices: [
      c(
        "딸기와 공정을 나누고 서로의 강점을 살려 반죽을 시작한다",
        5,
        10,
        "strawberry",
        "감딸기",
        "역시 같이 하니까 든든해! 내 미각이랑 네 손재주라면 첫 케이크도 완벽할 거야!",
      ),
      c(
        "온도계와 저울부터 맞춰 완벽한 계량으로 실력을 증명한다",
        10,
        -5,
        "chocolate",
        "원가온",
        "흥, 기본을 아는 녀석이군. 다만 혼자서만 앞서가면 팀 실습의 의미는 반감된다.",
      ),
      c(
        "정석 레시피를 덮고 직감대로 버터와 향신료를 과감히 섞는다",
        -10,
        -5,
        "creative",
        "원가온",
        "기초도 검증하기 전에 모험이라니… 패기는 좋지만 반죽이 분리되면 누가 책임질 거지?",
      ),
    ],
  },
  {
    title: "사라진 딸기",
    location: "재료 준비실",
    speaker: "감딸기",
    dialogue:
      "어떡해! 주문한 딸기가 절반밖에 안 남았어… 내 타르트에도 꼭 필요한데 시간이 없어!",
    choices: [
      c(
        "옆 팀 몫의 딸기를 잠시 빌려 쓰고 나중에 채워 넣자고 제안한다",
        5,
        -15,
        "chocolate",
        "안도하",
        "아무리 급해도 허락 없는 차용은 안 돼. 신뢰를 잃으면 맛까지 흐려진다고.",
      ),
      c(
        "남은 딸기는 장식으로 아끼고 제철 베리 콤포트로 맛을 재설계한다",
        10,
        5,
        "creative",
        "서로진",
        "오호, 위기를 새콤한 색감으로 뒤집다니… 꽤 우아한 발상인걸?",
      ),
      c(
        "모자란 딸기를 딸기와 공평하게 나누고 스펀지 풍미를 끌어올린다",
        0,
        10,
        "strawberry",
        "감딸기",
        "고마워! 반씩 나눠도 정성을 담으면 분명 두 배로 달콤해질 거야!",
      ),
    ],
  },
  {
    title: "원가온의 혹평",
    location: "초콜릿 공방",
    speaker: "원가온",
    dialogue:
      "크림이 너무 묽어서 단면이 무너질 게 뻔해. 이 수준으로 A그룹 이름을 달겠다는 건가?",
    choices: [
      c(
        "내 감각을 믿고 가온의 지적을 넘긴 채 원래 크림으로 밀어붙인다",
        -10,
        -5,
        "creative",
        "원가온",
        "고집과 자신감을 착각하지 마라. 결과는 오븐과 접시 위에서 냉정하게 드러날 테니.",
      ),
      c(
        "가온에게 휘핑 온도와 유화 시점을 묻고 처음부터 다시 낸다",
        10,
        5,
        "chocolate",
        "원가온",
        "…그래, 자존심보다 맛을 먼저 보는군. 얼음물 볼부터 다시 받쳐. 한 번 더 보여 주지.",
      ),
      c(
        "묽은 크림을 젤라틴으로 잡아 부드러운 무스 형태로 설계를 바꾼다",
        5,
        5,
        "strawberry",
        "안도하",
        "실수를 새로운 식감으로 살려 냈네. 유연한 판단력도 파티시엘의 무기야.",
      ),
    ],
  },
  {
    title: "스위트 요정의 조언",
    location: "비밀 실습실",
    speaker: "바닐라",
    dialogue:
      "쉿, 내 요정 감각이 속삭이고 있어! 크림 배합을 살짝만 비틀면 놀라운 향이 피어날 거야!",
    choices: [
      c(
        "바닐라의 영감을 믿고 생크림에 은은한 허브 향을 배합해 실험한다",
        10,
        5,
        "creative",
        "바닐라",
        "우와아! 바로 이 향이야! 세인트 마리에서도 본 적 없는 환상의 밸런스라고!",
      ),
      c(
        "요정의 팁을 A그룹 모두와 공유해 함께 시식하며 황금비를 찾는다",
        5,
        10,
        "strawberry",
        "감딸기",
        "와, 입안에서 사르르 녹아! 다 같이 시식하니까 부족한 점이 바로 잡히네!",
      ),
      c(
        "요정의 변칙보다 검증된 정통 배합만 고수하며 모험을 피한다",
        -5,
        -5,
        "chocolate",
        "바닐라",
        "흥, 안전하기만 한 레시피로는 심사위원의 마음을 흔들 수 없는데… 아쉽네!",
      ),
    ],
  },
  {
    title: "무너진 케이크",
    location: "학원 복도",
    speaker: "감딸기",
    dialogue:
      "아악! 발이 걸려서 완성 직전 케이크가 무너져 버렸어… 다 내 탓이야, 어떡하지…!",
    choices: [
      c(
        "시간 지연을 막으려 딸기를 물리고 혼자 새 시트를 빠르게 굽는다",
        10,
        -10,
        "chocolate",
        "안도하",
        "손놀림은 대단하지만… 딸기 표정 좀 봐. 혼자 짊어지면 팀은 금이 가기 마련이야.",
      ),
      c(
        "중요한 순간에 실수한 딸기를 다그치며 냉정하게 책임을 묻는다",
        -5,
        -15,
        "creative",
        "감딸기",
        "미안해… 정말 잘하고 싶었는데… 나 때문에 다 망쳐 버렸어…",
      ),
      c(
        "딸기를 다독이고 부서진 시트를 글라스 디저트로 함께 재탄생시킨다",
        5,
        10,
        "strawberry",
        "감딸기",
        "고마워…! 네가 웃어 줘서 다시 힘이 났어. 이번엔 절대 실수 안 할게!",
      ),
    ],
  },
  {
    title: "디저트 디자인",
    location: "디자인 실습실",
    speaker: "서로진",
    dialogue:
      "파티시엘에게 접시는 캔버스야. 맛의 깊이를 한눈에 전할 플레이팅을 어떻게 그릴 생각이지?",
    choices: [
      c(
        "화려한 장식은 덜어 내고 오직 단면과 맛의 완성도에만 집중한다",
        5,
        -5,
        "chocolate",
        "서로진",
        "절제도 미학이지만… 스위트 콘테스트 무대에선 시선을 붙잡는 한 수가 필요해.",
      ),
      c(
        "서로진의 설탕공예를 응용해 빛을 머금은 독창 플레이팅을 빚는다",
        10,
        5,
        "creative",
        "서로진",
        "브라보! 설탕 베일 너머로 디저트가 숨 쉬는 것 같아. 네 감각, 정말 눈부신데?",
      ),
      c(
        "가온·도하·로진의 아이디어를 한 접시 위에 조화롭게 엮어 낸다",
        5,
        10,
        "strawberry",
        "안도하",
        "화과자의 여백미랑 초콜릿의 묵직함이 이렇게 어울릴 줄이야. 멋진 조율이야.",
      ),
    ],
  },
  {
    title: "제한 시간",
    location: "실습실 · 타이머 10분",
    speaker: "안도하",
    dialogue:
      "남은 시간은 딱 10분! 반죽 상태가 살짝 불안한데, 지금 공정 순서를 바꾸면 위험할 수도 있어.",
    choices: [
      c(
        "반죽 점검을 생략하고 오븐 온도를 높여 속도전으로 밀어붙인다",
        -10,
        -5,
        "creative",
        "원가온",
        "겉만 타고 속은 덜 익었잖아! 조급함은 주방에서 가장 치명적인 독이다.",
      ),
      c(
        "반죽 촉감을 직접 확인해 발효와 굽기 온도를 미세하게 재조정한다",
        10,
        0,
        "chocolate",
        "안도하",
        "10초도 안 남기고 완벽하게 잡아냈어… 역시 침착한 판단이 최고네.",
      ),
      c(
        "도하에게 오븐 온도를 맡기고 딸기와 동시에 토핑을 마무리한다",
        5,
        10,
        "strawberry",
        "감딸기",
        "오븐 타이머 딱 맞았어! 우리 호흡, 이제 눈빛만 봐도 통하는 것 같아!",
      ),
    ],
  },
  {
    title: "팀원들의 갈등",
    location: "콘테스트 준비실",
    speaker: "원가온",
    dialogue:
      "로진, 네 장식은 지나치게 번잡해서 초콜릿 향을 해쳐. 본선에서는 맛에 집중해야 한다고!",
    choices: [
      c(
        "완성도를 위해 가온의 맛 중심 설계를 밀어붙이고 장식을 축소한다",
        10,
        -10,
        "chocolate",
        "원가온",
        "이성적인 선택이야. 하지만 로진의 자존심이 꽤 상했을 텐데, 뒷수습은 네 몫이다.",
      ),
      c(
        "가온의 깊은 풍미 위에 로진의 투명한 설탕 장식을 얹는 절충안을 낸다",
        5,
        10,
        "strawberry",
        "안도하",
        "맛을 가리지 않으면서도 화려함을 살렸어! 두 사람 다 고개를 끄덕이네.",
      ),
      c(
        "두 왕자의 자존심 싸움에 끼어들지 않고 내 파트만 묵묵히 끝낸다",
        -5,
        -10,
        "creative",
        "서로진",
        "각자 따로 만든 파트를 모아 둔다고 하나의 작품이 되진 않아… 안타깝군.",
      ),
    ],
  },
  {
    title: "마지막 연습",
    location: "실습실 · 콘테스트 전날",
    speaker: "감딸기",
    dialogue:
      "내일이 드디어 결승인데, 끝맛에서 뭔가 1%가 부족한 느낌이야… 오늘 밤 마지막으로 뭘 해 볼까?",
    choices: [
      c(
        "늦은 밤까지 모두가 번갈아 시식하며 마지막 1%의 균형을 맞춘다",
        5,
        10,
        "strawberry",
        "감딸기",
        "드디어 찾았어! 다 같이 웃으며 빚어 낸 바로 이 맛이야!",
      ),
      c(
        "무리한 재도전 대신 컨디션을 아끼며 내일 본선의 감에 맡긴다",
        -10,
        -5,
        "creative",
        "바닐라",
        "휴식도 중요하지만, 의문을 남긴 채 무대에 서면 손끝이 흔들린다고!",
      ),
      c(
        "온도·당도·산미를 꼼꼼히 기록하며 실패 원인을 끝까지 교정한다",
        10,
        5,
        "chocolate",
        "원가온",
        "…이제야 군더더기가 사라졌군. 내일 무대, 기대해도 좋겠어.",
      ),
    ],
  },
  {
    title: "스위트 콘테스트 결승",
    location: "세인트 마리 · 콘테스트 무대",
    speaker: "바닐라",
    dialogue:
      "조명이 켜졌어! 지금까지 쌓아 온 땀과 마음을 한 접시에 담아, 최고의 피날레를 선택해 줘!",
    choices: [
      c(
        "갈고닦은 정석 기술로 한 치의 오차도 없는 클래식 명작을 낸다",
        10,
        0,
        "chocolate",
        "원가온",
        "완벽한 템퍼링과 균형이다. 네가 이 무대의 주인공임을 실력으로 증명했어.",
      ),
      c(
        "A그룹 모두의 손길이 깃든 따뜻한 합작 디저트로 무대에 선다",
        5,
        10,
        "strawberry",
        "감딸기",
        "심사위원들이 한 입 먹고 미소 지었어! 우리 모두의 꿈이 전해졌나 봐!",
      ),
      c(
        "요정의 영감과 팀원들의 기술을 한 접시에 녹인 미라클 신작을 선보인다",
        10,
        5,
        "creative",
        "서로진",
        "세상에… 접시 위에서 향과 빛이 동시에 피어올랐어! 이건 기적의 디저트야!",
      ),
    ],
  },
];

export const clamp = (v: number) => Math.max(0, Math.min(100, v));

export function dessertOf(history: number[]): Dessert {
  const scores: Record<Dessert, number> = {
    strawberry: 0,
    chocolate: 0,
    creative: 0,
  };
  history.forEach((choice, i) => {
    const item = stages[i]?.choices[choice];
    if (item) scores[item.dessert]++;
  });
  return (Object.keys(scores) as Dessert[]).sort(
    (a, b) =>
      scores[b] - scores[a] ||
      (stages[history.length - 1]?.choices[history[history.length - 1]]
        ?.dessert === a
        ? -1
        : 0),
  )[0]!;
}

export function isHiddenRecipeCombo(history: number[]): boolean {
  return (
    history[HIDDEN_RECIPE_KEYS.fairyExperimentStage] ===
      HIDDEN_RECIPE_KEYS.fairyExperimentChoice &&
    history[HIDDEN_RECIPE_KEYS.platingStage] ===
      HIDDEN_RECIPE_KEYS.platingChoice &&
    history[HIDDEN_RECIPE_KEYS.finaleStage] === HIDDEN_RECIPE_KEYS.finaleChoice
  );
}

export function endingOf(
  skill: number,
  team: number,
  history: number[] = [],
): YumeiroEndingId {
  if (skill >= 80 && team >= 80 && isHiddenRecipeCombo(history)) {
    return "hidden";
  }
  if (skill >= 75 && team >= 75) {
    return "happy";
  }
  if (skill < 45 || team < 45) {
    return "sad";
  }
  return "normal";
}
