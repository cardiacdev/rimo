"use client";

import React from "react";
import NiceModal from "@ebay/nice-modal-react";

import { ThemeProvider } from "./theme-provider";
import { TRPCReactProvider } from "~/trpc/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark">
        <NiceModal.Provider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </NiceModal.Provider>
      </ThemeProvider>
    </div>
  );
};
