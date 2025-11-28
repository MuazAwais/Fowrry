import orderImg from "../../../../assets/logo-home.svg";
import bagImg from "../../../../assets/order-bag.png";
const WorkFlow = () => {
  return (
    <div className="pt-10 container flex-col justify-center items-center gap-y-4">
      <h2 className="text-[30px] md:text-[36px] lg:text-[40px] font-bold text-center">
        How It Works
      </h2>
      <div className="flex justify-around mt-10 items-center">
        <div className="flex flex-col items-center ">
          <img src={bagImg.src} alt="bag" />
          <h3 className="font-bold text-black text-[18px] mt-2">Order</h3>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="w-[80px] md:w-[110px] border border-black border-dashed"></div>
          <div className="w-[80px] md:w-[110px] border border-black border-dashed"></div>
          <div className="w-[80px] md:w-[110px] border border-black border-dashed"></div>
        </div>
        <div>
          <img src={orderImg.src} alt="logo" />
          
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="w-[80px] md:w-[110px] border border-black border-dashed"></div>
          <div className="w-[80px] md:w-[110px] border border-black border-dashed"></div>
          <div className="w-[80px] md:w-[110px] border border-black border-dashed"></div>
        </div>
        <div>
          <div className="text-primary flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="92"
              height="92"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-package-check-icon lucide-package-check"
            >
              <path d="m16 16 2 2 4-4" />
              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
              <path d="m7.5 4.27 9 5.15" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1="12" x2="12" y1="22" y2="12" />
            </svg>
            <h3 className="font-bold text-black text-[18px] mt-2">Delivery</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;
