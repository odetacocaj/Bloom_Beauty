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
import CloseIcon from "@mui/icons-material/Close";
import Cart from "../Cart/Cart";
import { useGetAllProducts } from "../../api/hooks/useProduct";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useAuth();
  const cartContent = useSelector((state) => state.cart);

  const totalItems = cartContent.reduce((total, item) => {
    const itemQuantity = item?.quantity || 0;
    return total + itemQuantity;
  }, 0);

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

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (searchOpen) {
      setSearchQuery("");
    }
  };

  const { data: searchResults, refetch } = useGetAllProducts({ search: searchQuery });
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      refetch();
    }
  };

  const handleViewAll = () => {
    toggleSearch();
    navigate("/products?search=" + searchQuery);
  };

  return (
    <>
      <CustomDrawer open={open} toggleDrawer={toggleDrawer} />
      <Cart open={cartOpen} toggleDrawer={toggleCartDrawer} />
      <div
        className={`${
          searchOpen ? "" : "hidden"
        } fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20`}
        onClick={toggleSearch}
      ></div>
      <nav className="header text-[13px] md:text-base pt-5 pb-5 z-50">
        {!searchOpen ? (
          <>
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
              <CustomButton className="user-button" onClick={toggleSearch}>
                <img src={searchLogo} alt="Search" />
                Search
              </CustomButton>
              <div>
                <button className="user-button" onClick={handleClick}>
                  <img src={account} alt="Account" />
                  Account
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
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
          </>
        ) : (
          <>
            <div className="search-box bg-[#FCFCFF] w-[60%] h-[90%] p-2 flex flex-row justify-between relative z-50">
              <div className="flex flex-row gap-4 w-full">
                <img src={searchLogo} alt="search logo" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-input w-full bg-[#FCFCFF]"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <CloseIcon onClick={toggleSearch} />
            </div>

            {searchResults?.products?.length > 0 && (
              <div className="search-results absolute w-[60%] max-h-[80%] bg-white mt-[45px] z-50 overflow-y-auto">
                <ul className="flex flex-row overflow-hidden justify-around pt-5 pb-5 gap-5">
                  {searchResults?.products?.slice(0, 3).map((result, index) => (
                    <div className="shadow-custom pt-2" key={index}>
                      <li
                        key={index}
                        className="hover:bg-gray-100 cursor-pointer flex flex-col justify-center items-center max-h-[300px]  max-w-[150px]"
                      >
                        <img className="max-h-[auto] w-full " src={result.image} />
                        <div className="flex flex-col p-2 gap-4">
                          <h1 className="font-sans capitalize font-[500] text-base text-[#383838]">
                            {result.name.length > 20
                              ? `${result.name.slice(0, 20)}...`
                              : result.name}
                          </h1>
                          <p className="font-sans capitalize text-sm text-slate">{result.brand}</p>
                          <p className="text-[#383838]">${result.price}</p>
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
                <div className="p-2 flex justify-center">
                  <CustomButton
                    onClick={handleViewAll}
                    className="text-[#383838] border-2 border-[#383838] w-[246px] p-2 hover:bg-black hover:text-white rounded font-sans font-[500]"
                  >
                    View All
                  </CustomButton>
                </div>
              </div>
            )}
          </>
        )}
      </nav>
    </>
  );
};

export default Header;
