import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return { isLoggedIn, isAdmin };
};
