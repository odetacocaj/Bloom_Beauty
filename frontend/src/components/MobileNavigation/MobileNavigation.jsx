import { Link } from "react-router-dom";
import CustomDrawer from "../CustomDrawer/CustomDrawer";
import "./MobileNavigation.scss";
import account from "../../assets/images/account.svg";
import CustomButton from "../CustomButton/CustomButton";
import { useAuth } from "../../hooks/useAuth";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const MobileNavigation = ({ open, toggleDrawer }) => {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  return (
    <CustomDrawer
      anchor="left"
      open={open}
      toggleDrawer={toggleDrawer}
      title={"Menu"}
      titleClasses={
        "flex justify-between p-6 flex-row font-semibold bg-pinkMedium text-white uppercase text-2xl"
      }
    >
      <div className="drawer-content p-5">
        <nav className="flex flex-col">
          <Accordion
            sx={{
              boxShadow: "none",
              bgcolor: "transparent",
              "& .MuiAccordionSummary-root": {
                bgcolor: "transparent",
              },

              "& .MuiButtonBase-root": {
                paddingLeft: "0px",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="account-content"
              id="account-header"
            >
              <div className="flex flex-row gap-4 items-center">
                <img src={account} alt="Account" />
                <CustomButton className="uppercase text-xl font-normal">Account</CustomButton>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {isLoggedIn ? (
                <div className="flex flex-col">
                  <Link to="/profile" onClick={toggleDrawer(false)} className="drawer-link">
                    Profile
                  </Link>
                  <Link
                    to="/"
                    onClick={() => {
                      toggleDrawer(false)();
                      dispatch(logout());
                    }}
                    className="drawer-link"
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col">
                  <Link to="/login" onClick={toggleDrawer(false)} className="drawer-link">
                    Login
                  </Link>
                  <Link to="/signup" onClick={toggleDrawer(false)} className="drawer-link">
                    Signup
                  </Link>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
          <Link to="/" onClick={toggleDrawer(false)} className="drawer-link">
            Shop All
          </Link>
          <Link to="/bestsellers" onClick={toggleDrawer(false)} className="drawer-link">
            BestSellers
          </Link>
          <Link to="/about" onClick={toggleDrawer(false)} className="drawer-link">
            About Us
          </Link>
          <Link to="/faq" onClick={toggleDrawer(false)} className="drawer-link">
            FAQ
          </Link>
        </nav>
      </div>
    </CustomDrawer>
  );
};

export default MobileNavigation;
