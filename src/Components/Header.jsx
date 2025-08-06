import { Search, ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from 'sonner';
import { PackageSearch } from "lucide-react";
// Minimal Button component
const Button = ({ children, className = "", variant = "default", size = "md", ...props }) => {
    const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none";
    const variants = {
        default: "bg-primary text-white hover:bg-primary/90",
        ghost: "bg-transparent hover:bg-muted/40",
    };
    const sizes = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        icon: "h-10 w-10 p-2",
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// Minimal Input component
const Input = ({ className = "", ...props }) => {
    return (
        <input
            className={`w-full h-10 rounded-md border px-3 py-2 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
            {...props}
        />
    );
};

const Header = () => {
    const [cartItems, setCartItems] = useState(0);
     const { userId, setUserId, loading, setLoading } = useUser();
    const navigate = useNavigate();
    const URL = "https://luxora-backend-guh1.onrender.com"
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${URL}/api/user/logout`, {}, { withCredentials: true })

            setUserId(null);
            toast.success("Logout !")
            navigate("/login");
        } catch (error) {
            console.log("login error", error);
            toast.error(error)
        }
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("https://luxora-backend-guh1.onrender.com/api/user/get-user", {
                    withCredentials: true
                });
                setUserId(res.data.userId); // Or whatever user data is
                setLoading(false);
            } catch (err) {
                console.error("Error fetching user", err);
                setLoading(false);
            }
        };

        fetchUser();
    }, []);
    if (loading) {
        return <div>Loading...</div>; // Or use shimmer/spinner
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo + Mobile Menu */}
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <Link
                        to="/"
                        className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        LuxOra
                    </Link>
                </div>

                {/* Search Bar - desktop */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search products..."
                            className="pl-10 border-gray-300 focus:bg-white"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                    {/* Mobile search toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    {/* Cart */}
                    <Link to="/cart" className="relative group">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Button>
                        <span className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            My Cart
                        </span>
                    </Link>

                    {/* Orders */}
                    <Link to="/myorder" className="relative group">
                        <Button variant="ghost" size="icon" className="relative">
                            <PackageSearch className="h-5 w-5" />
                        </Button>
                        <span className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            My Order
                        </span>
                    </Link>

                    {/* Login/Logout */}
                    {userId ? (
                        <div className="relative group">
                            <Button variant="ghost" size="icon" onClick={handleLogout}>
                                <LogOut className="h-5 w-5" />
                            </Button>
                            <span className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                Logout
                            </span>
                        </div>
                    ) : (
                        <Link to="/login" className="relative group">
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                            <span className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                Login
                            </span>
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile search bar (below header) */}
            {mobileSearchOpen && (
                <div className="md:hidden p-4 border-b bg-white">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search products..."
                            className="pl-10 border-gray-300 focus:bg-white"
                        />
                    </div>
                </div>
            )}

            {/* (Optional) Mobile menu dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-b shadow-sm">
                    <ul className="flex flex-col space-y-2 p-4">
                        <li><Link to="/cart" className="text-sm">Cart</Link></li>
                        <li><Link to="/myorder" className="text-sm">My Order</Link></li>
                        <li><Link to="/login" className="text-sm">Login</Link></li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
