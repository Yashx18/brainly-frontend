import type { ReactElement } from "react";

interface SideBarProps {
  text: String;
  logo: ReactElement;
}

export const SideBarItem = ({ text, logo }: SideBarProps) => {
  return (
    <div className="flex items-center justify-start w-full cursor-pointer hover:bg-[#e2e2e2] hover:text-[#212121] py-2 text-amber-100">
      <div className="flex items-center justify-start w-auto ml-6 mr-16 ">
        <span className="mr-3">{logo}</span>
        <div className=" text-xl flex items-start">{text}</div>
      </div>
    </div>
  );
};
