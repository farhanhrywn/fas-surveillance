export const importImg = (img) => {
  const images = {};
  img.keys().map((item) => images[item.replace('./', '')] = img(item));
  return images;
};