import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Spinner from "../Spinner/Spinner";

function PaymentForm({ onSubmit, amount, currency, description }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    setLoading(false);

    if (stripeError) {
      setError(stripeError.message);
    } else {
      const paymentData = {
        paymentMethodId: paymentMethod.id,
        amount, // Amount to be charged
        currency, // Currency type
        description, // Description of the charge
      };
      console.log("Payment Data:", paymentData);
      onSubmit(paymentData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 flex flex-col gap-5">
      <h1 className="text-[#383838] font-medium text-[20px]">Payment Information</h1>
      <CardElement className="w-full border rounded-lg p-2" />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
      >
        {loading ? <Spinner size={24} color="#ffffff" /> : "Confirm Payment"}
      </button>
    </form>
  );
}

export default PaymentForm;
