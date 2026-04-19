"use client";

import { useState } from "react";
import { usePlayer, Track } from "@/context/PlayerContext";
import { works } from "@/data/works";
import AlbumModal from "@/components/AlbumModal";
import type { Work } from "@/data/works";

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
        <div className="card-info flex-1 flex flex-col gap-[0.2rem] min-w-0"
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
