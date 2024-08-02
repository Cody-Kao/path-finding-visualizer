import { CubeOptions, directions } from "../Const/Const";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

// this function is primarily for calculating the cost of global shortest path
export const Dijkstra_BestCost = (
  grid: number[][],
  start: [number, number],
  destination: [number, number],
): { bestCost: number; shortestPath: [number, number][] } => {
  const rows = grid.length;
  const cols = grid[0].length;
  let bestCost = 0;
  const shortestPath: [number, number][] = [];
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false),
  );

  const parentMap: ([number, number] | null)[][] = Array.from(
    { length: rows },
    () => Array(cols).fill(null),
  );

  const distance: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity),
  );
  distance[start[0]][start[1]] = 0;

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

    if (row == destination[0] && col == destination[1]) {
      bestCost = distance[row][col];
      let current: [number, number] | null = [row, col];
      while (current != null) {
        shortestPath.push(current);
        current = parentMap[current[0]][current[1]];
      }
      shortestPath.reverse();
      return { bestCost, shortestPath };
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

  return { bestCost, shortestPath };
};
