"use client";
import { SHOPS_DATA } from "@/components/data/data";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "@/components/ui/productCard";

const PopularProducts = () => {
  // Get all products from all shops and flatten them
  const allProducts = SHOPS_DATA.flatMap((shop) =>
    shop.products.map((product) => ({ ...product, shopName: shop.name, shopId: shop.id }))
  );

  // Get top 8 products (you can sort by popularity, rating, etc.)
  const popularProducts = allProducts.slice(0, 8);

  return (
    <div className="container py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[30px] md:text-[36px] lg:text-[40px] font-bold">
          Popular Products
        </h2>
        <button className="flex items-center gap-x-2 text-primary font-semibold hover:gap-x-3 transition-all">
          View All <FaArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
        {popularProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            shopName={product.shopName}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;

