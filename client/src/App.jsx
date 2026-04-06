import './App.css'
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import Footer from './Components/Footer';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OrdersPage from './Pages/Orders';

function App() {


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
