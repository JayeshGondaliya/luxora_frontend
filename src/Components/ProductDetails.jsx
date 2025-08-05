import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import axios from "axios";
import {
    Heart,
    Star,
    ShoppingCart,
    Share2,
    ArrowLeft,
    Truck,
    Shield,
    RotateCcw,
    Plus,
    Minus,
    ChevronRight,
    ChevronLeft
} from "lucide-react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProductDetails = () => {
    const { productId, category } = useParams();
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);
    const [categoryBasedProduct, setCategoryBasedProduct] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const URL = "http://localhost:8081";
    const { userId } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate("/login");
        }
    }, [userId, navigate]);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`${URL}/api/product/getproduct/${productId}`);
                setProduct(res.data.data);
            } catch (error) {
                console.error("getProduct fetch error", error);
            }
        };

        const getAllProducts = async () => {
            try {
                const res = await axios.get(`${URL}/api/product/getProductAll`);
                setAllProducts(res.data.data);
                // Get trending products (top rated with most reviews)
                const trending = [...res.data.data]
                    .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
                    .slice(0, 8);
                setTrendingProducts(trending);
            } catch (error) {
                console.error("getAllProducts products fetch error", error);
            }
        };

        const getCategoryBasedProduct = async (category) => {
            try {
                const res = await axios.get(`${URL}/api/product/categoryFetchItem/${category}`, {
                    withCredentials: true
                });
                setCategoryBasedProduct(res.data.data);
            } catch (error) {
                console.error("getCategoryBasedProduct products fetch error", error);
            }
        };

        getProduct();
        getAllProducts();
        getCategoryBasedProduct(category);
    }, [productId, category]);

    const productImages = product ? [product.image, product.image, product.image] : [];
    const sizes = ["S", "M", "L", "XL", "XXL"];

    const features = [
        { icon: Truck, title: "Free Delivery", subtitle: "On orders above ₹499" },
        { icon: RotateCcw, title: "7 Day Return", subtitle: "Easy returns" },
        { icon: Shield, title: "Secure Pay", subtitle: "100% secure payment" },
    ];

    const handleAddToCart = async () => {
        try {
            const res = await axios.post(
                `${URL}/api/cart/addtocart`,
                {
                    userId,
                    productId: productId,
                    quantity: quantity,
                    size: selectedSize
                },
                { withCredentials: true }
            );
            toast.success("Item Added To Cart");
        } catch (err) {
            console.error("Error adding to cart:", err);
            toast.error("Failed to add item to cart");
        }
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === trendingProducts.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? trendingProducts.length - 1 : prev - 1));
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">

            {/* Top Nav */}
            <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-gray-200 px-4 py-4 flex justify-between items-center z-50">
                <button onClick={() => navigate(-1)} className="p-2 rounded hover:bg-gray-100">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-3">
                    <button className="p-2 rounded hover:bg-gray-100">
                        <Share2 className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className="p-2 rounded hover:bg-gray-100"
                    >
                        <Heart className={`h-5 w-5 transition ${isWishlisted ? "text-red-500 fill-red-500" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Images - Mobile First */}
                <div className="lg:sticky lg:top-20">
                    <div className="relative overflow-hidden rounded-xl shadow-md mb-4">
                        <img
                            src={productImages[selectedImage]}
                            alt={product.name}
                            className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
                        />
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {productImages.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border rounded-lg overflow-hidden ${selectedImage === i ? "border-blue-600 ring-2 ring-blue-400" : "border-gray-300"
                                    }`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl sm:text-3xl font-bold text-gray-900"
                    >
                        {product.name}
                    </motion.h1>

                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                            <Star className="w-4 h-4 fill-green-500" />
                            {product.rating || 4.5}
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews || "2.1k"} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                                ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                                <span className="line-through text-gray-400 text-xl">
                                    ₹{product.originalPrice.toLocaleString()}
                                </span>
                            )}
                            {product.discount && (
                                <span className="text-red-600 text-sm font-bold bg-red-50 px-2 py-1 rounded">
                                    {product.discount}% OFF
                                </span>
                            )}
                        </div>
                        {product.discount && product.originalPrice && (
                            <p className="text-green-600 text-sm font-medium">
                                You save ₹{(product.originalPrice - product.price).toLocaleString()}
                            </p>
                        )}
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-3 border rounded-lg divide-x divide-gray-200 bg-white">
                        {features.map((f, i) => (
                            <div key={i} className="p-3 sm:p-4 text-center space-y-1">
                                <f.icon className="mx-auto w-5 h-5 text-blue-600" />
                                <p className="text-sm font-medium">{f.title}</p>
                                <p className="text-xs text-gray-500">{f.subtitle}</p>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-2">Product Details</h3>
                        <p className="text-gray-600 text-sm">{product.description}</p>
                    </div>

                    {/* Size */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-3">Select Size</h3>
                        <div className="flex flex-wrap gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 rounded border font-medium transition ${selectedSize === size
                                        ? "bg-purple-600 text-white border-purple-600"
                                        : "border-gray-300 text-gray-700 hover:border-purple-400"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-3">Quantity</h3>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 border rounded hover:bg-gray-100 flex items-center justify-center"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-lg font-medium">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 border rounded hover:bg-gray-100 flex items-center justify-center"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 sticky bottom-0 bg-white p-4 shadow-lg rounded-lg lg:static lg:shadow-none">
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`flex-1 py-3 border rounded flex items-center justify-center gap-2 transition ${isWishlisted ? "bg-red-50 text-red-600 border-red-200" : "hover:bg-gray-100"
                                    }`}
                            >
                                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
                                {isWishlisted ? "Wishlisted" : "Wishlist"}
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded hover:opacity-90 flex items-center justify-center gap-2 transition"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                handleAddToCart();
                                navigate("/cart");
                            }}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded hover:opacity-90 transition"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">You may also like</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {categoryBasedProduct
                        .filter((p) => p._id !== product._id)
                        .slice(0, 4)
                        .map((item) => (
                            <Link
                                to={`/productsDetail/${item._id}/category/${item.category}`}
                                key={item._id}
                                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group block"
                            >
                                <div className="relative overflow-hidden aspect-square">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-3 sm:p-4">
                                    <h3 className="text-sm sm:text-base font-medium line-clamp-2">{item.name}</h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-orange-600 font-bold">₹{item.price.toLocaleString()}</p>
                                        {item.originalPrice && (
                                            <span className="text-xs line-through text-gray-400">
                                                ₹{item.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>

            {/* Trending Products Carousel */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold">Trending Now</h2>
                    <Link
                        to="/productspage"
                        className="text-sm sm:text-base text-purple-600 hover:text-purple-800 flex items-center gap-1"
                    >
                        View all <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {trendingProducts.slice(0, 4).map((item) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group"
                                >
                                    <Link to={`/productsDetail/${item._id}/category/${item.category}`}>
                                        <div className="relative overflow-hidden aspect-square">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                            {item.discount && (
                                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                    -{item.discount}%
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm sm:text-base font-medium line-clamp-2 mb-2">{item.name}</h3>
                                            <div className="flex items-center gap-1 text-amber-500 mb-2">
                                                <Star className="w-4 h-4 fill-amber-400" />
                                                <span className="text-sm">{item.rating}</span>
                                                <span className="text-xs text-gray-400">({item.reviews})</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold text-gray-900">
                                                    ₹{item.price.toLocaleString()}
                                                </span>
                                                {item.originalPrice && (
                                                    <span className="text-xs line-through text-gray-400">
                                                        ₹{item.originalPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;