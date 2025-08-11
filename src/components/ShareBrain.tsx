import axios from "axios";
import { IoMdClose } from "react-icons/io";
interface ShareBrainProps {
  setPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareBrain = ({ setPage }: ShareBrainProps) => {
  async function shareBrain() {

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Sign in or Sign up first");
    }else{
      try {
        const response = await axios.post(
          "http://localhost:3000/api/vi/brain/share",
          {
            share: true,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.data) {
          alert(response.data.hash);
        }
      } catch (error) {
        console.log("Error occured");
        console.error(error);
      }
    }
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-full bg-[#3131315f] flex items-center justify-center
      "
    >
      <div className="bg-white rounded-md w-110 h-auto px-12 py-8 flex flex-col items-center justify-center"
      onClick={shareBrain}>
        <div className="w-full flex items-center justify-between mb-4">
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
          <p>http://localhost:3000/api/vi/brain/</p>
        </div>
      </div>
    </div>
  );
};

export default ShareBrain;
