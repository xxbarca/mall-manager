import { z } from "zod";
const categorySchemaBase = z.object({
  index: z.number().optional(),
  name: z.string({message: '请输入分类名称'}).min(1, {message: '请输入分类名称'}),
  img: z.string().optional(),
  description: z.string().nullable().optional(),
  online: z.boolean(),
})
const categorySchemaAction = z.discriminatedUnion('action', [
  z.object({action: z.literal('create')}),
  z.object({action: z.literal('update'), id: z.uuid()}),
])
export const categorySchema = z.intersection(
  categorySchemaBase,
  categorySchemaAction
)

export const pageCategorySchema = categorySchemaBase.partial().extend({
  page: z.number().min(1),
  limit: z.number(),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export type PageCategorySchema = z.infer<typeof pageCategorySchema>;

export const defaultPageCategoryValue: PageCategorySchema = {
  page: 1,
  limit: 10
}

export const defaultCategoryValue: CategorySchema = {
  name: '',
  index: 1,
  img: '',
  description: '',
  online: true,
  action: 'create',
}