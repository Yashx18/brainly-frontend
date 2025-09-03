import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/Card";

const API_URL = import.meta.env.VITE_API_URL;
const APP_URL = import.meta.env.VITE_URL;


const ShareBrainPage = () => {
  const { sharelink } = useParams<{ sharelink: string }>();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/api/brain/${sharelink}`,
          {}
        );
        setData(response.data.info);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (sharelink) {
      getUserData();
    }
  }, [sharelink]);

  return (
    <div className="flex flex-col items-start justify-start w-screen h-screen  ">
      <div className=" border-b flex items-center justify-between border-[#21212179] w-full px-4 py-2">
        <h1 className="text-3xl font-semibold">Shared Brain</h1>
        <a
          href={`${APP_URL}`}
          target="_blank"
          className="bg-blue-500 px-6 py-2 rounded-lg text-white font-medium text-lg cursor-pointer hover:bg-blue-600"
        >
          Brainly
        </a>
      </div>
      <div className="Content w-full h-full overflow-y-auto p-2 bg-[#eaeaea]">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-1">
          {data.map((item) => {
            return (
              <div className="mb-3 break-inside-avoid">
                <Card title={item.title} link={item.link} type={item.type} />
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="flex items-start justify-start flex-wrap w-full h-screen px-4 bg-[#eaeaea]">
        {data.map((item) => (
          <Card title={item.title} link={item.link} type={item.type} />
        ))}
      </div> */}
      <div className="w-screen h-auto flex items-center justify-center border-t border-t-black py-4">
        <span className="font-semibold">
          Made by
          <a
            href="https://theken.vercel.app"
            target="_blank"
            className="font-bold"
          >
            {" "}
            Ken
          </a>
          .
        </span>
      </div>
    </div>
  );
};

export default ShareBrainPage;
