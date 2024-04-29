import React, {
  useState,
  useContext,
  useMemo,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { type ImageDetails } from "./types";
// Define types for context value
type PhotoEditorContextType = {
  imageDetails: ImageDetails;
  setImageDetails: Dispatch<SetStateAction<ImageDetails>>;
};

const PhotoEditorContext = createContext<PhotoEditorContextType | undefined>(
  undefined
);

// Custom hook to consume the context
export function usePhotoEditor() {
  const context = useContext(PhotoEditorContext);
  if (!context) {
    throw new Error("useImage must be used within a ImageProvider");
  }
  return context;
}

export const PhotoEditorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const defaultImageDatails: ImageDetails = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    data: "",
  };
  const [imageDetails, setImageDetails] =
    useState<ImageDetails>(defaultImageDatails);

  const contextValue = useMemo(
    () => ({
      imageDetails,
      setImageDetails,
    }),
    [imageDetails, setImageDetails]
  );

  return (
    <PhotoEditorContext.Provider value={contextValue}>
      {children}
    </PhotoEditorContext.Provider>
  );
};
