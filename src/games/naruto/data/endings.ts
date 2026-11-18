import type { EndingId, EndingInfo } from "../types";

export const ENDINGS: Record<EndingId, EndingInfo> = {
  "ending-01": {
    id: "ending-01",
    priority: 1,
    title: "불의 의지를 잇는 차세대 호카게",
    subtitle: "모든 능력치 80 이상 · 나뭇잎 마을을 비추는 황금빛 섬광",
    conditionLabel: "인술 · 유대 · 불의 의지 모두 80 이상",
    theme: "hokage-legacy",
    showcaseCast: ["minato", "kakashi", "naruto", "sakura", "sasuke"],
    description:
      "극한의 차크라 제어와 제7반의 흔들리지 않는 팀워크, 그리고 어떤 어둠 앞에서도 꺼지지 않는 불의 의지를 모두 증명했습니다. 4대 호카게 미나토의 황금빛 섬광과 카카시의 가르침, 그리고 나루토·사스케·사쿠라와의 깊은 인연이 하나로 모여, 당신은 나뭇잎 마을의 차세대를 짊어질 진정한 영웅으로 인정받았습니다.",
    speaker: "minato",
    quote:
      "동료를 믿고 마을을 지키는 그 빛… 이제 당신이 다음 세대의 불의 의지를 비추는 등불이 되었군요.",
  },
  "ending-02": {
    id: "ending-02",
    priority: 2,
    title: "제7반의 영원한 유대",
    subtitle: "동료의 유대 75 이상 & 불의 의지 70 이상 · 함께 달리는 시노비의 길",
    conditionLabel: "동료의 유대 75+ & 불의 의지 70+",
    theme: "team7-bond",
    showcaseCast: ["kakashi", "naruto", "sakura", "sasuke"],
    description:
      "혼자만의 화려한 전적보다 동료를 지키는 손을 택한 당신의 신념이 제7반을 하나로 묶었습니다. 방울 뺏기 시험에서 시작된 작은 신뢰는 파도의 나라와 죽음의 숲, 종말의 계곡을 넘어 결코 끊어지지 않는 인연이 되었고, 위기의 순간마다 서로의 등을 맡기는 최강의 팀으로 거듭났습니다.",
    speaker: "naruto",
    quote:
      "우리가 함께라면 어떤 적도 두렵지 않아니깐! 다음 임무도 제7반 전원이 같이 돌파하는 거다!",
  },
  "ending-03": {
    id: "ending-03",
    priority: 3,
    title: "고독한 그림자의 상급 닌자",
    subtitle: "인술 숙련도 80 이상 & 동료의 유대 50 미만 · 어둠 속에서 마을을 지탱하는 칼날",
    conditionLabel: "인술 숙련도 80+ & 동료의 유대 50 미만",
    theme: "solitary-anbu",
    showcaseCast: ["itachi", "sasuke", "kakashi"],
    description:
      "누구보다 냉철한 판단과 압도적인 인술 숙련도를 손에 넣었지만, 곁에 선 동료들과의 유대보다 스스로 어둠을 감당하는 고독한 길을 택했습니다. 빛나는 양지 대신 보이지 않는 그림자 속에서 마을의 위협을 베어내는 당신의 뒷모습은, 마치 어둠 속에서 마을을 지켰던 우치하 이타치를 떠올리게 합니다.",
    speaker: "itachi",
    quote:
      "빛이 닿지 않는 곳에서 홀로 짊어지는 사명 또한 시노비의 길이지. 다만… 언젠가는 곁을 돌아볼 날이 오기를 바란다.",
  },
  "ending-04": {
    id: "ending-04",
    priority: 4,
    title: "수련을 거듭하는 나뭇잎의 닌자",
    subtitle: "끝나지 않은 시노비의 여정 · 더 높은 내일을 향한 차크라 연마",
    conditionLabel: "기본 엔딩 · 새로운 임무의 시작",
    theme: "leaf-training",
    showcaseCast: ["kakashi", "sakura", "naruto"],
    description:
      "수많은 시련과 갈등 속에서도 끝까지 살아남아 나뭇잎 마을의 닌자로서 첫걸음을 완수했습니다. 아직 제7반의 완벽한 조화나 호카게의 경지에는 다다르지 못했지만, 훈련장에 흩날리는 나뭇잎 아래 당신의 차크라는 여전히 뜨겁게 타오르고 있습니다. 다음 임무에서는 어떤 인술과 유대를 보여줄 것인가요?",
    speaker: "kakashi",
    quote:
      "오늘의 경험이 내일의 실력이 되는 법이지. 자, 휴식은 여기까지. 다음 수련을 시작해 볼까.",
  },
};

export const ENDING_ORDER: EndingId[] = [
  "ending-01",
  "ending-02",
  "ending-03",
  "ending-04",
];
