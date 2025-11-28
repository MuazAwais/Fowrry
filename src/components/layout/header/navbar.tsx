"use client";
import Cart from "@/components/ui/cart";
import Navmenu from "./navmenu";
import useIsScrolled from "@/components/hooks/useIsScrolled";
import logo from "../../../../assets/logo-header.svg";
import { Box, Flex, Select, Separator, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { LuTicketPercent } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { MdTrackChanges } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const isScrolled = useIsScrolled(50);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === "Electronics") {
      router.push("/electronics");
    } else if (value === "Groceries") {
      router.push("/groceries");
    } else if (value === "Restaurants") {
      router.push("/restaurants");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <div className={`bg-[#ebeaea] z-[999] ${isScrolled ? "fixed top-0 w-full shadow-md" : ""} transition-all duration-300`}>
      <div className="sm:hidden py-[10px] container flex justify-between items-center">
        <div className="">
          <Navmenu />
        </div>
        <div>
          <Cart />
        </div>
      </div>
      <div className="container py-2 flex items-center justify-between gap-x-3">
        <Link href="/" className="w-[120px] hover:opacity-80 transition-opacity">
          <img src={logo.src} alt="Fowrry Logo" className="w-full h-auto" />
        </Link>
        <div className="flex items-center flex-1 max-w-2xl mx-4">
          <Box className="w-full">
            <form onSubmit={handleSearch} className="w-full">
              <Flex align={"center"} className="bg-[#c4c3c3] rounded-full w-full">
                <Select.Root value={selectedCategory || undefined} onValueChange={handleCategoryChange}>
                  <Select.Trigger
                    placeholder="Category"
                    variant="soft"
                    radius="full"
                    className="min-w-[140px]"
                  />
                  <Select.Content variant="soft" color="gray">
                    <Select.Item value="Electronics">Electronics</Select.Item>
                    <Select.Item value="Groceries">Groceries</Select.Item>
                    <Select.Item value="Restaurants">Restaurants</Select.Item>
                  </Select.Content>
                </Select.Root>
                <Separator orientation="vertical" size="1" color="gray" className="z-[999] border-[#000]" />
                <TextField.Root
                  placeholder="Search products, stores..."
                  variant="soft"
                  radius="full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                >
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Flex>
            </form>
          </Box>
        </div>
        <div className="md:flex gap-x-3 items-center hidden">
          <Link href="/offers" className="flex flex-col items-center hover:opacity-80 transition-opacity">
            <div className="text-primary w-fit border-2 rounded-full p-2">
              <LuTicketPercent />
            </div>
            <span className="text-[12px] font-medium">Offers</span>
          </Link>
          <Link href="/favourites" className="flex flex-col items-center hover:opacity-80 transition-opacity">
            <div className="text-primary w-fit border-2 rounded-full p-2">
              <FaRegHeart />
            </div>
            <span className="text-[12px] font-medium">Favourites</span>
          </Link>
          <Link href="/track-order" className="flex flex-col items-center hover:opacity-80 transition-opacity">
            <div className="text-primary w-fit border-2 rounded-full p-2">
              <MdTrackChanges />
            </div>
            <span className="text-[12px] font-medium">Track Order</span>
          </Link>
          <Link href="/login" className="flex flex-col items-center hover:opacity-80 transition-opacity">
            <div className="text-light bg-primary w-fit border-2 rounded-full p-2">
              <IoPersonOutline />
            </div>
            <span className="text-[12px] font-medium">Login</span>
          </Link>
          <div className="scale-125">
            <Cart />
          </div>
        </div>
      </div>
      <div className="bg-light sm:flex items-center border-y-2 h-10 border-[#cccccc] hidden">
        <div className="container flex items-center">
          <Link href="/" className="px-4 text-primary hover:text-primary/80 transition-colors font-medium">
            Home
          </Link>
          <Link href="/electronics" className="tab-shape hover:bg-white transition-colors">
            Electronics
          </Link>
          <Link href="/groceries" className="tab-shape hover:bg-white transition-colors">
            Groceries
          </Link>
          <Link href="/restaurants" className="tab-shape hover:bg-white transition-colors">
            Restaurants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
