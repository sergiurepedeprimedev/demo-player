import { useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const DESKTOP_WIDTH = 320;
const DESKTOP_HEIGHT = 180;

const MOBILE_WIDTH = 100;
const MOBILE_HEIGHT = 180;

const PADDING = 16;
const TOP_PADDING = 20;
const BOTTOM_PADDING = 20;

export const useMiniPlayerLogic = (isMinimized: boolean, isActive: boolean) => {
  const controls = useAnimation();
  const lastSnapIndex = useRef<number>(7);

  const getSnapPoints = (width: number, height: number, isMobile: boolean) => {
    const currentWidth = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
    const currentHeight = isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;

    const leftX = PADDING;
    const centerX = width / 2 - currentWidth / 2;
    const rightX = width - currentWidth - PADDING;

    const topY = TOP_PADDING;
    const middleY = height / 2 - currentHeight / 2;
    const bottomY = height - currentHeight - BOTTOM_PADDING;

    if (isMobile) {
      return [
        { x: leftX, y: topY }, // 0
        { x: centerX, y: topY }, // 1
        { x: rightX, y: topY }, // 2
        { x: leftX, y: middleY }, // 3
        { x: rightX, y: middleY }, // 4
        { x: leftX, y: bottomY }, // 5
        { x: centerX, y: bottomY }, // 6
        { x: rightX, y: bottomY }, // 7
      ];
    } else {
      const dTopY = PADDING;
      const dBottomY = height - currentHeight - PADDING;
      const dMiddleY = height / 2 - currentHeight / 2;

      return [
        { x: leftX, y: dTopY },
        { x: centerX, y: dTopY },
        { x: rightX, y: dTopY },
        { x: rightX, y: dMiddleY },
        { x: rightX, y: dBottomY },
        { x: centerX, y: dBottomY },
        { x: leftX, y: dBottomY },
        { x: leftX, y: dMiddleY },
      ];
    }
  };

  useEffect(() => {
    if (!isActive) return;

    if (isMinimized) {
      const handleResize = () => {
        const isMobile = window.innerWidth < 600;
        const currentWidth = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
        const currentHeight = isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;

        const snapPoints = getSnapPoints(
          window.innerWidth,
          window.innerHeight,
          isMobile
        );

        const targetSnap = snapPoints[lastSnapIndex.current] || snapPoints[7];

        controls.start({
          x: targetSnap.x,
          y: targetSnap.y,
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

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent) => {
    if (!isMinimized) return;

    // Use native event coordinates to ensure we get Viewport (clientX/Y) relative values
    // ignoring scroll position which info.point sometimes includes or misinterprets in complex fixed contexts.
    let clientX, clientY;

    if ("changedTouches" in event && event.changedTouches.length > 0) {
      // Touch event
      clientX = event.changedTouches[0].clientX;
      clientY = event.changedTouches[0].clientY;
    } else {
      // Mouse event
      const mouseEvent = event as MouseEvent;
      clientX = mouseEvent.clientX;
      clientY = mouseEvent.clientY;
    }

    const { innerWidth, innerHeight } = window;
    const isMobile = innerWidth < 600;

    const currentWidth = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
    const currentHeight = isMobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;

    const snapPoints = getSnapPoints(innerWidth, innerHeight, isMobile);

    let closestPoint = snapPoints[0];
    let minDistance = Infinity;
    let closestIndex = 0;

    snapPoints.forEach((point, index) => {
      const snapCenterX = point.x + currentWidth / 2;
      const snapCenterY = point.y + currentHeight / 2;

      // Distance from Pointer (Viewport) to Snap Center (Viewport)
      const dist = Math.hypot(clientX - snapCenterX, clientY - snapCenterY);

      if (dist < minDistance) {
        minDistance = dist;
        closestPoint = point;
        closestIndex = index;
      }
    });

    lastSnapIndex.current = closestIndex;

    controls.start({
      x: closestPoint.x,
      y: closestPoint.y,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    });
  };

  return { controls, handleDragEnd };
};
