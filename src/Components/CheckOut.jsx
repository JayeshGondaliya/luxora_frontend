import React, { useEffect, useState } from "react";
import {
  Truck,
  ShoppingCart,
  CreditCard,
  Shield,
} from "lucide-react";
import { useUser } from "../Context/UserContext";
import axios from "axios";
import { toast } from "sonner";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51RoNJbDNHYkDQKMcCtgmiiw5p2BQyEYv23vo3hTQXXc0mvJNTgWQx8FG2Vu80UxdgWslct6BPNstUd1Bv71ymxdd00MlzNVERk");

// ✅ UI Components defined in the same file
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`border p-2 rounded w-full outline-none ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`border p-2 rounded w-full outline-none min-h-[100px] ${className}`}
    {...props}
  />
);

const Label = ({ children, className = "", ...props }) => (
  <label className={`block font-medium mb-1 ${className}`} {...props}>
    {children}
  </label>
);

const Card = ({ children, className = "" }) => (
  <div className={`border rounded-xl shadow-md p-4 bg-white ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const Separator = ({ className = "" }) => (
  <hr className={`my-4 border-t border-gray-300 ${className}`} />
);

// ✅ Checkout Component
const Checkout = () => {
  const { cartItems, userId } = useUser()
  const [userDetails, setUserDetails] = useState({
    flatNo: "",
    societyName: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  const [cartTotal] = useState(2999);
  const shipping = 0;
  const tax = 0;
  const total = cartTotal + shipping + tax;
  const URL = "https://luxora-backend-guh1.onrender.com"
  useEffect(() => {
    console.log("user", userDetails);

  }, [userDetails])
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    const isSaved = await saveAddressToDB();
    if (isSaved) {
      await handleCheckout();
    }
  };

  const saveAddressToDB = async () => {
    try {
      const res = await axios.post(
        `${URL}/api/user/addAddress`,
        {
          address: userDetails,
          userId: userId,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Address saved");
        return true;
      } else {
        toast.error(res.data.message);
        return false;
      }
    } catch (error) {
      toast.error("Failed to save address");
      return false;
    }
  };


  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const response = await axios.post(
        "https://luxora-backend-guh1.onrender.com/api/payments/create-checkout-session",
        {
          cartItems,
          userId,
        },
        { withCredentials: true }
      );

      const session = response.data;

      // Try Stripe's recommended method first
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      // If redirect fails (e.g., mobile in iframe), use fallback
      if (result?.error || window.innerWidth < 768) {
        console.warn("Redirect failed or mobile detected:", result?.error?.message);

        if (session.url) {
          window.location.assign(session.url); // mobile-safe
        } else {
          console.error("No session.url received for fallback.");
        }
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };




  useEffect(() => {
    console.log("cart", cartItems);
  }, [cartItems])
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-500">Complete your purchase securely</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Left Side */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Shipping Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="flatNo">Flat / House / Block No.</Label>
                  <Input
                    id="flatNo"
                    name="flatNo"
                    value={userDetails.flatNo}
                    onChange={handleChange}
                    placeholder="Enter flat/house/block number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="societyName">Society / Apartment Name</Label>
                  <Input
                    id="societyName"
                    name="societyName"
                    value={userDetails.societyName}
                    onChange={handleChange}
                    placeholder="Enter society/apartment name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={userDetails.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={userDetails.address}
                    onChange={handleChange}
                    placeholder="Enter area and landmark"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={userDetails.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="h-4 w-4 text-blue-500" />
                    <span>Fast delivery</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side */}
          <div className="lg:w-96">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center py-2 border-b"
                    >
                      <div>
                        <h4 className="font-medium">{item.productId.name}</h4>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">
                        ₹{item.productId.price * item.quantity}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">Your cart is empty</p>
                )}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{tax}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-blue-600">₹
                    {cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0) + shipping + tax}
                  </span>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full mt-6 flex items-center justify-center gap-2"
                  disabled={
                    !userDetails.flatNo ||
                    !userDetails.societyName ||
                    !userDetails.mobile ||
                    !userDetails.address ||
                    !userDetails.pincode
                  }
                >
                  <CreditCard className="h-5 w-5" />
                  Pay Now
                </Button>

                <div className="text-center text-xs text-gray-500 pt-4">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Shield className="h-3 w-3" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <p>Your payment is secure and encrypted</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
