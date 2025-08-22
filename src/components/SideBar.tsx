import { useState } from "react";
import { SideBarItem } from "./SideBarItems";
import { IoImageOutline } from "react-icons/io5";
import { FiYoutube } from "react-icons/fi";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { useContentStore } from "../store";

const styles = {
  open: "h-14/15 w-full max-w-54   flex flex-col items-center justify-between bg-[#212121] rounded-tr-xl rounded-br-xl transition-all duration-500 ease-in-out ",
  close:
    "h-14/15 w-full max-w-54   flex flex-col items-center justify-between bg-[#ffffff] rounded-tr-xl rounded-br-xl transition-all duration-500 ease-in-out  border border-[#212121]",
};
const parentStyles = {
  open: "flex items-center justify-between w-full py-3 border-b border-[#989898] px-1 ",
  close:
    "flex items-center justify-center w-full py-3 border-b border-[#989898] ",
};
// const dataType = {
//   All: "all",
//   Video: "video",
//   Image: "image",
//   URL: "URL",
//   Text: "text",
// } as const;

const SideBar = () => {
  const { setFilter } = useContentStore();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        open ? styles.open : styles.close
      }`}
    >
      <div className="w-full">
        <div
          className={` transition-all duration-200 ease-in-out ${
            open ? parentStyles.open : parentStyles.close
          }`}
        >
          {/* LOGO SECTION */}
          {open ? (
            <div className="flex items-center justify-between">
              <span className="mr-2 ml-1">
                <FaGraduationCap className=" text-[#e2c6f2] size-7" />
              </span>
              <p className="  text-red-100 font-medium text-2xl">Brainly</p>
            </div>
          ) : null}
          {/* MENU ICON */}
          <div
            onClick={() => {
              setOpen((val) => !val);
            }}
          >
            {open ? (
              <TbLayoutSidebarLeftCollapse className="size-8 text-[#212121] cursor-pointer" />
            ) : (
              <TbLayoutSidebarRightCollapse className="size-8 text-[#212121]cursor-pointer" />
            )}
          </div>
        </div>
        <div className="h-auto  flex flex-col items-start ">
          <SideBarItem
            open={open}
            logo={<GoHome className="size-6" />}
            text={"Home"}
            onClick={() => {
              setFilter("all");
            }}
          />
          <SideBarItem
            open={open}
            logo={<IoDocumentsOutline className="size-6" />}
            text={"Documents"}
            onClick={() => {
              setFilter("text");
            }}
          />
          <SideBarItem
            open={open}
            logo={<IoImageOutline className="size-6 " />}
            text={"Images"}
            onClick={() => {
              setFilter("image");
            }}
          />
          <SideBarItem
            open={open}
            logo={<FiYoutube className="size-6 " />}
            text={"Videos"}
            onClick={() => {
              setFilter("video");
            }}
          />
          <SideBarItem
            open={open}
            logo={<IoLinkSharp className="size-6" />}
            text={"Links"}
            onClick={() => {
              setFilter("URL");
            }}
          />
        </div>
      </div>
      <div
        className={
          open
            ? "w-19/20 flex items-center justify-center text-xl font-medium bg-[#656565] rounded-lg mb-2  hover:bg-[#d4d4d4] cursor-pointer"
            : "w-15/20 flex items-center justify-center text-xl font-medium bg-[#656565] rounded-full mb-2 p-2 hover:bg-[#d4d4d4] cursor-pointer text-[#fff7f7] hover:text-[#000000]"
        }
      >
        {open ? (
          <span className=" w-full flex items-center justify-center cursor-pointer py-3">
            Account
          </span>
        ) : (
          <FaRegUser className="size-6" />
        )}
      </div>
    </div>
  );
};

export default SideBar;
