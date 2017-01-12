/**
   Handling image uploading, reading and editing
 */

/*
  Will hold image data
*/
export const create = (onLoad) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  return {
    element: new Image(),
    canvas,
    context,
    onLoad,
    data: null
  };
};

export const loadFile = (image) => (file) => {
  const reader = new FileReader();
  reader.onload = loadImage(image);
  reader.readAsDataURL(file);
};

export const loadImage = (image) => (e) => {
  image.element.src = e.target.result;
  image.element.onload = (e) => {
    const i = e.path[0];
    image.canvas.width = i.width;
    image.canvas.height = i.height;
    image.context.drawImage(i, 0, 0);
    image.data = image.context.getImageData(0, 0, i.width, i.height);
    image.onLoad(image);
  };
};
