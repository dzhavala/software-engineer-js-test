import React, { useEffect } from "react";
import { usePhotoEditor } from "../context/PhotoEditorContext";
import { CANVAS_DIMENSIONS } from "../constants";
import { useImageOffsetManagement } from "../context/ImageOffsetManagementContext";
import imageDetailsCreator from "../utils/imageDetailsCreator";

const useImageDetailsSetup = () => {
  const { setImageDetails, imageElement } = usePhotoEditor();

  const { offsetX, setOffsetX, offsetY, setOffsetY } =
    useImageOffsetManagement();

  useEffect(() => {
    const imageDetails = imageDetailsCreator(imageElement);
    setImageDetails(imageDetails);

    // Ensure image covers the canvas
    const maxOffsetXVal = (imageDetails.width - CANVAS_DIMENSIONS.width) / 2;
    const maxOffsetYVal = (imageDetails.height - CANVAS_DIMENSIONS.height) / 2;

    // Setup initial position/offset values
    setOffsetX({
      current: 0,
      min: -maxOffsetXVal,
      max: maxOffsetXVal,
    });

    setOffsetY({
      current: 0,
      min: -maxOffsetYVal,
      max: maxOffsetYVal,
    });
  }, [imageElement]);

  // Once image position/offset is changed regenerate the imageDetails object taking into account new offset
  useEffect(() => {
    setImageDetails(
      imageDetailsCreator(imageElement, offsetX.current, offsetY.current)
    );
  }, [
    offsetX.min,
    offsetX.max,
    offsetX.current,
    offsetY.min,
    offsetY.max,
    offsetY.current,
  ]);
};

export default useImageDetailsSetup;
