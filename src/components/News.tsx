const newsItems = [
  {
    date: "2026.05.17",
    tag: "ライブ",
    title: "柏駅付近のライブハウスにてライブ　詳細は後日発表します",
    body: "",
  },
  {
    date: "2026.04.26",
    tag: "イベント",
    title: "M3・ボーマス 両イベント参加します",
    body: "",
  },
  {
    date: "2025.04.27",
    tag: "イベント",
    title: "M3-2025春 新譜「晴天に一羽」頒布しました",
    body: "M3-2025春にて新作「晴天に一羽」（¥200）を頒布しました。BOOTHでもお求めいただけます。ご来場・ご購入いただいた皆様、ありがとうございました。",
  },
  {
    date: "2024.10.27",
    tag: "イベント",
    title: "M3-2024秋 新譜「シュレーディンガーの星」頒布しました",
    body: "M3-2024秋にて「シュレーディンガーの星」（¥200）を頒布しました。ご来場ありがとうございました。BOOTHにて引き続き販売中です。",
  },
  {
    date: "2024.04.01",
    tag: "お知らせ",
    title: "Spotify / Apple Music 等でサブスク配信中",
    body: "「もちもちうさぎパレード」で各サブスクリプションサービスを検索いただくと、過去作品をお聴きいただけます。一部作品はBOOTHにて無料ダウンロード版もご用意しています。",
  },
];

export default function News() {
  return (
    <section
      id="news"
      style={{
        padding: "6rem 2rem",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      <span className="section-label">News &amp; Updates</span>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {newsItems.map((item, i) => (
          <article
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: "1.5rem",
              padding: "2rem 0",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div>
              <time
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  color: "var(--fg-muted)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                {item.date}
              </time>
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  border: "1px solid var(--border)",
                  color: "var(--fg-muted)",
                  padding: "0.15rem 0.5rem",
                }}
              >
                {item.tag}
              </span>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--fg)",
                }}
              >
                {item.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
