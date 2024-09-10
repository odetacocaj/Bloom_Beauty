import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../mutations/authMutations";
import { useNavigate } from "react-router-dom";
export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData) => signupUser(formData),
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      navigate("/login");
    },
    onError: (error) => {
      throw new Error("Signup failed " + error.response.data);
    },
  });
};
