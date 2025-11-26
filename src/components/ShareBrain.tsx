import axios from "axios";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";

interface ShareBrainProps {
  setPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const API_URL = import.meta.env.VITE_API_URL;
const APP_URL = import.meta.env.VITE_URL;

const ShareBrain = ({ setPage }: ShareBrainProps) => {
  const [link, setLink] = useState("");
  const [toggle, setToggle] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  async function shareBrain() {
    try {
      const response = await axios.post(
        `${API_URL}/api/brain/share`,
        {
          share: toggle,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        setLink(`${APP_URL}${response.data.hash}`);
        setSuccessMsg(toggle ? 'Share link generated!' : 'Share link disabled.');
        setTimeout(() => setSuccessMsg(""), 2000);
      }
    } catch (error) {
      setSuccessMsg("Error occurred while sharing.");
      setTimeout(() => setSuccessMsg(""), 1500);
    }
  }

  return (
    <div className="font-inter absolute right-4 bottom-40 z-1 flex h-45 flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white shadow-lg sm:top-15 sm:right-68 sm:w-110">
      <div className="flex w-full items-center justify-between border-b border-neutral-200 px-4 pb-1">
        <h1 className="text-2xl font-medium text-neutral-700">Share Brain</h1>
        <IoMdClose
          className="size-6 cursor-pointer text-neutral-500 hover:text-neutral-600 active:text-neutral-700"
          aria-label="Close"
          onClick={() => setPage((val) => !val)}
          tabIndex={0}
        />
      </div>

      <form
        className="flex w-full flex-col items-center justify-between px-4 py-4"
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
        aria-labelledby="share-brain-title"
      >
        <div className=" flex w-full mb-2 items-center justify-between">
          <label className="text-base font-medium text-gray-700" htmlFor="enable-share">
            Enable Share Brain
          </label>
          <Switch
            id="enable-share"
            checked={!toggle}
            onClick={() => {
              shareBrain();
              setToggle((val) => !val);
            }}
            aria-pressed={!toggle}
            aria-label="Toggle Share Brain"
            className="bg-blue-500"
          />
        </div>

        {/* Show message */}
        {successMsg && (
          <div
            className="animate-fadeIn pointer-events-auto fixed right-6 bottom-6 z-50 flex max-w-sm min-w-[250px] items-center rounded-lg border border-blue-300 bg-white px-4 py-3 shadow-xl"
            role="status"
            aria-live="polite"
          >
            <MdVerified aria-hidden="true" className="mr-2 text-xl text-blue-500" />
            <span className="text-base font-medium text-neutral-800">{successMsg}</span>
          </div>
        )}

        <div className=" flex w-full flex-col items-start gap-2">
          <label className="text-sm font-medium text-neutral-700">Share Link</label>
          <div className="w-full">
            {!toggle ? (
              <a
                href={link}
                className="block max-w-full overflow-x-auto rounded-md bg-neutral-300 px-3 py-2 text-sm text-blue-700 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link || 'Generating...'}
              </a>
            ) : (
              <span className="block max-w-full truncate rounded-md bg-[#212121] px-3 py-2 font-mono text-sm text-neutral-400">
                Sharing is disabled.
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShareBrain;
