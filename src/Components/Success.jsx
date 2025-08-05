// Success.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, User, Mail, CreditCard, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { toast } from 'sonner';
// ✅ UI Components (Inline for simplicity)
export const Card = ({ children, className = "", ...props }) => (
    <div className={`bg-white/60 backdrop-blur-md border border-gray-300 shadow-lg rounded-2xl p-6 ${className}`} {...props}>
        {children}
    </div>
);

export const CardHeader = ({ children, className = "", ...props }) => (
    <div className={`mb-4 ${className}`} {...props}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = "", ...props }) => (
    <h2 className={`text-2xl font-bold text-center ${className}`} {...props}>
        {children}
    </h2>
);

export const CardContent = ({ children, className = "", ...props }) => (
    <div className={`text-gray-700 ${className}`} {...props}>
        {children}
    </div>
);

export const Badge = ({ children, className = "", ...props }) => (
    <span
        className={`inline-block px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-full ${className}`}
        {...props}
    >
        {children}
    </span>
);

export const Button = ({ children, className = "", ...props }) => (
    <button
        className={`bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition flex items-center justify-center gap-2 ${className}`}
        {...props}
    >
        {children}
    </button>
);

// ✅ Main Component
const Success = () => {
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get('session_id');
    const [paymentData, setPaymentData] = useState(null);
    const navigate = useNavigate()
    const { setOrderData, ordersData } = useUser()
    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/payments/session/${session_id}`);
                setPaymentData(res.data);
            } catch (err) {
                console.error("Payment fetch error:", err);
            }
        };

        if (session_id) fetchPaymentData();
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            handelDownloadInvoice();
        }, 2000); // 2 seconds delay

        return () => clearTimeout(timer); // cleanup
    }, []);
    useEffect(() => {
        if (!paymentData) return;

        const sendOrder = async () => {
            try {
                const res = await axios.post("http://localhost:8081/api/order/saveorder", {
                    sessionId: session_id,
                    userId: paymentData.userId,
                    email: paymentData.session.customer_details.email,
                    name: paymentData.session.customer_details.name,
                    payments_status: paymentData.session.payment_status,
                    totalAmount: (paymentData.session.amount_total / 100).toFixed(2),
                    items: paymentData.lineItems.data.map(item => ({
                        name: item.description,
                        quantity: item.quantity,
                        amount: (item.amount_total / 100).toFixed(2)
                    }))
                });
                setOrderData({
                    sessionId: session_id,
                    userId: paymentData.userId,
                    email: paymentData.session.customer_details.email,
                    name: paymentData.session.customer_details.name,
                    payments_status: paymentData.session.payment_status,
                    totalAmount: (paymentData.session.amount_total / 100).toFixed(2),
                    items: paymentData.lineItems.data.map(item => ({
                        name: item.description,
                        quantity: item.quantity,
                        amount: (item.amount_total / 100).toFixed(2)
                    }))
                });

                if (res.data.success) {
                    navigate("/myorder")
                }
            } catch (err) {
                console.error("Error saving order:", err);
            }
        };

        sendOrder();
    }, [paymentData]);
    const handelDownloadInvoice = async () => {
        try {
            // PDF generate કરાવવી
            const res = await axios.post(
                "http://localhost:8081/api/pdf/generate-pdf",
                {
                    sessionId: session_id,
                    userId: paymentData.userId,
                    email: paymentData.session.customer_details.email,
                    name: paymentData.session.customer_details.name,
                    payments_status: paymentData.session.payment_status,
                    totalAmount: (paymentData.session.amount_total / 100).toFixed(2),
                    items: paymentData.lineItems.data.map(item => ({
                        name: item.description,
                        quantity: item.quantity,
                        amount: (item.amount_total / 100).toFixed(2)
                    }))
                },
                {
                    withCredentials: true
                }
            );

            if (res.data.success) {
                const pdfUrl = `http://localhost:8081/${res.data.pdfPath}`;
                window.open(pdfUrl, "_blank");
            } else {
                toast.error("Invoice generation failed");
            }
        } catch (error) {
            console.error("Open Invoice Error:", error);
            toast.error("Failed to open invoice");
        }
    };
    useEffect(() => {
        if (!paymentData) return;
        const timer = setTimeout(() => {
            handelDownloadInvoice();
        }, 2000); // 2 seconds delay

        return () => clearTimeout(timer); // cleanup
    }, [paymentData]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Soft background animations */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative z-10 max-w-3xl w-full">
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-green-500 rounded-full animate-bounce">
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <CardTitle>Payment Successful 🎉</CardTitle>
                        <p className="text-gray-500 mt-2">Your order has been placed successfully!</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {paymentData ? (
                            <>
                                {/* Customer & Payment Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card className="bg-white">
                                        <CardContent>
                                            <div className="flex items-center gap-3 mb-2">
                                                <User className="w-5 h-5 text-green-600" />
                                                <span className="font-semibold">Customer Details</span>
                                            </div>
                                            <p><strong>Name:</strong> {paymentData.session.customer_details.name}</p>
                                            <p className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-500" />
                                                {paymentData.session.customer_details.email}
                                            </p>
                                            <p><strong>User ID:</strong> {paymentData.userId}</p>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-white">
                                        <CardContent>
                                            <div className="flex items-center gap-3 mb-2">
                                                <CreditCard className="w-5 h-5 text-indigo-600" />
                                                <span className="font-semibold">Payment Info</span>
                                            </div>
                                            <p><strong>Status:</strong> <Badge>{paymentData.session.payment_status}</Badge></p>
                                            <p><strong>Total:</strong> ₹{(paymentData.session.amount_total / 100).toFixed(2)}</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Items Ordered */}
                                <Card className="bg-white">
                                    <CardContent>
                                        <div className="flex items-center gap-2 mb-2">
                                            <ShoppingBag className="w-5 h-5 text-purple-600" />
                                            <span className="font-semibold">Order Items</span>
                                        </div>
                                        <div className="space-y-3">
                                            {paymentData.lineItems.data.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:shadow transition-all"
                                                >
                                                    <span>{item.description}</span>
                                                    <div className="flex gap-4 items-center">
                                                        <Badge className="bg-blue-500">Qty: {item.quantity}</Badge>
                                                        <span className="font-semibold">₹{(item.amount_total / 100).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button onClick={() => window.location.href = '/'}>
                                        <ArrowLeft className="w-4 h-4" />
                                        Continue Shopping
                                    </Button>
                                    {/* <Button className="bg-black text-white border" >
                                        Print Receipt
                                    </Button> */}
                                    <Button onClick={() => navigate('/myorder')}>

                                        My Order
                                    </Button>
                                    <Button onClick={() => handelDownloadInvoice()}>

                                        Invoice
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                <p className="text-gray-500">Loading payment details...</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Success;
