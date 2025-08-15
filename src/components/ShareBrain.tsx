import axios from "axios";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
interface ShareBrainProps {
  setPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareBrain = ({ setPage }: ShareBrainProps) => {
  let result;
  const [brainState, setBrainState] = useState(true);
  async function shareBrain() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/vi/brain/share",
        {
          share: brainState,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        console.log(response.data.hash);
        result = response.data.hash;
        setBrainState(val => !val);
      }
    } catch (error) {
      console.log("Error occured");
      console.error(error);
    }
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-full bg-[#3131315f] flex items-center justify-center
      "
    >
      <div
        className="bg-white rounded-md w-110 h-auto px-12 py-8 flex flex-col items-center justify-center"
        onClick={shareBrain}
      >
        <div
          className="w-full flex items-center justify-between mb-4">
          <span className="text-2xl font-medium ">Share Brain</span>
          <IoMdClose
            className="size-6 cursor-pointer hover:text-[#5c5c5c]"
            onClick={() => {
              setPage((val) => !val);
            }}
          />
        </div>
        <div className="w-full">
          <span className="text-lg font-">Link is mentioned below :</span>
          <p>`http:// host:3000${result}`</p>
        </div>
      </div>
    </div>
  );
};

export default ShareBrain;
