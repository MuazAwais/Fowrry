"use client";
import { Separator } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

const Navmenu = () => {
  type nav = {
    label: string;
    href: string;
  };

  const navLinks: nav[] = [
    { label: "Login", href: "/login" },
    { label: "Track Order", href: "/track-order" },
    { label: "Favourites", href: "/favourites" },
    { label: "Offers", href: "/offers" },
    { label: "Electronics", href: "/electronics" },
    { label: "Fruits & Vegetables", href: "/fruits-vegetables" },
    { label: "Restaurants", href: "/restaurants" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div className="" onClick={toggleMenu}>
        <FiMenu size={30} />
      </div>
      <div className={`h-[100vh] absolute z-[999999999] top-0 -left-1 bg-light w-full px-6 flex flex-col gap-y-3 transition-all duration-300 ease-in-out  ${isOpen ? "translate-x-0" : "-translate-x-[100vw]"}`}>
        <div className=" flex w-full justify-end mt-2" onClick={toggleMenu}><AiFillCloseCircle /></div>
        <ul className="flex flex-col gap-y-5 ">
          {navLinks.map((link, index) => (
            <li key={index} className="font-medium pb-2 hover:cursor-pointer hover:font-semibold">
              <Link href={link.href}>{link.label}</Link>
              <Separator color="orange" size="4" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navmenu;
