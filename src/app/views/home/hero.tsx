"use client";
import pizza from "../../../../assets/pizza.png";
import cake from "../../../../assets/cake.png";
import pickBox from "../../../../assets/Pick_box.png";
import groBag from "../../../../assets/bag_of_groceries.png";
import bgImg from "../../../../assets/grey_bg.png";
import { FaSearch } from "react-icons/fa";
import { Select } from "@radix-ui/themes";
import { useState } from "react";
import LocationPicker from "@/components/ui/locationPicker";

const Hero = () => {
  const [mealType, setMealType] = useState<string>("");
  const [dishCuisine, setDishCuisine] = useState<string>("");
  const [foodType, setFoodType] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);

  const handleLocationSelect = (location: {
    address: string;
    lat: number;
    lng: number;
  }) => {
    setSelectedLocation(location);
    console.log("Selected location:", location);
  };

  const mealTypes = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Desserts",
    "Beverages",
  ];

  const dishCuisines = [
    "Pakistani",
    "Italian",
    "Chinese",
    "Fast Food",
    "Thai",
    "Mexican",
    "Indian",
    "Continental",
  ];

  const foodTypes = [
    "Vegetarian",
    "Non-Vegetarian",
    "Vegan",
    "Halal",
    "Gluten-Free",
  ];
  return (
    <div
      className=" w-full bg-cover "
      style={{ backgroundImage: `url(${bgImg.src})` }}
    >
      <div className="bg-dark/10">
        <div className="container pt-20 flex flex-col md:flex-row justify-between items-center">
          <div className="max-w-[523px] text-center">
            <div className="h-[57px] border rounded-full w-full flex px-5 gap-x-5 items-center bg-white">
              <LocationPicker
                onLocationSelect={handleLocationSelect}
                placeholder="Enter your location or Address"
                className="flex-1"
              />
              <button className="py-[9px] rounded-full px-[35px] text-[16px] bg-primary/45 text-[#fff] hidden md:block">
                Search
              </button>
            </div>
            <button className="py-[9px] rounded-full px-[35px] text-[16px] bg-primary/45 text-[#fff] md:hidden mt-3">
                Search
              </button>
            <div className="m-6 text-[24px]">Find Your Menu</div>
            <div className="border rounded-2xl md:rounded-full w-full flex md:gap-x-2 items-center justify-around md:flex-row flex-col gap-y-4 py-2 px-2 bg-white">
              <Select.Root 
                value={mealType || undefined} 
                onValueChange={(value) => setMealType(value || "")}
              >
                <Select.Trigger
                  placeholder="Meal type"
                  variant="soft"
                  radius="full"
                  className="w-full md:w-auto min-w-[120px]"
                />
                <Select.Content>
                  {mealTypes.map((type) => (
                    <Select.Item key={type} value={type}>
                      {type}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <Select.Root 
                value={dishCuisine || undefined} 
                onValueChange={(value) => setDishCuisine(value || "")}
              >
                <Select.Trigger
                  placeholder="Dish/Cuisine"
                  variant="soft"
                  radius="full"
                  className="w-full md:w-auto min-w-[140px]"
                />
                <Select.Content>
                  {dishCuisines.map((cuisine) => (
                    <Select.Item key={cuisine} value={cuisine}>
                      {cuisine}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <Select.Root 
                value={foodType || undefined} 
                onValueChange={(value) => setFoodType(value || "")}
              >
                <Select.Trigger
                  placeholder="Food Type"
                  variant="soft"
                  radius="full"
                  className="w-full md:w-auto min-w-[130px]"
                />
                <Select.Content>
                  {foodTypes.map((type) => (
                    <Select.Item key={type} value={type}>
                      {type}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <button className="hover:cursor-pointer p-2 rounded-full hover:bg-primary/10 transition-colors text-primary">
                <FaSearch size={18} />
              </button>
            </div>
            <button className="py-[9px] rounded-full px-[20px] text-[14px] mt-4 bg-primary text-[#fff]">
              View All Menu
            </button>
          </div>
          <div className="grid grid-cols-2">
            <img src={pizza.src} alt="pizza" />
            <img src={cake.src} alt="Cake" />
            <img src={groBag.src} alt="Groceries" />
            <img src={pickBox.src} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
