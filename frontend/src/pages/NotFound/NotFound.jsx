import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col p-5 items-center justify-center text-center h-[80vh] gap-5">
      <h1 className="text-lg font-semibold">404 - Page Not Found &#128533;</h1>
      <p>Sorry, the page you are looking for doesn&apos;t exist or has been moved.</p>
      <CustomButton className="explore-shop-button w-[200px]" onClick={() => navigate("/")}>
        Go to Home
      </CustomButton>
    </div>
  );
};

export default NotFound;
