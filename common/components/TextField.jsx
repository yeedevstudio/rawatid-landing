import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function TextField({
  label,
  placeholder,
  type,
  id,
  size,
  values,
  onChange,
}) {
  return (
    <div>
      <Label className="text-sm md:text-lg font-normal pb-2">{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          size={size}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <Input
          id={id}
          size={size}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
        />
      )}
    </div>
  );
}
