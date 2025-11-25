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
  error,
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
          value={values}
          className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
      ) : (
        <Input
          id={id}
          size={size}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          value={values}
          className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
