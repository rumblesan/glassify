/* global paper */

import './index.html';
import './style/style.css';
import './images/favicon.ico';
import './images/squid.jpg';

import _ from 'underscore';

_.mixin({
  flatMap: (value, f) => _.flatten(_.map(value, f), true)
});

import * as Grid from './app/Grid';
import * as Section from './app/Section';

const canvas = document.getElementById('triangles');
paper.setup(canvas);

const appState = {
  raster: null,
  grid: null,
  sections: null,
  triangleSize: 400
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
    .flatMap(Section.subdivide)
    .flatMap(Section.subdivide)
    .flatMap(Section.subdivide)
    .flatMap(Section.subdivide);

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
    crystalise(appState);
  });
}

paper.view.onResize = _.debounce(() => {
  crystalise(appState);
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
