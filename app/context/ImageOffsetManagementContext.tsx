import React, {
  useState,
  useContext,
  useMemo,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import { type ImageOffsetItem } from "../types";

// Define types for context value
type ImageOffsetManagementType = {
  offsetX: ImageOffsetItem;
  setOffsetX: Dispatch<SetStateAction<ImageOffsetItem>>;
  offsetY: ImageOffsetItem;
  setOffsetY: Dispatch<SetStateAction<ImageOffsetItem>>;
};

const ImageOffsetManagement = createContext<
  ImageOffsetManagementType | undefined
>(undefined);

// Custom hook to consume the context
export function useImageOffsetManagement() {
  const context = useContext(ImageOffsetManagement);
  if (!context) {
    throw new Error(
      "useImageOffsetManagement must be used within a ImageOffsetManagementProvider"
    );
  }
  return context;
}

export const ImageOffsetManagementProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [offsetX, setOffsetX] = useState<ImageOffsetItem>({
    min: 0,
    max: 0,
    current: 0,
  });
  const [offsetY, setOffsetY] = useState<ImageOffsetItem>({
    min: 0,
    max: 0,
    current: 0,
  });

  const contextValue = useMemo(
    () => ({
      offsetX,
      setOffsetX,
      offsetY,
      setOffsetY,
    }),
    [
      offsetX.min,
      offsetX.max,
      offsetX.current,
      setOffsetX,
      offsetY.min,
      offsetY.max,
      offsetY.current,
      setOffsetY,
    ]
  );

  return (
    <ImageOffsetManagement.Provider value={contextValue}>
      {children}
    </ImageOffsetManagement.Provider>
  );
};
