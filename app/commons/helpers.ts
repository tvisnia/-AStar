import {defaultNode, Node as MNode} from './../model/Interfaces';
import {Point} from './types';

export const equals = (p1: Point | MNode, p2: Point | MNode) =>
  p1.x === p2.x && p1.y === p2.y;

export const printNode = (node: MNode) => `[${node.x},${node.y}]`;

export const checkNeighbour = (
  currentNode: MNode,
  neighbour: MNode,
  g: number,
  openNodes: MNode[],
) => {
  const neighbourIsNotObstacle = !neighbour.isObstacle;
  const neighbourIsNotInClosed = !neighbour.isInClosed;
  if (neighbourIsNotObstacle && neighbourIsNotInClosed) {
    const neighbourNewF = neighbour.h + g;
    const neighbourIsNotInOpen = !neighbour.isInOpened;
    if (neighbourIsNotInOpen || neighbourNewF < neighbour.f) {
      neighbour.f = neighbourNewF;
      neighbour.parent = currentNode;
      if (neighbourIsNotInOpen) {
        neighbour.isInOpened = true;
        openNodes.push(neighbour);
      }
    }
  }
};

export const initNodesGrid = (
  size: number,
  end: Point,
  obstacles: Point[],
): MNode[][] =>
  [...Array(size)].map((_, y) =>
    [...Array(size)].map((_, x) => {
      const node = defaultNode(x, y);
      const h = calculateEuclideanH(node, end);
      const isObstacle = !!obstacles.find((o) => equals(o, node));
      return isObstacle ? {...node, isObstacle} : {...node, h};
    }),
  );

export const getNodeWithSmallestF = (openNodes: MNode[]): MNode =>
  openNodes.sort((n1, n2) => n1.f - n2.f)[0];

const calculateEuclideanH = (node: MNode, end: Point) =>
  Math.sqrt(Math.pow(node.x - end.x, 2) + Math.pow(node.y - end.y, 2));
