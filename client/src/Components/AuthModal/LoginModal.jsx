import React, { useState } from "react";
import "./LoginModal.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginModal = ({ isOpen, onClose, onLogin  }) => {
  const [isLogin, setIsLogin] = useState(true); 

  const navigate = useNavigate();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [phone,setPhone]=useState("");

  if (!isOpen) return null;

  const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:5006/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    let data;

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      console.log(data);
      return;
    }

    // ✅ success
    toast.success("Login Successfull!")
    console.log("Login success:", data);
    onLogin(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    onClose();

  } catch (error) {
    console.log("Error:", error);
  }
};
const handleRegister = async () => {
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const response = await fetch("http://localhost:5006/api/auth/register", {
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
      console.log("Non-JSON response:", data);
    }

    if (!response.ok) {
      toast.error(data.message || data || "Register failed");
      return;
    }

    toast.success("Account created successfully!");
    setIsLogin(true);
    setName(""); setEmail(""); setPassword(""); setConfirmPassword(""); setPhone("");

  } catch (error) {
    console.log("Error:", error);
    toast.error("Something went wrong. Try again!");
  }
};



  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        {/* Show name only in signup */}
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

{/* Password */}
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
        

        <button className="login-btn" onClick={isLogin ? handleLogin : handleRegister}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* Toggle text */}
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