import { works } from "@/data/works";

export const SITE_URL = "https://mochimochi-usagi-parade.com";

const GROUP_ID = `${SITE_URL}/#group`;
const abs = (path: string) => new URL(encodeURI(path), SITE_URL).toString();

/** トップページ用の JSON-LD（schema.org）。サークル情報とディスコグラフィ */
export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "もちもちうさぎパレード",
      inLanguage: "ja",
      publisher: { "@id": GROUP_ID },
    },
    {
      "@type": "MusicGroup",
      "@id": GROUP_ID,
      name: "もちもちうさぎパレード",
      url: SITE_URL,
      description:
        "同人音楽サークル もちもちうさぎパレード。M3・ボーマス等のイベントに参加するロック系同人サークルです。",
      genre: ["ロック", "同人音楽"],
      sameAs: [
        "https://x.com/mochiusaparade",
        "https://www.instagram.com/mochimochi_usagi_parade/",
        "https://torosanshin.booth.pm/",
      ],
      album: works.map((w) => ({
        "@type": "MusicAlbum",
        name: w.title,
        image: abs(w.img),
        datePublished: w.date,
        ...(w.href && { url: w.href }),
        byArtist: { "@id": GROUP_ID },
        numTracks: w.tracks.length,
        track: {
          "@type": "ItemList",
          itemListElement: w.tracks.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "MusicRecording",
              name: t.title,
            },
          })),
        },
      })),
    },
  ],
};

/** <script type="application/ld+json"> に埋め込む文字列（< をエスケープして XSS を防ぐ） */
export const toJsonLdString = (data: object) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
