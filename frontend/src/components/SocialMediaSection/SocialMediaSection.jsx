import { InstagramPosts } from "../../assets/dummy_data/InstagramPosts";
import roseLeft from "../../assets/images/roseLeft.svg";
import roseRight from "../../assets/images/roseRight.svg";
import "./SocialMediaSection.scss";
import CustomButton from "../CustomButton/CustomButton";
import InstagramIcon from "../../assets/images/InstagramWhite.svg";
function SocialMediaSection() {
  const handleClick = () => {
    window.location.href = "https://www.instagram.com";
  };
  return (
    <div>
      <div className="flex flex-row items-center gap-2 justify-center pl-5 pr-5 sm:pl-0 sm:pr-0">
        <img src={roseLeft} alt="roseLeft" />
        <h1 className="font-bold uppercase text-2xl text-center md:text-left">
          Share how you blossomed with <span className="text-pinkMedium">#bloombeauty</span>
        </h1>
        <img src={roseRight} alt="roseRight" />
      </div>

      <div className="grid-container">
        {InstagramPosts.map((post, index) => (
          <div className="grid-item" key={index}>
            <img className="insta-posts" src={post.image} alt={`Instagram Post ${index + 1}`} />
            <div className="overlay flex flex-row">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="overlay-button flex flex-row gap-2 items-center"
              >
                Open in <img src={InstagramIcon} />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-[3%] pb-[5%]">
        <CustomButton
          className={
            "explore-shop-button w-[275px] flex flex-row gap-2 items-center justify-center"
          }
          onClick={() => handleClick()}
        >
          Follow Us <img src={InstagramIcon} />
        </CustomButton>
      </div>
    </div>
  );
}

export default SocialMediaSection;
