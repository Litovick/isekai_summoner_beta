import img_coach_new from "../../assets/anzai-portrait.webp";
import img_hanna from "../../assets/char-hanna.png";
import img_baekho from "../../assets/char-baekho.png";
import img_taewoong from "../../assets/char-taewoong.png";
import img_chisu from "../../assets/char-chisu.png";
import img_taeseop from "../../assets/char-taeseop.png";
import img_daeman from "../../assets/char-daeman.png";
import img_coach from "../../assets/char-coach.png";
import img_bench from "../../assets/char-bench.png";
import type { Line, Theme } from "../types";
import { slamdunkEndings, slamdunkQuestions } from "../slamdunk-story";

const L = (speaker: string | undefined, text: string): Line => ({ speaker, text });

export const slamdunk: Theme = {
  id: "slamdunk",
  title: "슬램덩크",
  subtitle: "당신은 북산고의 매니저가 될 수 있나?",
  stats: [
    { id: "trust", label: "팀 신뢰도", initial: 50, min: 0, max: 100, tone: "trust" },
    { id: "judgment", label: "판단력", initial: 50, min: 0, max: 100, tone: "judgment" },
  ],
  characters: {
    me: { id: "me", name: "나", tone: "muted" },
    hanna: { id: "hanna", image: "/slamdunk/characters/hanna.png", fallbackImage: img_hanna, name: "이한나", tone: "orange" },
    baekho: { id: "baekho", image: "/slamdunk/characters/baekho.png", fallbackImage: img_baekho, name: "강백호", number: "10", tone: "primary" },
    taewoong: { id: "taewoong", image: "/slamdunk/characters/taewoong.png", fallbackImage: img_taewoong, name: "서태웅", number: "11", tone: "ink" },
    chisu: { id: "chisu", image: "/slamdunk/characters/chisu.png", fallbackImage: img_chisu, name: "채치수", number: "4", tone: "primary" },
    taeseop: { id: "taeseop", image: "/slamdunk/characters/taeseop.png", fallbackImage: img_taeseop, name: "송태섭", number: "7", tone: "ink" },
    daeman: { id: "daeman", image: "/slamdunk/characters/daeman.png", fallbackImage: img_daeman, name: "정대만", number: "14", tone: "primary" },
    coach: { id: "coach", image: img_coach_new, name: "안 감독", tone: "court" },
    bench: { id: "bench", image: img_bench, name: "벤치 선수", number: "12", tone: "muted" },
    player: { id: "player", image: img_bench, name: "선수", number: "8", tone: "muted" },
  },
  backgrounds: {
    gym: { label: "북산고 체육관", image: "/slamdunk/backgrounds/gym.jpg" },
    training: { label: "기초 훈련 코트", image: "/slamdunk/backgrounds/training.png" },
    practice: { label: "연습 경기 코트", image: "/slamdunk/backgrounds/practice.png" },
    qualifiers: { label: "지역 예선 경기장", image: "/slamdunk/backgrounds/qualifiers.png" },
    camp: { label: "합숙 특훈 코트", image: "/slamdunk/backgrounds/camp.png" },
    finals: { label: "전국대회 결승 코트", image: "/slamdunk/backgrounds/finals.jpg" },
    ending: { label: "북산고 농구부", image: "/slamdunk/backgrounds/ending.png" },
    court: { label: "연습 경기 코트", image: "/slamdunk/backgrounds/practice.png" },
    bench: { label: "벤치", image: "/slamdunk/backgrounds/practice.png" },
    locker: { label: "합숙 특훈 코트", image: "/slamdunk/backgrounds/camp.png" },
    evening: { label: "북산고 농구부", image: "/slamdunk/backgrounds/ending.png" },
  },
  opening: [
    L(undefined, "북산고등학교에 입학한 당신. 평범한 학교생활을 꿈꾸던 어느 날, 우연히 체육관에서 농구부의 연습 경기를 구경하게 된다."),
    L(undefined, "코트에서는 강백호와 서태웅이 서로 다투고 있었고, 주장 채치수는 두 사람을 말리느라 정신이 없었다."),
    L(undefined, "그때 농구부 매니저 이한나가 당신에게 다가온다."),
    L("hanna", "혹시 농구부 매니저에 관심 없어?"),
    L("me", "네? 저요? 농구에 대해서는 잘 모르는데요..."),
    L("hanna", "괜찮아! 선수들을 잘 챙기고 상황에 맞게 판단할 수 있다면 충분해."),
    L(undefined, "그때 강백호가 다가온다."),
    L("baekho", "뭐야?! 새로운 매니저라고?!"),
    L("baekho", "좋아! 이 천재 강백호 님의 활약을 가장 가까이서 지켜볼 수 있겠군!"),
    L("taewoong", "시끄러워, 멍청이."),
    L("baekho", "뭐라고?! 이 여우 자식이!"),
    L("chisu", "그만 좀 싸워라!!"),
    L(undefined, "채치수가 두 사람을 말린 뒤 당신을 바라본다."),
    L("chisu", "우리 팀의 매니저가 되려면 선수들을 이해하고 냉정하게 판단할 줄 알아야 한다."),
    L("chisu", "우선 신입 매니저로 활동해 봐라. 네가 얼마나 잘할 수 있는지 지켜보겠다."),
    L("hanna", "좋아! 그럼 오늘부터 시작이야!"),
  ],
  openingBanner: "당신의 북산고 매니저 생활이 시작됩니다!",
  openingGuide: [
    "코트 위 1초의 판단과 선수들의 멘탈 케어까지, 모든 선택에 따라 팀 신뢰도와 판단력이 달라집니다.",
    "10개의 상황을 돌파한 뒤 해피·노멀·새드, 그리고 숨겨진 히든 엔딩까지 모든 결말에 도전해 보세요!",
  ],
  howTo: [
    "팀 신뢰도: 선수들과 감독이 당신을 얼마나 믿고 의지하는지를 나타냅니다. (시작 50, 0~100)",
    "판단력: 훈련·경기·선수 관리에서 냉철한 결정을 내리는 능력입니다. (시작 50, 0~100)",
    "두 수치는 서로 독립적으로 변합니다. 호감을 얻어도 전술적 판단력이 떨어질 수 있으니 신중히 고르세요.",
    "대화창을 클릭하면 다음 대사로 넘어갑니다. 타이핑 중에 클릭하면 문장이 바로 완성됩니다.",
    "10개의 상황마다 3개의 선택지 중 하나를 고르세요.",
    "멀티 엔딩: 최종 수치와 핵심 승부처 3대 전술 선택에 따라 히든·해피·노멀·새드 엔딩으로 분기됩니다.",
  ],
  questions: slamdunkQuestions,
  endings: slamdunkEndings,
  // 실제 작품 페이지 URL이 제공되면 여기에 연결
  originalWorkUrl: null,
};
