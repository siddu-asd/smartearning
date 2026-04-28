import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elevate Digital | Cinematic 3D Journey",
  description: "A premium 3D digital experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark overflow-hidden`}
    >
      <body className="h-full w-full bg-[#050505] text-foreground cursor-none md:cursor-auto m-0 p-0 overflow-hidden">
        <CustomCursor />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
