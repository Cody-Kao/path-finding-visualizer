import { CubeOptions, directions } from "../Const/Const";
import { AlgorithmAnimationArray } from "../Types/Types";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

type Node = {
  position: [number, number];
  g: number;
  f: number;
  parent: Node | null;
};

const manhattanDistance = (
  a: [number, number],
  b: [number, number],
): number => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

export const AStar = (
  grid: number[][],
  start: [number, number],
  destination: [number, number],
): {
  exploreArray: AlgorithmAnimationArray;
  pathArray: AlgorithmAnimationArray;
  actualCost: number;
} => {
  const rows = grid.length;
  const cols = grid[0].length;
  const exploreArray: AlgorithmAnimationArray = [];
  const pathArray: AlgorithmAnimationArray = [];
  let actualCost = 0;
  const isValid = (x: number, y: number): boolean => {
    return (
      x >= 0 &&
      x < rows &&
      y >= 0 &&
      y < cols &&
      grid[x][y] !== 0 &&
      grid[x][y] !== 5
    );
  };

  const startNode: Node = {
    position: start,
    g: 0,
    f: manhattanDistance(start, destination),
    parent: null,
  };

  const openQueue = new MinPriorityQueue<Node>(
    (node: Node) => node.f * 10 + (node.f - node.g), // 讓他先判斷f 如果一樣的話再判斷h 避免掉同樣cost的node在heap裡面的順序不理想
  );
  openQueue.enqueue(startNode);
  const closedSet: Set<string> = new Set();
  const openSet: Map<string, Node> = new Map([[start.toString(), startNode]]);

  const getPath = (node: Node): [number, number][] => {
    const path: [number, number][] = [];
    let currentNode: Node | null = node;
    while (currentNode) {
      actualCost +=
        CubeOptions[grid[currentNode.position[0]][currentNode.position[1]]]
          .cost;
      path.unshift(currentNode.position);
      currentNode = currentNode.parent;
    }
    return path;
  };

  while (!openQueue.isEmpty()) {
    const currentNode = openQueue.dequeue()!;
    const currentKey = currentNode.position.toString();
    openSet.delete(currentKey);

    exploreArray.push(currentNode.position);

    if (
      currentNode.position[0] === destination[0] &&
      currentNode.position[1] === destination[1]
    ) {
      pathArray.push(...getPath(currentNode));
      return { exploreArray, pathArray, actualCost };
    }

    closedSet.add(currentKey);

    for (const [dx, dy] of directions) {
      const newX = currentNode.position[0] + dx;
      const newY = currentNode.position[1] + dy;
      if (!isValid(newX, newY)) continue;

      const neighborPosition: [number, number] = [newX, newY];
      const neighborKey = neighborPosition.toString();

      if (closedSet.has(neighborKey)) continue;

      const g = currentNode.g + CubeOptions[grid[newX][newY]].cost;
      const h = manhattanDistance(neighborPosition, destination);
      const f = g + h;
      const newNode: Node = {
        position: neighborPosition,
        g,
        f,
        parent: currentNode,
      };

      if (!openSet.has(neighborKey)) {
        openQueue.enqueue(newNode);
        openSet.set(neighborKey, newNode);
      } else {
        const existingNode = openSet.get(neighborKey)!;
        if (g < existingNode.g) {
          existingNode.g = g;
          existingNode.f = f;
          existingNode.parent = currentNode;
          // Update the node in the priority queue
          openQueue.remove((node) => node.position.toString() === neighborKey);
          openQueue.enqueue(existingNode);
        }
      }
    }
  }

  return { exploreArray, pathArray, actualCost };
};
