import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import favicon from "../../assets/logo-home.svg";
import Layout from "@/components/layout";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { CartProviderWrapper } from "@/components/providers/CartProviderWrapper";



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
        <Theme>
          <CartProviderWrapper>
            <Layout>
              {children}
            </Layout>
          </CartProviderWrapper>
        </Theme>
      </body>
    </html>
  );
}
