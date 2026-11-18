import type { EndingId, EndingInfo } from "../types";

const BASE_URL =
  (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? "/";
const ENDING_ROOT = `${BASE_URL.replace(/\/$/, "")}/demonslayer/endings`;

export const ENDINGS: Record<EndingId, EndingInfo> = {
  "ending-01": {
    id: "ending-01",
    priority: 1,
    title: "새벽을 여는 최강의 주(柱)",
    subtitle: "전집중 호흡 · 신뢰도 · 결의 모두 80 이상 달성",
    conditionLabel: "모든 능력치 80 이상",
    image: `${ENDING_ROOT}/ending-01.webp`,
    fallbackDescription:
      "아침 햇살이 무한성의 잿더미 위로 쏟아지는 가운데, 혁도를 쥔 새로운 주(柱)가 살아남은 동료들과 나란히 서서 눈부신 여명을 맞이하는 장면.",
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
    subtitle: "귀살대 신뢰도 75 이상 & 불굴의 결의 70 이상",
    conditionLabel: "신뢰도 75 이상 & 결의 70 이상",
    image: `${ENDING_ROOT}/ending-02.webp`,
    fallbackDescription:
      "부서진 폐허 위에서 탄지로, 네즈코, 젠이츠, 이노스케와 미소 짓는 동료들이 서로를 부축하며 따뜻한 햇살을 함께 바라보는 장면.",
    description:
      "당신의 검은 홀로 빛나기보다 곁에 있는 사람을 지키는 방패이자 등불이었다. 수많은 고비마다 동료의 손을 놓지 않았던 진심은 주(柱)들과 동기들의 마음을 하나로 묶어 기적을 만들어 냈다. 전장이 끝난 뒤에도 당신 곁에는 평생을 함께할 소중한 인연들이 남아 있다.",
    speaker: "tanjiro",
    quote:
      "네가 끝까지 우리 손을 잡아 줘서 모두가 살아남을 수 있었어. 어떤 검술보다 강한 건 역시 네 따뜻한 마음이야!",
  },
  "ending-03": {
    id: "ending-03",
    priority: 3,
    title: "고독한 수련의 검객",
    subtitle: "전집중 호흡 80 이상 & 귀살대 신뢰도 50 미만",
    conditionLabel: "전집중 호흡 80 이상 & 신뢰도 50 미만",
    image: `${ENDING_ROOT}/ending-03.webp`,
    fallbackDescription:
      "동료들의 환호에서 한 걸음 떨어진 어두운 숲길 위, 날카롭게 벼려진 일륜도를 홀로 등에 맨 채 먼 산을 바라보는 고독한 검객의 뒷모습.",
    description:
      "감정을 배제한 채 오직 칼끝과 호흡의 극한만을 추구한 당신. 압도적인 검술 실력으로 수많은 혈귀를 베어 냈지만, 스스로 쌓아 올린 고독의 벽 때문에 동료들의 진심을 곁에 두지 못했다. 밤은 물러갔으나, 혼자 남은 칼날은 여전히 다음 수련의 길을 찾아 조용히 떠난다.",
    speaker: "giyu",
    quote:
      "……칼은 누구보다 날카로워졌군. 하지만 혼자 걷는 길 끝에서는 지켜야 할 온기마저 식어 버릴지 모른다.",
  },
  "ending-04": {
    id: "ending-04",
    priority: 4,
    title: "끝나지 않은 밤의 생존자",
    subtitle: "격동의 밤을 견뎌 낸 귀살대 대원의 기록",
    conditionLabel: "기본 엔딩 (우선순위 조건 미충족)",
    image: `${ENDING_ROOT}/ending-04.webp`,
    fallbackDescription:
      "희미한 새벽빛이 번지는 나비저택 툇마루에서 붕대를 감은 채 일륜도를 닦으며 다음 날을 다짐하는 젊은 대원의 모습.",
    description:
      "압도적인 재앙과 혹독한 시련 속에서도 끝까지 포기하지 않고 살아남았다. 아직 주(柱)의 경지나 완벽한 해답에 다다르지는 못했지만, 오늘의 상처와 후회 역시 내일의 당신을 강하게 단련할 밑거름이 될 것이다. 검을 놓지 않는 한, 당신의 이야기는 여기서 끝나지 않는다.",
    speaker: "shinobu",
    quote:
      "살아남으셨다는 것만으로도 충분히 대단한 거예요. 상처를 치료한 뒤에, 이번엔 조금 더 확실한 각오로 다시 걸어가 보도록 하죠.",
  },
};

export const ENDING_ORDER: EndingId[] = [
  "ending-01",
  "ending-02",
  "ending-03",
  "ending-04",
];
