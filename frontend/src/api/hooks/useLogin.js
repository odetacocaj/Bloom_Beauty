// src/api/hooks/useAuth.js
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../mutations/authMutations";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData) => loginUser(formData),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      navigate("/");
    },
    onError: (error) => {
      throw new Error("Login failedddd " + error.response.data);
    },
  });
};
