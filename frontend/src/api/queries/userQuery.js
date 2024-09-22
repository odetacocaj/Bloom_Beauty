import axios from "axios";

export const getMe = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};
