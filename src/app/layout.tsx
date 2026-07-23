import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { getLocale } from "next-intl/server";
import SiteProviders from "@/lib/providers/SiteProviders";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// To be added
export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.className} h-full dark`}
    >
      <body className="min-h-full flex flex-col">
        <SiteProviders>
          {children}
        </SiteProviders>
      </body>
    </html>
  );
}
