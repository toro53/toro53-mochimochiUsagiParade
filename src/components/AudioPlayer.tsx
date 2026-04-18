"use client";

import { useEffect, useRef, useState } from "react";
import { usePlayer } from "@/context/PlayerContext";

export default function AudioPlayer() {
  const { currentTrack, queue, isPlaying, play, pause, resume, next, prev, audioRef } =
    usePlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const progressRef = useRef<HTMLDivElement>(null);

  // src 変更時に再生
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = currentTrack.file;
    audio.volume = volume;
    if (isPlaying) audio.play().catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  // isPlaying 変化
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying, audioRef]);

  // 進捗更新
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onDuration = () => setDuration(audio.duration || 0);
    const onEnded = () => next();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDuration);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioRef, next]);

  const fmt = (s: number) => {
    if (!isFinite(s)) return "--:--";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  if (!currentTrack) return null;

  const playerStyle = `
    @media (max-width: 640px) {
      .player-jacket { display: none !important; }
      .player-volume { display: none !important; }
    }
  `;

  const idx = queue.findIndex((t) => t.file === currentTrack.file);
  const hasPrev = idx > 0;
  const hasNext = idx < queue.length - 1;

  return (
    <>
    <style>{playerStyle}</style>
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(14, 24, 30, 0.97)",
        borderTop: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        padding: "0.6rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      {/* hidden audio element */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} />

      {/* jacket – hidden on small screens */}
      {currentTrack.jacket && (
        <div
          className="player-jacket"
          style={{
            width: "44px",
            height: "44px",
            flexShrink: 0,
            overflow: "hidden",
            border: "1px solid var(--border)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentTrack.jacket}
            alt={currentTrack.albumTitle}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* track info */}
      <div style={{ minWidth: 0, flex: "1 1 0", maxWidth: "180px" }}>
        <div
          style={{
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "var(--fg)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {currentTrack.title}
        </div>
        <div
          style={{
            fontSize: "0.6rem",
            color: "var(--fg-muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {currentTrack.albumTitle}
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
        <button
          onClick={prev}
          disabled={!hasPrev}
          aria-label="前のトラック"
          style={{
            background: "none",
            border: "none",
            color: hasPrev ? "var(--fg)" : "var(--border)",
            cursor: hasPrev ? "pointer" : "default",
            fontSize: "1rem",
            padding: "0.2rem 0.4rem",
          }}
        >
          ◀◀
        </button>
        <button
          onClick={isPlaying ? pause : resume}
          aria-label={isPlaying ? "一時停止" : "再生"}
          style={{
            background: "var(--accent)",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          onClick={next}
          disabled={!hasNext}
          aria-label="次のトラック"
          style={{
            background: "none",
            border: "none",
            color: hasNext ? "var(--fg)" : "var(--border)",
            cursor: hasNext ? "pointer" : "default",
            fontSize: "1rem",
            padding: "0.2rem 0.4rem",
          }}
        >
          ▶▶
        </button>
      </div>

      {/* progress bar */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0 }}>
        <span style={{ fontSize: "0.6rem", color: "var(--fg-muted)", flexShrink: 0 }}>
          {fmt(progress)}
        </span>
        <div
          ref={progressRef}
          onClick={seek}
          style={{
            flex: 1,
            height: "3px",
            background: "var(--border)",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${duration ? (progress / duration) * 100 : 0}%`,
              background: "var(--accent)",
              transition: "width 0.3s linear",
            }}
          />
        </div>
        <span style={{ fontSize: "0.6rem", color: "var(--fg-muted)", flexShrink: 0 }}>
          {fmt(duration)}
        </span>
      </div>

      {/* volume – hidden on small screens */}
      <div className="player-volume" style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
        <span style={{ fontSize: "0.75rem", color: "var(--fg-muted)" }}>🔊</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={changeVolume}
          style={{ width: "64px", accentColor: "var(--accent)" }}
        />
      </div>
    </div>
    </>
  );
}
