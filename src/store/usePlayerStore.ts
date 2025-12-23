import { create } from "zustand";

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  src: string; // URL to the video stream/file
}

interface PlayerState {
  currentVideo: Video | null;
  isMinimized: boolean;
  playVideo: (video: Video) => void;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentVideo: null,
  isMinimized: false,
  playVideo: (video) => set({ currentVideo: video, isMinimized: false }),
  minimize: () => set({ isMinimized: true }),
  maximize: () => set({ isMinimized: false }),
  close: () => set({ currentVideo: null, isMinimized: false }),
}));
