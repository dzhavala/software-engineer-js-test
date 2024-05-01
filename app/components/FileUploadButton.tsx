import React, { useRef } from "react";
import { usePhotoEditor } from "../context/PhotoEditorContext";
import { uploadNewImage } from "../utils/dataImportExportManager";

const FileUploadButton = () => {
  const { setImageElement, setImageDetails } = usePhotoEditor();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput?.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      alert("Please upload a valid image file.");
      return;
    }

    const { imageElement, imageDetails } = await uploadNewImage(file);

    setImageElement(imageElement);
    setImageDetails(imageDetails);

    e.target.value = "";
  };

  return (
    <div>
      <input
        ref={hiddenFileInput}
        style={{ display: "none" }}
        id="file-uploader"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />{" "}
      <button type="button" onClick={handleClick}>
        Load New Image
      </button>
    </div>
  );
};

export default FileUploadButton;
