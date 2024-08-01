import { createContext, ReactNode, useContext, useState } from "react";
import { AlgorithmType, CubeType } from "../Types/Types";
import { minSpeed } from "../Const/Const";

export const PathFindContext = createContext<PathFindContextType | undefined>(
  undefined,
);

interface PathFindContextType {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  grid: number[][];
  setGrid: (newGrid: number[][]) => void;
  algorithm: AlgorithmType;
  setAlgorithm: (newAlgo: AlgorithmType) => void;
  cube: CubeType;
  setCube: (newCube: CubeType) => void;
  speed: number;
  setSpeed: (speed: number) => void;
}

export const usePathFindContext = () => {
  const context = useContext(PathFindContext);
  if (!context) {
    throw new Error(
      "useVisualizerContext must be used within VisualizerContextProvider",
    );
  }
  return context;
};

export default function PathFindContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>(
    "Dijkstra" as AlgorithmType,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [cube, setCube] = useState<CubeType>(2);
  const [grid, setGrid] = useState<number[][]>([]);
  const [speed, setSpeed] = useState<number>(minSpeed);

  const value = {
    isPlaying,
    setIsPlaying,
    grid,
    setGrid,
    algorithm,
    setAlgorithm,
    cube,
    setCube,
    speed,
    setSpeed,
  };
  return (
    <PathFindContext.Provider value={value}>
      {children}
    </PathFindContext.Provider>
  );
}
