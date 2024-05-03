// useThemeSetter.test.tsx
import { act, renderHook } from "@testing-library/react";
import React from "react";

import { ImageOffsetManagementProvider } from "../../context/ImageOffsetManagementContext";
import { PhotoEditorProvider } from "../../context/PhotoEditorContext";
import useImageOffsetDrag from "../useImageOffsetDrag";

describe("useImageOffsetDrag", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <PhotoEditorProvider>
      <ImageOffsetManagementProvider>{children}</ImageOffsetManagementProvider>
    </PhotoEditorProvider>
  );

  it("should update x and y of imageDetails in PhotoEditorContext after offsetX or offsetY updates in ImageOffsetManagementContext", async () => {
    const { result } = renderHook(() => useImageOffsetDrag(), { wrapper });

    act(() => {
      result.current.setOffsetX({
        min: -100,
        current: 0,
        max: 100,
      });

      result.current.setOffsetY({
        min: -100,
        current: 0,
        max: 100,
      });
    });

    // Call handleMouseDown and then handleMouseMove with the mock mouse events
    act(() => {
      result.current.handleMouseDown({
        clientX: 0,
        clientY: 0,
      } as React.MouseEvent<HTMLCanvasElement>);
    });

    act(() => {
      result.current.handleMouseMove({
        clientX: -20,
        clientY: -20,
      } as React.MouseEvent<HTMLCanvasElement>);
    });

    expect(result.current.offsetX.current).toEqual(-20);
    expect(result.current.offsetY.current).toEqual(-20);
  });
});
