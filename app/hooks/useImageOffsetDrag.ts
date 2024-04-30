import React, { useState, useEffect, useRef } from "react";
import { useImageOffsetManagement } from "../context/ImageOffsetManagementContext";

const useImageOffsetDrag = () => {
  const { offsetX, setOffsetX, offsetY, setOffsetY } =
    useImageOffsetManagement();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [dragging, setDragging] = useState<boolean>(false);
  const [prevX, setPrevX] = useState<number>(offsetX.current);
  const [prevY, setPrevY] = useState<number>(offsetY.current);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDragging(true);
    setPrevX(e.clientX);
    setPrevY(e.clientY);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragging) {
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;

      const newOffsetX = Math.min(
        Math.max(offsetX.current + dx, offsetX.min),
        offsetX.max
      );

      const newOffsetY = Math.min(
        Math.max(offsetY.current + dy, offsetY.min),
        offsetY.max
      );

      setPrevX(e.clientX);
      setPrevY(e.clientY);

      setOffsetX({
        ...offsetX,
        current: newOffsetX,
      });

      setOffsetY({
        ...offsetY,
        current: newOffsetY,
      });
    }
  };

  return { canvasRef, handleMouseDown, handleMouseMove, handleMouseUp };
};

export default useImageOffsetDrag;
