import { SHOPS_DATA, Product } from "@/components/data/data";

export interface ProductWithOffer extends Product {
  shopName: string;
  shopId: number;
  discountedPrice: number;
}

export const getProductsWithOffers = (): ProductWithOffer[] => {
  const productsWithOffers: ProductWithOffer[] = [];

  SHOPS_DATA.forEach((shop) => {
    shop.products.forEach((product) => {
      if (product.offer > 0) {
        const discountedPrice = product.price * (1 - product.offer / 100);
        productsWithOffers.push({
          ...product,
          shopName: shop.name,
          shopId: shop.id,
          discountedPrice,
        });
      }
    });
  });

  // Sort by discount percentage (highest first)
  return productsWithOffers.sort((a, b) => b.offer - a.offer);
};

export const getOffersByCategory = (category: string): ProductWithOffer[] => {
  return getProductsWithOffers().filter((product) => {
    const shop = SHOPS_DATA.find((s) => s.id === product.shopId);
    return shop?.category.toLowerCase() === category.toLowerCase();
  });
};

