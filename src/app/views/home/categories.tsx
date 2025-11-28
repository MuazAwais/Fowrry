import pizza from "../../../../assets/pizza.png";
import cake from "../../../../assets/cake.png";
import pickBox from "../../../../assets/Pick_box.png";
import groBag from "../../../../assets/bag_of_groceries.png";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const categories = [
  { name: "Restaurants", icon: pizza, color: "bg-red-100", href: "/restaurants" },
  { name: "Groceries", icon: groBag, color: "bg-green-100", href: "/groceries" },
  { name: "Bakery & Cafe", icon: cake, color: "bg-yellow-100", href: "/groceries" },
  { name: "Electronics", icon: pickBox, color: "bg-blue-100", href: "/electronics" },
];

const Categories = () => {
  return (
    <div className="container py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[30px] md:text-[36px] lg:text-[40px] font-bold">
          Shop by Category
        </h2>
        <button className="flex items-center gap-x-2 text-primary font-semibold hover:gap-x-3 transition-all">
          View All <FaArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <Link key={index} href={category.href}>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
              <div className={`${category.color} rounded-xl p-4 mb-4 flex justify-center items-center h-32 group-hover:scale-105 transition-transform`}>
                <img
                  src={category.icon.src}
                  alt={category.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-center font-semibold text-lg text-dark">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

