"use client";

import { useState, useEffect } from "react";
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

// ─── Modal ────────────────────────────────────────────────────────────────────

function AlbumModal({ w, onClose }: { w: Work; onClose: () => void }) {
  const { play, currentTrack, isPlaying, pause, resume } = usePlayer();

  const toTrack = (t: { title: string; file: string }): Track => ({
    title: t.title,
    albumTitle: w.title,
    file: t.file,
    jacket: w.img.startsWith("/") ? w.img : undefined,
  });

  const allTracks = w.tracks.map(toTrack);
  const isThisAlbum = currentTrack && allTracks.some((t) => t.file === currentTrack.file);

  const handleAlbumPlay = () => {
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="disc-modal-overlay" onClick={onClose}>
      <div className="disc-modal-inner" onClick={(e) => e.stopPropagation()}>

        {/* ── 左: ジャケット ── */}
        <div className="disc-modal-jacket">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={w.img} alt={w.title} />
        </div>

        {/* ── 右: 情報 ── */}
        <div className="disc-modal-info">

          {/* 閉じるボタン */}
          <button className="disc-modal-close" onClick={onClose} aria-label="閉じる">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>

          {/* メタ情報 */}
          <div className="disc-modal-meta">
            <span className="disc-modal-event">{w.event}</span>
            <h2 className="disc-modal-title">{w.title}</h2>
            <p className="disc-modal-price">{w.price}</p>
          </div>

          {/* トラックリスト */}
          {allTracks.length > 0 && (
            <div className="disc-modal-tracks">
              <div className="disc-modal-track-label">Tracklist</div>
              <ol>
                {allTracks.map((t, i) => {
                  const active = currentTrack?.file === t.file;
                  return (
                    <li key={i} className={active ? "active" : ""}>
                      <button onClick={() => handleTrackPlay(t)}>
                        <span className="track-num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="track-title">{t.title}</span>
                        <span className="track-icon">
                          {active && isPlaying ? (
                            <svg width="8" height="8" viewBox="0 0 14 14" fill="currentColor">
                              <rect x="2" y="1" width="4" height="12" />
                              <rect x="8" y="1" width="4" height="12" />
                            </svg>
                          ) : (
                            <svg width="8" height="8" viewBox="0 0 14 14" fill="currentColor">
                              <polygon points="3,1 13,7 3,13" />
                            </svg>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* アクション */}
          <div className="disc-modal-actions">
            {allTracks.length > 0 && (
              <button className="disc-modal-play-btn" onClick={handleAlbumPlay}>
                {isThisAlbum && isPlaying ? (
                  <svg width="9" height="9" viewBox="0 0 14 14" fill="currentColor">
                    <rect x="2" y="1" width="4" height="12" />
                    <rect x="8" y="1" width="4" height="12" />
                  </svg>
                ) : (
                  <svg width="9" height="9" viewBox="0 0 14 14" fill="currentColor">
                    <polygon points="3,1 13,7 3,13" />
                  </svg>
                )}
                {isThisAlbum && isPlaying ? "Pause" : "Play All"}
              </button>
            )}
            <a
              className="disc-modal-booth-link"
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              BOOTH →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function AlbumCard({ w }: { w: Work }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="vintage-card"
        style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`${w.title} の詳細を見る`}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setModalOpen(true); }}
      >
        {/* jacket */}
        <div
          className="card-jacket"
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            position: "relative",
            background: "#1a2e38",
            flexShrink: 0,
          }}
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
          {/* hover overlay */}
          <div
            className="card-hover-overlay"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.35)",
              opacity: 0,
              transition: "opacity 0.2s",
              pointerEvents: "none",
            }}
          >
            <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#fff" }}>DETAIL</span>
          </div>
        </div>

        {/* info */}
        <div
          className="card-info"
          style={{ padding: "0.75rem 1rem 0.85rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.2rem", minWidth: 0 }}
        >
          <div style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--fg-muted)" }}>
            {w.event}
          </div>
          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--fg)", lineHeight: 1.4, margin: 0 }}>
            {w.title}
          </h3>
        </div>
      </div>

      {modalOpen && <AlbumModal w={w} onClose={() => setModalOpen(false)} />}
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Discography() {
  return (
    <section
      id="discography"
      style={{
        padding: "6rem 2rem",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <style>{`
        /* ── グリッド ── */
        .disc-grid {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        }
        .vintage-card:hover .card-hover-overlay {
          opacity: 1 !important;
        }

        /* ── モーダル オーバーレイ ── */
        .disc-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(10, 18, 22, 0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          animation: discFadeIn 0.2s ease;
        }
        @keyframes discFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── モーダル本体 ── */
        .disc-modal-inner {
          display: grid;
          grid-template-columns: 280px 1fr;
          width: 100%;
          max-width: 720px;
          max-height: 88vh;
          background: var(--bg-dark);
          border: 1px solid var(--border);
          animation: discScaleIn 0.22s cubic-bezier(0.22,1,0.36,1);
          overflow: hidden;
        }
        @keyframes discScaleIn {
          from { transform: translateY(12px) scale(0.97); opacity: 0; }
          to   { transform: translateY(0)    scale(1);    opacity: 1; }
        }

        /* ── ジャケット ── */
        .disc-modal-jacket {
          position: relative;
          overflow: hidden;
          background: #0d1a20;
          aspect-ratio: 1 / 1;
          align-self: start;
        }
        .disc-modal-jacket img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          filter: sepia(0.08) saturate(0.95);
        }
        .disc-modal-jacket::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            transparent 60%,
            rgba(22, 32, 40, 0.55) 100%
          );
          pointer-events: none;
        }

        /* ── 情報パネル ── */
        .disc-modal-info {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 1.75rem 1.75rem 1.5rem;
          overflow-y: auto;
          gap: 0;
        }

        /* 閉じるボタン */
        .disc-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--fg-muted);
          cursor: pointer;
          padding: 0.3rem;
          line-height: 0;
          transition: color 0.15s;
        }
        .disc-modal-close:hover { color: var(--fg); }

        /* メタ情報 */
        .disc-modal-meta {
          margin-bottom: 1.4rem;
          padding-right: 1.5rem; /* close button との重なり防止 */
        }
        .disc-modal-event {
          display: inline-block;
          font-size: 0.52rem;
          letter-spacing: 0.2em;
          color: var(--accent-light);
          border: 1px solid var(--accent-light);
          padding: 0.12rem 0.5rem;
          margin-bottom: 0.65rem;
          opacity: 0.75;
        }
        .disc-modal-title {
          font-size: clamp(1.05rem, 2.8vw, 1.4rem);
          font-weight: 700;
          color: var(--fg);
          line-height: 1.35;
          margin: 0 0 0.4rem;
          letter-spacing: 0.04em;
        }
        .disc-modal-price {
          font-size: 0.62rem;
          color: var(--fg-muted);
          letter-spacing: 0.08em;
          margin: 0;
        }

        /* トラックリスト */
        .disc-modal-tracks {
          border-top: 1px solid var(--border);
          padding-top: 1rem;
          margin-bottom: 1.25rem;
          flex: 1;
        }
        .disc-modal-track-label {
          font-size: 0.48rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--fg-muted);
          margin-bottom: 0.55rem;
          opacity: 0.7;
        }
        .disc-modal-tracks ol {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        .disc-modal-tracks li button {
          width: 100%;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.42rem 0.5rem;
          cursor: pointer;
          text-align: left;
          transition: background 0.12s;
          border-radius: 2px;
        }
        .disc-modal-tracks li button:hover {
          background: rgba(255,255,255,0.04);
        }
        .disc-modal-tracks li.active button {
          background: rgba(58,170,196,0.08);
        }
        .track-num {
          font-size: 0.52rem;
          letter-spacing: 0.05em;
          color: var(--fg-muted);
          font-variant-numeric: tabular-nums;
          flex-shrink: 0;
          width: 1.4rem;
        }
        .disc-modal-tracks li.active .track-num {
          color: var(--accent);
        }
        .track-title {
          font-size: 0.75rem;
          color: var(--fg);
          flex: 1;
          line-height: 1.5;
        }
        .disc-modal-tracks li.active .track-title {
          color: var(--accent);
          font-weight: 600;
        }
        .track-icon {
          color: var(--fg-muted);
          flex-shrink: 0;
          line-height: 0;
          opacity: 0.5;
        }
        .disc-modal-tracks li.active .track-icon {
          color: var(--accent);
          opacity: 1;
        }

        /* アクションエリア */
        .disc-modal-actions {
          border-top: 1px solid var(--border);
          padding-top: 1.1rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .disc-modal-play-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: 1px solid var(--accent);
          color: var(--accent);
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          padding: 0.5rem 1.1rem;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .disc-modal-play-btn:hover {
          background: var(--accent);
          color: #fff;
        }
        .disc-modal-booth-link {
          font-size: 0.58rem;
          letter-spacing: 0.16em;
          color: var(--fg-muted);
          text-decoration: none;
          transition: color 0.15s;
          margin-left: auto;
        }
        .disc-modal-booth-link:hover { color: var(--fg); }

        /* ── モバイル ── */
        @media (max-width: 640px) {
          .disc-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .vintage-card {
            flex-direction: column !important;
          }
          .card-jacket {
            width: 100% !important;
            aspect-ratio: 1 / 1;
          }
          .card-info {
            padding: 0.6rem 0.75rem 0.75rem !important;
          }
          .disc-modal-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            max-height: 92vh;
          }
          .disc-modal-jacket {
            width: 100%;
            /* overlay padding 1.25rem × 2 = 2.5rem なので width = 100vw - 2.5rem */
            height: min(calc(100vw - 2.5rem), 45vh);
            max-height: unset;
          }
          .disc-modal-jacket img {
            object-fit: contain;
          }
          .disc-modal-jacket::after {
            background: linear-gradient(
              to bottom,
              transparent 60%,
              rgba(22, 32, 40, 0.55) 100%
            );
          }
          .disc-modal-info {
            padding: 1.25rem 1.25rem 1.25rem;
          }
          .disc-modal-meta {
            margin-bottom: 1rem;
          }
          .disc-modal-track-label {
            display: none;
          }
        }
      `}</style>

      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <span className="section-label">Discography</span>

        <div className="disc-grid" style={{ display: "grid", gap: "1rem" }}>
          {works.map((w, i) => (
            <AlbumCard key={i} w={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
