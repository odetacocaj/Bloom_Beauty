import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import "./CustomDrawer.scss";
import account from "../../assets/images/account.svg";


import closeIcon from "../../assets/images/close.svg";
import CustomButton from "../CustomButton/CustomButton";
const CustomDrawer = ({ open, toggleDrawer }) => {
  return (
    <Drawer transitionDuration={350} anchor="left" open={open} onClose={toggleDrawer(false)}>
      <div className="flex justify-between p-6 flex-row font-semibold bg-pinkMedium text-white uppercase text-2xl">
        <h1>Menu</h1>
        <CustomButton onClick={toggleDrawer(false)}>
          <img src={closeIcon} />
        </CustomButton>
      </div>
      <div className="drawer-content p-5">
        <nav className="flex flex-col">
          <div className="flex flex-col pt-3 pb-3 gap-6">
            <CustomButton className="uppercase text-xl font-normal flex flex-row gap-4 items-center  ">
              <img src={account} alt="Account" />
              Account
            </CustomButton>
          </div>
          <Link to="/" onClick={toggleDrawer(false)} className="drawer-link">
            Shop All
          </Link>
          <Link to="/bestsellers" onClick={toggleDrawer(false)} className="drawer-link">
            BestSellers
          </Link>
          <Link to="/about" className="drawer-link" onClick={toggleDrawer(false)}>
            About Us
          </Link>
          <Link to="/faq" className="drawer-link" onClick={toggleDrawer(false)}>
            FAQ
          </Link>
        </nav>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
