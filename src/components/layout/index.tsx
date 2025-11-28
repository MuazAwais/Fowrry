"use client";
import { ReactNode } from "react"
import Header from "./header/header";
import Footer from "./footer/footer";
import useIsScrolled from "@/components/hooks/useIsScrolled";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isScrolled = useIsScrolled(50);
  
  return (
    <div>
      <Header/>
      {/* Add padding when navbar is fixed to prevent content from jumping behind it */}
      {/* When scrolled, welcome bar is hidden, so only account for navbar height */}
      <main className={isScrolled ? "pt-[120px] md:pt-[140px]" : ""}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout



