import React from "react";
import {
    Smartphone,
    Headphones,
    Watch,
    Laptop,
    Gamepad2,
    Camera,
} from "lucide-react";

// Card component
const Card = ({ className, children, style }) => {
    return (
        <div
            className={`rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-gray-200 dark:border-zinc-700 ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

// CardContent component
const CardContent = ({ className, children }) => {
    return <div className={className}>{children}</div>;
};

const categories = [
    {
        id: "electronics",
        name: "Electronics",
        icon: Smartphone,
        color: "from-blue-500 to-cyan-500",
        products: "2,341",
    },
    {
        id: "audio",
        name: "Audio & Music",
        icon: Headphones,
        color: "from-purple-500 to-pink-500",
        products: "1,876",
    },
    {
        id: "wearables",
        name: "Wearables",
        icon: Watch,
        color: "from-green-500 to-emerald-500",
        products: "987",
    },
    {
        id: "computing",
        name: "Computing",
        icon: Laptop,
        color: "from-orange-500 to-red-500",
        products: "1,543",
    },
    {
        id: "gaming",
        name: "Gaming",
        icon: Gamepad2,
        color: "from-indigo-500 to-purple-500",
        products: "2,098",
    },
    {
        id: "photography",
        name: "Photography",
        icon: Camera,
        color: "from-teal-500 to-blue-500",
        products: "756",
    },
];

const FeaturedCategories = () => {
    return (
        <section className="py-16 bg-muted/30 dark:bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
                    <p className="text-lg text-muted-foreground dark:text-zinc-400">
                        Browse our extensive collection of products across different
                        categories
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <Card
                                key={category.id}
                                className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border-0 bg-card overflow-hidden animate-slide-up`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <CardContent className="p-6 text-center space-y-4">
                                    <div
                                        className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <IconComponent className="h-8 w-8 text-white" />
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors dark:text-white">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground dark:text-zinc-400">
                                            {category.products} products
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
