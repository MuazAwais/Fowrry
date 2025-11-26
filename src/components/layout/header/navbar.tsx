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

const Navbar = () => {
  const isScrolled = useIsScrolled(20);
  // const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className={`bg-[#ebeaea] ${isScrolled ? " fixed top-0 w-full" : ""}`}>
      <div className="sm:hidden py-[10px] container flex justify-between items-center">
        <div className="">
          <Navmenu />
        </div>
        <div>
          <Cart />
        </div>
      </div>
      <div className="container py-2 flex items-center justify-between gap-x-3">
        <div className="w-[120px]">
          <img src={logo.src} alt="LogoFowrry" />
        </div>
        <div className="flex items-center">
          <Box >
          <Flex align={"center"} className="bg-[#c4c3c3] rounded-full">
          <Select.Root>
            <Select.Trigger
              placeholder="Business"
              variant="soft"
              radius="full"
            />
            <Select.Content variant="soft" color="gray">
              <Select.Item value="Electronics">Electronics</Select.Item>
              <Select.Item value="grocries">Grocreis</Select.Item>
              <Select.Item value="resturants">Resturants</Select.Item>
            </Select.Content>
          </Select.Root>
          <Separator orientation="vertical" size="1" color="gray" className="z-[999] border-[#000]" />
          <TextField.Root
            placeholder="Search the docs…"
            variant="soft"
            radius="full"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          </Flex>
          </Box>
        </div>
        <div className="md:flex gap-x-3 items-center hidden ">
            <div className="flex flex-col items-center"><div className="text-primary w-fit border-2 rounded-full p-2"><LuTicketPercent /></div><span className="text-[12px] font-medium">Offers</span></div>
            <div className="flex flex-col items-center"><div className="text-primary w-fit border-2 rounded-full p-2"><FaRegHeart /></div><span className="text-[12px] font-medium">Favourties</span></div>
            <div className="flex flex-col items-center"><div className="text-primary w-fit border-2 rounded-full p-2"><MdTrackChanges /></div><span className="text-[12px] font-medium">Track Order</span></div>
            <div className="flex flex-col items-center"><div className="text-light bg-primary w-fit border-2 rounded-full p-2"><IoPersonOutline /></div><span className="text-[12px] font-medium">Login</span></div>
            <div className="scale-125"><Cart /></div>
        </div>
      </div>
      <div className="bg-light sm:flex items-center border-y-2 h-10 border-[#cccccc] hidden">
        <div className="container flex items-center">
        <div className="px-4 text-primary">Home</div>
        <div
          className="tab-shape"
        >
          Electronic
        </div>
        <div
          className="tab-shape"
        >
          Grocries
        </div>
        <div
          className="tab-shape"
         
        >
          Resturants
        </div>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
