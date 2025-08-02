import type { ReactElement } from "react";

interface SideBarProps {
  text: String;
  logo: ReactElement;
}

export const SideBarItem = ({ text, logo }: SideBarProps) => {
  return (
    <div className="flex items-center w-full  px-12  cursor-pointer hover:bg-[#e2e2e2]">
      <span className="">{logo}</span>
      <div className="p-3 text-xl flex items-start">{text}</div>
    </div>
  );
};
