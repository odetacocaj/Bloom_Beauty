import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import "./ProductSlider.scss";
import roseLeft from "../../assets/images/roseLeft.svg";
import roseRight from "../../assets/images/roseRight.svg";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import CustomButton from "../CustomButton/CustomButton.jsx";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ProductSlider = ({ products = [], title, link }) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
  const isPhone = useMediaQuery("(max-width: 767px)");

  const productsPerSlide = isPhone ? 1 : isTablet ? 3 : 4;
  const totalProducts = isPhone ? 4 : isTablet ? 9 : 12;

  const totalSlides = Math.ceil(Math.min(products?.length, totalProducts) / productsPerSlide);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item added to cart!", {
      position: "bottom-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const getCurrentProducts = () => {
    const start = currentIndex * productsPerSlide;
    return products.slice(start, start + productsPerSlide);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [products, productsPerSlide]);

  return (
    <div className="product-carousel pt-20">
      <div className="flex flex-col justify-center">
        <div className="flex flex-row items-center gap-2 justify-center">
          <img src={roseLeft} alt="left rose" />
          <h1 className="font-bold uppercase text-2xl">{title}</h1>
          <img src={roseRight} alt="right rose" />
        </div>
        <div className="flex justify-center">
          <Link to={link} className="text-[#697586] font-normal text-lg pt-2 pb-5">
            See All
          </Link>
        </div>
      </div>

      <div className="carousel-container flex flex-row">
        <button className="carousel-arrow prev" onClick={handlePrev} disabled={currentIndex === 0}>
          &#9664;
        </button>
        <div className="product-cards justify-around flex pl-[10%] pr-[10%] flex-row gap-5">
          {getCurrentProducts().map((product, index) => (
            <div
              key={index}
              className="product-card flex flex-col justify-center items-center bg-white gap-3"
            >
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="self-start font-medium text-base">{product.name}</h3>
              <div className="rating self-start flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} color={i < product.rating ? "#3A3A3A" : "#e4e5e9"} />
                ))}
                <span className="ml-2 text-[#697586]">({product.numReviews})</span>
              </div>
              <p className="self-start text-left text-[#697586]">{product.brand}</p>
              <p className="font-[400] text-base self-start">${product.price}</p>

              <CustomButton
                className="add-to-cart-btn mt-4 px-4 py-2 w-full bg-white text-black rounded font-medium hover:bg-black hover:text-white"
                onClick={() => {
                  handleAddToCart(product);
                }}
              >
                Add to Cart
              </CustomButton>
            </div>
          ))}
        </div>

        <CustomButton
          className="carousel-arrow next"
          onClick={handleNext}
          disabled={currentIndex === totalSlides - 1}
        >
          &#9654;
        </CustomButton>
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
