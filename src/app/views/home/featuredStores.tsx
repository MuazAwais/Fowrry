"use client";
import { SHOPS_DATA } from "@/components/data/data";
import { FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const FeaturedStores = () => {
  const featuredShops = SHOPS_DATA.slice(0, 4);

  return (
    <div className="bg-light py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[30px] md:text-[36px] lg:text-[40px] font-bold">
            Featured Stores
          </h2>
          <button className="flex items-center gap-x-2 text-primary font-semibold hover:gap-x-3 transition-all">
            View All <FaArrowRight />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-x-1 shadow-md">
                  <FaStar className="text-warning text-sm" />
                  <span className="text-sm font-semibold">{shop.rating}</span>
                </div>
                {shop.category === "Restaurants" && (
                  <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {shop.category}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-dark mb-2">{shop.name}</h3>
                <div className="flex items-center gap-x-2 text-secondary text-sm mb-2">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{shop.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-2 text-sm text-secondary">
                    <FaClock className="text-primary" />
                    <span>{shop.deliveryTime}</span>
                  </div>
                  <div className="text-sm text-secondary">
                    {shop.reviews} reviews
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedStores;

