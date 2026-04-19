"use client";

import { useEffect, useRef, useState } from "react";
import { usePlayer } from "@/context/PlayerContext";

export default function AudioPlayer() {
  const { currentTrack, queue, isPlaying, pause, resume, next, prev, audioRef } =
    usePlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = currentTrack.file;
    audio.volume = volume;
    if (isPlaying) audio.play().catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying, audioRef]);

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

  const idx = queue.findIndex((t) => t.file === currentTrack.file);
  const hasPrev = idx > 0;
  const hasNext = idx < queue.length - 1;

  const Controls = () => (
    <>
      <button
        onClick={prev}
        disabled={!hasPrev}
        aria-label="前のトラック"
        className={`bg-transparent border-none p-[0.2rem_0.4rem] flex items-center cursor-${hasPrev ? "pointer" : "default"}`}
        style={{ color: hasPrev ? "var(--fg)" : "var(--border)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <polygon points="8,2 2,8 8,14" /><rect x="9" y="2" width="3" height="12" />
        </svg>
      </button>
      <button
        onClick={isPlaying ? pause : resume}
        aria-label={isPlaying ? "一時停止" : "再生"}
        className="bg-accent border-none text-white cursor-pointer w-[34px] h-[34px] rounded-full flex items-center justify-center flex-shrink-0"
      >
        {isPlaying ? (
          <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="1" width="4" height="12" /><rect x="8" y="1" width="4" height="12" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
            <polygon points="3,1 13,7 3,13" />
          </svg>
        )}
      </button>
      <button
        onClick={next}
        disabled={!hasNext}
        aria-label="次のトラック"
        className={`bg-transparent border-none p-[0.2rem_0.4rem] flex items-center cursor-${hasNext ? "pointer" : "default"}`}
        style={{ color: hasNext ? "var(--fg)" : "var(--border)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <polygon points="8,2 14,8 8,14" /><rect x="4" y="2" width="3" height="12" />
        </svg>
      </button>
    </>
  );

  const SeekBar = () => (
    <>
      <span className="text-[0.58rem] text-fg-muted flex-shrink-0">{fmt(progress)}</span>
      <div
        ref={progressRef}
        onClick={seek}
        className="flex-1 h-[3px] bg-border cursor-pointer relative min-w-0"
      >
        <div
          className="absolute left-0 top-0 h-full bg-accent transition-[width] duration-300 ease-linear"
          style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
        />
      </div>
      <span className="text-[0.58rem] text-fg-muted flex-shrink-0">{fmt(duration)}</span>
    </>
  );

  return (
    <div className="player-bar">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} />

      {/* ジャケット */}
      {currentTrack.jacket ? (
        <div
          className="player-jacket w-[52px] h-[52px] flex-shrink-0 overflow-hidden border border-border"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentTrack.jacket}
            alt={currentTrack.albumTitle}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="player-jacket w-[52px] h-[52px] flex-shrink-0 bg-card border border-border flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="var(--fg-muted)">
            <circle cx="10" cy="10" r="4" />
            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {/* トラック情報 */}
      <div className="player-info">
        <div className="player-title">{currentTrack.title}</div>
        <div className="player-album">{currentTrack.albumTitle}</div>
      </div>

      {/* デスクトップ: コントロール */}
      <div className="player-controls-row">
        <Controls />
      </div>

      {/* デスクトップ: シークバー */}
      <div className="player-seek-row">
        <SeekBar />
      </div>

      {/* モバイル: コントロール＋シーク 統合行 */}
      <div className="player-mobile-bottom">
        <Controls />
        <SeekBar />
      </div>

      {/* 音量 (デスクトップのみ) */}
      <div className="player-volume">
        <span className="text-[0.75rem] text-fg-muted">🔊</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={changeVolume}
          className="w-16 accent-accent"
        />
      </div>
    </div>
  );
}
