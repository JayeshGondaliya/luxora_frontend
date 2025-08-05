import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// --- Local UI Components ---
const Button = ({ children, className = "", variant = "default", ...props }) => {
    const base = "px-4 py-2 rounded font-medium transition";
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    };
    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

const Card = ({ children, className = "" }) => (
    <div className={`border rounded-lg bg-white shadow-sm ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
    <div className="border-b px-6 py-4">
        {children}
    </div>
);

const CardTitle = ({ children }) => (
    <h2 className="text-xl font-semibold">{children}</h2>
);

const CardContent = ({ children, className = "" }) => (
    <div className={className}>{children}</div>
);

const Label = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block mb-1 font-medium text-sm text-gray-700">
        {children}
    </label>
);

const Input = ({ id, ...props }) => (
    <input
        id={id}
        className="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-200"
        {...props}
    />
);

const Textarea = ({ id, rows = 4, ...props }) => (
    <textarea
        id={id}
        rows={rows}
        className="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-200"
        {...props}
    />
);

// --- Contact Page ---
const Contact = () => {
    const contactInfo = [
        {
            icon: MapPin,
            title: "Address",
            details: ["123 ShopHub Street", "Commerce City, CC 12345"]
        },
        {
            icon: Phone,
            title: "Phone",
            details: ["+1 (555) 123-4567", "+1 (555) 987-6543"]
        },
        {
            icon: Mail,
            title: "Email",
            details: ["support@shophub.com", "sales@shophub.com"]
        },
        {
            icon: Clock,
            title: "Hours",
            details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat-Sun: 10:00 AM - 4:00 PM"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-blue-600">Contact Us</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                            </div>
                            <div>
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="How can we help you?" />
                            </div>
                            <div>
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Tell us more about your inquiry..." />
                            </div>
                            <Button className="w-full">Send Message</Button>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                            <p className="text-gray-600 mb-8">
                                Have questions about our products or need help with your order?
                                Our friendly customer support team is here to help.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {contactInfo.map((info, index) => (
                                <Card key={index}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="p-2 rounded-lg bg-blue-100">
                                                <info.icon className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">{info.title}</h3>
                                                {info.details.map((detail, i) => (
                                                    <p key={i} className="text-gray-600">{detail}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-2">Customer Support</h3>
                                <p className="text-gray-600 mb-4">
                                    Need immediate assistance? Our support team is available 24/7
                                    to help with any questions or concerns.
                                </p>
                                <Button variant="outline" className="w-full">
                                    Start Live Chat
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
