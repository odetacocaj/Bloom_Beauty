function ShippingForm({ shippingMethod, setShippingMethod, onContinue, deliveryMethod }) {
  // Automatically select pickup if deliveryMethod is "pickup"
  const isPickupSelected = deliveryMethod === "pickup";

  // Effectively set the shipping method to pickup if the delivery method is "pickup"
  if (isPickupSelected && shippingMethod !== "pickup") {
    setShippingMethod("pickup");
  }

  const handleChange = (value) => {
    setShippingMethod(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onContinue(shippingMethod);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-4 rounded-md flex flex-col gap-5">
      <h1 className="text-[#383838] font-medium text-[20px]">Shipping Method</h1>

      {!isPickupSelected && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <input
                type="radio"
                id="normal"
                name="shippingMethod"
                value="normal"
                checked={shippingMethod === "normal"}
                onChange={() => handleChange("normal")}
                className="mr-2"
              />
              <label htmlFor="normal" className="text-gray-700">
                Normal Delivery
                <p className="text-sm text-[#B0A6BD]">Receive your order in 5-7 business days</p>
              </label>
            </div>
            <p>$2</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <input
                type="radio"
                id="fast"
                name="shippingMethod"
                value="fast"
                checked={shippingMethod === "fast"}
                onChange={() => handleChange("fast")}
                className="mr-2"
              />
              <label htmlFor="fast" className="text-gray-700">
                Fast Delivery
                <p className="text-sm text-[#B0A6BD]">Receive your order within 24 hours</p>
              </label>
            </div>
            <p>$5</p>
          </div>
        </>
      )}

      {isPickupSelected && (
        <div className="flex items-center justify-between">
          <div>
            <input
              type="radio"
              id="pickup"
              name="shippingMethod"
              value="pickup"
              checked={shippingMethod === "pickup"}
              onChange={() => handleChange("pickup")}
              className="mr-2"
            />
            <label htmlFor="pickup" className="text-gray-700">
              Pickup
              <p className="text-sm text-[#B0A6BD]">Pick up your order from the store</p>
            </label>
          </div>
          <p>$0</p>
        </div>
      )}

      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg">
        Proceed to Payment
      </button>
    </form>
  );
}

export default ShippingForm;
