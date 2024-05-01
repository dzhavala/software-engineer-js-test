import { useEffect } from "react";
import { usePhotoEditor } from "../context/PhotoEditorContext";
import { CANVAS_DIMENSIONS } from "../constants";
import { useImageOffsetManagement } from "../context/ImageOffsetManagementContext";

const useImageDetailsSetup = () => {
  const { setImageDetails, imageDetails, imageElement } = usePhotoEditor();

  const { offsetX, setOffsetX, offsetY, setOffsetY } =
    useImageOffsetManagement();

  const resetImageOffset = () => {
    // Ensure image covers the canvas
    const maxOffsetXVal = (imageDetails.width - CANVAS_DIMENSIONS.width) / 2;
    const maxOffsetYVal = (imageDetails.height - CANVAS_DIMENSIONS.height) / 2;

    // Setup offset position and boundary values after loading the image
    setOffsetX({
      current: imageDetails.x,
      min: -maxOffsetXVal * 2,
      max: 0,
    });

    setOffsetY({
      current: imageDetails.y,
      min: -maxOffsetYVal * 2,
      max: 0,
    });
  };

  useEffect(() => {
    if (imageElement) {
      resetImageOffset();
    }
  }, [imageElement]);

  // Once image position/offset is changed regenerate the imageDetails object taking into account new offset
  useEffect(() => {
    setImageDetails({
      ...imageDetails,
      ...{
        x: offsetX.current,
        y: offsetY.current,
      },
    });
  }, [offsetX.current, offsetY.current]);

  return {
    resetImageOffset,
  };
};

export default useImageDetailsSetup;
