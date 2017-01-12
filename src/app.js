
import './index.html';
import './style/style.css';
import './images/favicon.ico';

import _ from 'underscore';

import * as ImageHandling from './app/ImageHandling';
import * as Grid from './app/grids/TriangleGrid';
import * as Section from './app/Section';
import * as Canvas from './app/Canvas';

const init = () => {
  const canvasEl = document.getElementById('canvas');

  const image = ImageHandling.create((image) => {
    console.log(image);
  });

  canvasEl.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  });

  canvasEl.addEventListener('drop', (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length < 1) return;
    console.log(files[0]);
    ImageHandling.loadFile(image)(files[0]);
  });

  const canvas = Canvas.create(window, canvasEl);
  const dist = 50;
  const grid = Grid.create(
    dist,
    Math.floor(canvas.width / dist) + 2,
    Math.floor(canvas.height / dist) + 2
  );
  const fractalise = 0.7;

  Canvas.drawBackground(canvas, 'black');

  _.chain(Grid.sections(grid)).map(
    (s) => Section.subdivide(s, fractalise)
  ).map(
    (section) => Canvas.drawSection(canvas, section)
  );

};

init();
