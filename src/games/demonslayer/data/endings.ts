import type { EndingId, EndingInfo } from "../types";

export const ENDINGS: Record<EndingId, EndingInfo> = {
  "ending-01": {
    id: "ending-01",
    priority: 1,
    title: "새벽을 여는 최강의 주(柱)",
    subtitle: "전집중 호흡 · 귀살대 신뢰도 · 불굴의 결의 모두 75 이상",
    conditionLabel: "모든 능력치 75 이상",
    theme: "dawn-hashira",
    showcaseCast: ["giyu", "rengoku", "tanjiro", "shinobu", "gyomei"],
    description:
      "극한의 호흡 기술, 동료와 주(柱)들의 절대적인 신뢰, 그리고 어떤 절망 앞에서도 꺾이지 않은 불굴의 결의까지. 당신은 모든 자질을 증명해 내며 귀살대의 새로운 기둥인 '주(柱)'로 추대되었다. 혈귀 없는 새벽의 하늘 아래, 당신의 이름은 천 년의 밤을 끝낸 전설로 영원히 기억될 것이다.",
    speaker: "rengoku",
    quote:
      "음! 실로 눈부신 성장이었다! 자네의 마음 속 불꽃은 이제 귀살대 전체를 비추는 태양이 되었군! 정말 자랑스럽다!!",
  },
  "ending-02": {
    id: "ending-02",
    priority: 2,
    title: "인연을 잇는 귀살의 칼날",
    subtitle: "귀살대 신뢰도 65 이상 & 불굴의 결의 65 이상",
    conditionLabel: "신뢰도 65 이상 & 결의 65 이상",
    theme: "crimson-bonds",
    showcaseCast: ["zenitsu", "tanjiro", "nezuko", "inosuke", "mitsuri"],
    description:
      "당신의 검은 홀로 빛나기보다 곁에 있는 사람을 지키는 방패이자 등불이었다. 수많은 고비마다 동료의 손을 놓지 않았던 진심은 주(柱)들과 동기들의 마음을 하나로 묶어 기적을 만들어 냈다. 전장이 끝난 뒤에도 당신 곁에는 평생을 함께할 소중한 인연들이 남아 있다.",
    speaker: "tanjiro",
    quote:
      "네가 끝까지 우리 손을 잡아 줘서 모두가 살아남을 수 있었어. 어떤 검술보다 강한 건 역시 네 따뜻한 마음이야!",
  },
  "ending-03": {
    id: "ending-03",
    priority: 3,
    title: "상처뿐인 고독한 생존자",
    subtitle: "전집중 호흡 70 이상 & 귀살대 신뢰도 45 미만",
    conditionLabel: "전집중 호흡 70 이상 & 신뢰도 45 미만",
    theme: "solitary-blade",
    showcaseCast: ["muichiro", "giyu", "obanai"],
    description:
      "감정을 배제한 채 오직 칼끝과 호흡의 극한만을 추구한 당신. 압도적인 검술 실력으로 혈귀의 목을 베고 홀로 살아남았지만, 등을 맞댈 동료들의 신뢰를 모두 잃어 버렸다. 찢어진 하오리와 식어 가는 온기 속에서, 고독한 생존자의 칼끝에는 깊은 상흔만이 남아 있다.",
    speaker: "giyu",
    quote:
      "……살아남긴 했군. 하지만 누구도 믿지 않고 곁을 내주지 않은 칼날 끝에는 결국 공허한 상처만 남을 뿐이다.",
  },
  "ending-04": {
    id: "ending-04",
    priority: 4,
    title: "붉은 밤에 삼켜진 칼날",
    subtitle: "평균 능력치 45 미만 또는 조건 미달 · 무한성의 어둠에 무너진 밤",
    conditionLabel: "평균 45 미만 · 조건 미충족 (새드엔딩)",
    theme: "crimson-abyss",
    showcaseCast: ["tanjiro", "muzan", "giyu"],
    description:
      "결정적인 순간마다 어긋난 판단과 흔들린 칼끝은 결국 무한성의 어둠을 막아 내지 못했다. 부러진 일륜도와 흩어진 호흡 속에서 혈귀의 왕 무잔의 기운이 전장을 집어삼켰고, 동료들의 절규는 끝없는 붉은 밤 너머로 삼켜져 갔다. 새벽은 오지 않았고, 차가운 잿더미 위에 멈춰 선 칼날만이 패배의 밤을 증언한다.",
    speaker: "giyu",
    quote:
      "……늦었나. 내가 조금만 더 단단히 막아섰더라면… 이 붉은 밤에 너희까지 삼켜지진 않았을 텐데.",
    companionQuote: {
      speaker: "tanjiro",
      text: "제발… 누가 대답해 줘…! 호흡이 더는 이어지지 않아… 미안해, 내가 모두를 끝까지 지키지 못했어……",
    },
  },
};

export const ENDING_ORDER: EndingId[] = [
  "ending-01",
  "ending-02",
  "ending-03",
  "ending-04",
];
