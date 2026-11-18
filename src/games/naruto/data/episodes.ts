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
        label: "동료들과 사인을 맞추는 대신 발끝에 차크라를 모아 혼자 카카시의 방울만 단독으로 노린다.",
        stance: "단독 돌파 · 실력 증명",
        effects: { ninjutsu: 12, bond: -12, willOfFire: 2 },
        affinityEffects: {
          sasuke: 9,
          itachi: 8,
          kakashi: -9,
          naruto: -8,
          sakura: -8,
          minato: -6,
        },
        reactions: [
          {
            speaker: "sasuke",
            text: "움직임 자체는 날카롭군. 하지만 혼자 움직인 틈을 카카시 선생이 놓칠 리 없어.",
          },
          {
            speaker: "kakashi",
            text: "실력은 제법이지만… 이 시험의 본질을 전혀 이해하지 못했군.",
          },
        ],
      },
      {
        id: "B",
        label: "방울이 두 개뿐이라는 말에 동요해 나루토·사스케와 다투며 수풀 뒤에서 시간만 허비한다.",
        stance: "분열과 경솔한 방황",
        effects: { ninjutsu: -12, bond: -15, willOfFire: -14 },
        affinityEffects: {
          kakashi: -13,
          naruto: -12,
          sakura: -12,
          sasuke: -11,
          minato: -10,
          itachi: -9,
        },
        reactions: [
          {
            speaker: "kakashi",
            text: "……서로 의심하고 우왕좌왕할 거라면 이 시험은 애초에 불합격이다. 실망스럽군.",
          },
          {
            speaker: "naruto",
            text: "야! 네가 그렇게 흔들리면 우리 팀이 어떻게 방울을 뺏어!!",
          },
        ],
      },
      {
        id: "C",
        label: "시험의 본질이 팀워크임을 간파하고 제7반 전원의 시야와 차크라를 묶는 합동 포위를 제안한다.",
        stance: "전략적 팀워크 · 전원 합공",
        effects: { ninjutsu: 10, bond: 11, willOfFire: 11 },
        affinityEffects: {
          kakashi: 13,
          naruto: 11,
          sakura: 11,
          sasuke: 8,
          minato: 10,
          itachi: 7,
        },
        reactions: [
          {
            speaker: "sakura",
            text: "맞아요! 혼자선 절대 당해낼 수 없어요. 우리가 동시에 사각을 찌르면 분명 틈이 열릴 거예요!",
          },
          {
            speaker: "kakashi",
            text: "오호… 시작부터 눈치가 빠른 신입이 들어왔군. 좋아, 그 팀워크 어디 한 번 볼까?",
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
        label: "수면 보행 차크라를 전개해 의뢰인을 지키면서 나루토·사스케와 박자를 맞춰 마경빙정을 타격한다.",
        stance: "차크라 연대 · 공방 일체",
        effects: { ninjutsu: 10, bond: 11, willOfFire: 11 },
        affinityEffects: {
          kakashi: 12,
          naruto: 12,
          sasuke: 11,
          sakura: 9,
          minato: 10,
          itachi: 8,
        },
        reactions: [
          {
            speaker: "sasuke",
            text: "내 화둔 타이밍에 맞춰 정확히 빈틈을 찔렀군… 제법 호흡이 맞기 시작했어.",
          },
          {
            speaker: "kakashi",
            text: "의뢰인 엄호와 협공을 동시에 해내다니, 성장 속도가 놀랍군.",
          },
        ],
      },
      {
        id: "B",
        label: "동료들의 위기는 외면한 채, 안개 너머 적 본체의 차크라 파동만을 역추적해 단독 암살을 강행한다.",
        stance: "냉혹한 단독 저격",
        effects: { ninjutsu: 13, bond: -13, willOfFire: 2 },
        affinityEffects: {
          itachi: 10,
          sasuke: 8,
          naruto: -10,
          sakura: -9,
          kakashi: -7,
          minato: -8,
        },
        reactions: [
          {
            speaker: "sasuke",
            text: "냉혹하게 급소를 노린 감각은 인정하지. 하지만 뒤쪽 방어는 완전히 비워 버렸잖아.",
          },
          {
            speaker: "naruto",
            text: "어이!! 다리 위에서 우리가 쓰러질 뻔했는데 혼자만 적을 쫓으면 어떡해!!",
          },
        ],
      },
      {
        id: "C",
        label: "짙은 물안개와 살기에 압도되어 다리 난간 뒤에 몸을 숨긴 채, 전투가 끝날 때까지 나서지 않는다.",
        stance: "위축된 방관과 책임 회피",
        effects: { ninjutsu: -13, bond: -15, willOfFire: -15 },
        affinityEffects: {
          kakashi: -13,
          naruto: -13,
          sasuke: -12,
          sakura: -11,
          minato: -11,
          itachi: -8,
        },
        reactions: [
          {
            speaker: "kakashi",
            text: "……뭐 하는 거냐. 호위 임무에서 동료를 두고 숨는 닌자는 아무 쓸모가 없다.",
          },
          {
            speaker: "sasuke",
            text: "한심하군. 그 정도 각오로 무슨 닌자 노릇을 하겠다는 거지?",
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
        label: "쓰러진 나루토와 사스케로는 가망이 없다고 판단해, 두루마리만 챙겨 시험을 포기하고 홀로 도주한다.",
        stance: "동료 유기와 도주",
        effects: { ninjutsu: -12, bond: -18, willOfFire: -16 },
        affinityEffects: {
          naruto: -15,
          sakura: -15,
          sasuke: -12,
          kakashi: -14,
          minato: -14,
          itachi: -10,
        },
        reactions: [
          {
            speaker: "sakura",
            text: "어떻게… 쓰러진 동료들을 버리고 혼자 두루마리만 챙겨서 도망칠 수 있어요…?!",
          },
          {
            speaker: "naruto",
            text: "이런 녀석이랑 같은 제7반이었다니… 절대 용서 못 해!!",
          },
        ],
      },
      {
        id: "B",
        label: "사쿠라의 함정 동선과 연계해 정밀 결계와 기폭찰 진형을 구축하고 끝까지 거점을 사수한다.",
        stance: "전술 결계 · 정밀 수비",
        effects: { ninjutsu: 10, bond: 11, willOfFire: 11 },
        affinityEffects: {
          sakura: 13,
          naruto: 11,
          sasuke: 10,
          kakashi: 11,
          minato: 10,
          itachi: 8,
        },
        reactions: [
          {
            speaker: "sakura",
            text: "제 함정 동선을 단번에 읽고 보완해 주셨군요! 덕분에 모두를 완벽히 지켜냈어요!",
          },
          {
            speaker: "sasuke",
            text: "혼자 무리하지 않고 빈틈없는 진형을 짰군… 꽤 쓸만한 전술안을 지녔어.",
          },
        ],
      },
      {
        id: "C",
        label: "술법과 차크라 제어를 포기한 채, 무작정 쓰러진 동료들 앞을 맨몸으로 감싸고 몽둥이질처럼 버텨 낸다.",
        stance: "무모한 육탄 보호",
        effects: { ninjutsu: -12, bond: 12, willOfFire: 6 },
        affinityEffects: {
          naruto: 10,
          sakura: 10,
          minato: 8,
          sasuke: -8,
          itachi: -9,
          kakashi: -4,
        },
        reactions: [
          {
            speaker: "naruto",
            text: "고마워… 네가 몸으로 막아 줘서 살았어! 그래도 너무 무모해서 심장이 떨어질 뻔했다니깐!",
          },
          {
            speaker: "sasuke",
            text: "차크라도 못 다루고 몸으로만 때우면 둘 다 쓰러질 뿐이야. 어설픈 짓이군.",
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
        label: "카카시의 경고를 무시하고 정면에서 이타치의 사륜안을 직시했다가 환술에 걸려 동료들까지 위협한다.",
        stance: "경솔한 시선 노출과 패착",
        effects: { ninjutsu: -14, bond: -14, willOfFire: -15 },
        affinityEffects: {
          itachi: -12,
          kakashi: -13,
          sasuke: -11,
          sakura: -11,
          naruto: -10,
          minato: -10,
        },
        reactions: [
          {
            speaker: "kakashi",
            text: "눈을 보지 말라고 몇 번이나 경고했잖나!! 경솔한 판단으로 팀 전체가 위험해졌어!",
          },
          {
            speaker: "itachi",
            text: "경솔하군. 눈앞의 환술조차 간파하지 못한 채 덤비는 건 자멸일 뿐이다.",
          },
        ],
      },
      {
        id: "B",
        label: "동료들의 지원 신호를 무시하고 차크라를 한계까지 폭주시켜 홀로 이타치에게 단독 돌격한다.",
        stance: "고독한 차크라 폭주",
        effects: { ninjutsu: 13, bond: -12, willOfFire: 2 },
        affinityEffects: {
          sasuke: 9,
          itachi: 8,
          kakashi: -9,
          sakura: -8,
          naruto: -8,
          minato: -6,
        },
        reactions: [
          {
            speaker: "itachi",
            text: "동료를 믿지 않고 홀로 힘에만 매달리는가… 아직 자신의 그릇을 모르는군.",
          },
          {
            speaker: "kakashi",
            text: "위험했어! 동료의 지원을 끊고 단독으로 돌진하는 게 얼마나 무모한지 알겠나?",
          },
        ],
      },
      {
        id: "C",
        label: "카카시의 지시에 맞춰 시선을 발끝에 고정하고 동료들과 차크라를 교란해 환술과 사스케의 폭주를 동시에 막는다.",
        stance: "냉철한 통찰 · 환술 파훼",
        effects: { ninjutsu: 11, bond: 11, willOfFire: 11 },
        affinityEffects: {
          kakashi: 13,
          itachi: 12,
          sakura: 10,
          sasuke: 9,
          minato: 9,
          naruto: 8,
        },
        reactions: [
          {
            speaker: "kakashi",
            text: "정확한 판단이야! 시선을 내리고 발놀림과 팀 교란으로 환술을 끊어내다니, 대단한 배짱인데?",
          },
          {
            speaker: "itachi",
            text: "눈이 아닌 흐름을 읽고 동료와 호흡을 맞춘다… 흥미로운 시노비로군.",
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
        label: "술법으로 충격을 제어할 여력도 없이 두 사람의 정면 충돌 한복판으로 무작정 맨몸을 던져 울부짖는다.",
        stance: "비이성적 감정 호소",
        effects: { ninjutsu: -12, bond: 12, willOfFire: 6 },
        affinityEffects: {
          naruto: 10,
          sakura: 9,
          minato: 7,
          sasuke: -9,
          itachi: -8,
          kakashi: -5,
        },
        reactions: [
          {
            speaker: "naruto",
            text: "너까지 다치면 안 되잖아…! 그래도 네 진심만큼은 똑똑히 느꼈어!!",
          },
          {
            speaker: "sasuke",
            text: "술법 제어조차 없이 몸부터 던지다니… 어리석은 녀석.",
          },
        ],
      },
      {
        id: "B",
        label: "폭주하는 두 사람의 차크라가 치명상으로 이어지지 않도록 정밀 술법으로 충격을 분산시키며 제7반의 인연을 부른다.",
        stance: "차크라 중재 · 제7반의 맹세",
        effects: { ninjutsu: 10, bond: 11, willOfFire: 12 },
        affinityEffects: {
          naruto: 13,
          sakura: 11,
          minato: 11,
          kakashi: 10,
          sasuke: 9,
          itachi: 9,
        },
        reactions: [
          {
            speaker: "naruto",
            text: "네 목소리와 술법 덕분에 끝까지 버텼어! 우리가 있는 한 제7반은 절대 끝나지 않아!",
          },
          {
            speaker: "sasuke",
            text: "내 치도리의 위력을 깎아낼 정도로 차크라 제어를 갈고닦았나… 쉽게 무시할 순 없군.",
          },
        ],
      },
      {
        id: "C",
        label: "피차 귀찮은 다툼이라며 발길을 돌린 채 두 사람이 쓰러지든 말든 국경 바위 위에 걸터앉아 외면한다.",
        stance: "무관심한 방관",
        effects: { ninjutsu: -11, bond: -16, willOfFire: -16 },
        affinityEffects: {
          naruto: -14,
          sasuke: -12,
          sakura: -13,
          kakashi: -12,
          minato: -12,
          itachi: -9,
        },
        reactions: [
          {
            speaker: "naruto",
            text: "왜 아무것도 안 하고 등을 돌리는 거야…! 우리 동료였잖아!!",
          },
          {
            speaker: "sasuke",
            text: "…차라리 적보다 못한 방관자군. 내 눈앞에서 사라져.",
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
        label: "사쿠라의 의료 차크라 리듬에 맞춰 정밀 보조를 넣으면서 나루토·카카시와 전위 방어선까지 완벽히 연동한다.",
        stance: "정밀 의료 보조 · 공방 일체",
        effects: { ninjutsu: 11, bond: 11, willOfFire: 10 },
        affinityEffects: {
          sakura: 14,
          naruto: 11,
          kakashi: 12,
          minato: 10,
          sasuke: 8,
          itachi: 8,
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
        label: "부상자 치료소가 밀리자 당황해 차크라 공급을 끊어 버리고, 방어선 문을 닫은 채 후방으로 물러난다.",
        stance: "방어선 포기와 오판",
        effects: { ninjutsu: -13, bond: -16, willOfFire: -14 },
        affinityEffects: {
          sakura: -15,
          naruto: -13,
          kakashi: -13,
          minato: -12,
          sasuke: -9,
          itachi: -8,
        },
        reactions: [
          {
            speaker: "sakura",
            text: "지금 차크라를 끊고 뒤로 빠지면 중상자들이 전부 죽잖아요!! 대체 무슨 생각이에요?!",
          },
          {
            speaker: "kakashi",
            text: "최악의 판단이야. 전선에서 동료를 버리는 자에게 맡길 임무는 없다.",
          },
        ],
      },
      {
        id: "C",
        label: "치료소 방어를 텅 비워 둔 채 적 지휘관의 목만 따러 단독으로 적진 깊숙이 침투한다.",
        stance: "후방 무방비 · 단독 암살",
        effects: { ninjutsu: 13, bond: -12, willOfFire: 2 },
        affinityEffects: {
          itachi: 9,
          sasuke: 9,
          sakura: -11,
          naruto: -9,
          kakashi: -7,
          minato: -8,
        },
        reactions: [
          {
            speaker: "sakura",
            text: "적 지휘관은 쓰러뜨렸지만 치료소 코앞까지 적이 밀려왔잖아요! 팀을 좀 생각하세요!!",
          },
          {
            speaker: "kakashi",
            text: "지킬 대상을 위험에 빠뜨린 채 얻은 전과는 전술이라 부를 수 없어.",
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
        label: "압도적인 위협에 차크라가 역류할 정도로 흔들리며 비뢰신 표식마저 놓치고 결전장에서 주저앉는다.",
        stance: "의지 상실과 결계 붕괴",
        effects: { ninjutsu: -15, bond: -15, willOfFire: -17 },
        affinityEffects: {
          minato: -15,
          naruto: -14,
          kakashi: -14,
          sakura: -13,
          sasuke: -12,
          itachi: -12,
        },
        reactions: [
          {
            speaker: "minato",
            text: "안 됩니다…! 여기서 의지를 꺾어 버리면 마을 전체가 삼켜지고 맙니다!",
          },
          {
            speaker: "kakashi",
            text: "젠장, 마지막 순간에 진형이 무너졌어…! 정신 차려!!",
          },
        ],
      },
      {
        id: "B",
        label: "공격 술법은 전부 거둔 채 차크라 고갈을 감수하고 오직 대피 중인 주민들과 동료의 몸만 껴안고 버틴다.",
        stance: "헌신적 방어 · 공격 포기",
        effects: { ninjutsu: -12, bond: 13, willOfFire: 8 },
        affinityEffects: {
          naruto: 10,
          sakura: 11,
          minato: 9,
          sasuke: -8,
          itachi: -8,
          kakashi: -2,
        },
        reactions: [
          {
            speaker: "minato",
            text: "사람을 지키려는 따뜻한 마음은 훌륭합니다. 하지만 공격할 힘이 함께여야 적을 멈출 수 있어요.",
          },
          {
            speaker: "sakura",
            text: "모두를 감싸 줘서 고마워요… 하지만 무리가 너무 심해요!",
          },
        ],
      },
      {
        id: "C",
        label: "미나토의 비뢰신 표식과 제7반의 차크라를 완벽히 동조시켜 합동 나선환의 금빛 섬광을 쏘아 올린다.",
        stance: "금빛 섬광 · 제7반 완전 합동",
        effects: { ninjutsu: 11, bond: 11, willOfFire: 12 },
        affinityEffects: {
          minato: 14,
          naruto: 12,
          kakashi: 11,
          sakura: 11,
          sasuke: 10,
          itachi: 10,
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
