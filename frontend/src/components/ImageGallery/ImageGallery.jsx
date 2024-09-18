import { useState } from "react";
import { IconButton, Box } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ImageGallery = ({ images = [], defaultImage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const totalImages = images.length + 1;

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index + 1);
  };

  const displayedImage = currentImageIndex === 0 ? defaultImage : images[currentImageIndex - 1];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-full">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#B0A6BD1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            border: "1px solid #B0A6BD1A",
          }}
        >
          <img
            src={displayedImage}
            alt="Product Image"
            className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] object-contain"
          />
        </Box>
        <IconButton
          onClick={handlePrev}
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </div>
      <div className="flex gap-2 mt-2">
        {[defaultImage, ...images].map((image, index) => (
          <Box
            key={index}
            sx={{
              width: 100,
              height: 100,
              border: currentImageIndex === index ? "2px solid #000" : null,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onClick={() => handleThumbnailClick(index)}
            />
          </Box>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
