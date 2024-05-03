import React, {
  useState,
  useContext,
  useMemo,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { type ImageDetails } from "../types";
import { defaultImageDatails } from "../constants";
// Define types for context value
type PhotoEditorContextType = {
  imageDetails: ImageDetails;
  setImageDetails: Dispatch<SetStateAction<ImageDetails>>;
  imageElement: HTMLImageElement | null;
  setImageElement: Dispatch<SetStateAction<HTMLImageElement | null>>;
};

const PhotoEditorContext = createContext<PhotoEditorContextType | undefined>(
  undefined
);

// Custom hook to consume the context
export function usePhotoEditor() {
  const context = useContext(PhotoEditorContext);
  if (!context) {
    throw new Error("usePhotoEditor must be used within a PhotoEditorProvider");
  }
  return context;
}

export const PhotoEditorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [imageDetails, setImageDetails] =
    useState<ImageDetails>(defaultImageDatails);

  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );

  const { src, id, x, y, width, height } = imageDetails;

  const contextValue = useMemo(
    () => ({
      imageDetails,
      setImageDetails,
      imageElement,
      setImageElement,
    }),
    [
      src,
      id,
      x,
      y,
      width,
      height,
      setImageDetails,
      imageElement,
      setImageElement,
    ]
  );

  return (
    <PhotoEditorContext.Provider value={contextValue}>
      {children}
    </PhotoEditorContext.Provider>
  );
};
