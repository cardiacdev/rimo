"use client";

import React from "react";

import { ThemeProvider } from "./theme-provider";
import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SessionProvider>
        <ThemeProvider defaultTheme="dark">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};
