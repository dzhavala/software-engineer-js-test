import React from "react";
import FileUploadButton from "./FileUploadButton";
import ImagePositionControls from "./ImagePositionControls";
import DataExportImportComponent from "../ImportExportControls/DataExportImportComponent";
import styles from "./Toolbar.module.scss";

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.buttonsWrapper}>
        <div>
          <FileUploadButton />
        </div>
        <div>
          <DataExportImportComponent />
        </div>
      </div>

      <h2>Move image inside canvas</h2>
      <div className={styles.positionControls}>
        <div className={styles.note}>
          You can change image position using controls on a right or drag the
          image by cursor inside canvas
        </div>
        <ImagePositionControls />
      </div>
    </div>
  );
};

export default Toolbar;
