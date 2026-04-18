"use client";

import { useState } from "react";

const newsItems = [
  {
    date: "2026.05.17",
    tag: "ライブ",
    title: "柏駅付近のライブハウスにてライブ　詳細は後日発表します",
  },
  {
    date: "2026.04.26",
    tag: "イベント",
    title: "M3・ボーマス 両イベント参加します",
  },
  {
    date: "2025.04.27",
    tag: "イベント",
    title: "M3-2025春 新譜「晴天に一羽」頒布しました",
  },
  {
    date: "2024.10.27",
    tag: "イベント",
    title: "M3-2024秋 新譜「シュレーディンガーの星」頒布しました",
  },
  {
    date: "2024.04.01",
    tag: "お知らせ",
    title: "Spotify / Apple Music 等でサブスク配信中",
  },
];

const INITIAL_COUNT = 3;

export default function News() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? newsItems : newsItems.slice(0, INITIAL_COUNT);

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

        <div style={{ display: "flex", flexDirection: "column" }}>
          {visible.map((item, i) => (
            <article
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "6.5rem 4.5rem 1fr",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <time style={{ fontSize: "0.65rem", letterSpacing: "0.06em", color: "var(--fg-muted)" }}>
                {item.date}
              </time>
              <span style={{ fontSize: "0.55rem", letterSpacing: "0.1em", border: "1px solid var(--border)", color: "var(--fg-muted)", padding: "0.1rem 0", textAlign: "center" }}>
                {item.tag}
              </span>
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--fg)", margin: 0, lineHeight: 1.5 }}>
                {item.title}
              </p>
            </article>
          ))}
        </div>

        {newsItems.length > INITIAL_COUNT && (
          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              marginTop: "1.5rem",
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--fg-muted)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              padding: "0.5rem 1.4rem",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--fg)";
              (e.currentTarget as HTMLElement).style.color = "var(--fg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
            }}
          >
            {expanded ? "閉じる" : "もっと見る"}
          </button>
        )}
      </div>
    </section>
  );
}
