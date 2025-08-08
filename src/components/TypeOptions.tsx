interface optionsProps {
  text: string;
  variant: "primary" | "secondary"
  onClick?: () => void
}


const variantClasses = {
  primary: "bg-[#9f579c] text-white",
  secondary: "bg-white text-black border border-[#353535]",
};


const TypeOptions = ({
  text,
  onClick,
  variant
}: optionsProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center px-2 py-1  ${variantClasses[variant]} w-auto  cursor-pointer rounded-md mr-2`}
    >
      {text}
    </div>
  );
};

export default TypeOptions;
