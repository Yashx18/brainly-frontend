import axios from "axios";
import { useEffect, useState } from "react";


const useContent = (
 
) => {
  const [content, setContent] = useState([]);
  const typeByMe = "image";
  useEffect(() => {
      const interval = setInterval(() => {
      axios
      .get("http://localhost:3000/api/vi/content", {
        withCredentials: true,
      })
      .then((response) => {
        const data = response.data.content ?? response.data;
        // @ts-ignore
        const filteredData = data.filter(({ type }) => type == typeByMe);
        // {
        //   DataType == "all" ? setContent(data) : setContent(filteredData);
        // }
        setContent(filteredData);
      });
      }, 1000 * 10);
    return () => {
      clearInterval(interval);
    }
    }, []);

    // console.log("This is the datatype : "+DataType);
  console.log(content);
  
  return content;
};

export default useContent;
