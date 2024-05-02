import { type ExportDetails, type ImageDetails } from "../types";
import { generateId } from "../utils";
import { exportDetails } from "../utils";
import { convertImageDetailsToPixels } from "../utils";
import imageCreator from "../utils/imageCreator";
import imageDetailsCreator from "../utils/imageDetailsCreator";
import uploadImage from "../utils/fileReader";
import { CANVAS_DIMENSIONS_IN_INCHES } from "../constants";

export function saveData(imageDetails: ImageDetails) {
  const exportData = exportDetails(imageDetails);
  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  let fileName = generateId();

  // Prompt user for custom file name
  const customFileName = window.prompt(
    "Enter a custom file name (optional):",
    fileName
  );

  fileName = `${customFileName || fileName}.json`;

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; // Set download file name with suffix based on current datetime

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export function loadData(file: File): Promise<{
  imageElement: HTMLImageElement;
  imageDetails: ImageDetails;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      let importedData: ExportDetails;
      let imageData: ImageDetails;
      let error;
      try {
        importedData = JSON.parse(result);
        imageData = importedData.canvas.photo;
        if (!imageData) {
          error = new Error("Error parsing JSON: no image data is found");
          throw error;
        }
        if (
          importedData.canvas.width !== CANVAS_DIMENSIONS_IN_INCHES.width ||
          importedData.canvas.height !== CANVAS_DIMENSIONS_IN_INCHES.height
        ) {
          error = new Error(
            "Error parsing JSON: not correct fixed canvas size is provided for this project"
          );
          throw error;
        }
        // TODO: add JSON parsing by zod
      } catch (error) {
        reject(error);
        return;
      }
      let imageElement = null;
      try {
        if (imageData.src) {
          imageElement = await imageCreator(imageData.src);
        } else {
          reject("No image src is provided");
          return;
        }
      } catch (error) {
        alert(`Error generating img element: , ${(error as Error).message}`);
        reject(error);
        return;
      }
      const { x, y, id } = convertImageDetailsToPixels(imageData);
      // TODO: handle imported canvas size
      resolve({
        imageElement,
        imageDetails: imageDetailsCreator({ imageElement, x, y, id }),
      });
    };

    reader.readAsText(file);
  });
}

export function uploadNewImage(file: File): Promise<{
  imageElement: HTMLImageElement;
  imageDetails: ImageDetails;
}> {
  return new Promise((resolve, reject) => {
    (async () => {
      let imageDataSrc = "";
      let imageElement = null;
      try {
        imageDataSrc = await uploadImage(file);
      } catch (error) {
        alert(`Error uploading image: , ${(error as Error).message}`);
        reject(error);
        return;
      }

      try {
        imageElement = await imageCreator(imageDataSrc);
      } catch (error) {
        alert(`Error generating img element: , ${(error as Error).message}`);
        reject(error);
        return;
      }

      resolve({
        imageElement,
        imageDetails: imageDetailsCreator({ imageElement }),
      });
    })();
  });
}
