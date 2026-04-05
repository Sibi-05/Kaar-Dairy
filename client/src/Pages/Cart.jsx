import React, { useState, useEffect } from "react";
import "./Cart.css";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!token) {
      toast.info("Please login");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5006/api/customer/cart", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.log("Error fetching cart:", text);
        setLoading(false);
        return;
      }

      const data = await response.json();
      
      const cart = data ? data : [];
      setCartItems(cart);
    } catch (error) {
      console.log("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update cart in backend
  const updateCartBackend = async (updatedCart) => {
    try {
      const response = await fetch("http://localhost:5006/api/customer/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCart),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("Error updating cart:", data);
        return;
      }
      console.log("Cart updated successfully:", data.message);
    } catch (error) {
      console.log("Network error:", error);
    }
  };

  const handleIncrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCartItems(updatedCart);
    updateCartBackend(updatedCart);
  };

  const handleDecrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
        : item
    );
    setCartItems(updatedCart);
    updateCartBackend(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    updateCartBackend(updatedCart);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (loading) return <div>Loading cart...</div>;
  if (cartItems.length === 0) return <div className="empty">Your cart is empty !</div>;

  const handlePlaceOrder = async () => {
  if (!token) {
    toast.info("Please login first");
    return;
  }

  if (cartItems.length === 0) {
    toast.info("Cart is empty");
    return;
  }

  try {
    const response = await fetch("http://localhost:5006/api/customer/order", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, 
      },
    });

    let data;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
      console.log("Non JSON:", data);
    }

    if (!response.ok) {
      toast.error(data.message || "Order failed");
      return;
    }

    toast.success("Order placed successfully!");

    setCartItems([]);

  } catch (error) {
    console.log("Error:", error);
    toast.error("Something went wrong");
  }
};

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-card" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-img" />
            <div className="cart-info">
              <h2 className="itemName">{item.name}</h2>
              <p>Price: ₹{item.price}</p>
              <p className="quan">
                Quantity: 
                <div className="quan">
                <button className ="btn" onClick={() => handleDecrement(item.id)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.quantity || 1}</span>
                <button className ="btn" onClick={() => handleIncrement(item.id)}>+</button>
                </div>
              </p>
              <p>Subtotal: ₹{(item.price * (item.quantity || 1)).toFixed(2)}</p>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2>Total: ₹{totalAmount.toFixed(2)}</h2>

<button className="order-btn" onClick={handlePlaceOrder}>
  Place Order
</button>
    </div>
  );
};

export default Cart;