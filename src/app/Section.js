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

const midpoint = (p1, p2, randomise, twist) => {
  const xdiff = p2.x - p1.x;
  const ydiff = p2.y - p1.y;
  let r;
  if (randomise) {
    r = gaussianRand();
  } else {
    r = twist;
  }

  return new paper.Point(p1.x + (xdiff * r), p1.y + (ydiff * r));
};

export const subdivide = (section, randomise, twist) => {
  const [p1, p2, p3] = section.points;

  const p12 = midpoint(p1, p2, randomise, twist);
  const p23 = midpoint(p2, p3, randomise, twist);
  const p31 = midpoint(p3, p1, randomise, twist);

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
