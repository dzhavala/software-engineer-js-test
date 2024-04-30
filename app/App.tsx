import React from "react";
import { PhotoEditorProvider } from "./context/PhotoEditorContext";
import { ImageOffsetManagementProvider } from "./context/ImageOffsetManagementContext";
import { PhotoEditor } from "./components/PhotoEditor";

export default function () {
  return (
    <PhotoEditorProvider>
      <ImageOffsetManagementProvider>
        <PhotoEditor />
      </ImageOffsetManagementProvider>
    </PhotoEditorProvider>
  );
}
