import { Drawer, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

const Cart = ({ open, toggleDrawer }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleCheckout = () => {
    toggleDrawer(false)();
    navigate("/checkout");
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <div className="flex flex-col p-3">
        <div className="flex justify-between items-center">
          <h1 className="uppercase font-sans font-bold text-xl">Your Cart</h1>
          <CustomButton className="" onClick={toggleDrawer(false)}>
            <CloseIcon />
          </CustomButton>
        </div>
        {cart.length === 0 ? (
          <div className="flex justify-center items-center pt-10">
            You don&apos;t have any items in your cart.
          </div>
        ) : (
          <div style={{ width: 300, padding: 20 }}>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex flex-row ">
                  <img src={item.image} className="max-w-[100px] max-h-[100px]" />
                  <div className="flex flex-col">
                    <p>{item.name}</p>
                    <p>{`${item.price}`}</p>
                    <div className="flex flex-row ">
                      <CustomButton onClick={() => handleDecrement(item.id)}>-</CustomButton>
                      <p>{item.quantity}</p>
                      <CustomButton onClick={() => handleIncrement(item.id)}>+</CustomButton>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Divider />
            <CustomButton onClick={handleCheckout}>Checkout</CustomButton>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default Cart;
