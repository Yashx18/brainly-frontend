interface optionsProps {
	text: string,
	color?: any,
	bgColor?: any
	onClick?: ()=>void
}


const TypeOptions = ({ text, color, bgColor, onClick }: optionsProps) => {
  return (
	  <div
		  onClick={onClick}
      className={`flex items-center justify-center px-2 py-1 border border-[#353535] bg-${
        bgColor ? bgColor : "white"
      } w-auto text-${color ? color : "black"} cursor-pointer rounded-md mr-2`}
    >
      {text}
    </div>
  );
};

export default TypeOptions;
