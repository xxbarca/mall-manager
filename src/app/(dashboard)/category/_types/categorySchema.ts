import { z } from "zod";
const categorySchemaBase = z.object({
  index: z.number().optional(),
  name: z.string({message: '请输入分类名称'}).min(1, {message: '请输入分类名称'}),
  img: z.string().optional().nullable(),
  description: z.string().nullable(),
  online: z.boolean().nullable(),
})
const categorySchemaAction = z.discriminatedUnion('action', [
  z.object({action: z.literal('create')}),
  z.object({action: z.literal('update'), id: z.uuid()}),
])
export const categorySchema = z.intersection(
  categorySchemaBase,
  categorySchemaAction
)

export const formCategorySchema = categorySchemaBase.partial().extend({
  page: z.number().min(1),
  limit: z.number(),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export type FormCategorySchema = z.infer<typeof formCategorySchema>;

export const defaultFormCategoryValue: FormCategorySchema = {
  page: 1,
  limit: 10,
  name: '',
  online: null,
}

export const defaultCategoryValue: CategorySchema = {
  name: '',
  index: 1,
  img: '',
  description: '',
  online: true,
  action: 'create',
}