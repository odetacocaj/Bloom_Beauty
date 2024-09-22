import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetAllCategories } from "../../api/hooks/useCategories";
import useQueryParams from "../../hooks/useQueryParams";
import { useGetBrands } from "../../api/hooks/useProduct";
import CustomButton from "../../components/CustomButton/CustomButton";
import "./Filters.scss";
function Filters() {
  const { data: categories = [] } = useGetAllCategories();
  const { data: brands = [] } = useGetBrands();
  const [queryParams, setQueryParams, resetQueryParams] = useQueryParams();

  const selectedCategory = queryParams.category ? queryParams.category.split(",") : [];
  const selectedBrand = queryParams.brand ? queryParams.brand.split(",") : [];
  const selectedSkinType = queryParams.skinType ? queryParams.skinType.split(",") : [];
  const selectedPrice = queryParams.price || "";

  const [customPrice, setCustomPrice] = useState({
    minPrice: queryParams.minPrice || "",
    maxPrice: queryParams.maxPrice || "",
  });

  const priceRangeMapping = {
    under_25: { minPrice: 0, maxPrice: 25 },
    from_25: { minPrice: 25, maxPrice: 50 },
    over_50: { minPrice: 50, maxPrice: 2000 },
  };

  const handleFilterChange = (filterKey, value) => {
    const currentValues = queryParams[filterKey] ? queryParams[filterKey].split(",") : [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    setQueryParams({
      ...queryParams,
      [filterKey]: updatedValues.join(","),
    });
  };

  const handlePriceChange = (event) => {
    const priceValue = event.target.value;

    if (priceValue === "custom") {
      setQueryParams({
        ...queryParams,
        price: "custom",
        minPrice: customPrice.minPrice,
        maxPrice: customPrice.maxPrice,
      });
    } else {
      const { minPrice, maxPrice } = priceRangeMapping[priceValue] || {};
      setQueryParams({
        ...queryParams,
        price: priceValue,
        minPrice: minPrice || "",
        maxPrice: maxPrice || "",
      });
    }
  };

  const handleCustomPriceChange = (field, value) => {
    const updatedPrice = { ...customPrice, [field]: value };
    setCustomPrice(updatedPrice);

    if (selectedPrice === "custom") {
      setQueryParams({
        ...queryParams,
        minPrice: updatedPrice.minPrice,
        maxPrice: updatedPrice.maxPrice,
      });
    }
  };
  const handleClearFilters = () => {
    resetQueryParams();
    setCustomPrice({
      minPrice: "",
      maxPrice: "",
    });
  };
  return (
    <div className="filters-container flex flex-col p-8 bg-white w-full h-fit">
      <div className="flex">
        <h1 className="uppercase text-2xl font-semibold">Filters</h1>
      </div>

      <div className="filters-group">
        {/* Product Type Filter */}
        <Accordion elevation={0} sx={{ boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 0 }}>
            <h1 className="font-medium text-[14px]">Product Type</h1>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset">
              {categories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  value={category.id}
                  control={
                    <Checkbox
                      checked={selectedCategory.includes(category.id)}
                      onChange={() => handleFilterChange("category", category.id)}
                    />
                  }
                  label={category.name}
                  sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                />
              ))}
            </FormControl>
          </AccordionDetails>
        </Accordion>

        {/* Brand Filter */}
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 0 }}>
            <h1 className="font-medium text-[14px]">Brand</h1>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset" className="gap-4">
              {brands.map((brand) => (
                <FormControlLabel
                  key={brand}
                  control={
                    <Checkbox
                      checked={selectedBrand.includes(brand)}
                      onChange={() => handleFilterChange("brand", brand)}
                    />
                  }
                  label={brand}
                  sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                />
              ))}
            </FormControl>
          </AccordionDetails>
        </Accordion>

        {/* Skin Type Filter */}
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 0 }}>
            <h1 className="font-medium text-[14px]">Skin Type</h1>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset">
              {["dry", "oily", "combination", "normal"].map((skinType) => (
                <FormControlLabel
                  key={skinType}
                  value={skinType}
                  control={
                    <Checkbox
                      checked={selectedSkinType.includes(skinType)}
                      onChange={() => handleFilterChange("skinType", skinType)}
                    />
                  }
                  label={skinType.charAt(0).toUpperCase() + skinType.slice(1)}
                  sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                />
              ))}
            </FormControl>
          </AccordionDetails>
        </Accordion>

        {/* Price Filter */}
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 0 }}>
            <h1 className="font-medium text-[14px]">Price</h1>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset">
              <RadioGroup value={selectedPrice} onChange={handlePriceChange}>
                <FormControlLabel
                  value="under_25"
                  control={<Radio />}
                  label="Under $25"
                  sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                />
                <FormControlLabel
                  value="from_25"
                  control={<Radio />}
                  label="$25 to $50"
                  sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                />
                <FormControlLabel
                  value="over_50"
                  control={<Radio />}
                  label="Over $50"
                  sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                />
                <FormControlLabel
                  value="custom"
                  control={<Radio />}
                  label="Custom"
                  sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
                />
                {selectedPrice === "custom" && (
                  <div>
                    <TextField
                      label="Min Price"
                      type="number"
                      value={customPrice.minPrice}
                      onChange={(e) => handleCustomPriceChange("minPrice", e.target.value)}
                      sx={{ mr: 2, mt: 1 }}
                    />
                    <TextField
                      label="Max Price"
                      type="number"
                      value={customPrice.maxPrice}
                      onChange={(e) => handleCustomPriceChange("maxPrice", e.target.value)}
                      sx={{ mt: 1 }}
                    />
                  </div>
                )}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <CustomButton
          className="clear-filters-button font-[500] font-sans text-sm"
          onClick={handleClearFilters}
          sx={{ mb: 2 }}
        >
          Clear Filters
        </CustomButton>
      </div>
    </div>
  );
}

export default Filters;
