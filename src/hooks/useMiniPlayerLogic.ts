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
        // Default to bottom right on initial minimize
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

      // Only run initial placement if we aren't already minimized (to avoid resetting position on re-renders)
      // But simpler for this demo: always snap to bottom right on mount/resize if minimized.
      // A more complex app would store the last position.
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

    const { x, y } = info.point; // pointer position
    const { innerWidth, innerHeight } = window;

    // Define snap points
    // x: PADDING (Left), innerWidth/2 - MINI_WIDTH/2 (Center), innerWidth - MINI_WIDTH - PADDING (Right)
    // y: PADDING (Top), innerHeight/2 - MINI_HEIGHT/2 (Middle), innerHeight - MINI_HEIGHT - PADDING (Bottom)

    const leftX = PADDING;
    const centerX = innerWidth / 2 - MINI_WIDTH / 2;
    const rightX = innerWidth - MINI_WIDTH - PADDING;

    const topY = PADDING;
    const middleY = innerHeight / 2 - MINI_HEIGHT / 2;
    const bottomY = innerHeight - MINI_HEIGHT - PADDING;

    // Possible snap coordinates
    const snapPoints = [
      { x: leftX, y: topY }, // Top-Left
      { x: centerX, y: topY }, // Top-Center
      { x: rightX, y: topY }, // Top-Right
      { x: rightX, y: middleY }, // Middle-Right
      { x: rightX, y: bottomY }, // Bottom-Right
      { x: centerX, y: bottomY }, // Bottom-Center
      { x: leftX, y: bottomY }, // Bottom-Left
      { x: leftX, y: middleY }, // Middle-Left
    ];

    // Find closest snap point
    // We calculate distance from the *pointer* to the center of each potential snap slot?
    // Or closer: distance from current element center to snap slot center?
    // Framer gives us 'point' which is mouse position.
    // Let's approximate by finding which snap point is closest to the mouse relative to the box size.
    // Actually, closest distance to the top-left coordinate of the snap point works if we adjust mouse pos by half width/height.

    // Let's assume the user is dragging from the center of the player roughly.
    const projectedCenterX = x; // simplistic assumption
    const projectedCenterY = y;

    let closestPoint = snapPoints[0];
    let minDistance = Infinity;

    snapPoints.forEach((point) => {
      // Calculate center of this snap point
      const snapCenterX = point.x + MINI_WIDTH / 2;
      const snapCenterY = point.y + MINI_HEIGHT / 2;

      const dist = Math.hypot(
        projectedCenterX - snapCenterX,
        projectedCenterY - snapCenterY
      );

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
