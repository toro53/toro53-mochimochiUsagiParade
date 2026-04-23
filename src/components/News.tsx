"use client";

import { useState } from "react";

const newsItems = [
  {
    date: "2026.05.17",
    tag: "ライブ",
    title: "ATOMS主催 Good Luck / builder release party",
    description: "柏DOMeにて開催",
    link: "https://x.com/mochiusaparade/status/2046433599264903264?s=20",
  },
  {
    date: "2026.04.26",
    tag: "イベント",
    title: "新譜「死灰、復燃えて」頒布しました",
    description: "M3・ボーマス両イベントにて頒布開始。BOOTH でも購入可能です。",
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
              className="py-4 border-b border-border last:border-b-0"
            >
              <div className="flex items-center gap-3 mb-2">
                <time className="text-[0.65rem] tracking-[0.06em] text-fg-muted">
                  {item.date}
                </time>
                <span className="text-[0.55rem] tracking-[0.1em] border border-border text-fg-muted px-2 py-[0.15rem] text-center">
                  {item.tag}
                </span>
              </div>
              <p className="text-[0.85rem] font-bold text-fg m-0 leading-relaxed">
                {item.title}
              </p>
              <div className="flex justify-between items-end gap-3 mt-1">
                {item.description && (
                  <p className="text-[0.75rem] text-fg-muted m-0 leading-relaxed flex-1">
                    {item.description}
                  </p>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.6rem] border border-border text-fg-muted px-2 py-1 text-center hover:border-fg hover:text-fg transition-colors whitespace-nowrap"
                  >
                    詳細
                  </a>
                )}
              </div>
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
