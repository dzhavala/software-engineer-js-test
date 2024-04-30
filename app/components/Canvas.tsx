import React, { useRef } from "react";
import { usePhotoEditor } from "../context/PhotoEditorContext";
import useImageOffsetDrag from "../hooks/useImageOffsetDrag";

interface CanvasProps {
  imageElement: HTMLImageElement | null | undefined;
  canvasWidth: number;
  canvasHeight: number;
}

const Canvas = ({
  imageElement,
  canvasWidth,
  canvasHeight,
  ...rest
}: CanvasProps) => {
  const { imageDetails } = usePhotoEditor();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { handleMouseDown, handleMouseMove, handleMouseUp } =
    useImageOffsetDrag();

  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext("2d");

    if (ctx && imageDetails && imageElement) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const { x, y, width, height } = imageDetails;
      ctx.drawImage(imageElement, x, y, width, height);
    }
  }

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ backgroundColor: "#ccc" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      {...rest}
    />
  );
};

export default Canvas;
