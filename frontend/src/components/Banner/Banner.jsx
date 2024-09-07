import "./Banner.scss";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
const Banner = ({ title, subtitle, backgroundImage }) => {
  return (
    <div
      className="banner h-[300px] md:h-[300px] lg:h-[463px] bg-cover xl:bg-contain bg-center md:bg-right"
      style={{ backgroundColor: "#F5E0E5", backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="banner-content flex flex-col gap-3 lg:gap-5 items-start">
        <h1 className="banner-title uppercase font-bold text-sm md:text-base lg:text-2xl  xl:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="banner-subtitle font-normal text-sm xl:text-2xl">{subtitle}</p>}
        <Link to="/shop">
          <CustomButton className="banner-button mt-4 p-[10px] rounded w-40 lg:w-60 text-white text-xs lg:text-sm font-semibold bg-pinkMedium">
            Shop Now
          </CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
