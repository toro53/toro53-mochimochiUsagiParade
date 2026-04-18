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
        .live-embed {
          position: relative;
          aspect-ratio: 16 / 9;
          background: #000;
          overflow: hidden;
        }
        .live-embed iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
      `}</style>

      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <span className="section-label">Live</span>

        <div className="live-grid">
          {videos.map((v) => (
            <div key={v.id}>
              <div className="live-embed">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
