import { loadData, uploadNewImage } from "../";
import { convertImageDetailsToPixels } from "../exportDetailsGenerator";
import imageDetailsCreator from "../imageDetailsCreator";
import uploadImage from "../fileReader";
import imageCreator from "../imageCreator";

const mockedJson = {
  canvas: {
    width: 15,
    height: 10,
    photo: {
      id: "image_details_20240501T181210975Z",
      src: "data: test",
      x: -1.12,
      y: 0,
      width: 19.10828025477707,
      height: 10,
    },
  },
};

// Mock dependencies
jest.mock("../imageIdGenerator", () => ({
  generateId: jest.fn(() => "mockedId"),
}));

jest.mock("../exportDetailsGenerator", () => ({
  exportDetails: jest.fn(() => ({ canvas: { photo: {} } })),
  convertImageDetailsToPixels: jest.fn(() => ({ x: 0, y: 0, id: "mockedId" })),
}));

jest.mock("../imageCreator", () =>
  jest.fn(() => document.createElement("img"))
);

jest.mock("../imageDetailsCreator", () =>
  jest.fn(() => ({ x: 0, y: 0, id: "mockedId" }))
);

jest.mock("../fileReader", () =>
  jest.fn(() => Promise.resolve("mockedImageSrc"))
);

describe("Utility Functions", () => {
  describe("loadData", () => {
    it("should load data", async () => {
      const blob = new Blob([JSON.stringify(mockedJson, null, 2)], {
        type: "application/json",
      });
      const file = new File([blob], "mockedFileName.json", {
        type: "application/json",
      });

      const { imageElement, imageDetails } = await loadData(file);
      expect(convertImageDetailsToPixels).toHaveBeenCalledWith(
        mockedJson.canvas.photo
      );
      expect(imageDetailsCreator).toHaveBeenCalled();

      expect(imageElement).toBeDefined();
      expect(imageDetails).toEqual({ x: 0, y: 0, id: "mockedId" });
    });
    it("should throw an error if JSON in the file is corrupted", async () => {
      const corruptedJsonString = '{"canvas":{"photo"';

      const file = new File([corruptedJsonString], "mockedFileName.json", {
        type: "application/json",
      });

      await expect(loadData(file)).rejects.toThrow();
    });
    it("should throw an error if JSON in the file does not contain image src value", async () => {
      const corruptedJsonString =
        '{"canvas":{"width": 15, "height": 10, "photo":{}}}';

      const file = new File([corruptedJsonString], "mockedFileName.json", {
        type: "application/json",
      });

      await expect(loadData(file)).rejects.toEqual("No image src is provided");
    });
    it("should throw an error if JSON in the file does not contain corrext canvas size", async () => {
      const corruptedJsonString =
        '{"canvas":{"width": 0, "height": 10,"photo":{}}}';

      const file = new File([corruptedJsonString], "mockedFileName.json", {
        type: "application/json",
      });
      await expect(loadData(file)).rejects.toEqual(
        new Error(
          "Error parsing JSON: not correct fixed canvas size is provided for this project"
        )
      );
    });
  });
  describe("uploadNewImage", () => {
    it("should upload a new image", async () => {
      const file = new File([""], "mockedFileName.png", { type: "image/png" });

      const { imageElement, imageDetails } = await uploadNewImage(file);

      expect(uploadImage).toHaveBeenCalledWith(file);
      expect(imageCreator).toHaveBeenCalledWith("mockedImageSrc");

      expect(imageElement).toBeDefined();

      expect(imageDetails).toEqual({ x: 0, y: 0, id: "mockedId" });
    });
  });
});
