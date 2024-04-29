import { type ImageDetails } from "../types";
import { CANVAS_DIMENSIONS } from "../constants";

export default function imageDetailsCreator(
  imageElement: HTMLImageElement | null,
  offsetX = 0,
  offsetY = 0
): ImageDetails {
  let width = 0,
    height = 0,
    x = 0,
    y = 0;
  let data = "";

  if (imageElement) {
    const aspectRatio = imageElement.width / imageElement.height;

    if (aspectRatio < 1) {
      width = CANVAS_DIMENSIONS.width;
      height = CANVAS_DIMENSIONS.width / aspectRatio;
    } else {
      width = CANVAS_DIMENSIONS.height * aspectRatio;
      height = CANVAS_DIMENSIONS.height;
    }
    x = (CANVAS_DIMENSIONS.width - width) / 2 + offsetX;
    y = (CANVAS_DIMENSIONS.height - height) / 2 + offsetY;
    data = imageElement.src;
  }
  return {
    data,
    x,
    y,
    width,
    height,
  };
}
