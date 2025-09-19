import { CircleX } from "lucide-react";
import * as React from "react";

export const Offline = () => {
  return (
    <div className={"flex flex-row items-center justify-start"}>
      <CircleX size={14} color="black" fill={"red"} />
      <span className={"content-center px-1 text-xs"}>离线</span>
    </div>
  );
};
