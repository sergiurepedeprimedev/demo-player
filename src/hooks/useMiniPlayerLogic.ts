import { PanInfo, useAnimation } from "framer-motion";
import { useEffect } from "react";

const MINI_WIDTH = 320;
const MINI_HEIGHT = 180;
const PADDING = 24;

export const useMiniPlayerLogic = (isMinimized: boolean, isActive: boolean) => {
  const controls = useAnimation();

  useEffect(() => {
    if (!isActive) return;

    if (isMinimized) {
      const handleResize = () => {
        const targetX = window.innerWidth - MINI_WIDTH - PADDING;
        const targetY = window.innerHeight - MINI_HEIGHT - PADDING;

        controls.start({
          x: targetX,
          y: targetY,
          width: MINI_WIDTH,
          height: MINI_HEIGHT,
          opacity: 1,
          scale: 1,
          borderRadius: 12,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        });
      };

      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    } else {
      controls.start({
        x: 0,
        y: 0,
        width: "100%",
        height: "100%",
        opacity: 1,
        scale: 1,
        borderRadius: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  }, [isMinimized, isActive, controls]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (!isMinimized) return;

    const { x, y } = info.point;
    const { innerWidth, innerHeight } = window;

    const targetX =
      x < innerWidth / 2 ? PADDING : innerWidth - MINI_WIDTH - PADDING;
    const targetY =
      y < innerHeight / 2 ? PADDING : innerHeight - MINI_HEIGHT - PADDING;

    controls.start({
      x: targetX,
      y: targetY,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    });
  };

  return { controls, handleDragEnd };
};
