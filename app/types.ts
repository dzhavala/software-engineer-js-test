export type CanvasDimensions = {
  width: number;
  height: number;
};

export type ImageDetails = {
  src: string | null | undefined;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ImageOffsetItem = {
  min: number;
  max: number;
  current: number;
};
