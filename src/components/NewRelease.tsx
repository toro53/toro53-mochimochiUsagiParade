"use client";

import { usePlayer, Track } from "@/context/PlayerContext";
import { works } from "@/data/works";

export default function NewRelease() {
  const { play, currentTrack, isPlaying, pause, resume } = usePlayer();

  const w = works.find((w) => w.event === "最新作") ?? works[0];

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

  return (
    <section className="py-16 px-8 border-b border-border">
      <div className="max-w-[960px] mx-auto">

        {/* ラベル */}
        <div className="flex items-center gap-3 mb-8">
          <span className="section-label mb-0">New Release</span>
          <span className="text-[0.45rem] tracking-[0.2em] text-accent border border-accent px-2 py-[0.2rem]">
            NEW
          </span>
        </div>

        {/* 本体: ジャケット + 情報 */}
        <div className="flex flex-col sm:flex-row gap-8">

          {/* ジャケット */}
          <div className="w-full sm:w-[220px] flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={w.img}
              alt={w.title}
              className="w-full aspect-square object-cover block"
            />
          </div>

          {/* 情報 */}
          <div className="flex flex-col justify-between gap-6 flex-1 min-w-0">

            {/* メタ */}
            <div>
              <p className="text-[0.55rem] tracking-[0.18em] text-fg-muted mb-1">
                {w.event}
              </p>
              <h2 className="text-[1.4rem] font-bold text-fg leading-[1.35] m-0">
                {w.title}
              </h2>
            </div>

            {/* トラックリスト */}
            {allTracks.length > 0 && (
              <ol className="flex flex-col gap-1 m-0 p-0 list-none">
                {allTracks.map((t, i) => {
                  const active = currentTrack?.file === t.file;
                  return (
                    <li key={i}>
                      <button
                        onClick={() => handleTrackPlay(t)}
                        className={[
                          "w-full flex items-center gap-3 px-3 py-[0.55rem] text-left",
                          "border border-transparent transition-colors",
                          "hover:border-border hover:bg-white/[0.03]",
                          active ? "text-accent" : "text-fg",
                        ].join(" ")}
                      >
                        <span className="text-[0.5rem] tracking-[0.1em] text-fg-muted w-5 flex-shrink-0">
                          {active && isPlaying ? (
                            <svg width="8" height="8" viewBox="0 0 14 14" fill="currentColor">
                              <rect x="2" y="1" width="4" height="12" />
                              <rect x="8" y="1" width="4" height="12" />
                            </svg>
                          ) : (
                            String(i + 1).padStart(2, "0")
                          )}
                        </span>
                        <span className="text-[0.75rem] tracking-[0.06em] flex-1 truncate">
                          {t.title}
                        </span>
                        {!active && (
                          <svg width="7" height="7" viewBox="0 0 14 14" fill="currentColor" className="text-fg-muted flex-shrink-0 opacity-40">
                            <polygon points="3,1 13,7 3,13" />
                          </svg>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            )}

            {/* Play All */}
            {allTracks.length > 0 && (
              <div>
                <button
                  onClick={handleAlbumPlay}
                  className="flex items-center gap-2 border border-border text-fg-muted text-[0.55rem] tracking-[0.18em] px-4 py-[0.5rem] transition-colors hover:border-accent hover:text-accent cursor-pointer bg-transparent"
                >
                  {isThisAlbum && isPlaying ? (
                    <svg width="8" height="8" viewBox="0 0 14 14" fill="currentColor">
                      <rect x="2" y="1" width="4" height="12" />
                      <rect x="8" y="1" width="4" height="12" />
                    </svg>
                  ) : (
                    <svg width="8" height="8" viewBox="0 0 14 14" fill="currentColor">
                      <polygon points="3,1 13,7 3,13" />
                    </svg>
                  )}
                  {isThisAlbum && isPlaying ? "PAUSE" : "PLAY ALL"}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
