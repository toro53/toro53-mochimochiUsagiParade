"use client";

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
          display: block;
          text-decoration: none;
        }
        .live-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
          opacity: 0.75;
        }
        .live-thumb:hover img {
          opacity: 0.55;
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
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.6));
          transition: transform 0.2s ease;
        }
        .live-thumb:hover .live-play-icon svg {
          transform: scale(1.1);
        }
      `}</style>

      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <span className="section-label">Live</span>

        <div className="live-grid">
          {videos.map((v) => (
            <div key={v.id}>
              <a
                className="live-thumb"
                href={`https://youtu.be/${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={v.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                />
                <div className="live-play-icon">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="28" r="28" fill="rgba(0,0,0,0.5)" />
                    <polygon points="22,16 44,28 22,40" fill="#fff" />
                  </svg>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
