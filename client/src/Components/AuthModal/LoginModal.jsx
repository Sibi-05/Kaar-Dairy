import React, { useState } from "react";
import "./LoginModal.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginModal = ({ isOpen, onClose, onLogin  }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [phone,setPhone]=useState("");

  if (!isOpen) return null;

  const handleLogin = async () => {
  if (!email || !password) {
    toast.warning("Please fill all fields");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("https://kaar-dairy.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let data;
    const contentType = response.headers.get("content-type");

    data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      toast.warning(data.message || "Login failed");
      return;
    }

    toast.success("Login Successful!");
    onLogin(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    onClose();
  } catch (error) {

    toast.error("Something went wrong");
  } finally {
    setLoading(false); 
  }
};
const handleRegister = async () => {
  if (!name || !email || !password || !confirmPassword || !phone) {
    toast.warning("Please fill all fields");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Enter a valid email");
    return;
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    toast.error("Enter valid 10-digit phone number");
    return;
  }


  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }


  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }
   setLoading(true);
  try {
    const response = await fetch("https://kaar-dairy.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone }),
    });

    let data;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      toast.error(data.message || data || "Register failed");
      return;
    }

    
    toast.success("Account created successfully!");
    setIsLogin(true);


    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
  } catch (error) {
    console.log("Error:", error);
    toast.error("Something went wrong. Try again!");
  }
  finally{
    setLoading(false);
  }
};



  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        <h2>{isLogin ? "Login" : "Create Account"}</h2>


        {!isLogin && (
  <input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
)}

        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>


<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

        {!isLogin && (
          <input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>
        )}
        {!isLogin && (
          <input type="text" placeholder="+91 9870X XXXXX" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        )}
        

        <button
  className="login-btn"
  onClick={isLogin ? handleLogin : handleRegister}
  style={{ cursor: loading ? "not-allowed" : "pointer" }}
  disabled={loading}
>
  {loading
    ? "Please wait..."
    : isLogin
    ? "Login"
    : "Sign Up"}
</button>

       
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>

        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default LoginModal;