import axios from "axios";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
interface AddContentProps {
  setAddContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddContent = ({ setAddContent }: AddContentProps) => {
  const linkRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const type = typeRef.current?.value;
    console.log({
      link,
      title,
      type,
    });

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/vi/content",
        {
          title,
          link,
          type,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data) {
        alert(response.data.message);
        console.log(response.data.message);
      } 
    } catch (error) {
      alert("Unable to send content");
      console.error(error);
    }
  }
  return (
    <div
      className="fixed top-0 left-0 w-screen h-full bg-[#3131315f] flex items-center justify-center
      "
    >
      <div className="bg-white rounded-md w-110 h-auto px-12 py-8 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-4">
          <span className="text-2xl font-medium ">Add Content</span>
          <IoMdClose
            className="size-6 cursor-pointer hover:text-[#5c5c5c]"
            onClick={() => {
              setAddContent((val) => !val);
            }}
          />
        </div>
        <form action="#" className="w-full">
          <div className="mb-2">
            <p>Title</p>
            <input
              ref={titleRef}
              type="text"
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
          </div>
          <div className="mb-3">
            <p>Link</p>
            <input
              ref={linkRef}
              type="text"
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
          </div>
          <div className="mb-3">
            <p>Type</p>
            <input
              ref={typeRef}
              type="text"
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
          </div>
          <div>
            <div
              className="w-full cursor-pointer bg-purple-500 text-white font-medium flex items-center justify-center py-2 rounded-md hover:bg-[#9f579c]"
              onClick={addContent}
            >
              Add
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContent;
