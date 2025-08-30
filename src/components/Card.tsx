import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TextIcon } from "../icons/TextIcon";
import { FiYoutube } from "react-icons/fi";
import { IoLinkSharp } from "react-icons/io5";
import { FaImages } from "react-icons/fa";

import { useCardPopUpData, useContentStore } from "../store";
import axios from "axios";

interface Cardprops {
  title: string;
  link: string;
  type: "text" | "URL" | "image" | "video";
}

const API_URL = import.meta.env.VITE_API_URL;

export const Card = ({ title, link, type }: Cardprops) => {
  const { openPopUp, selectedCard } = useCardPopUpData();
  const { fetchContent } = useContentStore();

  async function deleteCard() {
      try {
        const response = await axios.delete(
          `${API_URL}/api/content`,
          {
            data: { title, link, type },
            withCredentials: true,
          },
        );
        if (response.data.message) {
          console.log(response.data.message);
          fetchContent();
        }
        
      } catch (error) {
        console.log(error);
        
    }
    console.log(title, link, type);
    
    }

  return (
    <>
      <div
        onClick={() => {
          // console.log(title, link, type);
          console.log(selectedCard);
        }}
        className="rounded-lg bg-amber-50 flex flex-col items-start justify-baseline shadow-xl 
     w-full max-w-80 p-2 cursor-pointer h-auto"
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
          <div className="flex items-center justify-between mt-1 ">
            <span className="pr-2">
              <ShareIcon />
            </span>
            <span onClick={deleteCard}>
              <DeleteIcon />
            </span>
          </div>
        </div>
        {/* Card Content */}
        <div
          onClick={() => {
            openPopUp({ title, link, type });
          }}
          className="w-full"
        >
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
              className="rounded-md w-80 h-auto"
            />
          ) : null}
          {type == "video" ? (
            <video className="w-screen h-auto rounded-md z-0" controls>
              <source
                src={`${API_URL}${link}`}
                type={`video/${link.substring(link.indexOf(".") + 1)}`}
              />
            </video>
          ) : null}
          {type == "text" ? (
            <div className="bg-[#eaeaea] py-1 px-2 w-full h-auto rounded-md">
              <p className="text-md w-full overflow-y-auto">{link}</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
