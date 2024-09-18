import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useState } from "react";
import Badge from "@mui/material/Badge";
import logo from "../../assets/images/logo.svg";
import searchLogo from "../../assets/images/Search.svg";
import cart from "../../assets/images/cart.svg";
import account from "../../assets/images/account.svg";
import menu from "../../assets/images/menu.svg";
import CustomDrawer from "../MobileNavigation/MobileNavigation";
import CustomButton from "../CustomButton/CustomButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import Cart from "../Cart/Cart";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const cartContent = useSelector((state) => state.cart);
  const totalItems = cartContent.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const toggleCartDrawer = (newOpen) => () => {
    setCartOpen(newOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleNavigate = (path) => {
    handleMenuClose();
    navigate(path);
  };
  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
  };

  return (
    <>
      <CustomDrawer open={open} toggleDrawer={toggleDrawer} />
      <Cart open={cartOpen} toggleDrawer={toggleCartDrawer} />
      <nav className="header text-[13px] md:text-base pt-5 pb-5">
        <CustomButton
          onClick={toggleDrawer(true)}
          className="uppercase lg:hidden flex flex-col items-center justify-center"
        >
          <img src={menu} alt="Menu" />
          Menu
        </CustomButton>
        <div className="navbar-logo flex items-center">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="navbar-menu hidden lg:flex items-center gap-10">
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
          <div>
            <button className="user-button" onClick={handleClick}>
              <img src={account} alt="Account" />
              Account
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },
              }}
            >
              {isLoggedIn
                ? [
                    <MenuItem key="profile" onClick={() => handleNavigate("/profile")}>
                      My Profile
                    </MenuItem>,
                    <MenuItem key="logout" onClick={() => handleLogout()}>
                      Logout
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="login" onClick={() => handleNavigate("/login")}>
                      Login
                    </MenuItem>,
                    <MenuItem key="signup" onClick={() => handleNavigate("/signup")}>
                      Signup
                    </MenuItem>,
                  ]}
            </Menu>
          </div>
          <CustomButton onClick={toggleCartDrawer(true)} className="user-button">
            <Badge badgeContent={totalItems} color="primary">
              <img src={cart} alt="Cart" />
            </Badge>
            Cart
          </CustomButton>
        </div>

        <CustomButton
          onClick={toggleCartDrawer(true)}
          className="uppercase lg:hidden flex flex-col items-center justify-center"
        >
          <Badge badgeContent={totalItems} color="primary">
            <img src={cart} alt="Cart" />
          </Badge>
          Cart
        </CustomButton>
      </nav>
    </>
  );
};

export default Header;
