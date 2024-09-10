import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../mutations/authMutations";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (formData) => loginUser(formData),
    onSuccess: (data) => {
      const token = data?.data?.token;
      const isAdmin = data?.data?.isAdmin;
      localStorage.setItem("authToken", token);
      localStorage.setItem("isAdmin", isAdmin);
      dispatch(login({ token, isAdmin }));
      navigate("/");
    },
    onError: (error) => {
      throw new Error("Login failed " + error.response.data);
    },
  });
};
