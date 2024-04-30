import React from "react";
import FileUploadButton from "./FileUploadButton";
import ImagePositionControls from "./ImagePositionControls";

const Toolbar = () => {
  return (
    <>
      <FileUploadButton />
      <ImagePositionControls />
      <div>
        <small>
          You may use your mouse to position the image inside canvas
        </small>
      </div>
    </>
  );
};

export default Toolbar;
