import type { EndingId, EndingInfo } from "../types";

export const ENDING_ORDER: EndingId[] = [
  "ending-hidden",
  "ending-01",
  "ending-02",
  "ending-03",
  "ending-04",
];

export const ENDINGS: Record<EndingId, EndingInfo> = {
  "ending-hidden": {
    id: "ending-hidden",
    priority: 0,
    title: "라프텔의 붉은 새벽 · 패왕의 계승자",
    subtitle: "모든 능력치 80 이상 & 3대 비밀 항로 달성 · 상디와 샹크스가 축복한 전설",
    conditionLabel: "모든 능력치 80↑ · 비밀 3분기 달성 (히든 엔딩)",
    theme: "laugh-tale-dawn",
    showcaseCast: ["shanks", "sanji", "luffy", "zoro", "nami"],
    description:
      "드럼 왕국의 눈보라 속에서 온몸으로 나미와 쵸파를 지켜 내고, 알라바스타의 열사 위에서 상디의 디아블 잠브와 함께 선봉을 뚫었으며, 불바다가 된 해군 포위선의 마그마를 견문색 패기로 꿰뚫어 동료들을 구해 냈습니다. 사황 샹크스와 흑족 상디, 그리고 밀짚모자 일당 모두가 축복하는 가운데 당신은 라프텔의 새벽을 여는 전설의 계승자가 되었습니다.",
    speaker: "shanks",
    quote:
      "하하하! 내 밀짚모자를 맡긴 보람이 두 배로 돌아왔군. 네가 보여 준 패기와 의리라면, 이 새 시대의 바다도 충분히 넘겨줄 수 있겠어.",
    companionQuote: {
      speaker: "sanji",
      text: "불바다 한복판에서 내 등을 지켜 줬을 때 이미 알았지. 루피와 함께 올 블루와 신세계의 정상까지, 최고의 풀코스로 불태워 보자고!",
    },
  },
  "ending-01": {
    id: "ending-01",
    priority: 1,
    title: "새로운 시대를 여는 해적왕의 동료",
    subtitle: "모든 능력치 75 이상 달성 · 패기와 신뢰, 모험심이 하나 된 최고의 항해",
    conditionLabel: "모든 능력치 75 이상 (진엔딩)",
    theme: "pirate-king-era",
    showcaseCast: ["shanks", "zoro", "luffy", "sanji", "nami"],
    description:
      "단련된 견문색·무장색 패기와 완벽한 항해 지혜, 그리고 어떤 폭풍 앞에서도 흔들리지 않는 동료의 신뢰가 하나로 어우러졌습니다. 이스트 블루에서 신세계까지 거친 파도를 돌파한 당신은 루피와 어깨를 나란히 하며 해적왕의 전설을 함께 써 내려가는 최고의 동료로 이름을 남겼습니다.",
    speaker: "luffy",
    quote:
      "시시싯! 네가 우리 배에 타 줘서 진짜 다행이야! 이제 저 끝없는 바다 너머 원피스까지, 누구도 막지 못할 우리 모험이 시작되는 거다!!",
  },
  "ending-02": {
    id: "ending-02",
    priority: 2,
    title: "위대한 항로를 제패한 전설의 일당",
    subtitle: "동료의 신뢰 65 이상 & 항해와 모험심 65 이상 · 서로를 지킨 항해",
    conditionLabel: "신뢰 65+ & 모험심 65+ (노멀 엔딩)",
    theme: "legendary-crew",
    showcaseCast: ["usopp", "nami", "luffy", "robin", "chopper"],
    description:
      "전투마다 압도적인 패기만 앞세우진 않았지만, 바다를 읽는 현명한 항해술과 서로의 등을 지키는 굳건한 우정이 숱한 절체절명의 고비를 넘겼습니다. 황금빛 햇살이 쏟아지는 갑판 위, 밀짚모자 일당은 변치 않는 웃음과 함께 다음 모험의 섬을 향해 닻을 올립니다.",
    speaker: "nami",
    quote:
      "우리가 아무리 무모한 짓을 벌여도 결국 웃으며 다음 섬에 닿을 수 있는 건, 네가 끝까지 우리와 발맞춰 항해해 준 덕분이야. 고마워!",
  },
  "ending-03": {
    id: "ending-03",
    priority: 3,
    title: "바다를 떠도는 고독한 현상수배범",
    subtitle: "패기와 전투력 70 이상 & 동료의 신뢰 45 미만 · 유대를 잃은 차가운 패기",
    conditionLabel: "패기 70+ & 신뢰 45 미만 (배드/고독 엔딩)",
    theme: "lone-bounty",
    showcaseCast: ["zoro", "luffy", "shanks"],
    description:
      "날카롭게 단련된 패기와 전투 실력은 앞길을 막는 적들을 단독으로 베어 넘겼습니다. 하지만 동료를 믿고 항해의 보조를 맞추는 법을 저버린 대가로 밀짚모자 일당과의 틈은 깊어졌고, 높은 현상금 수배서만이 흩날리는 거친 바다 위에 혼자 남게 되었습니다.",
    speaker: "zoro",
    quote:
      "강해지긴 했더군. 하지만 선장의 등도, 동료의 목숨도 돌아보지 않는 그 힘으로는 진정한 바다의 정상에 설 수 없다.",
  },
  "ending-04": {
    id: "ending-04",
    priority: 4,
    title: "폭풍우 속에 가라앉은 해적기",
    subtitle: "평균 능력치 45 미만 또는 조건 미달 · 좌초된 꿈과 비극의 바다",
    conditionLabel: "평균 45 미만 · 조건 미충족 (새드엔딩)",
    theme: "abyssal-storm",
    showcaseCast: ["nami", "luffy", "chopper"],
    description:
      "어긋난 항해 판단과 무모한 선택이 거듭되면서 배는 위대한 항로의 거대한 폭풍 벽을 넘지 못했습니다. 찢겨 나간 해적기와 함께 차가운 심해의 소용돌이 속으로 꿈이 가라앉았고, 끝내 서로의 손을 잡지 못한 캄캄한 밤바다만 파도 소리를 삼켰습니다.",
    speaker: "luffy",
    quote:
      "제기랄… 내 팔이 닿질 않아…! 다들 어디 있는 거야… 미안해, 내가 너무 약해서 아무도 지켜 주지 못했어……",
    companionQuote: {
      speaker: "nami",
      text: "……항로도 나침반도 전부 산산조각 났어… 이 폭풍 속에서 우리 모두… 여기서 끝나 버리는 걸까……",
    },
  },
};
