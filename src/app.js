
import './index.html';
import './style/style.css';
import './images/favicon.ico';

import _ from 'underscore';

import * as Grid from './app/grids/TriangleGrid';
import * as Section from './app/Section';
import * as Canvas from './app/Canvas';


const init = () => {
  const canvasEl = document.getElementById('canvas');
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
