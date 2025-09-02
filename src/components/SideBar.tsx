import { useEffect, useState } from "react";
import { SideBarItem } from "./SideBarItems";
import { IoImageOutline } from "react-icons/io5";
import { FiYoutube } from "react-icons/fi";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { useContentStore } from "../store";
import { userInfo } from "../store";
import axios from "axios";
import { LuLogOut } from "react-icons/lu";

// import { useNavigate } from "react-router-dom";

const styles = {
  open: "sm:h-screen h-auto w-full sm:max-w-54  flex sm:flex-col items-center justify-between bg-[#ffffff] transition-all duration-500 ease-in-out border-r border-[#989898] absolute bottom-0 z-1  sm:static py-3 border-t-1 sm:border-t-0 sm:py-0 rounded-t-3xl sm:rounded-t-[0px] px-3 sm:px-0",
  close:
    "sm:h-screen w-full sm:max-w-54 h-auto py-3 sm:py-0 rounded-t-3xl sm:rounded-t-[0px] border-t-1 sm:border-t-0 flex sm:flex-col items-center justify-between bg-[#ffffff]  border-r border-[#989898] sm:static absolute bottom-0 z-1",
};
const parentStyles = {
  open: "sm:flex items-center justify-between w-full py-3 border-b border-[#989898] sm:px-1 ",
  close:
    "sm:flex items-center justify-center w-full py-3 border-b border-[#989898]  ",
};

const SideBar = () => {
  const { setFilter } = useContentStore();
  const [open, setOpen] = useState(false);
  const { info, getInfo } = userInfo();
  const API_URL = import.meta.env.VITE_API_URL;
  // const navigate = useNavigate();

  async function logOut() {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      window.location.reload();

      console.log("Logged out");
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div
      className={`transition-all duration-500 ease-in-out  ${
        open ? styles.open : styles.close
      }`}
    >
      <div className="w-full flex sm:flex-col">
        <div
          className={` transition-all duration-200 ease-in-out hidden ${
            open ? parentStyles.open : parentStyles.close
          }`}
        >
          {/* LOGO SECTION */}
          {open ? (
            <div className="flex items-center justify-between">
              <span className="mr-2 ml-1">
                <FaGraduationCap className=" text-[#585858] size-7" />
              </span>
              <p className="  text-[#585858] font-medium text-2xl">Brainly</p>
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
              <TbLayoutSidebarRightCollapse className="size-8 text-[#212121] cursor-pointer" />
            )}
          </div>
        </div>
        <div className="h-auto flex sm:flex-col items-start w-full">
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
        onClick={() => {
          logOut();
        }}
        className={
          open
            ? "sm:w-19/20 w-fit flex items-center justify-center text-xl font-medium sm:bg-[#4345d7] bg-[#656565] sm:p-1 p-2 sm:rounded-lg rounded-full sm:mb-2 text-white hover:bg-[#383ab5] cursor-pointer"
            : "w-fit sm:w-15/20 flex items-center justify-center text-xl font-medium bg-[#656565] rounded-full sm:mb-2 p-2 ml-2 mr-4 sm:mx-0 hover:bg-[#383ab5] cursor-pointer text-[#fff7f7] hover:text-white "
        }
      >
        {open ? (
          <span className=" sm:w-full w-auto sm:flex items-center justify-center cursor-pointer sm:py-3">
            <LuLogOut className="size-6 static sm:hidden" />
            <p className="hidden sm:flex w-fit"> {`Hey👋 ${info}`}</p>
          </span>
        ) : (
          <LuLogOut className="size-6" />
        )}
      </div>
    </div>
  );
};

export default SideBar;
