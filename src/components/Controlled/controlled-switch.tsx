import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type SwitchProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  containerClassName?: string;
} & ComponentProps<"switch">

const ControlledSwitch = <T extends FieldValues>({
                                                   className,
                                                   type,
                                                   name,
                                                   label,
                                                   containerClassName,
                                                   ...props
                                                 }: SwitchProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <div className={cn("w-full flex flex-row justify-start items-center", containerClassName)}>
      {!!label && (
        <Label className={'mr-2'} htmlFor={name}>
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Switch
              id={name}
              data-slot="switch"
              aria-invalid={!!error}
              className={className}
              checked={field.value}
              onCheckedChange={field.onChange}
              {...field}
            />
            {!!error && (
              <p className="text-destructive text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}

export { ControlledSwitch };