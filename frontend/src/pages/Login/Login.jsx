import { useState, useEffect } from "react";
import { useLogin } from "../../api/hooks/useLogin";
import Form from "../../components/Form/Form";
import { Link } from "react-router-dom";
import "./Login.scss";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const { mutate, isError, error, isSuccess, isPending } = useLogin();
  const [showMessage, setShowMessage] = useState({ error: false, success: false });

  useEffect(() => {
    if (isError) {
      setShowMessage({ error: isError });
      const timer = setTimeout(() => setShowMessage({ error: false }), 5000);
      return () => clearTimeout(timer);
    }
  }, [isError, isSuccess]);

  const handleFormSubmit = (formData) => {
    mutate(formData);
  };

  const fields = [
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "Email Address",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      placeholder: "Password",
    },
  ];

  return (
    <div className="login-container flex flex-col items-center justify-center p-10 max-w-md mx-auto">
      {isPending && (
        <div className="loader-overlay active">
          <CircularProgress sx={{ color: "#F5A3B7" }} />
        </div>
      )}
      <h1 className="text-2xl font-semibold mb-2">Login</h1>
      <h4 className="text-purpleGray font-normal text-base">
        Please enter your e-mail and password:
      </h4>

      <Form onSubmit={handleFormSubmit} fields={fields} buttonText={"Login"} />

      {showMessage.error && (
        <Alert severity="error" className="mt-4">
          {error || "An error occurred. Please try again."}
        </Alert>
      )}

      <div className="mt-6 flex flex-col justify-center gap-3">
        <Link to={"/recover-password"} className="text-slate forgot-password">
          Forgot your password? <span className="font-medium">Recover password</span>
        </Link>
        <Link to={"/signup"} className="text-slate forgot-password">
          New to BloomBeauty? <span className="font-medium">Create an account</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
