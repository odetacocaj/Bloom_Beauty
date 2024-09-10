import { useQuery } from "@tanstack/react-query";
import { fetchLatestProducts } from "../queries/productQuery";


export const useGetLatestProducts = (count) => {
  return useQuery({
    queryKey: ["products", count], 
    queryFn: () => fetchLatestProducts(count), 
    keepPreviousData: true, 
  });
};
