/* global paper */

import './index.html';
import './style/style.css';
import './images/favicon.ico';
import './images/squid.jpg';

const canvas = document.getElementById('triangles');
paper.setup(canvas);

const appState = {
  raster: null
};

function handleImage(appState, image) {
  // As the web is asynchronous, we need to wait for the raster to
  // load before we can perform any operation on its pixels.
  appState.raster = new paper.Raster(image);
  appState.raster.visible = false;
  appState.raster.on('load', function() {
    // Transform the raster, so it fills the view:
    console.log(image);
    appState.raster.position = paper.view.center;
    appState.raster.fitBounds(paper.view.bounds, true);
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
