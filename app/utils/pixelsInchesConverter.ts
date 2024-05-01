import { PIXELS_TO_INCHES_RATIO } from "../constants";

export const convertPixelsToInches = (px: number) => {
  return px / PIXELS_TO_INCHES_RATIO;
};

export const convertInchesToPixels = (inches: number) => {
  return inches * PIXELS_TO_INCHES_RATIO;
};
