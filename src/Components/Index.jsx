import React from "react";
import Header from "./Header";
import CategoryNav from "./CategoryNav";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import FeaturedCategories from "./FeaturedCategories";
import ProductCard from "./Productcard";
import ProductGrid from "./ProductGrid";

const Index = () => {
    return (
        <>
            <CategoryNav />
            <main className="p-4">
                <HeroSection />
                <FeaturedCategories />
                <ProductGrid />
            </main>
        </>
    );
};

export default Index;
