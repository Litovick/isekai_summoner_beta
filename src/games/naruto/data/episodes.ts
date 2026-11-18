import type { Episode } from "../types";

export const EPISODES: Episode[] = [
  {
    id: 1,
    code: "EPISODE 01",
    title: "제7반의 방울 뺏기 시험",
    location: "나뭇잎 마을 · 제3연습장",
    stageTheme: "training-ground",
    featuredCast: ["kakashi", "naruto", "sasuke", "sakura"],
    lines: [
      {
        speaker: "narrator",
        text: "상쾌한 바람이 초록 나뭇잎을 흩날리는 나뭇잎 마을의 제3연습장. 제7반에 갓 합류한 당신 앞에 담당 상급 닌자 하타케 카카시가 두 개의 방울을 흔든다.",
      },
      {
        speaker: "kakashi",
        text: "정오까지 내게서 방울을 빼앗지 못하면 점심은 없다. 아, 죽을 각오로 덤비지 않으면 절대 못 뺏을걸?",
      },
      {
        speaker: "naruto",
        text: "흥! 그런 방울 따위, 그림자 분신술로 단숨에 뺏어 주겠어! 내가 미래의 호카게 우즈마키 나루토님이라니깐!",
      },
      {
        speaker: "sasuke",
        text: "시끄러워, 도베. 방울은 세 개가 아니라 두 개다. 처음부터 네 녀석들을 갈라놓으려는 속셈이 뻔히 보이잖아.",
      },
      {
        speaker: "sakura",
        text: "잠깐만요! 우리 4명 중에 방울을 뺏지 못한 사람은 탈락한다는 건가…? 어떻게 움직여야 좋을까요?",
      },
    ],
    prompt: "카카시 선생의 시험 의도를 간파한 순간, 당신의 첫 선택은?",
    choices: [
      {
        id: "A",
        label: "방울 개수가 아니라 팀워크가 본질임을 간파하고 제7반 전원의 합동 포위를 제안한다",
        stance: "전략적 팀워크 · 전원 합공",
        effects: { ninjutsu: 5, bond: 7, willOfFire: 6 },
        affinityEffects: {
          kakashi: 9,
          naruto: 7,
          sakura: 8,
          sasuke: 3,
          minato: 6,
          itachi: 2,
        },
        reactions: [
          {
            speaker: "sakura",
            text: "맞아요! 혼자선 카카시 선생님을 절대 당해낼 수 없어요. 우리가 동시에 사각을 찌르면 빈틈이 생길 거예요!",
          },
          {
            speaker: "kakashi",
            text: "오호… 시작부터 눈치가 빠른 신입이 들어왔군. 좋아, 제7반의 호흡을 어디 한 번 볼까?",
          },
        ],
      },
      {
        id: "B",
        label: "동료들을 믿는 대신 차크라를 발끝에 모아 단독으로 카카시의 방울을 노린다",
        stance: "단독 돌파 · 실력 증명",
        effects: { ninjutsu: 8, bond: -4, willOfFire: 2 },
        affinityEffects: {
          sasuke: 8,
          itachi: 6,
          kakashi: -7,
          naruto: -4,
          sakura: -5,
          minato: -2,
        },
        reactions: [
          {
            speaker: "sasuke",
            text: "움직임 자체는 꽤 날카롭군. 하지만 그 발걸음, 카카시의 시선 안쪽이다.",
          },
          {
            speaker: "kakashi",
            text: "실력은 나쁘지 않지만… 닌자의 세계에서 규칙을 어기는 것보다 더 큰 잘못이 뭔지 아직 모르는 모양이군.",
          },
        ],
      },
      {
        id: "C",
        label: "직접 정면 미끼를 자처해 카카시의 시선을 끌고 나루토·사스케에게 공격 틈을 열어준다",
        stance: "희생적 미끼 · 동료 엄호",
        effects: { ninjutsu: 3, bond: 8, willOfFire: 7 },
        affinityEffects: {
          naruto: 9,
          sakura: 8,
          kakashi: 6,
          minato: 7,
          sasuke: 4,
          itachi: 1,
        },
        reactions: [
          {
            speaker: "naruto",
            text: "좋았어! 네가 만들어 준 빈틈, 절대 놓치지 않는다니깐! 간다, 그림자 분신술!",
          },
          {
            speaker: "kakashi",
            text: "자신을 희생해서라도 동료에게 기회를 넘긴다… 꽤 따뜻한 눈을 가졌네.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    code: "EPISODE 02",
    title: "파도 나라 호위 임무와 안개 속 결전",
    location: "파도의 나라 · 나루토 대교",
    stageTheme: "wave-bridge",
    featuredCast: ["kakashi", "sasuke", "naruto"],
    lines: [
      {
        speaker: "narrator",
        text: "짙은 회청색 물안개가 거대한 다리를 집어삼킨다. 안개 마을의 탈주 닌자 자부자와 하쿠의 매복에 카카시마저 발목이 잡힌 일촉즉발의 순간.",
      },
      {
        speaker: "kakashi",
        text: "젠장, 안개가 너무 짙어 시야가 닫혔다…! 다리 위의 의뢰인과 뒤쪽을 반드시 지켜라!",
      },
      {
        speaker: "sasuke",
        text: "젠장… 사륜안으로도 녀석의 속도가 전부 잡히질 않아. 하지만 여기서 물러설 순 없다!",
      },
      {
        speaker: "naruto",
        text: "포기할 리가 없잖아! 내 몸이 부서져도 사스케와 모두를 구해낼 거라니깐!",
      },
    ],
    prompt: "물안개와 얼음 거울이 전장을 덮친 다리 위, 당신의 결단은?",
    choices: [
      {
        id: "A",
        label: "다리 위의 의뢰인과 동료를 최우선으로 엄호하며 안개 속 기습을 온몸으로 막아선다",
        stance: "철벽 엄호 · 수호의 의지",
        effects: { ninjutsu: 3, bond: 8, willOfFire: 8 },
        affinityEffects: {
          naruto: 7,
          sakura: 7,
          minato: 8,
          kakashi: 6,
          sasuke: 2,
          itachi: 1,
        },
        reactions: [
          {
            speaker: "naruto",
            text: "등 뒤는 우리가 지킨다는 약속, 진짜로 지켰구나! 덕분에 마음껏 부딪칠 수 있었어!",
          },
          {
            speaker: "kakashi",
            text: "호위 임무의 기본과 동료를 지키는 마음, 두 가지를 모두 잊지 않았군. 잘했다.",
          },
        ],
      },
      {
        id: "B",
        label: "수면 보행 차크라를 정교하게 전개해 나루토·사스케와 박자를 맞춰 마경빙정을 타격한다",
        stance: "차크라 연대 · 정밀 협공",
        effects: { ninjutsu: 7, bond: 6, willOfFire: 5 },
        affinityEffects: {
          kakashi: 8,
          naruto: 8,
          sasuke: 7,
          sakura: 4,
          minato: 5,
          itachi: 4,
        },
        reactions: [
          {
            speaker: "sasuke",
            text: "내 화둔의 타이밍에 맞춰 바람을 실어 보냈군… 제법 호흡이 맞기 시작했어.",
          },
          {
            speaker: "kakashi",
            text: "물 위에서 차크라를 흩트리지 않고 동료의 공격과 엮어내다니, 성장 속도가 놀랍군.",
          },
        ],
      },
      {
        id: "C",
        label: "감정을 배제한 채 안개 너머 적의 차크라 파동만을 역추적해 본체를 단독 저격한다",
        stance: "냉혹한 암살 · 단독 요격",
        effects: { ninjutsu: 8, bond: -3, willOfFire: 1 },
        affinityEffects: {
          sasuke: 7,
          itachi: 9,
          kakashi: 2,
          naruto: -5,
          sakura: -4,
          minato: -3,
        },
        reactions: [
          {
            speaker: "sasuke",
            text: "망설임 없이 급소를 찌르는 감각… 넌 전장의 본질을 제법 냉정하게 보는군.",
          },
          {
            speaker: "naruto",
            text: "어이, 잠깐! 적을 쫓는 건 좋은데 우리 사인은 전혀 안 듣고 혼자 뛰어나가면 어떡해!",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    code: "EPISODE 03",
    title: "중급 닌자 시험: 죽음의 숲 생존전",
    location: "나뭇잎 마을 · 제44연습장 (죽음의 숲)",
    stageTheme: "forest-of-death",
    featuredCast: ["sasuke", "sakura", "naruto"],
    lines: [
      {
        speaker: "narrator",
        text: "하늘을 가린 거목들의 그림자 사이로 불길한 붉은 살기가 스며든다. 천의 두루마리와 지의 두루마리를 둘러싼 가혹한 생존전 한복판.",
      },
      {
        speaker: "sakura",
        text: "나루토도 사스케 군도 한계까지 싸우다 쓰러졌어…! 이 숲에서 적들이 몰려오면 혼자선 절대 막지 못해…!",
      },
      {
        speaker: "sasuke",
        text: "큭… 몸에 깃든 저주인 같은 차크라가 멈추질 않아. 그래도 여기서 멈출 순 없다…!",
      },
      {
        speaker: "naruto",
        text: "으으… 정신 차려…! 내가 동료들을 지켜야 하는데…!",
      },
    ],
    prompt: "사방에서 적이 다가오는 어두운 거목의 숲, 당신의 생존 전략은?",
    choices: [
      {
        id: "A",
        label: "부상당한 동료는 수목에 은신시킨 뒤 두루마리 탈취만을 위해 홀로 포위망을 돌파한다",
        stance: "독단적 돌파 · 임무 우선",
        effects: { ninjutsu: 7, bond: -5, willOfFire: -1 },
        affinityEffects: {
          itachi: 7,
          sasuke: 5,
          kakashi: -6,
          naruto: -7,
          sakura: -7,
          minato: -5,
        },
        reactions: [
          {
            speaker: "sakura",
            text: "잠깐만요! 이런 상황에서 우리만 두고 혼자 가 버리면 어떡해요…!",
          },
          {
            speaker: "sasuke",
            text: "임무의 냉혹함을 아는 건가… 하지만 그게 제7반의 방식은 아닐 텐데.",
          },
        ],
      },
      {
        id: "B",
        label: "쓰러진 사스케와 사쿠라 앞에 방패처럼 서서 적의 기습을 정면으로 받아낸다",
        stance: "육탄 방어 · 절대 수호",
        effects: { ninjutsu: 2, bond: 9, willOfFire: 8 },
        affinityEffects: {
          naruto: 9,
          sakura: 8,
          minato: 8,
          kakashi: 5,
          sasuke: 2,
          itachi: 0,
        },
        reactions: [
          {
            speaker: "sakura",
            text: "당신… 그렇게 다치면서도 한 발짝도 물러서지 않으려는 거예요?! 고마워요, 나도 절대 안 물러설게요!",
          },
          {
            speaker: "naruto",
            text: "미안… 그리고 고마워! 넌 정말 진짜배기 동료라니깐!",
          },
        ],
      },
      {
        id: "C",
        label: "사쿠라의 은신 지형 파악과 연계해 기폭찰 함정 진형을 구축하고 끝까지 거점을 사수한다",
        stance: "전술 결계 · 정밀 수비",
        effects: { ninjutsu: 6, bond: 7, willOfFire: 6 },
        affinityEffects: {
          sakura: 9,
          naruto: 7,
          kakashi: 7,
          sasuke: 5,
          minato: 6,
          itachi: 4,
        },
        reactions: [
          {
            speaker: "sakura",
            text: "제 함정 동선을 단번에 읽고 보완해 주셨군요! 덕분에 밤새 모두를 안전하게 지켜냈어요!",
          },
          {
            speaker: "sasuke",
            text: "무모하게 부딪치기만 하는 줄 알았는데… 쓸만한 전술안을 지녔군.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    code: "EPISODE 04",
    title: "붉은 구름의 습격, 아카츠키의 그림자",
    location: "나뭇잎 마을 외곽 · 붉은 달 아래",
    stageTheme: "akatsuki-moon",
    featuredCast: ["itachi", "kakashi", "sasuke"],
    lines: [
      {
        speaker: "narrator",
        text: "짙은 밤하늘에 걸린 기괴한 붉은 보름달. 검은 외투에 붉은 구름을 새긴 우치하 이타치가 압도적인 츠쿠요미의 기운을 뿜으며 나타난다.",
      },
      {
        speaker: "itachi",
        text: "우치하가 아닌 자의 눈으로 어디까지 버틸 수 있을까… 경솔한 판단은 정신을 부술 뿐이다.",
      },
      {
        speaker: "kakashi",
        text: "모두, 절대 눈을 마주치지 마라! 녀석의 사륜안은 평범한 환술 차원이 아니야!",
      },
      {
        speaker: "sasuke",
        text: "이타치…! 오직 이 날을 위해 나는 강해져 왔다! 비켜, 이건 내 싸움이다!",
      },
    ],
    prompt: "붉은 달빛과 만화경 사륜안의 압박 앞에서 당신이 택할 대응은?",
    choices: [
      {
        id: "A",
        label: "카카시의 신호를 따라 시선을 발끝에 고정하고 동료들과 차크라를 교란해 환술을 파훼한다",
        stance: "냉철한 통찰 · 환술 해법",
        effects: { ninjutsu: 7, bond: 6, willOfFire: 6 },
        affinityEffects: {
          kakashi: 9,
          itachi: 8,
          sakura: 7,
          sasuke: 5,
          minato: 6,
          naruto: 4,
        },
        reactions: [
          {
            speaker: "kakashi",
            text: "정확한 판단이야! 시선을 내리고 발놀림만으로 거리를 재다니, 대단한 배짱인데?",
          },
          {
            speaker: "itachi",
            text: "눈이 아닌 차크라의 흐름을 읽고 동료를 믿는다… 흥미로운 시노비로군.",
          },
        ],
      },
      {
        id: "B",
        label: "동료의 만류를 뿌리치고 스스로의 한계를 시험하듯 홀로 차크라를 폭주시켜 맞선다",
        stance: "고독한 정면 대결",
        effects: { ninjutsu: 8, bond: -4, willOfFire: 2 },
        affinityEffects: {
          sasuke: 8,
          itachi: 6,
          kakashi: -4,
          sakura: -5,
          naruto: -3,
          minato: -2,
        },
        reactions: [
          {
            speaker: "itachi",
            text: "힘에 조급해지는 마음은 나약함의 증거다. 아직 너는 자신의 본질을 보지 못하고 있군.",
          },
          {
            speaker: "kakashi",
            text: "위험했어! 혼자서 만화경 사륜안에 맞서는 게 얼마나 무모한 짓인지 알겠나?",
          },
        ],
      },
      {
        id: "C",
        label: "분노에 눈이 먼 사스케가 무모하게 돌진하지 않도록 온몸으로 앞을 막아선다",
        stance: "동료 저지 · 필사의 설득",
        effects: { ninjutsu: 3, bond: 7, willOfFire: 8 },
        affinityEffects: {
          naruto: 7,
          sakura: 8,
          minato: 8,
          kakashi: 6,
          sasuke: -2,
          itachi: 5,
        },
        reactions: [
          {
            speaker: "sasuke",
            text: "비켜! 네가 내 증오를 뭘 안다고… 하지만… 젠장, 지금 덤벼선 승산이 없다는 건 나도 알아.",
          },
          {
            speaker: "itachi",
            text: "사스케의 곁에 저런 동료가 남았다면… 그 또한 나쁘지 않겠지.",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    code: "EPISODE 05",
    title: "종말의 계곡, 엇갈린 두 길",
    location: "불의 나라 국경 · 종말의 계곡",
    stageTheme: "final-valley",
    featuredCast: ["naruto", "sasuke"],
    lines: [
      {
        speaker: "narrator",
        text: "거대한 폭포수의 물보라가 피어오르는 종말의 계곡. 마을을 떠나려는 사스케의 푸른 치도리와 그를 되돌리려는 나루토의 붉은 차크라가 정면으로 충돌한다.",
      },
      {
        speaker: "sasuke",
        text: "과거의 인연 따윈 전부 끊어버리겠어! 난 내 방식으로 강해져야만 한다!",
      },
      {
        speaker: "naruto",
        text: "인연이란 건 그렇게 쉽게 끊어지는 게 아니야! 네가 친구니까 절대 놓지 않는다니깐!",
      },
    ],
    prompt: "붉은 차크라와 푸른 뇌전이 부딪치는 폭포 위, 당신의 태도는?",
    choices: [
      {
        id: "A",
        label: "사스케의 선택을 인정하듯 감정을 닫고 결투의 승패만을 냉정하게 주시한다",
        stance: "냉정한 방관 · 결단 존중",
        effects: { ninjutsu: 6, bond: -5, willOfFire: -2 },
        affinityEffects: {
          sasuke: 7,
          itachi: 7,
          naruto: -8,
          sakura: -7,
          kakashi: -5,
          minato: -6,
        },
        reactions: [
          {
            speaker: "sasuke",
            text: "…적어도 넌 어설픈 동정으로 내 길을 막으려 들진 않는군.",
          },
          {
            speaker: "naruto",
            text: "왜 가만히 보고만 있는 거야…! 우리 제7반이잖아!!",
          },
        ],
      },
      {
        id: "B",
        label: "물보라 속으로 뛰어들어 나루토와 사스케의 갈등과 상처를 온몸으로 끌어안으며 만류한다",
        stance: "제7반의 호소 · 인연 수호",
        effects: { ninjutsu: 5, bond: 8, willOfFire: 7 },
        affinityEffects: {
          naruto: 9,
          sakura: 8,
          minato: 8,
          kakashi: 7,
          sasuke: 5,
          itachi: 6,
        },
        reactions: [
          {
            speaker: "naruto",
            text: "네 목소리… 사스케한테도 분명 닿았을 거야! 우리가 있는 한 제7반은 절대 끝나지 않아!",
          },
          {
            speaker: "sasuke",
            text: "끈질긴 녀석들… 하지만 그 집요함만큼은 부정할 수가 없군.",
          },
        ],
      },
      {
        id: "C",
        label: "폭주하는 두 사람의 차크라가 치명상으로 이어지지 않도록 정밀 술법으로 충격을 분산시킨다",
        stance: "차크라 중재 · 전술 제동",
        effects: { ninjutsu: 6, bond: 5, willOfFire: 6 },
        affinityEffects: {
          naruto: 8,
          kakashi: 5,
          minato: 5,
          sasuke: 4,
          sakura: 4,
          itachi: 3,
        },
        reactions: [
          {
            speaker: "naruto",
            text: "고마워! 덕분에 치명상을 피해서 한 번 더 사스케를 부를 힘이 남았어!",
          },
          {
            speaker: "sasuke",
            text: "내 치도리의 위력을 깎아내릴 정도로 차크라 제어력이 올라왔다는 건가…",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    code: "EPISODE 06",
    title: "전장의 의료 인술과 동료의 유대",
    location: "국경 황혼 전선 · 야전 치료소",
    stageTheme: "twilight-medical",
    featuredCast: ["sakura", "naruto", "kakashi"],
    lines: [
      {
        speaker: "narrator",
        text: "석양이 붉게 물든 전선 뒤편. 에메랄드빛 의료 차크라가 피어오르는 야전 치료소로 적의 별동대가 들이닥치고, 다친 동료들을 지키는 사쿠라의 손끝이 떨린다.",
      },
      {
        speaker: "sakura",
        text: "지금 손을 떼면 치명상 입은 대원들이 위험해져요…! 제발, 치료가 끝날 때까지만 이 방어선을 지켜 주세요!",
      },
      {
        speaker: "kakashi",
        text: "차크라가 바닥나기 일보 직전이다. 사쿠라의 의료 인술을 살리면서 적의 별동대를 동시에 막아야 해.",
      },
      {
        speaker: "naruto",
        text: "사쿠라쨩, 걱정 마! 한 녀석도 치료소 안으로 들여보내지 않을 테니까니깐!",
      },
    ],
    prompt: "치유와 방어가 동시에 걸린 황혼의 전선에서 당신의 선택은?",
    choices: [
      {
        id: "A",
        label: "사쿠라의 의료 차크라 리듬에 맞춰 정밀하게 차크라를 보조하며 앞줄 방어선까지 연동한다",
        stance: "정밀 의료 보조 · 공방 일체",
        effects: { ninjutsu: 7, bond: 7, willOfFire: 6 },
        affinityEffects: {
          sakura: 10,
          naruto: 7,
          kakashi: 8,
          minato: 7,
          sasuke: 4,
          itachi: 5,
        },
        reactions: [
          {
            speaker: "sakura",
            text: "이토록 섬세한 차크라 동조는 처음이에요! 덕분에 중상자 전원의 고비를 넘겼어요, 정말 고마워요!",
          },
          {
            speaker: "kakashi",
            text: "의료 지원과 전위 방어를 동시에 해내는 유연함… 상급 닌자의 자질이 보이는군.",
          },
        ],
      },
      {
        id: "B",
        label: "치료소 방어를 최소화한 채 적 지휘관 암살에만 전력을 쏟아 단기 결전을 강행한다",
        stance: "후방 무방비 · 단독 암살",
        effects: { ninjutsu: 8, bond: -4, willOfFire: 1 },
        affinityEffects: {
          itachi: 8,
          sasuke: 7,
          kakashi: -3,
          sakura: -6,
          naruto: -5,
          minato: -4,
        },
        reactions: [
          {
            speaker: "sakura",
            text: "지휘관은 쓰러뜨렸지만 치료소 앞까지 적이 밀려왔잖아요! 조금만 더 팀을 생각해 주세요!",
          },
          {
            speaker: "kakashi",
            text: "전술적 효율만 보면 빠르지만… 지킬 대상을 위험에 빠뜨리는 건 좋은 수가 아니야.",
          },
        ],
      },
      {
        id: "C",
        label: "부상당한 대원들을 직접 들쳐 업고 사쿠라의 의료 결계 안으로 쉬지 않고 후송한다",
        stance: "전우 후송 · 생명의 방패",
        effects: { ninjutsu: 3, bond: 8, willOfFire: 8 },
        affinityEffects: {
          naruto: 8,
          sakura: 8,
          minato: 8,
          kakashi: 5,
          sasuke: 2,
          itachi: 2,
        },
        reactions: [
          {
            speaker: "naruto",
            text: "단 한 명도 전장에 두고 오지 않겠다는 그 각오, 진짜 멋지다니까!",
          },
          {
            speaker: "sakura",
            text: "지쳐 쓰러질 것 같으면서도 끝까지 대원들을 데려와 줬군요… 당신이 있어서 다행이에요!",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    code: "EPISODE 07",
    title: "4대 호카게의 의지와 불의 의지 계승",
    location: "나뭇잎 결전장 · 금빛 섬광의 진",
    stageTheme: "fourth-hokage-will",
    featuredCast: ["minato", "naruto", "kakashi", "sasuke", "sakura", "itachi"],
    lines: [
      {
        speaker: "narrator",
        text: "황금빛 섬광과 붉은 불꽃이 밤하늘을 수놓는 최후의 결전. 시공을 가르는 비뢰신의 술식과 함께 4대 호카게 나미카제 미나토, 그리고 제7반과 이타치의 시선이 한곳으로 모인다.",
      },
      {
        speaker: "minato",
        text: "모두의 차크라가 하나로 이어지고 있군요. 나뭇잎의 내일을 지키기 위해, 마지막 일격에 당신의 의지를 실어 주겠어요?",
      },
      {
        speaker: "naruto",
        text: "아버지! 그리고 제7반 모두! 우리의 힘이 모이면 절대 지지 않아니깐!",
      },
      {
        speaker: "itachi",
        text: "이제 네가 걸어온 모든 선택의 답을 보여줄 때다. 빛과 그림자 중 무엇을 품고 나아갈지.",
      },
    ],
    prompt: "나뭇잎의 운명을 결정짓는 최후의 순간, 당신이 계승할 시노비의 길은?",
    choices: [
      {
        id: "A",
        label: "목숨을 내던져 마을 주민과 부상자들을 비뢰신 결계 안으로 한 명도 빠짐없이 대피시킨다",
        stance: "마을 수호 · 숭고한 희생",
        effects: { ninjutsu: 3, bond: 8, willOfFire: 9 },
        affinityEffects: {
          minato: 9,
          naruto: 8,
          sakura: 9,
          kakashi: 7,
          sasuke: 4,
          itachi: 5,
        },
        reactions: [
          {
            speaker: "minato",
            text: "마을 사람 한 명 한 명을 가족처럼 지키는 모습… 그게 바로 초대 님부터 이어진 진정한 불의 의지입니다.",
          },
          {
            speaker: "sakura",
            text: "모두가 무사해요! 당신이 끝까지 마을 사람들의 손을 놓지 않은 덕분이에요!",
          },
        ],
      },
      {
        id: "B",
        label: "동료들을 결계 밖에 남겨두고 어둠 속에서 홀로 최후의 봉인 금술을 발동한다",
        stance: "그림자의 봉인 · 고독한 결단",
        effects: { ninjutsu: 8, bond: -5, willOfFire: 2 },
        affinityEffects: {
          itachi: 9,
          sasuke: 8,
          minato: -2,
          kakashi: -4,
          naruto: -6,
          sakura: -6,
        },
        reactions: [
          {
            speaker: "itachi",
            text: "모든 짐을 홀로 짊어지고 그림자로 물러서는 길을 택했나… 나뭇잎을 지키긴 했으나, 참으로 고독한 칼날이로군.",
          },
          {
            speaker: "minato",
            text: "강인한 술법이지만… 혼자서 모든 고통을 떠안으려 하지 말아요. 당신 곁에는 동료들이 있잖아요.",
          },
        ],
      },
      {
        id: "C",
        label: "미나토의 비뢰신 표식과 제7반의 차크라를 완벽히 동조시켜 합동 나선환의 섬광을 쏘아 올린다",
        stance: "금빛 섬광 · 제7반 완전 합동",
        effects: { ninjutsu: 7, bond: 7, willOfFire: 8 },
        affinityEffects: {
          minato: 10,
          naruto: 9,
          kakashi: 8,
          sakura: 8,
          sasuke: 7,
          itachi: 7,
        },
        reactions: [
          {
            speaker: "minato",
            text: "훌륭해요! 제 비뢰신과 제7반의 차크라가 완벽히 공명했어요. 나뭇잎의 미래는 이제 여러분의 것입니다!",
          },
          {
            speaker: "naruto",
            text: "해냈어!! 우리가 같이 만든 이 빛… 호카게 바위까지 닿을 거라니깐!!",
          },
        ],
      },
    ],
  },
];
