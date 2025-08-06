import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// 1. Context create karo
const UserContext = createContext();

// 2. Provider export karo
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
      const [cartItems, setCartItems] = useState([]); 
      const [ordersData,setOrdersData ] = useState([]); 
          const [products, setProducts] = useState([]);
          const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   // Reload pachi localStorage mathi userId mukvani
  //   const storedUserId = localStorage.getItem("userId");
  //   if (storedUserId) {
  //     setUserId(storedUserId);
  //   }
  // }, []);
   useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("https://luxora-backend-guh1.onrender.com/api/user/get-user", {
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
        setLoading(false); // loading false always in finally
      }
    };

    checkUser();
}, [setLoading,setUserId]);
   useEffect(() => {

        const fetchProducts = async () => {
            try {
                const res = await axios.get("https://luxora-backend-guh1.onrender.com/api/product/getProductAll", {
                    withCredentials: true,
                });
                setProducts(res.data.data || []);
                console.log(res.data.data);
                
            } catch (err) {
                console.error("Error fetching products:", err.message);
            } finally {
                setLoading(false);
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
        <UserContext.Provider value={{ userId, setUserId ,cartItems, setCartItems ,products,setProducts,ordersData,setOrdersData,loading,setLoading}}>
            {children}
        </UserContext.Provider>
    );
};

// 3. Custom hook for easy access
export const useUser = () => useContext(UserContext);
