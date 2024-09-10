import Drawer from "@mui/material/Drawer";
import closeIcon from "../../assets/images/close.svg";
import CustomButton from "../CustomButton/CustomButton";
const CustomDrawer = ({ open, toggleDrawer, anchor, title, titleClasses, children }) => {
  return (
    <Drawer
      transitionDuration={350}
      anchor={anchor || "left"}
      open={open}
      onClose={toggleDrawer(false)}
    >
      <div className={titleClasses}>
        <h1>{title}</h1>
        <CustomButton onClick={toggleDrawer(false)}>
          <img src={closeIcon} />
        </CustomButton>
      </div>
      <div className="drawer-content p-5">{children}</div>
    </Drawer>
  );
};

export default CustomDrawer;
