import { useState } from "react";

function PaymentForm({ onSubmit }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentData = {
      cardNumber,
      expiryDate,
      cvv,
    };

    console.log("Payment Data:", paymentData);
    onSubmit(paymentData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 flex flex-col gap-5">
      <h1 className="text-[#383838] font-medium text-[20px]">Payment Information</h1>
      <input
        type="text"
        name="cardNumber"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-gray-700"
        placeholder="Card Number"
        required
      />
      <input
        type="text"
        name="expiryDate"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-gray-700"
        placeholder="MM/YY"
        required
      />
      <input
        type="text"
        name="cvv"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-gray-700"
        placeholder="CVV"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg">
        Confirm Payment
      </button>
    </form>
  );
}

export default PaymentForm;
