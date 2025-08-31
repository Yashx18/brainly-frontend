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
      // console.error(error);
    }
  }

  return (
    // bg-[]

    <div className="bg-[#ffffff] rounded-md sm:w-110 h-45  flex flex-col items-center justify-start border-2 border-[#44444483] absolute right-4 bottom-40 z-1 sm:right-68 sm:top-15 ">
      <div className="w-full flex items-center justify-between border-b border-[#757575] px-2 py-2">
        <span className="text-2xl font-medium text-[#757575] ">
          Share Brain
        </span>
        <IoMdClose
          className="size-6 cursor-pointer text-[#757575] hover:text-[#c5c5c5]"
          onClick={() => {
            setPage((val) => !val);
          }}
        />
      </div>
      <div className="w-full h-full px-4 py-2 text-[#757575]   bg-[#ffffff] items-start justify-around flex flex-col rounded-b-xl">
        <div className="flex items-center justify-between w-full h- bg-[#ffffff] ">
          <span className="text-lg font-xl">Enable Share Brain : </span>
          <Switch
            onClick={() => {
              shareBrain();
              setToggle((val) => !val);
            }}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <span className="text-md font-mono mb-1">
            Link is mentioned below :
          </span>
          <span className="bg-[#212121] px-2 py-1 rounded-md text-[#62abff] overflow-x-auto sm:w-full h-9 flex items-center justify-start">
            {!toggle ? (
              <a
                href={`${link}`}
                className="w-full max-w-60 flex items-center justify-start"
                target="_blank"
              >
                {link}
              </a>
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShareBrain;
