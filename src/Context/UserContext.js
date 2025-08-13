import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Separate loading states
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

    const URL = "https://luxora-backend-guh1.onrender.com";
  // Combined loading state
  

  // Check user session from backend
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(`${URL}/api/user/get-user`, {
          withCredentials: true,
        });
        if (res.data.userId) {
          setUserId(res.data.userId);
        } else {
          setUserId(null);
        }
      } catch (err) {
        setUserId(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await axios.get("https://luxora-backend-guh1.onrender.com/api/product/getProductAll", {
        // const res = await axios.get(`${URL}/api/product/getProductAll`, {
        const res = await axios.get(`${URL}/api/product/getProductAll`, {
          withCredentials: true,
        });
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        cartItems,
        setCartItems,
        products,
        setProducts,
        ordersData,
        setOrdersData,
        loading,setLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
