"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// bgColor: ジャケットの雰囲気に合わせた暗い背景色
const slides = [
  {
    title: "夏、嘘をついたぜ",
    event: "最新作",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/7558547/1cdf3950-edfc-42fa-afa3-39fa2061752e_base_resized.jpg",
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
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/3826662/7bc4c6bc-d243-4b53-9293-055afce514b3_base_resized.jpg",
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
  {
    title: "VOICEROIDとうるさいギター",
    event: "—",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/2800198/b4fd0b5c-433a-49af-a872-738b85fb065f_base_resized.jpg",
    audio: "",
    href: "https://torosanshin.booth.pm/items/2800198",
    bgColor: "#141414",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [imgVisible, setImgVisible] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const applyBg = useCallback((color: string) => {
    if (sectionRef.current) {
      sectionRef.current.style.backgroundColor = color;
    }
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setImgVisible(false);
      setTimeout(() => {
        setCurrent(i);
        applyBg(slides[i].bgColor);
        setImgVisible(true);
      }, 180);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        setPlaying(false);
        setProgress(0);
      }
    },
    [applyBg]
  );

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  // Initialize background color
  useEffect(() => {
    applyBg(slides[0].bgColor);
  }, [applyBg]);

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

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
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
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "6rem 2rem 4rem",
        position: "relative",
        backgroundColor: slides[0].bgColor,
        transition: "background-color 1.4s ease",
        overflow: "hidden",
      }}
    >
      {/* radial vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 40%, transparent 25%, rgba(0,0,0,0.62) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* label */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem", width: "100%", maxWidth: "380px" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--fg-muted)" }}>Mochimochi Usagi Parade</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        {/* carousel */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
          <button
            onClick={prev}
            aria-label="前の作品"
            style={{ background: "none", border: "none", color: "var(--fg-muted)", fontSize: "2.2rem", cursor: "pointer", lineHeight: 1, opacity: 0.55, padding: "0.5rem", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
          >‹</button>

          <a href={slides[current].href} target="_blank" rel="noopener noreferrer" style={{ display: "block", flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current}
              src={slides[current].img}
              alt={slides[current].title}
              style={{
                width: "clamp(220px, 30vw, 300px)",
                height: "clamp(220px, 30vw, 300px)",
                objectFit: "cover",
                display: "block",
                boxShadow: "0 28px 72px rgba(0,0,0,0.65)",
                opacity: imgVisible ? 1 : 0,
                transition: "opacity 0.18s ease",
              }}
            />
          </a>

          <button
            onClick={next}
            aria-label="次の作品"
            style={{ background: "none", border: "none", color: "var(--fg-muted)", fontSize: "2.2rem", cursor: "pointer", lineHeight: 1, opacity: 0.55, padding: "0.5rem", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
          >›</button>
        </div>

        {/* track info */}
        <div style={{ marginBottom: "1.8rem", minHeight: "3.5rem" }}>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "var(--fg-muted)", marginBottom: "0.45rem" }}>
            {slides[current].event}
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--fg)", letterSpacing: "0.08em" }}>
            {slides[current].title}
          </div>
        </div>

        {/* audio controls */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.9rem", width: "260px" }}>
          <button
            onClick={togglePlay}
            aria-label={playing ? "一時停止" : "再生"}
            style={{
              background: "none",
              border: "1px solid var(--accent-light)",
              color: "var(--accent-light)",
              width: "2.8rem", height: "2.8rem",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "0.85rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "var(--accent-light)"; el.style.color = "var(--bg)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "none"; el.style.color = "var(--accent-light)"; }}
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

          <div
            onClick={seek}
            style={{ width: "100%", height: "2px", background: "var(--border)", cursor: "pointer", position: "relative" }}
          >
            <div style={{ width: `${progress}%`, height: "100%", background: "var(--accent-light)", transition: "width 0.25s linear" }} />
          </div>
        </div>

        {/* dots */}
        <div style={{ display: "flex", gap: "0.45rem", marginTop: "2.5rem", flexWrap: "wrap", justifyContent: "center", maxWidth: "320px" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`スライド ${i + 1}`}
              style={{
                width: i === current ? "1.4rem" : "0.4rem",
                height: "0.4rem",
                background: i === current ? "var(--accent-light)" : "var(--border)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      <audio ref={audioRef} />

      {/* scroll indicator */}
      <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", opacity: 0.4 }}>
        <div style={{ width: "1px", height: "40px", background: "var(--fg-muted)", animation: "scrollLine 1.6s ease-in-out infinite" }} />
        <style>{`@keyframes scrollLine { 0%,100% { opacity:1; transform:scaleY(1); transform-origin:top; } 50% { opacity:0.3; transform:scaleY(0.5); transform-origin:top; } }`}</style>
      </div>
    </section>
  );
}
