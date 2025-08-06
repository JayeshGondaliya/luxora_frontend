import React, { useEffect, useState } from "react";
import ProductCard from "./Productcard";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
const ProductGrid = () => {
    const navigate = useNavigate()
    const { products, setProducts } = useUser()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const URL = "https://luxora-backend-guh1.onrender.com";
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${URL}/api/product/getProductAll`, {
                    withCredentials: true
                });

                // Correct: use res.data.data as per your API
                setProducts(res.data.data || []);
            } catch (err) {
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="py-16 bg-muted/50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover our carefully curated selection of top-rated products with amazing deals
                    </p>
                </div>

                {/* Loading / Error */}
                {loading && <p className="text-center">Loading products...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {!loading &&
                        products.map((product, index) => (
                            <div
                                key={product._id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}

                            >
                                <Link to={`/productsDetail/${product._id}/category/${product.category}`}>
                                    <ProductCard {...product} />
                                </Link>
                            </div>
                        ))}
                </div>

                {/* View All Products */}
                <div className="text-center mt-12">
                    <button onClick={() => navigate("/productspage")} className="inline-flex items-center px-8 py-3 text-primary hover:text-primary-foreground border border-primary hover:bg-primary rounded-lg transition-all duration-300 hover:shadow-elegant">
                        View All Products
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
