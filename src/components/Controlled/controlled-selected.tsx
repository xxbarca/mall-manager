"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Option } from "@/types/option";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  containerClassName?: string;
  options: Option[]
} & ComponentProps<"select">;

const ControlledSelected = <T extends FieldValues>({
  label,
  containerClassName,
  name,
  options
}: InputProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <div className={cn("w-full", containerClassName)}>
      {!!label && (
        <Label className="mb-2" htmlFor={name}>
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              data-slot="select"
              aria-invalid={!!error}
              onValueChange={field.onChange}
              defaultValue={field.value}
              {...field}
            >
              <SelectTrigger className={'w-full'}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options && options.map(item => <SelectItem value={item.value} key={item.value}>{item.label}</SelectItem>)}
              </SelectContent>
            </Select>
            {!!error && (
              <p className="text-destructive text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export { ControlledSelected };
