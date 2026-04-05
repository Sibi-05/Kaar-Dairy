import React, { useEffect, useState } from "react";
import banner1 from "../assets/Images/banner.jpg";
import banner2 from "../assets/Images/banner2.jpg";
import banner3 from "../assets/Images/banner3.jpg";
import "./Banner.css";

const Banner = () => {
  const banners = [banner1, banner2, banner3];
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="banner-container">
      {banners.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`banner-${index}`}
          className={`banner-slide ${index === current ? "active" : ""}`}
        />
      ))}

     
      <div className="banner-dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active-dot" : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;