import React, { useState, useEffect } from "react";
import { usePhotoEditor } from "../context/PhotoEditorContext";
import { CANVAS_DIMENSIONS } from "../constants";
import { useImageOffsetManagement } from "../context/ImageOffsetManagementContext";

const useImageOffsetSliders = () => {
  const { imageDetails, imageElement } = usePhotoEditor();
  const { offsetX, setOffsetX, offsetY, setOffsetY } =
    useImageOffsetManagement();

  const [disableXOffset, setDisableXOffset] = useState<boolean>(true);
  const [disableYOffset, setDisableYOffset] = useState<boolean>(true);

  useEffect(() => {
    if (!imageElement) {
      setDisableXOffset(true);
      setDisableYOffset(true);
    } else {
      setDisableXOffset(imageDetails.width <= CANVAS_DIMENSIONS.width);
      setDisableYOffset(imageDetails.height <= CANVAS_DIMENSIONS.height);
    }
  }, [imageDetails.src]);

  const handleOffsetXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffsetX({
      ...offsetX,
      current: parseInt(e.target.value),
    });
  };

  const handleOffsetYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffsetY({
      ...offsetY,
      current: parseInt(e.target.value),
    });
  };

  return {
    disableXOffset,
    handleOffsetXChange,
    disableYOffset,
    handleOffsetYChange,
  };
};

export default useImageOffsetSliders;
