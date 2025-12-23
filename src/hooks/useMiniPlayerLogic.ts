import { PanInfo, useAnimation } from "framer-motion";
import { useEffect } from "react";

const DESKTOP_WIDTH = 320;
const DESKTOP_HEIGHT = 180;

// Mobile Portrait Dimensions (9:16ish)
const MOBILE_WIDTH = 180;
const MOBILE_HEIGHT = 320;

const PADDING = 24;

export const useMiniPlayerLogic = (isMinimized: boolean, isActive: boolean) => {
  const controls = useAnimation();

  // Track dimensions to use in render/logic
  // We can't use simple constants if we want it responsive
  // but for the sake of the hook, we can calculate inside the effect/handler.

  useEffect(() => {
    if (!isActive) return;

    if (isMinimized) {
      const handleResize = () => {
        const isMobile = window.innerWidth < 600;

        const currentWidth = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
        const currentHeight = isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;

        let targetX;

        if (isMobile) {
          // Center horizontally on mobile
          targetX = window.innerWidth / 2 - currentWidth / 2;
        } else {
          targetX = window.innerWidth - currentWidth - PADDING;
        }

        const targetY = window.innerHeight - currentHeight - PADDING;

        controls.start({
          x: targetX,
          y: targetY,
          width: currentWidth,
          height: currentHeight,
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
    const isMobile = innerWidth < 600;

    const currentWidth = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
    const currentHeight = isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;

    const leftX = PADDING;
    const centerX = innerWidth / 2 - currentWidth / 2;
    const rightX = innerWidth - currentWidth - PADDING;

    const topY = PADDING;
    const middleY = innerHeight / 2 - currentHeight / 2;
    const bottomY = innerHeight - currentHeight - PADDING;

    let snapPoints = [];

    if (isMobile) {
      // Mobile: Vertical Column
      snapPoints = [
        { x: centerX, y: topY },
        { x: centerX, y: middleY },
        { x: centerX, y: bottomY },
      ];
    } else {
      // Desktop: 8pt Grid
      snapPoints = [
        { x: leftX, y: topY },
        { x: centerX, y: topY },
        { x: rightX, y: topY },
        { x: rightX, y: middleY },
        { x: rightX, y: bottomY },
        { x: centerX, y: bottomY },
        { x: leftX, y: bottomY },
        { x: leftX, y: middleY },
      ];
    }

    let closestPoint = snapPoints[0];
    let minDistance = Infinity;

    snapPoints.forEach((point) => {
      const snapCenterX = point.x + currentWidth / 2;
      const snapCenterY = point.y + currentHeight / 2;

      const dist = Math.hypot(x - snapCenterX, y - snapCenterY);

      if (dist < minDistance) {
        minDistance = dist;
        closestPoint = point;
      }
    });

    controls.start({
      x: closestPoint.x,
      y: closestPoint.y,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    });
  };

  return { controls, handleDragEnd };
};
