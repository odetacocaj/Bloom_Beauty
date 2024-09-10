import "./Footer.scss";
import { Link } from "react-router-dom";
import FacebookIcon from "../../assets/images/facebook.svg";
import InstagramIcon from "../../assets/images/instagram.svg";
import PinterestIcon from "../../assets/images/pinterest.svg";
import TelegramIcon from "../../assets/images/telegram.svg";
import TwitterIcon from "../../assets/images/twitter.svg";
import LogoDark from "../../assets/images/logoDark.svg";
import Phone from "../../assets/images/footerCall.svg";
import LocationPin from "../../assets/images/footerLocation.svg";
import MessageIcon from "../../assets/images/footerMessage.svg";
import { Divider } from "@mui/material";
const Footer = () => {
  return (
    <>
      <footer className="footer bg-[#252525] text-white py-8 px-4 flex flex-col ">
        <div className="flex justify-center mb-6 gap-5 sm:gap-10">
          <img src={FacebookIcon} alt="Facebook" className="mx-2" />
          <img src={InstagramIcon} alt="Instagram" className="mx-2" />
          <img src={PinterestIcon} alt="Pinterest" className="mx-2" />
          <img src={TelegramIcon} alt="Telegram" className="mx-2" />
          <img src={TwitterIcon} alt="Twitter" className="mx-2" />
        </div>

        <div className="flex sm:flex-row flex-col mt-5 justify-around  gap-4 items-start">
          <div className="footer-left">
            <img src={LogoDark} alt="Logo" className="mb-4" />
            <p className="mb-2">Discover nature&apos;s beauty with our natural care products.</p>
            <p className="mb-2 flex gap-2 flex-row items-center">
              <img src={Phone} />
              Phone: (123) 456-7890
            </p>
            <p className="mb-2 flex gap-2 flex-row items-center">
              <img src={MessageIcon} />
              contact@bloombeauty.com
            </p>
            <p className="mb-2 flex gap-2 flex-row items-center">
              <img src={LocationPin} />
              Blossom Street 27, New York
            </p>
          </div>
          <div>
            <ul className="flex flex-col gap-2">
              <h1 className="font-medium text-[#BFB9CF] text-[15-x] uppercase">Customer Care</h1>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-2">
              <h1 className=" text-[#BFB9CF] font-medium text-[15-x] uppercase">Help</h1>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/returns">Refunds & Exchanges</Link>
              </li>
              <li>
                <Link to="/returns">Shipping & Returns</Link>
              </li>
            </ul>
          </div>
          <div className="footer-right w-full sm:w-auto justify-center flex flex-col gap-3 sm:justify-start pt-3 sm:pt-0">
            <h1 className="text-[#BFB9CF] font-medium text-[15-x] uppercase text-center sm:text-left">
              Sign up for emails
            </h1>
            <p className="">Stay informed, subscribe to our newsletter now!</p>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="Your Email"
                className="p-2 mb-2 text-black rounded"
              />
              <button className="bg-none flex float-start font-semibold">Subscribe ➝ </button>
            </form>
          </div>
        </div>
      </footer>
      <div className="flex flex-col  pb-4 w-full items-center justify-center gap-5 bg-[#252525] text-[#BFB9CF]">
        <Divider className="bg-[#BFB9CF] w-full" />
        <h4>© 2024 Bloom Beauty</h4>
      </div>
    </>
  );
};

export default Footer;
