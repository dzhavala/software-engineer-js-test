// useThemeSetter.test.tsx
import { act, renderHook } from "@testing-library/react";
import React from "react";

import { ImageOffsetManagementProvider } from "../../context/ImageOffsetManagementContext";
import { PhotoEditorProvider } from "../../context/PhotoEditorContext";
import useImageDetailsSetup from "../useImageDetailsSetup";

describe("useImageDetailsSetup", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <PhotoEditorProvider>
      <ImageOffsetManagementProvider>{children}</ImageOffsetManagementProvider>
    </PhotoEditorProvider>
  );

  it("should update x and y of imageDetails in PhotoEditorContext after offsetX or offsetY updates in ImageOffsetManagementContext", async () => {
    const { result } = renderHook(() => useImageDetailsSetup(), { wrapper });

    act(() => {
      result.current.setOffsetX({
        min: 1,
        max: 1,
        current: 1,
      });
    });

    expect(result.current.imageDetails).toEqual(
      expect.objectContaining({
        x: 1,
        y: 0,
      })
    );

    act(() => {
      result.current.setOffsetY({
        min: 2,
        max: 2,
        current: 2,
      });
    });

    expect(result.current.imageDetails).toEqual(
      expect.objectContaining({
        x: 1,
        y: 2,
      })
    );
  });

  it("should reset min and max values of offsetX or offsetY in ImageOffsetManagementContext if resetImageOffset is called", async () => {
    const { result } = renderHook(() => useImageDetailsSetup(), { wrapper });

    expect(result.current.offsetX).toEqual(
      expect.objectContaining({
        min: 0,
        max: 0,
      })
    );
    expect(result.current.offsetY).toEqual(
      expect.objectContaining({
        min: 0,
        max: 0,
      })
    );

    act(() => {
      result.current.setOffsetX({
        min: 1,
        max: 1,
        current: 1,
      });
    });

    act(() => {
      result.current.setOffsetY({
        min: 2,
        max: 2,
        current: 2,
      });
    });

    expect(result.current.offsetX).toEqual(
      expect.objectContaining({
        min: 1,
        max: 1,
      })
    );
    expect(result.current.offsetY).toEqual(
      expect.objectContaining({
        min: 2,
        max: 2,
      })
    );

    act(() => {
      result.current.resetImageOffset();
    });

    expect(result.current.offsetX).toEqual(
      expect.objectContaining({
        min: 750,
        max: 0,
      })
    );
    expect(result.current.offsetY).toEqual(
      expect.objectContaining({
        min: 500,
        max: 0,
      })
    );
  });

  it("should call the resetImageOffset method each time the ImageElement updates", async () => {
    const { result } = renderHook(() => useImageDetailsSetup(), { wrapper });

    act(() => {
      result.current.setOffsetX({
        min: 1,
        max: 1,
        current: 1,
      });
    });

    act(() => {
      result.current.setOffsetY({
        min: 1,
        max: 1,
        current: 1,
      });
    });

    act(() => {
      result.current.setImageElement(new Image());
    });

    expect(result.current.offsetX).toEqual(
      expect.objectContaining({
        min: 750,
        max: 0,
      })
    );
    expect(result.current.offsetY).toEqual(
      expect.objectContaining({
        min: 500,
        max: 0,
      })
    );
  });
});
