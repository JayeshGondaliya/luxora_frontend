import React from "react";
import { ArrowRight } from "lucide-react";
import asset from "./asset/asset";
import { useNavigate } from "react-router-dom";
// Custom Button (Manual because /ui/button doesn't exist)
const Button = ({ children, variant = "default", size = "md", className = "", ...props }) => {
    const base = "inline-flex items-center justify-center font-medium rounded-xl transition duration-200";
    const sizes = {
        md: "px-5 py-2.5 text-base",
        lg: "px-6 py-3 text-lg"
    };
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
        hero: "bg-primary text-white hover:bg-primary/90"
    };
    return (
        <button
            className={`${base} ${sizes[size]} ${variants[variant] || ""} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

const HeroSection = () => {
    const navigate = useNavigate()
    return (
        <section className="relative h-[600px] bg-gradient-hero overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${asset.herobanner})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="container relative h-full flex items-center px-4 md:px-10">
                <div className="max-w-2xl space-y-6 animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                        Discover
                        <span className="block bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
                            Amazing Products
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-lg">
                        Shop from millions of products with fast delivery, great prices, and excellent customer service.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Shop Now Button */}
                        <button onClick={() => navigate("/productspage")} className="group border  bg-gradient-to-r from-purple-500 to-pink-400 backdrop-blur px-4 py-2 text-white text-lg rounded-md flex items-center justify-center cursor-pointer hover:bg-red-500/60 transition">
                            Shop Now
                            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Learn More Button */}
                        <button className="border border-black bg-white/50 backdrop-blur px-4 py-2 text-black text-lg rounded-md flex items-center justify-center cursor-pointer hover:bg-white/70 transition">
                            Learn More
                        </button>
                    </div>


                    <div className="flex items-center space-x-8 pt-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-black-600">10M+</div>
                            <div className="text-sm text-gray-500">Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-black-600">1M+</div>
                            <div className="text-sm text-gray-500">Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-black-600">99%</div>
                            <div className="text-sm text-gray-500">Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
