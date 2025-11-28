"use client";
import whatsappLogo from "../../../../assets/whatsapp.png";
import useIsScrolled from "@/components/hooks/useIsScrolled";

const WelcomeBar = () => {
  const phoneNumber = "+923071369779";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}`;
  const isScrolled = useIsScrolled(50);

  return (
    <div 
      className={`bg-primary transition-all duration-300 overflow-hidden ${
        isScrolled ? "max-h-0 opacity-0" : "max-h-[50px] opacity-100"
      }`}
    >
      <div className="container py-2 min-h-[50px] w-full text-light flex justify-between flex-wrap gap-y-2 items-center text-[14px]">
        <div className="md:font-bold font-medium">Welcome to Fowrry - Your One-Stop Shopping Destination</div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-x-2 items-center hover:opacity-80 transition-opacity"
          aria-label="Contact us on WhatsApp"
        >
          <div className="w-[22px] flex items-center">
            <img
              src={whatsappLogo.src}
              alt="WhatsApp"
              className="w-full object-cover"
            />
          </div>
          <div className="md:font-bold font-semibold">{phoneNumber}</div>
        </a>
      </div>
    </div>
  );
};

export default WelcomeBar;