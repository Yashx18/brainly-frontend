import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/Card";

const ShareBrainPage = () => {
  const { sharelink } = useParams<{ sharelink: string }>(); 
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/vi/brain/${sharelink}`,
          {}
        );
        setData(response.data.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (sharelink) {
      getUserData();
    }
  }, [sharelink]);
  console.log(data);
  
  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="text-4xl">Shared Brain Page</h1>
          <div className="flex items-start justify-start flex-wrap w-full">
        {data.map((item) => (
            <Card
                title={item.title}
                link={item.link}
                type={item.type}
            />
        ))}
      </div>
    </div>
  );
};

export default ShareBrainPage;
