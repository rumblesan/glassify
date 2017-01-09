/**
   Square Grid
*/

import _ from 'underscore';
import Victor from 'victor';

import * as Section from '../Section';

export const create = (size, width, height) => {
  const gridPoints = points(size, width, height);
  const gridSections = sections(gridPoints, width, height);
  return {
    gridPoints,
    gridSections
  };
};

const points = (size, width, height) => {
  const ps = {};
  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      ps[`${x}:${y}`] = {
        coords: {x, y},
        pos: Victor(x * size, y * size)
      };
    }
  }
  return ps;
};

const sections = (points, width, height) => {
  const sects = [];
  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      const s1p1 = points[`${x}:${y}`];
      const s1p2 = points[`${x + 1}:${y + 1}`];
      const s1p3 = points[`${x}:${y + 1}`];
      if (s1p1 && s1p2 && s1p3) {
        sects.push(
          Section.create([s1p1, s1p2, s1p3])
        );
      }
      const s2p1 = points[`${x}:${y}`];
      const s2p2 = points[`${x + 1}:${y + 1}`];
      const s2p3 = points[`${x}:${y + 1}`];
      if (s2p1 && s2p2 && s2p3) {
        sects.push(
          Section.create([s2p1, s2p2, s2p3])
        );
      }
    }
  }
  return sects;
};
