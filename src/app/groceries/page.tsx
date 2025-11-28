"use client";
import { getShopsByCategory, getAllProductsFromCategory } from "@/lib/utils/getShopsByCategory";
import StoreCard from "@/components/ui/storeCard";
import ProductCard from "@/components/ui/productCard";
import { useState } from "react";
import { Select } from "@radix-ui/themes";
import { FaFilter } from "react-icons/fa";

const GroceriesPage = () => {
  const shops = getShopsByCategory("Groceries");
  const allProducts = getAllProductsFromCategory("Groceries");
  const [viewMode, setViewMode] = useState<"stores" | "products">("stores");
  const [sortBy, setSortBy] = useState<string>("rating");

  const sortedShops = [...shops].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviews - a.reviews;
    if (sortBy === "delivery") {
      const aTime = parseInt(a.deliveryTime.split("-")[0]);
      const bTime = parseInt(b.deliveryTime.split("-")[0]);
      return aTime - bTime;
    }
    return 0;
  });

  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return 4.5 - 4.5;
    return 0;
  });

  return (
    <div className="min-h-screen bg-light">
      {/* Header Section */}
      <div className="bg-green-600 text-white py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Groceries</h1>
          <p className="text-lg opacity-90">
            Fresh groceries and daily essentials delivered to your door
          </p>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => setViewMode("stores")}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                viewMode === "stores"
                  ? "bg-primary text-white"
                  : "bg-white text-dark hover:bg-gray-100"
              }`}
            >
              Stores ({shops.length})
            </button>
            <button
              onClick={() => setViewMode("products")}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                viewMode === "products"
                  ? "bg-primary text-white"
                  : "bg-white text-dark hover:bg-gray-100"
              }`}
            >
              Products ({allProducts.length})
            </button>
          </div>

          <div className="flex items-center gap-x-3">
            <FaFilter className="text-secondary" />
            <Select.Root value={sortBy} onValueChange={setSortBy}>
              <Select.Trigger placeholder="Sort by" variant="soft" />
              <Select.Content>
                <Select.Item value="rating">Highest Rating</Select.Item>
                <Select.Item value="reviews">Most Reviews</Select.Item>
                <Select.Item value="delivery">Fastest Delivery</Select.Item>
                {viewMode === "products" && (
                  <>
                    <Select.Item value="price-low">Price: Low to High</Select.Item>
                    <Select.Item value="price-high">Price: High to Low</Select.Item>
                  </>
                )}
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        {/* Content Grid */}
        {viewMode === "stores" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedShops.map((shop) => (
              <StoreCard key={shop.id} shop={shop} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                shopName={product.shopName}
              />
            ))}
          </div>
        )}

        {viewMode === "stores" && shops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">No grocery stores found</p>
          </div>
        )}

        {viewMode === "products" && allProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">No grocery products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroceriesPage;

