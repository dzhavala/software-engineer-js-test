import React, { useState, useEffect, MouseEvent, useMemo } from "react";
import { CANVAS_DIMENSIONS } from "../../constants";
import { type ImageDetails } from "../../types";
import Canvas from "../Canvas";
import Toolbar from "../Toolbar";
import uploadImage from "../../utils/fileReader";
import imageCreator from "../../utils/imageCreator";
import imageDetailsCreator from "../../utils/imageDetailsCreator";

const PhotoEditor: React.FC = () => {
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

  const imageDetails: ImageDetails = useMemo(
    () => imageDetailsCreator(imageElement, offsetX, offsetY),
    [imageElement, offsetX, offsetY]
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      alert("Please upload a valid image file.");
      return;
    }

    let imageDataUrl = "";
    let imageElement = null;
    try {
      imageDataUrl = await uploadImage(file);
    } catch (error) {
      alert(`Error uploading image: , ${(error as Error).message}`);
    }

    try {
      imageElement = await imageCreator(imageDataUrl);
    } catch (error) {
      alert(`Error generating img element: , ${(error as Error).message}`);
    }

    setImageElement(imageElement);
  };

  useEffect(() => {
    if (!imageElement) {
      setDisableXOffset(true);
      setDisableYOffset(true);
    } else {
      setOffsetX(0);
      setOffsetY(0);
      setDisableXOffset(false);
      setDisableYOffset(false);
    }
  }, [imageElement]);

  useEffect(() => {
    // Ensure image covers the canvas
    const maxOffsetXVal = (imageDetails.width - CANVAS_DIMENSIONS.width) / 2;
    const maxOffsetYVal = (imageDetails.height - CANVAS_DIMENSIONS.height) / 2;
    setMaxOffsetX(maxOffsetXVal);
    setMinOffsetX(-maxOffsetXVal);
    setMaxOffsetY(maxOffsetYVal);
    setMinOffsetY(-maxOffsetYVal);
    setDisableXOffset(imageDetails.width <= CANVAS_DIMENSIONS.width);
    setDisableYOffset(imageDetails.height <= CANVAS_DIMENSIONS.height);
  }, [imageDetails.data]);

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
        imageDetails={imageDetails}
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
