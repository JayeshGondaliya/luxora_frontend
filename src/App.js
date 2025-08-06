import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Toaster } from 'sonner';
import Index from "./Components/Index";
import About from "./Components/About";
import Cart from "./Components/Cart";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProductDetails from "./Components/ProductDetails";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { UserProvider, useUser } from "./Context/UserContext";

import './index.css';
import { CheckCheck } from "lucide-react";
import Checkout from "./Components/CheckOut";
import ProductsPage from "./Components/ProductsPage";
import Success from "./Components/Success";
import Cancel from "./Components/Cancel";
import Myorder from "./Components/Myorder";

const queryClient = new QueryClient();

const AppContent = () => {
  const { userId, setUserId,loading } = useUser();




  return (
    <BrowserRouter>
      <Header />   
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/productsDetail/:productId/category/:category" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/productspage" element={<ProductsPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/myorder" element={<Myorder />} />
      </Routes>
      <Footer />
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <AppContent />
    </UserProvider>
  </QueryClientProvider>
);

export default App;
