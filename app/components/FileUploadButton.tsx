import React from "react";
import uploadImage from "../utils/fileReader";
import imageCreator from "../utils/imageCreator";
import { usePhotoEditor } from "../context/PhotoEditorContext";
import imageDetailsCreator from "../utils/imageDetailsCreator";

const FileUploadButton = () => {
  const { setImageElement, setImageDetails } = usePhotoEditor();

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
    setImageDetails(imageDetailsCreator(imageElement));
  };

  return <input type="file" accept="image/*" onChange={handleImageUpload} />;
};

export default FileUploadButton;
