import { runAStar_Average } from "../Algorithms/AStar_Average";
import { runAStar } from "../Algorithms/AStar";
import { runBFS } from "../Algorithms/BFS";
import { runDFS } from "../Algorithms/DFS";
import { runDijkstra } from "../Algorithms/Dijkstra";
import { AlgorithmDescription, AlgorithmFunction } from "../Types/Types";

export const minSpeed = 10;
export const maxSpeed = 100;
export const stepSpeed = 10;

export const cubeColors = [
  "bg-yellow-500", // start
  "bg-red-700", // end
  "bg-cyan-700", // default
  "bg-yellow-700", // soil
  "bg-[#b9bd75]", // sand
  "bg-[#8a8a8a]", // wall
];

export const CubeOptions: {
  [key: number]: {
    value: number;
    label?: string;
    color?: string;
    cost: number;
  };
} = {
  0: { value: 0, cost: 0 },
  1: { value: 1, cost: 0 },
  2: { value: 2, label: "Default(cost 1)", color: cubeColors[2], cost: 1 },
  3: { value: 3, label: "Soil(cost 2)", color: cubeColors[3], cost: 2 },
  4: { value: 4, label: "sand(cost 0)", color: cubeColors[4], cost: 0 },
  5: {
    value: 5,
    label: "Wall(can't pass)",
    color: cubeColors[5],
    cost: Infinity,
  },
};

export const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export const AlgorithmFunctionDict: {
  [algorithm: string]: AlgorithmFunction | null;
} = {
  runDijkstra: runDijkstra,
  "A*": runAStar,
  "A*Average": runAStar_Average,
  DFS: runDFS,
  BFS: runBFS,
};

export const AlgorithmDescriptionDict: {
  [algorithm: string]: AlgorithmDescription;
} = {
  Dijkstra: {
    title: "Dijkstra",
    link: "https://zh.wikipedia.org/zh-tw/%E6%88%B4%E5%85%8B%E6%96%AF%E7%89%B9%E6%8B%89%E7%AE%97%E6%B3%95",
    description:
      "戴克斯特拉演算法，專門解決帶權的單源最短路徑問題，但不能處理有負數權重的邊，也無法應對有負數循環的圖。",
    timeComplexity: "O((V + E)* log(E))",
    spaceComplexity: "O(V + E)",
  },
  "A*": {
    title: "A*",
    link: "https://zh.wikipedia.org/zh-tw/A*%E6%90%9C%E5%B0%8B%E6%BC%94%E7%AE%97%E6%B3%95",
    description:
      "A-star演算法綜合了Best First Search和Dijkstra演算法的優點，並透過啟發函式(heuristic function)作為搜尋策略，但若搜索策略較不優，可能無法找出最佳路徑。",
    timeComplexity: "O(E+VlogV)",
    spaceComplexity: "O(b^d)",
  },
  "A*Average": {
    title: "A*(Average Cost)",
    link: "https://zh.wikipedia.org/zh-tw/A*%E6%90%9C%E5%B0%8B%E6%BC%94%E7%AE%97%E6%B3%95",
    description:
      "該演算法使用的啟發函式為計算鄰近節點的平均花費作為該節點的花費，屬於不同heuristic function的實作，能更有效地預測終點距離進而走出最短路徑。",
    timeComplexity: "O(E+VlogV)",
    spaceComplexity: "O(b^d)",
  },
  DFS: {
    title: "DFS",
    link: "https://zh.wikipedia.org/zh-tw/%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2",
    description:
      "深度優先搜尋演算法，會以遍歷單一節點的所有子節點為優先的搜尋策略，也就是以'深度'為主，這一過程一直進行到找到結果或已可達的所有節點為止。所以並不能有效地找尋最短路徑。",
    timeComplexity: "O(V+E)",
    spaceComplexity: "O(V)",
  },
  BFS: {
    title: "BFS",
    link: "https://zh.wikipedia.org/zh-tw/%E5%B9%BF%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2",
    description:
      "廣度優先搜尋演算法，會一層一層地檢查圖中的所有節點以找尋結果，也就是以'廣度'為主，徹底地搜尋整張圖，直到找到結果或已可達的所有節點為止。所以並不能有效地找尋最短路徑。",
    timeComplexity: "O(V+E)",
    spaceComplexity: "O(V)",
  },
};
