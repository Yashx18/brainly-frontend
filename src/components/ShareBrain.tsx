import axios from "axios";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Switch } from "./ui/switch";

interface ShareBrainProps {
  setPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const API_URL = import.meta.env.VITE_API_URL;
const APP_URL = import.meta.env.VITE_URL;


const ShareBrain = ({ setPage }: ShareBrainProps) => {
  const [link, setLink] = useState("");
  console.log(link);

  const [toggle, setToggle] = useState(true);
  async function shareBrain() {
    try {
      const response = await axios.post(
        `${API_URL}/api/brain/share`,
        {
          share: toggle,
          
        },
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        setLink(`${APP_URL}${response.data.hash}`);
      }
    } catch (error) {
      console.log("Error occured");
      console.error(error);
    }
  
  
  }

  return (
    // bg-[]

    <div className="bg-[#383838] rounded-md w-110 h-50  flex flex-col items-center justify-start   border-2 border-[#44444483] absolute z-1 right-70 top-11">
      <div className="w-full flex items-center justify-between border-b border-[#757575] px-4 py-2">
        <span className="text-2xl font-medium text-white ">Share Brain</span>
        <IoMdClose
          className="size-6 cursor-pointer text-white hover:text-[#c5c5c5]"
          onClick={() => {
            setPage((val) => !val);
          }}
        />
      </div>
      <div className="w-full h-full px-4 py-2 text-white bg-red-400 items-start justify-around flex flex-col">
        <div className="flex items-center justify-between w-full h-full bg-amber-300">
          <span className="text-lg font-xl">Enable Share Brain : </span>
          <Switch onClick={() => {
            setToggle(val => !val);
            console.log(toggle);
            shareBrain();
          }}/>
        </div>
        <span className="text-md font-">Link is mentioned below :</span>
        <a href={ `${link}`} className="bg-[#212121] px-2 py-1 rounded-lg text-blue-600" target="_blank">
          {link}
        </a>
      </div>
    </div>
  );
};

export default ShareBrain;
