"use client";

import { useEffect } from "react";
import { usePlayer, Track } from "@/context/PlayerContext";
import { Work } from "@/data/works";

type Props = {
  w: Work;
  onClose: () => void;
};

export default function AlbumModal({ w, onClose }: Props) {
  const { play, currentTrack, isPlaying, pause, resume } = usePlayer();

  const toTrack = (t: { title: string; file: string }): Track => ({
    title: t.title,
    albumTitle: w.title,
    file: t.file,
    jacket: w.img,
  });

  const allTracks = w.tracks.map(toTrack);
  const isThisAlbum = currentTrack && allTracks.some((t) => t.file === currentTrack.file);

  const handleAlbumPlay = () => {
    if (allTracks.length === 0) return;
    if (isThisAlbum) {
      isPlaying ? pause() : resume();
    } else {
      play(allTracks[0], allTracks);
    }
  };

  const handleTrackPlay = (t: Track) => {
    if (currentTrack?.file === t.file) {
      isPlaying ? pause() : resume();
    } else {
      play(t, allTracks);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="disc-modal-overlay" onClick={onClose}>
      <div className="disc-modal-inner" onClick={(e) => e.stopPropagation()}>

        {/* ── 左: ジャケット ── */}
        <div className="disc-modal-jacket">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={w.img} alt={w.title} />
        </div>

        {/* ── 右: 情報 ── */}
        <div className="disc-modal-info">

          {/* 閉じるボタン */}
          <button className="disc-modal-close" onClick={onClose} aria-label="閉じる">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>

          {/* メタ情報 */}
          <div className="disc-modal-meta">
            <span className="disc-modal-event">{w.event}</span>
            <h2 className="disc-modal-title">{w.title}</h2>
            <p className="disc-modal-price">{w.price}</p>
          </div>

          {/* トラックリスト */}
          {allTracks.length > 0 && (
            <div className="disc-modal-tracks">
              <div className="disc-modal-track-label">Tracklist</div>
              <ol>
                {allTracks.map((t, i) => {
                  const active = currentTrack?.file === t.file;
                  return (
                    <li key={i} className={active ? "active" : ""}>
                      <button onClick={() => handleTrackPlay(t)}>
                        <span className="track-num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="track-title">{t.title}</span>
                        <span className="track-icon">
                          {active && isPlaying ? (
                            <svg width="8" height="8" viewBox="0 0 14 14" fill="currentColor">
                              <rect x="2" y="1" width="4" height="12" />
                              <rect x="8" y="1" width="4" height="12" />
                            </svg>
                          ) : (
                            <svg width="8" height="8" viewBox="0 0 14 14" fill="currentColor">
                              <polygon points="3,1 13,7 3,13" />
                            </svg>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* アクション */}
          <div className="disc-modal-actions">
            {allTracks.length > 0 && (
              <button className="disc-modal-play-btn" onClick={handleAlbumPlay}>
                {isThisAlbum && isPlaying ? (
                  <svg width="9" height="9" viewBox="0 0 14 14" fill="currentColor">
                    <rect x="2" y="1" width="4" height="12" />
                    <rect x="8" y="1" width="4" height="12" />
                  </svg>
                ) : (
                  <svg width="9" height="9" viewBox="0 0 14 14" fill="currentColor">
                    <polygon points="3,1 13,7 3,13" />
                  </svg>
                )}
                {isThisAlbum && isPlaying ? "Pause" : "Play All"}
              </button>
            )}
            <a
              className="disc-modal-booth-link"
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              BOOTH →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
