import { useState } from "react";

export const dataType = {
  All: "all",
  Video: "video",
  Image: "image",
  URL: "URL",
  Text: "text",
} as const;

export const [DataType, setDataType] = useState<
    (typeof dataType)[keyof typeof dataType]
    >(dataType.All);