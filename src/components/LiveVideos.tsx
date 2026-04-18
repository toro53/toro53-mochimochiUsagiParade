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
    <section
      id="live"
      style={{
        padding: "6rem 2rem",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <style>{`
        .live-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 640px) {
          .live-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        .live-thumb {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #000;
          cursor: pointer;
          display: block;
          border: none;
          padding: 0;
          width: 100%;
        }
        .live-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease, transform 0.4s ease;
          opacity: 0.72;
        }
        .live-thumb:hover img {
          opacity: 0.5;
          transform: scale(1.03);
        }
        .live-play-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .live-play-icon svg {
          filter: drop-shadow(0 2px 12px rgba(0,0,0,0.7));
          transition: transform 0.2s ease;
        }
        .live-thumb:hover .live-play-icon svg {
          transform: scale(1.12);
        }

        /* modal */
        .live-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(0,0,0,0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.18s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .live-modal-inner {
          position: relative;
          width: 100%;
          max-width: 900px;
          animation: scaleIn 0.2s ease;
        }
        @keyframes scaleIn {
          from { transform: scale(0.94); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        .live-modal-embed {
          position: relative;
          aspect-ratio: 16 / 9;
          background: #000;
        }
        .live-modal-embed iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .live-modal-close {
          position: absolute;
          top: -2.4rem;
          right: 0;
          background: none;
          border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          font-size: 1.5rem;
          line-height: 1;
          padding: 0.2rem 0.5rem;
          transition: color 0.2s;
        }
        .live-modal-close:hover {
          color: #fff;
        }
      `}</style>

      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
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
        <div
          className="live-modal-overlay"
          onClick={() => setActive(null)}
        >
          <div
            className="live-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
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
