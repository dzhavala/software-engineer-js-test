import React, { useEffect, useState } from "react";
import { usePhotoEditor } from "../context/PhotoEditorContext";
import { saveData } from "../utils/dataImportExportManager";

const SaveImageDetailsButton: React.FC = () => {
  const { imageDetails } = usePhotoEditor();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsDisabled(!imageDetails.src);
  }, [imageDetails.src]);

  const handleClick = () => {
    if (!imageDetails) {
      console.error("No image data available");
      return;
    }

    saveData(imageDetails);
  };

  return (
    <button onClick={handleClick} disabled={isDisabled}>
      Save Image Details
    </button>
  );
};

export default SaveImageDetailsButton;
