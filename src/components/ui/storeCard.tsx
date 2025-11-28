import { Shop } from "@/components/data/data";
import { FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

interface StoreCardProps {
  shop: Shop;
}

const StoreCard = ({ shop }: StoreCardProps) => {
  return (
    <Link href={`/store/${shop.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
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
          <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            {shop.category}
          </div>
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
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-secondary">
              {shop.products.length} products available
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;

