import React from 'react';
import './Home.css';
import milk from '../assets/Images/milk.png';
import curd from "../assets/Images/curd.png";
import yogurt from '../assets/Images/yogurt.png';
import butter from '../assets/Images/butter.png';
import icecream from '../assets/Images/icecream.png';
import Banner from '../Components/Banner';
import amilk from '../assets/Images/amilk.png';
import dairy from "../assets/Images/dairy.jpg";

const Home = () => {
  const products = [milk, curd, butter, yogurt, icecream];

  return (
    <div>
        <Banner />
      <div className='front'>
        <div className='front-content'>
    <h1>Kaar Dairy</h1>
    <p className='tagline'>Pure & Organic Dairy Products</p>
    <p className='desc'>
      Fresh milk, butter, and dairy products directly from our farm to your home. 
      We ensure natural, chemical-free, and healthy production for your family.
    </p>
  </div>
  <img src={dairy} alt="dairy farm" className="front-img" />
</div>

    <div className='about-milk'>
      <img src={amilk} className='milk-image'></img>
      <div>
        <h1>About Your Milk</h1>
        <p>Milk is a nutrient-rich beverage, widely consumed for its high calcium content essential for bone health. It is a source of protein, vitamins, and minerals, contributing to overall well-being. Varieties include cow's milk, known for its widespread availability, and alternatives like almond or soy milk for those with dietary preferences or lactose intolerance. Milk's versatility extends to culinary uses, featuring prominently in recipes from creamy desserts to savory dishes, showcasing its cultural and nutritional significance in various global cuisines.</p>
      </div>
    </div>
    <div className='prd'>
      <h1 className='shop-title'>Our Products</h1>
    <div className="products">
      {products.map((img, index) => (
        <div className="item" key={index}>
          <img src={img} alt={`product-${index}`} />
        </div>
      ))}
    </div>
    </div>
    
    </div>
  );
}

export default Home;