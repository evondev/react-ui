import React from "react";
interface ToggleProps {
  checked: boolean;
  onClick?: () => void;
}
const Toggle = ({ checked = false, onClick = () => {} }: ToggleProps) => {
  return (
    <label
      className={[
        "inline-block cursor-pointer w-24 h-12 rounded-full p-1 transition-all ",
        checked ? "bg-[#145CE6]" : "bg-[#E7ECF3]",
      ].join("")}
    >
      <input
        type="checkbox"
        onChange={() => {}}
        onClick={onClick}
        checked={checked}
        className="hidden"
      />
      <div
        className={[
          "h-full rounded-full bg-white transition-all aspect-square  ",
          checked ? "translate-x-12" : "",
        ].join("")}
      ></div>
    </label>
  );
};

export default Toggle;
