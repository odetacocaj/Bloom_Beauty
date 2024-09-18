import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../queries/categoriesQuery";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    keepPreviousData: true,
  });
};
