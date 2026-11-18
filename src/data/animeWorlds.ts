import { AnimeWorld } from "./types";

import slamdunkCover from "@/assets/anime/1_slamdunk.webp";
import chukaCover from "@/assets/anime/2_chuka_ichiban.webp";
import dadadaCover from "@/assets/anime/3_dadada.webp";
import onepieceCover from "@/assets/anime/4_onepiece.webp";
import ouranCover from "@/assets/anime/5_ouran_host_club.webp";
import doremiCover from "@/assets/anime/6_doremi.webp";
import sugarsugarCover from "@/assets/anime/7_sugarsugarrune.webp";
import ghostCover from "@/assets/anime/8_ghost_stories.webp";
import kikochanCover from "@/assets/anime/9_kikochan.webp";
import mhaCover from "@/assets/anime/10_mha.webp";
import shugocharaCover from "@/assets/anime/11_shugochara.webp";
import gintamaCover from "@/assets/anime/12_gintama.webp";
import jujutsuCover from "@/assets/anime/13_jujutsu.webp";
import demonslayerCover from "@/assets/anime/14_demonslayer.webp";
import deathnoteCover from "@/assets/anime/15_deathnote.webp";
import frierenCover from "@/assets/anime/16_frieren.webp";
const yumeiroCover = `${import.meta.env.BASE_URL}yumeiro/cover.webp.webp`;
import aotCover from "@/assets/anime/18_aot.webp";
import narutoCover from "@/assets/anime/19_naruto.webp";
import bleachCover from "@/assets/anime/20_bleach.webp";

export const ANIME_WORLDS: AnimeWorld[] = [
  {
    id: "slamdunk",
    number: 1,
    title: "슬램덩크",
    goal: "당신은 매니저가 될 수 있나?",
    status: "available",
    coverImage: slamdunkCover,
    accent: "from-red-500/80 to-amber-500/80",
  },
  {
    id: "cookingmaster",
    number: 2,
    title: "요리왕 비룡",
    goal: "당신은 요리사가 될 수 있나?",
    status: "coming_soon",
    coverImage: chukaCover,
    accent: "from-violet-500/80 to-fuchsia-400/80",
  },
  {
    id: "dadada",
    number: 3,
    title: "다다다",
    goal: "당신의 육아 난이도는?",
    status: "coming_soon",
    coverImage: dadadaCover,
    accent: "from-violet-500/80 to-indigo-400/80",
  },
  {
    id: "onepiece",
    number: 4,
    title: "원피스",
    goal: "당신은 해적왕이 될 인재인가?",
    status: "coming_soon",
    coverImage: onepieceCover,
    accent: "from-amber-500/70 to-sky-500/70",
  },
  {
    id: "ouran",
    number: 5,
    title: "오란고교 호스트부",
    goal: "당신은 진정한 호스트가 될 수 있나?",
    status: "coming_soon",
    coverImage: ouranCover,
    accent: "from-rose-500/70 to-purple-400/70",
  },
  {
    id: "doremi",
    number: 6,
    title: "꼬마 마법사 레미",
    goal: "당신은 마법소녀가 될 수 있나?",
    status: "coming_soon",
    coverImage: doremiCover,
    accent: "from-fuchsia-500/70 to-pink-400/70",
  },
  {
    id: "sugarsugarrune",
    number: 7,
    title: "슈가슈가룬",
    goal: "당신은 마녀 여왕이 될 수 있을까?",
    status: "available",
    coverImage: sugarsugarCover,
    accent: "from-violet-500/70 to-fuchsia-400/70",
  },
  {
    id: "ghoststories",
    number: 8,
    title: "학교괴담",
    goal: "당신은 귀신이 나오는 학교에서 비밀을 풀 수 있을까?",
    status: "coming_soon",
    coverImage: ghostCover,
    accent: "from-purple-900/80 to-slate-800/80",
  },
  {
    id: "kikochan",
    number: 9,
    title: "미소의 세상",
    goal: "당신의 초등학교 생활 적응력은?",
    status: "coming_soon",
    coverImage: kikochanCover,
    accent: "from-emerald-500/70 to-teal-400/70",
  },
  {
    id: "mha",
    number: 10,
    title: "나의 히어로 아카데미아",
    goal: "No.1 히어로가 될 수 있을까?",
    status: "coming_soon",
    coverImage: mhaCover,
    accent: "from-lime-500/70 to-cyan-500/70",
  },
  {
    id: "shugochara",
    number: 11,
    title: "캐릭캐릭 체인지",
    goal: "나는 마음의 알이 있을까?",
    status: "coming_soon",
    coverImage: shugocharaCover,
    accent: "from-pink-400/70 to-indigo-400/70",
  },
  {
    id: "gintama",
    number: 12,
    title: "은혼",
    goal: "당신은 해결사 사무소의 의뢰를 완수할 수 있을까?",
    status: "coming_soon",
    coverImage: gintamaCover,
    accent: "from-sky-500/70 to-indigo-600/70",
  },
  {
    id: "jujutsu",
    number: 13,
    title: "주술회전",
    goal: "당신은 몇 급 주술사가 될 수 있을까?",
    status: "coming_soon",
    coverImage: jujutsuCover,
    accent: "from-indigo-600/70 to-red-600/70",
  },
  {
    id: "demonslayer",
    number: 14,
    title: "귀멸의 칼날",
    goal: "당신은 어떤 호흡의 검사일까?",
    status: "available",
    coverImage: demonslayerCover,
    accent: "from-red-600/70 to-cyan-500/70",
  },
  {
    id: "deathnote",
    number: 15,
    title: "데스노트",
    goal: "당신은 L의 추리력을 뛰어넘을 수 있을까?",
    status: "coming_soon",
    coverImage: deathnoteCover,
    accent: "from-slate-700/80 to-zinc-900/80",
  },
  {
    id: "frieren",
    number: 16,
    title: "장송의 프리렌",
    goal: "당신은 인간에 대해 알 수 있을까?",
    status: "coming_soon",
    coverImage: frierenCover,
    accent: "from-sky-400/70 to-teal-400/70",
  },
  {
    id: "yumeiro",
    number: 17,
    title: "꿈빛 파티시엘",
    goal: "당신은 파티시엘이 될 수 있을까?",
    status: "available",
    coverImage: yumeiroCover,
    accent: "from-rose-400/70 to-amber-300/70",
  },
  {
    id: "aot",
    number: 18,
    title: "진격의 거인",
    goal: "당신의 조사병단 생존 확률은?",
    status: "available",
    coverImage: aotCover,
    accent: "from-stone-700/80 to-amber-700/80",
  },
  {
    id: "naruto",
    number: 19,
    title: "나루토",
    goal: "당신은 닌자가 될 수 있을까?",
    status: "available",
    coverImage: narutoCover,
    accent: "from-orange-500/70 to-amber-400/70",
  },
  {
    id: "bleach",
    number: 20,
    title: "블리치",
    goal: "당신은 사신이 될 수 있을까?",
    status: "available",
    coverImage: bleachCover,
    accent: "from-red-700/80 to-black/80",
  },
];

export const LOCKED_ANIME_MESSAGE =
  "아직 소환의 문이 열리지 않았습니다. 다음 업데이트를 기다려 주세요!";
