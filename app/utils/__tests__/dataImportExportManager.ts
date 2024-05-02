import { loadData, uploadNewImage } from "../dataImportExportManager";
import { convertImageDetailsToPixels } from "../../utils/exportDetailsGenerator";
import imageDetailsCreator from "../../utils/imageDetailsCreator";
import uploadImage from "../../utils/fileReader";
import imageCreator from "../../utils/imageCreator";

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

// // Mock URL.createObjectURL and URL.revokeObjectURL
// const createObjectURLMock = jest.fn();
// const revokeObjectURLMock = jest.fn();

// // // Setup JSDOM global objects
// global.URL.createObjectURL = createObjectURLMock;
// global.URL.revokeObjectURL = revokeObjectURLMock;

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
      const corruptedJsonString = '{"canvas":{"photo":{}}}';

      const file = new File([corruptedJsonString], "mockedFileName.json", {
        type: "application/json",
      });

      await expect(loadData(file)).rejects.toEqual("No image src is provided");
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
