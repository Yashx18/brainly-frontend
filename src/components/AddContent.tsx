import axios from "axios";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import TypeOptions from "./TypeOptions";
import { useState } from "react";

import { useContentStore } from "../store";

const ContentType = {
  Video: "video",
  Image: "image",
  URL: "URL",
  Text: "text",
} as const;

interface AddContentProps {
  setAddContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddContent = ({ setAddContent }: AddContentProps) => {
  const { fetchContent } = useContentStore();
  const linkRef = useRef<any>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<
    (typeof ContentType)[keyof typeof ContentType]
  >(ContentType.Text);

  async function addContent() {
    const title = titleRef.current?.value;
    const fileOrLink = linkRef.current?.files?.[0] || linkRef.current?.value;

    const formData = new FormData();
    formData.append("title", title || "");
    formData.append("type", type);

    if (type == "image" || type == "video") {
      // @ts-ignore
      formData.append("file", linkRef.current?.files?.[0]);
    } else {
      // @ts-ignore
      formData.append("link", fileOrLink);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/vi/content",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.message) {
        console.log(response.data.message);
        fetchContent();
        setAddContent((val) => !val);
      }
    } catch (error) {
      alert("Unable to send content");
      console.error(error);
    }
  }
  return (
    <div
      className="fixed top-0 left-0 w-screen h-full bg-[#3131315f] flex items-center justify-center z-1
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
        <form
          action="#"
          className="w-full"
          method="post"
          encType="multipart/form-data"
        >
          <div className="mb-2">
            <p>Title</p>
            <input
              ref={titleRef}
              type="text"
              placeholder="Add title here !"
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
          </div>
          <div className="mb-3">
            <p>Content</p>
            {type == "image" || type == "video" ? (
              <input
                ref={linkRef}
                name="contentBar"
                type={type == "image" || type == "video" ? "file" : "textarea"}
                placeholder="Add content here !"
                className={
                  "w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
                }
              />
            ) : (
              <textarea
                ref={linkRef}
                placeholder="Type here ..."
                className=" rounded-md w-full px-1.5 py-1.5 border-2 border-[#696969]"
              ></textarea>
            )}
          </div>
          <div className="mb-3">
            {/* const contentTypes = ["image", "video", "audio", "URL", "text"]; // Extend as needed */}
            <p>Type</p>
            <div className=" w-full flex items-start justify-start flex-wrap">
              <TypeOptions
                text="Text"
                variant={type === ContentType.Text ? "primary" : "secondary"}
                onClick={() => {
                  setType(ContentType.Text);
                }}
              />
              <TypeOptions
                text="Video"
                variant={type === ContentType.Video ? "primary" : "secondary"}
                onClick={() => {
                  setType(ContentType.Video);
                }}
              />
              <TypeOptions
                text="Image"
                variant={type === ContentType.Image ? "primary" : "secondary"}
                onClick={() => {
                  setType(ContentType.Image);
                }}
              />
              <TypeOptions
                text="URL"
                variant={type === ContentType.URL ? "primary" : "secondary"}
                onClick={() => {
                  setType(ContentType.URL);
                }}
              />
            </div>
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
