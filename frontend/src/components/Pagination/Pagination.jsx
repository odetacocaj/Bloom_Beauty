import { Pagination as MuiPagination } from "@mui/material";

function PaginationComponent({ count, page, onPageChange }) {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={onPageChange}
      color="primary"
      siblingCount={1}
      boundaryCount={1}
      sx={{
        "& .MuiPaginationItem-root": {
          borderRadius: "0", // No border radius for numbers
        },
        "& .MuiPaginationItem-page.Mui-selected": {
          textDecoration: "underline", // Underline the active page
          backgroundColor: "transparent",
          color: "black",
        },
      }}
    />
  );
}

export default PaginationComponent;
