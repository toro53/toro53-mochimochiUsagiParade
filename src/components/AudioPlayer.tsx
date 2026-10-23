"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePlayer } from "@/context/PlayerContext";
import { works } from "@/data/works";
import AlbumModal from "@/components/AlbumModal";

export default function AudioPlayer() {
  const { currentTrack, queue, isPlaying, pause, resume, next, prev, audioRef } =
    usePlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [modalOpen, setModalOpen] = useState(false);
  // ドラッグ中のシーク位置 (0〜1)。null のときは再生位置をそのまま表示
  const [dragRatio, setDragRatio] = useState<number | null>(null);
  const draggingRef = useRef(false);
  const barRef = useRef<HTMLDivElement>(null);
  const hasTrack = currentTrack !== null;

  // バーの高さを --player-h に出す。アルバムモーダルはこの分だけ下を空けてバーを操作できるようにする
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty("--player-h", `${bar.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(bar);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--player-h");
    };
  }, [hasTrack]);

  // 現在再生中のアルバムを works から検索
  const currentWork = currentTrack
    ? works.find((w) => w.title === currentTrack.albumTitle) ?? null
    : null;

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

  // シークバーはデスクトップ用とモバイル用の 2 つあるので、ref ではなく操作中の要素から位置を取る
  const ratioAt = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  };

  const onSeekDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!duration) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    setDragRatio(ratioAt(e));
  };

  const onSeekMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    setDragRatio(ratioAt(e));
  };

  const onSeekUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const audio = audioRef.current;
    const t = ratioAt(e) * duration;
    if (audio) audio.currentTime = t;
    setProgress(t);
    setDragRatio(null);
  };

  const onSeekKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const step = e.key === "ArrowRight" ? 5 : e.key === "ArrowLeft" ? -5 : 0;
    if (!step) return;
    e.preventDefault();
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + step));
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

  const renderControls = () => (
    <>
      <button
        onClick={prev}
        disabled={!hasPrev}
        aria-label="前のトラック"
        className={`bg-transparent border-none p-[0.2rem_0.4rem] flex items-center ${hasPrev ? "text-fg cursor-pointer" : "text-border cursor-default"}`}
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
        className={`bg-transparent border-none p-[0.2rem_0.4rem] flex items-center ${hasNext ? "text-fg cursor-pointer" : "text-border cursor-default"}`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <polygon points="8,2 14,8 8,14" /><rect x="4" y="2" width="3" height="12" />
        </svg>
      </button>
    </>
  );

  const shownTime = dragRatio !== null ? dragRatio * duration : progress;
  const shownPct = duration ? (shownTime / duration) * 100 : 0;

  // コンポーネントにすると再描画のたびに作り直されてドラッグが切れるので、関数で JSX を返す
  const renderSeekBar = () => (
    <>
      <span className="text-[0.58rem] text-fg-muted flex-shrink-0 tabular-nums">{fmt(shownTime)}</span>
      <div
        role="slider"
        tabIndex={0}
        aria-label="再生位置"
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration)}
        aria-valuenow={Math.floor(shownTime)}
        aria-valuetext={fmt(shownTime)}
        onPointerDown={onSeekDown}
        onPointerMove={onSeekMove}
        onPointerUp={onSeekUp}
        onPointerCancel={() => {
          draggingRef.current = false;
          setDragRatio(null);
        }}
        onKeyDown={onSeekKey}
        className="seek-bar flex-1 h-[16px] flex items-center cursor-pointer relative min-w-0 touch-none group"
      >
        <div className="w-full h-[3px] bg-border relative">
          <div
            className={`absolute left-0 top-0 h-full bg-accent ${dragRatio === null ? "transition-[width] duration-300 ease-linear" : ""}`}
            style={{ width: `${shownPct}%` }}
          />
          <div
            className={`absolute top-1/2 w-[10px] h-[10px] -ml-[5px] -mt-[5px] rounded-full bg-accent transition-opacity ${dragRatio !== null ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}
            style={{ left: `${shownPct}%` }}
          />
        </div>
      </div>
      <span className="text-[0.58rem] text-fg-muted flex-shrink-0 tabular-nums">{fmt(duration)}</span>
    </>
  );

  return (
    <div className="player-bar" ref={barRef}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} />

      {/* ジャケット (クリックでモーダル) */}
      {currentTrack.jacket ? (
        <button
          className="player-jacket w-[52px] h-[52px] flex-shrink-0 overflow-hidden border border-border p-0 bg-transparent cursor-pointer relative group"
          onClick={() => currentWork && setModalOpen(true)}
          aria-label="アルバム詳細を表示"
          title={currentWork ? "アルバム詳細を表示" : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentTrack.jacket}
            alt={currentTrack.albumTitle}
            className="w-full h-full object-cover"
          />
          {currentWork && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#fff">
                <polygon points="3,1 13,7 3,13" />
              </svg>
            </div>
          )}
        </button>
      ) : (
        <div className="player-jacket w-[52px] h-[52px] flex-shrink-0 bg-card border border-border flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="var(--fg-muted)">
            <circle cx="10" cy="10" r="4" />
            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {/* アルバムモーダル — fixed 親の外に Portal でレンダリング */}
      {modalOpen && currentWork &&
        createPortal(
          <AlbumModal w={currentWork} onClose={() => setModalOpen(false)} />,
          document.body
        )
      }

      {/* トラック情報 */}
      <div className="player-info">
        <div className="player-title">{currentTrack.title}</div>
        <div className="player-album">{currentTrack.albumTitle}</div>
      </div>

      {/* デスクトップ: コントロール */}
      <div className="player-controls-row">
        {renderControls()}
      </div>

      {/* デスクトップ: シークバー */}
      <div className="player-seek-row">
        {renderSeekBar()}
      </div>

      {/* モバイル: コントロール＋シーク 統合行 */}
      <div className="player-mobile-bottom">
        {renderControls()}
        {renderSeekBar()}
      </div>

      {/* 音量 (デスクトップのみ) */}
      <div className="player-volume">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent-light flex-shrink-0" aria-hidden="true">
          <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z"/>
        </svg>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={changeVolume}
          className="volume-slider w-16"
          style={{ "--vol": `${volume * 100}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
