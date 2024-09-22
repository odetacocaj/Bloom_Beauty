import "./ProductCard.scss";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import CustomButton from "../CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "black",
  },
});

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Item added to cart!", {
      position: "bottom-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };
  const handleClickProduct = (product) => {
    navigate(`/products/${product.id}`);
  };
  return (
    <div className="product-card" onClick={() => handleClickProduct(product)}>
      {product.isFeatured && <div className="bestseller-ribbon bg-transparent">Bestseller</div>}
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h2 className="product-name font-[500] text-base">{product.name}</h2>
        <div className="product-rating flex flex-row items-end gap-1">
          <StyledRating
            name="read-only"
            value={product.rating}
            precision={0.5}
            readOnly
            emptyIcon={<StarIcon style={{ color: "#DFE1E3" }} fontSize="inherit" />}
          />
          <p>({product.numReviews})</p>
        </div>
        <p className="product-description text-slate">
          {product.brand.length > 30 ? `${product.brand.slice(0, 30)}...` : product.brand}
        </p>
        <div className="product-price">${product.price}</div>
        <CustomButton
          onClick={(event) => handleAddToCart(product, event)}
          className="clear-filters-button"
        >
          Add to Cart
        </CustomButton>
      </div>
    </div>
  );
}

export default ProductCard;
