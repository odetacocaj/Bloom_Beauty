import { Drawer, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCartSubtotal,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import "./Cart.scss";

const Cart = ({ open, toggleDrawer }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subtotal = useSelector(selectCartSubtotal);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    toggleDrawer(false)();
    navigate("/checkout");
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <div className="flex flex-col p-3 h-full">
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
          <div className="flex flex-col h-full justify-between">
            <div className="cart-items-container h-[380px] overflow-y-scroll">
              <ul>
                {cart.map((item) => (
                  <>
                    <Divider />
                    <li key={item.id} className="flex flex-row pt-3 pb-3 pl-3 gap-2">
                      <img src={item.image} className="max-w-[100px] max-h-[100px]" />
                      <div className="flex flex-col gap-5">
                        <span className="flex flex-col gap-1">
                          <p className="font-[500] text-base">{item.name}</p>
                          <p>{`$${item.price}`}</p>
                        </span>
                        <div className="flex flex-row gap-5 items-center">
                          <div className="flex flex-row w-fit pl-3 pr-3 gap-5 border-[1px] rounded">
                            <CustomButton onClick={() => handleDecrement(item.id)}>-</CustomButton>
                            <p>{item.quantity}</p>
                            <CustomButton onClick={() => handleIncrement(item.id)}>+</CustomButton>
                          </div>
                          <CustomButton onClick={() => handleRemove(item.id)}>x</CustomButton>
                        </div>
                      </div>
                    </li>
                    <Divider />
                  </>
                ))}
              </ul>
            </div>
            <div>
              <Divider />
              <div className="flex flex-row justify-between p-2">
                <p className="uppercase text-[#B0A6BD] text-base">Subtotal:</p>
                <p className="text-[#383838]">${subtotal.toFixed(2)}</p>
              </div>
              <CustomButton onClick={handleCheckout} className="explore-shop-button">
                Checkout
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default Cart;
