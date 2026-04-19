"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePlayer } from "@/context/PlayerContext";

// bgColor: ジャケットの雰囲気に合わせた暗い背景色
const slides = [
  {
    title: "夏、嘘をついたぜ",
    event: "最新作",
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
    audio: "/Music/possessed-melancholy.m4a",
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

export default function Hero() {
  const { pause: pausePlayer, isPlaying: playerIsPlaying } = usePlayer();
  const [current, setCurrent] = useState(0);
  const [slideDir, setSlideDir] = useState<"next" | "prev">("next");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [progress, setProgress] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const applyBg = useCallback((color: string) => {
    if (sectionRef.current) {
      sectionRef.current.style.backgroundColor = color;
    }
  }, []);

  const goTo = useCallback(
    (i: number, dir: "next" | "prev" = "next") => {
      setSlideDir(dir);
      setCurrent(i);
      applyBg(slides[i].bgColor);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        setPlaying(false);
        setProgress(0);
      }
    },
    [applyBg]
  );

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length, "prev"), [current, goTo]);
  const next = useCallback(() => goTo((current + 1) % slides.length, "next"), [current, goTo]);

  // Initialize background color
  useEffect(() => {
    applyBg(slides[0].bgColor);
  }, [applyBg]);

  // オートスクロール（再生したら停止）
  useEffect(() => {
    if (!autoScroll) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [autoScroll, next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Swap audio src on slide change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
    setProgress(0);
    if (slides[current].audio) {
      audio.src = slides[current].audio;
      audio.load();
    } else {
      audio.removeAttribute("src");
    }
  }, [current]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnd = () => { setPlaying(false); setProgress(0); };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  // グローバルプレイヤーが再生を始めたら Hero を止める
  useEffect(() => {
    if (playerIsPlaying) {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        if (fadeRef.current) clearInterval(fadeRef.current);
        audio.pause();
        setPlaying(false);
      }
    }
  }, [playerIsPlaying]);

  const fadeIn = (audio: HTMLAudioElement, target: number) => {
    if (fadeRef.current) clearInterval(fadeRef.current);
    audio.volume = 0;
    if (target === 0) return;
    fadeRef.current = setInterval(() => {
      if (audio.volume < target - 0.05) {
        audio.volume = Math.min(target, audio.volume + 0.05);
      } else {
        audio.volume = target;
        if (fadeRef.current) clearInterval(fadeRef.current);
      }
    }, 50);
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setMuted(v === 0);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      if (fadeRef.current) clearInterval(fadeRef.current);
      audio.pause();
      setPlaying(false);
    } else {
      setAutoScroll(false); // 一度再生したらオートスクロール停止
      // グローバルプレイヤーを止めてから再生
      pausePlayer();
      audio.play().then(() => { setPlaying(true); fadeIn(audio, muted ? 0 : volume); }).catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    setMuted(next);
    audio.volume = next ? 0 : volume;
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
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

        {/* carousel — 前後のジャケットを左右に表示 */}
        <div className="flex items-center gap-2 mb-8 w-full overflow-hidden justify-center sm:gap-4">

          {/* 前の作品 — 外側へのフェード */}
          <button
            onClick={prev}
            aria-label="前の作品"
            className="flex-shrink-0 cursor-pointer bg-transparent border-none p-0 opacity-55 hover:opacity-80 transition-opacity [mask-image:linear-gradient(to_right,transparent_0%,black_55%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_55%)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slides[(current - 1 + slides.length) % slides.length].img}
              alt="前の作品"
              className="object-cover block w-[clamp(60px,13vw,120px)] h-[clamp(60px,13vw,120px)] shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            />
          </button>

          {/* 現在の作品 */}
          <a href={slides[current].href} target="_blank" rel="noopener noreferrer" className="block flex-shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current}
              src={slides[current].img}
              alt={slides[current].title}
              className={`object-cover block w-[clamp(180px,46vw,300px)] h-[clamp(180px,46vw,300px)] shadow-[0_28px_72px_rgba(0,0,0,0.65)] sm:w-[clamp(220px,30vw,300px)] sm:h-[clamp(220px,30vw,300px)] ${slideDir === "next" ? "slide-from-right" : "slide-from-left"}`}
            />
          </a>

          {/* 次の作品 — 外側へのフェード */}
          <button
            onClick={next}
            aria-label="次の作品"
            className="flex-shrink-0 cursor-pointer bg-transparent border-none p-0 opacity-55 hover:opacity-80 transition-opacity [mask-image:linear-gradient(to_left,transparent_0%,black_55%)] [-webkit-mask-image:linear-gradient(to_left,transparent_0%,black_55%)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slides[(current + 1) % slides.length].img}
              alt="次の作品"
              className="object-cover block w-[clamp(60px,13vw,120px)] h-[clamp(60px,13vw,120px)] shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            />
          </button>

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

        {/* audio controls */}
        <div className="flex flex-col items-center gap-[0.9rem] w-[min(260px,80vw)]">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              aria-label={playing ? "一時停止" : "再生"}
              className="bg-transparent border border-accent-light text-accent-light w-[2.8rem] h-[2.8rem] rounded-full cursor-pointer flex items-center justify-center transition-[background,color] hover:bg-accent-light hover:text-bg"
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

            {/* mute button + volume slider */}
            <div className="flex items-center gap-[0.4rem]">
              <button
                onClick={toggleMute}
                aria-label={muted ? "ミュート解除" : "ミュート"}
                className={`bg-transparent border-none cursor-pointer flex items-center justify-center p-[0.2rem] flex-shrink-0 ${muted ? "text-border" : "text-accent-light"}`}
              >
                {muted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27 7.73 9H3V15H7L12 20V13.27L16.25 17.52C15.58 18.04 14.83 18.45 14 18.7V20.76C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21 21 19.73 12 10.73 4.27 3ZM12 4L9.91 6.09 12 8.18V4Z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z"/>
                  </svg>
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={changeVolume}
                aria-label="音量"
                className="w-[72px] accent-accent-light cursor-pointer max-sm:hidden"
              />
            </div>
          </div>

          <div
            onClick={seek}
            className="w-full h-[2px] bg-border cursor-pointer relative"
          >
            <div
              className="h-full bg-accent-light transition-[width] duration-[0.25s] linear"
              style={{ width: `${progress}%` }}
            />
          </div>
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

      <audio ref={audioRef} />

      {/* scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[0.4rem] opacity-40">
        <div className="w-px h-10 bg-fg-muted animate-scroll-line" />
      </div>
    </section>
  );
}
