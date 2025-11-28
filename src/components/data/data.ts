export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    available: number;
    offer: number;
    image: string;
  }
export interface Shop {
    id: number;
    name: string;
    category: string;
    city: string;
    lat: number;
    lng: number;
    rating: number;
    reviews: number;
    deliveryTime: string;
    image: string;
    products: Product[];
  }

export const SHOPS_DATA: Shop[] = [
    {
      id: 1,
      name: "TechHub Electronics",
      category: "Electronics",
      city: "Karachi",
      lat: 24.8607,
      lng: 67.0011,
      rating: 4.5,
      reviews: 234,
      deliveryTime: "30-45 min",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop", // Placeholder shop image
      products: [
        { id: 101, title: "Wireless Headphones", description: "Premium noise-cancelling headphones", price: 199, available: 15, offer: 20, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
        { id: 102, title: "Smart Watch", description: "Fitness tracking smartwatch", price: 299, available: 8, offer: 0, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
        { id: 103, title: "USB-C Cable", description: "Fast charging cable 6ft", price: 15, available: 50, offer: 10, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" }
      ]
    },
    {
      id: 2,
      name: "Fresh Mart Groceries",
      category: "Groceries",
      city: "Lahore",
      lat: 31.5497,
      lng: 74.3436,
      rating: 4.2,
      reviews: 456,
      deliveryTime: "20-30 min",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", // Placeholder shop image
      products: [
        { id: 201, title: "Organic Mangoes", description: "Fresh Pakistani mangoes 1kg", price: 5, available: 100, offer: 0, image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=200&fit=crop" },
        { id: 202, title: "Naan Bread", description: "Freshly baked traditional naan", price: 3, available: 40, offer: 15, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop" },
        { id: 203, title: "Dahi Yogurt", description: "Homemade yogurt 500g", price: 4, available: 60, offer: 0, image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=200&h=200&fit=crop" }
      ]
    },
    {
      id: 3,
      name: "Bella Italia Restaurant",
      category: "Restaurants",
      city: "Islamabad",
      lat: 33.6844,
      lng: 73.0479,
      rating: 4.7,
      reviews: 892,
      deliveryTime: "40-50 min",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop", // Placeholder shop image
      products: [
        { id: 301, title: "Chicken Biryani", description: "Spicy rice with tender chicken", price: 18, available: 20, offer: 0, image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&h=200&fit=crop" },
        { id: 302, title: "Nihari", description: "Slow-cooked beef stew", price: 22, available: 15, offer: 10, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop" },
        { id: 303, title: "Ras Malai", description: "Traditional Pakistani dessert", price: 8, available: 12, offer: 0, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop" }
      ]
    },
    {
      id: 4,
      name: "Gadget World",
      category: "Electronics",
      city: "Peshawar",
      lat: 34.0151,
      lng: 71.5249,
      rating: 4.3,
      reviews: 178,
      deliveryTime: "35-50 min",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop", // Placeholder shop image
      products: [
        { id: 401, title: "Laptop Stand", description: "Ergonomic aluminum stand", price: 45, available: 25, offer: 25, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop" },
        { id: 402, title: "Wireless Mouse", description: "Bluetooth gaming mouse", price: 35, available: 30, offer: 0, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop" }
      ]
    },
    {
      id: 5,
      name: "Green Valley Market",
      category: "Groceries",
      city: "Faisalabad",
      lat: 31.4504,
      lng: 73.1350,
      rating: 4.6,
      reviews: 523,
      deliveryTime: "25-35 min",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", // Placeholder shop image
      products: [
        { id: 501, title: "Kinnow Oranges", description: "Juicy Pakistani kinnows pack of 6", price: 6, available: 80, offer: 0, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=200&h=200&fit=crop" },
        { id: 502, title: "Desi Ghee", description: "Pure clarified butter 1L", price: 4, available: 45, offer: 20, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop" }
      ]
    },
    {
      id: 6,
      name: "Sushi Paradise",
      category: "Restaurants",
      city: "Rawalpindi",
      lat: 33.5651,
      lng: 73.0169,
      rating: 4.8,
      reviews: 1024,
      deliveryTime: "45-60 min",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop", // Placeholder shop image
      products: [
        { id: 601, title: "Seekh Kebab", description: "Spiced minced meat skewers", price: 12, available: 30, offer: 0, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop" },
        { id: 602, title: "Chicken Karahi", description: "Spicy chicken curry 10 servings", price: 25, available: 15, offer: 15, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop" }
      ]
    }
  ];  