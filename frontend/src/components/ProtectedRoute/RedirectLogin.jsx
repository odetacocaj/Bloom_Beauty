import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const RedirectIfLoggedIn = ({ children, redirectTo }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default RedirectIfLoggedIn;
