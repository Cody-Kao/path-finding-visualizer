import { maxSpeed, minSpeed, stepSpeed } from "../Const/Const";
import { usePathFindContext } from "../Context/PathFindContext";

export default function SelectSpeed({
  isDisabled,
  speed,
}: {
  isDisabled: boolean;
  speed: number;
}) {
  const { setSpeed } = usePathFindContext();
  return (
    <input
      type="range"
      min={minSpeed}
      max={maxSpeed}
      value={speed}
      step={stepSpeed}
      disabled={isDisabled}
      onChange={(e) => setSpeed(parseInt(e.target.value))}
      className="text-[1rem] xl:text-[1.2rem]"
    />
  );
}
