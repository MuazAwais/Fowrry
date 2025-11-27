import whatsappLogo from "../../../../assets/whatsapp.png";

const WelcomeBar = () => {

  return (
    <div className={`bg-primary `}>
      <div className="container py-2 min-h-[50px] w-full text-light flex justify-between flex-wrap gap-y-2 items-center text-[14px]">
        <div className="md:font-bold font-medium">Welcome to Fowrry</div>
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
  )
}

export default WelcomeBar