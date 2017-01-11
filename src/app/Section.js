/**
   Sections
 */

import _ from 'underscore';
import Victor from 'victor';

export const create = (points) => {
  return {
    points,
    lines: lines(points),
    subSections: []
  };
};

export const lines = (points) => {
  const numP = _.size(points);
  const ls = [];
  for (let i = 0; i < numP; i += 1) {
    ls.push([points[i], points[(i + 1) % numP]]);
  }
  return ls;
};

export const subdivide = (section, fractalise) => {
  const points = section.points;
  const numP = _.size(points);
  const newPoints = [];
  for (let i = 0; i < numP; i += 1) {
    const xdiff = points[(i + 1) % numP].x - points[i].x;
    const ydiff = points[(i + 1) % numP].y - points[i].y;
    const r = Math.random();
    newPoints.push(Victor(points[i].x + (xdiff * r), points[i].y + (ydiff * r)));
  }
  const newSubsection = create(newPoints);
  if (Math.random() < fractalise) {
    subdivide(newSubsection, fractalise - 0.2);
  }
  section.subSections = [newSubsection];
  return section;
};
