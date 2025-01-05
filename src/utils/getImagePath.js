
export const getImagePath = (filePath) => {
  return filePath ? `https://image.tmdb.org/t/p/w500${filePath}` : null;
};