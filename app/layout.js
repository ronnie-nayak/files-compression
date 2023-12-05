'use client'
import { Navbar } from "@/components/navbar";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import './globals.css';


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <RecoilRoot>
          <SessionProvider>
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
            </div>
          </SessionProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
