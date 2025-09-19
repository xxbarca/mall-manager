import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategorySchema } from "@/app/(dashboard)/category/_types/categorySchema";
import { toast } from "sonner";
import {
  createCategory,
  updateCategory,
} from "@/app/(dashboard)/category/_services/category-mutation";

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CategorySchema) => {
      await createCategory(data);
    },
    onSuccess: async () => {
      toast.success("创建成功");
      await queryClient.invalidateQueries({ queryKey: ["category"] });
    }
  })
}

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CategorySchema) => {
      await updateCategory(data);
    },
    onSuccess: async () => {
      toast.success('更新成功')
      await queryClient.invalidateQueries({ queryKey: ["category"] });
    }
  })
}

export {
  useCreateCategory,
  useUpdateCategory
}