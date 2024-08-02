import { CubeOptions } from "../Const/Const";
import { usePathFindContext } from "../Context/PathFindContext";
import { CubeType } from "../Types/Types";

export default function SelectCube({ isDisabled }: { isDisabled: boolean }) {
  const { cube, setCube } = usePathFindContext();
  return (
    <div className="relative inline-block">
      <select
        className="bg-slate-700 px-3 py-1 pr-10 text-[1rem] text-[#fff] xl:text-[1.2rem]"
        onChange={(e) => setCube(parseInt(e.target.value) as CubeType)}
        disabled={isDisabled}
      >
        {Object.values(CubeOptions).map((option) =>
          option.value <= 1 ? (
            ""
          ) : (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ),
        )}
      </select>
      <div className="absolute inset-y-0 right-[15px] flex items-center px-1 md:right-[20px]">
        <div
          className={`h-4 w-4 rounded-full border-2 opacity-90 ${
            CubeOptions[cube].color
          }`}
        ></div>
      </div>
    </div>
  );
}
