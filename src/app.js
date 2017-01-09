
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

  Canvas.drawBackground(canvas, 'black');
  const grid = Grid.create(100, Math.round(canvas.width / 20), Math.round(canvas.height / 20));
  _.chain(grid.gridSections)
    .map(Section.lines)
    .flatten(true)
    .map(([start, end]) => {
      Canvas.drawLine(canvas, start.pos, end.pos, 'white');
    });

};

init();
