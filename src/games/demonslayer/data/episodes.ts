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
        label: "탄지로와 네즈코의 사정은 무시한 채, 기유의 호흡 동작만 흉내 내며 홀로 산길을 앞서 나간다.",
        stance: "독단적인 수련행",
        effects: { breathing: 12, trust: -12, resolve: 2 },
        affinityEffects: {
          muichiro: 9,
          obanai: 8,
          sanemi: 7,
          tanjiro: -10,
          nezuko: -11,
          giyu: -6,
          mitsuri: -7,
        },
        reactions: [
          {
            speaker: "giyu",
            text: "칼을 쓰는 손은 빠르지만 시야가 좁군. 등을 맡길 줄 모르면 첫 밤에 목이 날아간다.",
          },
          {
            speaker: "tanjiro",
            text: "잠깐, 혼자 먼저 가버리면 어떡해! 같이 발을 맞춰야 마을 사람들을 지킬 수 있는데…!",
          },
        ],
      },
      {
        id: "B",
        label: "전집중 상중 호흡을 가다듬고 탄지로·네즈코의 진심을 믿으며 2인 1조 포진으로 지형을 살핀다.",
        stance: "인연과 전술의 균형",
        effects: { breathing: 10, trust: 11, resolve: 10 },
        affinityEffects: {
          tanjiro: 12,
          nezuko: 11,
          giyu: 10,
          shinobu: 7,
          rengoku: 7,
          gyomei: 6,
          mitsuri: 7,
        },
        reactions: [
          {
            speaker: "giyu",
            text: "호흡을 흩뜨리지 않고 주변 지형과 동료까지 읽었군. 신입치고는 손색없는 판단이다.",
          },
          {
            speaker: "tanjiro",
            text: "고마워! 네가 곁에서 호흡을 맞춰 주니 마음이 정말 든든해. 네즈코도 기뻐하는 냄새가 나!",
          },
          {
            speaker: "nezuko",
            text: "음! (네즈코가 밝게 고개를 끄덕이며 당신의 소매를 살짝 잡았다가 놓는다.)",
          },
        ],
      },
      {
        id: "C",
        label: "혈귀가 낀 팀과는 싸울 수 없다며 소란을 피우고, 밤어둠이 짙어지자 후방 짐칸 뒤로 물러난다.",
        stance: "불신과 전열 이탈",
        effects: { breathing: -12, trust: -15, resolve: -14 },
        affinityEffects: {
          tanjiro: -13,
          nezuko: -15,
          giyu: -13,
          rengoku: -10,
          gyomei: -9,
          mitsuri: -10,
          zenitsu: -8,
        },
        reactions: [
          {
            speaker: "giyu",
            text: "……실망스럽군. 상황도 파악하지 못한 채 동료에게 검끝을 겨누는 자에게 일륜도는 사치다.",
          },
          {
            speaker: "tanjiro",
            text: "우리가 뭘 지켜야 하는지 아직도 모르는 거야? 이렇게 등을 돌리면 누구도 구할 수 없어!",
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
        label: "시노부의 눈을 피해 요령껏 훈련 횟수를 속이고, 지친 젠이츠에게 약탕을 떠넘긴 채 몰래 쉰다.",
        stance: "편법과 책임 전가",
        effects: { breathing: -14, trust: -16, resolve: -13 },
        affinityEffects: {
          shinobu: -14,
          zenitsu: -13,
          inosuke: -12,
          sanemi: -11,
          obanai: -10,
          tengen: -9,
          gyomei: -9,
        },
        reactions: [
          {
            speaker: "shinobu",
            text: "어머나… 나비저택에서 제 눈을 속일 수 있다고 생각하셨나요? 전장에서 가장 먼저 쓰러질 태도네요.",
          },
          {
            speaker: "zenitsu",
            text: "야!! 나한테까지 떠넘기고 도망치면 어떡해!! 너 진짜 최악이야!!",
          },
        ],
      },
      {
        id: "B",
        label: "동료들을 비웃으며 대화조차 끊고, 밤새 무리하게 호리병을 불어 혼자만의 폐활량 기록에 집착한다.",
        stance: "배타적 극한 수련",
        effects: { breathing: 12, trust: -12, resolve: 2 },
        affinityEffects: {
          sanemi: 8,
          obanai: 7,
          muichiro: 7,
          zenitsu: -11,
          inosuke: -8,
          shinobu: -6,
          mitsuri: -9,
        },
        reactions: [
          {
            speaker: "shinobu",
            text: "폐활량은 늘었지만 동료와 호흡이 완전히 어긋났어요. 혼자선 상현을 이길 수 없답니다.",
          },
          {
            speaker: "inosuke",
            text: "뭐야 저 재수 없는 녀석! 혼자만 잘났다고 선을 긋는 꼴이 영 거슬리는데?!",
          },
        ],
      },
      {
        id: "C",
        label: "시노부의 전술 조언대로 호흡 박자를 맞춘 뒤, 겁먹은 젠이츠·이노스케와 함께 끝까지 버텨 낸다.",
        stance: "치밀한 수련과 단결",
        effects: { breathing: 11, trust: 11, resolve: 10 },
        affinityEffects: {
          shinobu: 13,
          zenitsu: 12,
          inosuke: 11,
          tanjiro: 8,
          mitsuri: 8,
          muichiro: 6,
          tengen: 6,
        },
        reactions: [
          {
            speaker: "shinobu",
            text: "훌륭해요. 본인의 맥박을 제어하면서도 동료들의 사기까지 끌어올리셨군요. 정말 믿음직스러워요.",
          },
          {
            speaker: "zenitsu",
            text: "으아아앙! 네가 옆에서 박자를 잡아 줘서 전집중 상중을 버텨 냈어! 너 정말 최고야!!",
          },
          {
            speaker: "inosuke",
            text: "크하하! 제법 근성이 있구나! 내일은 나랑 호리병 깨기 대결이다!!",
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
        label: "탄지로·네즈코와 교대로 호흡을 유지하며 승객 200명의 대피선과 렌고쿠의 퇴로를 빈틈없이 지킨다.",
        stance: "불타는 수호의 연계",
        effects: { breathing: 10, trust: 11, resolve: 12 },
        affinityEffects: {
          rengoku: 14,
          tanjiro: 11,
          nezuko: 11,
          gyomei: 9,
          mitsuri: 8,
          giyu: 7,
        },
        reactions: [
          {
            speaker: "rengoku",
            text: "음!! 훌륭하다!! 자네가 승객과 등 뒤를 완벽히 지켜 준 덕분에 나도 마음껏 불꽃을 태웠다! 가슴을 펴라!!",
          },
          {
            speaker: "tanjiro",
            text: "모두 살아남았어! 렌고쿠 씨의 신념을 네가 함께 지켜 낸 거야!!",
          },
        ],
      },
      {
        id: "B",
        label: "아카자의 압도적 살기에 겁먹어 칼을 거둔 채, 탈선한 객차 잔해 뒤로 몸을 숨기고 상황을 관망한다.",
        stance: "위축된 방관과 도피",
        effects: { breathing: -12, trust: -15, resolve: -16 },
        affinityEffects: {
          rengoku: -15,
          tanjiro: -13,
          nezuko: -12,
          sanemi: -13,
          obanai: -10,
          tengen: -10,
          inosuke: -10,
        },
        reactions: [
          {
            speaker: "rengoku",
            text: "……실망이다! 귀살대의 대원이 약한 자 앞에서 검을 거두고 숨는다면, 그 하오리는 무슨 의미가 있나!",
          },
          {
            speaker: "tanjiro",
            text: "왜 움직이지 않은 거야…! 승객들이 다칠 뻔했잖아…!",
          },
        ],
      },
      {
        id: "C",
        label: "검술 자세와 호흡을 포기한 채 맨몸으로 부상당한 승객들 위에 엎드려 시간만 온몸으로 버텨 낸다.",
        stance: "무방비한 육탄 보호",
        effects: { breathing: -12, trust: 12, resolve: 6 },
        affinityEffects: {
          tanjiro: 9,
          nezuko: 10,
          mitsuri: 10,
          zenitsu: 8,
          rengoku: 4,
          sanemi: -9,
          obanai: -9,
          muichiro: -8,
        },
        reactions: [
          {
            speaker: "nezuko",
            text: "음…! (네즈코가 상처투성이가 된 당신의 어깨를 걱정스레 감싸 안는다.)",
          },
          {
            speaker: "rengoku",
            text: "생명을 지킨 용기는 가상하다! 허나 호흡마저 놓아 버린 무방비로는 다음 전투를 버틸 수 없다!",
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
        label: "텐겐의 악보 지시를 무시한 채, 성급하게 적의 오비 속으로 뛰어들었다가 독에 맞아 포위당한다.",
        stance: "무모한 돌출과 피격",
        effects: { breathing: -14, trust: -13, resolve: -14 },
        affinityEffects: {
          tengen: -14,
          zenitsu: -11,
          inosuke: -12,
          shinobu: -9,
          giyu: -8,
          muichiro: -8,
        },
        reactions: [
          {
            speaker: "tengen",
            text: "어이 신입! 대체 몇 번을 말해야 알아듣냐?! 박자도 안 맞추고 뛰어들면 짐만 될 뿐이야!",
          },
          {
            speaker: "inosuke",
            text: "아오 답답해!! 네 뒤치다꺼리 하다가 목 베는 타이밍 다 놓쳤잖아!!",
          },
        ],
      },
      {
        id: "B",
        label: "텐겐의 악보 박자에 맞춰 젠이츠·이노스케와 동시에 기습 연계를 펼쳐 두 남매의 목을 노린다.",
        stance: "화려한 삼위일체 돌파",
        effects: { breathing: 11, trust: 11, resolve: 10 },
        affinityEffects: {
          tengen: 14,
          inosuke: 11,
          zenitsu: 11,
          rengoku: 7,
          tanjiro: 7,
          sanemi: 6,
        },
        reactions: [
          {
            speaker: "tengen",
            text: "바로 그거야!! 박자가 한 치도 어긋나지 않았어! 넌 오늘부로 내 최고로 화려한 제자다!!",
          },
          {
            speaker: "zenitsu",
            text: "해냈어…! 네가 박자를 맞춰 줘서 내 벽력일섬도 끝까지 닿았다고!!",
          },
        ],
      },
      {
        id: "C",
        label: "동료들을 미끼로 방치하고 전선에서 이탈해 홀로 다키의 목만 노리는 단독 암살을 강행한다.",
        stance: "동료를 버린 단독 암살",
        effects: { breathing: 12, trust: -13, resolve: 1 },
        affinityEffects: {
          obanai: 7,
          muichiro: 7,
          tengen: -12,
          zenitsu: -11,
          inosuke: -10,
          mitsuri: -9,
          tanjiro: -8,
        },
        reactions: [
          {
            speaker: "tengen",
            text: "초라하기 짝이 없군! 동료를 미끼로 쓰고 혼자 공을 챙기려는 짓은 절대 화려하지 않아!",
          },
          {
            speaker: "inosuke",
            text: "야! 나한테 말도 없이 혼자 빠지면 어떡하냐!! 협공이 완전히 망가질 뻔했잖아!!",
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
        label: "무이치로의 지적을 무시한 채 호흡마저 흐트러진 상태로 도공들을 끌어안고 좁은 대장간에 갇힌다.",
        stance: "감상적인 고립 방어",
        effects: { breathing: -12, trust: 12, resolve: 6 },
        affinityEffects: {
          mitsuri: 11,
          nezuko: 8,
          zenitsu: 7,
          muichiro: -11,
          obanai: -10,
          shinobu: -7,
          sanemi: -8,
        },
        reactions: [
          {
            speaker: "mitsuri",
            text: "대장장이 어르신들을 끝까지 지켜 주셔서 감사해요! 하지만 너무 무모하게 검을 버리셨어요…!",
          },
          {
            speaker: "muichiro",
            text: "……대장장이랑 같이 갇혀서 칼도 못 휘두르면 무슨 소용이야. 완전히 비효율적이네.",
          },
        ],
      },
      {
        id: "B",
        label: "안개의 호흡 간격으로 적의 본체 궤적을 묶어 두고, 미츠리의 연검이 장인들을 구할 각도를 연다.",
        stance: "주(柱)들의 호흡 조율",
        effects: { breathing: 11, trust: 11, resolve: 11 },
        affinityEffects: {
          muichiro: 13,
          mitsuri: 13,
          shinobu: 8,
          giyu: 7,
          tengen: 6,
          obanai: 6,
        },
        reactions: [
          {
            speaker: "muichiro",
            text: "……지금 각도, 완벽했어. 네 이름, 확실히 기억해 둘게.",
          },
          {
            speaker: "mitsuri",
            text: "꺄아! 호흡이 딱 맞았어요! 장인분들도 무사하고 적도 물리쳤어요!!",
          },
        ],
      },
      {
        id: "C",
        label: "어차피 장인들은 늦었다며 대피 유도를 포기하고, 무이치로와 미츠리 사이에서 갈팡질팡하다 칼을 놓친다.",
        stance: "우유부단한 실책",
        effects: { breathing: -14, trust: -15, resolve: -14 },
        affinityEffects: {
          muichiro: -13,
          mitsuri: -14,
          obanai: -11,
          gyomei: -10,
          tanjiro: -10,
          rengoku: -9,
        },
        reactions: [
          {
            speaker: "muichiro",
            text: "……도움은커녕 방해만 되네. 판단을 못 내릴 거면 비켜.",
          },
          {
            speaker: "mitsuri",
            text: "어떻게 대장장이 분들을 포기하자고 말할 수 있어요…?! 너무해요!!",
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
        label: "피투성이가 되어도 포기하지 않고 사네미·오바나이의 연격을 받아 내며 지친 대원들과 바위를 민다.",
        stance: "불굴의 투혼과 정진",
        effects: { breathing: 11, trust: 10, resolve: 12 },
        affinityEffects: {
          sanemi: 13,
          obanai: 13,
          gyomei: 13,
          rengoku: 8,
          tanjiro: 7,
          inosuke: 7,
        },
        reactions: [
          {
            speaker: "sanemi",
            text: "크하핫! 눈이 죽지 않았잖아?! 그 독기라면 상현 앞에서도 쉽게 모가지가 날아가진 않겠어!",
          },
          {
            speaker: "obanai",
            text: "흥… 합격선이다. 내 궤도를 따라오면서도 동료를 끌고 갈 배짱은 있군.",
          },
          {
            speaker: "gyomei",
            text: "나무아미타불… 실로 단단하고 맑은 수련이었다.",
          },
        ],
      },
      {
        id: "B",
        label: "후배 대원들의 비명에는 귀를 닫은 채 혼자서만 바위를 밀고 사네미와 살벌한 개인 대련에 몰두한다.",
        stance: "고립된 힘의 추구",
        effects: { breathing: 13, trust: -13, resolve: 3 },
        affinityEffects: {
          sanemi: 9,
          obanai: 8,
          muichiro: 6,
          gyomei: -6,
          tanjiro: -10,
          mitsuri: -10,
          zenitsu: -10,
        },
        reactions: [
          {
            speaker: "sanemi",
            text: "힘 하나는 지독하게 올랐군. 하지만 주 합동 훈련의 의미를 반쪽만 이해한 녀석이야.",
          },
          {
            speaker: "gyomei",
            text: "강해지려는 집착이 자비를 가리고 있구나… 혼자서는 결코 무잔을 이기지 못한다.",
          },
        ],
      },
      {
        id: "C",
        label: "고통스러운 바위 밀기와 대련이 두려워 꾀병을 부리며 수련장에서 몰래 이탈한다.",
        stance: "비겁한 수련 포기",
        effects: { breathing: -15, trust: -16, resolve: -16 },
        affinityEffects: {
          sanemi: -15,
          obanai: -14,
          gyomei: -14,
          rengoku: -12,
          tengen: -10,
          giyu: -10,
        },
        reactions: [
          {
            speaker: "sanemi",
            text: "하?! 지금 장난하냐?! 고통이 두려우면 당장 귀살대 제복 벗고 집구석으로 꺼져!!",
          },
          {
            speaker: "obanai",
            text: "역시 신용할 가치조차 없는 쓰레기였군. 두 번 다시 눈앞에 띄지 마라.",
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
        label: "무잔의 압도적 위압감에 무릎이 꺾여 칼을 떨어뜨리고, 그의 영생 제안 앞에서 한순간 흔들린다.",
        stance: "공포에 굴복한 동요",
        effects: { breathing: -13, trust: -15, resolve: -18 },
        affinityEffects: {
          tanjiro: -14,
          giyu: -14,
          rengoku: -13,
          gyomei: -13,
          shinobu: -11,
          sanemi: -12,
          obanai: -10,
        },
        reactions: [
          {
            speaker: "muzan",
            text: "후후… 꼴사납구나. 그 떨리는 눈빛만 봐도 귀살대의 수준이 뻔히 보이는군.",
          },
          {
            speaker: "giyu",
            text: "정신 차려! 무잔 앞에서 칼을 놓으면 그 순간 모두의 목숨이 끝난다!",
          },
        ],
      },
      {
        id: "B",
        label: "검술 호흡이 무너질 정도로 무리하게 탄지로의 앞을 몸으로 막아서며 주들이 올 때까지 버틴다.",
        stance: "자기희생적 방패막이",
        effects: { breathing: -11, trust: 13, resolve: 8 },
        affinityEffects: {
          tanjiro: 11,
          nezuko: 10,
          mitsuri: 10,
          zenitsu: 9,
          giyu: 4,
          obanai: -8,
          muichiro: -7,
        },
        reactions: [
          {
            speaker: "tanjiro",
            text: "이렇게까지 막아 줘서 고마워…! 하지만 호흡이 끊겨서 네 몸이 위험해!!",
          },
          {
            speaker: "giyu",
            text: "버틴 건 고맙다. 하지만 검사로서 칼날을 잃어서는 안 된다.",
          },
        ],
      },
      {
        id: "C",
        label: "\"유한한 생명이기에 고귀하다\"며 유혹을 베어 내고 기유·탄지로와 완벽한 물의 연계로 반격한다.",
        stance: "불굴의 인간 찬가",
        effects: { breathing: 11, trust: 11, resolve: 13 },
        affinityEffects: {
          tanjiro: 13,
          giyu: 13,
          rengoku: 10,
          gyomei: 10,
          nezuko: 9,
          shinobu: 8,
        },
        reactions: [
          {
            speaker: "muzan",
            text: "…건방진 눈빛이군. 결국 멸망할 벌레 주제에 내 발목을 잡겠다는 건가.",
          },
          {
            speaker: "giyu",
            text: "흔들리지 않았군. 지금 네 칼날에는 수주로서도 부끄럽지 않은 고요함이 있다.",
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
        label: "쓰러져 가는 동료들의 방어는 내팽개친 채, 오직 무잔을 혼자 베어 공을 세우려 단독 일섬으로 파고든다.",
        stance: "고독하고 냉혹한 일섬",
        effects: { breathing: 14, trust: -14, resolve: 2 },
        affinityEffects: {
          muichiro: 7,
          sanemi: 5,
          obanai: 5,
          tanjiro: -12,
          giyu: -10,
          zenitsu: -10,
          mitsuri: -10,
          nezuko: -10,
        },
        reactions: [
          {
            speaker: "sanemi",
            text: "제법 독종이군… 하지만 그 따위로 동료들 버리고 혼자 싸운 꼴이라니, 꼴사납다!",
          },
          {
            speaker: "tanjiro",
            text: "혼자만 살아남으려 하지 말아 줘… 함께 잡은 손이 흩어지면 아무 의미가 없어!",
          },
        ],
      },
      {
        id: "B",
        label: "무한성이 무너지는 혼란 속에서 겁에 질려 퇴로만 찾다가 대열을 무너뜨리고 칼을 떨어뜨린다.",
        stance: "최후의 전선 붕괴",
        effects: { breathing: -16, trust: -16, resolve: -16 },
        affinityEffects: {
          tanjiro: -14,
          giyu: -13,
          rengoku: -13,
          sanemi: -14,
          gyomei: -13,
          shinobu: -12,
          tengen: -11,
        },
        reactions: [
          {
            speaker: "sanemi",
            text: "빌어먹을!! 이 마지막 순간에 전선을 무너뜨리면 다 죽자는 거냐!!",
          },
          {
            speaker: "tanjiro",
            text: "안 돼…! 진형이 뚫렸어…! 제발, 조금만 더 버텨 줬어야 했는데…!",
          },
        ],
      },
      {
        id: "C",
        label: "전집중의 극치인 혁도를 피워 올리며 주들과 동기조의 호흡을 하나로 엮어 새벽의 일격을 꽂는다.",
        stance: "새벽을 여는 최강의 합동",
        effects: { breathing: 12, trust: 11, resolve: 13 },
        affinityEffects: {
          tanjiro: 12,
          giyu: 11,
          rengoku: 12,
          gyomei: 11,
          sanemi: 10,
          obanai: 10,
          shinobu: 10,
          tengen: 10,
          muichiro: 10,
          mitsuri: 10,
          zenitsu: 10,
          inosuke: 10,
          nezuko: 10,
        },
        reactions: [
          {
            speaker: "rengoku",
            text: "보아라!! 저 불타는 새벽의 빛을! 자네는 모두의 마음을 등에 짊어지고 마침내 밤을 베어 냈다!",
          },
          {
            speaker: "tanjiro",
            text: "해냈어…! 우리가 끝내 이겼어!! 찬란한 새벽이 밝아 오고 있어!!",
          },
        ],
      },
    ],
  },
];
