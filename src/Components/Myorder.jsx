import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../Context/UserContext';
import {
    CalendarDays,
    CreditCard,
    Package,
    ShoppingBag,
    User,
    Mail,
    IndianRupee,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const { userId } = useUser();

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/api/order/getorder/${userId}`, {
                withCredentials: true
            });
            setOrders(res.data.data || []);
            setTotalOrders(res.data.totalOrders || 0);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    const toggleOrder = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10 p-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-6 h-6 text-blue-600" />
                        <h1 className="text-xl font-semibold">My Orders</h1>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        <span>{totalOrders}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto p-4">
                {orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-6 text-center mt-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <Package className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-semibold mb-2">No orders yet</h2>
                        <p className="text-gray-500">Your orders will appear here once you make a purchase.</p>
                    </div>
                ) : (
                    <div className="space-y-3 mt-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                {/* Order Summary - Always Visible */}
                                <div
                                    className="p-4 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleOrder(order._id)}
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Package className="w-5 h-5 text-blue-500" />
                                            <span className="font-medium">Order #{order._id.slice(-6).toUpperCase()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <CalendarDays className="w-4 h-4" />
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs px-2 py-1 rounded-full ${order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                                            order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {order.paymentStatus}
                                        </span>
                                        {expandedOrder === order._id ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </div>

                                {/* Order Details - Collapsible */}
                                {expandedOrder === order._id && (
                                    <div className="border-t border-gray-200 p-4 animate-slideDown">
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <User className="w-4 h-4 text-blue-500" />
                                                    <div>
                                                        <p className="text-gray-500 text-xs">Customer</p>
                                                        <p>{order.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Mail className="w-4 h-4 text-blue-500" />
                                                    <div>
                                                        <p className="text-gray-500 text-xs">Email</p>
                                                        <p className="truncate">{order.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CreditCard className="w-4 h-4 text-blue-500" />
                                                    <div>
                                                        <p className="text-gray-500 text-xs">Payment</p>
                                                        <p className="capitalize">{order.paymentStatus}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <IndianRupee className="w-4 h-4 text-blue-500" />
                                                    <div>
                                                        <p className="text-gray-500 text-xs">Total</p>
                                                        <p className="font-semibold">₹{order.totalAmount.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="mt-4">
                                            <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
                                                <Package className="w-4 h-4 text-blue-500" />
                                                Items ({order.items?.length})
                                            </h3>
                                            <div className="space-y-3">
                                                {order.items?.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                        <div>
                                                            <p className="text-sm font-medium">{item.name}</p>
                                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-semibold">₹{item.amount.toLocaleString()}</p>
                                                            <p className="text-xs text-gray-500">
                                                                ₹{(item.amount / item.quantity).toLocaleString()} each
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrder;