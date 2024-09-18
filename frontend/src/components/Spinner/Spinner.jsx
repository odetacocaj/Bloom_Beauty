import { CircularProgress } from "@mui/material";
function Spinner({ className }) {
  return (
    <div className={`${className} loading-spinner flex justify-center items-center`}>
      <CircularProgress thickness={5} sx={{ color: "#f5a3b7" }} />
    </div>
  );
}

export default Spinner;
