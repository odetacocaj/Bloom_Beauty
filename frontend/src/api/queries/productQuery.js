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

export const getAllBrands = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/brands`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export const getAllProducts = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();

    const url = `${import.meta.env.VITE_API_URL}/products?${queryString}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// export const getBesellers = async () => {
//   try {
//     const url = `${import.meta.env.VITE_API_URL}/products/bestsellers`;

//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching bestselling products:", error);
//     throw error;
//   }
// };

export const getProductById = async (id) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/${id}`; // Use the correct URL format
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
