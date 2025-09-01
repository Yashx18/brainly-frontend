import type { ReactElement } from "react";

interface SideBarProps {
  text?: String;
  logo: ReactElement;
  open?: boolean;
  onClick?: () => void;

}

const parentStyles = {
  open: "flex items-center sm:justify-start justify-center w-full cursor-pointer hover:bg-[#ababab] hover:text-[#212121] py-2 text-[#212121]",
  close:
    "flex items-center justify-center w-full cursor-pointer hover:bg-[#ababab] hover:text-[#212121] py-2 text-[#212121]",
};

const styles = {
  open: "flex items-center justify-start sm:w-auto w-full mx-3 sm:ml-6 sm:mr-16",
  close: "flex items-center justify-center w-auto ",
};
export const SideBarItem = ({ text, logo, open, onClick }: SideBarProps) => {
  
  return (
    <div
      onClick={onClick}
      className={` transition-all duration-200 ease-in-out ${open ? parentStyles.open : parentStyles.close}`
      }
    >
      <div
        className={` transition-all duration-200 ease-in-out ${
          open ? styles.open : styles.close
        }`}
      >
        <span className={open ? "sm:mr-3" : "mx-3"}>{logo}</span>
        {open ? <div className=" text-lg sm:flex items-start hidden">{text}</div> : null}
      </div>
    </div>
  );
};
