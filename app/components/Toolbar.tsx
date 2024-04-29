import React from "react";
import FileUploadButton from "./FileUploadButton";

type ToolBapProps = {
  minOffsetX: number;
  maxOffsetX: number;
  offsetX: number;
  handleOffsetXChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disableXOffset: boolean;
  minOffsetY: number;
  maxOffsetY: number;
  offsetY: number;
  handleOffsetYChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disableYOffset: boolean;
};

const Toolbar = ({
  minOffsetX,
  maxOffsetX,
  offsetX,
  handleOffsetXChange,
  disableXOffset,
  minOffsetY,
  maxOffsetY,
  offsetY,
  handleOffsetYChange,
  disableYOffset,
}: ToolBapProps) => {
  return (
    <>
      <FileUploadButton />
      <div>
        <label htmlFor="offsetX">Horizontal Offset:</label>
        <input
          type="range"
          id="offsetX"
          name="offsetX"
          min={minOffsetX}
          max={maxOffsetX}
          value={offsetX}
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
          min={minOffsetY}
          max={maxOffsetY}
          value={offsetY}
          onChange={handleOffsetYChange}
          disabled={disableYOffset}
        />
      </div>
    </>
  );
};

export default Toolbar;
