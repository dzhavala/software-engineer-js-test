import {
  convertPixelsToInches,
  convertInchesToPixels,
} from "../pixelsInchesConverter";
import { PIXELS_TO_INCHES_RATIO } from "../../constants";

describe("convertPixelsToInches", () => {
  test("should convert positive pixels to inches correctly", () => {
    const pixels = 100;
    const expectedInches = pixels / PIXELS_TO_INCHES_RATIO;
    expect(convertPixelsToInches(pixels)).toBe(expectedInches);
  });

  test("should convert zero pixels to zero inches", () => {
    expect(convertPixelsToInches(0)).toBe(0);
  });

  test("should convert negative pixels to negative inches correctly", () => {
    const pixels = -100;
    const expectedInches = pixels / PIXELS_TO_INCHES_RATIO;
    expect(convertPixelsToInches(pixels)).toBe(expectedInches);
  });
});

describe("convertInchesToPixels", () => {
  test("should convert positive inches to pixels correctly", () => {
    const inches = 10;
    const expectedPixels = inches * PIXELS_TO_INCHES_RATIO;
    expect(convertInchesToPixels(inches)).toBe(expectedPixels);
  });

  test("should convert zero inches to zero pixels", () => {
    expect(convertInchesToPixels(0)).toBe(0);
  });

  test("should convert negative inches to negative pixels correctly", () => {
    const inches = -10;
    const expectedPixels = inches * PIXELS_TO_INCHES_RATIO;
    expect(convertInchesToPixels(inches)).toBe(expectedPixels);
  });
});
