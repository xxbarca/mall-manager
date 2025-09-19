import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PageCategorySchema } from "@/app/(dashboard)/category/_types/categorySchema";
import { getCategory, getCategoryPage } from "@/app/(dashboard)/category/_services/category-query";
import { useCategoryStore } from "@/app/(dashboard)/category/_libs/useCategoryStore";

export const useCategoryPage = (params: PageCategorySchema) => {
  return useQuery({
    queryKey: ["category", params],
    queryFn: () => getCategoryPage(params),
    placeholderData: keepPreviousData,
  });
};

export const useCategory = () => {
  const { selectedCategoryId } = useCategoryStore()
  return useQuery({
    queryKey: ["category", selectedCategoryId],
    queryFn: () => getCategory(selectedCategoryId),
    enabled: !!selectedCategoryId,
  })
}