import { CANVAS_DIMENSIONS_IN_INCHES } from "../constants";
import { type ImageDetails, type ExportDetails } from "../types";
import {
  convertPixelsToInches,
  convertInchesToPixels,
} from "../utils/pixelsInchesConverter";

export function convertImageDetailsToInches(imageDetails: ImageDetails) {
  const { x, y, width, height } = imageDetails;

  const result = {
    ...imageDetails,
    ...{
      x: convertPixelsToInches(x),
      y: convertPixelsToInches(y),
      width: convertPixelsToInches(width),
      height: convertPixelsToInches(height),
    },
  };
  return result;
}

export function convertImageDetailsToPixels(imageDetails: ImageDetails) {
  const { x, y, width, height } = imageDetails;
  return {
    ...imageDetails,
    ...{
      x: convertInchesToPixels(x),
      y: convertInchesToPixels(y),
      width: convertInchesToPixels(width),
      height: convertInchesToPixels(height),
    },
  };
}

export function exportDetails(imageDetails: ImageDetails): ExportDetails {
  return {
    canvas: {
      width: CANVAS_DIMENSIONS_IN_INCHES.width,
      height: CANVAS_DIMENSIONS_IN_INCHES.height,
      photo: convertImageDetailsToInches(imageDetails),
    },
  };
}
