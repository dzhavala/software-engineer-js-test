import { type ImageDetails } from "../types";
import { CANVAS_DIMENSIONS, defaultImageDatails } from "../constants";
import { generateId } from "../utils/imageIdGenerator";

type imageDetailsCreatorProps = {
  imageElement: HTMLImageElement | null;
  x?: number;
  y?: number;
  id?: string;
};

export default function imageDetailsCreator({
  imageElement,
  x,
  y,
  id,
}: imageDetailsCreatorProps): ImageDetails {
  if (!imageElement) {
    return defaultImageDatails;
  }

  let newId: string = "";
  if (!id) {
    newId = generateId();
  }

  const aspectRatio = imageElement.width / imageElement.height;
  let width,
    height,
    newX = 0,
    newY = 0;
  if (aspectRatio < 1) {
    width = CANVAS_DIMENSIONS.width;
    height = CANVAS_DIMENSIONS.width / aspectRatio;
    newY = (CANVAS_DIMENSIONS.height - height) / 2;
  } else {
    width = CANVAS_DIMENSIONS.height * aspectRatio;
    height = CANVAS_DIMENSIONS.height;
    newX = (CANVAS_DIMENSIONS.width - width) / 2;
  }

  return {
    id: id ?? newId,
    src: imageElement.src,
    x: x ?? newX,
    y: y ?? newY,
    width,
    height,
  };
}
