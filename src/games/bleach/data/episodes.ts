import type { Episode } from "../types";

export const EPISODES: Episode[] = [
  {
    id: 1,
    code: "EPISODE 01",
    title: "카라쿠라 마을의 밤과 사신 대행 각성",
    location: "카라쿠라 마을 주택가 · 푸른 가로등 아래",
    stageTheme: "karakura-night",
    featuredCast: ["ichigo", "rukia", "kon"],
    lines: [
      {
        speaker: "narrator",
        text: "짙은 밤안개가 내려앉은 카라쿠라 마을의 좁은 골목. 푸른 가로등 불빛 아래 허공의 장막이 찢어지며 거대한 가면을 쓴 호로가 포효한다.",
      },
      {
        speaker: "rukia",
        text: "조심해라! 사신의 영력을 막 각성한 네게는 아직 위험한 상대다. 영압의 흐름부터 안정시키고 움직여!",
      },
      {
        speaker: "ichigo",
        text: "방금 깨어난 힘이라지만 물러설 순 없어! 뒤쪽의 민간인 혼백을 먼저 대피시켜야 해!",
      },
      {
        speaker: "kon",
        text: "으악! 잠깐만, 나도 어엿한 개조 혼백인데 이치고 녀석 몸 말고 내 활약할 틈도 좀 줘라!",
      },
    ],
    prompt: "첫 실전 호로 토벌, 당신이 택할 영압 운용은?",
    choices: [
      {
        id: "A",
        label: "동료의 신호를 무시하고 각성 직후의 날것 그대로인 영압을 한계 이상으로 끌어올려 홀로 정면 참격을 날린다.",
        stance: "고독한 영압 과부하",
        effects: { reiatsu: 13, bond: -12, resolve: 3 },
        affinityEffects: {
          ichigo: 6,
          rukia: -10,
          ishida: -9,
          orihime: -8,
          sado: -7,
          urahara: -6,
          kon: -9,
        },
        reactions: [
          {
            speaker: "rukia",
            text: "바보 같은 짓 마라! 호로는 베었지만 제어 못 한 영압으로 주위까지 휘말릴 뻔했잖아!",
          },
          {
            speaker: "kon",
            text: "내, 내 몸까지 반동으로 날아갈 뻔했잖아! 다음부턴 신호 좀 맞추고 쏘라고!!",
          },
        ],
      },
      {
        id: "B",
        label: "영압을 통제하지 못한 채 당황하며 칼을 헛휘둘러, 콘과 루키아의 엄호 타이밍을 전부 놓치고 말았다.",
        stance: "영압 폭주와 판단 미스",
        effects: { reiatsu: -13, bond: -13, resolve: -12 },
        affinityEffects: {
          ichigo: -11,
          rukia: -12,
          kon: -12,
          ishida: -8,
          orihime: -8,
          sado: -8,
          urahara: -7,
        },
        reactions: [
          {
            speaker: "rukia",
            text: "정신 차려! 영압을 그따위로 흩뜨리면 호로에게 등을 내주는 꼴밖에 안 된다!",
          },
          {
            speaker: "ichigo",
            text: "제길… 어설프게 휘두르다가 빈틈만 커졌잖아. 눈앞의 적부터 제대로 봐!",
          },
        ],
      },
      {
        id: "C",
        label: "콘의 기동력으로 혼백을 안전한 골목으로 유도하게 하고, 루키아의 귀도 조준에 맞춰 영압을 모아 호로의 가면을 정확히 벤다.",
        stance: "삼각 연계 · 일섬 정격",
        effects: { reiatsu: 11, bond: 11, resolve: 11 },
        affinityEffects: {
          ichigo: 11,
          rukia: 13,
          kon: 12,
          ishida: 9,
          orihime: 9,
          sado: 8,
          urahara: 8,
        },
        reactions: [
          {
            speaker: "rukia",
            text: "좋은 칼끝이다! 귀도의 구속과 호흡을 정확히 읽어 냈구나. 사신 대행으로서 첫 단추를 완벽히 꿰었어.",
          },
          {
            speaker: "kon",
            text: "크으~ 내 화려한 도약과 네 참격의 환상 콤비! 봤지? 이게 바로 완벽한 팀워크다!!",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    code: "EPISODE 02",
    title: "메노스 그랑데 출현! 퀸시와의 자존심 대결",
    location: "카라쿠라 상공 · 붉은 가르간타 균열 앞",
    stageTheme: "menos-garganta",
    featuredCast: ["ishida", "ichigo", "rukia"],
    lines: [
      {
        speaker: "narrator",
        text: "하늘이 붉게 찢어지는 가르간타의 균열 사이로 거대한 그림자 '메노스 그랑데'가 강림한다. 차가운 푸른 영자 활을 든 퀸시 이시다 우류가 시선을 겨눈다.",
      },
      {
        speaker: "ishida",
        text: "사신 따위가 어설픈 영압으로 날뛰면 마을 전체가 붕괴한다. 이 숫자의 호로는 내 하이리히 프파일로 전부 처리하겠어.",
      },
      {
        speaker: "ichigo",
        text: "웃기지 마, 안경! 혼자서 다 떠맡을 생각 말고 내 참격이랑 맞물려 쏘면 한 방에 밀어낼 수 있잖아!",
      },
      {
        speaker: "rukia",
        text: "메노스 그랑데의 세로(虛閃)가 차오른다! 둘 다 자존심 싸움을 멈추고 즉시 대응해라!",
      },
    ],
    prompt: "붉은 하늘이 갈라진 퀸시와의 합동 전선, 당신의 판단은?",
    choices: [
      {
        id: "A",
        label: "이시다의 사거리 밖으로 적을 몰아넣고, 그의 영자 화살과 이치고의 참격 타이밍을 중계해 세로의 중심을 동시에 꿰뚫는다.",
        stance: "퀸시·사신 합동 파쇄",
        effects: { reiatsu: 11, bond: 10, resolve: 11 },
        affinityEffects: {
          ishida: 13,
          ichigo: 12,
          rukia: 11,
          orihime: 8,
          sado: 9,
          urahara: 9,
          kon: 7,
        },
        reactions: [
          {
            speaker: "ishida",
            text: "흥… 네가 사격 각도를 맞춰 준 덕분에 화살 궤적이 한 치도 어긋나지 않았군. 전술만큼은 인정하지.",
          },
          {
            speaker: "ichigo",
            text: "봤냐, 우류! 서로 호흡만 맞추면 저딴 괴물도 단숨에 몰아낼 수 있다고!",
          },
        ],
      },
      {
        id: "B",
        label: "이시다의 사격 궤적조차 무시하고 혼자서 영압을 폭발시켜 메노스의 발목을 끊는 단독 강행 돌파를 시도한다.",
        stance: "독단적 단독 참격",
        effects: { reiatsu: 13, bond: -12, resolve: 2 },
        affinityEffects: {
          ichigo: 7,
          ishida: -11,
          rukia: -9,
          orihime: -8,
          sado: -7,
          urahara: -6,
          kon: -7,
        },
        reactions: [
          {
            speaker: "ishida",
            text: "제멋대로 시야를 가리면 어떡하나! 내 화살까지 맞을 뻔했잖아, 무모한 사신 같으니!",
          },
          {
            speaker: "rukia",
            text: "단독으로 막아 내긴 했으나 동료의 사선까지 끊어 놓으면 다음 전투에선 치명적이다!",
          },
        ],
      },
      {
        id: "C",
        label: "메노스의 압도적 영압에 겁을 먹어 거리를 벌리지 못한 채 우왕좌왕하며 이시다의 사격 진형까지 흐트러뜨린다.",
        stance: "진형 붕괴와 후퇴",
        effects: { reiatsu: -14, bond: -12, resolve: -13 },
        affinityEffects: {
          ishida: -13,
          rukia: -11,
          ichigo: -11,
          orihime: -8,
          sado: -8,
          urahara: -9,
          kon: -7,
        },
        reactions: [
          {
            speaker: "ishida",
            text: "한심하군! 발밑이 흔들려서 사선 계산이 전부 빗나갔어! 싸울 각오가 없다면 물러나!",
          },
          {
            speaker: "ichigo",
            text: "눈을 떼지 마! 거대한 덩치에 눌려서 뒷걸음질 치면 다 같이 당한다고!",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    code: "EPISODE 03",
    title: "우라하라 상점 지하 수련장",
    location: "우라하라 상점 지하 · 암벽 훈련 공간",
    stageTheme: "urahara-basement",
    featuredCast: ["urahara", "ichigo", "sado", "orihime"],
    lines: [
      {
        speaker: "narrator",
        text: "지하 깊은 거대 암벽 공간. 우라하라 키스케가 부채로 얼굴을 가린 채 붉고 푸른 영압 파동이 교차하는 혹독한 실전 특훈을 개시한다.",
      },
      {
        speaker: "urahara",
        text: "자~ 소울 소사이어티에 들어가려면 겉만 번지르르한 영압으론 부족합니다. 자신의 검과 마음속 두려움을 동시에 베어 보세요~",
      },
      {
        speaker: "sado",
        text: "내 오른팔도 아직 완전하지 않아. 서로 빈틈을 메워 가며 버텨 보자.",
      },
      {
        speaker: "orihime",
        text: "누구도 다치면 안 되니까, 내가 순순육화로 모두의 방패를 꼭 지켜 낼게요!",
      },
    ],
    prompt: "우라하라의 기습 파동이 덮치는 지하 수련장, 당신의 훈련 방식은?",
    choices: [
      {
        id: "A",
        label: "우라하라의 기습 패턴을 읽지 못한 채 무작정 영압만 낭비하다가 지쳐 쓰러져 특훈을 망치고 만다.",
        stance: "집중력 결여와 영압 고갈",
        effects: { reiatsu: -13, bond: -13, resolve: -14 },
        affinityEffects: {
          urahara: -13,
          ichigo: -11,
          sado: -11,
          orihime: -11,
          rukia: -8,
          ishida: -9,
          kon: -7,
        },
        reactions: [
          {
            speaker: "urahara",
            text: "어라라~ 벌써 바닥나시면 어떡합니까? 이래선 정령정 문턱도 넘기 전에 쓰러지시겠는데요?",
          },
          {
            speaker: "sado",
            text: "호흡이 너무 거칠어. 기본부터 다시 가다듬지 않으면 위험하다.",
          },
        ],
      },
      {
        id: "B",
        label: "우라하라가 숨긴 연막 속 진짜 공격 각도를 간파하고, 사도의 견제·오리히메의 결계와 호흡을 맞춰 역공을 꽂아 넣는다.",
        stance: "통찰과 완벽한 반격",
        effects: { reiatsu: 11, bond: 11, resolve: 10 },
        affinityEffects: {
          urahara: 14,
          ichigo: 11,
          sado: 12,
          orihime: 12,
          ishida: 10,
          rukia: 9,
          kon: 8,
        },
        reactions: [
          {
            speaker: "urahara",
            text: "오호호~ 훌륭합니다! 제 계략의 허점까지 찌르면서 동료들의 박자까지 챙기시다니, 합격점이에요!",
          },
          {
            speaker: "orihime",
            text: "대단해요! 우리 넷의 호흡이 딱 맞으니까 우라하라 씨의 공격도 전혀 무섭지 않았어요!",
          },
        ],
      },
      {
        id: "C",
        label: "검술과 영압 제어를 포기한 채, 우라하라의 파동 공격을 오리히메와 사도 대신 온몸으로 막아내며 근성으로 버틴다.",
        stance: "무모한 육탄 방어",
        effects: { reiatsu: -12, bond: 12, resolve: 6 },
        affinityEffects: {
          orihime: 11,
          sado: 11,
          ichigo: 8,
          kon: 8,
          urahara: -10,
          ishida: -9,
          rukia: -8,
        },
        reactions: [
          {
            speaker: "orihime",
            text: "괜찮으세요?! 그렇게 무턱대고 몸으로 막으시면… 고맙지만 너무 아파 보여서 마음이 아파요!",
          },
          {
            speaker: "urahara",
            text: "의리는 좋습니다만, 영압으로 받아넘길 줄 모르면 실전에선 두 분 다 위험해집니다요~",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    code: "EPISODE 04",
    title: "소울 소사이어티 정령정 돌입",
    location: "정령정 백도문 · 눈부신 살기석 성벽 앞",
    stageTheme: "seireitei-gate",
    featuredCast: ["ichigo", "ishida", "sado", "orihime"],
    lines: [
      {
        speaker: "narrator",
        text: "영압을 차단하는 눈부신 백색 살기석 성벽 위로 흩날리는 벚꽃 잎과 날카로운 호정 13대의 검기가 사방을 포위한다.",
      },
      {
        speaker: "ichigo",
        text: "드디어 정령정 안이다! 루키아를 구할 때까지 멈추지 않아. 앞을 막는 녀석들은 전부 뚫고 간다!",
      },
      {
        speaker: "ishida",
        text: "진정해라, 쿠로사키! 대장급과 부대장급 영압이 사방에서 접근 중이다. 포위망의 약점을 먼저 끊어야 해!",
      },
      {
        speaker: "sado",
        text: "내 오른팔로 정면 길을 열겠다. 오리히메와 호흡을 맞춰 돌입하자.",
      },
    ],
    prompt: "사신들의 포위망이 좁혀 오는 백색 성벽 아래, 당신의 돌파 전술은?",
    choices: [
      {
        id: "A",
        label: "이시다의 포위 분석을 무시하고 대열에서 이탈해 함정 한복판에 발을 들였다가 사방의 귀도 포화에 노출된다.",
        stance: "독단 이탈과 포위 자초",
        effects: { reiatsu: -13, bond: -14, resolve: -14 },
        affinityEffects: {
          ichigo: -11,
          ishida: -12,
          sado: -11,
          orihime: -11,
          rukia: -10,
          urahara: -8,
          kon: -7,
        },
        reactions: [
          {
            speaker: "ishida",
            text: "내가 저 쪽은 귀도 결계라고 경고했잖나!! 무모한 행동 때문에 전원 탈출로까지 막혔어!",
          },
          {
            speaker: "sado",
            text: "……대열을 깨면 누구도 지킬 수 없다. 정신을 다잡아.",
          },
        ],
      },
      {
        id: "B",
        label: "동료들이 후위를 정리할 시간조차 기다리지 않고 홀로 영압을 날카롭게 끌어올려 최선봉 사신들을 단독으로 베어 제친다.",
        stance: "고립된 선봉 일섬",
        effects: { reiatsu: 13, bond: -12, resolve: 2 },
        affinityEffects: {
          ichigo: 6,
          ishida: -10,
          orihime: -9,
          sado: -9,
          rukia: -7,
          urahara: -6,
          kon: -7,
        },
        reactions: [
          {
            speaker: "orihime",
            text: "혼자 너무 멀리 가 버리시면… 저희가 치유도 엄호도 해 드릴 수가 없어요…!",
          },
          {
            speaker: "ishida",
            text: "적은 뚫었을지 몰라도 후속 팀과의 연락선이 전부 끊어졌군. 제멋대로인 녀석.",
          },
        ],
      },
      {
        id: "C",
        label: "사도의 일격으로 살기석 포위 한 축을 무너뜨리고, 이시다의 화살과 오리히메의 결계로 팀 전원이 한 번에 틈새를 돌파한다.",
        stance: "완벽한 사각 돌파 진형",
        effects: { reiatsu: 11, bond: 11, resolve: 11 },
        affinityEffects: {
          ishida: 12,
          ichigo: 12,
          sado: 12,
          orihime: 12,
          rukia: 10,
          urahara: 9,
          kon: 7,
        },
        reactions: [
          {
            speaker: "ishida",
            text: "정확한 타이밍이군! 네가 틈을 지정해 준 덕분에 단 한 명의 낙오자도 없이 정령정 심부로 들어왔다.",
          },
          {
            speaker: "ichigo",
            text: "좋았어!! 이 기세 그대로 쌍극의 언덕까지 단숨에 치고 올라가자!",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    code: "EPISODE 05",
    title: "쌍극의 언덕, 루키아 구출 작전",
    location: "정령정 쌍극의 언덕 · 작열하는 처형대",
    stageTheme: "sokyo-hill",
    featuredCast: ["rukia", "ichigo", "urahara"],
    lines: [
      {
        speaker: "narrator",
        text: "하늘을 태울 듯 솟아오른 황금빛 화염 '쌍극'의 창이 루키아를 겨누고, 칠흑 같은 검은 월아천충의 검기가 대기를 가른다.",
      },
      {
        speaker: "rukia",
        text: "이치고… 그리고 너까지 여기에 온 것이냐! 여기서 물러서라, 내 죄 때문에 너희까지 잃을 순 없다!",
      },
      {
        speaker: "ichigo",
        text: "시끄러워! 쓸데없는 소리 마, 루키아! 우린 처음부터 너를 데리러 온 거라고!",
      },
      {
        speaker: "urahara",
        text: "자, 이제 판을 뒤집을 한 수만 남았네요. 저 거대한 화염의 진의를 꿰뚫고 움직이셔야 합니다~",
      },
    ],
    prompt: "불타오르는 쌍극의 처형대 앞, 루키아를 구하기 위한 결단의 행동은?",
    choices: [
      {
        id: "A",
        label: "검격으로 쌍극의 힘을 받아넘기지 못한 채, 처형대 앞으로 뛰어들어 불길과 영압 폭풍을 몸으로 감싸며 루키아를 끌어안는다.",
        stance: "무모한 영혼 방패",
        effects: { reiatsu: -12, bond: 12, resolve: 6 },
        affinityEffects: {
          rukia: 9,
          ichigo: 9,
          orihime: 10,
          sado: 9,
          kon: 8,
          urahara: -10,
          ishida: -9,
        },
        reactions: [
          {
            speaker: "rukia",
            text: "네 목숨까지 버릴 셈이냐…! 하지만 그 무모한 손길 덕분에 난 다시 살 용기를 얻었다…",
          },
          {
            speaker: "urahara",
            text: "정신력은 대단하지만 영압을 깎아먹으며 막아 내시면 뒤가 없습니다요~!",
          },
        ],
      },
      {
        id: "B",
        label: "쌍극의 열파가 흩어지는 찰나, 이치고의 검은 월아천충과 정확히 참격을 포개어 처형대를 부수고 루키아를 안전히 받아 낸다.",
        stance: "쌍극 파쇄 · 월아 공명",
        effects: { reiatsu: 10, bond: 11, resolve: 12 },
        affinityEffects: {
          rukia: 14,
          ichigo: 13,
          urahara: 12,
          orihime: 10,
          sado: 10,
          ishida: 10,
          kon: 8,
        },
        reactions: [
          {
            speaker: "rukia",
            text: "해냈구나…! 정말로 저 쌍극을 베어 가르고 나를 구해 낼 줄이야. 고맙다, 진심으로!",
          },
          {
            speaker: "ichigo",
            text: "봤지?! 네 검기랑 내 월아천충이 맞물리니까 쌍극 따윈 한 방에 날아가잖아!",
          },
        ],
      },
      {
        id: "C",
        label: "압도적인 쌍극의 살기에 주춤거리며 검을 제때 뽑지 못해 구출 타이밍을 놓치고, 이치고와 루키아 모두를 위기에 몰아넣는다.",
        stance: "결정적 주저와 패착",
        effects: { reiatsu: -14, bond: -13, resolve: -15 },
        affinityEffects: {
          rukia: -13,
          ichigo: -13,
          urahara: -12,
          orihime: -9,
          sado: -9,
          ishida: -9,
          kon: -8,
        },
        reactions: [
          {
            speaker: "ichigo",
            text: "뭐 하는 거야!! 여기서 망설이면 루키아를 정말 잃는다고!! 정신 차려!!",
          },
          {
            speaker: "rukia",
            text: "이럴 거면… 차라리 오지 말았어야 했다! 그 흔들리는 검으로는 아무것도 구할 수 없어!",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    code: "EPISODE 06",
    title: "허권(웨코문드)의 하얀 사막과 끝없는 밤",
    location: "웨코문드 라스 노체스 외곽 · 백색 사막",
    stageTheme: "hueco-mundo",
    featuredCast: ["orihime", "sado", "ishida", "ichigo"],
    lines: [
      {
        speaker: "narrator",
        text: "칠흑의 밤하늘에 걸린 거대한 하얀 초승달 아래, 끝없는 백색 모래 안개 속에서 에스파다의 매복과 이질적인 호로의 영압이 몰려든다.",
      },
      {
        speaker: "orihime",
        text: "모두 다치지 않게 곁을 지켜야 하는데… 적들의 공격이 사방에서 동시에 오고 있어요!",
      },
      {
        speaker: "sado",
        text: "흔들리지 마, 오리히메. 우리가 너와 등을 맞대고 있는 한 절대 무너지지 않아.",
      },
      {
        speaker: "ishida",
        text: "모래 안개 때문에 시야가 극도로 좁다. 잘못 움직이면 고립당해 각개격파당할 거다!",
      },
    ],
    prompt: "끝없는 밤과 백색 모래 폭풍 속, 에스파다의 매복을 뚫는 선택은?",
    choices: [
      {
        id: "A",
        label: "오리히메의 치유·방어 영역을 중심으로 사도와 이시다의 사거리를 연결해, 안개 속 매복을 역포위하며 각개 격파한다.",
        stance: "모래 폭풍 역포위 진형",
        effects: { reiatsu: 11, bond: 11, resolve: 11 },
        affinityEffects: {
          orihime: 13,
          sado: 13,
          ishida: 12,
          ichigo: 12,
          rukia: 10,
          urahara: 10,
          kon: 8,
        },
        reactions: [
          {
            speaker: "orihime",
            text: "다행이에요! 모두가 한 팀으로 움직이니까 아무도 큰 상처 없이 빠져나올 수 있었어요!",
          },
          {
            speaker: "sado",
            text: "완벽한 연계였다. 네가 중심을 잡아 준 덕분에 주먹에 조금의 망설임도 없었다.",
          },
        ],
      },
      {
        id: "B",
        label: "백색 모래 안개의 환영에 속아 무작정 귀도와 검기를 난사하다가 영압만 소진하고 팀을 위기로 몰아넣는다.",
        stance: "오판과 영압 소진",
        effects: { reiatsu: -13, bond: -12, resolve: -14 },
        affinityEffects: {
          orihime: -13,
          sado: -13,
          ishida: -12,
          ichigo: -12,
          rukia: -9,
          urahara: -8,
          kon: -7,
        },
        reactions: [
          {
            speaker: "ishida",
            text: "허공에 화력과 영압을 다 쏟아부으면 어떡하나! 지금 상황 파악이 전혀 안 되는 건가?!",
          },
          {
            speaker: "orihime",
            text: "안 돼요… 방패가 깨지고 있어요! 왜 제 말을 듣지 않으신 건가요…!",
          },
        ],
      },
      {
        id: "C",
        label: "모래 폭풍 속에 동료들을 둔 채, 홀로 적의 우두머리를 추적하겠다며 위험한 호로화의 힘에 기대어 홀로 돌진한다.",
        stance: "호로화 폭주 · 고독한 추격",
        effects: { reiatsu: 13, bond: -12, resolve: 1 },
        affinityEffects: {
          ichigo: 5,
          ishida: -11,
          orihime: -11,
          sado: -11,
          rukia: -9,
          urahara: -7,
          kon: -7,
        },
        reactions: [
          {
            speaker: "sado",
            text: "……혼자 앞질러 가면 뒤에 남은 동료는 누가 지키나. 네 검은 무엇을 위한 검이냐.",
          },
          {
            speaker: "orihime",
            text: "그런 무서운 눈빛으로 혼자 가지 마세요… 제발 모두 함께 돌아가기로 했잖아요…!",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    code: "EPISODE 07",
    title: "현세 결전: 영압의 한계를 넘어선 일격",
    location: "공중 카라쿠라 마을 상공 · 최후의 결전장",
    stageTheme: "final-karakura",
    featuredCast: ["ichigo", "rukia", "urahara", "ishida", "orihime", "sado", "kon"],
    lines: [
      {
        speaker: "narrator",
        text: "흑백의 섬광이 찢어지는 폭풍의 하늘. 붉고 푸른 영압이 대지를 뒤흔드는 최후의 결전장에서 모든 동료가 당신의 등을 바라보고 있다.",
      },
      {
        speaker: "ichigo",
        text: "여기가 마지막이다! 내 월아천충의 모든 것을 실어 날릴 테니, 네 마지막 일격으로 끝을 내자!",
      },
      {
        speaker: "rukia",
        text: "네가 걸어온 길과 우리 모두의 신뢰가 지금 이 검 끝에 담겨 있다. 망설이지 마라!",
      },
      {
        speaker: "urahara",
        text: "판은 모두 깔렸습니다. 동료들과 함께 여태 쌓아 올린 모든 영압을 지금 해방하실 때예요!",
      },
    ],
    prompt: "카라쿠라 마을과 소울 소사이어티의 운명을 건 최후의 일격, 당신의 선택은?",
    choices: [
      {
        id: "A",
        label: "최후의 순간, 내면의 두려움과 흔들리는 영압에 짓눌려 참백도를 놓치고 동료들의 총공격마저 무산시키고 만다.",
        stance: "영압 붕괴와 패배의 밤",
        effects: { reiatsu: -14, bond: -15, resolve: -15 },
        affinityEffects: {
          ichigo: -14,
          rukia: -14,
          ishida: -13,
          orihime: -13,
          sado: -13,
          urahara: -13,
          kon: -13,
        },
        reactions: [
          {
            speaker: "ichigo",
            text: "안 돼!! 여기서 멈추면 전부 끝장이야!! 일어서, 제발 검을 쥐라고!!",
          },
          {
            speaker: "rukia",
            text: "……끝인가. 영압이 무너져 내리고 있어… 우리가 지켜야 할 모든 것이 어둠에 잠기고 만다…",
          },
        ],
      },
      {
        id: "B",
        label: "이치고·루키아·우라하라의 전술과 동료 전원의 영압을 하나로 엮어, 하늘을 가르는 푸르고 하얀 최후의 합동 참격을 작렬시킨다.",
        stance: "동료의 유대 · 최후의 월아 일섬",
        effects: { reiatsu: 12, bond: 12, resolve: 12 },
        affinityEffects: {
          ichigo: 14,
          rukia: 14,
          ishida: 12,
          orihime: 12,
          sado: 12,
          urahara: 13,
          kon: 12,
        },
        reactions: [
          {
            speaker: "ichigo",
            text: "크아아아!! 완벽하게 꿰뚫었어! 네 영압과 우리 모두의 마음이 적의 야망을 산산조각 냈다고!!",
          },
          {
            speaker: "urahara",
            text: "대단하십니다! 사신과 인간, 퀸시의 힘까지 하나로 엮어 내시다니… 정말 완벽한 결말이네요!",
          },
        ],
      },
      {
        id: "C",
        label: "자신의 영압과 검술은 완전히 버린 채, 쓰러질 위기에 처한 콘과 동료들 앞을 방패처럼 가로막아 최후의 여파를 온몸으로 받아낸다.",
        stance: "생명을 건 수호의 방벽",
        effects: { reiatsu: -12, bond: 12, resolve: 6 },
        affinityEffects: {
          orihime: 11,
          sado: 11,
          kon: 12,
          ichigo: 9,
          rukia: -7,
          ishida: -9,
          urahara: -9,
        },
        reactions: [
          {
            speaker: "kon",
            text: "바, 바보 같은 녀석!! 네 목숨이 날아가면 어쩌려고 몸부터 던지냐고!! …고마워, 진짜 넌 최고의 동료다!!",
          },
          {
            speaker: "ishida",
            text: "무모하기 짝이 없지만… 동료를 끝까지 버리지 않는 그 고집만큼은 누구도 못 꺾겠군.",
          },
        ],
      },
    ],
  },
];
