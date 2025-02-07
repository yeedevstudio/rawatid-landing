"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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

export function CustomSelect({ id, label, value, onChange, options }) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(value);

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
            className={cn(
              "w-full justify-between text-sm md:text-lg font-normal shadow-none hover:bg-white",
              open &&
                "focus-visible:ring-1 focus-visible:ring-green border-green",
              !value && "text-muted-foreground"
            )}
          >
            {value
              ? options?.find((option) => option?.value === selected)?.label
              : "Pilih Data"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full">
          <Command>
            <CommandInput placeholder="Cari..." />
            <CommandList>
              <CommandEmpty>Not found...</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option?.value}
                    value={option?.value}
                    onSelect={(currentValue) => {
                      const newValue =
                        currentValue === selected ? "" : currentValue;
                      setSelected(newValue);
                      onChange(newValue);
                      setOpen(false);
                    }}
                  >
                    {option?.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option?.value ? "opacity-100" : "opacity-0"
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
