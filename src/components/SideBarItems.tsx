import type { ReactElement } from "react";

interface SideBarProps {
	text: String,
	logo: ReactElement,
}

export const SideBarItem = ({ text, logo } : SideBarProps) => {
	return (
    <div className="flex items-center justify-around w-20">
      {logo}
      <div className="px-2 py-1 text-md">{text}</div>
    </div>
  );
};
