import React from "react";

import { AppSideBar } from "@/components/AppSideBar";
type DashboardLayoutProps = {
  children?: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className={"flex h-full w-full flex-row content-start items-start"}>
      <AppSideBar />
      <div
        className={"flex h-full flex-1 flex-col content-start items-start p-6 bg-gray-50"}
      >
        {children}
      </div>
    </div>
  );
};
