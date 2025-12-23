"use client";

import { useMiniPlayerLogic } from "@/hooks/useMiniPlayerLogic";
import { usePlayerStore } from "@/store/usePlayerStore";
import { motion } from "framer-motion";
import { GripHorizontal, Maximize2, Minimize2, X } from "lucide-react";

export const MiniPlayer = () => {
  const { currentVideo, isMinimized, minimize, maximize, close } =
    usePlayerStore();

  const { controls, handleDragEnd } = useMiniPlayerLogic(
    isMinimized,
    !!currentVideo
  );

  if (!currentVideo) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <motion.div
        initial={false}
        animate={controls}
        drag={isMinimized}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onTap={() => {
          if (isMinimized) maximize();
        }}
        className="absolute bg-black shadow-2xl overflow-hidden pointer-events-auto"
        style={{
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: 1,
          scale: 1,
        }}
      >
        <video
          src={currentVideo.src}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          controls={!isMinimized}
        />

        <div className="absolute inset-0 pointer-events-none">
          {/* Reduced padding on mobile via sm:p-4 p-2 */}
          <div className="absolute top-0 left-0 right-0 p-2 sm:p-4 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent pointer-events-auto">
            {isMinimized && (
              <div className="cursor-move text-white/80 hover:text-white mr-auto active:cursor-grabbing hidden sm:block">
                <GripHorizontal />
              </div>
            )}

            <div className="flex gap-2 ml-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isMinimized) {
                    maximize();
                  } else {
                    minimize();
                  }
                }}
                className={`p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors ${
                  isMinimized ? "hidden sm:block" : ""
                }`}
              >
                {isMinimized ? (
                  <Maximize2 size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Minimize2 size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="p-1.5 sm:p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white backdrop-blur-md transition-colors"
              >
                <X size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
