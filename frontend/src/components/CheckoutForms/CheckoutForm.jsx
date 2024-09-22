import { useState, useEffect } from "react";
import { useGetMe } from "../../api/hooks/useUser";
import Spinner from "../Spinner/Spinner";

function CheckoutForm({ onContinue, deliveryMethod, setDeliveryMethod }) {
  const { data: user, isLoading, isError } = useGetMe();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    deliveryMethod: deliveryMethod,
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
        deliveryMethod: "shipping",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        zip: user.zip || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onContinue(formData);
  };

  if (isLoading) {
    return <Spinner className="w-[80%]" />;
  }
  if (isError) {
    return <h1>There was an error while loading your data!</h1>;
  }

  return (
    <div className="w-full bg-white">
      <form onSubmit={handleSubmit} className="w-full mx-auto p-4 rounded-md flex flex-col gap-5">
        {/* Contact Information Fields */}
        <div className="mb-3 flex flex-col gap-5">
          <h1 className="text-[#383838] font-medium text-[20px]">Contact Information</h1>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700"
            placeholder="Enter your email"
            required
          />
        </div>
        {/* Name Fields */}
        <div className="flex flex-row justify-between gap-2">
          <div className="mb-4 w-1/2">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-4 w-1/2">
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Delivery Method Selection */}
        <div className="mb-3 flex flex-col gap-5">
          <h1 className="text-[#383838] font-medium text-[20px]">Delivery Method</h1>

          <div className="flex items-center">
            <input
              type="radio"
              id="shipping"
              name="deliveryMethod"
              value="shipping"
              checked={formData.deliveryMethod === "shipping"}
              onChange={() => {
                setDeliveryMethod("shipping");
                setFormData({ ...formData, deliveryMethod: "shipping" });
              }}
              className="mr-2"
            />
            <label htmlFor="shipping" className="text-gray-700">
              Ship
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="pickup"
              name="deliveryMethod"
              value="pickup"
              checked={formData.deliveryMethod === "pickup"}
              onChange={() => {
                setDeliveryMethod("pickup");
                setFormData({ ...formData, deliveryMethod: "pickup" });
              }}
              className="mr-2"
            />
            <label htmlFor="pickup" className="text-gray-700">
              Pick Up
            </label>
          </div>
        </div>

        {/* Shipping Information (Conditional) */}
        {formData.deliveryMethod === "shipping" && (
          <>
            <div className="mb-3 flex flex-col gap-5">
              <h1 className="text-[#383838] font-medium text-[20px]">Shipping Information</h1>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                placeholder="Enter your shipping address"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2 text-[#BFB9CF]" htmlFor="country">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                required
              >
                <option value="">Select your country</option>
                <option value="Albania">Albania</option>
                <option value="Kosovo">Kosovo</option>
              </select>
            </div>

            <div className="flex gap-4">
              <div className="mb-4 w-1/2">
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700"
                  placeholder="Enter your city"
                  required
                />
              </div>

              <div className="mb-4 w-1/2">
                <input
                  type="number"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700"
                  placeholder="Enter your postal code"
                  required
                />
              </div>
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="flex w-full">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg">
            Continue to Shipping
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
