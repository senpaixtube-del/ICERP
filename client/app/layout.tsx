import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Background from "@/components/Background";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {

  title: "ICERP",

  description: "ICERP RolePlay Server",

};



export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {


  return (

    <html
      lang="en"
      className={`
      ${geistSans.variable}
      ${geistMono.variable}
      h-full
      antialiased
      `}
    >


      <body
        className="
        min-h-screen
        overflow-x-hidden
        bg-transparent
        text-white
        "
      >


        {/* Background */}

        <Background />



        {/* Content */}

        <main
          className="
          relative
          z-10
          min-h-screen
          "
        >

          {children}

        </main>



      </body>


    </html>

  );

}