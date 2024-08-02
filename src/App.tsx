import { useEffect, useRef, useState } from "react";
import { usePathFindContext } from "./Context/PathFindContext";
import SelectAlgorithm from "./Components/SelectAlgorithm";
import SelectCube from "./Components/SelectCube";
import {
  AlgorithmDescriptionDict,
  AlgorithmFunctionDict,
  cubeColors,
} from "./Const/Const";
import { FaPlayCircle } from "react-icons/fa";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { AlgorithmAnimationArray, CubeType } from "./Types/Types";
import SelectSpeed from "./Components/SelectSpeed";
import ShowCost from "./Components/ShowCost";
import { Dijkstra_BestCost } from "./Algorithms/Dijkstra_BestCost";

function App() {
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);
  const {
    isPlaying,
    setIsPlaying,
    grid,
    setGrid,
    cube,
    algorithm,
    speed,
    isAnimationComplete,
    setIsAnimaitionComplete,
  } = usePathFindContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeSize = 24;

  const [isMouseUp, setIsMouseUp] = useState<boolean>(true);

  // 顯示final cost
  const [bestCost, setBestCost] = useState<number>(Infinity);
  const [actualCost, setActualCost] = useState<number>(Infinity);
  // 顯示最佳路徑
  const [answerPath, setAnswerPath] = useState<[number, number][]>([]);

  const resetGrid = (rows: number, cols: number) => {
    const newGrid = Array.from({ length: rows }, () => Array(cols).fill(2));
    if (rows > 0 && cols > 0) {
      newGrid[0][0] = 0;
      newGrid[rows - 1][cols - 1] = 1;
    }

    setGrid(newGrid);
  };

  const clearAnimation = () => {
    const id = setTimeout(() => {
      for (let i = id; i >= 0; i--) {
        clearTimeout(i);
      }
    }, 0);
    Array.from(containerRef.current!.getElementsByClassName("cube")).forEach(
      (cube) => {
        cube.classList.remove("explored", "result", "answer");
      },
    );
    setIsPlaying(false);
    setIsAnimaitionComplete(false);
    setBestCost(Infinity);
    setActualCost(Infinity);
  };

  const handleReset = () => {
    clearAnimation();
    resetGrid(rows, cols);
  };

  const runAnimation = (
    exploreArray: AlgorithmAnimationArray,
    pathArray: AlgorithmAnimationArray,
  ) => {
    const curSpeed = Math.floor(1000 / speed);
    const cubes = containerRef.current?.getElementsByClassName("cube");
    exploreArray.forEach((indexes, index) => {
      const [row, col] = indexes;
      setTimeout(() => {
        // containerRef.current?.getElementsByClassName("cube") 這行是從parent div去把所有button都選取
        if (cubes) {
          cubes[row * cols + col].classList.add("explored");
        }
      }, curSpeed * index);
    });
    const finalCountDown = curSpeed * (exploreArray.length - 1);
    setTimeout(() => {
      pathArray.forEach((indexes, index) => {
        const [row, col] = indexes;
        setTimeout(() => {
          if (cubes) {
            cubes[row * cols + col].classList.add("result");
          }
        }, 10 * index);
      });
      setTimeout(() => {
        setIsAnimaitionComplete(true);
      }, pathArray.length * 10);
    }, finalCountDown);
  };

  const handleClickPlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // run animation and handle the case when a function is not found in dictionary
      const f = AlgorithmFunctionDict[algorithm];
      if (!f) {
        alert("no available algorithm is chosen");
        return;
      }
      if (isPlaying) {
        return;
      }
      const start: [number, number] = [0, 0];
      const destination: [number, number] = [rows - 1, cols - 1];
      // run chosen algorithm
      const { exploreArray, pathArray, actualCost } = f!(
        grid,
        start,
        destination,
      );
      if (pathArray.length === 0) {
        alert("No valid path found");
        return;
      }
      // handle final cost displaying
      const { bestCost, shortestPath } = Dijkstra_BestCost(
        grid,
        start,
        destination,
      );
      setBestCost(bestCost);
      setActualCost(actualCost);
      setAnswerPath(shortestPath);
      runAnimation(exploreArray, pathArray);
    } else {
      clearAnimation();
    }
  };

  const displayAnswerPath = (answerPath: [number, number][]) => {
    const cubes = containerRef.current?.getElementsByClassName("cube");
    for (const [row, col] of answerPath) {
      if (cubes) {
        cubes[row * cols + col].classList.toggle("answer");
      }
    }
  };

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const containerWidth = containerRef.current.clientWidth;
        const newRows = Math.floor((containerHeight - 20) / cubeSize);
        const newCols = Math.floor((containerWidth - 20) / cubeSize);
        setRows(newRows);
        setCols(newCols);

        // Initialize cubes array here
        resetGrid(newRows, newCols);
      }
    };

    const debouncedResize = debounce(resize, 100);

    window.addEventListener("resize", debouncedResize);

    // Initial resize call
    resize();

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  // Debounce function to limit the rate at which a function can fire
  const debounce = (func: Function, wait: number) => {
    let timeout: number;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleMouseUp = () => {
    if (isPlaying) {
      return;
    }
    setIsMouseUp(true);
  };

  const handleMouseDown = () => {
    if (isPlaying) {
      return;
    }
    setIsMouseUp(false);
  };

  const changeCube = (rowIndex: number, colIndex: number, cube: CubeType) => {
    if (isPlaying) {
      return;
    }
    if (grid[rowIndex][colIndex] == 0 || grid[rowIndex][colIndex] == 1) {
      return;
    }
    const newGrid = grid.slice();
    if (grid[rowIndex][colIndex] == cube) {
      newGrid[rowIndex][colIndex] = 2;
    } else {
      newGrid[rowIndex][colIndex] = cube;
    }
    setGrid(newGrid);
  };

  const handleMouseEnter = (
    rowIndex: number,
    colIndex: number,
    cube: CubeType,
  ) => {
    if (isMouseUp) {
      return;
    }
    changeCube(rowIndex, colIndex, cube);
  };

  return (
    <div className="box-border grid h-screen w-screen grid-rows-[1fr_5fr] justify-items-center gap-2 overflow-hidden bg-slate-900 p-[.5rem] md:grid-rows-[1fr_2fr_5fr]">
      <div className="flex w-screen flex-col items-center justify-center gap-4 p-4 pb-0 text-center lg:flex-row lg:justify-evenly lg:gap-8">
        <a href="" className="lg:w-1/2">
          <span className="text-[1.5rem] text-[#fff] xl:pr-8 xl:text-[2rem]">
            Path Finding Visualizer
          </span>
        </a>
        <div className="m-0 flex w-screen flex-wrap items-center justify-center gap-5">
          <div>
            <span className="text-[1rem] xl:text-[1.2rem]">Algorithm: </span>
            <SelectAlgorithm isDisabled={isPlaying} />
          </div>
          <div>
            <span className="text-[1rem] xl:text-[1.2rem]">Tile: </span>
            <SelectCube isDisabled={isPlaying} />
          </div>
          <div>
            <span className="text-[1rem] xl:text-[1.2rem]">Speed: </span>
            <SelectSpeed isDisabled={isPlaying} speed={speed} />
          </div>
          <button className="text-[2rem] text-[#43c2e5]" onClick={handleReset}>
            <GrPowerReset />
          </button>
          <button
            className="text-[2em] text-[#43c2e5]"
            onClick={handleClickPlay}
          >
            {isPlaying ? <IoReturnDownBackSharp /> : <FaPlayCircle />}
          </button>
        </div>
      </div>
      <div className="relative hidden w-4/5 border border-sky-700 p-4 pb-2 sm:flex lg:w-3/5">
        <div className="flex w-2/3 flex-col items-start justify-start gap-3">
          <a
            href={AlgorithmDescriptionDict[algorithm]?.link}
            target="_blank"
            className="underline"
          >
            <span className="text-[1rem] lg:text-[1.5rem]">
              {AlgorithmDescriptionDict[algorithm]?.title}
            </span>
          </a>
          <span className="text-[.8rem] lg:text-[1rem]">
            {AlgorithmDescriptionDict[algorithm]?.description}
          </span>
        </div>
        <div className="flex w-1/3 flex-col items-center gap-3">
          <a
            href="https://en.wikipedia.org/wiki/Computational_complexity"
            target="_blank"
            className="underline"
          >
            <span className="text-[1rem] lg:text-[1.5rem]">Complexity</span>
          </a>
          <div className="flex flex-col items-center justify-center gap-2 text-[.8rem] text-gray-500 lg:text-[1rem]">
            <span>
              Time:
              <span className="ml-2">
                {AlgorithmDescriptionDict[algorithm]?.timeComplexity}
              </span>
            </span>
            <span>
              Space:
              <span className="ml-2">
                {AlgorithmDescriptionDict[algorithm]?.spaceComplexity}
              </span>
            </span>
          </div>
        </div>
        <ShowCost
          bestCost={bestCost}
          actualCost={actualCost}
          isDisable={!(isPlaying && isAnimationComplete)} // 要動畫結束 並且按過開始鍵才能觸發
          onToggle={() => displayAnswerPath(answerPath)} // 用來控制App組件的顯示最佳路徑的state
        />
      </div>
      <div
        id="grid-container"
        ref={containerRef}
        className={`grid h-3/4 w-3/4 max-w-[800px] items-center justify-center gap-1 md:h-full md:w-full`}
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cubeSize}px)`,
          gridTemplateRows: `repeat(${rows},${cubeSize}px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              value={value}
              className={`cube aspect-square opacity-90 ${cubeColors[value]}`}
              onMouseUp={handleMouseUp}
              onMouseDown={handleMouseDown}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex, cube)}
              onClick={() => changeCube(rowIndex, colIndex, cube)}
            ></button>
          )),
        )}
      </div>
    </div>
  );
}

export default App;
