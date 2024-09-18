import { useQuery } from "@tanstack/react-query";
import {
  fetchLatestProducts,
  getAllProducts,
  getAllBrands,
  getProductById,
} from "../queries/productQuery";

export const useGetLatestProducts = (count) => {
  return useQuery({
    queryKey: ["latestproducts", count],
    queryFn: () => fetchLatestProducts(count),
    keepPreviousData: true,
  });
};
export const useGetBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getAllBrands(),
    keepPreviousData: true,
  });
};

export const useGetAllProducts = (params) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getAllProducts(params),
    keepPreviousData: true,
  });
};
export const useGetBestsellers = () => {
  return useQuery({
    queryKey: ["bestsellers"],
    queryFn: () => getAllProducts(),
    keepPreviousData: true,
  });
};

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    keepPreviousData: true,
  });
};

