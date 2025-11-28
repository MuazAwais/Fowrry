"use client";
import Navbar from "./navbar";
import WelcomeBar from "./welcomeBar";

const Header = () => {
  return (
    <header className="relative z-[999]">
      <WelcomeBar />
      <nav>
        <Navbar />
      </nav>
    </header>
  );
};

export default Header;;
