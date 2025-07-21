import type { ReactElement } from "react";

type ButtonProps = {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: any;
  onClick: () => void;
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
  "font-semi-bold text-md flex items-center justify-between rounded-xl cursor-pointer ";

export const Button = (props: ButtonProps) => {
  return (
    <div className="rounded-xl">
      <p
        className={`${variantStyles[props.variant]} ${defaultStyles} ${
          sizeStyles[props.size]
        } `}
      >
        {props.startIcon}
        {props.text}
        {props.endIcon}
      </p>
    </div>
  );
};
