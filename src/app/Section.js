/* global paper */
/**
   Sections
 */

import {gaussianRand} from './Util';

export const create = (points) => {
  return {
    points
  };
};

const midpoint = (p1, p2) => {
  const xdiff = p2.x - p1.x;
  const ydiff = p2.y - p1.y;
  //const r = gaussianRand();
  const r = 0.5;

  return new paper.Point(p1.x + (xdiff * r), p1.y + (ydiff * r));
};

export const subdivide = (section) => {
  const [p1, p2, p3] = section.points;

  const p12 = midpoint(p1, p2);
  const p23 = midpoint(p2, p3);
  const p31 = midpoint(p3, p1);

  return [
    create([p1, p12, p31]),
    create([p2, p23, p12]),
    create([p3, p31, p23]),
    create([p12, p23, p31])
  ];
};

export const path = (section) => {
  const [p1, p2, p3] = section.points;
  const path = new paper.Path();
  path.add(p1);
  path.add(p2);
  path.add(p3);
  path.closed = true;
  return path;
};
