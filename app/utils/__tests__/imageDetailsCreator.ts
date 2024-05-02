import imageDetailsCreator from "../imageDetailsCreator"; // Replace "./exampleFile" with the path to your file
import { CANVAS_DIMENSIONS, defaultImageDatails } from "../../constants";
// Constants
const mockImageElement = document.createElement("img");
mockImageElement.src = "mockedImageSrc";

describe("imageDetailsCreator", () => {
  it("should return default image details if imageElement is null", () => {
    const result = imageDetailsCreator({ imageElement: null });

    expect(result).toEqual(defaultImageDatails);
  });

  it("should create image details with generated id if id is not provided", () => {
    const result = imageDetailsCreator({ imageElement: mockImageElement });

    expect(result.id).toBeTruthy();
  });

  it("should create image details with provided id", () => {
    const mockId = "mockId";
    const result = imageDetailsCreator({
      imageElement: mockImageElement,
      id: mockId,
    });

    expect(result.id).toBe(mockId);
  });

  it("should calculate dimensions and positions correctly for landscape aspect ratio", () => {
    // Mock image element with landscape aspect ratio (width > height)
    mockImageElement.width = 200;
    mockImageElement.height = 100;

    const result = imageDetailsCreator({ imageElement: mockImageElement });

    expect(result.width).toBe(CANVAS_DIMENSIONS.height * (200 / 100));
    expect(result.height).toBe(CANVAS_DIMENSIONS.height);
    expect(result.x).toBe((CANVAS_DIMENSIONS.width - result.width) / 2);
    expect(result.y).toBe(0);
  });

  it("should calculate dimensions and positions correctly for portrait aspect ratio", () => {
    // Mock image element with portrait aspect ratio (height > width)
    mockImageElement.width = 100;
    mockImageElement.height = 200;

    const result = imageDetailsCreator({ imageElement: mockImageElement });

    expect(result.width).toBe(CANVAS_DIMENSIONS.width);
    expect(result.height).toBe(CANVAS_DIMENSIONS.width / (100 / 200));
    expect(result.x).toBe(0);
    expect(result.y).toBe((CANVAS_DIMENSIONS.height - result.height) / 2);
  });

  it("should use provided x and y positions", () => {
    const mockX = 50;
    const mockY = 100;
    const result = imageDetailsCreator({
      imageElement: mockImageElement,
      x: mockX,
      y: mockY,
    });

    expect(result.x).toBe(mockX);
    expect(result.y).toBe(mockY);
  });
});
