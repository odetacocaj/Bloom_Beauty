import { Divider } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectCartSubtotal,
} from "../../redux/cartSlice";
import CustomButton from "../CustomButton/CustomButton";
import CheckoutForm from "../CheckoutForms/CheckoutForm";
import { Breadcrumbs, Link } from "@mui/material";
import ShippingForm from "../CheckoutForms/ShippingForm";
import PaymentForm from "../CheckoutForms/PaymentForm";

function Checkout() {
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("normal");
  const [deliveryMethod, setDeliveryMethod] = useState("shipping");

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    deliveryMethod: "shipping",
    address: "",
    city: "",
    country: "",
    zip: "",
    shippingMethod: "normal",
    paymentData: {},
  });
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const handleCheckoutFormSubmit = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    handleStepChange(2);
  };

  const handleShippingFormSubmit = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    handleStepChange(3);
  };

  const handlePaymentFormSubmit = (paymentData) => {
    setFormData((prev) => ({
      ...prev,
      paymentData,
    }));

    handleSubmitOrder(formData);
  };

  const handleSubmitOrder = async (orderData) => {
    // Add logic to send orderData to your backend
    console.log("Submitting order data:", orderData);
    // Example:
    // await api.submitOrder(orderData);
  };

  const shippingFee = deliveryMethod === "pickup" ? 0 : shippingMethod === "fast" ? 5 : 2;
  const total = subtotal + shippingFee;

  return (
    <div className="flex flex-row w-full pl-[7%] pr-[7%] pt-[2%] gap-4">
      <div className="w-[70%]">
        <Breadcrumbs aria-label="breadcrumb" separator="›" className="mb-4 pl-4">
          <Link
            underline="hover"
            color={step === 1 ? "#697586" : "#B0A6BD"}
            onClick={() => handleStepChange(1)}
          >
            Contact Information
          </Link>
          <Link
            underline="hover"
            color={step === 2 ? "#697586" : "#B0A6BD"}
            onClick={() => handleStepChange(2)}
          >
            Shipping
          </Link>
          <Link
            underline="hover"
            color={step === 3 ? "#697586" : "#B0A6BD"}
            onClick={() => handleStepChange(3)}
          >
            Payment
          </Link>
        </Breadcrumbs>
        <div className="w-full p-4">
          {step === 1 && (
            <CheckoutForm
              onContinue={handleCheckoutFormSubmit}
              orderItems={cart}
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
            />
          )}
          {step === 2 && (
            <ShippingForm
              onContinue={handleShippingFormSubmit}
              deliveryMethod={deliveryMethod}
              shippingMethod={shippingMethod}
              setShippingMethod={setShippingMethod}
            />
          )}
          {step === 3 && <PaymentForm onSubmit={handlePaymentFormSubmit} />}
        </div>
      </div>
      <div className="flex flex-col p-3 h-full bg-white">
        {/* Cart Summary */}
        <div className="flex justify-between items-center">
          <h1 className="font-sans font-[500] text-lg">Your Order</h1>
        </div>
        {cart.length === 0 ? (
          <div className="flex justify-center items-center pt-10">
            You don&apos;t have any items in your cart.
          </div>
        ) : (
          <div className="flex flex-col h-full gap-2 p-3 justify-between">
            <div className="cart-items-container h-[380px] overflow-y-scroll">
              <ul>
                {cart.map((item) => (
                  <div key={item.id}>
                    <Divider />
                    <li className="flex flex-row pt-3 pb-3 pl-3 gap-2">
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
                  </div>
                ))}
              </ul>
            </div>
            <div>
              <Divider />
              <div className="flex flex-row justify-between p-2">
                <p className="uppercase text-[#B0A6BD] text-base">Subtotal:</p>
                <p className="text-[#383838]">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex flex-row justify-between p-2">
                <p className="uppercase text-[#B0A6BD] text-base">Shipping Fee:</p>
                <p className="text-[#383838]">${shippingFee.toFixed(2)}</p>
              </div>
              <div className="flex flex-row justify-between p-2 font-bold">
                <p className="uppercase text-[#B0A6BD] text-base">Total:</p>
                <p className="text-[#383838]">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
