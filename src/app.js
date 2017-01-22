/* global paper */

import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'underscore';

import Controls from './Controls';

import './index.html';
import './style/style.css';
import './images/favicon.ico';
import './images/squid.jpg';


_.mixin({
  flatMap: (value, f) => _.flatten(_.map(value, f), true)
});

_.mixin({
  replicate: (value, f, times) => {
    let v = value;
    for (let i = 0; i < times; i += 1) {
      v = _.flatMap(v, f);
    }
    return v;
  }
});

import * as Grid from './app/Grid';
import * as Section from './app/Section';

const canvas = document.getElementById('triangles');
paper.setup(canvas);

const controlState = {
  triangleSize: 400,
  levels: 3,
  randomise: false,
  twist: 0.6
};

const appState = {
  raster: null,
  grid: null,
  sections: null,
  triangleSize: 400,
  levels: 5,
  randomise: false,
  twist: 0.5
};

const render = () => {
  checkLimits();
  updateAppState();
  renderControls();
  crystalise(appState);
};

const controlProps = {
  decreaseLevels: () => {
    controlState.levels -= 1;
    renderControls();
  },
  increaseLevels: () => {
    controlState.levels += 1;
    renderControls();
  },
  changeSize: (e) => {
    controlState.triangleSize = e.target.value;
    renderControls();
  },
  changeRandomise: () => {
    controlState.randomise = !controlState.randomise;
    renderControls();
  },
  changeTwist: (e) => {
    controlState.twist = e.target.value;
    renderControls();
  },
  rerender: render,
  download: () => {
    render();
    const img = canvas.toDataURL('image/png');
    document.write(`<img src='${img}'>`);
  }
};

const updateAppState = () => {
  appState.triangleSize = controlState.triangleSize;
  appState.levels = controlState.levels;
  appState.randomise = controlState.randomise;
  appState.twist = controlState.twist;
};

const checkLimits = () => {
  if (controlState.levels <= 0) controlState.levels = 1;
  if (controlState.levels > 20) controlState.levels = 20;
  if (controlState.twist > 1) controlState.twist = 1;
  if (controlState.twist < 0) controlState.twist = 0;
  if (controlState.triangleSize > 1000) controlState.triangleSize = 1000;
  if (controlState.triangleSize < 50) controlState.triangleSize = 50;
};

const renderControls = () => {
  ReactDOM.render(
    <Controls {...controlProps} {...controlState}/>,
    document.getElementById('header')
  );
};

const crystalise = (appState) => {
  appState.raster.position = paper.view.center;
  // Transform the raster, so it fills the view:
  appState.raster.fitBounds(paper.view.bounds, true);

  const gridXCells = Math.ceil(paper.view.viewSize.width / appState.triangleSize) + 1;
  const gridYCells = Math.ceil(paper.view.viewSize.height / appState.triangleSize) + 1;
  appState.grid = Grid.create(
    appState.triangleSize,
    gridXCells,
    gridYCells
  );
  appState.sections = _.chain(Grid.sections(appState.grid))
    .replicate(
      (s) => Section.subdivide(s, appState.randomise, appState.twist),
      appState.levels
    );

  const tris = new paper.Group();
  _.chain(appState.sections).map(Section.path).each((s) => {
    const colour = appState.raster.getAverageColor(s);
    tris.addChild(s);
    s.fillColor = colour;
    s.strokeColor = colour;
  });

};

function handleImage(appState, image) {
  // As the web is asynchronous, we need to wait for the raster to
  // load before we can perform any operation on its pixels.
  appState.raster = new paper.Raster(image);
  appState.raster.visible = false;

  appState.raster.on('load', function() {
    render(appState);
  });
}

paper.view.onResize = _.debounce(() => {
  render(appState);
}, 200);

function onDocumentDrag(event) {
  event.preventDefault();
}

function onDocumentDrop(event) {
  event.preventDefault();

  var file = event.dataTransfer.files[0];
  var reader = new FileReader();

  reader.onload = function(event) {
    var image = document.createElement('img');
    image.onload = function () {
      handleImage(appState, image);
      paper.view.draw();
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

document.addEventListener('drop', onDocumentDrop, false);
document.addEventListener('dragover', onDocumentDrag, false);
document.addEventListener('dragleave', onDocumentDrag, false);

handleImage(appState, 'squid');

renderControls();
