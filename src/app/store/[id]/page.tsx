"use client";
import { getShopById } from "@/lib/utils/getShopsByCategory";
import { use } from "react";
import ProductCard from "@/components/ui/productCard";
import { FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface StorePageProps {
  params: Promise<{ id: string }>;
}

const StorePage = ({ params }: StorePageProps) => {
  const router = useRouter();
  const { id } = use(params);
  const shopId = parseInt(id);
  const shop = getShopById(shopId);

  if (!shop) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Store Not Found</h1>
          <p className="text-secondary mb-6">The store you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-white px-6 py-2 rounded-full"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-light">
      {/* Store Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{shop.name}</h1>
            <div className="flex items-center gap-x-4 flex-wrap">
              <div className="flex items-center gap-x-1">
                <FaStar className="text-warning" />
                <span className="font-semibold">{shop.rating}</span>
                <span className="text-sm opacity-80">({shop.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-x-2">
                <FaClock />
                <span>{shop.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <FaMapMarkerAlt />
                <span>{shop.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Info and Products */}
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Store Details Sidebar */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-4">
              <h2 className="text-xl font-bold mb-4">Store Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-secondary mb-1">Category</p>
                  <p className="font-semibold">{shop.category}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Location</p>
                  <p className="font-semibold">{shop.city}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Delivery Time</p>
                  <p className="font-semibold">{shop.deliveryTime}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Rating</p>
                  <div className="flex items-center gap-x-2">
                    <FaStar className="text-warning" />
                    <span className="font-semibold">{shop.rating}</span>
                    <span className="text-sm text-secondary">({shop.reviews} reviews)</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <button className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
                    Contact Store
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Products ({shop.products.length})</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {shop.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{ ...product, shopName: shop.name, shopId: shop.id }}
                  shopName={shop.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;

