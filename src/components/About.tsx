"use client";

const linkItems = [
  {
    label: "X (Twitter)",
    handle: "@toro4nba",
    href: "https://x.com/mochiusaparade",
    icon: "𝕏",
  },
  {
    label: "BOOTH",
    handle: "torosanshin.booth.pm",
    href: "https://torosanshin.booth.pm/",
    icon: "◈",
  },
  {
    label: "Spotify",
    handle: "もちもちうさぎパレード",
    href: "https://open.spotify.com/search/%E3%82%82%E3%81%A1%E3%82%82%E3%81%A1%E3%81%86%E3%81%95%E3%81%8E%E3%83%91%E3%83%AC%E3%83%BC%E3%83%89",
    icon: "♫",
  },
  {
    label: "Apple Music",
    handle: "もちもちうさぎパレード",
    href: "https://music.apple.com/jp/search?term=%E3%82%82%E3%81%A1%E3%82%82%E3%81%A1%E3%81%86%E3%81%95%E3%81%8E%E3%83%91%E3%83%AC%E3%83%BC%E3%83%89",
    icon: "♪",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="about-section"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <style>{`
        .about-section {
          padding: 6rem 2rem;
        }
        .about-grid {
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 640px) {
          .about-section {
            padding: 4rem 1.5rem;
          }
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
      `}</style>
      <div className="about-grid">
        {/* About */}
        <div>
          <span className="section-label">About</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { label: "サークル名", value: "もちもちうさぎパレード" },
              { label: "メンバー", value: "toro4nba / sinra_vansho" },
            ].map((item) => (
              <div key={item.label} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
                <dt style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--fg-muted)", marginBottom: "0.3rem" }}>
                  {item.label}
                </dt>
                <dd style={{ fontSize: "0.85rem", color: "var(--fg)", margin: 0 }}>
                  {item.value}
                </dd>
              </div>
            ))}

            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
              <dt style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--fg-muted)", marginBottom: "0.7rem" }}>
                主な活動
              </dt>
              <dd style={{ margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { cat: "ライブ", detail: "リアル / VR" },
                  { cat: "即売会", detail: "M3 / ボーマス / メタフェス / MusicVket" },
                ].map((a) => (
                  <div key={a.cat} style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                    <span style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--accent-light)", border: "1px solid var(--accent-light)", padding: "0.1rem 0.45rem", flexShrink: 0, opacity: 0.8 }}>
                      {a.cat}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--fg)", letterSpacing: "0.04em" }}>
                      {a.detail}
                    </span>
                  </div>
                ))}
              </dd>
            </div>
          </div>
        </div>

        {/* Links */}
        <div>
          <span className="section-label">Links</span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {linkItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.9rem 0",
                  textDecoration: "none",
                  color: "var(--fg)",
                  borderBottom: "1px solid var(--border)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent-light)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
              >
                <span style={{ fontSize: "1rem", width: "1.5rem", textAlign: "center", color: "var(--accent-light)", flexShrink: 0 }}>
                  {item.icon}
                </span>
                <span style={{ flex: 1, fontSize: "0.75rem", letterSpacing: "0.18em", color: "var(--fg)" }}>
                  {item.label}
                </span>
                <span style={{ flexShrink: 0, fontSize: "0.65rem", color: "var(--border)" }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
