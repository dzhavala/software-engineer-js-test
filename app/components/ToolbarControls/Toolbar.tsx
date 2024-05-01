import React from "react";
import FileUploadButton from "./FileUploadButton";
import ImagePositionControls from "./ImagePositionControls";
import DataExportImportComponent from "../ImportExportControls/DataExportImportComponent";
const Toolbar = () => {
  return (
    <>
      <FileUploadButton />
      <ImagePositionControls />
      <br />
      <DataExportImportComponent />
      <div>
        <small>
          You may use your mouse to position the image inside canvas
        </small>
      </div>
    </>
  );
};

export default Toolbar;
