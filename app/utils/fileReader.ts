const uploadImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Check if the file is an image
    if (!file.type.match("image.*")) {
      reject(new Error("The selected file is not an image."));
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error("Error occurred while reading the file."));
    };

    reader.readAsDataURL(file);
  });
};

export default uploadImage;
