import { CategorySchema } from "@/app/(dashboard)/category/_types/categorySchema";
import { executeAction } from "@/lib/executeAction";
import http from "@/lib/http";
import { omit } from "lodash";

const createCategory = async (data: CategorySchema) => {
  await executeAction({
    actionFn: async () => {
      const d = await http.post('/category', {
        ...omit(data, 'action'),
        online: data.online ? '1' : '0',
      })
    }
  })
}

const updateCategory = async (data: CategorySchema) => {
  await executeAction({
    actionFn: async () => {
      await http.patch('/category', {
        ...omit(data, 'action'),
        online: data.online ? '1' : '0',
      })
    }
  })
}

export {
  createCategory,
  updateCategory
}