import { IoMdClose } from "react-icons/io";
interface AddContentProps {
  setAddContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddContent = ({ setAddContent }: AddContentProps) => {
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
              type="text"
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
          </div>
          <div className="mb-3">
            <p>Link</p>
            <input
              type="text"
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
          </div>
          <div className="mb-3">
            <p>Type</p>
            <textarea
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
          </div>
          <div>
            <div className="w-full cursor-pointer bg-purple-500 text-white font-medium flex items-center justify-center py-2 rounded-md hover:bg-[#9f579c]">
              Add
            </div>
          </div>

          
        </form>
      </div>
    </div>
  );
};

export default AddContent;

