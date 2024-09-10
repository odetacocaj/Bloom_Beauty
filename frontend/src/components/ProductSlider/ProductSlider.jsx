import { useState, useEffect } from "react";
import "./ProductSlider.scss";
import roseLeft from "../../assets/images/roseLeft.svg";
import roseRight from "../../assets/images/roseRight.svg";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductSlider = ({ products = [], title, link }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerSlide = 4;

  const totalSlides = Math.ceil(Math.min(products?.length, 12) / productsPerSlide);


  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const getCurrentProducts = () => {
    if (!Array.isArray(products)) return []; 
    const start = currentIndex * productsPerSlide;
    return products.slice(start, start + productsPerSlide);
  };
  useEffect(() => {
   
    setCurrentIndex(0);
  }, [products]);

  return (
    <div className="product-carousel pt-20">
      <div className="flex flex-col justify-center">
        <div className="flex flex-row items-center gap-2 justify-center">
          <img src={roseLeft} />
          <h1 className="font-bold uppercase text-2xl">{title}</h1>
          <img src={roseRight} />
        </div>
        <div className="flex justify-center">
          <Link to={link} className="text-[#697586] font-normal text-lg">
            See All
          </Link>
        </div>
      </div>
      <div className="carousel-container flex flex-row">
        <button className="carousel-arrow prev" onClick={handlePrev} disabled={currentIndex === 0}>
          &#9664;
        </button>
        <div className="product-cards justify-around flex pl-[10%] pr-[10%] flex-row gap-4">
          {getCurrentProducts().map((product, index) => (
            <div
              key={index}
              className="product-card flex flex-col justify-center items-center bg-white"
            >
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="font-semibold">{product.price}</p>
              <div className="rating flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} color={i < product.rating ? "#3A3A3A" : "#e4e5e9"} />
                ))}
                <span className="ml-2">({product.numReviews})</span>
              </div>
              <button className="add-to-cart-btn mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <button
          className="carousel-arrow next"
          onClick={handleNext}
          disabled={currentIndex === totalSlides - 1}
        >
          &#9654;
        </button>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
