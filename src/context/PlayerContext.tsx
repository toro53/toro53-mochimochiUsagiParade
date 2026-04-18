"use client";

import { createContext, useContext, useRef, useState, useCallback } from "react";

export type Track = {
  title: string;
  albumTitle: string;
  file: string;
  jacket?: string;
};

type PlayerContextType = {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  play: (track: Track, queue?: Track[]) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  prev: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback((track: Track, newQueue?: Track[]) => {
    setCurrentTrack(track);
    if (newQueue) setQueue(newQueue);
    setIsPlaying(true);
    // audioRef の src 変更と再生は AudioPlayer 側で useEffect で行う
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    audioRef.current?.play();
    setIsPlaying(true);
  }, []);

  const next = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex((t) => t.file === currentTrack.file);
    const nextTrack = queue[idx + 1];
    if (nextTrack) {
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
    }
  }, [currentTrack, queue]);

  const prev = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex((t) => t.file === currentTrack.file);
    const prevTrack = queue[idx - 1];
    if (prevTrack) {
      setCurrentTrack(prevTrack);
      setIsPlaying(true);
    }
  }, [currentTrack, queue]);

  return (
    <PlayerContext.Provider
      value={{ currentTrack, queue, isPlaying, play, pause, resume, next, prev, audioRef }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
