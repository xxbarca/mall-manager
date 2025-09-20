'use client'
import { useCategoryStore } from "@/app/(dashboard)/category/_libs/useCategoryStore";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import {
  categorySchema,
  CategorySchema,
  defaultCategoryValue,
} from "@/app/(dashboard)/category/_types/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "@/components/Controlled/controlled-input";
import { ControlledSwitch } from "@/components/Controlled/controlled-switch";
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/app/(dashboard)/category/_services/use-category-mutation";
import { useCategory } from "@/app/(dashboard)/category/_services/use-category-query";
import { useEffect } from "react";

export const CategoryFormDialog = () => {
  const {
    categoryDialogOpen,
    updateCategoryDialogOpen,
    updateSelectedCategoryId,
    selectedCategoryId
  } = useCategoryStore()
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultCategoryValue
  })

  const categoryQuery = useCategory()
  const createCategoryMutation = useCreateCategory()
  const updateCategoryMutation = useUpdateCategory()

  useEffect(() => {
    if (!!selectedCategoryId && categoryQuery.data) {
      form.reset({...categoryQuery.data, online: categoryQuery.data.online === '1', action: 'update'})
    }
  }, [selectedCategoryId, categoryQuery.data, form])

  const handleDialogOpenChange = (open: boolean) => {
    updateCategoryDialogOpen(open)
    if (!open) {
      updateSelectedCategoryId('')
      form.reset(defaultCategoryValue)
    }
  }

  const handleOnSuccess = () => {
    updateCategoryDialogOpen(false)
    form.reset()
  }

  const submit: SubmitHandler<CategorySchema> = (data) => {
    if (data.action === "create") {
      createCategoryMutation.mutate(data, {
        onSuccess: handleOnSuccess,
      })
    } else {
      console.log(data)
    }
  }
  return <Dialog open={categoryDialogOpen} onOpenChange={handleDialogOpenChange}>
    <DialogTrigger asChild>
      <Button className={'cursor-pointer'}>
        <Plus className={"mr-2"} />
        添加分类
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className={"text-xl"}>
          {selectedCategoryId ? "编辑分类" : "新建分类"}
        </DialogTitle>
      </DialogHeader>
      <form className={'space-y-6'} onSubmit={form.handleSubmit(submit)}>
        <FormProvider {...form}>
          <div className={'grid grid-cols-1 gap-4'}>
            <div className={'col-span-1'}>
              <ControlledInput<CategorySchema> name={'name'} label={'名称'} placeholder={"请输入分类名称"}/>
            </div>
            <div className={'col-span-1'}>
              <ControlledInput<CategorySchema> name={'description'} label={'描述'} placeholder={'请输入分类描述'}/>
            </div>
            <div className={'col-span-1'}>
              <ControlledInput<CategorySchema> name={'index'} label={'排序'} type={'number'} placeholder={'请输入排序'}/>
            </div>
            <div className={'col-span-1'}>
              <ControlledSwitch<CategorySchema> name={'online'} label={'在线'} />
            </div>
          </div>
        </FormProvider>
        <DialogFooter>
          <Button type='submit' className={'cursor-pointer'}>
            确认
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
}