/**
   Sections
 */

import _ from 'underscore';

export const create = (points) => {
  return {
    points
  };
};

export const lines = ({points}) => {
  const numP = _.size(points);
  const ls = [];
  for (let i = 0; i < numP; i += 1) {
    ls.push([points[i], points[(i + 1) % numP]]);
  }
  return ls;
};
