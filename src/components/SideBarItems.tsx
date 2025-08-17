import type { ReactElement } from "react";

interface SideBarProps {
  text?: String;
  logo: ReactElement;
  open?: boolean;
}

const parentStyles = {
  open: "flex items-center justify-start w-full cursor-pointer hover:bg-[#ababab] hover:text-[#212121] py-2 text-[#cdc7bd]",
  close:
    "flex items-center justify-center w-full cursor-pointer hover:bg-[#ababab] hover:text-[#212121] py-2 text-[#cdc7bd]",
};

const styles = {
  open: "flex items-center justify-start w-auto ml-6 mr-16 ",
  close: "flex items-center justify-center w-auto ",
};
export const SideBarItem = ({ text, logo, open }: SideBarProps) => {
  return (
    <div className={open ? parentStyles.open : parentStyles.close}>
      <div className={open ? styles.open : styles.close}>
        <span className={open ? "mr-3" : "mx-3"}>{logo}</span>
        {open ? <div className=" text-lg flex items-start">{text}</div> : null}
      </div>
    </div>
  );
};
