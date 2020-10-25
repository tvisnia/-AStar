//dane testowe

const side = 10;
const start = {x: 0, y: 9};
const end = {x: 9, y: 0};
const obstacles = [
  {x: 4, y: 2},
  {x: 5, y: 2},
  {x: 6, y: 2},
  {x: 7, y: 2},
  {x: 7, y: 3},
  {x: 7, y: 4},
  {x: 7, y: 5},
  {x: 7, y: 6},
];

//kod źródłowy

const DIAGONAL_COST = Math.sqrt(2);
const V_H_COST = 1;

type Point = {x: number; y: number};

interface MNode extends Point {
  h: number;
  f: number;
  parent: MNode | null;
  isInOpened: boolean;
  isInClosed: boolean;
  isObstacle: boolean;
}

const defaultNode = (x: number, y: number): MNode => ({
  x,
  y,
  h: 0,
  f: 0,
  parent: null,
  isInOpened: false,
  isInClosed: false,
  isObstacle: false,
});

const equals = (p1: Point | MNode, p2: Point | MNode) =>
  p1.x === p2.x && p1.y === p2.y;

const printNode = (node: MNode) => `[${node.x},${node.y}]`;

const checkNeighbour = (
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

const initNodesGrid = (
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

const getNodeWithSmallestF = (openNodes: MNode[]): MNode =>
  openNodes.sort((n1, n2) => n1.f - n2.f)[0];

const calculateEuclideanH = (node: MNode, end: Point) =>
  Math.sqrt(Math.pow(node.x - end.x, 2) + Math.pow(node.y - end.y, 2));

const calculatePath = (
  size: number,
  start: Point,
  end: Point,
  obstacles: Point[],
): {
  grid?: MNode[][];
  path: MNode[];
} => {
  let grid: MNode[][] = initNodesGrid(size, end, obstacles);
  const openNodes: MNode[] = [];
  let closedNodes: MNode[] = [];

  //add START to OPEN
  grid[start.y][start.x].isInOpened = true;
  openNodes.push(grid[start.y][start.x]);

  let currentNode: MNode;

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
    let neighbour: MNode;
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
  const path: MNode[] = [];
  if (endInClosedNodes) {
    console.log('Shortest path : ');
    let currentNode: MNode = grid[end.y][end.x];
    path.push(currentNode);

    while (currentNode.parent !== null) {
      path.push(currentNode.parent);
      currentNode = currentNode.parent;
    }
    path.reverse();
    path.forEach((node) => console.log(printNode(node)));
  } else console.log('path does not exists.');
  return {
    path,
    grid,
  };
};

calculatePath(side, start, end, obstacles);
