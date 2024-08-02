import { CubeOptions, directions } from "../Const/Const";
import { AlgorithmAnimationArray } from "../Types/Types";

export const BFS = (
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
  let actualCost = 0;
  const exploreArray: AlgorithmAnimationArray = [];
  const pathArray: AlgorithmAnimationArray = [];

  const isValid = (x: number, y: number) => {
    return (
      x >= 0 &&
      x < rows &&
      y >= 0 &&
      y < cols &&
      grid[x][y] !== 0 &&
      grid[x][y] !== 5
    );
  };

  const queue: [number, number][] = [start];
  const visited = new Set<string>();
  visited.add(`${start[0]},${start[1]}`);

  const parentMap: { [key: string]: [number, number] | null } = {};
  parentMap[`${start[0]},${start[1]}`] = null;

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;
    exploreArray.push([x, y]);

    if (x === destination[0] && y === destination[1]) {
      let current: [number, number] | null = destination;
      while (current) {
        actualCost += CubeOptions[grid[current[0]][current[1]]].cost;
        pathArray.push(current);
        current = parentMap[`${current[0]},${current[1]}`];
      }
      pathArray.reverse();
      break;
    }

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (isValid(newX, newY) && !visited.has(`${newX},${newY}`)) {
        queue.push([newX, newY]);
        visited.add(`${newX},${newY}`);
        parentMap[`${newX},${newY}`] = [x, y];
      }
    }
  }

  return { exploreArray, pathArray, actualCost };
};
