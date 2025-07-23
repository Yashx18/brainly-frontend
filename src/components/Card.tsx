import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TextIcon } from "../icons/TextIcon";

interface Cardprops {
  title: String;
  link: String;
  type: "tweet" | "yt";
}

export const Card = ({ title, link, type }: Cardprops) => {
  return (
    <div className="border border-neutral-500 rounded-md bg-amber-50 flex flex-col items-center justify-around shadow-md w-full max-w-72 p-2">
      <div className="top flex items-center justify-between w-full">
        <div className="flex items-center justify-between">
          <span className="pr-2">
            <TextIcon />
          </span>
          <h4>Project Ideas</h4>
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
      {link}
      {title}
      {type}
    </div>
  );
};
