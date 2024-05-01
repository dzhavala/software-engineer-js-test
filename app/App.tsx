import React from "react";
import { PhotoEditorProvider } from "./context/PhotoEditorContext";
import { ImageOffsetManagementProvider } from "./context/ImageOffsetManagementContext";
import { PhotoEditor } from "./components/PhotoEditor";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <PhotoEditorProvider>
      <ImageOffsetManagementProvider>
        <ErrorBoundary fallback={<div>Error occurred!</div>}>
          <PhotoEditor />
        </ErrorBoundary>
      </ImageOffsetManagementProvider>
    </PhotoEditorProvider>
  );
}
