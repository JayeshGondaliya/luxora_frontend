import React from "react";

// Local Button Component
const Button = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`px-4 py-1 text-sm rounded hover:bg-gray-100 transition-colors ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// Categories
const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
    "Beauty",
    "Automotive",
    "Toys"
];

// Category Navigation Component
const CategoryNav = () => {
    return (
        <nav className="border-b bg-white">
            <div className="container mx-auto px-4">
                <div className="flex space-x-2 py-3 overflow-x-auto scrollbar-hide">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            className="whitespace-nowrap hover:bg-blue-100 hover:text-blue-600"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default CategoryNav;
