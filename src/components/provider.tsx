"use client";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: Error) => {
        if (error.message === "NEXT_REDIRECT") {
          return;
        }
        // toast.error(error.message);
      },
      onSuccess: () => {
        // toast.success("Operation was success");
      },
    },
  },
});

export const Provider = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};
