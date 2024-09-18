import { useParams } from "react-router-dom";
import { useGetProductById } from "../../api/hooks/useProduct";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import Spinner from "../Spinner/Spinner";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
import CustomButton from "../CustomButton/CustomButton";
import SkinTypeIcon from "../../assets/images/skinTypeIcon.svg";
import ImageGallery from "../ImageGallery/ImageGallery";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductById(id); // Pass only the ID
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#F5A3B7",
    },
  });
  if (isLoading)
    return (
      <div className="flex w-full h-[100vh] justify-center items-center pl-[7%] pr-[7%]">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="flex w-full h-[100vh] justify-center items-center pl-[7%] pr-[7%]">
        Error loading product details
      </div>
    );

  return (
    <div>
      {product ? (
        <div className="flex flex-col md:flex-row pl-[7%] pr-[7%] pt-[3%] pb-[3%] gap-6 w-full">
          <div className="product-details-left w-full md:w-[50%] flex justify-center h-full">
            <ImageGallery images={product.images || []} defaultImage={product.image} />
          </div>
          <div className="flex flex-col gap-4 w-full md:w-[50%] justify-center md:justify-start items-center md:items-start text-center md:text-left">
            <h1 className="font-sans font-[500] text-[22px] text-[#383838]">{product.name}</h1>
            <div className="product-rating flex flex-row gap-1">
              <StyledRating
                name="read-only"
                value={product.rating}
                precision={0.5}
                readOnly
                emptyIcon={<StarIcon style={{ color: "#DFE1E3" }} fontSize="inherit" />}
              />
              <p className=" text-slate">{product.numReviews} reviews</p>
            </div>
            <h3 className="font-sans font-[500] text-base text-[#383838]">${product.price}</h3>
            <p className="text-[#697586] font-normal text-sm font-sans">
              {product.richDescription}
            </p>
            <div className="flex flex-col gap-1">
              <p className="uppercase font-normal text-sm text-[#383838]">Recommended for:</p>
              <div className="flex flex-row gap-2 font-normal text-sm text-[#383838]">
                <img src={SkinTypeIcon} />
                <p className="capitalize">{product.skinType} skin</p>
              </div>
            </div>
            <CustomButton
              className="explore-shop-button w-[250px]"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </CustomButton>
            <div className="w-full">
              <CustomAccordion
                textcolor="#697586"
                fontSize="14px"
                fontWeight="500"
                expandedbgcolor="#B0A6BD1A"
                bgcolor="transparent"
                items={[
                  {
                    question: "WHAT MAKES IT GOOD?",
                    answer: `${product?.description}`,
                  },
                  {
                    question: "INGREDIENTS",
                    answer:
                      product?.ingredients?.map((ingredient) => `${ingredient}; `).join("\n") ||
                      "No ingredients available",
                  },
                  {
                    question: "HOW TO USE IT?",
                    answer: product.instructions,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default ProductDetails;
