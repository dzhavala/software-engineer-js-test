export function generateId() {
  return `image_details_${new Date().toISOString().replace(/[-:.]/g, "")}`;
}
