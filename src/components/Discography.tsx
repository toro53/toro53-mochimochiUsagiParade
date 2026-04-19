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
        className="vintage-card flex flex-col cursor-pointer"
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`${w.title} の詳細を見る`}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setModalOpen(true); }}
      >
        {/* jacket */}
        <div
          className="card-jacket w-full overflow-hidden relative flex-shrink-0"
          style={{ aspectRatio: "1 / 1", background: "#1a2e38" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={w.img}
            alt={w.title}
            className="w-full h-full object-cover block transition-[transform,filter] duration-400"
            style={{ filter: "sepia(0.15) saturate(0.9)" }}
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
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)" }}
          />
          {/* 常時表示: トラック数バッジ */}
          {w.tracks.length > 0 && (
            <div className="absolute bottom-2 left-[0.55rem] flex items-center gap-[0.3rem] pointer-events-none px-2 py-[0.18rem]"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
            >
              <svg width="8" height="8" viewBox="0 0 14 14" fill="var(--accent-light)">
                <polygon points="3,1 13,7 3,13" />
              </svg>
              <span className="text-[0.48rem] tracking-[0.1em] text-fg leading-none">
                {w.tracks.length} tracks
              </span>
            </div>
          )}

          {/* hover overlay: 大きな再生ボタン */}
          <div
            className="card-hover-overlay absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none transition-opacity duration-200"
            style={{ background: "rgba(0,0,0,0.45)", opacity: 0 }}
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ border: "1.5px solid rgba(255,255,255,0.75)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#fff" style={{ marginLeft: "2px" }}>
                <polygon points="3,1 13,7 3,13" />
              </svg>
            </div>
            <span className="text-[0.48rem] tracking-[0.22em] text-white/85">LISTEN</span>
          </div>
        </div>

        {/* info */}
        <div className="card-info px-4 py-[0.75rem_1rem_0.85rem] flex-1 flex flex-col gap-[0.2rem] min-w-0"
          style={{ padding: "0.75rem 1rem 0.85rem" }}
        >
          <div className="text-[0.55rem] tracking-[0.15em] text-fg-muted">
            {w.event}
          </div>
          <h3 className="text-[0.85rem] font-bold text-fg leading-[1.4] m-0">
            {w.title}
          </h3>
        </div>
      </div>

      {modalOpen && <AlbumModal w={w} onClose={() => setModalOpen(false)} />}
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Discography() {
  const { play } = usePlayer();

  const handleShuffle = () => {
    const allTracks: Track[] = works.flatMap((w) =>
      w.tracks.map((t) => ({
        title: t.title,
        albumTitle: w.title,
        file: t.file,
        jacket: w.img.startsWith("/") ? w.img : undefined,
      }))
    );
    const shuffled = shuffleArray(allTracks);
    if (shuffled.length > 0) play(shuffled[0], shuffled);
  };

  return (
    <section
      id="discography"
      className="py-24 px-8 bg-bg border-t border-b border-border"
    >
      <div className="max-w-[960px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <span className="section-label" style={{ marginBottom: 0 }}>Discography</span>
          <button
            onClick={handleShuffle}
            title="シャッフル再生"
            className="flex items-center gap-[0.45rem] bg-transparent border border-border text-fg-muted text-[0.55rem] tracking-[0.18em] px-[0.9rem] py-[0.4rem] cursor-pointer transition-colors hover:border-accent hover:text-accent"
          >
            <svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16,3 20,3 20,7" />
              <polyline points="16,17 20,17 20,13" />
              <path d="M0,17 Q7,17 10,10 Q13,3 20,3" />
              <path d="M0,3 Q7,3 10,10 Q13,17 20,17" />
            </svg>
            SHUFFLE
          </button>
        </div>

        <div className="disc-grid grid gap-4">
          {works.map((w, i) => (
            <AlbumCard key={i} w={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
