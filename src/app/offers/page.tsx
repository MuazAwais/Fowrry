"use client";
import { getProductsWithOffers, getOffersByCategory } from "@/lib/utils/getProductsWithOffers";
import ProductCard from "@/components/ui/productCard";
import { useState } from "react";
import { Select } from "@radix-ui/themes";
import { FaFire, FaTag } from "react-icons/fa";

const OffersPage = () => {
  const allOffers = getProductsWithOffers();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("discount");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Electronics", label: "Electronics" },
    { value: "Groceries", label: "Groceries" },
    { value: "Restaurants", label: "Restaurants" },
  ];

  const filteredOffers =
    selectedCategory === "all"
      ? allOffers
      : getOffersByCategory(selectedCategory);

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (sortBy === "discount") return b.offer - a.offer;
    if (sortBy === "price-low") return a.discountedPrice - b.discountedPrice;
    if (sortBy === "price-high") return b.discountedPrice - a.discountedPrice;
    return 0;
  });

  return (
    <div className="min-h-screen bg-light">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-red-600 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-x-4 mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <FaFire className="text-4xl" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Special Offers & Deals
              </h1>
              <p className="text-lg opacity-90">
                Don't miss out on these amazing discounts!
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-x-2">
            <FaTag className="text-2xl" />
            <span className="text-xl font-semibold">
              {allOffers.length} Products on Sale
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-x-4 flex-wrap">
            <span className="font-semibold text-gray-700">Filter by:</span>
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category.value
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-x-3">
            <Select.Root value={sortBy} onValueChange={setSortBy}>
              <Select.Trigger placeholder="Sort by" variant="soft" />
              <Select.Content>
                <Select.Item value="discount">Highest Discount</Select.Item>
                <Select.Item value="price-low">Price: Low to High</Select.Item>
                <Select.Item value="price-high">Price: High to Low</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        {/* Offers Grid */}
        {sortedOffers.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              Showing {sortedOffers.length} offer{sortedOffers.length !== 1 ? "s" : ""}
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {sortedOffers.map((product) => (
                <div key={product.id} className="relative">
                  {/* Special Offer Badge */}
                  <div className="absolute -top-2 -right-2 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-x-1">
                    <FaFire className="text-xs" />
                    {product.offer}% OFF
                  </div>
                  <ProductCard
                    product={product}
                    shopName={product.shopName}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-6 w-fit mx-auto mb-4">
              <FaTag className="text-5xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No offers found
            </h3>
            <p className="text-gray-500 mb-6">
              {selectedCategory !== "all"
                ? `No offers available in ${selectedCategory} category.`
                : "No offers available at the moment."}
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              View All Offers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;

