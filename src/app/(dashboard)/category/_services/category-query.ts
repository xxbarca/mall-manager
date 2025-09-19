import {
  PageCategorySchema,
} from "@/app/(dashboard)/category/_types/categorySchema";
import http from "@/lib/http";

export const getCategoryPage = async (params: PageCategorySchema)=> {
  const res = await http.post("/category/paginate", params)
  return res.data;
}

export const getCategory = async (id: string) => {
  const res = await http.get(`/category/${id}`);
  return res.data
}