import React, { useRef } from "react";
import { usePhotoEditor } from "../../context/PhotoEditorContext";
import { loadData } from "../../utils/dataImportExportManager";

const LoadImageDetailsButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setImageElement, setImageDetails } = usePhotoEditor();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const { imageElement, imageDetails } = await loadData(file);

    setImageElement(imageElement);
    setImageDetails(imageDetails);

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
