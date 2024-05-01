import React, { useRef } from "react";
import { usePhotoEditor } from "../context/PhotoEditorContext";
import { useImageOffsetManagement } from "../context/ImageOffsetManagementContext";
import imageCreator from "../utils/imageCreator";
import imageDetailsCreator from "../utils/imageDetailsCreator";
import { convertImageDetailsToPixels } from "../utils/exportDetailsGenerator";
import { type ImageDetails, type ExportDetails } from "../types";

const LoadImageDetailsButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setImageElement, setImageDetails } = usePhotoEditor();
  const { offsetX, setOffsetX, offsetY, setOffsetY } =
    useImageOffsetManagement();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      let importedData: ExportDetails;
      let imageData: ImageDetails;
      try {
        importedData = JSON.parse(result);
        imageData = importedData.canvas.photo;
        if (!imageData) {
          throw new Error("Error parsing JSON: no image data is found");
        }
        // TODO: add JSON parsing by zod
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
      }
      let imageElement = null;
      try {
        if (imageData.src) {
          imageElement = await imageCreator(imageData.src);
        }
      } catch (error) {
        alert(`Error generating img element: , ${(error as Error).message}`);
      }
      const { x, y, id } = convertImageDetailsToPixels(imageData);

      setImageElement(imageElement);
      setImageDetails(imageDetailsCreator({ imageElement, x, y, id }));
    };

    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <div>
      <input
        type="file"
        accept=".json"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <button onClick={handleButtonClick}>Load Image Details</button>
    </div>
  );
};

export default LoadImageDetailsButton;
