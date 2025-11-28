import { Product } from "@/components/data/data";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "./toastProvider";

type ExtendedProduct = Product & { shopName?: string; shopId?: number };

interface ProductCardProps {
  product: ExtendedProduct;
  shopName?: string;
  onAddToCart?: (product: ExtendedProduct) => void;
}

const ProductCard = ({ product, shopName, onAddToCart }: ProductCardProps) => {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    // Always use cart context for adding items
    addItem(product, shopName || product.shopName, product.shopId);
    
    // Show success notification
    showToast(`${product.title} added to cart!`, "success");
    
    // Also call the callback if provided (for any additional logic)
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
      <div className="relative h-40 overflow-hidden bg-light">
        {product.offer > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
            -{product.offer}%
          </div>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm md:text-base text-dark mb-1 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-xs text-secondary mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-x-1">
            <FaStar className="text-warning text-xs" />
            <span className="text-xs text-secondary">4.5</span>
          </div>
          {shopName && (
            <span className="text-xs text-secondary truncate max-w-[100px]">
              {shopName}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            {product.offer > 0 ? (
              <>
                <span className="font-bold text-primary">
                  ${(product.price * (1 - product.offer / 100)).toFixed(2)}
                </span>
                <span className="text-xs text-secondary line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="font-bold text-primary">${product.price}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
            aria-label={`Add ${product.title} to cart`}
          >
            <FaShoppingCart className="text-sm" />
          </button>
        </div>
        {product.available > 0 && (
          <p className="text-xs text-success mt-2">
            {product.available} in stock
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

