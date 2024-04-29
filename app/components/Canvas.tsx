import React, { useRef } from "react";

import { type ImageDetails } from "../types";

interface CanvasProps {
  imageElement: HTMLImageElement | null | undefined;
  imageDetails: ImageDetails | null | undefined;
  canvasWidth: number;
  canvasHeight: number;
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

const Canvas = ({
  imageElement,
  imageDetails,
  canvasWidth,
  canvasHeight,
  ...rest
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      {...rest}
    />
  );
};

export default Canvas;
