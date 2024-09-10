import { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import { Link } from "react-router-dom";
import { useSignup } from "../../api/hooks/useSignup";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const Signup = () => {
  const { mutate, isError, error, isPending } = useSignup();
  const [showError, setShowError] = useState(isError);

  useEffect(() => {
    if (isError) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleFormSubmit = (formData) => {
    mutate(formData);
  };

  const fields = [
    { name: "name", type: "text", label: "First Name", required: true, placeholder: "First Name" },
    {
      name: "lastname",
      type: "text",
      label: "Last Name",
      required: true,
      placeholder: "Last Name",
    },
    { name: "email", type: "email", label: "Email Address", required: true, placeholder: "Email" },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      placeholder: "Password",
    },
    { name: "phone", type: "tel", label: "Phone", required: false, placeholder: "Phone Number" },
    { name: "address", type: "text", label: "Address", required: false, placeholder: "Address" },
    { name: "zip", type: "text", label: "Zip Code", required: false, placeholder: "Zip Code" },
    { name: "city", type: "text", label: "City", required: false, placeholder: "City" },
    { name: "country", type: "text", label: "Country", required: false, placeholder: "Country" },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-10 max-w-md mx-auto">
      {isPending && (
        <div className="loader-overlay active">
          <CircularProgress sx={{ color: "#F5A3B7" }} />
        </div>
      )}
      <h1 className="text-2xl font-semibold mb-2">Signup</h1>
      <h4 className="text-purpleGray font-normal text-base">
        Please enter your information below:
      </h4>
      <Form onSubmit={handleFormSubmit} fields={fields} buttonText={"Signup"} />
      {showError && (
        <Alert severity="error" className="mt-4">
          {error?.message || "An error occurred. Please try again."}
        </Alert>
      )}

      <div className="mt-6 flex flex-col justify-center gap-3">
        <Link to={"/login"} className="text-slate forgot-password">
          Already have an account? <span className="font-medium">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
