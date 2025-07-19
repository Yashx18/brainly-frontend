type ButtonProps = {
  variants: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: any;
  endIcon?: any;
  onClick: () => void;
};

const variantStyles = {
  primary: "bg-[#4345d7]  text-[#dbe4ff]",
  secondary: " bg-[#dbe4ff] text-[#4345d7]",
};

const sizeStyles = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
  lg: "px-5 py-3",
};

const defaultStyles =
  "font-semi-bold text-md flex items-center justify-between rounded-xl";

const Button = (props: ButtonProps) => {
  return (
    <div className="rounded-2xl">
      {props.startIcon}
      <p
        className={`${variantStyles[props.variants]},${defaultStyles}, ${
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
export default Button;
