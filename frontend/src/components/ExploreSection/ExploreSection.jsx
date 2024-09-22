import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

function ExploreSection({ direction, hashtags, description, image, title }) {
  const navigate = useNavigate();
  const flexDirection = direction || "flex-row";

  const handleClick = (link) => {
    navigate(link);
  };
  return (
    <div className="flex flex-col pl-[10%] pr-[10%] pt-[3%]">
      <div
        className={`top-section flex flex-col-reverse sm:flex-nowrap justify-center items-center gap-6 ${
          flexDirection === "flex-row-reverse" ? "sm:flex-row-reverse" : "sm:flex-row"
        }`}
      >
        <div className="flex flex-col gap-7 w-[100%] sm:w-[50%]">
          <h1 className="font-medium text-2xl lg:text-4xl">{title}</h1>
          <p className="font-normal text-base text-slate">{description}</p>
          <div className="hashtags-container flex flex-wrap flex-row gap-2">
            {hashtags.map((hashtag, index) => (
              <div
                className="bg-[#B4B0BE33] rounded-[70px] pt-1 pb-1 pl-3 pr-3 flex items-center justify-center"
                key={index}
              >
                # {hashtag}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <CustomButton onClick={() => handleClick("/products")} className="explore-shop-button">
              Shop
            </CustomButton>
            <CustomButton
              className="explore-more-button text-center sm:text-left"
              onClick={() => handleClick("/products")}
            >
              Explore More →
            </CustomButton>
          </div>
        </div>
        <div
          className={`flex w-full sm:w-[50%] ${
            flexDirection === "flex-row-reverse" ? "justify-start" : "justify-end"
          }`}
        >
          <img src={image} />
        </div>
      </div>
    </div>
  );
}

export default ExploreSection;
