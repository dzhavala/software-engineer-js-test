const imageCreator = (imageDataUrl: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (!imageDataUrl?.length) {
      reject(new Error("Please provide a data source for the image"));
    }

    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = imageDataUrl;
  });
};

export default imageCreator;
