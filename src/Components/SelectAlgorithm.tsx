import { usePathFindContext } from "../Context/PathFindContext";
import { AlgorithmType } from "../Types/Types";

export default function SelectAlgorithm({
  isDisabled,
}: {
  isDisabled: boolean;
}) {
  const { setAlgorithm } = usePathFindContext();
  return (
    <select
      className="bg-slate-700 px-3 py-1 text-[1rem] text-[#fff] xl:text-[1.2rem]"
      onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
      disabled={isDisabled}
    >
      <option value="Dijkstra">Dijkstra</option>
      <option value="A*">A*</option>
      <option value="A*Average">A*(average cost)</option>
      <option value="DFS">DFS</option>
      <option value="BFS">BFS</option>
    </select>
  );
}
