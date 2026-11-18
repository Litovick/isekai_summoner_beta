import type { EndingId, EndingInfo } from "../types";

export const ENDING_ORDER: EndingId[] = [
  "ending-01",
  "ending-02",
  "ending-03",
  "ending-04",
];

export const ENDINGS: Record<EndingId, EndingInfo> = {
  "ending-01": {
    id: "ending-01",
    priority: 1,
    title: "사신과 인간을 잇는 최강의 사신 대행",
    subtitle: "모든 능력치 75 이상 달성 · 현세와 소울 소사이어티의 완벽한 조화",
    conditionLabel: "모든 능력치 75 이상 (진엔딩)",
    theme: "soul-bridge",
    showcaseCast: ["rukia", "ichigo", "urahara", "ishida", "orihime"],
    description:
      "완벽하게 연마된 영압 제어, 꺾이지 않는 동료의 유대, 그리고 절망 앞에서도 흔들리지 않는 수호의 각오가 하나로 맞물렸습니다. 카라쿠라 마을에서 정령정, 웨코문드에 이르는 숱한 사투를 승리로 이끈 당신은 이치고·루키아와 나란히 두 세계를 잇는 전설적인 사신 대행으로 이름을 남겼습니다.",
    speaker: "ichigo",
    quote:
      "네가 곁에서 검을 맞대 준 덕분에 아무도 잃지 않고 끝까지 지켜 낼 수 있었어. 앞으로도 카라쿠라 마을의 하늘은 우리 둘이서 지켜 나가는 거다!",
  },
  "ending-02": {
    id: "ending-02",
    priority: 2,
    title: "카라쿠라 마을의 영원한 수호자",
    subtitle: "동료의 유대 65 이상 & 수호의 각오 65 이상 · 함께 지켜 낸 일상",
    conditionLabel: "유대 65+ & 각오 65+ (노멀 엔딩)",
    theme: "karakura-dawn",
    showcaseCast: ["orihime", "ichigo", "rukia", "sado", "kon"],
    description:
      "모든 싸움에서 완벽한 영압 제어를 보여 주진 못했지만, 어떤 절체절명의 순간에도 동료를 외면하지 않는 신의와 수호의 각오가 기적을 만들었습니다. 새벽빛이 스며드는 카라쿠라 마을 위, 지켜 낸 평범한 내일 속에서 동료들은 변치 않는 신뢰의 미소를 보냅니다.",
    speaker: "rukia",
    quote:
      "혼자서 완벽할 필요는 없다. 네가 곁의 동료들을 믿고 버텨 주었기에 이 마을의 영혼들이 무사히 지켜진 것이니까. 수고했다, 사신 대행.",
  },
  "ending-03": {
    id: "ending-03",
    priority: 3,
    title: "내면의 호로에 잠식된 고독한 검",
    subtitle: "영압 제어 70 이상 & 동료의 유대 45 미만 · 유대를 잃은 차가운 힘",
    conditionLabel: "영압 70+ & 유대 45 미만 (배드/고독 엔딩)",
    theme: "hollow-eclipse",
    showcaseCast: ["ishida", "ichigo", "urahara"],
    description:
      "극한까지 날카롭게 벼려진 영압은 눈앞의 호로와 적들을 홀로 베어 넘겼습니다. 하지만 동료를 믿고 등을 맡기는 법을 저버린 대가로 마음속 깊은 어둠이 잠식해 왔고, 전투가 끝난 자리에는 곁에 설 동료도 없이 차가운 검과 고독한 그림자만 남았습니다.",
    speaker: "urahara",
    quote:
      "힘만 놓고 보면 대단하십니다만… 동료를 잃은 검 끝은 결국 자기 자신부터 베게 마련이지요. 부디 그 어둠에 영혼까지 먹히지 마시길.",
  },
  "ending-04": {
    id: "ending-04",
    priority: 4,
    title: "칠흑의 허권에 삼켜진 영혼",
    subtitle: "평균 능력치 45 미만 또는 조건 미달 · 영압 소멸과 패배의 비극",
    conditionLabel: "평균 45 미만 · 조건 미충족 (새드엔딩)",
    theme: "crimson-hueco",
    showcaseCast: ["rukia", "ichigo", "orihime"],
    description:
      "어긋난 판단과 폭주한 영압은 결정적인 순간마다 부러진 참백도처럼 무력하게 흩어졌습니다. 칠흑 같은 어둠과 핏빛 달이 드리운 허권의 모래 폭풍 속에서 끝내 동료들의 손을 잡아 주지 못했고, 꺼져 가는 영압과 함께 참담한 밤이 모든 것을 집어삼켰습니다.",
    speaker: "ichigo",
    quote:
      "제기랄… 내 손이 닿질 않아…! 영압이 더는 버티질 못해… 미안하다, 결국 아무도 지켜 내지 못했어……",
    companionQuote: {
      speaker: "rukia",
      text: "……정신 차려, 네 영압이 사라지고 있어! 이대로 어둠에 삼켜지면… 우리들의 내일은 영영 끝나 버린다……",
    },
  },
};
