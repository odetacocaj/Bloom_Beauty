import { useQuery, useMutation } from "@tanstack/react-query";
import { getMe } from "../queries/userQuery";
import { updateUserProfile } from "../mutations/authMutations";
import { changePassword } from "../mutations/authMutations";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["getMe"],
    queryFn: () => getMe(),
    onError: (error) => {
      console.error("Failed to fetch user details", error);
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (formData) => updateUserProfile(formData),
    onSuccess: (data) => {
      console.log("Updating profile successful:", data);
    },
    onError: (error) => {
      console.error("Updating profile failed", error.response.data);
    },
  });
};
export const useChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (passwordData) => changePassword(passwordData),
    onSuccess: (data) => {
      console.log("Password changed successfully:", data);
      dispatch(logout());
      navigate("/login");
    },
    onError: (error) => {
      console.error("Changing password failed", error.response.data);
    },
  });
};
