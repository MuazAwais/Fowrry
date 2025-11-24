import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import favicon from "../../assets/logo-home.svg";
import Layout from "@/components/layout";


const openSans = Open_Sans({
  variable: "--font-open_sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fowrry - Food Delivery and Online Shopping",
  description: "Online ordering & delivery of your favourite Food from nearby Restaurants, Fruits & Vegetables, Grocery, Bakery & Cafe, Medicine, Gifts, Flowers and more...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.className} ${openSans.variable}`}>
      <head>
        <link rel="icon" href={favicon.src} type="image/svg+xml" />
      </head>
      <body>
        <Layout>
         {children}
        </Layout>
      </body>
    </html>
  );
}
