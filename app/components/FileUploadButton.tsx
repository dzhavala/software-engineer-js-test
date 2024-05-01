import React, { useRef } from "react";
import uploadImage from "../utils/fileReader";
import imageCreator from "../utils/imageCreator";
import { usePhotoEditor } from "../context/PhotoEditorContext";
import imageDetailsCreator from "../utils/imageDetailsCreator";

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

    let imageDataUrl = "";
    let imageElement = null;
    try {
      imageDataUrl = await uploadImage(file);
    } catch (error) {
      alert(`Error uploading image: , ${(error as Error).message}`);
    }

    try {
      imageElement = await imageCreator(imageDataUrl);
    } catch (error) {
      alert(`Error generating img element: , ${(error as Error).message}`);
    }

    setImageElement(imageElement);
    setImageDetails(imageDetailsCreator({ imageElement }));
    e.target.value = "";
  };

  return (
    <label htmlFor="file-uploader" style={{ display: "inline-block" }}>
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
    </label>
  );
};

export default FileUploadButton;
