import axios from "axios";
import { useEffect, useState } from "react";

const useContent = () => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/vi/content", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContent(response.data.content);
      });
  }, []);

  return content;
};

export default useContent;
