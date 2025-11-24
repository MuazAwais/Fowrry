import whatsappLogo from "../../../assets/whatsapp.png";
import Navbar from "./navbar";

const Header = () => {
  return (
    <div>
      <div className="bg-primary">
      <div className="container py-2 min-h-[50px] text-light flex justify-center sm:justify-between flex-wrap gap-y-2 items-center ">
        <div className="md:font-bold font-semibold">Welcome to Fowrry</div>
        <div className="flex gap-x-2">
          <div className="w-[22px] flex items-center">
            <img
              src={whatsappLogo.src}
              alt="Whatsapp"
              className="w-full object-cover"
            />
          </div>{" "}
          <div className="md:font-bold font-semibold ">+92 307 136 9779</div>
        </div>
      </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
