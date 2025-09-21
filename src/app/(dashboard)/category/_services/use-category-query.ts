import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategory, getCategoryPage } from "@/app/(dashboard)/category/_services/category-query";
import { useCategoryStore } from "@/app/(dashboard)/category/_libs/useCategoryStore";
import { FormCategorySchema } from "@/app/(dashboard)/category/_types/categorySchema";

export const useCategoryPage = (params: FormCategorySchema) => {
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