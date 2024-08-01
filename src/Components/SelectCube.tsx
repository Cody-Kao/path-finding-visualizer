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
        {CubeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-[20px] flex items-center px-1">
        <div
          // cube - 2是為了讓index可以對到，因為cubeOptions的index是0 1 2，而cube的數值則是2 3 4
          className={`h-4 w-4 rounded-full border-2 opacity-90 ${CubeOptions[cube - 2].color}`}
        ></div>
      </div>
    </div>
  );
}
