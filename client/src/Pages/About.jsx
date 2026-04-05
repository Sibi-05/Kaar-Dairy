import React from "react";
import "./About.css";
import farmImg from "../assets/farm.jpg";
import cowImg from "../assets/cow.png";
import milkImg from "../assets/Images/dairy.jpg";

const About = () => {
  return (
    <div className="about-container">

      <div className="about-hero">
        <h1>Kaar Dairy</h1>
        <p>Pure • Fresh • Organic</p>
      </div>

      <div className="about-section">
        <img src={farmImg} alt="Organic Farm" />
        <div>
          <h2>Our Story</h2>
          <p>
            Kaar Dairy is built on the foundation of organic farming and natural living.
            We believe in delivering fresh and chemical-free dairy products directly 
            from our farms to your home. Our journey started with a mission to bring 
            back the traditional and healthy way of dairy production.
          </p>
        </div>
      </div>


      <div className="about-section reverse">
        <img src={cowImg} alt="Healthy Cows" />
        <div>
          <h2>Healthy & Happy Cows</h2>
          <p>
            Our cows are raised in a natural environment with organic feed and proper care.
            We ensure they are stress-free and healthy, which directly impacts the quality 
            of milk. No hormones, no chemicals — just pure natural goodness.
          </p>
        </div>
      </div>

      <div className="about-section">
        <img src={milkImg} alt="Fresh Milk" />
        <div>
          <h2>Fresh & Pure Products</h2>
          <p>
            From fresh milk to butter, curd, and yogurt, every product is processed 
            with strict hygiene and quality standards. We ensure farm-to-home delivery 
            so that you get the freshest dairy products every day.
          </p>
        </div>
      </div>


      <div className="about-footer">
        <h2>Why Choose Kaar Dairy?</h2>
        <ul>
          <li>100% Organic Farming</li>
          <li>No Preservatives or Chemicals</li>
          <li>Farm Fresh Delivery</li>
          <li>Healthy & Ethical Practices</li>
        </ul>
      </div>

    </div>
  );
};

export default About;