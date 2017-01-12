/**
   Image Filter
  */

import _ from 'underscore';

import * as Grid from './grids/TriangleGrid';
import * as Section from './Section';

export const create = () => {
  return {};
};

export const grid = (type, sizing, width, height) => {
  const grid = Grid.create(sizing, width, height);
  const fractalise = 0.7;

  return {
    sections: _.map(Grid.sections(grid), (s) => Section.subdivide(s, fractalise))
  };
};
