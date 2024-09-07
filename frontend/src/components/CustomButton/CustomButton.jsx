import "./CustomButton.scss";

const Button = ({ children, onClick, type = "button", className }) => {
  return (
    <button type={type} className={`custom-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
