import type { Metadata } from "next";
import { Inter, Lato, Mukta_Malar } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const muktaMalar = Mukta_Malar({
  variable: "--font-mukta-malar",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "UniSync — Campus Resource Dashboard",
  description:
    "Unified resource management platform for college campuses. Check availability, book resources, and manage campus facilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lato.variable} ${muktaMalar.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
