import * as React from "react";

import { CircleCheck } from "lucide-react";

export const Online = () => {
  return (
    <div className={"flex flex-row items-center justify-start"}>
      <CircleCheck size={14} color="black" fill={"green"} />
      <span className={"content-center px-1 text-xs"}>在线</span>
    </div>
  );
};
