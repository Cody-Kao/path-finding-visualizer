export type CubeType = 2 | 3 | 4 | 5;

export type AlgorithmDescription = {
  title: string;
  link: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
};

export type AlgorithmType = "Dijkstra" | "A*" | "DFS" | "BFS";

export type AlgorithmAnimationArray = [number, number][];

export type AlgorithmFunction = (
  grid: number[][],
  start: [number, number],
  destination: [number, number],
) => {
  exploreArray: AlgorithmAnimationArray;
  pathArray: AlgorithmAnimationArray;
  actualCost: number;
};
