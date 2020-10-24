import {V_H_COST, DIAGONAL_COST} from './Const';
import {
  initNodesGrid,
  getNodeWithSmallestF,
  equals,
  checkNeighbour,
  printNode,
} from './../commons/helpers';
import {Point} from '../commons/types';
import {Node} from './../model/Interfaces';

export const calculatePath = (
  size: number,
  start: Point,
  end: Point,
  obstacles: Point[],
): Node[] => {
  let grid: Node[][] = initNodesGrid(size, end, obstacles);
  const openNodes: Node[] = [];
  let closedNodes: Node[] = [];

  //add START to OPEN
  grid[start.y][start.x].isInOpened = true;
  openNodes.push(grid[start.y][start.x]);

  let currentNode: Node;

  while (openNodes.length !== 0) {
    const node = getNodeWithSmallestF(openNodes);
    const currentNodeIndex = openNodes.findIndex((n) => equals(node, n));

    currentNode = node; // currentNode = node in OPEN with lowest F
    if (currentNode === null) {
      break;
    }
    openNodes.splice(currentNodeIndex, 1); //remove currentNode from OPEN
    closedNodes.push(currentNode);
    currentNode.isInOpened = false;
    currentNode.isInClosed = true;

    //if END found (currentNode = END)
    if (equals(currentNode, end)) {
      break;
    }

    //check currentNode neighbours
    let neighbour: Node;
    if (currentNode.x - 1 >= 0) {
      neighbour = grid[currentNode.y][currentNode.x - 1];
      const neighbourG = currentNode.f + V_H_COST;
      checkNeighbour(currentNode, neighbour, neighbourG, openNodes);

      if (currentNode.y - 1 >= 0) {
        neighbour = grid[currentNode.y - 1][currentNode.x - 1];
        const neighbourG = currentNode.f + DIAGONAL_COST;
        checkNeighbour(currentNode, neighbour, neighbourG, openNodes);
      }

      if (currentNode.y + 1 < grid[0].length) {
        neighbour = grid[currentNode.y + 1][currentNode.x - 1];
        const neighbourG = currentNode.f + DIAGONAL_COST;
        checkNeighbour(currentNode, neighbour, neighbourG, openNodes);
      }
    }

    if (currentNode.y - 1 >= 0) {
      neighbour = grid[currentNode.y - 1][currentNode.x];
      const neighbourG = currentNode.f + V_H_COST;
      checkNeighbour(currentNode, neighbour, neighbourG, openNodes);
    }

    if (currentNode.y + 1 < grid[0].length) {
      neighbour = grid[currentNode.y + 1][currentNode.x];
      const neighbourG = currentNode.f + V_H_COST;
      checkNeighbour(currentNode, neighbour, neighbourG, openNodes);
    }

    if (currentNode.x + 1 < grid.length) {
      neighbour = grid[currentNode.y][currentNode.x + 1];
      const neighbourG = currentNode.f + V_H_COST;
      checkNeighbour(currentNode, neighbour, neighbourG, openNodes);

      if (currentNode.y - 1 >= 0) {
        neighbour = grid[currentNode.y - 1][currentNode.x + 1];
        const neighbourG = currentNode.f + DIAGONAL_COST;
        checkNeighbour(currentNode, neighbour, neighbourG, openNodes);
      }

      if (currentNode.y + 1 < grid[0].length) {
        neighbour = grid[currentNode.y + 1][currentNode.x + 1];
        const neighbourG = currentNode.f + DIAGONAL_COST;
        checkNeighbour(currentNode, neighbour, neighbourG, openNodes);
      }
    }
  }
  // display and return path
  const endInClosedNodes = !!~closedNodes.findIndex((node) =>
    equals(node, end),
  );
  if (endInClosedNodes) {
    const path: Node[] = [];
    console.log('Path : ');
    let currentNode: Node = grid[end.y][end.x];
    path.push(currentNode);

    while (currentNode.parent !== null) {
      path.push(currentNode.parent);
      currentNode = currentNode.parent;
    }
    path.reverse();
    path.forEach((node) => console.log(printNode(node)));
    return path;
  } else {
    // Path does not exists
    return [];
  }
};
