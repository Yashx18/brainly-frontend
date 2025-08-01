import { PlusIcon } from "../icons/PlusIcon";
import { SideBarItem } from "./SideBarItems"

const SideBar = () => {
	return (
    <div className="h-full w-1/4 border-r ">
      <SideBarItem logo={<PlusIcon size="md" />} text={"Tweets"} />
      <SideBarItem logo={<PlusIcon size="md" />} text={"Videos"} />
    </div>
  );
}

export default SideBar
