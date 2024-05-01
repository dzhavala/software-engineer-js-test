import { type CanvasDimensions, type ImageDetails } from "./types";

export const PIXELS_TO_INCHES_RATIO = 50;
export const CANVAS_DIMENSIONS_IN_INCHES: CanvasDimensions = {
  width: 15,
  height: 10,
};

export const CANVAS_DIMENSIONS: CanvasDimensions = {
  width: CANVAS_DIMENSIONS_IN_INCHES.width * PIXELS_TO_INCHES_RATIO,
  height: CANVAS_DIMENSIONS_IN_INCHES.height * PIXELS_TO_INCHES_RATIO,
};

export const defaultImageDatails: ImageDetails = {
  id: "",
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  src: "",
};
