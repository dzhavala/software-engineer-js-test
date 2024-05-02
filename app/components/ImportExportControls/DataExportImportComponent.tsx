import React from "react";
import SaveImageDetailsButton from "./SaveImageDetailsButton";
import LoadImageDetailsButton from "./LoadImageDetailsButton";
import styles from "./DataExportImportComponent.module.scss";

const DataExportImportComponent: React.FC = () => {
  return (
    <div className={styles.buttonsWrapper}>
      <SaveImageDetailsButton /> <LoadImageDetailsButton />
    </div>
  );
};

export default DataExportImportComponent;
