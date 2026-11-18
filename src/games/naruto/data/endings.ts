import type { EndingId, EndingInfo } from "../types";

export const ENDINGS: Record<EndingId, EndingInfo> = {
  "ending-01": {
    id: "ending-01",
    priority: 1,
    title: "불의 의지를 잇는 차세대 호카게",
    subtitle: "모든 능력치 75 이상 · 나뭇잎 마을을 비추는 황금빛 섬광",
    conditionLabel: "인술 · 유대 · 불의 의지 모두 75 이상",
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
    title: "제7반의 꺾이지 않는 유대",
    subtitle: "동료의 유대 65 이상 & 불의 의지 65 이상 · 함께 달리는 시노비의 길",
    conditionLabel: "동료의 유대 65+ & 불의 의지 65+",
    theme: "team7-bond",
    showcaseCast: ["kakashi", "naruto", "sakura", "sasuke"],
    description:
      "혼자만의 완벽한 전적보다 동료를 지키는 손을 택한 당신의 신념이 제7반을 하나로 묶었습니다. 방울 뺏기 시험에서 시작된 작은 신뢰는 파도의 나라와 죽음의 숲, 종말의 계곡을 넘어 결코 끊어지지 않는 유대가 되었고, 위기의 순간마다 서로의 등을 맡기는 최강의 팀으로 거듭났습니다.",
    speaker: "naruto",
    quote:
      "우리가 함께라면 어떤 적도 두렵지 않아니깐! 다음 임무도 제7반 전원이 같이 돌파하는 거다!",
  },
  "ending-03": {
    id: "ending-03",
    priority: 3,
    title: "탈주와 고독의 그림자 닌자",
    subtitle: "인술 숙련도 70 이상 & 동료의 유대 45 미만 · 어둠 속 홀로 남은 칼날",
    conditionLabel: "인술 숙련도 70+ & 동료의 유대 45 미만",
    theme: "solitary-anbu",
    showcaseCast: ["itachi", "sasuke", "kakashi"],
    description:
      "누구보다 냉철한 판단과 압도적인 인술 숙련도를 손에 넣었지만, 곁에 선 동료들과의 유대를 끊고 홀로 어둠 속을 걷는 길을 택했습니다. 마을의 표식 대신 고독한 탈주와 그림자의 사명을 짊어진 채 떠나는 당신의 뒷모습은, 차가운 붉은 달 아래 쓸쓸히 사라져 갑니다.",
    speaker: "itachi",
    quote:
      "힘을 얻기 위해 모든 유대를 끊어 낸 것인가… 혼자서 어둠을 짊어지는 길이 얼마나 차가운지 곧 알게 되겠지.",
  },
  "ending-04": {
    id: "ending-04",
    priority: 4,
    title: "붉은 달 아래 무너진 나뭇잎",
    subtitle: "평균 능력치 45 미만 또는 조건 미달 · 임무 실패와 결렬의 비극",
    conditionLabel: "평균 45 미만 · 조건 미충족 (새드엔딩)",
    theme: "crimson-eclipse",
    showcaseCast: ["kakashi", "itachi", "naruto"],
    description:
      "거듭된 오판과 무너진 팀워크는 결국 아카츠키의 습격 앞에 치명적인 파국을 불러왔습니다. 붉은 달빛이 불타는 나뭇잎 마을의 폐허를 비추는 가운데 제7반의 신뢰는 산산이 조각났고, 임무를 실패한 채 마을을 지켜 내지 못한 참담한 밤이 깊게 내려앉았습니다.",
    speaker: "kakashi",
    quote:
      "……미안하다. 내가 너희를 제대로 이끌지 못한 탓이다. 이렇게 붉은 달 아래에서 모든 걸 잃게 될 줄이야…",
    companionQuote: {
      speaker: "naruto",
      text: "젠장… 왜 그때 서로를 믿지 못했던 거야…! 마을도, 동료도… 아무것도 지켜 내지 못했잖아……",
    },
  },
};

export const ENDING_ORDER: EndingId[] = [
  "ending-01",
  "ending-02",
  "ending-03",
  "ending-04",
];
