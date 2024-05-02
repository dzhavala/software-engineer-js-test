import {
  convertImageDetailsToInches,
  convertImageDetailsToPixels,
  exportDetails,
} from "../exportDetailsGenerator"; // Replace "./exampleFile" with the path to your file
import { type ImageDetails } from "../../types";
import { CANVAS_DIMENSIONS_IN_INCHES } from "../../constants";

// Mocks
jest.mock("../pixelsInchesConverter", () => ({
  convertPixelsToInches: jest.fn((value) => value / 10), // Mock conversion functions to return dummy value for simplicity
  convertInchesToPixels: jest.fn((value) => value * 10),
}));

// Constants
const mockImageDetails: ImageDetails = {
  id: "id1",
  src: "data:src",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
}; // Mock image details

describe("convertImageDetailsToInches", () => {
  it("should convert image details to inches", () => {
    const result = convertImageDetailsToInches(mockImageDetails);

    expect(result).toEqual({
      height: 10,
      id: "id1",
      src: "data:src",
      width: 10,
      x: 0,
      y: 0,
    });
  });
});

describe("convertImageDetailsToPixels", () => {
  it("should convert image details to pixels", () => {
    const result = convertImageDetailsToPixels(mockImageDetails);

    expect(result).toEqual({
      height: 1000,
      id: "id1",
      src: "data:src",
      width: 1000,
      x: 0,
      y: 0,
    });
  });
});

describe("exportDetails", () => {
  it("should export image details", () => {
    const result = exportDetails(mockImageDetails);

    const expectedExportDetails = {
      canvas: {
        width: CANVAS_DIMENSIONS_IN_INCHES.width,
        height: CANVAS_DIMENSIONS_IN_INCHES.height,
        photo: {
          id: "id1",
          src: "data:src",
          x: 0,
          y: 0,
          width: 10,
          height: 10,
        },
      },
    };

    expect(result).toEqual(expectedExportDetails);
  });
});
