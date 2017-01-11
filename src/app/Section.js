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

export const subdivide = (section) => {
  const points = section.points;
  const numP = _.size(points);
  const newPoints = [];
  for (let i = 0; i < numP; i += 1) {
    newPoints.push(Victor(
      (points[i].x + points[(i + 1) % numP].x) / 2,
      (points[i].y + points[(i + 1) % numP].y) / 2
    ));
  }
  const newSubsection = create(newPoints);
  section.subSections = [newSubsection];
  return section;
};
