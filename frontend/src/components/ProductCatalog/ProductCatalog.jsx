import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { MenuItem, Select, SvgIcon } from "@mui/material";
import { useGetAllProducts } from "../../api/hooks/useProduct";
import Spinner from "../Spinner/Spinner";
import "./ProductCatalog.scss";
import useQueryParams from "../../hooks/useQueryParams";
import Pagination from "../Pagination/Pagination";
import Arrow from "@mui/icons-material/KeyboardArrowDownOutlined";
import CustomButton from "../CustomButton/CustomButton";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import MobileFilters from "../MobileFilters/MobileFilters";

function ProductCatalog({ isBestsellers }) {
  // eslint-disable-next-line no-unused-vars
  const [queryParams, setQueryParams] = useQueryParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("latest");
  const [open, setOpen] = useState(false);

  const currentQueryParams = {
    page,
    limit,
    sort,
    ...(isBestsellers ? { bestsellers: true } : {}),
    ...queryParams,
  };

  const { data: products = [], isLoading } = useGetAllProducts(currentQueryParams);

  if (isLoading) {
    return <Spinner className="w-[80%]" />;
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleOpenFilters = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <>
      <MobileFilters open={open} toggleDrawer={handleOpenFilters} />
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 items-end sm:items-center pb-6">
          <p className="uppercase text-sm text-[#B0A6BD] hidden sm:flex">
            {products.totalProducts === 1
              ? `${products.totalProducts} product`
              : `${products.totalProducts} products`}
          </p>
          <div className="flex">
            {/* Button for mobile screens */}
            <CustomButton
              className="bg-none flex flex-row text-center sm:hidden uppercase text-sm gap-2 items-center"
              onClick={() => handleOpenFilters(true)}
            >
              <span className="text-[#B0A6BD]">Filters</span>
              <SvgIcon component={TuneOutlinedIcon} />
            </CustomButton>
          </div>
          <div>
            <div className="filter-controls flex flex-col md:flex-row gap-2 justify-end">
              <div className="form-control flex flex-row items-center gap-2">
                <label className="uppercase text-sm text-[#B0A6BD]" htmlFor="sort">
                  Sort By
                </label>
                <Select
                  id="sort"
                  value={sort}
                  onChange={handleSortChange}
                  sx={{
                    padding: "0px 30px 0px 3px",
                    backgroundColor: "white",
                    border: "none",
                    boxShadow: "none",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    fontSize: "14px",
                    ".MuiSelect-icon": {
                      color: "#B0A6BD",
                    },
                    "& .MuiSelect-select": {
                      padding: "8px 50px 8px 14px",
                    },
                  }}
                  IconComponent={Arrow}
                >
                  <MenuItem value="latest">Sort by Latest</MenuItem>
                  <MenuItem value="price">Sort by Price (Low to High)</MenuItem>
                  <MenuItem value="price-desc">Sort by Price (High to Low)</MenuItem>
                </Select>
              </div>
              <div className="form-control flex flex-row items-center gap-2">
                <label className="uppercase text-sm text-[#B0A6BD]" htmlFor="limit">
                  Items per page
                </label>
                <Select
                  id="limit"
                  value={limit}
                  onChange={handleLimitChange}
                  sx={{
                    padding: "0px 30px 0px 3px",
                    backgroundColor: "white",
                    border: "none",
                    boxShadow: "none",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    fontSize: "14px",
                    ".MuiSelect-icon": {
                      color: "#B0A6BD",
                    },
                    "& .MuiSelect-select": {
                      padding: "8px 50px 8px 14px",
                    },
                  }}
                  IconComponent={Arrow}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </div>
            </div>
          </div>
          <p className="uppercase text-sm text-[#B0A6BD] self-start sm:hidden">
            {products.totalProducts === 1
              ? `${products.totalProducts} product`
              : `${products.totalProducts} products`}
          </p>
        </div>

        <div className="product-catalog">
          {products?.products?.length > 0 ? (
            products.products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p>No products available.</p>
          )}
        </div>
        <div className="flex w-full justify-center pb-10 pt-10">
          <Pagination count={products.totalPages} page={page} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
}

export default ProductCatalog;
