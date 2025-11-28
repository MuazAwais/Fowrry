import bgImg from "../../../../assets/grey_bg.png";
import { FaFire, FaArrowRight } from "react-icons/fa";

const deals = [
  {
    id: 1,
    title: "50% OFF on First Order",
    description: "Get amazing discount on your first order from any restaurant",
    code: "FIRST50",
    color: "bg-red-500",
  },
  {
    id: 2,
    title: "Free Delivery",
    description: "Free delivery on orders above $30 from selected stores",
    code: "FREEDEL30",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Weekend Special",
    description: "Extra 20% off on weekends. Valid till Sunday",
    code: "WEEKEND20",
    color: "bg-blue-500",
  },
];

const DealsSection = () => {
  return (
    <div
      className="w-full bg-cover py-16"
      style={{ backgroundImage: `url(${bgImg.src})` }}
    >
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-x-3">
            <FaFire className="text-primary text-3xl" />
            <h2 className="text-[30px] md:text-[36px] lg:text-[40px] font-bold">
              Hot Deals & Offers
            </h2>
          </div>
          <button className="flex items-center gap-x-2 text-primary font-semibold hover:gap-x-3 transition-all">
            View All <FaArrowRight />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 ${deal.color} opacity-10 rounded-full -mr-16 -mt-16`}
              ></div>
              <div className="relative z-10">
                <div className="flex items-center gap-x-2 mb-3">
                  <div className={`${deal.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                    {deal.code}
                  </div>
                  <FaFire className="text-primary" />
                </div>
                <h3 className="font-bold text-xl text-dark mb-2">{deal.title}</h3>
                <p className="text-secondary text-sm mb-4">{deal.description}</p>
                <button className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors">
                  Use Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsSection;

