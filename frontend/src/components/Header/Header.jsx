import { Link } from "react-router-dom";
import "./Header.scss";
import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import searchLogo from "../../assets/images/Search.svg";
import cart from "../../assets/images/cart.svg";
import account from "../../assets/images/account.svg";
import menu from "../../assets/images/menu.svg";
import CustomDrawer from "../CustomDrawer/CustomDrawer";
import CustomButton from "../CustomButton/CustomButton";
const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <CustomDrawer open={open} toggleDrawer={toggleDrawer} />
      <nav className="header text-[13px] md:text-base pt-5 pb-5">
        <CustomButton
          onClick={toggleDrawer(true)}
          className="uppercase lg:hidden flex flex-col items-center justify-center"
        >
          <img src={menu} />
          Menu
        </CustomButton>
        <div className="navbar-logo flex items-center">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="navbar-menu  hidden lg:flex items-center gap-10">
          <Link to="/products">Shop All</Link>
          <Link to="/bestsellers">BestSellers</Link>
          <Link to="/about">About Us</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className="user-buttons hidden lg:flex gap-5">
          <button className="user-button">
            <img src={searchLogo} alt="Search" />
            Search
          </button>
          <button className="user-button">
            <img src={account} alt="Account" />
            Account
          </button>
          <button className="user-button">
            <img src={cart} alt="Cart" />
            Cart
          </button>
        </div>

        <button className="uppercase lg:hidden flex flex-col items-center justify-center">
          <img src={cart} alt="Cart" />
          Cart
        </button>
      </nav>
    </>
  );
};

export default Header;
