import React from "react";
type InputProps = {
  wrapperClassName?: string;
  className?: string;
  iconClassName?: string;
  type?: string;
  icon?: React.ReactNode | JSX.Element;
  onIconClick?: () => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = ({
  type = "text",
  className = "",
  wrapperClassName = "",
  iconClassName = "right-5",
  onIconClick = () => null,
  icon,
  ...rest
}: InputProps) => {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <input
        type={type}
        className={`px-5 h-14 border border-gray-200 rounded-lg outline-none w-full transition-all focus:border-blue-500 text-slate-900 ${className}`}
        {...rest}
      />
      {icon && (
        <span
          className={`absolute top-2/4 -translate-y-2/4 ${iconClassName} ${
            !!onIconClick ? "cursor-pointer" : ""
          }`}
          onClick={onIconClick}
        >
          {icon}
        </span>
      )}
    </div>
  );
};

export default Input;
