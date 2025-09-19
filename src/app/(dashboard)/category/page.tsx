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
  PageCategorySchema,
} from "@/app/(dashboard)/category/_types/categorySchema";
import { Online } from "@/components/Online";
import { Offline } from "@/components/Offline";
import { useForm } from "react-hook-form";
import { useCategoryPage } from "@/app/(dashboard)/category/_services/use-category-query";
import { CategoryFormDialog } from "@/app/(dashboard)/category/_components/category-form-dialog";
import { AdvancedPagination } from "@/components/Advanced/AdvancedPagination";
import { useCategoryStore } from "@/app/(dashboard)/category/_libs/useCategoryStore";

export default function CategoryPage(): JSX.Element {
  const [page, setPage] = useState(1)
  const { data, status } = useCategoryPage({ page, limit: 10 });
  const {updateSelectedCategoryId, updateCategoryDialogOpen} = useCategoryStore()
  const form = useForm<PageCategorySchema>({});

  const handleOnEdit = (id: string) => {
    updateSelectedCategoryId(id)
    updateCategoryDialogOpen(true)
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
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel onClick={() => handleOnEdit(row.original.id)}>编辑</DropdownMenuLabel>
              <DropdownMenuItem>
                Copy payment ID
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
    <div className="w-full">
      <CategoryFormDialog />
      <div className="overflow-hidden rounded-md border">
        <Table>
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
