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
        onClick={prev} disabled={!hasPrev} aria-label="前のトラック"
        style={{ background:"none", border:"none", color: hasPrev ? "var(--fg)" : "var(--border)", cursor: hasPrev ? "pointer" : "default", padding:"0.2rem 0.4rem", display:"flex", alignItems:"center" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <polygon points="8,2 2,8 8,14" /><rect x="9" y="2" width="3" height="12" />
        </svg>
      </button>
      <button
        onClick={isPlaying ? pause : resume} aria-label={isPlaying ? "一時停止" : "再生"}
        style={{ background:"var(--accent)", border:"none", color:"#fff", cursor:"pointer", width:"34px", height:"34px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}
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
        onClick={next} disabled={!hasNext} aria-label="次のトラック"
        style={{ background:"none", border:"none", color: hasNext ? "var(--fg)" : "var(--border)", cursor: hasNext ? "pointer" : "default", padding:"0.2rem 0.4rem", display:"flex", alignItems:"center" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <polygon points="8,2 14,8 8,14" /><rect x="4" y="2" width="3" height="12" />
        </svg>
      </button>
    </>
  );

  const SeekBar = () => (
    <>
      <span style={{ fontSize:"0.58rem", color:"var(--fg-muted)", flexShrink:0 }}>{fmt(progress)}</span>
      <div
        ref={progressRef} onClick={seek}
        style={{ flex:1, height:"3px", background:"var(--border)", cursor:"pointer", position:"relative", minWidth:0 }}
      >
        <div style={{
          position:"absolute", left:0, top:0, height:"100%",
          width:`${duration ? (progress / duration) * 100 : 0}%`,
          background:"var(--accent)", transition:"width 0.3s linear",
        }} />
      </div>
      <span style={{ fontSize:"0.58rem", color:"var(--fg-muted)", flexShrink:0 }}>{fmt(duration)}</span>
    </>
  );

  return (
    <>
      <style>{`
        /* ── デスクトップ ── */
        .player-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 1000;
          background: rgba(14, 24, 30, 0.97);
          border-top: 1px solid var(--border);
          backdrop-filter: blur(12px);
          padding: 0.6rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .player-info {
          min-width: 0;
          flex: 1 1 0;
          max-width: 200px;
        }
        .player-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--fg);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .player-album {
          font-size: 0.6rem;
          color: var(--fg-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .player-controls-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        .player-seek-row {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 0;
        }
        .player-volume {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
        }
        /* モバイル統合行はデスクトップで非表示 */
        .player-mobile-bottom {
          display: none;
        }

        /* ── モバイル: ジャケット左・タイトル右上・コントロール右下 ── */
        @media (max-width: 640px) {
          .player-bar {
            display: grid;
            grid-template-columns: 52px 1fr;
            grid-template-rows: auto auto;
            align-items: center;
            column-gap: 0.7rem;
            row-gap: 0.4rem;
            padding: 0.6rem 0.85rem 0.65rem;
          }
          .player-jacket {
            grid-column: 1;
            grid-row: 1 / 3;
            align-self: center;
          }
          .player-info {
            grid-column: 2;
            grid-row: 1;
            max-width: none;
          }
          .player-title {
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
            line-height: 1.3;
            font-size: 0.8rem;
          }
          .player-album { display: none; }
          /* デスクトップ専用の行をモバイルで隠す */
          .player-controls-row { display: none !important; }
          .player-seek-row { display: none !important; }
          .player-volume { display: none !important; }
          /* モバイル統合行を表示 */
          .player-mobile-bottom {
            grid-column: 2;
            grid-row: 2;
            display: flex;
            align-items: center;
            gap: 0.35rem;
            min-width: 0;
          }
        }
      `}</style>

      <div className="player-bar">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio ref={audioRef} />

        {/* ジャケット */}
        {currentTrack.jacket ? (
          <div
            className="player-jacket"
            style={{ width:"52px", height:"52px", flexShrink:0, overflow:"hidden", border:"1px solid var(--border)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentTrack.jacket} alt={currentTrack.albumTitle}
              style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          </div>
        ) : (
          /* ジャケットなし時はグリッドの穴埋め */
          <div className="player-jacket" style={{ width:"52px", height:"52px", flexShrink:0, background:"var(--card-bg)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="var(--fg-muted)">
              <circle cx="10" cy="10" r="4" /><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
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
          <span style={{ fontSize:"0.75rem", color:"var(--fg-muted)" }}>🔊</span>
          <input type="range" min={0} max={1} step={0.01} value={volume} onChange={changeVolume}
            style={{ width:"64px", accentColor:"var(--accent)" }} />
        </div>
      </div>
    </>
  );
}
