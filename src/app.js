
import './index.html';
import './style/style.css';
import './images/favicon.ico';

import * as ImageHandling from './app/ImageHandling';
import * as Filter from './app/Filter';

const init = () => {

  const dropspaceEl = document.getElementById('dropspace');

  const image = ImageHandling.create((image) => {
    image.filter = Filter.create();
    console.log(image);
    var displayCanvas = document.createElement('canvas');
    displayCanvas.id = 'display';
    displayCanvas.width = image.canvas.width;
    displayCanvas.height = image.canvas.height;
    dropspaceEl.appendChild(displayCanvas);
    const dcCtx = displayCanvas.getContext('2d');
    dcCtx.putImageData(image.data, 0, 0);
  });

  dropspaceEl.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  });

  dropspaceEl.addEventListener('drop', (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length < 1) return;
    ImageHandling.loadFile(image)(files[0]);
  });

};

init();
