
import './index.html';
import './style/style.css';
import './images/favicon.ico';

function Point(x, y) {
  return {x: x, y: y};
}

function Triangle(p1, p2, p3) {
  return {p1: p1, p2: p2, p3: p3};
}
function Diamond(p1, p2, p3, p4) {
  return {p1: p1, p2: p2, p3: p3, p4: p4};
}

// Assume angle is already in radians
function calcTriangle(size, startPoint) {
  var endX = startPoint.x + (Math.sin(angle) * size);
  var endY = startPoint.y + (Math.cos(angle) * size);
}

function drawDiamond(ctx, diamond) {
  ctx.beginPath();
  ctx.moveTo(diamond.p1.x, diamond.p1.y);
  ctx.lineTo(diamond.p2.x, diamond.p2.y);
  ctx.lineTo(diamond.p3.x, diamond.p3.y);
  ctx.lineTo(diamond.p4.x, diamond.p4.y);
  ctx.closePath();
  ctx.fill();
}

function drawScene(diamonds) {

  const canvas = document.getElementById('sketch');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  var i;
  var l = diamonds.length;
  for (i = 0; i < l; i += 1) {
    drawDiamond(ctx, diamonds[i]);
  }
}

var diamonds = [
  Diamond(Point(25, 0), Point(50, 25), Point(25, 50), Point(0, 25))
];

drawScene(diamonds);
