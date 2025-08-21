import axios from "axios";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
interface ShareBrainProps {
  setPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareBrain = ({ setPage }: ShareBrainProps) => {
  const [link, setLink] = useState("");
  console.log(link);

  const [toggle, setToggle] = useState(true);
  async function shareBrain() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/vi/brain/share",
        {
          share: toggle,
          
        },
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        setLink(response.data.hash);
      }
    } catch (error) {
      console.log("Error occured");
      console.error(error);
    }
  
  
  }

  return (
    // bg-[]

    <div
      className="bg-[#383838] rounded-md w-110 h-50  flex flex-col items-center justify-start   border-2 border-[#44444483] absolute z-1 right-70 top-11"
    >
      <div className="w-full flex items-center justify-between border-b border-[#757575] px-4 py-2">
        <span className="text-2xl font-medium text-white ">Share Brain</span>
        <IoMdClose
          className="size-6 cursor-pointer text-white hover:text-[#c5c5c5]"
          onClick={() => {
            setPage((val) => !val);
          }}
        />
      </div>
      <div className="w-full px-4 py-2 text-white">
        <div className="flex items-center justify-between w-full h-full">
          <span className="text-lg font-xl">Enable Share Brain : </span>
          <input type="checkbox" className="cursor-pointer w-4 h-4 rounded-xl"  onChange={() => {
            setToggle(val => !val);
            shareBrain();
            console.log(toggle);
            
          }}/>
        </div>
        <span className="text-md font-">Link is mentioned below :</span>
        <p className="bg-[#212121] px-2 py-1 rounded-lg ">http://localhost:3000${link}</p>
      </div>
    </div>
  );
};

export default ShareBrain;
