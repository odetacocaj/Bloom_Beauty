import axios from "axios";

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, userData);
    return response;
  } catch (error) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {});
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
