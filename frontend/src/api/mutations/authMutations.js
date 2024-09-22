import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

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
    const token = response.data.token;
    setAuthToken(token);
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

export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/me`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const changePassword = async (passwordData) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/users/me/change-password`,
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    localStorage.removeItem("authToken");

    return response.data;
  } catch (error) {
    console.error("Error changing password:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
