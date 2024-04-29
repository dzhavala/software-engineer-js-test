import React from "react";
import { PhotoEditorProvider } from "./context";
import { PhotoEditor } from "./components/photo-editor";

export default function () {
  return (
    <PhotoEditorProvider>
      <PhotoEditor />
    </PhotoEditorProvider>
  );
}
