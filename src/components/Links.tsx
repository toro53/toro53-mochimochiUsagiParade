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
    label: "Instagram",
    handle: "mochimochi_usagi_parade",
    desc: "日常・活動の写真",
    href: "https://www.instagram.com/mochimochi_usagi_parade/",
    icon: "◎",
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
    <section id="links" className="py-24 px-8 bg-bg-dark border-t border-border">
      <div className="max-w-[780px] mx-auto">
        <span className="section-label">Links</span>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-px border border-border overflow-hidden">
          {linkItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`vintage-card flex items-center gap-[1.2rem] px-[1.8rem] py-6 no-underline text-fg transition-[background] duration-250 hover:bg-[#ede8de] rounded-none border-none ${
                i < linkItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-[1.4rem] w-10 text-center text-accent-light flex-shrink-0">
                {item.icon}
              </span>
              <div>
                <div className="text-[0.65rem] tracking-[0.18em] text-fg-muted mb-1">
                  {item.label}
                </div>
                <div className="text-[0.88rem] font-bold">
                  {item.handle}
                </div>
              </div>
              <span className="ml-auto text-[0.7rem] text-border">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
