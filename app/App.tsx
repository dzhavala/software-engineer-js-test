import React from "react";
import { PhotoEditorProvider } from "./context/PhotoEditorContext";
import { ImageOffsetManagementProvider } from "./context/ImageOffsetManagementContext";
import { PhotoEditor } from "./components/photo-editor";

export default function () {
  return (
    <PhotoEditorProvider>
      <ImageOffsetManagementProvider>
        <PhotoEditor />
      </ImageOffsetManagementProvider>
    </PhotoEditorProvider>
  );
}
