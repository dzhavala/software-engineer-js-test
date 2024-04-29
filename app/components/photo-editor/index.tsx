import React, { useState, useEffect, MouseEvent } from "react";
import { CANVAS_DIMENSIONS } from "../../constants";
import { type ImageDetails } from "../../types";
import Canvas from "../Canvas";
import Toolbar from "../Toolbar";

const PhotoEditor: React.FC = () => {
  const [image, setImage] = useState<ImageDetails | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );

  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [disableXOffset, setDisableXOffset] = useState<boolean>(true);
  const [disableYOffset, setDisableYOffset] = useState<boolean>(true);
  const [maxOffsetX, setMaxOffsetX] = useState<number>(0);
  const [minOffsetX, setMinOffsetX] = useState<number>(0);
  const [maxOffsetY, setMaxOffsetY] = useState<number>(0);
  const [minOffsetY, setMinOffsetY] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [prevX, setPrevX] = useState<number>(0);
  const [prevY, setPrevY] = useState<number>(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage({
          data: reader.result as string,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        });

        setOffsetX(0);
        setOffsetY(0);
        setDisableXOffset(false);
        setDisableYOffset(false);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  useEffect(() => {
    if (!image) {
      setDisableXOffset(true);
      setDisableYOffset(true);
    }
  }, [image?.data]);

  useEffect(() => {
    if (image) {
      renderImageOnCanvas();
    }
  }, [image?.data, CANVAS_DIMENSIONS, offsetX, offsetY]);

  const renderImageOnCanvas = () => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      let width, height;
      if (aspectRatio < 1) {
        width = CANVAS_DIMENSIONS.width;
        height = CANVAS_DIMENSIONS.width / aspectRatio;
      } else {
        width = CANVAS_DIMENSIONS.height * aspectRatio;
        height = CANVAS_DIMENSIONS.height;
      }
      const x = (CANVAS_DIMENSIONS.width - width) / 2 + offsetX;
      const y = (CANVAS_DIMENSIONS.height - height) / 2 + offsetY;

      // Ensure image covers the canvas
      const maxOffsetX = (width - CANVAS_DIMENSIONS.width) / 2;
      const maxOffsetY = (height - CANVAS_DIMENSIONS.height) / 2;
      setMaxOffsetX(maxOffsetX);
      setMinOffsetX(-maxOffsetX);
      setMaxOffsetY(maxOffsetY);
      setMinOffsetY(-maxOffsetY);

      setImage({
        data: image?.data,
        x,
        y,
        width,
        height,
      });

      setDisableXOffset(width <= CANVAS_DIMENSIONS.width);
      setDisableYOffset(height <= CANVAS_DIMENSIONS.height);

      setImageElement(img);
    };
    img.src = image?.data as string;
  };

  const handleOffsetXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffsetX(parseInt(e.target.value));
  };

  const handleOffsetYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffsetY(parseInt(e.target.value));
  };

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    setDragging(true);
    setPrevX(e.clientX);
    setPrevY(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (dragging) {
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      const newOffsetX = Math.min(
        Math.max(offsetX + dx, minOffsetX),
        maxOffsetX
      );
      const newOffsetY = Math.min(
        Math.max(offsetY + dy, minOffsetY),
        maxOffsetY
      );
      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
      setPrevX(e.clientX);
      setPrevY(e.clientY);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div>
      <Toolbar
        minOffsetX={minOffsetX}
        maxOffsetX={maxOffsetX}
        offsetX={offsetX}
        handleOffsetXChange={handleOffsetXChange}
        disableXOffset={disableXOffset}
        minOffsetY={minOffsetY}
        maxOffsetY={maxOffsetY}
        offsetY={offsetY}
        handleOffsetYChange={handleOffsetYChange}
        disableYOffset={disableYOffset}
        handleImageUpload={handleImageUpload}
      />

      <Canvas
        canvasWidth={CANVAS_DIMENSIONS.width}
        canvasHeight={CANVAS_DIMENSIONS.height}
        image={image}
        imageElement={imageElement}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export { PhotoEditor };
