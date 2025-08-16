import { useState } from "react";
import { SideBarItem } from "./SideBarItems";
import { FaImages } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";



interface SideBarProps {
  setPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({ setPage }: SideBarProps) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-14/15 w-full max-w-54   flex flex-col items-center justify-between bg-[#212121] rounded-tr-xl rounded-br-xl">
      <div className="w-full">
        <div className="flex items-center justify-between w-full py-3 border-b border-[#989898] px-1">
          {/* LOGO SECTION */}
          <div className="flex items-center justify-between">
            <span className="mr-2 ">
              <LuBrain className=" text-[#a22de5] size-7" />
            </span>
            <p className="  text-red-100 font-medium text-2xl">Brainly</p>
          </div>
          {/* MENU ICON */}
          <div
            onClick={() => {
              setOpen((val) => !val);
            }}
          >
            {open ? (
              <TbLayoutSidebarLeftCollapse className="size-8 text-amber-100 cursor-e-resize" />
            ) : (
              <TbLayoutSidebarRightCollapse className="size-8 text-amber-100 cursor-e-resize" />
            )}
          </div>
        </div>
        <div className="h-auto  flex flex-col items-start ">
          <SideBarItem
            logo={<IoDocumentsOutline className="size-6" />}
            text={"Documents"}
          />
          <SideBarItem logo={<FaImages className="size-6" />} text={"Images"} />
          <SideBarItem
            logo={<FiYoutube className="size-6" />}
            text={"Videos"}
          />
          <SideBarItem
            logo={<IoLinkSharp className="size-6" />}
            text={"Links"}
          />
        </div>
      </div>
      <div
        className="w-19/20 flex items-center
        justify-center text-xl font-medium bg-[#656565] rounded-lg mb-2  hover:bg-[#d4d4d4]"
      >
        <span
          className=" w-full flex items-center justify-center cursor-pointer py-3"
          onClick={() => {
            setPage((val) => !val);
          }}
        >
          Account
        </span>
      </div>
    </div>
  );
};

export default SideBar;
