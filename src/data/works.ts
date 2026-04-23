export type Work = {
  title: string;
  event: string;
  img: string;
  href?: string;
  tracks: { title: string; file: string }[];
};

const m = (album: string, file: string) => `/Music/${album}/${file}`;

export const works: Work[] = [
  {
    title: "死灰、復燃えて",
    event: "最新作",
    img: "/Music/shikaimata/jacket.png",
    href: "https://torosanshin.booth.pm/items/8255437",
    tracks: [
      { title: "死灰、復燃えて",   file: m("shikaimata", "死灰、復燃えて.mp3") },
      { title: "さよなら妖精",     file: m("shikaimata", "さよなら妖精.mp3") },
      { title: "朝雨に傘いらず",   file: m("shikaimata", "雨とベース.m4a") },
    ],
  },
  {
    title: "夏、嘘をついたぜ",
    event: "M3-2025秋",
    img: "/Music/summer-lies/jacket.jpg",
    href: "https://torosanshin.booth.pm/items/7558547",
    tracks: [
      { title: "夏、嘘をついたぜ。", file: m("summer-lies", "summer-lies.m4a") },
      { title: "神無月へ",           file: m("summer-lies", "to-kannazuki.m4a") },
    ],
  },
  {
    title: "晴天に一羽",
    event: "M3-2025春",
    img: m("clear-sky-one-bird", "jacket.png"),
    href: "https://torosanshin.booth.pm/items/6822016",
    tracks: [
      { title: "快晴に孤独",                   file: m("clear-sky-one-bird", "clear-sky-solitude.mp3") },
      { title: "春の雨はなぜか死んでいる気がする", file: m("clear-sky-one-bird", "spring-rain-feels-like-death.mp3") },
      { title: "月夜に兎",                     file: m("clear-sky-one-bird", "rabbit-in-moonlit-night.mp3") },
    ],
  },
  {
    title: "シュレーディンガーの星",
    event: "M3-2024秋",
    img: m("schrodingers-star", "jacket.png"),
    href: "https://torosanshin.booth.pm/items/6208804",
    tracks: [
      { title: "シュレーディンガーの星",   file: m("schrodingers-star", "schrodingers-star.mp3") },
      { title: "夏はどこかへ消えてった", file: m("schrodingers-star", "summer-disappeared.mp3") },
      { title: "終わるまでは終われない？", file: m("schrodingers-star", "cant-end-until-its-over.mp3") },
    ],
  },
  {
    title: "花明かり",
    event: "M3-2024春",
    img: m("flower-light", "jacket.jpg"),
    href: "https://torosanshin.booth.pm/items/5660837",
    tracks: [
      { title: "Cadd9",              file: m("flower-light", "cadd9.mp3") },
      { title: "いつも意味のないこと。", file: m("flower-light", "always-meaningless.mp3") },
      { title: "水槽脳",             file: m("flower-light", "aquarium-brain.mp3") },
      { title: "花明かりが眩しい。",  file: m("flower-light", "flower-light-dazzles.mp3") },
    ],
  },
  {
    title: "月面鈍行",
    event: "M3-2023春",
    img: m("lunar-local-train", "jacket.png"),
    href: "https://torosanshin.booth.pm/items/4724535",
    tracks: [
      { title: "旅に出よう",           file: m("lunar-local-train", "lets-travel.mp3") },
      { title: "いつまでもまぶしいもの", file: m("lunar-local-train", "always-dazzling.mp3") },
      { title: "イカロスの隣人",       file: m("lunar-local-train", "neighbor-of-icarus.mp3") },
      { title: "月面鈍行",            file: m("lunar-local-train", "lunar-local-train.mp3") },
    ],
  },
  {
    title: "忘憂のもの",
    event: "M3-2022秋",
    img: m("forget-melancholy", "jacket.jpg"),
    href: "https://torosanshin.booth.pm/items/4267952",
    tracks: [
      { title: "Intro",               file: m("forget-melancholy", "intro.mp3") },
      { title: "ロックンロールはいつか死ぬ", file: m("forget-melancholy", "rock-n-roll-will-die-someday.mp3") },
      { title: "海の見えるところ",     file: m("forget-melancholy", "where-you-can-see-the-sea.mp3") },
      { title: "Outro",               file: m("forget-melancholy", "outro.mp3") },
    ],
  },
  {
    title: "憑き身に憂",
    event: "M3-2022秋",
    img: "/Music/possessed-melancholy/jacket.jpg",
    href: "https://torosanshin.booth.pm/items/3826662",
    tracks: [
      { title: "憑き身に憂", file: "/Music/possessed-melancholy/possessed-melancholy.m4a" },
    ],
  },
  {
    title: "空中分解する春",
    event: "M3-2022春",
    img: m("midair-disintegration", "jacket.png"),
    href: "https://torosanshin.booth.pm/items/3809571",
    tracks: [
      { title: "Intro",    file: m("midair-disintegration", "01-intro.mp3") },
      { title: "空中分解", file: m("midair-disintegration", "02-midair-disintegration.mp3") },
      { title: "夜明け",   file: m("midair-disintegration", "03-dawn.mp3") },
      { title: "Outro",   file: m("midair-disintegration", "04-outro.mp3") },
    ],
  },
  {
    title: "月見に卯",
    event: "M3-2021秋",
    img: m("moon-viewing", "jacket.jpg"),
    href: "https://torosanshin.booth.pm/items/3318343",
    tracks: [
      { title: "Intro ～勿忘月～", file: m("moon-viewing", "intro-forget-me-not-moon.mp3") },
      { title: "月見",            file: m("moon-viewing", "moon-viewing.mp3") },
      { title: "Outro ～彼女～",  file: m("moon-viewing", "outro-her.mp3") },
    ],
  },
  {
    title: "嘘憑き EP",
    event: "M3-2021春",
    img: m("usotsuki-ep", "jacket.jpg"),
    href: "https://torosanshin.booth.pm/items/2898014",
    tracks: [
      { title: "Intro",             file: m("usotsuki-ep", "intro.mp3") },
      { title: "うそつき",           file: m("usotsuki-ep", "liar.mp3") },
      { title: "代弁",              file: m("usotsuki-ep", "speaking-for.mp3") },
      { title: "真音",              file: m("usotsuki-ep", "true-sound.mp3") },
      { title: "それではみなさんさよーなら", file: m("usotsuki-ep", "goodbye-everyone.mp3") },
      { title: "Outro",             file: m("usotsuki-ep", "outro.mp3") },
    ],
  },
];
