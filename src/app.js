/* global paper */

import './index.html';
import './style/style.css';
import './images/favicon.ico';
import './images/squid.jpg';

import _ from 'underscore';

import * as Grid from './app/grids/TriangleGrid';
import * as Section from './app/Section';

const canvas = document.getElementById('triangles');
paper.setup(canvas);

const appState = {
  raster: null,
  grid: null,
  sections: null,
  triangleSize: 60
};

function handleImage(appState, image) {
  // As the web is asynchronous, we need to wait for the raster to
  // load before we can perform any operation on its pixels.
  appState.raster = new paper.Raster(image);
  appState.raster.visible = false;
  appState.raster.on('load', function() {
    // Transform the raster, so it fills the view:
    appState.raster.position = paper.view.center;
    appState.raster.fitBounds(paper.view.bounds, true);

    const gridXCells = Math.ceil(paper.view.viewSize.width / appState.triangleSize);
    const gridYCells = Math.ceil(paper.view.viewSize.height / appState.triangleSize);
      //Math.ceil(paper.view.height / (Math.cos(Math.PI/6) * appState.triangleSize))
    appState.grid = Grid.create(
      appState.triangleSize,
      gridXCells,
      gridYCells
    );
    appState.sections = Grid.sections(appState.grid);
    appState.sections = _.flatten(_.map(Grid.sections(appState.grid), Section.subdivide));

    const tris = new paper.Group();
    _.chain(appState.sections).map(Section.path).each((s) => {
      const colour = appState.raster.getAverageColor(s);
      tris.addChild(s);
      s.fillColor = colour;
      s.strokeColor = colour;
    });

  });
}

const onResize = (appState) => () => {
  appState.raster.fitBounds(paper.view.bounds, true);
  paper.project.activeLayer.position = paper.view.center;
};
paper.view.onResize = onResize(appState);

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
