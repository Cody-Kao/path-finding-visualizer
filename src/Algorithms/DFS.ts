import { CubeOptions, directions } from "../Const/Const";
import { AlgorithmAnimationArray } from "../Types/Types";

export const DFS = (
  grid: number[][],
  start: [number, number],
  destination: [number, number],
): {
  exploreArray: AlgorithmAnimationArray;
  pathArray: AlgorithmAnimationArray;
  actualCost: number;
} => {
  const exploreArray: AlgorithmAnimationArray = [];
  const pathArray: AlgorithmAnimationArray = [];
  const rows = grid.length;
  const cols = grid[0].length;

  let actualCost = 0;

  const isValid = (row: number, col: number): boolean => {
    return (
      row >= 0 &&
      row < rows &&
      col >= 0 &&
      col < cols &&
      grid[row][col] != 0 &&
      grid[row][col] != 5
    );
  };

  const visited = new Set<string>();
  visited.add(`${start[0]},${start[1]}`);

  const parentMap: { [key: string]: [number, number] | null } = {};
  parentMap[`${start[0]},${start[1]}`] = null;

  const stack: [number, number][] = [start];

  const dfs = (): boolean => {
    const [x, y] = stack.pop()!; // 加"!"讓TS知道說stack不可能為空，一定會pop出東西
    exploreArray.push([x, y]);
    if (x == destination[0] && y == destination[1]) {
      let current: [number, number] | null = destination;
      while (current) {
        actualCost += CubeOptions[grid[current[0]][current[1]]].cost;
        pathArray.push(current);
        current = parentMap[`${current[0]},${current[1]}`];
      }
      pathArray.reverse();
      return true;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (isValid(nx, ny) && !visited.has(`${nx},${ny}`)) {
        stack.push([nx, ny]);
        visited.add(`${nx},${ny}`);
        parentMap[`${nx},${ny}`] = [x, y];
        if (dfs()) {
          return true;
        }
      }
    }

    return false;
  };

  dfs();

  return { exploreArray, pathArray, actualCost };
};
