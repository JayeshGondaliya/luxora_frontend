import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">ShopHub</h3>
                        <p className="text-primary-foreground/80">
                            Your one-stop destination for amazing products at unbeatable prices.
                            Shop with confidence and enjoy fast, reliable delivery.
                        </p>
                        <div className="flex space-x-3">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                                <button
                                    key={index}
                                    className="rounded-full p-2 hover:bg-primary-foreground/10 transition-colors"
                                >
                                    <Icon className="h-5 w-5 text-primary-foreground" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            {["About Us", "Contact", "FAQ", "Shipping Info", "Returns", "Privacy Policy"].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Categories</h4>
                        <ul className="space-y-2">
                            {["Electronics", "Fashion", "Home & Garden", "Sports", "Beauty", "Automotive"].map((category) => (
                                <li key={category}>
                                    <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                                        {category}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Stay Updated</h4>
                        <p className="text-primary-foreground/80">
                            Subscribe to get special offers, free giveaways, and exclusive deals.
                        </p>
                        <form className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                            />
                            <button
                                type="submit"
                                className="p-2 rounded-md bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-primary-foreground/80 text-sm">
                        © 2024 ShopHub. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((text) => (
                            <a
                                key={text}
                                href="#"
                                className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                            >
                                {text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
