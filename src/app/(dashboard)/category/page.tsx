"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { alert } from "@/lib/useGlobalStore";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JSX, useState } from "react";
import {
  CategorySchema,
  defaultFormCategoryValue,
  FormCategorySchema,
} from "@/app/(dashboard)/category/_types/categorySchema";
import { Online } from "@/components/Online";
import { Offline } from "@/components/Offline";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useCategoryPage } from "@/app/(dashboard)/category/_services/use-category-query";
import { CategoryFormDialog } from "@/app/(dashboard)/category/_components/category-form-dialog";
import { AdvancedPagination } from "@/components/Advanced/AdvancedPagination";
import { useCategoryStore } from "@/app/(dashboard)/category/_libs/useCategoryStore";
import { useDeleteCategory } from "@/app/(dashboard)/category/_services/use-category-mutation";
import { ControlledInput } from "@/components/Controlled/controlled-input";
import { ControlledSelected } from "@/components/Controlled/controlled-selected";
import { time2Time } from "@/lib/utils";

export default function CategoryPage(): JSX.Element {
  const [page, setPage] = useState(1)
  const [f, setForm] = useState<FormCategorySchema>(defaultFormCategoryValue);
  const { data, status } = useCategoryPage({ page, limit: 10, ...f });
  const {updateSelectedCategoryId, updateCategoryDialogOpen} = useCategoryStore()
  const deleteCategoryMutation = useDeleteCategory()
  const form = useForm<FormCategorySchema>({
    defaultValues: defaultFormCategoryValue
  });

  const handleOnEdit = (id: string) => {
    updateSelectedCategoryId(id)
    updateCategoryDialogOpen(true)
  }

  const onSubmit: SubmitHandler<FormCategorySchema> = (data) => {
    setForm({
      ...f,
      ...data
    })
  }

  const onReset = () => {
    form.reset(defaultFormCategoryValue)
  }

  const columns: ColumnDef<CategorySchema>[] = [
    {
      id: "select",
      header: "序号",
      cell: ({ row }) => <span>{row.index + 1}</span>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "名称",
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "index",
      header: "排序",
      cell: ({ row }) => <div className="lowercase">{row.getValue("index")}</div>,
    },
    {
      accessorKey: "description",
      header: "描述",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "create_time",
      header: "创建时间",
      cell: ({ row }) => (
        <div className="lowercase">{time2Time(row.getValue("create_time"))}</div>
      ),
    },
    {
      accessorKey: "online",
      header: "状态",
      cell: ({ row }) => (
        <div className="lowercase">
          {row.getValue("online") === "1" ? <Online /> : <Offline />}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row: {original} }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className={'cursor-pointer'} onClick={() => handleOnEdit(original.id)}>编辑</DropdownMenuLabel>
              <DropdownMenuItem className={'cursor-pointer text-red-700 font-bold'} onClick={() => {
                alert({
                  onConfirm: () => deleteCategoryMutation.mutate(original.id),
                  description: '确认删除此条数据?'
                });
              }}>
                删除
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable({
    data: data?.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full flex flex-col">
      <form onSubmit={form.handleSubmit(onSubmit)} className={'mb-6'}>
        <FormProvider {...form}>
          <div className={'grid gap-4 grid-cols-4'}>
            <div className={'col-span-1'}>
              <ControlledInput<FormCategorySchema> name={'name'} label={'分类名'} />
            </div>
            <div className={'col-span-1'}>
              <ControlledSelected<FormCategorySchema> name={'online'} label={'状态'} options={[{value: '1', label: '上线'}, {value: '0', label: '下线'}]}/>
            </div>
            <div className={'col-span-1 flex items-end gap-4'}>
              <Button type='submit' className={'cursor-pointer'}>
                确认
              </Button>
              <Button className={'cursor-pointer'} onClick={onReset}>
                重置
              </Button>
              <CategoryFormDialog />
            </div>
          </div>
        </FormProvider>
      </form>
      <div className="overflow-hidden rounded-md border">
        <Table className={'bg-white'}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AdvancedPagination setPage={setPage} meta={data.meta} />
    </div>
  );
}
