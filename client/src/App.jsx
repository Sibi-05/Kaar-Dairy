import './App.css'
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import Footer from './Components/Footer';
import { useEffect } from 'react';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OrdersPage from './Pages/Orders';

function App() {

  useEffect(() => {
    const sendVisit = async () => {
      try {
        const username = localStorage.getItem("user") || "Guest";

        const indianTime = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
        const data = {
          username,
          visitTime: indianTime,
        };

        const res = await fetch("https://kaar-dairy.onrender.com/api/visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        console.log("Visit stored:", result);

      } catch (err) {
        console.error("Error sending visit:", err);
      }
    };

    sendVisit();
  }, []);


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/orders" element={<OrdersPage/>} />
      </Routes>
      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </>
  )
}

export default App;
