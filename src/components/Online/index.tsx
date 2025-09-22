import * as React from "react";

import { CircleCheck } from "lucide-react";
import { white } from "next/dist/lib/picocolors";

export const Online = () => {
  return (
    <div className={"flex flex-row items-center justify-start"}>
      <CircleCheck size={16} fill={'green'} color={'white'} />
      <span className={"content-center px-1 text-xs"}>在线</span>
    </div>
  );
};
