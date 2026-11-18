import type { Episode } from "../types";

export const EPISODES: Episode[] = [
  {
    id: 1,
    code: "EPISODE 01",
    title: "등나무 산의 최종 선별과 첫 임무",
    location: "후지카사네 산 · 등나무 숲의 관문",
    stageTheme: "wisteria-mountain",
    sceneDescription:
      "보랏빛 등나무 꽃이 만개한 산길. 일곱 밤낮의 최종 선별을 돌파한 신입 대원 앞에 붉은 눈동자의 소녀를 감싼 탄지로와 차가운 물빛 하오리의 수주 기유가 서 있다.",
    featuredCast: ["tanjiro", "nezuko", "giyu"],
    lines: [
      {
        speaker: "narrator",
        text: "등나무 꽃잎이 밤바람에 흩날리는 후지카사네 산 정상. 7일간의 사투를 견뎌낸 당신의 손에는 갓 벼려낸 옥강 일륜도의 기운이 감돈다.",
      },
      {
        speaker: "tanjiro",
        text: "너도 최종 선별을 통과했구나! 나는 카마도 탄지로야. 네즈코, 이 사람도 우리와 함께 싸울 동료야.",
      },
      {
        speaker: "nezuko",
        text: "음~! (상자 속에서 고개를 내민 네즈코가 등나무 꽃 사이로 당신을 말간 눈빛으로 바라본다.)",
      },
      {
        speaker: "giyu",
        text: "……신입인가. 첫 임무부터 혈귀와 인간이 함께 있는 기묘한 광경을 보았군. 검을 뽑을지, 등을 맡길지 스스로 판단해라.",
      },
    ],
    prompt: "첫 임무지인 북서쪽 마을로 향하기 직전, 당신은 어떤 자세로 검을 고쳐 쥘까?",
    choices: [
      {
        id: "A",
        label: "탄지로의 냄새와 네즈코의 눈빛을 믿고, 두 사람의 곁을 지키는 선봉으로 나선다.",
        stance: "인연과 수호",
        effects: { breathing: 2, trust: 7, resolve: 6 },
        affinityEffects: {
          tanjiro: 9,
          nezuko: 10,
          giyu: 5,
          mitsuri: 6,
          rengoku: 5,
          obanai: -4,
          sanemi: -5,
        },
        reactions: [
          {
            speaker: "tanjiro",
            text: "고마워! 네가 곁에 있어 주니 정말 든든해. 네즈코도 기뻐하는 냄새가 나!",
          },
          {
            speaker: "nezuko",
            text: "음! (네즈코가 작게 손을 흔들며 당신의 소매를 살짝 잡았다가 놓는다.)",
          },
          {
            speaker: "giyu",
            text: "……호흡을 흩뜨리지 마라. 믿음만큼이나 냉정한 칼끝이 필요할 테니까.",
          },
        ],
      },
      {
        id: "B",
        label: "기유에게 수주의 호흡 운용법을 청해 듣고, 홀로 적의 흔적을 정밀하게 추적한다.",
        stance: "전집중과 실전 검증",
        effects: { breathing: 6, trust: -4, resolve: 3 },
        affinityEffects: {
          giyu: 6,
          muichiro: 7,
          obanai: 6,
          sanemi: 5,
          shinobu: 4,
          tanjiro: -3,
          zenitsu: -4,
        },
        reactions: [
          {
            speaker: "giyu",
            text: "흐름을 읽는 눈은 나쁘지 않군. 하지만 혼자서는 놓치는 등 뒤가 반드시 생긴다.",
          },
          {
            speaker: "tanjiro",
            text: "잠깐, 혼자 가면 위험할지도 몰라! 호흡을 맞추는 것도 중요하다고 생각해!",
          },
        ],
      },
      {
        id: "C",
        label: "전집중 상중 호흡을 유지한 채 탄지로와 2인 1조 포진을 제안하며 지형을 먼저 파악한다.",
        stance: "균형 잡힌 전술",
        effects: { breathing: 6, trust: 5, resolve: 6 },
        affinityEffects: {
          giyu: 8,
          tanjiro: 7,
          shinobu: 6,
          gyomei: 6,
          nezuko: 5,
        },
        reactions: [
          {
            speaker: "giyu",
            text: "호흡을 끊지 않고 주변 지형까지 읽었군. 신입치고는 훌륭한 판단이다.",
          },
          {
            speaker: "tanjiro",
            text: "좋아! 좌우는 내가 맡을게. 우리 둘이라면 분명 마을 사람들을 무사히 지킬 수 있어!",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    code: "EPISODE 02",
    title: "나비저택의 기능회복훈련",
    location: "나비저택 · 도장 및 정원",
    stageTheme: "butterfly-mansion",
    sceneDescription:
      "맑은 햇살과 약초 향기가 감도는 나비저택 정원. 컵을 쥔 젠이츠의 비명, 호통치는 이노스케, 그리고 온화한 미소 뒤에 날카로운 시선을 감춘 충주 시노부가 지켜보고 있다.",
    featuredCast: ["zenitsu", "inosuke", "shinobu"],
    lines: [
      {
        speaker: "narrator",
        text: "첫 임무의 상처를 회복한 뒤 이어진 나비저택의 기능회복훈련. '전집중 상중'을 몸에 익히기 위한 지옥 같은 일상이 시작되었다.",
      },
      {
        speaker: "zenitsu",
        text: "안 돼애애!! 이건 고문이라고!! 몸이 찢어질 것 같은데 이걸 하루 종일 유지하라고?! 난 이제 틀렸어!",
      },
      {
        speaker: "inosuke",
        text: "시끄럽다 몬이츠!! 나는 벌써 호리병 세 개를 부술 기세다! 신입 녀석, 나랑 누가 더 먼저 시노부의 약탕을 들이키는지 승부다!!",
      },
      {
        speaker: "shinobu",
        text: "어머나~ 다들 기운이 넘치시네요. 자, 신입 대원님께서는 어떤 방식으로 이 훈련을 돌파하실 건가요?",
      },
    ],
    prompt: "전집중 상중 훈련과 동료들의 소란 속에서 당신이 택한 수련법은?",
    choices: [
      {
        id: "A",
        label: "시노부의 전술 조언에 맞춰 호흡 리듬을 초 단위로 계측하며 호리병 불기에 집중한다.",
        stance: "치밀한 분석",
        effects: { breathing: 6, trust: 4, resolve: 5 },
        affinityEffects: {
          shinobu: 10,
          muichiro: 7,
          giyu: 5,
          obanai: 5,
          inosuke: -2,
        },
        reactions: [
          {
            speaker: "shinobu",
            text: "훌륭해요. 폐활량과 맥박의 오차를 스스로 파악하셨군요. 역시 기대한 보람이 있어요.",
          },
          {
            speaker: "zenitsu",
            text: "우와… 엄청 침착해! 나도 좀 알려 주면 안 돼?! 시노부 씨가 무섭게 웃고 있단 말이야!",
          },
        ],
      },
      {
        id: "B",
        label: "겁먹은 젠이츠를 다독이고 이노스케와 부딪치며 셋이 함께 전집중 상중을 버텨 낸다.",
        stance: "동료와의 단결",
        effects: { breathing: 2, trust: 7, resolve: 5 },
        affinityEffects: {
          zenitsu: 10,
          inosuke: 7,
          tanjiro: 7,
          mitsuri: 8,
          rengoku: 5,
          obanai: -4,
        },
        reactions: [
          {
            speaker: "zenitsu",
            text: "으아아앙! 네가 옆에서 박자 맞춰 줘서 살았어! 넌 진짜 천사야!!",
          },
          {
            speaker: "inosuke",
            text: "흥! 제법 근성이 있군! 내일은 내 몸통박치기도 받아 내 보라고!!",
          },
          {
            speaker: "shinobu",
            text: "후후, 혼자보다 함께일 때 호흡이 더 깊어지는 타입이시네요. 나쁘지 않아요.",
          },
        ],
      },
      {
        id: "C",
        label: "남들의 속도는 무시한 채 잠자는 시간까지 줄여 극한의 단독 호흡 수련을 강행한다.",
        stance: "고독한 극한 수련",
        effects: { breathing: 7, trust: -5, resolve: 4 },
        affinityEffects: {
          sanemi: 7,
          obanai: 6,
          muichiro: 5,
          gyomei: 4,
          zenitsu: -6,
          mitsuri: -5,
          tanjiro: -3,
        },
        reactions: [
          {
            speaker: "shinobu",
            text: "아라라… 실력은 빠르게 늘었지만, 동료들과의 발걸음이 어긋나면 전장에서 독이 된답니다.",
          },
          {
            speaker: "inosuke",
            text: "뭐야 저 녀석, 눈빛이 완전히 돌았잖아! 혼자만 강해지겠다 이건가?!",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    code: "EPISODE 03",
    title: "무한열차의 악몽과 불꽃의 맹세",
    location: "무한열차 객실 및 선로 위",
    stageTheme: "mugen-train",
    sceneDescription:
      "칠흑 같은 밤을 가르는 증기기관차. 붉고 황금빛으로 타오르는 하오리의 염주 렌고쿠 쿄쥬로가 객차의 승객들을 등 뒤에 세운 채 아카자의 기운을 노려본다.",
    featuredCast: ["rengoku", "tanjiro", "nezuko"],
    lines: [
      {
        speaker: "narrator",
        text: "하현 1 엔무의 혈귀술이 풀린 직후, 열차가 탈선한 대지에 상현 3 아카자의 압도적인 살기가 내려앉는다. 새벽까지 남은 시간은 불과 몇 분.",
      },
      {
        speaker: "rengoku",
        text: "음! 여기서부터는 한 치도 물러설 수 없다! 200명의 승객 중 단 한 명도 죽게 두지 않겠다!!",
      },
      {
        speaker: "tanjiro",
        text: "렌고쿠 씨! 저 녀석의 살기는 지금까지와는 차원이 달라요! 하지만 우리도 절대 물러서지 않겠습니다!",
      },
      {
        speaker: "nezuko",
        text: "으음!! (네즈코가 승객들을 감싸며 분홍빛 폭혈의 기운을 손끝에 모은다.)",
      },
    ],
    prompt: "상현의 공포와 탈선한 열차의 아수라장 속에서 당신의 선택은?",
    choices: [
      {
        id: "A",
        label: "렌고쿠의 등 뒤에서 부상당한 승객과 네즈코를 끝까지 엄호하며 사상자 0명을 지켜 낸다.",
        stance: "불타는 수호의 맹세",
        effects: { breathing: 3, trust: 7, resolve: 7 },
        affinityEffects: {
          rengoku: 10,
          tanjiro: 9,
          nezuko: 9,
          gyomei: 7,
          mitsuri: 7,
          sanemi: 2,
        },
        reactions: [
          {
            speaker: "rengoku",
            text: "훌륭하다!! 자네가 승객들을 완벽히 지켜 준 덕분에 나도 마음껏 불꽃을 태울 수 있었다! 가슴을 펴라!!",
          },
          {
            speaker: "tanjiro",
            text: "우리가 해냈어! 누구도 죽지 않았어! 렌고쿠 씨의 신념을 네가 함께 지켜 낸 거야!",
          },
        ],
      },
      {
        id: "B",
        label: "승객 구조보다 아카자의 빈틈을 노린 합동 일격에 모든 호흡을 쏟아붓는다.",
        stance: "승부수와 강공",
        effects: { breathing: 6, trust: -4, resolve: 4 },
        affinityEffects: {
          sanemi: 7,
          obanai: 6,
          inosuke: 7,
          tengen: 4,
          rengoku: -4,
          tanjiro: -4,
          nezuko: -4,
        },
        reactions: [
          {
            speaker: "rengoku",
            text: "패기는 인정한다! 허나 대원으로서 가장 먼저 짊어져야 할 것은 약한 자의 생명이다. 그것을 잊지 마라!",
          },
          {
            speaker: "nezuko",
            text: "음…! (네즈코가 쓰러진 승객을 부축하며 당신을 걱정스레 바라본다.)",
          },
        ],
      },
      {
        id: "C",
        label: "탄지로·네즈코와 호흡을 번갈아 맞추며 승객 대피선과 아카자의 퇴로를 동시에 압박한다.",
        stance: "염주의 뜻을 잇는 연계",
        effects: { breathing: 6, trust: 5, resolve: 6 },
        affinityEffects: {
          rengoku: 9,
          tanjiro: 8,
          nezuko: 8,
          giyu: 6,
          shinobu: 5,
        },
        reactions: [
          {
            speaker: "rengoku",
            text: "음!! 실로 눈부신 판단과 꺾이지 않는 마음이다! 자네의 칼날에는 이미 다음 시대를 비출 빛이 깃들어 있군!",
          },
          {
            speaker: "tanjiro",
            text: "렌고쿠 씨의 말을 가슴에 새겼어. 우리 모두 새벽이 올 때까지 끝까지 버텨 내자!",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    code: "EPISODE 04",
    title: "환락의 거리 잠입과 화려한 돌파",
    location: "요시와라 유곽 · 불타는 야경",
    stageTheme: "entertainment-district",
    sceneDescription:
      "붉은 등불이 흩날리는 환락의 거리 지붕 위. 보석 머리장식을 빛내는 음주 우즈이 텐겐과 두려움에 떨면서도 번개의 각성을 앞둔 젠이츠, 쌍칼을 든 이노스케가 대치한다.",
    featuredCast: ["tengen", "zenitsu", "inosuke"],
    lines: [
      {
        speaker: "narrator",
        text: "상현 6 다키와 규타로의 혈귀술이 거리를 집어삼킨 밤. 맹독과 참격이 사방에서 쏟아지는 가운데 반격의 실마리를 찾아야 한다.",
      },
      {
        speaker: "tengen",
        text: "하하하! 드디어 화려한 본무대가 열렸군! 잘 들어라, 나에겐 이미 놈들의 '악보'가 보이기 시작했다! 목숨은 1순위로 챙기고, 판은 화려하게 뒤집는다!",
      },
      {
        speaker: "zenitsu",
        text: "목숨이 1순위라면서 지금 독이 빗발치잖아!! 아아… 그래도 동료가 잡혀 있는데 도망칠 순 없지…!",
      },
      {
        speaker: "inosuke",
        text: "크하하! 저 신 같은 녀석 말대로다! 저놈들 목을 동시에 베어 버리면 끝나는 거잖아!!",
      },
    ],
    prompt: "맹독이 퍼지고 전장이 갈라진 절체절명의 순간, 어떻게 판을 뒤집을까?",
    choices: [
      {
        id: "A",
        label: "텐겐의 악보 박자에 맞춰 이노스케와 동시에 정면으로 난입, 화려한 기습 연계를 터뜨린다.",
        stance: "화려한 정면 돌파",
        effects: { breathing: 6, trust: 5, resolve: 6 },
        affinityEffects: {
          tengen: 10,
          inosuke: 9,
          zenitsu: 6,
          rengoku: 6,
          sanemi: 5,
        },
        reactions: [
          {
            speaker: "tengen",
            text: "바로 그거야!! 박자가 한 치도 어긋나지 않았어! 넌 오늘부로 내 최고로 화려한 제자다!!",
          },
          {
            speaker: "inosuke",
            text: "봤냐!! 내 공간식각과 네 호흡이 합쳐지니 당할 자가 없잖아!!",
          },
        ],
      },
      {
        id: "B",
        label: "전선 후방에서 독에 쓰러진 젠이츠와 시민들을 먼저 안전한 지붕으로 피신시킨다.",
        stance: "생명과 동료 최우선",
        effects: { breathing: 2, trust: 7, resolve: 6 },
        affinityEffects: {
          zenitsu: 9,
          tengen: 6,
          mitsuri: 8,
          tanjiro: 7,
          nezuko: 7,
          sanemi: -3,
        },
        reactions: [
          {
            speaker: "zenitsu",
            text: "고마워… 네가 끝까지 손 놓지 않아 줘서 나도 '벽력일섬'을 쏠 용기가 났어!",
          },
          {
            speaker: "tengen",
            text: "목숨을 지키는 것도 화려함의 기본이지! 덕분에 내가 마음 놓고 맹독 속으로 뛰어든다!",
          },
        ],
      },
      {
        id: "C",
        label: "동료들이 미끼로 시선을 끄는 틈을 타, 명령 체계를 무시하고 혼자 다키의 목만을 노린다.",
        stance: "독단적인 암살",
        effects: { breathing: 6, trust: -6, resolve: 2 },
        affinityEffects: {
          obanai: 4,
          muichiro: 3,
          tengen: -7,
          zenitsu: -6,
          inosuke: -5,
          giyu: -4,
        },
        reactions: [
          {
            speaker: "tengen",
            text: "어이 신입! 이 싸움은 둘의 목을 동시에 베어야 끝난다고 몇 번이나 말했잖아! 초라한 독단은 관둬!",
          },
          {
            speaker: "inosuke",
            text: "야! 나한테 말도 없이 혼자 빠지면 어떡하냐!! 협공이 깨질 뻔했잖아!!",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    code: "EPISODE 05",
    title: "도공 마을의 안개와 사랑의 검",
    location: "도공 마을 · 숲과 대장간",
    stageTheme: "swordsmith-village",
    sceneDescription:
      "깊은 안개가 자욱한 도공들의 은신 마을. 무표정하게 칼날의 각도를 가늠하는 하주 토키토 무이치로와, 연분홍 칼날의 연주 칸로지 미츠리가 마을을 위협하는 상현의 분신들을 막아선다.",
    featuredCast: ["muichiro", "mitsuri"],
    lines: [
      {
        speaker: "narrator",
        text: "귀살대의 심장인 일륜도 제작소, 도공 마을이 상현 4 한텐구와 상현 5 굣코의 기습을 받았다. 대장장이들과 동료를 동시에 지켜야 하는 갈림길.",
      },
      {
        speaker: "muichiro",
        text: "……불필요한 감정은 방해될 뿐이야. 최단 거리로 본체를 찾아 베어 버리면 이 마을도 자연히 지켜져.",
      },
      {
        speaker: "mitsuri",
        text: "하지만 무이치로 군! 저기 장인 어르신들이 위험해 보여요! 우리 모두가 무사해야 진짜 승리죠!!",
      },
    ],
    prompt: "냉철한 효율(무이치로)과 따뜻한 구호(미츠리) 사이에서 당신의 판단은?",
    choices: [
      {
        id: "A",
        label: "무이치로의 안개처럼 일체의 헛동작을 버리고, 적의 본체 패턴과 약점만을 최우선으로 간파한다.",
        stance: "냉철한 본질 파악",
        effects: { breathing: 7, trust: -2, resolve: 4 },
        affinityEffects: {
          muichiro: 10,
          shinobu: 7,
          obanai: 7,
          giyu: 5,
          mitsuri: -3,
        },
        reactions: [
          {
            speaker: "muichiro",
            text: "……너, 생각보다 시야가 맑네. 구름처럼 흐리지 않고 정확히 급소를 봤어.",
          },
          {
            speaker: "mitsuri",
            text: "와아… 정말 빠르다! 그래도 장인분들이 다치지 않게 마지막까지 신경 써 줘요!",
          },
        ],
      },
      {
        id: "B",
        label: "미츠리와 함께 도공 장인들을 감싸며, 분신들의 파상 공세를 온몸으로 받아 내어 활로를 연다.",
        stance: "사랑과 헌신의 방패",
        effects: { breathing: 2, trust: 7, resolve: 6 },
        affinityEffects: {
          mitsuri: 10,
          tanjiro: 7,
          nezuko: 7,
          gyomei: 6,
          rengoku: 6,
          muichiro: -2,
        },
        reactions: [
          {
            speaker: "mitsuri",
            text: "고마워요!! 당신 덕분에 마을 분들이 전부 살아났어요! 정말 믿음직스러워서 눈물이 날 것 같아요!",
          },
          {
            speaker: "muichiro",
            text: "……쓸데없이 부상을 입었잖아. 그래도 덕분에 내 쪽에 집중할 시간은 벌렸네.",
          },
        ],
      },
      {
        id: "C",
        label: "안개의 호흡 간격으로 적의 시선을 묶어 두고, 미츠리의 연검이 본체에 닿도록 각도를 열어 준다.",
        stance: "주(柱)들의 호흡 조율",
        effects: { breathing: 6, trust: 5, resolve: 6 },
        affinityEffects: {
          muichiro: 8,
          mitsuri: 9,
          shinobu: 6,
          tengen: 5,
          giyu: 6,
        },
        reactions: [
          {
            speaker: "muichiro",
            text: "……지금 각도, 완벽했어. 네 이름, 확실히 기억해 둘게.",
          },
          {
            speaker: "mitsuri",
            text: "꺄아! 호흡이 딱 맞았어요! 두 사람과 함께 싸우니까 반점이 피어오를 것 같아요!!",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    code: "EPISODE 06",
    title: "주(柱) 합동 강화 훈련의 시련",
    location: "교메이의 수련장 · 폭포와 바위",
    stageTheme: "hashira-training",
    sceneDescription:
      "거대한 바위와 얼음 같은 폭포수 앞. 날카로운 눈빛의 사주 오바나이, 흉터 가득한 풍주 사네미, 그리고 염주를 쥐고 기도하는 최강의 암주 교메이가 신입 대원의 한계를 시험한다.",
    featuredCast: ["sanemi", "obanai", "gyomei"],
    lines: [
      {
        speaker: "narrator",
        text: "무잔과의 결전을 대비한 주(柱) 합동 강화 훈련. 귀살대에서도 가장 엄격하기로 소문난 세 명의 주가 한자리에 모였다.",
      },
      {
        speaker: "sanemi",
        text: "크하핫! 겨우 이 정도 속도로 귀살대 흉내를 내겠다고?! 내가 직접 목검으로 뼈가 부러질 때까지 두들겨 패 주마!",
      },
      {
        speaker: "obanai",
        text: "신용하지 않는다. 얄팍한 운으로 살아남은 녀석이 아닌지, 내 뱀의 검술로 밑바닥까지 검증해 주지.",
      },
      {
        speaker: "gyomei",
        text: "나무아미타불… 몸과 마음이 흔들리면 바위를 밀 수 없다. 네 안의 두려움과 마주 보거라.",
      },
    ],
    prompt: "최강 주들의 혹독한 시련 앞에서 당신은 어떻게 자신의 자격을 증명할까?",
    choices: [
      {
        id: "A",
        label: "쓰러져도 끝없이 다시 일어나며 사네미와 오바나이의 살기 어린 연격에 정면으로 칼을 맞댄다.",
        stance: "피투성이 실력 증명",
        effects: { breathing: 7, trust: 2, resolve: 6 },
        affinityEffects: {
          sanemi: 10,
          obanai: 9,
          inosuke: 6,
          gyomei: 5,
          zenitsu: -3,
        },
        reactions: [
          {
            speaker: "sanemi",
            text: "오호… 눈이 죽지 않았잖아? 그래, 그 독기라면 상현 앞에서도 쉽게 모가지가 날아가진 않겠어!",
          },
          {
            speaker: "obanai",
            text: "흥… 아슬아슬하게 합격선이다. 적어도 내 궤도를 따라올 눈은 가졌군.",
          },
        ],
      },
      {
        id: "B",
        label: "반복 동작으로 한계를 시험하며 지친 후배 대원들을 부축해 함께 바위 밀기를 완수한다.",
        stance: "반복 수련과 동료애",
        effects: { breathing: 4, trust: 6, resolve: 6 },
        affinityEffects: {
          gyomei: 10,
          tanjiro: 7,
          mitsuri: 7,
          zenitsu: 7,
          rengoku: 6,
          sanemi: 3,
          obanai: 2,
        },
        reactions: [
          {
            speaker: "gyomei",
            text: "나무아미타불… 자신의 고통 속에서도 타인의 손을 잡았구나. 실로 단단하고 맑은 영혼이다.",
          },
          {
            speaker: "obanai",
            text: "무른 녀석이라 생각했는데… 어째선지 모두의 사기가 올라갔군. 묘한 재주다.",
          },
        ],
      },
      {
        id: "C",
        label: "요령을 부려 위험한 대련을 피하고, 오로지 혼자만의 호흡 효율 계산에만 몰두한다.",
        stance: "냉소적 회피와 계산",
        effects: { breathing: 5, trust: -6, resolve: -3 },
        affinityEffects: {
          sanemi: -8,
          obanai: -7,
          gyomei: -7,
          rengoku: -5,
          shinobu: 2,
        },
        reactions: [
          {
            speaker: "sanemi",
            text: "하?! 지금 장난하냐?! 피 묻히기 싫으면 당장 귀살대 제복 벗고 집으로 꺼져!!",
          },
          {
            speaker: "gyomei",
            text: "가엾구나… 고통을 피하려는 검으로는 결코 무잔의 밤을 베지 못한다.",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    code: "EPISODE 07",
    title: "혈귀의 왕, 키부츠지 무잔의 유혹과 습격",
    location: "우부야시키 저택 · 화염 속의 대면",
    stageTheme: "muzan-ambush",
    sceneDescription:
      "붉은 달빛 아래 폭음과 함께 나타난 혈귀의 왕 키부츠지 무잔. 붉은 눈빛이 인간의 나약함을 비웃고, 탄지로와 기유가 칼날을 세운 채 앞을 가로막는다.",
    featuredCast: ["muzan", "tanjiro", "giyu"],
    lines: [
      {
        speaker: "narrator",
        text: "폭풍 전야. 저택에 스며든 칠흑의 그림자 속에서 혈귀의 시조 키부츠지 무잔이 직접 모습을 드러낸다.",
      },
      {
        speaker: "muzan",
        text: "우습구나, 인간이란… 백 년을 발버둥 쳐도 먼지처럼 부서질 목숨을 붙들고 대체 무엇을 지키겠다는 거지? 내 피를 받으면 영원한 힘과 목숨을 주마.",
      },
      {
        speaker: "tanjiro",
        text: "무잔!! 네가 빼앗은 모든 생명을 용서할 수 없어! 우리는 절대 네 꾐에 넘어가지 않아!",
      },
      {
        speaker: "giyu",
        text: "말에 흔들리지 마라. 호흡을 가다듬고 목을 베는 것에만 집중해라.",
      },
    ],
    prompt: "혈귀의 왕 무잔이 내민 힘의 유혹과 압도적 위압감 앞에서 당신의 선택은?",
    choices: [
      {
        id: "A",
        label: "\"인간의 유한한 생명이야말로 고귀하다\"며 분노를 삭이고 기유·탄지로와 완벽한 물의 연계로 반격한다.",
        stance: "불굴의 인간 찬가",
        effects: { breathing: 6, trust: 5, resolve: 7 },
        affinityEffects: {
          tanjiro: 10,
          giyu: 9,
          rengoku: 9,
          gyomei: 9,
          nezuko: 8,
          shinobu: 6,
        },
        reactions: [
          {
            speaker: "muzan",
            text: "…건방진 눈빛이군. 결국 멸망할 벌레 주제에, 죽음의 순간까지 내 발목을 잡겠다는 건가.",
          },
          {
            speaker: "giyu",
            text: "흔들리지 않았군. 지금 네 칼날에는 수주로서도 부끄럽지 않은 고요함이 있다.",
          },
        ],
      },
      {
        id: "B",
        label: "무잔의 힘에 대한 냉정한 관찰에 몰두해 동료들을 방패 삼아 단독으로 치명상을 노린다.",
        stance: "수단 불문 승부수",
        effects: { breathing: 7, trust: -7, resolve: 2 },
        affinityEffects: {
          tanjiro: -8,
          giyu: -7,
          nezuko: -7,
          gyomei: -6,
          mitsuri: -6,
          obanai: 3,
          sanemi: 2,
        },
        reactions: [
          {
            speaker: "tanjiro",
            text: "무슨 짓이야!! 동료를 미끼로 쓰다니, 그러면 우리가 무잔과 다를 게 뭐가 있어!!",
          },
          {
            speaker: "muzan",
            text: "후후… 그래, 결국 살아남기 위해 동료를 버리는군. 인간다운 추악함이야.",
          },
        ],
      },
      {
        id: "C",
        label: "위협을 무릅쓰고 탄지로의 앞을 막아서며 시간을 벌어, 주들이 집결할 때까지 혈로를 지킨다.",
        stance: "헌신적 방어선",
        effects: { breathing: 2, trust: 7, resolve: 7 },
        affinityEffects: {
          tanjiro: 9,
          nezuko: 8,
          giyu: 7,
          mitsuri: 8,
          zenitsu: 7,
          gyomei: 7,
        },
        reactions: [
          {
            speaker: "tanjiro",
            text: "버텨 줘서 고마워!! 모두의 기운이 모여들고 있어! 이제부터가 반격이야!",
          },
          {
            speaker: "giyu",
            text: "잘 버텼다. 이제 네 등은 내가 지킨다.",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    code: "EPISODE 08",
    title: "무한성 최종 결전 - 새벽을 여는 일격",
    location: "무한성 · 뒤틀린 회랑과 최후의 아침",
    stageTheme: "infinity-castle",
    sceneDescription:
      "끝없이 뒤틀리는 거대한 무한성, 그리고 마침내 동터 오는 새벽의 지평선. 9명의 주(柱)와 탄지로, 네즈코, 젠이츠, 이노스케까지 귀살대 전원이 칼날을 맞대어 최후의 일격을 준비한다.",
    featuredCast: ["tanjiro", "rengoku", "giyu", "sanemi"],
    lines: [
      {
        speaker: "narrator",
        text: "무한성의 심연이 무너져 내리고, 마침내 새벽까지 남은 마지막 순간. 살아남은 모든 검사들이 피투성이가 된 몸으로 서로의 등을 받친다.",
      },
      {
        speaker: "gyomei",
        text: "모두여, 끝까지 호흡을 놓지 마라! 우리의 모든 인연이 지금 이 일격으로 이어진다!",
      },
      {
        speaker: "shinobu",
        text: "당신과 함께라면 분명 새벽을 맞이할 수 있을 거예요. 자, 마지막 한 걸음입니다.",
      },
      {
        speaker: "sanemi",
        text: "어이, 신입! 뒈지지 말고 끝까지 내 옆에 붙어 있으라고!! 무잔 놈의 숨통을 완전히 끊어 버린다!",
      },
      {
        speaker: "tanjiro",
        text: "우리 모두의 마음이 하나가 됐어! 자, 새벽을 여는 마지막 일격을 날리자!!",
      },
    ],
    prompt: "여명이 밝아 오는 최후의 일격! 당신은 어떤 각오로 칼날을 휘두를 것인가?",
    choices: [
      {
        id: "A",
        label: "전집중의 극치인 혁도를 피워 올리며, 주들과 동기조의 호흡을 하나로 엮어 최선봉의 일격을 꽂는다.",
        stance: "새벽을 여는 최강의 일격",
        effects: { breathing: 7, trust: 6, resolve: 7 },
        affinityEffects: {
          tanjiro: 8,
          giyu: 8,
          rengoku: 8,
          gyomei: 8,
          sanemi: 7,
          obanai: 7,
          shinobu: 7,
          tengen: 7,
          muichiro: 7,
          mitsuri: 7,
          zenitsu: 6,
          inosuke: 7,
          nezuko: 7,
        },
        reactions: [
          {
            speaker: "rengoku",
            text: "보아라!! 저 불타는 새벽의 빛을! 자네는 모두의 마음을 등에 짊어지고 마침내 밤을 베어 냈다!",
          },
          {
            speaker: "obanai",
            text: "…훌륭하군. 네가 연 길 덕분에 우리 모두가 마지막 한 걸음을 내디딜 수 있었다.",
          },
          {
            speaker: "tanjiro",
            text: "해냈어…! 우리가 끝내 이겼어!! 새벽이 오고 있어!!",
          },
        ],
      },
      {
        id: "B",
        label: "자신이 방패가 되어 네즈코·젠이츠·미츠리 등 쓰러져 가는 동료들을 끌어안고 여명까지 버텨 낸다.",
        stance: "인연을 지키는 방패",
        effects: { breathing: 2, trust: 8, resolve: 7 },
        affinityEffects: {
          nezuko: 10,
          zenitsu: 9,
          mitsuri: 9,
          tanjiro: 8,
          tengen: 7,
          gyomei: 7,
          inosuke: 5,
          obanai: 3,
          sanemi: 2,
        },
        reactions: [
          {
            speaker: "mitsuri",
            text: "당신 덕분에 모두가 살아남았어요…! 이렇게 따뜻한 손은 처음이에요!",
          },
          {
            speaker: "zenitsu",
            text: "으아아앙! 우리가 해냈어! 다 같이 살아남았다고!!",
          },
          {
            speaker: "nezuko",
            text: "음~! (아침 햇살 속에서 네즈코가 눈물 젖은 미소로 당신을 꼭 끌어안는다.)",
          },
        ],
      },
      {
        id: "C",
        label: "누구의 도움도 받지 않고 오직 갈고닦은 단독 극한의 참격으로 홀로 무잔의 재생을 끊으려 파고든다.",
        stance: "고독한 극한의 일섬",
        effects: { breathing: 8, trust: -5, resolve: 4 },
        affinityEffects: {
          muichiro: 6,
          sanemi: 4,
          obanai: 4,
          giyu: -3,
          tanjiro: -6,
          zenitsu: -5,
          mitsuri: -5,
          tengen: -4,
        },
        reactions: [
          {
            speaker: "sanemi",
            text: "크하… 제법 독종이군. 그래도 등 뒤를 맡기진 않겠어, 너무 혼자 앞서 나갔다고!",
          },
          {
            speaker: "muichiro",
            text: "검은 엄청나게 날카로웠어… 하지만 혼자서만 싸우려던 건 조금 안타까워.",
          },
          {
            speaker: "tanjiro",
            text: "무사해서 다행이야! 하지만 다음엔… 꼭 함께 손을 맞잡고 싸우자!",
          },
        ],
      },
    ],
  },
];
