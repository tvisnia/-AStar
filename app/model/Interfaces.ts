import {Point} from './../commons/types';

export interface Node extends Point {
  h: number;
  f: number;
  parent: Node | null;
  isInOpened: boolean;
  isInClosed: boolean;
  isObstacle: boolean;
}

export const defaultNode = (x: number, y: number): Node => ({
  x,
  y,
  h: 0,
  f: 0,
  parent: null,
  isInOpened: false,
  isInClosed: false,
  isObstacle: false,
});
