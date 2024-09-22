import { useState } from "react";
import { useUpdateProfile } from "../../api/hooks/useUser";
import CustomButton from "../CustomButton/CustomButton";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";

function UserProfileForm({ user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    lastname: user.lastname,
  });

  // Use the mutation
  const { mutate: updateUserProfile, isLoading } = useUpdateProfile();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    updateUserProfile(formData, {
      onSuccess: (data) => {
        console.log("Profile updated successfully", data);
        {
          toast.success("Profile updated successfully", {
            position: "bottom-right",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      },
      onError: (error) => {
        console.error("Error updating profile", error);
        {
          toast.error(error?.message, {
            position: "bottom-right",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-4 rounded-md">
      <div className="mb-4">
        <label className="block text-[#BFB9CF] text-xs mb-2" htmlFor="email">
          Email
        </label>
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

      <div className="flex  flex-col md:flex-row w-full gap-2">
        <div className="mb-4 w-full">
          <label className="block text-[#BFB9CF] text-xs mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700"
            placeholder={user.name}
            required
          />
        </div>

        <div className="mb-4 w-full">
          <label className="block text-[#BFB9CF] text-xs mb-2" htmlFor="lastname">
            Lastname
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700"
            placeholder="Enter your lastname"
            required
          />
        </div>
      </div>

      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}

      <div className="flex w-[50%]">
        <CustomButton type="submit" className="w-full explore-shop-button" disabled={isLoading}>
          Submit
        </CustomButton>
      </div>
    </form>
  );
}

export default UserProfileForm;
