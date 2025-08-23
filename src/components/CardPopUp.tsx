import { TextIcon } from "../icons/TextIcon";
import { FiYoutube } from "react-icons/fi";
import { IoLinkSharp } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import { useCardPopUpData } from "../store";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import TypeOptions from "./TypeOptions";

interface CardPopUpProps {
  title?: String;
  link?: String;
  type?: "text" | "URL" | "image" | "video";
  onClose: () => void;
}


const ContentType = {
  Video: "video",
  Image: "image",
  URL: "URL",
  Text: "text",
} as const;


export const CardPopUp = ({ title, link, type, onClose }: CardPopUpProps) => {
  const { closePopUp } = useCardPopUpData();
    const [dataType, setDataType] = useState<
      (typeof ContentType)[keyof typeof ContentType]
      >(ContentType.Text);
  console.log(dataType);
  
  return (
    <div
      onClick={() => {
        onClose;
        closePopUp();
        console.log(title, link, type);
      }}
      // bg-[#ffffff10]
      className="absolute w-full bg-[#222222] h-
       flex items-center justify-center z-1"
    >
      <div
        className="border border-neutral-500 rounded-md bg-amber-50 flex flex-col items-start justify-baseline shadow-md 
                 w-full max-w-80 p-2 mr-1 mt-1 "
      >
        <div className="top flex  items-start justify-between w-full bg-[#eaeaea] p-1.5 rounded-lg mb-2">
          <div className="flex items-start justify-between">
            <span className="pr-2 mt-1">
              {type == "text" ? <TextIcon /> : null}
              {type == "image" ? <FaImages /> : null}
              {type == "video" ? <FiYoutube /> : null}
              {type == "URL" ? <IoLinkSharp /> : null}
            </span>
            <h4 className="text-md font-medium">{title}</h4>
          </div>
          <div className="flex items-center justify-center ">
            <FaRegEdit className="size-5" />
          </div>
        </div>
        {type == "URL" ? (
          <a
            // @ts-ignore
            href={link}
            target="_blank"
            className="text-[#3a4cf1] font-medium"
          >
            {link}
          </a>
        ) : null}
        {type == "image" ? (
          <img
            src={`http://localhost:3000${link}`}
            // @ts-ignore
            alt={title}
            className="rounded-lg"
          />
        ) : null}
        {type == "video" ? (
          <video className="w-screen h-auto rounded-lg" controls>
            <source src={`http://localhost:3000${link}`} type="video/mp4" />
          </video>
        ) : null}
        {type == "text" ? (
          <div className="bg-[#eaeaea] py-1 px-2 w-full h-auto rounded-lg">
            <p className="text-md w-full">{link}</p>
          </div>
        ) : null}
        <div className="mb-3">
          {/* const contentTypes = ["image", "video", "audio", "URL", "text"]; // Extend as needed */}
          <p>Type</p>
          <div className=" w-full flex items-start justify-start flex-wrap">
            <TypeOptions
              text="Text"
              variant={type === ContentType.Text ? "primary" : "secondary"}
              onClick={() => {
                setDataType(ContentType.Text);
              }}
            />
            <TypeOptions
              text="Video"
              variant={type === ContentType.Video ? "primary" : "secondary"}
              onClick={() => {
                setDataType(ContentType.Video);
              }}
            />
            <TypeOptions
              text="Image"
              variant={type === ContentType.Image ? "primary" : "secondary"}
              onClick={() => {
                setDataType(ContentType.Image);
              }}
            />
            <TypeOptions
              text="URL"
              variant={type === ContentType.URL ? "primary" : "secondary"}
              onClick={() => {
                setDataType(ContentType.URL);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
