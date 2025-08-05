import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Shield, Users, Award, Truck } from "lucide-react";

// ✅ Reusable Button component
const Button = ({ children, className = "", onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition ${className}`}
        >
            {children}
        </button>
    );
};

// ✅ Reusable Card components
const Card = ({ children, className = "" }) => {
    return (
        <div className={`rounded-xl bg-white p-6 shadow-sm ${className}`}>
            {children}
        </div>
    );
};

const CardHeader = ({ children }) => (
    <div className="mb-4">{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children }) => (
    <div className="text-sm text-gray-600">{children}</div>
);

const About = () => {
    const features = [
        {
            icon: Shield,
            title: "Secure Shopping",
            description:
                "Your data and transactions are protected with enterprise-grade security.",
        },
        {
            icon: Users,
            title: "Customer First",
            description:
                "We prioritize customer satisfaction with 24/7 support and easy returns.",
        },
        {
            icon: Award,
            title: "Quality Products",
            description:
                "Curated selection of high-quality products from trusted brands.",
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            description:
                "Quick and reliable delivery to your doorstep with real-time tracking.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        About ShopHub
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your trusted partner for online shopping. We bring you the best
                        products at competitive prices with exceptional customer service.
                    </p>
                </div>

                {/* Story Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                        <p className="text-gray-600 mb-4">
                            Founded in 2020, ShopHub started with a simple mission: to make
                            online shopping easier, safer, and more enjoyable for everyone.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Today, we serve millions of customers worldwide, offering
                            everything from electronics and fashion to home goods and beyond.
                        </p>
                        <Button className="mt-4">Learn More</Button>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-2">10M+</div>
                            <div className="text-gray-600">Happy Customers</div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="text-center hover:shadow-lg transition-all duration-300"
                        >
                            <CardHeader>
                                <div className="mx-auto mb-4 p-3 rounded-full bg-purple-100 w-fit">
                                    <feature.icon className="h-6 w-6 text-purple-600" />
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
