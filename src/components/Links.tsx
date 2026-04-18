"use client";

const linkItems = [
  {
    label: "X (Twitter)",
    handle: "@toro4nba",
    desc: "最新情報・活動告知",
    href: "https://twitter.com/toro4nba",
    icon: "𝕏",
  },
  {
    label: "BOOTH",
    handle: "torosanshin.booth.pm",
    desc: "CD・無料DL音源の頒布",
    href: "https://torosanshin.booth.pm/",
    icon: "◈",
  },
  {
    label: "Spotify",
    handle: "もちもちうさぎパレード",
    desc: "サブスク配信（検索してね）",
    href: "https://open.spotify.com/search/%E3%82%82%E3%81%A1%E3%82%82%E3%81%A1%E3%81%86%E3%81%95%E3%81%8E%E3%83%91%E3%83%AC%E3%83%BC%E3%83%89",
    icon: "♫",
  },
  {
    label: "Apple Music",
    handle: "もちもちうさぎパレード",
    desc: "サブスク配信（検索してね）",
    href: "https://music.apple.com/jp/search?term=%E3%82%82%E3%81%A1%E3%82%82%E3%81%A1%E3%81%86%E3%81%95%E3%81%8E%E3%83%91%E3%83%AC%E3%83%BC%E3%83%89",
    icon: "♪",
  },
];

export default function Links() {
  return (
    <section
      id="links"
      style={{
        padding: "6rem 2rem",
        background: "var(--bg-dark)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <span className="section-label">Links</span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1px",
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}
        >
          {linkItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="vintage-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                padding: "1.5rem 1.8rem",
                textDecoration: "none",
                color: "var(--fg)",
                borderRadius: 0,
                border: "none",
                borderBottom: i < linkItems.length - 1 ? "1px solid var(--border)" : "none",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#ede8de";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--card-bg)";
              }}
            >
              <span
                style={{
                  fontSize: "1.4rem",
                  width: "2.5rem",
                  textAlign: "center",
                  color: "var(--accent-light)",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </span>
              <div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    color: "var(--fg-muted)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    marginBottom: "0.2rem",
                  }}
                >
                  {item.handle}
                </div>
                <div style={{ display: "none" }}>
                  {item.desc}
                </div>
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "0.7rem",
                  color: "var(--border)",
                }}
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
