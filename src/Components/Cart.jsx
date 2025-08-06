import React, { useEffect, useState, useCallback } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import axios from "axios";
import { useUser } from "../Context/UserContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// ✅ Button component
const Button = ({
    children,
    onClick,
    className = "",
    variant = "default",
    size = "base",
}) => {
    const variants = {
        default: "bg-black text-white hover:bg-gray-800",
        outline: "border border-gray-300 text-black hover:bg-gray-100",
        ghost: "text-red-500 hover:bg-red-100",
    };

    const sizes = {
        base: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
        icon: "p-2",
    };

    return (
        <button
            onClick={onClick}
            className={`rounded-xl transition duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
};

// ✅ Card components
const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children }) => (
    <div className="mb-4">{children}</div>
);

const CardTitle = ({ children }) => (
    <h3 className="text-lg font-semibold">{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
    <div className={className}>{children}</div>
);

// ✅ Separator
const Separator = () => (
    <hr className="border-t border-gray-200 my-2" />
);

// ✅ Main Cart Page
const Cart = () => {
    const navigate = useNavigate()
    const { userId, cartItems, setCartItems, loading } = useUser()
    const URL = "https://luxora-backend-guh1.onrender.com";
    const [total, setTotal] = useState(0)
    const getCartData = useCallback(async () => {
        try {
            const res = await axios.post(
                `${URL}/api/cart/gettocart`,
                { userId },
                { withCredentials: true }
            );
            setCartItems(res.data.data.cart.items);
            setTotal(res.data.data.cart.total)
        } catch (error) {
            console.log("get cart data error", error);
        }
    }, [userId])

    const updateCart = async ({ productId, quantity, size }) => {
        try {
            const res = await axios.post(`${URL}/api/cart/updatetocart`, {
                userId,
                productId,
                quantity,
                size
            }, {
                withCredentials: true,
            });
            toast.success(res.data.message)
            const updatedItems = cartItems.map(item =>
                item.productId._id.toString() === productId.toString() ? { ...item, quantity } : item
            );

            setCartItems(updatedItems);
            await getCartData();
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    };
    const deleteCartItem = async ({ productId, size }) => {
        try {
            const res = await axios.post(`${URL}/api/cart/deletetocart`, {
                userId,
                productId,
                size
            }, { withCredentials: true })
            await getCartData();

        } catch (error) {
            console.error("Error deleting cart:", error);

        }
    }
    useEffect(() => {
        getCartData();
    }, [getCartData]);
    useEffect(() => {
        cartItems.map(item => {
            console.log(item.productId._id);
        });
    }, [cartItems]);
    useEffect(() => {

        if (loading) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-lg font-semibold">Loading...</p>
                </div>
            );
        }

        if (!userId) {
            navigate("/login");
            return null;
        }

    }, [])
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <main className="container mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-4">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Button onClick={() => navigate("/")}>Continue Shopping</Button>
                    </div>
                </main>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Items in Your Cart</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center space-x-4 p-4 border rounded-lg"
                                    >
                                        <img
                                            src={item.productId.image}
                                            alt={item.productId.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.productId.name}</h3>
                                            <p className="text-gray-500">₹{item.productId.price}</p>
                                            <p className="text-sm text-gray-400">Size: {item.size}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                onClick={() =>
                                                    updateCart({
                                                        productId: item.productId._id,
                                                        quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                                                        size: item.size
                                                    })
                                                }
                                                variant="outline"
                                                size="icon"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>

                                            <span className="w-12 text-center">{item.quantity}</span>
                                            <Button
                                                onClick={() =>
                                                    updateCart({ productId: item.productId._id, quantity: item.quantity + 1, size: item.size })
                                                }
                                                variant="outline"
                                                size="icon"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Button variant="ghost" size="icon" className="ml-2"
                                            onClick={() =>
                                                deleteCartItem({ productId: item.productId._id, size: item.size })
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}

                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>
                                        ₹
                                        {cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>₹0.00</span>

                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>₹{total ? total.toFixed(2) : "0.00"}</span>


                                </div>
                                <Button onClick={() => navigate("/checkout")} className="w-full mt-4" size="lg">
                                    Proceed to Checkout
                                </Button>
                                <Button onClick={() => navigate("/")} variant="outline" className="w-full">
                                    Continue Shopping
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main >

        </div >
    );
};

export default Cart;
