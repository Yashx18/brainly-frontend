import { SideBarItem } from "./SideBarItems";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";
import { LiaHashtagSolid } from "react-icons/lia";
import { LuBrain } from "react-icons/lu";

const SideBar = () => {
  return (
    <div className="h-full  border-r flex flex-col items-start justify-start">
      <div className="flex items-center justify-around w-full py-2 border-b border-[#989898]">
        <span className="px-2">
          <LuBrain className="size-11 text-purple-600" />
        </span>
        <p className="text-2xl pr-2 font-medium">Second Brain</p>
      </div>
      <div className="h-auto  flex flex-col items-start ">
        <SideBarItem
          logo={<FaXTwitter className="size-6" />}
          text={"Twitter"}
        />
        <SideBarItem logo={<FiYoutube className="size-6" />} text={"Videos"} />
        <SideBarItem
          logo={<IoDocumentsOutline className="size-6" />}
          text={"Documents"}
        />
        <SideBarItem logo={<IoLinkSharp className="size-6" />} text={"Links"} />
        <SideBarItem
          logo={<LiaHashtagSolid className="size-6" />}
          text={"Tags"}
        />
      </div>
    </div>
  );
};

export default SideBar;
