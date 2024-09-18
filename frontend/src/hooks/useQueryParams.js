import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return Object.fromEntries(params.entries());
  }, [location.search]);

  const setQueryParams = (params) => {
    const newParams = new URLSearchParams(queryParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    navigate(`?${newParams.toString()}`);
  };

  const resetQueryParams = () => {
    navigate(location.pathname);
  };

  return [queryParams, setQueryParams, resetQueryParams];
};

export default useQueryParams;
