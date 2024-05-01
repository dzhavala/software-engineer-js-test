import React, { useEffect, useState } from "react";
import { usePhotoEditor } from "../context/PhotoEditorContext";

const SaveImageDetailsButton: React.FC = () => {
  const { imageDetails } = usePhotoEditor();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsDisabled(!imageDetails.data);
  }, [imageDetails.data]);

  const handleClick = () => {
    if (!imageDetails) {
      console.error("No image data available");
      return;
    }

    const jsonString = JSON.stringify(imageDetails, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    let fileName = `image_details_${new Date()
      .toISOString()
      .replace(/[-:.]/g, "")}`;

    // Prompt user for custom file name
    const customFileName = window.prompt(
      "Enter a custom file name instr (optional):",
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
  };

  return (
    <button onClick={handleClick} disabled={isDisabled}>
      Save Image Details
    </button>
  );
};

export default SaveImageDetailsButton;
