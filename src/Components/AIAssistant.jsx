import React, { useState, useRef, useEffect, forwardRef } from "react";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";
import axios from "axios";

// Custom Button
const Button = ({
    children,
    onClick,
    className = "",
    variant = "default",
    size = "base",
    ...props
}) => {
    const variants = {
        default: "bg-black text-white hover:bg-gray-800",
        outline: "border border-gray-300 text-black hover:bg-gray-100",
        ghost: "text-white hover:bg-gray-800",
    };

    const sizes = {
        base: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
        icon: "p-2",
    };

    return (
        <button
            onClick={onClick}
            {...props}
            className={`rounded-xl transition duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
};

// Forwarded Input
export const Input = forwardRef(({ className = "", disabled, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={`border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            disabled={disabled}
            {...props}
        />
    );
});

// Forwarded ScrollArea
export const ScrollArea = forwardRef(({ children, className = "" }, ref) => {
    return (
        <div
            ref={ref}
            className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 ${className}`}
            style={{ maxHeight: "100%", height: "100%" }}
        >
            {children}
        </div>
    );
});

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const URL = "https://luxora-backend-guh1.onrender.com";
    const [messages, setMessages] = useState([
        {
            id: "1",
            content: "Hello! I'm your AI assistant. How can I help you today?",
            role: "assistant",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const scrollAreaRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, isMinimized]);

    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
            id: Date.now().toString(),
            content: inputValue,
            role: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8081/api/assistant/chat", {
                userMessage: inputValue,
                history: messages,
            });

            const data = response.data;
            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                content: data.reply || "Sorry, I encountered an error. Please try again.",
                role: "assistant",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    content: "Sorry, I'm having trouble connecting right now. Please try again later.",
                    role: "assistant",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Floating open button
    if (!isOpen) {
        return (
            <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-black flex items-center justify-center"
                    size="icon"
                    aria-label="Open AI Assistant"
                >
                    <MessageCircle className="h-6 w-6 text-white" />
                </Button>
            </div>
        );
    }

    // Chat window responsive
    return (
        <div
            className={`
                fixed bottom-0 left-0 right-0 h-[80vh] flex flex-col rounded-t-lg shadow-lg overflow-hidden bg-black text-white border border-gray-700 z-50
                sm:bottom-6 sm:right-6 sm:left-auto sm:w-96 sm:h-[500px] sm:rounded-lg
            `}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700 bg-black text-white">
                <div className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-white" />
                    <h3 className="font-semibold">AI Assistant</h3>
                </div>
                <div className="flex space-x-1">
                    {/* <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMinimized(!isMinimized)}
                        aria-label={isMinimized ? "Maximize assistant" : "Minimize assistant"}
                    >
                        <Minimize2 className="h-4 w-4 text-white" />
                    </Button> */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close assistant"
                    >
                        <X className="h-4 w-4 text-white" />
                    </Button>
                </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
                <>
                    <ScrollArea ref={scrollAreaRef} className="flex-1 p-3 sm:p-4 bg-black">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-lg ${message.role === "user"
                                            ? "bg-gray-900 text-white border border-gray-700"
                                            : "bg-gray-800 text-white border border-gray-700"
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <span className="text-xs opacity-70 mt-1 block">
                                            {message.timestamp.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800 text-white p-3 rounded-lg">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                            <div
                                                className="w-2 h-2 bg-white rounded-full animate-bounce"
                                                style={{ animationDelay: "0.1s" }}
                                            ></div>
                                            <div
                                                className="w-2 h-2 bg-white rounded-full animate-bounce"
                                                style={{ animationDelay: "0.2s" }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Input */}
                    <div className="p-3 sm:p-4 border-t border-gray-700 bg-black">
                        <div className="flex space-x-2">
                            <Input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message..."
                                disabled={isLoading}
                                className="w-full"
                            />
                            <Button
                                onClick={sendMessage}
                                disabled={!inputValue.trim() || isLoading}
                                size="icon"
                                className="bg-gray-800 hover:bg-gray-700"
                            >
                                <Send className="h-4 w-4 text-white" />
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AIAssistant;
