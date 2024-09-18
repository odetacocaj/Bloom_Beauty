import axios from "axios";

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
