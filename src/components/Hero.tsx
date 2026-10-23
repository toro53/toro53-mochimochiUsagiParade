"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import { usePlayer, type Track } from "@/context/PlayerContext";
import { works, type Work } from "@/data/works";
import AlbumModal from "@/components/AlbumModal";

// bgColor: ジャケットの雰囲気に合わせた暗い背景色
const slides = [
  {
    title: "Parade In The Room",
    event: "最新作",
    img: "/Music/parade-in-the-room/jacket.jpg",
    audio: "/Music/parade-in-the-room/快晴に孤独.mp3",
    href: "https://torosanshin.booth.pm/items/8977644",
    bgColor: "#12181c",
  },
  {
    title: "死灰、復燃えて",
    event: "M3-2026春",
    img: "/Music/shikaimata/jacket.png",
    audio: "/Music/shikaimata/死灰、復燃えて.mp3",
    href: "https://torosanshin.booth.pm/items/8255437",
    bgColor: "#1a2624",
  },
  {
    title: "夏、嘘をついたぜ",
    event: "M3-2025秋",
    img: "/Music/summer-lies/jacket.jpg",
    audio: "/Music/summer-lies/summer-lies.m4a",
    href: "https://torosanshin.booth.pm/items/7558547",
    bgColor: "#182030",
  },
  {
    title: "晴天に一羽",
    event: "M3-2025春",
    img: "/Music/clear-sky-one-bird/jacket.png",
    audio: "/Music/clear-sky-one-bird/clear-sky-solitude.mp3",
    href: "https://torosanshin.booth.pm/items/6822016",
    bgColor: "#142028",
  },
  {
    title: "シュレーディンガーの星",
    event: "M3-2024秋",
    img: "/Music/schrodingers-star/jacket.png",
    audio: "/Music/schrodingers-star/schrodingers-star.mp3",
    href: "https://torosanshin.booth.pm/items/6208804",
    bgColor: "#14142a",
  },
  {
    title: "花明かり",
    event: "M3-2024春",
    img: "/Music/flower-light/jacket.jpg",
    audio: "/Music/flower-light/flower-light-dazzles.mp3",
    href: "https://torosanshin.booth.pm/items/5660837",
    bgColor: "#28181a",
  },
  {
    title: "月面鈍行",
    event: "M3-2023春",
    img: "/Music/lunar-local-train/jacket.png",
    audio: "/Music/lunar-local-train/lunar-local-train.mp3",
    href: "https://torosanshin.booth.pm/items/4724535",
    bgColor: "#141418",
  },
  {
    title: "忘憂のもの",
    event: "M3-2022秋",
    img: "/Music/forget-melancholy/jacket.jpg",
    audio: "/Music/forget-melancholy/rock-n-roll-will-die-someday.mp3",
    href: "https://torosanshin.booth.pm/items/4267952",
    bgColor: "#1c1c20",
  },
  {
    title: "憑き身に憂",
    event: "M3-2022秋",
    img: "/Music/possessed-melancholy/jacket.jpg",
    audio: "/Music/possessed-melancholy/possessed-melancholy.m4a",
    href: "https://torosanshin.booth.pm/items/3826662",
    bgColor: "#201010",
  },
  {
    title: "空中分解する春",
    event: "M3-2022春",
    img: "/Music/midair-disintegration/jacket.png",
    audio: "/Music/midair-disintegration/02-midair-disintegration.mp3",
    href: "https://torosanshin.booth.pm/items/3809571",
    bgColor: "#101c12",
  },
  {
    title: "月見に卯",
    event: "M3-2021秋",
    img: "/Music/moon-viewing/jacket.jpg",
    audio: "/Music/moon-viewing/moon-viewing.mp3",
    href: "https://torosanshin.booth.pm/items/3318343",
    bgColor: "#101820",
  },
  {
    title: "嘘憑き EP",
    event: "M3-2021春",
    img: "/Music/usotsuki-ep/jacket.jpg",
    audio: "/Music/usotsuki-ep/liar.mp3",
    href: "https://torosanshin.booth.pm/items/2898014",
    bgColor: "#10101e",
  },
];

// スライドの曲を含むアルバムの全曲をキューにする。works に無い曲はその 1 曲だけ
function slideQueue(slide: (typeof slides)[number]): Track[] {
  const w = works.find((w) => w.tracks.some((t) => t.file === slide.audio));
  if (!w) return [{ title: slide.title, albumTitle: slide.title, file: slide.audio, jacket: slide.img }];
  return w.tracks.flatMap((t) =>
    t.file ? [{ title: t.title, albumTitle: w.title, file: t.file, jacket: w.img }] : []
  );
}

export default function Hero() {
  const { play, pause, resume, currentTrack, isPlaying } = usePlayer();
  const [current, setCurrent] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  // 中央のジャケットを押したときに開くアルバム詳細（Discography と同じモーダル）
  const [modalWork, setModalWork] = useState<Work | null>(null);
  const closeModal = useCallback(() => setModalWork(null), []);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const baseOffsetRef = useRef(0);

  const applyBg = useCallback((color: string) => {
    if (sectionRef.current) {
      sectionRef.current.style.backgroundColor = color;
    }
  }, []);

  // トラック中央を画面中央に揃える（マウント・リサイズ時）
  const updateBaseOffset = useCallback(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container || animatingRef.current) return;
    const slots = Array.from(track.children) as HTMLElement[];
    const center = slots[2]; // offset=0 のスロット
    const offset = container.offsetWidth / 2 - (center.offsetLeft + center.offsetWidth / 2);
    baseOffsetRef.current = offset;
    track.style.transform = `translateX(${offset}px)`;
  }, []);

  useLayoutEffect(() => {
    updateBaseOffset();
    window.addEventListener("resize", updateBaseOffset);
    return () => window.removeEventListener("resize", updateBaseOffset);
  }, [updateBaseOffset]);

  const goTo = useCallback(
    (i: number, dir: "next" | "prev" = "next") => {
      if (animatingRef.current) return;
      animatingRef.current = true;
      applyBg(slides[i].bgColor);

      const track = trackRef.current;
      if (!track) { setCurrent(i); animatingRef.current = false; return; }

      // スロット幅 + ギャップを実測してスライド量を決定
      const slots = Array.from(track.children) as HTMLElement[];
      const step = slots[3].offsetLeft - slots[2].offsetLeft; // 1スロット分の距離
      const target = baseOffsetRef.current + (dir === "next" ? -step : step);

      track.style.transition = "transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      track.style.transform = `translateX(${target}px)`;

      const onEnd = (e: TransitionEvent) => {
        if (e.target !== track || e.propertyName !== "transform") return;
        track.removeEventListener("transitionend", onEnd);
        track.style.transition = "none";
        // スナップ前に先に画像を更新 → スナップ後に古い画像が一瞬見えるのを防ぐ
        flushSync(() => setCurrent(i));
        track.style.transform = `translateX(${baseOffsetRef.current}px)`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          track.style.transition = "";
          animatingRef.current = false;
        }));
      };
      track.addEventListener("transitionend", onEnd);
    },
    [applyBg]
  );

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length, "prev"), [current, goTo]);
  const next = useCallback(() => goTo((current + 1) % slides.length, "next"), [current, goTo]);

  // Initialize background color
  useEffect(() => {
    applyBg(slides[0].bgColor);
  }, [applyBg]);

  // オートスクロール（再生したら停止、モーダル表示中は一時停止）
  useEffect(() => {
    if (!autoScroll || modalWork) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [autoScroll, modalWork, next]);

  // Keyboard navigation
  useEffect(() => {
    if (modalWork) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, modalWork]);

  // 再生は画面下のプレイヤーバー (グローバルプレイヤー) で行う
  const queue = slideQueue(slides[current]);
  const isThisSlide = !!currentTrack && queue.some((t) => t.file === currentTrack.file);
  const playing = isThisSlide && isPlaying;

  const togglePlay = () => {
    if (playing) {
      pause();
    } else if (isThisSlide) {
      resume();
    } else {
      setAutoScroll(false); // 一度再生したらオートスクロール停止
      const start = queue.find((t) => t.file === slides[current].audio) ?? queue[0];
      if (start) play(start, queue);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-24 pb-16 relative overflow-hidden"
      style={{ backgroundColor: slides[0].bgColor }}
    >
      {/* radial vignette */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_25%,rgba(0,0,0,0.62)_100%)]" />

      <div className="relative z-10 flex flex-col items-center w-full">

        {/* label */}
        <div className="flex items-center gap-4 mb-12 w-full max-w-[380px]">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[0.6rem] tracking-[0.3em] text-fg-muted">Mochimochi Usagi Parade</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* carousel — 5スロット統合トラック（左右含めて一体でスライド） */}
        <div
          ref={containerRef}
          className="w-full overflow-hidden mb-8 [mask-image:linear-gradient(to_right,transparent_0%,black_16%,black_84%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_16%,black_84%,transparent_100%)]"
        >
          <div ref={trackRef} className="flex gap-3 sm:gap-5">
            {([-2, -1, 0, 1, 2] as const).map((offset) => {
              const idx = ((current + offset) % slides.length + slides.length) % slides.length;
              const isCenter = offset === 0;
              return (
                <div
                  key={offset}
                  className={`flex-shrink-0 w-[clamp(150px,42vw,240px)] h-[clamp(150px,42vw,240px)] sm:w-[clamp(200px,26vw,280px)] sm:h-[clamp(200px,26vw,280px)] transition-opacity duration-300 ${isCenter ? "opacity-100" : "opacity-40 cursor-pointer"}`}
                  onClick={!isCenter ? (offset < 0 ? prev : next) : undefined}
                  role={!isCenter ? "button" : undefined}
                  aria-label={!isCenter ? (offset < 0 ? "前の作品" : "次の作品") : undefined}
                >
                  {isCenter ? (
                    <button
                      type="button"
                      onClick={() => {
                        const w = works.find((w) => w.title === slides[idx].title);
                        if (w) setModalWork(w);
                        else window.open(slides[idx].href, "_blank", "noopener,noreferrer");
                      }}
                      aria-label={`${slides[idx].title} の詳細を見る`}
                      className="block w-full h-full p-0 border-none bg-transparent cursor-pointer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={slides[idx].img} alt={slides[idx].title} className="w-full h-full object-cover block shadow-[0_20px_56px_rgba(0,0,0,0.65)]" />
                    </button>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={slides[idx].img} alt={slides[idx].title} className="w-full h-full object-cover block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* track info */}
        <div className="mb-[1.8rem] min-h-[3.5rem]">
          <div className="text-[0.6rem] tracking-[0.22em] text-fg-muted mb-[0.45rem]">
            {slides[current].event}
          </div>
          <div className="text-[1.25rem] font-bold text-fg tracking-[0.08em]">
            {slides[current].title}
          </div>
        </div>

        {/* 再生ボタン（再生・シーク・音量は画面下のプレイヤーバーで行う） */}
        <div className="flex items-center justify-center">
          <button
            onClick={togglePlay}
            aria-label={playing ? "一時停止" : "再生"}
            disabled={!slides[current].audio}
            className="bg-transparent border border-accent-light text-accent-light w-[2.8rem] h-[2.8rem] rounded-full cursor-pointer flex items-center justify-center transition-[background,color] hover:bg-accent-light hover:text-bg disabled:opacity-30 disabled:pointer-events-none"
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="2" y="1" width="4" height="12" />
                <rect x="8" y="1" width="4" height="12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <polygon points="3,1 13,7 3,13" />
              </svg>
            )}
          </button>
        </div>

        {/* dots */}
        <div className="flex gap-[0.45rem] mt-10 flex-wrap justify-center max-w-[320px]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              aria-label={`スライド ${i + 1}`}
              className={`h-[0.4rem] border-none cursor-pointer p-0 transition-[width,background-color] duration-300 ${
                i === current ? "w-[1.4rem] bg-accent-light" : "w-[0.4rem] bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {modalWork && <AlbumModal w={modalWork} onClose={closeModal} />}

      {/* scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[0.4rem] opacity-40">
        <div className="w-px h-10 bg-fg-muted animate-scroll-line" />
      </div>
    </section>
  );
}
