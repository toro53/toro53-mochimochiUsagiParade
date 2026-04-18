"use client";

import { useState } from "react";
import { usePlayer, Track } from "@/context/PlayerContext";

type Work = {
  title: string;
  event: string;
  price: string;
  img: string;
  href: string;
  tracks: { title: string; file: string }[];
};

const m = (album: string, file: string) => `/Music/${album}/${file}`;

const works: Work[] = [
  {
    title: "夏、嘘をついたぜ",
    event: "最新作",
    price: "—",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/7558547/1cdf3950-edfc-42fa-afa3-39fa2061752e_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/7558547",
    tracks: [
      { title: "夏、嘘をついたぜ。", file: m("summer-lies", "summer-lies.m4a") },
      { title: "神無月へ",           file: m("summer-lies", "to-kannazuki.m4a") },
    ],
  },
  {
    title: "晴天に一羽",
    event: "M3-2025春",
    price: "¥200",
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
    price: "¥200",
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
    price: "¥200",
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
    price: "¥500",
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
    price: "¥500",
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
    price: "無料",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/3826662/7bc4c6bc-d243-4b53-9293-055afce514b3_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/3826662",
    tracks: [
      { title: "憑き身に憂", file: "/Music/possessed-melancholy.m4a" },
    ],
  },
  {
    title: "空中分解する春",
    event: "M3-2022春",
    price: "¥500 / 無料DL版あり",
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
    price: "無料",
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
    price: "¥100 / 無料DL版あり",
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

function AlbumCard({ w }: { w: Work }) {
  const { play, currentTrack, isPlaying, pause, resume } = usePlayer();
  const [open, setOpen] = useState(false);

  const toTrack = (t: { title: string; file: string }): Track => ({
    title: t.title,
    albumTitle: w.title,
    file: t.file,
    jacket: w.img.startsWith("/") ? w.img : undefined,
  });

  const allTracks = w.tracks.map(toTrack);
  const isThisAlbum = currentTrack && allTracks.some((t) => t.file === currentTrack.file);

  const handleAlbumPlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (allTracks.length === 0) return;
    if (isThisAlbum) {
      isPlaying ? pause() : resume();
    } else {
      play(allTracks[0], allTracks);
    }
  };

  const handleTrackPlay = (t: Track) => {
    if (currentTrack?.file === t.file) {
      isPlaying ? pause() : resume();
    } else {
      play(t, allTracks);
    }
  };

  return (
    <div className="vintage-card" style={{ display: "flex", flexDirection: "column" }}>
      {/* jacket */}
      <div className="card-jacket"
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          position: "relative",
          background: "#1a2e38",
          cursor: allTracks.length > 0 ? "pointer" : "default",
        }}
        onClick={allTracks.length > 0 ? handleAlbumPlay : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={w.img}
          alt={w.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "sepia(0.15) saturate(0.9)",
            transition: "transform 0.4s ease, filter 0.4s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
            (e.currentTarget as HTMLImageElement).style.filter = "sepia(0) saturate(1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLImageElement).style.filter = "sepia(0.15) saturate(0.9)";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)",
            pointerEvents: "none",
          }}
        />
        {allTracks.length > 0 && (
          <div
            className="play-overlay"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isThisAlbum ? 1 : 0,
              transition: "opacity 0.2s",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                background: "rgba(0,0,0,0.55)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                color: "#fff",
              }}
            >
              {isThisAlbum && isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <rect x="2" y="1" width="4" height="12" />
                  <rect x="8" y="1" width="4" height="12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <polygon points="3,1 13,7 3,13" />
                </svg>
              )}
            </div>
          </div>
        )}
      </div>

      {/* info */}
      <div className="card-info" style={{ padding: "0.75rem 1rem 0.6rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem", minWidth: 0 }}>
        <div style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--fg-muted)" }}>
          {w.event}
        </div>
        <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--fg)", lineHeight: 1.4, margin: 0 }}>
          {w.title}
        </h3>

        {allTracks.length > 0 && (
          <>
            <button
              onClick={() => setOpen((v) => !v)}
              style={{
                marginTop: "0.5rem",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                color: "var(--fg-muted)",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <span>{open ? "▲" : "▼"}</span>
              <span>TRACKLIST</span>
            </button>

            {open && (
              <ol
                style={{
                  margin: "0.4rem 0 0",
                  padding: "0 0 0 1rem",
                  listStyle: "decimal",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.15rem",
                }}
              >
                {allTracks.map((t, i) => {
                  const active = currentTrack?.file === t.file;
                  return (
                    <li key={i}>
                      <button
                        onClick={() => handleTrackPlay(t)}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          fontSize: "0.68rem",
                          color: active ? "var(--accent)" : "var(--fg)",
                          fontWeight: active ? 700 : 400,
                          textAlign: "left",
                          lineHeight: 1.6,
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        {active && isPlaying ? (
                          <svg width="8" height="8" viewBox="0 0 14 14" fill="var(--accent)">
                            <rect x="2" y="1" width="4" height="12" />
                            <rect x="8" y="1" width="4" height="12" />
                          </svg>
                        ) : (
                          <svg width="8" height="8" viewBox="0 0 14 14" fill="currentColor" style={{ opacity: 0.4 }}>
                            <polygon points="3,1 13,7 3,13" />
                          </svg>
                        )}
                        {t.title}
                      </button>
                    </li>
                  );
                })}
              </ol>
            )}
          </>
        )}
      </div>

      {/* BOOTH link */}
      <a
        href={w.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          padding: "0.4rem 1rem",
          fontSize: "0.55rem",
          letterSpacing: "0.12em",
          color: "var(--fg-muted)",
          borderTop: "1px solid var(--border)",
          textDecoration: "none",
          textAlign: "right",
        }}
      >
        BOOTH →
      </a>
    </div>
  );
}

export default function Discography() {
  return (
    <section
      id="discography"
      style={{
        padding: "6rem 2rem",
        background: "var(--bg-dark)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <span className="section-label">Discography</span>

        <div className="disc-grid" style={{ display: "grid", gap: "1rem" }}>
          {works.map((w, i) => (
            <AlbumCard key={i} w={w} />
          ))}
        </div>
      </div>

      <style>{`
        .disc-grid {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
        .vintage-card:hover .play-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 640px) {
          .disc-grid {
            grid-template-columns: 1fr;
          }
          .vintage-card {
            flex-direction: row !important;
          }
          .card-jacket {
            width: 100px !important;
            flex-shrink: 0;
            aspect-ratio: 1 / 1;
          }
          .card-info {
            padding: 0.6rem 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
