/**
  Canvas Drawing
 */

import _ from 'underscore';

export const create = (window, canvasElement) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvasElement.width = width;
  canvasElement.height = height;
  return {
    width, height,
    element: canvasElement,
    context: canvasElement.getContext('2d')
  };
};

export const drawSquare = (canvas, position, size, colour) => {
  const offset = size / 2;
  canvas.context.fillStyle = colour;
  canvas.context.fillRect(position.x - offset, position.y - offset, size, size);
  return canvas;
};

export const drawLine = (canvas, start, end, colour) => {
  canvas.context.strokeStyle = colour;
  canvas.context.beginPath();
  canvas.context.moveTo(start.x, start.y);
  canvas.context.lineTo(end.x, end.y);
  canvas.context.stroke();
  return canvas;
};

export const drawBackground = (canvas, colour) => {
  canvas.context.fillStyle = colour;
  canvas.context.fillRect(0, 0, canvas.element.width, canvas.element.height);
  return canvas;
};

/**
   Higher level drawing functions
 */

export const drawSection = (canvas, section) => {
  _.each(section.lines, ([start, end]) => {
    drawLine(canvas, start, end, 'white');
  });
  _.each(section.subSections, (ss) => drawSection(canvas, ss));
};
