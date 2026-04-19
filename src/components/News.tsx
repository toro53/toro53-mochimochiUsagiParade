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
    <section id="news" className="py-24 px-8 bg-bg border-t border-border">
      <div className="max-w-[960px] mx-auto">
        <span className="section-label">News &amp; Updates</span>

        <div className="flex flex-col">
          {visible.map((item, i) => (
            <article
              key={i}
              className="flex items-baseline gap-[0.9rem] py-3 border-b border-border flex-wrap"
            >
              <time className="text-[0.65rem] tracking-[0.06em] text-fg-muted flex-shrink-0">
                {item.date}
              </time>
              <span className="text-[0.55rem] tracking-[0.1em] border border-border text-fg-muted py-[0.1rem] flex-shrink-0 w-[4.5rem] text-center inline-block">
                {item.tag}
              </span>
              <p className="text-[0.85rem] font-bold text-fg m-0 leading-relaxed">
                {item.title}
              </p>
            </article>
          ))}
        </div>

        {newsItems.length > INITIAL_COUNT && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-6 bg-transparent border border-border text-fg-muted text-[0.65rem] tracking-[0.2em] px-[1.4rem] py-2 cursor-pointer transition-colors hover:border-fg hover:text-fg"
          >
            {expanded ? "閉じる" : "もっと見る"}
          </button>
        )}
      </div>
    </section>
  );
}
