import React, { useRef } from "react";
import { usePhotoEditor } from "../context/PhotoEditorContext";
import { useImageOffsetManagement } from "../context/ImageOffsetManagementContext";
import imageCreator from "../utils/imageCreator";
import imageDetailsCreator from "../utils/imageDetailsCreator";

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
      let imageData;
      try {
        imageData = JSON.parse(result);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      let imageElement = null;
      try {
        imageElement = await imageCreator(imageData.data);
      } catch (error) {
        alert(`Error generating img element: , ${(error as Error).message}`);
      }

      setImageElement(imageElement);
      setImageDetails(
        imageDetailsCreator(imageElement, imageData.x, imageData.y)
      );
    };

    reader.readAsText(file);
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
