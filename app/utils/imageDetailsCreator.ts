import { type ImageDetails } from "../types";
import { CANVAS_DIMENSIONS, defaultImageDatails } from "../constants";

export default function imageDetailsCreator(
  imageElement: HTMLImageElement | null,
  offsetX = 0,
  offsetY = 0
): ImageDetails {
  if (!imageElement) {
    return defaultImageDatails;
  }

  const aspectRatio = imageElement.width / imageElement.height;
  let width, height;
  if (aspectRatio < 1) {
    width = CANVAS_DIMENSIONS.width;
    height = CANVAS_DIMENSIONS.width / aspectRatio;
  } else {
    width = CANVAS_DIMENSIONS.height * aspectRatio;
    height = CANVAS_DIMENSIONS.height;
  }

  return {
    data: imageElement.src,
    x: (CANVAS_DIMENSIONS.width - width) / 2 + offsetX,
    y: (CANVAS_DIMENSIONS.height - height) / 2 + offsetY,
    width,
    height,
  };
}
