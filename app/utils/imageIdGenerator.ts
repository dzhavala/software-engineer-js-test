export function generateId() {
  const timestamp =
    new Date().toISOString().replace(/[-:.]/g, "") +
    Math.floor(Math.random() * 100);

  return `image_details_${timestamp}`;
}
