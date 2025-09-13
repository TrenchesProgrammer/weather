import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import { DM_Sans } from "next/font/google";
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
export const metadata: Metadata = {
  title: "Weather Now",
  description: "A weather App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${dmSans.className }antialiased `}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
