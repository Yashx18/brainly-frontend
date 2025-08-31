import type { ReactElement } from "react";

type ButtonProps = {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: any;
  stateUpdater?: any;
};

const variantStyles = {
  primary: "bg-[#4345d7]  text-[#dbe4ff] hover:bg-[#383ab5]",
  secondary: " bg-[#dbe4ff] text-[#4345d7] hover:bg-[#c1c8de]",
};

const sizeStyles = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
  lg: "px-5 py-3",
};

const defaultStyles =
  "font-semi-bold text-md flex items-center justify-between rounded-xl cursor-pointer mx-1 sm:my-2 my-1";

export const Button = ({variant, size, text, startIcon, stateUpdater, endIcon}: ButtonProps) => {
  return (
    // @ts-ignore
    <div className="rounded-xl" onClick={() => stateUpdater((val) => !val)}>
      <div
        className={`${variantStyles[variant]} ${defaultStyles} ${sizeStyles[size]} `}
      >
        {startIcon}
        <p className="ml-1 sm:block hidden">{text}</p>
        {endIcon}
      </div>
    </div>
  );
};
