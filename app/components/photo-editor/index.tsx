import React, { useEffect } from "react";
import { CANVAS_DIMENSIONS } from "../../constants";
import Canvas from "../Canvas";
import Toolbar from "../Toolbar";
import imageDetailsCreator from "../../utils/imageDetailsCreator";
import { usePhotoEditor } from "../../context/PhotoEditorContext";
import { useImageOffsetManagement } from "../../context/ImageOffsetManagementContext";
import useImageDetailsSetup from "../../hooks/useImageDetailsSetup";

const PhotoEditor: React.FC = () => {
  const { setImageDetails, imageElement } = usePhotoEditor();

  useImageDetailsSetup();

  return (
    <div>
      <Toolbar />
      <Canvas
        canvasWidth={CANVAS_DIMENSIONS.width}
        canvasHeight={CANVAS_DIMENSIONS.height}
        imageElement={imageElement}
      />
    </div>
  );
};

export { PhotoEditor };
