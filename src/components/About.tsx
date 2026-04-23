"use client";

const linkItems = [
  {
    label: "X (Twitter)",
    handle: "@toro4nba",
    href: "https://x.com/mochiusaparade",
    icon: "𝕏",
  },
  {
    label: "Instagram",
    handle: "mochimochi_usagi_parade",
    href: "https://www.instagram.com/mochimochi_usagi_parade/",
    icon: "📷",
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
      className="py-24 px-8 max-sm:py-16 max-sm:px-6 bg-bg-dark border-t border-border"
    >
      <div className="max-w-[960px] mx-auto grid grid-cols-2 gap-20 items-start max-sm:grid-cols-1 max-sm:gap-12">

        {/* About */}
        <div>
          <span className="section-label">About</span>
          <div className="flex flex-col gap-6">
            {[
              { label: "サークル名", value: "もちもちうさぎパレード" },
              { label: "メンバー", value: "toro4nba / sinra_vansho" },
            ].map((item) => (
              <div key={item.label} className="border-b border-border pb-4">
                <dt className="text-[0.6rem] tracking-[0.2em] text-fg-muted mb-1">
                  {item.label}
                </dt>
                <dd className="text-[0.85rem] text-fg m-0">
                  {item.value}
                </dd>
              </div>
            ))}

            <div className="border-b border-border pb-4">
              <dt className="text-[0.6rem] tracking-[0.2em] text-fg-muted mb-[0.7rem]">
                主な活動
              </dt>
              <dd className="m-0 flex flex-col gap-2">
                {[
                  { cat: "ライブ", detail: "リアル / VR" },
                  { cat: "即売会", detail: "M3 / ボーマス / メタフェス / MusicVket" },
                ].map((a) => (
                  <div key={a.cat} className="flex items-baseline gap-3">
                    <span className="text-[0.6rem] tracking-[0.12em] text-accent-light border border-accent-light px-[0.45rem] py-[0.1rem] flex-shrink-0 opacity-80">
                      {a.cat}
                    </span>
                    <span className="text-[0.8rem] text-fg tracking-[0.04em]">
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
          <div className="flex flex-col">
            {linkItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 py-[0.9rem] no-underline text-fg border-b border-border transition-colors hover:text-accent-light"
              >
                <span className="text-base w-6 text-center text-accent-light flex-shrink-0">
                  {item.icon}
                </span>
                <span className="flex-1 text-[0.75rem] tracking-[0.18em] text-fg">
                  {item.label}
                </span>
                <span className="flex-shrink-0 text-[0.65rem] text-border">→</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
