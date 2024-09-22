import { useState } from "react";
import { useChangePassword } from "../../api/hooks/useUser";
import CustomButton from "../CustomButton/CustomButton";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const { mutate: changePassword, isLoading } = useChangePassword();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New password and confirm password do not match.", {
        position: "bottom-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    changePassword(formData, {
      onSuccess: (data) => {
        console.log("Password changed successfully", data);
        toast.success("Password changed successfully", {
          position: "bottom-right",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      },
      onError: (error) => {
        console.error("Error changing password", error);
        toast.error(error, {
          position: "bottom-right",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-4 rounded-md">
      <div className="mb-4">
        <TextField
          label="Current Password"
          type={showCurrentPassword ? "text" : "password"}
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge="end">
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row w-full gap-2">
        <div className="mb-4 w-full">
          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="mb-4 w-full">
          <TextField
            label="Confirm New Password"
            type={showConfirmNewPassword ? "text" : "password"}
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    edge="end"
                  >
                    {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      {isLoading && <Spinner />}

      <div className="flex w-[50%]">
        <CustomButton type="submit" className="w-full explore-shop-button" disabled={isLoading}>
          Submit
        </CustomButton>
      </div>
    </form>
  );
}

export default ChangePassword;
