
import './index.html';
import './style/style.css';
import './images/favicon.ico';

import _ from 'underscore';

import * as Grid from './app/grids/SquareGrid';
import * as Section from './app/Section';
import * as Canvas from './app/Canvas';


const init = () => {
  const canvasEl = document.getElementById('canvas');
  const canvas = Canvas.create(window, canvasEl);
  const grid = Grid.create(
    100,
    Math.floor(canvas.width / 100) + 1,
    Math.floor(canvas.height / 100) + 1
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
