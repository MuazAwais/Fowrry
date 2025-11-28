import { Shop, SHOPS_DATA } from "@/components/data/data";

export const getShopsByCategory = (category: string): Shop[] => {
  return SHOPS_DATA.filter((shop) => 
    shop.category.toLowerCase() === category.toLowerCase()
  );
};

export const getAllShops = (): Shop[] => {
  return SHOPS_DATA;
};

export const getShopById = (id: number): Shop | undefined => {
  return SHOPS_DATA.find((shop) => shop.id === id);
};

export const getAllProductsFromCategory = (category: string) => {
  const shops = getShopsByCategory(category);
  return shops.flatMap((shop) =>
    shop.products.map((product) => ({
      ...product,
      shopName: shop.name,
      shopId: shop.id,
    }))
  );
};

