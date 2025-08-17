import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TextIcon } from "../icons/TextIcon";

interface Cardprops {
  title: String;
  link: String;
  type: "text" | "URL" | "image" | "video";
}

export const Card = ({ title, link, type }: Cardprops) => {
  return (
    <div
      className="border border-neutral-500 rounded-md bg-amber-50 flex flex-col items-start justify-baseline shadow-md 
     w-full max-w-80 p-2 m-1"
    >
      <div className="top flex  items-center justify-between w-full bg-[#eaeaea] p-1.5 rounded-lg mb-2">
        <div className="flex items-center justify-between">
          <span className="pr-2">
            <TextIcon />
          </span>
          <h4>{title}</h4>
        </div>
        <div className="flex items-center justify-between">
          <span className="pr-2">
            <ShareIcon />
          </span>
          <span>
            <DeleteIcon />
          </span>
        </div>
      </div>
      {type == "image" ? (
        // @ts-ignore
        <img src={`http://localhost:3000${link}`} alt={title} />
      ) : (
        <p className="">{link}</p>
      )}
    </div>
  );
};
