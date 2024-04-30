import React from "react";
import { useImageOffsetManagement } from "../context/ImageOffsetManagementContext";
import useImageOffsetSliders from "../hooks/useImageOffsetSliders";

const ImagePositionControls = () => {
  const { offsetX, offsetY } = useImageOffsetManagement();

  const {
    disableXOffset,
    handleOffsetXChange,
    disableYOffset,
    handleOffsetYChange,
  } = useImageOffsetSliders();

  return (
    <>
      <div>
        <label htmlFor="offsetX">Horizontal Offset:</label>
        <input
          type="range"
          id="offsetX"
          name="offsetX"
          min={offsetX.min}
          max={offsetX.max}
          value={offsetX.current}
          onChange={handleOffsetXChange}
          disabled={disableXOffset}
        />
      </div>
      <div>
        <label htmlFor="offsetY">Vertical Offset:</label>
        <input
          type="range"
          id="offsetY"
          name="offsetY"
          min={offsetY.min}
          max={offsetY.max}
          value={offsetY.current}
          onChange={handleOffsetYChange}
          disabled={disableYOffset}
        />
      </div>
    </>
  );
};

export default ImagePositionControls;
