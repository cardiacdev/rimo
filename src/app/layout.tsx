import "~/styles/globals.css";

import { Inter } from "next/font/google";
import NiceModal from "@ebay/nice-modal-react";
import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/header";
import { ThemeProvider } from "./_components/theme-provider";
import { Providers } from "./_components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "RIMO",
  description: "RIMO - The Rick & Morty Platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
