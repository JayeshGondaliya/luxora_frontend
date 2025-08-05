import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
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
const Cancel = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <Card className="w-full max-w-md text-center border-red-400 shadow-lg">
                <CardHeader>
                    <div className="flex justify-center text-red-500">
                        <AlertCircle size={48} />
                    </div>
                    <CardTitle className="text-2xl font-bold mt-2">Payment Cancelled</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">Your payment was not completed. You can try again or return to the homepage.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Button variant="destructive" onClick={() => navigate('/')}>
                            Go to Home
                        </Button>
                        <Button onClick={() => navigate('/cart')}>
                            Retry Payment
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Cancel;  
