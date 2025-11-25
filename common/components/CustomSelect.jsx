"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

export function CustomSelect({
  id,
  label,
  value,
  onChange,
  options,
  isLoading,
  isDisabled,
  error,
}) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(value);

  // Sync internal state with prop value
  React.useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div>
      <Label className="text-sm md:text-lg font-normal pb-2">{label}</Label>
      <Popover open={open} onOpenChange={setOpen} className="shadow-none">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-label="Pilih Data"
            aria-expanded={open}
            disabled={isDisabled || isLoading}
            className={cn(
              "w-full justify-between text-sm md:text-lg font-normal shadow-none hover:bg-white",
              open &&
                "focus-visible:ring-1 focus-visible:ring-green border-green",
              !value && "text-muted-foreground",
              error && "border-red-500 focus-visible:ring-red-500"
            )}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Memuat...
              </span>
            ) : value ? (
              options?.find((option) => option?.value === selected)?.label
            ) : (
              "Pilih Data"
            )}
            {!isLoading && <ChevronsUpDown className="opacity-50" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 shadow-none">
          <Command>
            <CommandInput placeholder={`Cari ${label}...`} />
            <CommandList>
              <CommandEmpty>Data tidak ditemukan.</CommandEmpty>
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      onChange(option.value);
                      setSelected(option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selected === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
