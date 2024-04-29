import React, { useRef } from "react";

import { type ImageDetails } from "../types";

interface CanvasProps {
  imageElement: HTMLImageElement | null | undefined;
  image: ImageDetails | null | undefined;
  canvasWidth: number;
  canvasHeight: number;
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

const Canvas = ({
  imageElement,
  image,
  canvasWidth,
  canvasHeight,
  ...rest
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext("2d");

    if (ctx && image && imageElement) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const { x, y, width, height } = image;
      ctx.drawImage(imageElement, x, y, width, height);
    }
  }

  return (
    <>
      <h2>Canvas</h2>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: "1px solid red" }}
        {...rest}
      />
    </>
  );
};

export default Canvas;
