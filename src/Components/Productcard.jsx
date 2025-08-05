import React, { useState } from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
    _id,
    image,
    name,
    badge,
    discount,
    rating,
    reviews,
    price,
    originalPrice,
}) => {
    const { userId } = useUser();
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        setIsWishlisted((prev) => !prev);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 relative flex flex-col h-full"
            onClick={() => navigate(`/productsDetail/${_id}`)}
        >
            {/* Wishlist Button - Always visible on mobile */}
            {/* <button
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
                onClick={handleWishlistToggle}
            >
                <Heart
                    className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
            </button> */}

            {/* Image & Badges */}
            <div className="relative w-full overflow-hidden rounded-lg mb-3">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-auto aspect-square object-cover object-center"
                />

                {/* Badge */}
                {badge && (
                    <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                        {badge}
                    </span>
                )}

                {/* Discount */}
                {discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                        -{discount}%
                    </span>
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {name}
                </h3>

                {/* Rating - Always visible on mobile */}
                <div className="flex items-center gap-1 text-xs text-amber-500 mb-2">
                    <Star className="h-3 w-3 fill-amber-400" />
                    <span>{rating}</span>
                    <span className="text-gray-400">({reviews})</span>
                </div>

                <div className="flex items-center gap-2 mt-auto">
                    <span className="text-base font-bold text-gray-900">
                        ₹{price}
                    </span>
                    {originalPrice && (
                        <span className="text-xs line-through text-gray-400">
                            ₹{originalPrice}
                        </span>
                    )}
                </div>

                {/* Button - Simplified for mobile */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/productsDetail/${_id}`);
                    }}
                    className="mt-2 w-full bg-black text-white text-xs py-2 rounded-md flex justify-center items-center gap-1 hover:bg-gray-800 transition"
                >
                    <ShoppingCart className="h-3 w-3" />
                    <span>View</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;