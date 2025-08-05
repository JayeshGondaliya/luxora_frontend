import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Toaster, toast } from 'sonner';

const Button = ({ className = "", children, ...props }) => (
    <button
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
        {...props}
    >
        {children}
    </button>
);

const Card = ({ className = "", children }) => (
    <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ className = "", children }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ className = "", children }) => (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h3>
);

const CardContent = ({ className = "", children }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Label = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none">
        {children}
    </label>
);

const Input = ({ className = "", ...props }) => (
    <input
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
        {...props}
    />
);

const Separator = () => <div className="h-px bg-border w-full my-6" />;

const Register = () => {
    const URL = "http://localhost:8081";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobilenumber: "",
        role: "user"
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [agreeTerms, setAgreeTerms] = useState(false);
    const registerApi = async () => {
        const { name, email, password, confirmPassword, mobilenumber, role } = formData;

        if (!agreeTerms) {
            alert("Please agree to the Terms of Service and Privacy Policy.");
            return;
        }

        if (!name || !email || !password || !confirmPassword || !mobilenumber) {
            alert("Please fill all the fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post(`${URL}/api/user/register`, {
                name,
                email,
                password,
                mobilenumber,
                role
            });

            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        LuxOra
                    </h1>
                    <CardTitle className="text-xl">Create Account</CardTitle>
                    <p className="text-muted-foreground">Join LuxOra today</p>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            className="mt-1"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="mt-1"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="mobilenumber">Mobile Number</Label>
                        <Input
                            id="mobilenumber"
                            name="mobilenumber"
                            placeholder="1234567890"
                            className="mt-1"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative mt-1">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="pr-10"
                                onChange={handleChange}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative mt-1">
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="pr-10"
                                onChange={handleChange}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <input
                        type="checkbox"
                        className="rounded mt-0.5"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                    />

                    <Button
                        onClick={registerApi}
                        className="w-full text-black border border-grey p-2 hover:bg-primary/90"
                    >
                        Create Account
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link to="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
