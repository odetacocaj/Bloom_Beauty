import axios from "axios";

export const fetchLatestProducts = async (count) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/latest`, {
      params: { count },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching latest products:", error);
    throw error;
  }
};
