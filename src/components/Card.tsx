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
    <div className="border border-neutral-500 rounded-md bg-amber-50 flex flex-col items-center justify-around shadow-md w-full max-w-72 p-2 m-1">
      <div className="top flex  items-center justify-between w-full">
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
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          New pitch deck 🌁{" "}
          <a href="https://t.co/sv4ARt86eD">https://t.co/sv4ARt86eD</a>{" "}
          <a href="https://t.co/NrEWyfENRq">pic.twitter.com/NrEWyfENRq</a>
        </p>
        &mdash; Mark Vassilevskiy (@MarkKnd){" "}
        <a href="https://x.com/yashx024/status/1947671740680966603">
          July 25, 2025
        </a>
      </blockquote>{" "}
      
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </div>
  );
};
