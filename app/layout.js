'use client'
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { RecoilRoot } from "recoil";
import '@/styles/globals.css'


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
          <div className="relative flex flex-col h-screen">
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
        </RecoilRoot>
      </body>
    </html>
  );
}
