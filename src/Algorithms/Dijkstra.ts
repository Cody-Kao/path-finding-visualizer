import { CubeOptions, directions } from "../Const/Const";
import { AlgorithmAnimationArray } from "../Types/Types";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

export const Dijkstra = (
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

  // 這邊用2D array而不是dictionary去減少hash的overhead
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false),
  );
  // 這邊一樣用2D array而不是dictionary去減少hash的overhead
  const parentMap: ([number, number] | null)[][] = Array.from(
    { length: rows },
    () => Array(cols).fill(null),
  );

  const distance: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity),
  );
  distance[start[0]][start[1]] = 0;

  // 去比較index為2的值
  const heap = new MinPriorityQueue<[number, number, number]>(
    (array) => array[2],
  );
  heap.enqueue([start[0], start[1], 0]);

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

  while (!heap.isEmpty()) {
    const [row, col, curCost] = heap.dequeue();
    if (visited[row][col]) {
      continue;
    }
    visited[row][col] = true;
    exploreArray.push([row, col]);
    if (row == destination[0] && col == destination[1]) {
      let current: [number, number] = [row, col];
      while (current !== null) {
        actualCost += CubeOptions[grid[current[0]][current[1]]].cost;
        pathArray.push(current);
        current = parentMap[current[0]][current[1]]!;
      }
      pathArray.reverse();
      break;
    }
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (isValid(newRow, newCol) && !visited[newRow][newCol]) {
        const newCost = curCost + CubeOptions[grid[newRow][newCol]].cost;
        if (newCost < distance[newRow][newCol]) {
          distance[newRow][newCol] = newCost;
          parentMap[newRow][newCol] = [row, col];
          heap.enqueue([newRow, newCol, newCost]);
        }
      }
    }
  }

  return { exploreArray, pathArray, actualCost };
};
