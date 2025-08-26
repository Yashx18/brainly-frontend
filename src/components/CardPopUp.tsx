import { TextIcon } from "../icons/TextIcon";
import { FiYoutube } from "react-icons/fi";
import { IoLinkSharp } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import { useCardPopUpData } from "../store";
import { FaRegEdit } from "react-icons/fa";
import { useRef, useState } from "react";
import TypeOptions from "./TypeOptions";
import { IoMdClose } from "react-icons/io";
import { useEditStore } from "../store";
import { useIdStore } from "../store";
import axios from "axios";
import { useContentStore } from "../store";

interface CardPopUpProps {
  title?: string;
  link?: string;
  type?: "text" | "URL" | "image" | "video";
  onClose?: () => void;
}

const ContentType = {
  Video: "video",
  Image: "image",
  URL: "URL",
  Text: "text",
} as const;

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);


export const CardPopUp = ({ title, link, type }: CardPopUpProps) => {
  const { closePopUp } = useCardPopUpData();
  const { edit, toggleEdit } = useEditStore();
  const { id, getId } = useIdStore();
  const { fetchContent } = useContentStore();
  const newTitleRef = useRef<HTMLInputElement>(null);
  const newLinkRef = useRef<HTMLInputElement>(null);
  const [dataType, setDataType] = useState<
    (typeof ContentType)[keyof typeof ContentType]
  >(ContentType.Text);
  // console.log(id);

async function updateContent() {
  const newTitle = newTitleRef.current?.value;

  const formData = new FormData();
  formData.append("title", newTitle || "");
  formData.append("type", dataType);

  // Handle file uploads
  if (dataType === "image" || dataType === "video") {
    const fileInput = newLinkRef.current as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append("file", fileInput.files[0]); 
    }
  } else {
    const newLink = newLinkRef.current?.value;
    formData.append("link", newLink || "");
  }

  try {
    const response = await axios.put(
      `${API_URL}/api/content/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data) {
      setTimeout(() => {
        closePopUp();
        fetchContent();
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
}

  return (
    <div
      onClick={() => {
        // onClose();
        console.log(title, link, type);
      }}
      // bg-[#ffffff10]
      className="absolute w-full h-full bg-[#1b1b1b1e] h-
       flex items-center justify-center z-1"
    >
      <form
        action="#"
        method="post"
        encType="multipart/form-data"
        className="border border-neutral-500 rounded-md bg-amber-50 flex flex-col items-start justify-baseline shadow-md w-full max-w-80 p-2 mr-1 mt-1"
      >
        <div className="top flex  items-center justify-between w-full bg-[#eaeaea] rounded-lg mb-2">
          <div className="flex items-start justify-between w-full">
            <div className="flex items-center justify-start w-9/10">
              {!edit ? (
                <span className="ml-1 m r-2">
                  {type == "text" ? <TextIcon /> : null}
                  {type == "image" ? <FaImages /> : null}
                  {type == "video" ? <FiYoutube /> : null}
                  {type == "URL" ? <IoLinkSharp /> : null}
                </span>
              ) : null}

              {/* Heading / Input */}
              {edit ? (
                <input
                  type="text"
                  ref={newTitleRef}
                  placeholder={title}
                  className="p-1.5 border border-[#2121213f] w-full rounded-lg bg-[#fffbeb]"
                />
              ) : (
                <h4 className="text-md font-medium py-2">{title}</h4>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <span className="px-0.5">
              <FaRegEdit
                className="size-5 cursor-pointer"
                onClick={() => {
                  toggleEdit();
                  // @ts-ignore
                  getId(title, link, type);
                  console.log(id);

                  console.log("Edit option clicked");
                }}
              />
            </span>
            <span
              className="px-0.5 cursor-pointer"
              onClick={() => {
                closePopUp();
              }}
            >
              <IoMdClose className="size-6" />
            </span>
          </div>
        </div>
        {!edit ? (
          <div className="w-full">
            {type == "URL" ? (
              <a
                href={link}
                target="_blank"
                className="text-[#3a4cf1] font-medium"
              >
                {link}
              </a>
            ) : null}
            {type == "image" ? (
              <img
                src={`${API_URL}${link}`}
                alt={title}
                className="rounded-lg"
              />
            ) : null}
            {type == "video" ? (
              <video className="w-screen h-auto rounded-lg" controls>
                <source src={`${API_URL}${link}`} type="video/mp4" />
              </video>
            ) : null}
            {type == "text" ? (
              <div className="bg-[#eaeaea] py-1 px-2 w-full h-auto rounded-lg">
                <p className="text-md w-full">{link}</p>
              </div>
            ) : null}
          </div>
        ) : (
            <input
            type={dataType == "image" || dataType == "video" ? "file" : "text"}
            placeholder={link}
            ref={newLinkRef}
            className="p-1.5 border border-[#2121213f] w-full rounded-lg"
          /> 
        )}
        {edit && (
          <div className="mb-3">
            {/* const contentTypes = ["image", "video", "audio", "URL", "text"]; // Extend as needed */}
            {/* Type options */}
            <p className="text-lg mb-1 font-medium">Type</p>
            <div className=" w-full flex items-start justify-start flex-wrap">
              <TypeOptions
                text="Text"
                variant={
                  dataType === ContentType.Text ? "primary" : "secondary"
                }
                onClick={() => {
                  setDataType(ContentType.Text);
                }}
              />
              <TypeOptions
                text="Video"
                variant={
                  dataType === ContentType.Video ? "primary" : "secondary"
                }
                onClick={() => {
                  setDataType(ContentType.Video);
                }}
              />
              <TypeOptions
                text="Image"
                variant={
                  dataType === ContentType.Image ? "primary" : "secondary"
                }
                onClick={() => {
                  setDataType(ContentType.Image);
                }}
              />
              <TypeOptions
                text="URL"
                variant={dataType === ContentType.URL ? "primary" : "secondary"}
                onClick={() => {
                  setDataType(ContentType.URL);
                }}
              />
            </div>
          </div>
        )}
        {edit && (
          <div
            className="bg-[#9f579c] font-semibold text-white w-full flex items-center justify-center py-2 rounded-lg cursor-pointer"
            onClick={updateContent}
          >
            Update
          </div>
        )}
      </form>
    </div>
  );
};
