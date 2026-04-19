"use client";

import { useState, useEffect } from "react";

const videos = [
  {
    id: "KkaLt6D6In4",
    title: "Live at ライブハウス",
  },
  {
    id: "gWQ7jk_CGZI",
    title: "Live Performance",
  },
];

export default function LiveVideos() {
  const [active, setActive] = useState<string | null>(null);

  // Escape キーで閉じる
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  // モーダル表示中はスクロールロック
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <section id="live" className="py-24 px-8 bg-bg-dark border-t border-border">
      <div className="max-w-[960px] mx-auto">
        <span className="section-label">Live</span>

        <div className="live-grid">
          {videos.map((v) => (
            <button
              key={v.id}
              className="live-thumb"
              onClick={() => setActive(v.id)}
              aria-label={`${v.title} を再生`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                alt={v.title}
              />
              <div className="live-play-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="rgba(0,0,0,0.5)" />
                  <polygon points="24,17 47,30 24,43" fill="#fff" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* modal */}
      {active && (
        <div className="live-modal-overlay" onClick={() => setActive(null)}>
          <div className="live-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="live-modal-close"
              onClick={() => setActive(null)}
              aria-label="閉じる"
            >
              ✕
            </button>
            <div className="live-modal-embed">
              <iframe
                src={`https://www.youtube.com/embed/${active}?autoplay=1`}
                title="Live video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
