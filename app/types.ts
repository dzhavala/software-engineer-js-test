export type CanvasDimensions = {
  width: number;
  height: number;
};

export type ImageDetails = {
  id: string;
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
