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
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useGetAllCategories } from "../../api/hooks/useCategories";
import useQueryParams from "../../hooks/useQueryParams";
import { useGetBrands } from "../../api/hooks/useProduct";
import CustomButton from "../../components/CustomButton/CustomButton";
import Drawer from "@mui/material/Drawer";

function MobileFilters({ toggleDrawer, open }) {
  const { data: categories = [] } = useGetAllCategories();
  const { data: brands = [] } = useGetBrands();
  const [, setQueryParams] = useQueryParams(); // Keep track of query parameters locally

  // Local state for filter values
  const [localFilters, setLocalFilters] = useState({
    category: [],
    brand: [],
    skinType: [],
    price: "",
    minPrice: "",
    maxPrice: "",
  });

  const priceRangeMapping = {
    under_25: { minPrice: 0, maxPrice: 25 },
    from_25: { minPrice: 25, maxPrice: 50 },
    over_50: { minPrice: 50, maxPrice: 2000 },
  };

  const handleFilterChange = (filterKey, value) => {
    setLocalFilters((prev) => {
      const currentValues = prev[filterKey] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return { ...prev, [filterKey]: updatedValues };
    });
  };

  const handlePriceChange = (event) => {
    const priceValue = event.target.value;
    const { minPrice, maxPrice } = priceRangeMapping[priceValue] || {};
    setLocalFilters((prev) => ({
      ...prev,
      price: priceValue,
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
    }));
  };

  const handleCustomPriceChange = (field, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    setQueryParams(localFilters);
    toggleDrawer(false); // Close the drawer after applying filters
  };

  const handleClearFilters = () => {
    setLocalFilters({
      category: [],
      brand: [],
      skinType: [],
      price: "",
      minPrice: "",
      maxPrice: "",
    });
    setQueryParams({}); // Clear query parameters
  };

  return (
    <Drawer open={open} onClose={() => toggleDrawer(false)} anchor="right">
      <div className="filters-container flex flex-col p-5 bg-white w-full h-fit">
        <div className="flex items-center justify-between mb-4">
          <h1 className="uppercase text-2xl font-semibold">Filters</h1>
          <IconButton onClick={() => toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
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
                        checked={localFilters.category.includes(category.id)}
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
              <FormControl component="fieldset">
                {brands.map((brand) => (
                  <FormControlLabel
                    key={brand}
                    control={
                      <Checkbox
                        checked={localFilters.brand.includes(brand)}
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
                        checked={localFilters.skinType.includes(skinType)}
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
                <RadioGroup value={localFilters.price} onChange={handlePriceChange}>
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
                  {localFilters.price === "custom" && (
                    <div>
                      <TextField
                        label="Min Price"
                        type="number"
                        value={localFilters.minPrice}
                        onChange={(e) => handleCustomPriceChange("minPrice", e.target.value)}
                        sx={{ mr: 2, mt: 1 }}
                      />
                      <TextField
                        label="Max Price"
                        type="number"
                        value={localFilters.maxPrice}
                        onChange={(e) => handleCustomPriceChange("maxPrice", e.target.value)}
                        sx={{ mt: 1 }}
                      />
                    </div>
                  )}
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <div className="drawer-buttons-container flex flex-col gap-3 ">
            <CustomButton
              className="apply-filters-button font-[500] font-sans text-sm"
              onClick={handleApplyFilters}
              sx={{ mb: 2 }}
            >
              Apply Filters
            </CustomButton>
            <CustomButton
              className="clear-filters-button font-[500] font-sans text-sm"
              onClick={handleClearFilters}
              sx={{ mb: 2 }}
            >
              Clear Filters
            </CustomButton>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default MobileFilters;
