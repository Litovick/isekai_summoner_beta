import type { Episode } from "../types";

export const EPISODES: Episode[] = [
  {
    id: 1,
    code: "EP 01",
    title: "이스트 블루, 모험의 깃발을 올려라",
    location: "후샤 마을 항구 · 이스트 블루",
    stageTheme: "east-blue",
    featuredCast: ["luffy", "zoro", "nami", "shanks"],
    lines: [
      {
        speaker: "narrator",
        text: "에메랄드빛 물결이 부서지는 이스트 블루의 항구. 10년 전 샹크스가 루피에게 밀짚모자를 맡겼던 그 바다 위에서 새로운 해적기의 항해가 막을 엽니다.",
      },
      {
        speaker: "shanks",
        text: "기억해 두렴. 사소한 도발에 칼을 뽑아 들기 전에, 네가 목숨을 걸고 지켜야 할 동료와 모험이 무엇인지 먼저 바라보는 거다.",
      },
      {
        speaker: "luffy",
        text: "시시싯! 드디어 모두 모였어! 저 수평선 너머 위대한 항로로 나갈 시간이라고! 어이, 그런데 부두 앞쪽에서 해군이랑 해적들이 길을 막고 있는데 어떡할래?!",
      },
      {
        speaker: "zoro",
        text: "앞길을 막는 녀석들이야 베어 넘기면 그만이지만… 배를 지키는 나미의 준비도 아직 끝나지 않았어. 네가 첫 지시를 내려.",
      },
      {
        speaker: "nami",
        text: "지금 바다 조류가 바뀌는 타이밍이야! 적당히 싸우느라 시간 끌면 조류를 놓친다고. 확실하게 판단해 줘!",
      },
    ],
    prompt: "이스트 블루 첫 출항 직전, 부두를 봉쇄한 적들과 조류 변화 앞에서 어떻게 돌파하시겠습니까?",
    choices: [
      {
        id: "A",
        stance: "단독 견제 · 무력 강행",
        label: "동료들의 호흡을 기다리지 않고 혼자 적의 지휘관에게 돌격해 강제로 길을 뚫는다",
        effects: { haki: 13, trust: -12, adventure: 3 },
        affinityEffects: { zoro: 4, luffy: -4, nami: -8, shanks: -10 },
        reactions: [
          {
            speaker: "zoro",
            text: "기백 하나는 제법이군. 하지만 동료들과 배의 상황도 안 보고 혼자 튀어나가는 건 만용에 가까워.",
          },
          {
            speaker: "nami",
            text: "하아… 네가 혼자 날뛰는 바람에 닻 올릴 타이밍이 어긋났잖아! 팀워크 좀 맞추자고!",
          },
        ],
      },
      {
        id: "B",
        stance: "실책 · 주저와 후퇴",
        label: "적의 수에 압도되어 깃발을 내리고 다음 날까지 항구 구석에 배를 숨긴다",
        effects: { haki: -13, trust: -13, adventure: -12 },
        affinityEffects: { luffy: -12, zoro: -12, nami: -10, shanks: -14 },
        reactions: [
          {
            speaker: "luffy",
            text: "에에?! 싸워 보지도 않고 숨는다고?! 그런 겁쟁이 같은 항해는 재미없어!!",
          },
          {
            speaker: "shanks",
            text: "첫 파도 앞에서부터 겁에 질려 눈을 돌린다면… 저 넓은 바다의 패자가 될 꿈은 아직 너무 이르구나.",
          },
        ],
      },
      {
        id: "C",
        stance: "최선 · 샹크스의 가르침과 일제 출항",
        label: "나미의 조류 신호에 맞춰 루피·조로와 포위망을 한 번에 돌파하고 깃발을 펼친다",
        effects: { haki: 11, trust: 11, adventure: 11 },
        affinityEffects: { luffy: 12, zoro: 10, nami: 10, shanks: 14 },
        reactions: [
          {
            speaker: "luffy",
            text: "오오오!! 완벽한 호흡이야!! 자, 다들 출발이다!! 해적왕이 될 우리 항해가 시작된다!!",
          },
          {
            speaker: "shanks",
            text: "하하하! 저 눈빛과 동료들을 묶어 세우는 배짱… 정말이지 좋은 바람이 불어오고 있군!",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    code: "EP 02",
    title: "위대한 항로 돌입! 폭풍우와 기록지침",
    location: "위대한 항로 초입 · 거친 폭풍 해역",
    stageTheme: "grand-line-storm",
    featuredCast: ["nami", "sanji", "zoro", "luffy"],
    lines: [
      {
        speaker: "narrator",
        text: "리버스 마운틴을 넘어 위대한 항로에 들어서자마자, 하늘을 찢는 번개와 검은 폭풍우가 사방에서 고잉 메리호를 덮칩니다.",
      },
      {
        speaker: "nami",
        text: "나침반이 빙글빙글 돌고 있어!! 위대한 항로의 기상은 상식 밖이야! 갑판 위 물건들을 묶고 돛 각도를 바꿔야 해!",
      },
      {
        speaker: "sanji",
        text: "어이, 조로! 멍 때리지 말고 밧줄 당겨! 나미 씨가 위험하잖아!!",
      },
      {
        speaker: "zoro",
        text: "시끄러워, 연애 바보 요리사! 파도보다 거대한 암초가 정면에 버티고 있어. 베어 넘길 각오도 해 둬야 한다고!",
      },
      {
        speaker: "luffy",
        text: "우와아아, 파도가 산만해! 재밌긴 한데 배가 부서지면 큰일이야! 나미 지시대로 갈까, 아니면 정면으로 들이받을까?!",
      },
    ],
    prompt: "번개가 내리치는 위대한 항로의 폭풍 해역, 나미의 항해 지시와 거대 암초 앞에서 어떻게 대처하시겠습니까?",
    choices: [
      {
        id: "A",
        stance: "최선 · 항해술 신뢰와 합동 방어",
        label: "나미의 기상 판독을 전적으로 신뢰해 돛을 조율하고, 루피·조로·상디와 흩어진 잔해를 튕겨 낸다",
        effects: { haki: 11, trust: 10, adventure: 11 },
        affinityEffects: { nami: 14, sanji: 11, luffy: 10, zoro: 8 },
        reactions: [
          {
            speaker: "nami",
            text: "좋아, 딱 맞았어!! 모두가 내 사인을 믿고 움직여 준 덕분에 폭풍의 눈을 빠져나왔어!",
          },
          {
            speaker: "sanji",
            text: "역시 나미 씨의 항해술과 우리들의 호흡은 일품이지! 따뜻한 홍차라도 한 잔 내올까!",
          },
        ],
      },
      {
        id: "B",
        stance: "트레이드오프 · 무모한 단독 정면 돌파",
        label: "나미의 선회 경고를 무시하고 암초 정중앙을 일격에 박살 내어 억지로 직진한다",
        effects: { haki: 13, trust: -12, adventure: 2 },
        affinityEffects: { zoro: 5, nami: -10, sanji: -6, luffy: -4 },
        reactions: [
          {
            speaker: "zoro",
            text: "암초를 부순 힘은 인정하지. 하지만 나미의 경고를 씹고 배에 금 가게 만든 건 어리석었어.",
          },
          {
            speaker: "nami",
            text: "바보냐고!! 내가 왼쪽 해류 타자고 소리쳤잖아! 선체 수리비는 네 몫에서 뺄 거야!!",
          },
        ],
      },
      {
        id: "C",
        stance: "실책 · 패닉과 키 포기",
        label: "거친 파도에 당황해 키를 놓아 버리고 선실 아래로 대피해 버린다",
        effects: { haki: -14, trust: -12, adventure: -13 },
        affinityEffects: { nami: -14, sanji: -12, luffy: -10, zoro: -10 },
        reactions: [
          {
            speaker: "nami",
            text: "지금 키를 놓으면 어떡해?! 모두가 죽을 뻔했잖아!! 항해를 대체 뭘로 아는 거야?!",
          },
          {
            speaker: "sanji",
            text: "이 얼간이가!! 나미 씨와 동료들이 갑판에서 사투를 벌이는데 혼자 숨어 있다니 제정신이냐!!",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    code: "EP 03",
    title: "드럼 왕국, 눈보라 속의 분홍빛 벚꽃",
    location: "드럼 로키 설산 · 겨울 섬",
    stageTheme: "drum-sakura",
    featuredCast: ["chopper", "luffy", "nami", "sanji"],
    lines: [
      {
        speaker: "narrator",
        text: "눈보라가 몰아치는 겨울 섬 드럼 왕국. 고열로 쓰러진 나미를 업고 험준한 설산을 오르는 사투 끝에, 쵸파의 진료소에 도착했지만 폭군 와포루의 포격이 설산을 뒤흔듭니다.",
      },
      {
        speaker: "chopper",
        text: "안 돼… 닥터 히루루크의 해적기는 절대로 부러지지 않아! 하지만 나미의 열이 아직 안 내렸단 말이야… 나, 어떻게 해야 하지?!",
      },
      {
        speaker: "luffy",
        text: "울지 마, 순록! 저 깃발은 절대 안 부러지게 내가 막을 테니까! 자, 어서 나미를 치료해 줘!",
      },
      {
        speaker: "sanji",
        text: "눈사태까지 겹쳐서 여기가 무너지기 직전이야. 적을 막는 것과 환자 보호, 두 가지를 동시에 해내야 해.",
      },
      {
        speaker: "nami",
        text: "콜록… 미안해 다들… 나 때문에 이렇게까지 무리하게 만들어서…",
      },
    ],
    prompt: "설산의 포격과 나미의 위독함, 그리고 닥터 히루루크의 해적기가 흔들리는 순간 어떤 선택을 내리시겠습니까?",
    choices: [
      {
        id: "A",
        stance: "실책 · 약품 방치 및 무리한 도주",
        label: "와포루의 대포 소리에 겁먹어 나미의 치료를 중단시키고 눈보라 속으로 무작정 도망친다",
        effects: { haki: -13, trust: -13, adventure: -14 },
        affinityEffects: { chopper: -14, luffy: -10, nami: -12, sanji: -12 },
        reactions: [
          {
            speaker: "chopper",
            text: "안 돼!! 지금 나미를 눈보라 밖으로 데리고 나가면 생명이 위험하단 말이야!! 왜 내 말을 안 들어주는 거야!!",
          },
          {
            speaker: "luffy",
            text: "동료를 낫게 해 줄 의사 앞까지 와서 도망치다니… 난 절대 동료들을 포기하지 않아!!",
          },
        ],
      },
      {
        id: "B",
        stance: "최선 · 깃발 수호와 동료 치료 공조",
        label: "쵸파에게 나미의 치료를 전적으로 맡기고, 루피·상디와 성벽 앞 포격을 몸으로 막아 낸다",
        effects: { haki: 11, trust: 11, adventure: 10 },
        affinityEffects: { chopper: 14, nami: 12, luffy: 10, sanji: 10 },
        reactions: [
          {
            speaker: "chopper",
            text: "고마워…!! 모두가 해적기와 나미를 지켜 준 덕분에 완벽하게 치료했어! 나도 너희랑 같이 바다로 나갈래!!",
          },
          {
            speaker: "luffy",
            text: "시시싯! 쵸파, 환영한다! 하늘에 피어난 저 분홍빛 벚꽃, 진짜 끝내주네!",
          },
        ],
      },
      {
        id: "C",
        stance: "트레이드오프 · 환자 대피 우선 수비",
        label: "반격을 포기하고 성채 지하에 몸을 웅크린 채 나미와 쵸파만을 감싸 안고 버틴다",
        effects: { haki: -12, trust: 12, adventure: 6 },
        affinityEffects: { chopper: 8, nami: 6, sanji: 4, luffy: -6 },
        reactions: [
          {
            speaker: "chopper",
            text: "나미와 나를 끝까지 감싸 줘서 정말 고마워… 하지만 밖에서 싸우던 루피가 혼자 너무 많이 다쳤어…",
          },
          {
            speaker: "luffy",
            text: "콜록… 다들 무사해서 다행이지만, 적의 대장까지 우리 손으로 꺾어야 끝나는 거라고!",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    code: "EP 04",
    title: "알라바스타 사막, 흑족의 불꽃과 크로커다일",
    location: "알라바스타 사막 · 유바와 아루바나 사이",
    stageTheme: "alabasta-flame",
    featuredCast: ["sanji", "luffy", "zoro"],
    lines: [
      {
        speaker: "narrator",
        text: "타오르는 모래 폭풍이 휘몰아치는 알라바스타 사막. 반란군과 왕국군의 충돌 속에 칠무해 크로커다일의 함정이 일당을 에워싼 순간, 강렬한 화염을 두른 발차기가 모래바람을 가릅니다.",
      },
      {
        speaker: "sanji",
        text: "후우… 요리사의 두 손은 소중한 요리를 위해 아껴 두는 법이지. 바로크 워크스의 함정 따위, 이 불타는 디아블 잠브로 깔끔하게 태워 치워 주마!",
      },
      {
        speaker: "luffy",
        text: "우와아, 상디!! 발에서 불꽃이 활활 타오르잖아! 우리 지금 크로커다일 녀석을 날려 버리러 가는 길인데, 완전 든든하네!!",
      },
      {
        speaker: "zoro",
        text: "치장할 시간 있으면 앞이나 봐, 요리사. 바로크 워크스의 간부들이 양쪽 모래 언덕에서 포위를 좁혀 오고 있다. 정면 돌파냐, 전선 분산이냐—결단해라.",
      },
      {
        speaker: "sanji",
        text: "모래 폭풍 때문에 시야도 엉망이야. 괜히 흩어졌다간 전멸할 수 있으니 내 화염 발차기로 길을 트는 타이밍에 맞춰 작전다운 작전을 세워야 해.",
      },
    ],
    prompt: "흑족 상디의 불꽃 발차기로 돌파구를 연 사막의 포위망, 바로크 워크스 대부대를 어떻게 돌파하시겠습니까?",
    choices: [
      {
        id: "A",
        stance: "실책 · 전선 붕괴 및 우왕좌왕",
        label: "상디의 엄호를 외면한 채 사막 한복판에서 각자도생으로 도주하라고 지시한다",
        effects: { haki: -13, trust: -14, adventure: -14 },
        affinityEffects: { sanji: -14, luffy: -12, zoro: -12 },
        reactions: [
          {
            speaker: "sanji",
            text: "어이, 잠깐! 등을 맡기고 싸우는 동료들한테 도망치라니… 그딴 비겁한 지시는 밀짚모자 일당에 어울리지 않아!",
          },
          {
            speaker: "zoro",
            text: "모래 폭풍 속에서 흩어지면 개죽음뿐이다. 최악의 지휘군!",
          },
        ],
      },
      {
        id: "B",
        stance: "트레이드오프 · 화력 독주 돌파",
        label: "동료들의 후방 합류를 기다리지 않고 상디의 불꽃 발차기와 앞선 적진만 돌파하며 단독 진격한다",
        effects: { haki: 13, trust: -12, adventure: 2 },
        affinityEffects: { sanji: 4, zoro: 4, luffy: -8 },
        reactions: [
          {
            speaker: "sanji",
            text: "기세는 나쁘지 않았지만, 루피와 뒤쪽 동료들이 모래 구덩이에 갇힐 뻔했잖아. 등 뒤도 좀 챙기라고.",
          },
          {
            speaker: "zoro",
            text: "자기 혼자 멋있는 척 적진에 뛰어들면 뒤에 남은 동료들은 어떡하라는 거냐?! 호흡을 맞추라고!",
          },
        ],
      },
      {
        id: "C",
        stance: "최선 · 흑족의 불꽃과 일당의 완벽한 협공",
        label: "상디의 디아블 잠브로 시야를 확보하고, 루피·조로와 포위망의 핵심 진영을 일시에 붕괴시킨다",
        effects: { haki: 11, trust: 11, adventure: 11 },
        affinityEffects: { sanji: 14, luffy: 12, zoro: 10 },
        reactions: [
          {
            speaker: "sanji",
            text: "후우… 완벽한 타이밍이군! 최고의 재료가 모여 일품 요리가 완성되는 것처럼, 우리 호흡도 제법 쓸 만한데?",
          },
          {
            speaker: "luffy",
            text: "상디랑 같이 싸우니까 진짜 든든해!! 자, 이제 크로커다일이 기다리는 아루바나로 돌격이다!!",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    code: "EP 05",
    title: "하늘섬 스카이피아, 황금종을 울려라",
    location: "어퍼 야드 · 하늘섬 1만 미터 상공",
    stageTheme: "skypiea-bell",
    featuredCast: ["luffy", "zoro", "nami", "chopper"],
    lines: [
      {
        speaker: "narrator",
        text: "녹업 스트림을 타고 솟아오른 구름바다 1만 미터 위 하늘섬. 스스로를 신이라 부르는 에넬의 뇌격이 어퍼 야드를 강타합니다.",
      },
      {
        speaker: "luffy",
        text: "어이, 하늘 아래 있는 아저씨들에게도 들리게 저 샹도라의 황금종을 반드시 울려야 해! 400년 동안 기다렸다고 했잖아!!",
      },
      {
        speaker: "nami",
        text: "구름이 뇌운으로 변하고 있어! 거대 방주 맥심이 떨어지기 전에 거대 콩줄기를 타고 올라가야 한다고!",
      },
      {
        speaker: "chopper",
        text: "으아앙, 하늘에서 떨어지는 번개가 너무 무서워! 다들 다치지 않게 조심해야 해…!",
      },
      {
        speaker: "zoro",
        text: "신이고 나발이고 상관없다. 황금종 앞까지 길을 여는 놈이 이 하늘의 주인이다.",
      },
    ],
    prompt: "에넬의 뇌격이 쏟아지는 1만 미터 상공의 하늘섬, 황금종과 동료들의 안전 앞에서 어떤 판단을 내리시겠습니까?",
    choices: [
      {
        id: "A",
        stance: "트레이드오프 · 방어 위주 대피 유도",
        label: "황금종 등반을 미루고 쵸파와 나미의 안전부터 챙기며 뇌격이 멈추기를 기다린다",
        effects: { haki: -12, trust: 12, adventure: 6 },
        affinityEffects: { chopper: 8, nami: 6, luffy: -4, zoro: -8 },
        reactions: [
          {
            speaker: "chopper",
            text: "나랑 나미를 지켜 줘서 고마워… 하지만 이대로 기다리면 섬 전체가 뇌운에 사라져 버릴지도 몰라!",
          },
          {
            speaker: "zoro",
            text: "방어만 해서는 신이라 자칭하는 놈의 번개를 끊을 수 없다. 기회를 놓쳤군.",
          },
        ],
      },
      {
        id: "B",
        stance: "최선 · 하늘을 울리는 모험의 일격",
        label: "나미의 웨이버로 뇌운 틈새를 가르고, 조로·쵸파와 콩줄기를 베어 루피를 황금종까지 올려 보낸다",
        effects: { haki: 10, trust: 11, adventure: 12 },
        affinityEffects: { luffy: 12, nami: 12, zoro: 10, chopper: 12 },
        reactions: [
          {
            speaker: "luffy",
            text: "들리냐아아아!! 400년 만의 황금종 소리!! 우리가 정말 하늘섬까지 올라왔다고!!",
          },
          {
            speaker: "nami",
            text: "구름바다가 황금빛으로 갈라지고 있어…! 너와 함께라면 정말 어느 바다 끝까지라도 갈 수 있을 것 같아!",
          },
        ],
      },
      {
        id: "C",
        stance: "실책 · 황금 보물 욕심 및 대열 이탈",
        label: "동료들과 황금종을 외면한 채 폐허 속 금은보화를 챙기느라 뇌격 지대에 고립된다",
        effects: { haki: -14, trust: -13, adventure: -15 },
        affinityEffects: { luffy: -12, nami: -12, zoro: -12, chopper: -14 },
        reactions: [
          {
            speaker: "nami",
            text: "아무리 보물이 좋아도 그렇지, 지금 목숨이 오가는 판에 정신이 나갔어?! 당장 정신 차려!!",
          },
          {
            speaker: "chopper",
            text: "싫어… 번개가 바로 옆에 떨어지고 있단 말이야!! 혼자 보물이나 챙기다 다같이 죽게 생겼어…!",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    code: "EP 06",
    title: "불타는 해군 포위선, 흑족의 엄호와 패왕의 등장",
    location: "해군 요새 결전장 · 불타는 포위 광장",
    stageTheme: "marineford-war",
    featuredCast: ["sanji", "luffy", "shanks"],
    lines: [
      {
        speaker: "narrator",
        text: "해군 대장들의 대함대가 바다를 에워싼 절체절명의 결전장. 붉은 용암과 화염이 뒤엉킨 광장에서 한계까지 지친 루피 앞을 상디가 불타는 발차기로 가로막아 섭니다.",
      },
      {
        speaker: "sanji",
        text: "물러서, 루피! 네가 쓰러지면 이 배의 꿈도 끝이야! 여긴 내가 디아블 잠브로 퇴로를 뚫어 놓을 테니, 동료들 곁으로 돌아갈 기회만 놓치지 마!",
      },
      {
        speaker: "luffy",
        text: "시끄러워, 상디!! 네가 없으면 난 해적왕이 못 된다고!! 무슨 일이 있어도 다 같이 살아서 이 포위망을 뚫고 돌아갈 거야!!",
      },
      {
        speaker: "shanks",
        text: "목숨을 깎는 절규와 패기가 전장을 덮고 있군. 불필요한 희생을 멈추고 소중한 동료들을 살려 낼 단 한 번의 결단이 필요한 순간이다.",
      },
    ],
    prompt: "불바다가 된 해군 포위 광장, 아카이누의 마그마 공세와 사황 샹크스의 중재 앞에서 어떻게 움직이시겠습니까?",
    choices: [
      {
        id: "A",
        stance: "최선 · 동료 사수와 명분 있는 휴전 돌파",
        label: "견문색 패기로 마그마 궤적을 읽어 상디·루피의 퇴로를 사수하고, 샹크스의 정전 선언에 맞춰 완벽히 탈출한다",
        effects: { haki: 11, trust: 11, adventure: 11 },
        affinityEffects: { sanji: 14, luffy: 12, shanks: 14 },
        reactions: [
          {
            speaker: "sanji",
            text: "살아남았어…! 네가 끝까지 물러서지 않고 나와 루피의 등을 잡아 준 덕분이다! 배로 돌아가면 특제 만찬을 대접해 주지!",
          },
          {
            speaker: "shanks",
            text: "훌륭한 패기와 냉철한 판단이다. 수많은 목숨을 헛되이 잃지 않고 새 시대의 불씨를 온전히 지켜 냈군!",
          },
        ],
      },
      {
        id: "B",
        stance: "실책 · 공포로 인한 전선 이탈",
        label: "해군 대장들의 위압감에 눌려 상디와 루피가 포위된 광장을 뒤로한 채 함선으로 후퇴한다",
        effects: { haki: -13, trust: -12, adventure: -14 },
        affinityEffects: { sanji: -14, luffy: -12, shanks: -14 },
        reactions: [
          {
            speaker: "luffy",
            text: "거짓말이지…?! 상디가 목숨 걸고 길을 막고 있는데 혼자 도망친다고?! 난 절대 용서 못 해!!",
          },
          {
            speaker: "shanks",
            text: "가장 절박한 순간에 동료를 등진다면, 그 어떤 힘도 모험도 결국 아무런 의미가 남지 않아.",
          },
        ],
      },
      {
        id: "C",
        stance: "트레이드오프 · 무모한 복수 폭주",
        label: "샹크스의 정전 선언마저 거부하고 해군 진영 한가운데로 뛰어들어 무차별 패기를 난사한다",
        effects: { haki: 13, trust: -12, adventure: 1 },
        affinityEffects: { sanji: -6, luffy: -8, shanks: -8 },
        reactions: [
          {
            speaker: "shanks",
            text: "패기는 거세지만 앞뒤를 가리지 않는 분노는 결국 네 곁의 동료들마저 불태우고 만다!",
          },
          {
            speaker: "sanji",
            text: "그만해! 겨우 열어 준 퇴로까지 닫혀 버리잖아! 분노에 눈이 멀어선 아무도 못 지킨다고!",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    code: "EP 07",
    title: "신세계의 여명, 해적왕의 깃발 아래",
    location: "신세계 마지막 해역 · 새벽의 수평선",
    stageTheme: "new-world-dawn",
    featuredCast: ["luffy", "zoro", "nami", "sanji", "chopper", "shanks"],
    lines: [
      {
        speaker: "narrator",
        text: "마침내 신세계의 거대한 소용돌이와 사황 함대의 마지막 관문 앞. 여명이 붉게 물드는 바다 위에 루피, 조로, 나미, 상디, 쵸파, 그리고 사황 샹크스까지 한자리에 섰습니다.",
      },
      {
        speaker: "shanks",
        text: "여기까지 잘 걸어왔구나. 이제 저 너머는 어떤 바다보다 가혹하지만, 동시에 가장 자유로운 세계다. 네 각오를 보여 줘.",
      },
      {
        speaker: "zoro",
        text: "검에 맹세한 날부터 우린 단 한 번도 뒤돌아본 적 없다. 마지막 파도도 두 동강 내주지.",
      },
      {
        speaker: "nami",
        text: "신세계 해도는 지금부터 우리가 그려 나가는 거야! 키도 나침반도 완벽해!",
      },
      {
        speaker: "sanji",
        text: "올 블루도, 각자의 꿈도 저 너머에 있다. 최고의 동료들과 함께라면 이 바다에 영원히 남을 만찬을 열 수 있지!",
      },
      {
        speaker: "chopper",
        text: "무섭지 않아! 이제 난 누구의 상처도 고칠 수 있는 진짜 해적단 동료니까!!",
      },
      {
        speaker: "luffy",
        text: "가자!! 해적왕이 되는 그날까지—모두 함께 저 여명의 바다를 뚫고 나가는 거다!!",
      },
    ],
    prompt: "신세계 최후의 파도와 여섯 명의 기대가 쏠린 순간, 당신이 내릴 마지막 항해의 결단은 무엇입니까?",
    choices: [
      {
        id: "A",
        stance: "실책 · 꿈의 포기와 항해 중단",
        label: "신세계의 위압감에 무릎을 꿇고 깃발을 내린 채 왔던 항로로 되돌아가자고 외친다",
        effects: { haki: -14, trust: -15, adventure: -15 },
        affinityEffects: {
          luffy: -12,
          zoro: -12,
          nami: -12,
          sanji: -12,
          chopper: -12,
          shanks: -12,
        },
        reactions: [
          {
            speaker: "luffy",
            text: "뭐…?! 여기서 돌아간다고?! 꿈도 동료도 전부 포기하겠다는 거야?! 그럴 바엔 혼자 내려!!",
          },
          {
            speaker: "nami",
            text: "여태껏 목숨 걸고 여기까지 항해한 게 전부 물거품이 되잖아…! 정말 최악이야!!",
          },
        ],
      },
      {
        id: "B",
        stance: "최선 · 패기와 신의, 모험이 하나 된 대돌파",
        label: "모두의 역할을 하나로 묶어 패왕의 파동을 두르고, 여명의 신세계를 향해 전속력으로 돌진한다",
        effects: { haki: 12, trust: 12, adventure: 12 },
        affinityEffects: {
          luffy: 12,
          zoro: 12,
          nami: 12,
          sanji: 12,
          chopper: 12,
          shanks: 12,
        },
        reactions: [
          {
            speaker: "luffy",
            text: "시시싯!! 바로 이거야!! 다들 꽉 잡아!! 새로운 시대가 우리 앞에 열리고 있다고!!",
          },
          {
            speaker: "shanks",
            text: "멋진 광경이군… 너희라면 분명 세계의 끝에 있는 보물에 닿을 수 있을 거다!",
          },
        ],
      },
      {
        id: "C",
        stance: "트레이드오프 · 소극적 우회 항해",
        label: "정면 대결을 피하고 안전한 외곽 해류로 우회해 배와 동료들의 소모만 최소화한다",
        effects: { haki: -12, trust: 12, adventure: 6 },
        affinityEffects: { nami: 6, chopper: 6, sanji: 4, zoro: -8, shanks: -6 },
        reactions: [
          {
            speaker: "nami",
            text: "배도 선원들도 무사히 건너긴 했지만… 가슴이 두근거리는 정면 승부를 한 번쯤은 보고 싶었는걸.",
          },
          {
            speaker: "zoro",
            text: "칼을 뽑을 자리에서 돌아가는 법만 택하다간 정상의 자리엔 끝내 서지 못할 거다.",
          },
        ],
      },
    ],
  },
];
