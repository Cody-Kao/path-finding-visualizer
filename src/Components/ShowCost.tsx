import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ShowCost({
  bestCost,
  actualCost,
  isDisable,
  onToggle, // Add this prop to handle the toggle state change
}: {
  bestCost: number;
  actualCost: number;
  isDisable: boolean;
  onToggle: () => void;
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(false);
  }, [isDisable]);

  const handleToggle = () => {
    if (!isDisable) {
      setIsChecked(!isChecked);
      onToggle();
    }
  };

  return (
    <div className="absolute right-[-15rem] top-0 flex w-[14rem] flex-col gap-3 border border-sky-700 p-4">
      <span>最佳花費: {bestCost}</span>
      <span>實際花費: {actualCost}</span>
      <div className="toggle-switch-container">
        <label className="toggle-switch">
          <input
            id="toggleBestPathCheckbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            disabled={isDisable}
          />
          <span className="slider round"></span>
        </label>
        <label
          htmlFor="toggleBestPathCheckbox"
          className={twMerge(
            "toggle-label",
            isDisable
              ? "text-gray-500 hover:cursor-not-allowed"
              : "hover:cursor-pointer",
          )} // 如果isDisable 那這個字體要變色 pointer也要取消
        >
          顯示可能最佳路徑
        </label>
      </div>
    </div>
  );
}
