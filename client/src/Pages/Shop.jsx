
import "./Shop.css";
import milk1 from "../assets/Products_Image/milk1.png";
import milk2 from "../assets/Products_Image/milk2.png";
import curd1 from "../assets/Products_Image/curd1.png";
import yogurt from "../assets/Products_Image/yogurt.png";
import ice1 from "../assets/Products_Image/ice1.png";
import butter1 from "../assets/Products_Image/butter1.png";
import { useState } from "react";

import { toast } from "react-toastify";

const products = [
  {
    id: 1,
    name: "Fresh Milk",
    price: 50,
    image: milk2
  },
  {
    id: 2,
    name: "Amul Milk",
    price: 200,
    image: milk1
  },
  {
    id: 3,
    name: "Curd",
    price: 60,
    image: curd1
  },
  {
    id: 4,
    name: "Yogurt",
    price: 100,
    image: yogurt
  },
  {
    id: 5,
    name: "Butter",
    price: 120,
    image: butter1
  },
  {
    id: 6,
    name: "Ice Cream",
    price: 30,
    image: ice1
  },
];

const Shop = () => {
  const [cart, setCart] = useState([]);

  const handleAdd = async (product) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login");
    return;
  }

  try {

    const fetchResponse = await fetch("http://localhost:5006/api/customer/cart", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
   
    if (!fetchResponse.ok) {
      const text = await fetchResponse.text();
      console.log("Error fetching cart:", text);
      return;
    }

    const data = await fetchResponse.json();
    
    const currentCart = data ? data: [];
    console.log(currentCart);
    const existingProduct = currentCart.find((p) => p.id === product.id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = currentCart.map((p) =>
        p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart); 

    const updateResponse = await fetch("http://localhost:5006/api/customer/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCart),
    });

    const updateData = await updateResponse.json();
    if (!updateResponse.ok) {
      console.log("Error updating cart:", updateData);
      toast.error(updateData.message || "Failed to update cart");
      return;
    }
    toast.success("Item Added!");
  } catch (error) {
    console.log("Network error:", error);
    toast.error("something went wrong");
  }
};

  return (
    <div className="shop-container">
      <h1 className="shop-title">Our Products</h1>

      <div className="product-grid">
        {products.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.name} className="product-img" />

            <h2>{item.name}</h2>
            <p className="price">₹{item.price}</p>

            <button onClick={() => handleAdd(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
