import { type ImageDetails } from "../types";
import { CANVAS_DIMENSIONS, defaultImageDatails } from "../constants";

export default function imageDetailsCreator(
  imageElement: HTMLImageElement | null,
  offsetX?: number,
  offsetY?: number
): ImageDetails {
  if (!imageElement) {
    return defaultImageDatails;
  }

  const aspectRatio = imageElement.width / imageElement.height;
  let width,
    height,
    x = 0,
    y = 0;
  if (aspectRatio < 1) {
    width = CANVAS_DIMENSIONS.width;
    height = CANVAS_DIMENSIONS.width / aspectRatio;
    y = (CANVAS_DIMENSIONS.height - height) / 2;
  } else {
    width = CANVAS_DIMENSIONS.height * aspectRatio;
    height = CANVAS_DIMENSIONS.height;
    x = (CANVAS_DIMENSIONS.width - width) / 2;
  }

  return {
    src: imageElement.src,
    x: offsetX ?? x,
    y: offsetY ?? y,
    width,
    height,
  };
}
