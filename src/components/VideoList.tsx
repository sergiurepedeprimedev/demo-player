"use client";

import { MOCK_VIDEOS } from "@/data/mockVideos";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Play } from "lucide-react";

export const VideoList = () => {
  const playVideo = usePlayerStore((state) => state.playVideo);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {MOCK_VIDEOS.map((video) => (
        <div
          key={video.id}
          className="group relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-zinc-200 dark:border-zinc-800"
          onClick={() => playVideo(video)}
        >
          <div className="aspect-video relative overflow-hidden">
            {/* Using img tag to avoid Next.js Image configuration for external URLs in this demo */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                <Play className="w-5 h-5 text-black ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1 dark:text-white text-zinc-900">
              {video.title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
              {video.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
