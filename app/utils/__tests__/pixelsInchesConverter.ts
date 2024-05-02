import { convertPixelsToInches, convertInchesToPixels } from "../";
import { PIXELS_TO_INCHES_RATIO } from "../../constants";

describe("Utility Functions", () => {
  describe("convertPixelsToInches", () => {
    it("should correctly convert pixels to inches", () => {
      const pixels = 100;
      const expectedInches = pixels / PIXELS_TO_INCHES_RATIO;
      const result = convertPixelsToInches(pixels);
      expect(result).toBe(expectedInches);
    });

    it("should return 0 when provided 0 pixels", () => {
      const pixels = 0;
      const result = convertPixelsToInches(pixels);
      expect(result).toBe(0);
    });
  });

  describe("convertInchesToPixels", () => {
    it("should correctly convert inches to pixels", () => {
      const inches = 10;
      const expectedPixels = inches * PIXELS_TO_INCHES_RATIO;
      const result = convertInchesToPixels(inches);
      expect(result).toBe(expectedPixels);
    });

    it("should return 0 when provided 0 inches", () => {
      const inches = 0;
      const result = convertInchesToPixels(inches);
      expect(result).toBe(0);
    });
  });
});
